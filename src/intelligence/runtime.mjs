import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {load} from 'cheerio';
import {createFileStore,createSupabaseStore} from './store.mjs';
import {createEngine} from './engine.mjs';
import {collectSources,SOURCE_REGISTRY} from './research.mjs';
import {generateTopicDraft,generateTopicImage,uploadImageAsset} from './providers.mjs';

export const distRoot=fileURLToPath(new URL('../../dist/',import.meta.url));
export function runtimeStore(env=process.env) {
  if(env.FELEXIA_STORAGE==='file'){
    if(env.VERCEL)throw new Error('Persistent file storage is unavailable on Vercel');
    return createFileStore({path:env.FELEXIA_STATE_PATH||resolve('.sites-runtime/intelligence/state.json')});
  }
  if(env.SUPABASE_URL&&(env.SUPABASE_SECRET_KEY||env.SUPABASE_SERVICE_ROLE_KEY))return createSupabaseStore({env});
  if(env.VERCEL)throw new Error('Intelligence database is not configured');
  return createFileStore({path:env.FELEXIA_STATE_PATH||resolve('.sites-runtime/intelligence/state.json')});
}
export async function readStatic(relative) {
  if(!/^(?:(?:fr|en|ar)\/guides\/(?:[\p{L}\p{N}-]+\/)?index\.html|route-manifest\.json|sitemap\.xml)$/u.test(relative))throw new Error('Invalid static path');
  return readFile(resolve(distRoot,relative),'utf8');
}
export async function verifyPublicTopic(topic,urls,{fetcher=fetch,origin=process.env.SITE_URL||'https://www.felexiaconseils.com'}={}) {
  const languages=['fr','ar','en'],base=new URL(origin),maxBytes=2*1024*1024;
  if(!languages.every(language=>typeof urls?.[language]==='string'))return {status:'failed',checks:[{kind:'group',ok:false,reason:'publication_languages_missing'}]};
  const trustedUrl=value=>{const url=new URL(value,base);if(url.origin!==base.origin||url.username||url.password)throw new Error('Untrusted publication origin');return url;};
  for(const url of Object.values(urls))trustedUrl(url);
  async function document(url,type) {
    const response=await fetcher(trustedUrl(url),{redirect:'error',signal:AbortSignal.timeout(10000)});
    if(!response.ok||!type.test(response.headers.get('content-type')||'')){await response.body?.cancel();return {status:response.status,ok:false,text:''};}
    if(Number(response.headers.get('content-length'))>maxBytes){await response.body?.cancel();throw new Error('Public document exceeds byte limit');}
    const reader=response.body?.getReader(),chunks=[];let size=0;
    try{if(reader)for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes){await reader.cancel();throw new Error('Public document exceeds byte limit');}chunks.push(Buffer.from(value));}}
    finally{reader?.releaseLock();}
    return {status:response.status,ok:true,text:Buffer.concat(chunks,size).toString('utf8')};
  }
  const articles=languages.map(async language=>{
    try{
      const url=urls[language],response=await document(url,/^text\/html(?:\s*;|$)/i),$=load(response.text);
      const alternate=languages.every(code=>$(`link[hreflang="${code}"]`).attr('href')===urls[code]);
      return {kind:'article',language,status:response.status,ok:response.ok&&$('html').attr('lang')===language&&$('link[rel="canonical"]').attr('href')===url&&alternate&&$('main h1').text().trim()===topic.translations[language].title};
    }catch{return {kind:'article',language,status:null,ok:false};}
  });
  const assets=[topic.image.src,topic.image.smallSrc].map(async path=>{
    try{const response=await fetcher(trustedUrl(path),{redirect:'error',signal:AbortSignal.timeout(10000)});const check={kind:'image',asset:path,status:response.status,ok:response.ok&&/^image\//.test(response.headers.get('content-type')||'')};await response.body?.cancel();return check;}
    catch{return {kind:'image',asset:path,status:null,ok:false};}
  });
  async function catalogueCheck(language) {
    const visited=new Set();
    let path=`/${language}/guides/`;
    try{
      for(let step=0;step<40&&path&&!visited.has(path);step++){
        visited.add(path);
        const response=await document(path,/^text\/html(?:\s*;|$)/i);
        if(!response.ok)return {kind:'catalogue',language,status:response.status,ok:false};
        const $=load(response.text);
        const card=$('[data-guide-card][href]').toArray().some(element=>{try{return trustedUrl($(element).attr('href')).href===urls[language];}catch{return false;}});
        if(card)return {kind:'catalogue',language,status:response.status,ok:$('html').attr('lang')===language};
        path=$('[data-guide-pagination] a[href]').toArray().map(element=>$(element).attr('href')).map(href=>{try{return trustedUrl(href).pathname;}catch{return '';}}).find(pathname=>pathname&&!visited.has(pathname))||'';
      }
      return {kind:'catalogue',language,status:200,ok:false};
    }catch{return {kind:'catalogue',language,status:null,ok:false};}
  }
  const catalogues=languages.map(language=>catalogueCheck(language));
  const sitemap=(async()=>{
    try{
      const response=await document('/sitemap.xml',/^(?:application|text)\/xml(?:\s*;|$)/i),$=load(response.text,{xmlMode:true});
      const locations=new Set($('urlset>url>loc').map((_,element)=>$(element).text().trim()).get());
      return {kind:'sitemap',status:response.status,ok:response.ok&&languages.every(language=>locations.has(urls[language]))};
    }catch{return {kind:'sitemap',status:null,ok:false};}
  })();
  // Independent requests run together: nine checks stay within one 10s
  // network window, and each parsed HTML/XML response is capped at 2 MiB.
  const checks=await Promise.all([...articles,...assets,...catalogues,sitemap]);
  return {status:checks.every(c=>c.ok)?'verified':'failed',checks};
}
export async function runtimeEngine(env=process.env,options={}) {
  const store=options.store||runtimeStore(env);
  let paths=[];try{paths=JSON.parse(await readStatic('route-manifest.json'));}catch{}
  const historical=JSON.parse(await readFile(new URL('../../docs/INTELLIGENCE-INVENTAIRE-GUIDES.json',import.meta.url),'utf8'));
  const inventory=(Array.isArray(historical)?historical:historical.groups||historical.topics||[]).map(g=>({...g,slug:g.contentGroupKey||g.slug,title:g.title||historical.articles?.find(a=>a.slug===g.contentGroupKey&&a.language==='fr')?.title}));
  return createEngine({store,env,knownPaths:new Set(paths),historical:inventory,research:async({now})=>{
    const state=await store.read();
    const cursor=Number(state.settings.researchCursor)||0;
    const sources=[SOURCE_REGISTRY[cursor%SOURCE_REGISTRY.length],SOURCE_REGISTRY[(cursor+1)%SOURCE_REGISTRY.length]];
    const records=await collectSources({sources,maxDocuments:2,now});
    await store.transaction(state=>{state.settings.researchCursor=(cursor+2)%SOURCE_REGISTRY.length;});return records;
  },generateDraft:generateTopicDraft,generateImage:generateTopicImage,uploadImage:(_id,image,options)=>uploadImageAsset(image,options),verifyPublication:topic=>verifyPublicTopic(topic,Object.fromEntries(['fr','ar','en'].map(l=>[l,(env.SITE_URL||'https://www.felexiaconseils.com')+`/${l}/guides/${encodeURIComponent(topic.translations[l].slug)}/`])),{origin:env.SITE_URL||'https://www.felexiaconseils.com'}),...options});
}
