import {timingSafeEqual,randomUUID,createHash,createHmac} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {load} from 'cheerio';
import {runtimeEngine,runtimeStore,readStatic} from './runtime.mjs';
import {addEvent,enqueue} from './engine.mjs';
import {findPublishedTopic,renderIntelligenceGuide,mergeGuideCatalogue,mergeIntelligenceSitemap,mergeHistoricalAlternates} from './render.mjs';

function permitted(req,secret) {
  if(!secret||secret.length<24)return false;
  const expected=Buffer.from(`Bearer ${secret}`),actual=Buffer.from(String(req.headers.authorization||''));
  return actual.length===expected.length&&timingSafeEqual(actual,expected);
}
function send(req,res,status,body,type='application/json; charset=utf-8') {
  res.statusCode=status;res.setHeader('Content-Type',type);res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
  if(type.startsWith('text/html')) {
    const hashes=[...String(body).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match=>`'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`);
    res.setHeader('Content-Security-Policy',`default-src 'self'; script-src 'self' ${hashes.join(' ')}; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`);
  }
  res.end(req.method==='HEAD'?undefined:type.startsWith('application/json')?JSON.stringify(body):body);
}
async function parseBody(req) {
  let body;
  if(req.body!==undefined){body=Buffer.isBuffer(req.body)?req.body.toString('utf8'):typeof req.body==='string'?req.body:JSON.stringify(req.body);}
  else {const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>2000000)throw Object.assign(new Error('Payload too large'),{status:413});chunks.push(chunk);}body=Buffer.concat(chunks).toString('utf8');}
  if(Buffer.byteLength(body)>2000000)throw Object.assign(new Error('Payload too large'),{status:413});
  try{return JSON.parse(body);}catch{throw Object.assign(new Error('Invalid JSON'),{status:400});}
}
const allowedOrigin=(req,env)=>!req.headers.origin||req.headers.origin===(env.SITE_URL||'https://www.felexiaconseils.com')||env.NODE_ENV!=='production'&&!env.VERCEL&&/^http:\/\/(?:localhost|127\.0\.0\.1):\d+$/.test(req.headers.origin);
export function createIntelligenceHandler({env=process.env,engine,store}={}) {
  return async(req,res)=>{
    if(!permitted(req,env.FELEXIA_ADMIN_TOKEN))return send(req,res,401,{ok:false,code:'unauthorized'});
    if(!['GET','POST'].includes(req.method))return send(req,res,405,{ok:false,code:'method_not_allowed'});
    if(!allowedOrigin(req,env))return send(req,res,403,{ok:false,code:'origin_rejected'});
    try{
      const storage=store||runtimeStore(env),worker=engine||await runtimeEngine(env,{store:storage});
      const url=new URL(req.url,'http://localhost');
      if(req.method==='GET'){
        const id=url.searchParams.get('topic');
        if(id){const data=await storage.read();const topic=data.topics.find(t=>t.id===id);return send(req,res,topic?200:404,topic?{ok:true,topic}:{ok:false,code:'not_found'});}
        const data=await worker.summaries();
        data.topics=data.topics.map(({translations,claims,revisions,sources,...topic})=>({...topic,translations:translations?Object.fromEntries(Object.entries(translations).map(([l,v])=>[l,{title:v.title,slug:v.slug}])):null,claimCount:claims?.length||0,revisionCount:revisions?.length||0}));
        data.sources=data.sources.map(({text,...s})=>s);
        return send(req,res,200,{ok:true,...data});
      }
      if(!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type']||''))return send(req,res,415,{ok:false,code:'json_required'});
      const input=await parseBody(req);
      if(!input||typeof input.action!=='string')return send(req,res,400,{ok:false,code:'invalid_action'});
      let result;
      switch(input.action){
        case 'pause':case 'resume':
          result=await storage.transaction(state=>{state.settings.paused=input.action==='pause';addEvent(state,input.action,{actor:'authenticated-administrator'});return {paused:state.settings.paused};});break;
        case 'tick':result=await worker.tick();break;
        case 'check':result=await worker.prepareTopic(String(input.id));break;
        case 'collect':result=await worker.discover();break;
        case 'import':
          if(!Array.isArray(input.topics)||input.topics.length>50||!Array.isArray(input.sources||[]))return send(req,res,400,{ok:false,code:'invalid_import'});
          result=await worker.importTopics(input.topics,input.sources||[]);break;
        case 'seed':{
          const reserve=JSON.parse(await readFile(new URL('./reserve.json',import.meta.url),'utf8'));
          const supplement=JSON.parse(await readFile(new URL('./reserve-supplement.json',import.meta.url),'utf8'));
          reserve.topics.push(...supplement.topics);
          result=await worker.importTopics(reserve.topics,reserve.sources);
          result.ready=0;result.blocked=0;
          const snapshot=await storage.read();
          for(const topic of snapshot.topics.filter(topic=>topic.status!=='published'&&topic.translations?.fr&&topic.translations?.ar&&topic.translations?.en)){
            const check=await worker.prepareTopic(topic.id);if(check.ok)result.ready++;else result.blocked++;
          }
          break;
        }
        case 'queue':
          result=await storage.transaction(state=>{const topic=state.topics.find(t=>t.id===input.id);if(!topic)throw new Error('Topic not found');return enqueue(state,{id:`${topic.kind}:${topic.id}`,queue:topic.kind,type:topic.kind==='new'?'draft':topic.kind,topicId:topic.id});});break;
        case 'retry':
          result=await storage.transaction(state=>{const job=state.jobs.find(j=>j.id===input.id);if(!job||!['blocked','failed','retry'].includes(job.status))throw new Error('Job cannot retry');job.status='pending';job.availableAt=new Date().toISOString();return {id:job.id,status:job.status};});break;
        case 'correct_claim':
          if(!input.patch||typeof input.patch!=='object')throw new Error('Correction missing');result=await worker.correctClaim(String(input.id),String(input.claimId),{text:input.patch.text,factValue:input.patch.factValue});break;
        case 'authorize':
          result=await storage.transaction(state=>{const topic=state.topics.find(t=>t.id===input.id);if(!topic||topic.status==='published')throw new Error('Topic cannot change');topic.authorized=input.authorized===true;topic.status='draft';addEvent(state,'authorization_changed',{topicId:topic.id,authorized:topic.authorized});return {id:topic.id,authorized:topic.authorized};});break;
        case 'backfill': {
          if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug||''))throw new Error('Invalid historical slug');
          const html=await readStatic(`fr/guides/${input.slug}/index.html`),$=load(html),title=$('main h1').first().text();
          const originalContent=$('main .prose-lg,main .article').first().text().trim();
          if(!originalContent)throw new Error('Original article missing');
          const topic={id:`backfill-${input.slug}`,kind:'backfill',originalSlug:input.slug,title,intent:title,risk:'high',authorized:true,originalContent,originalFingerprint:null,sourceIds:[],status:'idea'};
          result=await worker.importTopics([topic]);
          await storage.transaction(state=>enqueue(state,{id:topic.id,queue:'backfill',type:'backfill',topicId:topic.id}));break;
        }
        default:return send(req,res,400,{ok:false,code:'unknown_action'});
      }
      return send(req,res,200,{ok:true,result});
    }catch(error){console.error('Intelligence request failed:',error.code||error.name);return send(req,res,error.status||503,{ok:false,code:error.status?'invalid_request':String(error.code||'intelligence_unavailable')});}
  };
}
function signedCron(req,secret) {
  if(!secret||secret.length<24||req.method!=='POST')return null;
  const timestamp=String(req.headers['x-felexia-cron-timestamp']||''),nonce=String(req.headers['x-felexia-cron-nonce']||''),signature=String(req.headers['x-felexia-cron-signature']||'');
  if(!/^\d{10}$/.test(timestamp)||!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(nonce)||!/^[a-f0-9]{64}$/.test(signature)||Math.abs(Date.now()/1000-Number(timestamp))>120)return null;
  const expected=createHmac('sha256',secret).update(`${timestamp}.${nonce}.POST./api/intelligence-cron`).digest(),actual=Buffer.from(signature,'hex');
  return actual.length===expected.length&&timingSafeEqual(actual,expected)?{timestamp:Number(timestamp),nonce}:null;
}
export function createCronHandler({env=process.env,engine,store}={}) {
  return async(req,res)=>{
    const bearer=permitted(req,env.CRON_SECRET),signature=signedCron(req,env.CRON_SECRET);
    if(!bearer&&!signature)return send(req,res,401,{ok:false,code:'unauthorized'});
    if(!['GET','POST'].includes(req.method))return send(req,res,405,{ok:false,code:'method_not_allowed'});
    try{
      const storage=store||runtimeStore(env);
      if(signature&&!bearer){const consumed=await storage.transaction(state=>{
        const entries=(state.settings.cronNonces||[]).filter(entry=>entry.timestamp>=Date.now()/1000-120);
        if(entries.some(entry=>entry.nonce===signature.nonce))return false;
        if(entries.length>=1000)throw Object.assign(new Error('Cron nonce window is full'),{code:'cron_nonce_limit'});
        state.settings.cronNonces=[...entries,signature];return true;
      });if(!consumed)return send(req,res,409,{ok:false,code:'cron_replay_rejected'});}
      const worker=engine||await runtimeEngine(env,{store:storage});return send(req,res,200,{ok:true,result:await worker.tick()});
    }catch(error){console.error('Intelligence cron failed:',error.code||error.name);return send(req,res,503,{ok:false,code:String(error.code||'worker_unavailable')});}
  };
}
export function createPublicGuidesHandler({env=process.env,store,staticReader=readStatic}={}) {
  return async(req,res)=>{
    if(!['GET','HEAD'].includes(req.method))return send(req,res,405,{ok:false,code:'method_not_allowed'});
    const url=new URL(req.url,'http://localhost');let pathname;
    try{pathname=decodeURIComponent(url.pathname);}catch{return send(req,res,404,'Page introuvable','text/plain; charset=utf-8');}
    const pathMatch=/^\/(fr|en|ar)\/guides\/(?:([^/]+)\/)?$/.exec(pathname);
    const lang=pathMatch?.[1]||url.searchParams.get('lang'),slug=pathMatch?.[2]||url.searchParams.get('slug')||'';
    if(!['fr','en','ar'].includes(lang)||slug&&!/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(slug))return send(req,res,404,'Page introuvable','text/plain; charset=utf-8');
    if(!slug&&url.searchParams.has('page')){
      res.setHeader('Location',`/${lang}/guides/`);
      return send(req,res,308,'','text/plain; charset=utf-8');
    }
    const relative=`${lang}/guides/${slug?slug+'/':''}index.html`;
    let base;try{base=await staticReader(relative);}catch{}
    let state;
    try{state=await(store||runtimeStore(env)).read();}catch{
      res.setHeader('X-Felexia-Intelligence','degraded');
      return base?send(req,res,200,base,'text/html; charset=utf-8'):send(req,res,503,'Service temporairement indisponible','text/plain; charset=utf-8');
    }
    const topics=state.topics.filter(t=>t.status==='published');
    const origin=env.SITE_URL||'https://www.felexiaconseils.com';
    let knownPaths=new Set();try{knownPaths=new Set(JSON.parse(await staticReader('route-manifest.json')));}catch{}
    try{
      let html;
      if(!slug&&base)html=mergeGuideCatalogue(base,topics,lang,{origin});
      else if(base)html=mergeHistoricalAlternates(base,topics,lang,{origin,path:`/${lang}/guides/${slug}/`,knownPaths});
      else {const topic=findPublishedTopic(state,lang,slug);if(topic){const template=await staticReader(`${lang}/guides/creation-entreprise-rabat/index.html`);html=renderIntelligenceGuide(topic,lang,{baseHtml:template,origin,knownPaths});}}
      if(!html)return send(req,res,404,'Page introuvable','text/plain; charset=utf-8');
      res.setHeader('X-Felexia-Intelligence','active');send(req,res,200,html,'text/html; charset=utf-8');
    }catch(error){console.error('Guides rendering failed:',error.name);return send(req,res,503,'Service temporairement indisponible','text/plain; charset=utf-8');}
  };
}
export function createSitemapHandler({env=process.env,store,staticReader=readStatic}={}) {
  return async(req,res)=>{
    if(!['GET','HEAD'].includes(req.method))return send(req,res,405,'Method not allowed','text/plain');
    try{const xml=await staticReader('sitemap.xml');let topics=[];try{topics=(await(store||runtimeStore(env)).read()).topics;}catch{res.setHeader('X-Felexia-Intelligence','degraded');}return send(req,res,200,mergeIntelligenceSitemap(xml,topics,{origin:env.SITE_URL||'https://www.felexiaconseils.com'}),'application/xml; charset=utf-8');}catch{return send(req,res,503,'Sitemap unavailable','text/plain');}
  };
}
export function createMediaHandler({env=process.env,fetcher=fetch}={}) {
  return async(req,res)=>{
    if(!['GET','HEAD'].includes(req.method))return send(req,res,405,'Method not allowed','text/plain');
    const asset=new URL(req.url,'http://localhost').searchParams.get('asset');
    if(!/^[a-zA-Z0-9_-]+(?:-640)?\.webp$/.test(asset||''))return send(req,res,404,'Image unavailable','text/plain');
    try{
      const origin=new URL(env.SUPABASE_URL);if(origin.protocol!=='https:'||!origin.hostname.endsWith('.supabase.co'))throw new Error('Invalid storage origin');
      const bucket=env.FELEXIA_MEDIA_BUCKET||'intelligence-media';if(!/^[a-z0-9-]+$/.test(bucket))throw new Error('Invalid bucket');
      const response=await fetcher(`${origin.origin}/storage/v1/object/public/${bucket}/${asset}`,{redirect:'error',signal:AbortSignal.timeout(10000)});
      if(!response.ok||!/^image\/webp/.test(response.headers.get('content-type')||''))return send(req,res,404,'Image unavailable','text/plain');
      if(Number(response.headers.get('content-length'))>3000000){await response.body?.cancel();throw new Error('Image too large');}
      const chunks=[];let size=0;const reader=response.body?.getReader();
      try{if(reader)for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>3000000){await reader.cancel();throw new Error('Image too large');}chunks.push(Buffer.from(value));}}finally{reader?.releaseLock();}
      const bytes=Buffer.concat(chunks,size);
      res.setHeader('Content-Type','image/webp');res.setHeader('Cache-Control','public, max-age=86400');res.setHeader('X-Content-Type-Options','nosniff');res.end(req.method==='HEAD'?undefined:bytes);
    }catch{return send(req,res,503,'Image unavailable','text/plain');}
  };
}
