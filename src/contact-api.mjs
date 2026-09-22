import {randomUUID,createHash} from 'node:crypto';
import {persistContactToSupabase} from './supabase-contact.mjs';
import {canonicalOrigin} from './site-origin.mjs';
const SERVICE_VALUES=['creation-entreprise','conseil-fiscal','conseil-gestion','formalites-administratives','investir-au-maroc','legal-advisory','modify-company','support','other'];
const PROFILE_VALUES=['resident','mre','foreign','company'];
const STRUCTURE_VALUES=['undecided','sarl','sarl-au','sa','sas','filiale','succursale','auto-entrepreneur','association'];
export function validateContact(input){
 if(!input||typeof input!=='object'||Array.isArray(input))return {error:'invalid_body'};
 const required=['name','email','message','locale','language','kind','consent'];
 for(const k of required)if(typeof input[k]!=='string'||!input[k].trim())return {error:'required',field:k};
 if(!['fr','en','ar'].includes(input.locale)||!['fr','en','ar'].includes(input.language))return {error:'language'};
 if(!['contact','project','appointment'].includes(input.kind))return {error:'kind'};
 if(input.consent!=='yes')return {error:'consent'};
 const bounds={name:[2,120],email:[3,254],phone:[0,40],message:[10,3000],country:[0,100],city:[0,120],activity:[0,180],partners:[0,5],service:[0,50],profile:[0,30],structure:[0,40],date:[0,10],time:[0,30],mode:[0,30],requestId:[0,60],website:[0,200]};
 const data={kind:input.kind,locale:input.locale,language:input.language,consent:true};
 for(const [key,[min,max]] of Object.entries(bounds)){if(input[key]!==undefined&&typeof input[key]!=='string')return {error:'type',field:key};const value=(input[key]||'').trim();if(value.length<min||value.length>max||/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value))return {error:'length',field:key};data[key]=value;}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)||/[\r\n]/.test(data.email)||/[\r\n]/.test(data.name))return {error:'email',field:'email'};
 if(data.phone&&!/^[+\d\s().-]{6,40}$/.test(data.phone))return {error:'phone',field:'phone'};
 if(data.partners&&(!/^\d+$/.test(data.partners)||+data.partners<1||+data.partners>10000))return {error:'partners'};
 if(input.kind!=='appointment'&&!SERVICE_VALUES.includes(data.service))return {error:'service'};
 if(input.kind==='project'&&(!data.country||!data.city||!data.activity||!PROFILE_VALUES.includes(data.profile)||!STRUCTURE_VALUES.includes(data.structure)))return {error:'project'};
 if(input.kind==='appointment'){
  const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Casablanca',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  if(!/^\d{4}-\d{2}-\d{2}$/.test(data.date)||Number.isNaN(Date.parse(data.date))||new Date(data.date).toISOString().slice(0,10)!==data.date||data.date<today)return {error:'date'};
  if(!['morning','afternoon'].includes(data.time)||!['phone','video','office'].includes(data.mode))return {error:'appointment'};
 }
 if(data.requestId&&!/^[a-zA-Z0-9-]{8,60}$/.test(data.requestId))return {error:'request_id'};
 return {data};
}
export function createContactHandler({env=process.env,fetcher=fetch}={}){
 const rates=new Map(),delivered=new Map(),inflight=new Map(),payloads=new Map();
 const json=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
 async function deliver(data){
  const requestId=data.requestId||randomUUID();
  const reference='FLX-'+createHash('sha256').update(requestId).digest('hex').slice(0,8).toUpperCase();
  const cacheKey=`${data.email}:${requestId}:${createHash('sha256').update(JSON.stringify(data)).digest('hex')}`;
  const payload=payloads.get(cacheKey)?.data||{...data,requestId,reference,receivedAt:new Date().toISOString()};delete payload.website;
  if(!payloads.has(cacheKey)){payloads.set(cacheKey,{data:payload,time:Date.now()});setTimeout(()=>payloads.delete(cacheKey),3600000).unref();}
  if(env.SUPABASE_URL||env.SUPABASE_SECRET_KEY||env.SUPABASE_SERVICE_ROLE_KEY)return persistContactToSupabase(payload,{env,fetcher});
  if(env.CONTACT_WEBHOOK_URL){const target=new URL(env.CONTACT_WEBHOOK_URL);if(target.protocol!=='https:'&&!(env.NODE_ENV==='test'&&target.hostname==='127.0.0.1'))throw new Error('insecure_webhook');
   const response=await fetcher(target,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':requestId,...(env.CONTACT_WEBHOOK_TOKEN?{'Authorization':`Bearer ${env.CONTACT_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000),redirect:'error'});if(!response.ok)throw new Error('delivery_failed');
  }else if(env.RESEND_API_KEY&&env.CONTACT_FROM_EMAIL&&env.CONTACT_TO_EMAIL){
   const text=Object.entries(payload).filter(([k,v])=>v&&!['requestId','receivedAt'].includes(k)).map(([k,v])=>`${k}: ${v}`).join('\n\n');
   const response=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${env.RESEND_API_KEY}`,'Idempotency-Key':requestId},body:JSON.stringify({from:env.CONTACT_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL],reply_to:data.email,subject:`Felexia — ${data.kind} — ${reference}`,text}),signal:AbortSignal.timeout(12000)});if(!response.ok)throw new Error('delivery_failed');
  }else return {status:503,body:{ok:false,code:'not_configured'}};
  return {status:200,body:{ok:true,reference}};
 }
 return async function contact(req,res){
  if(req.method!=='POST'){res.setHeader('Allow','POST');return json(res,405,{ok:false,code:'method'});}
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return json(res,415,{ok:false,code:'content_type'});
  const localOrigin=`http://${req.headers.host}`;
  let configuredOrigin,publicOrigin;try{configuredOrigin=env.SITE_URL?new URL(env.SITE_URL).origin:null;publicOrigin=configuredOrigin?canonicalOrigin(configuredOrigin):null;}catch{return json(res,503,{ok:false,code:'configuration'});}
  const allowed=configuredOrigin?[configuredOrigin,publicOrigin,...(env.NODE_ENV!=='production'?[localOrigin]:[])]:[localOrigin];
  // Only explicit server configuration or Vercel's trusted system variables
  // can add origins. Never trust a client-supplied Host/forwarded host in prod.
  for(const value of String(env.CONTACT_ALLOWED_ORIGINS||'').split(',').filter(Boolean)){try{const u=new URL(value.trim());if(u.protocol==='https:'&&!u.username&&!u.password)allowed.push(u.origin);}catch{return json(res,503,{ok:false,code:'configuration'});}}
  if(env.VERCEL==='1')for(const host of [env.VERCEL_URL,env.VERCEL_PROJECT_PRODUCTION_URL,env.VERCEL_BRANCH_URL])if(host&&/^[a-z0-9.-]+\.vercel\.app$/i.test(host))allowed.push('https://'+host);
  if(req.headers.origin&&!allowed.includes(req.headers.origin))return json(res,403,{ok:false,code:'origin'});
  if(env.NODE_ENV==='production'&&!configuredOrigin)return json(res,503,{ok:false,code:'configuration'});
  const ip=env.TRUST_PROXY==='1'?String(req.headers['x-forwarded-for']||req.socket.remoteAddress).split(',')[0].trim():req.socket.remoteAddress;
  const now=Date.now();for(const [k,v] of rates)if(now-v.start>600000)rates.delete(k);for(const [k,v] of delivered)if(now-v.time>3600000)delivered.delete(k);for(const [k,v] of payloads)if(now-v.time>3600000)payloads.delete(k);
  const chunks=[];let size=0;try{for await(const chunk of req){size+=chunk.length;if(size>16384){return json(res,413,{ok:false,code:'too_large'});}chunks.push(Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk));}}catch{return json(res,400,{ok:false,code:'body'});}
  let raw;try{raw=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return json(res,400,{ok:false,code:'json'});}
  const checked=validateContact(raw);if(checked.error)return json(res,400,{ok:false,code:checked.error,field:checked.field});
  const data=checked.data;
  if(data.website)return json(res,400,{ok:false,code:'spam'});
  const rate=rates.get(ip)||{start:now,count:0};if(!rates.has(ip))setTimeout(()=>rates.delete(ip),600000).unref();rate.count++;rates.set(ip,rate);if(rate.count>5){res.setHeader('Retry-After','600');return json(res,429,{ok:false,code:'rate_limited'});}
  const dedupKey=data.requestId?`${data.email}:${data.requestId}:${createHash('sha256').update(JSON.stringify(data)).digest('hex')}`:null;
  if(dedupKey&&delivered.has(dedupKey))return json(res,200,delivered.get(dedupKey).body);
  try{let job=dedupKey&&inflight.get(dedupKey);if(!job){job=deliver(data);if(dedupKey)inflight.set(dedupKey,job);}const result=await job;if(dedupKey&&result.status===200){delivered.set(dedupKey,{time:now,body:result.body});setTimeout(()=>delivered.delete(dedupKey),3600000).unref();}return json(res,result.status,result.body);}catch{return json(res,502,{ok:false,code:'delivery_failed'});}finally{if(dedupKey)inflight.delete(dedupKey);}
 };
}
