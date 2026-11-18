import {lookup} from 'node:dns/promises';
import {isIP} from 'node:net';
import https from 'node:https';
import {Readable} from 'node:stream';
import {createHash} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import {load} from 'cheerio';

// These public institutional entry points are discovery sources. A successful
// retrieval establishes provenance, never the validity of a legal claim.
export const SOURCE_REGISTRY = Object.freeze([
  {id:'ompic',url:'https://www.ompic.ma/fr',issuer:'OMPIC',language:'fr'},
  {id:'sgg',url:'https://www.sgg.gov.ma/',issuer:'Secrétariat Général du Gouvernement',language:'fr'},
  {id:'finances',url:'https://www.finances.gov.ma/',issuer:'Ministère de l’Économie et des Finances',language:'fr'},
  {id:'office-changes',url:'https://www.oc.gov.ma/',issuer:'Office des Changes',language:'fr'},
  {id:'bank-al-maghrib',url:'https://www.bkam.ma/',issuer:'Bank Al-Maghrib',language:'fr'},
  {id:'cnss',url:'https://www.cnss.ma/',issuer:'CNSS',language:'fr'},
  {id:'maroc-pme',url:'https://marocpme.gov.ma/',issuer:'Maroc PME',language:'fr'},
  {id:'tamwilcom',url:'https://www.tamwilcom.ma/',issuer:'Tamwilcom',language:'fr'},
].map(source=>Object.freeze({...source,documentType:'html'})));
const allowedHosts = new Set(SOURCE_REGISTRY.flatMap(source=>{
  const hostname=new URL(source.url).hostname.replace(/^www\./,'');
  return [hostname,`www.${hostname}`];
}));
const userAgent='FelexiaIntelligence/1.0 (+https://www.felexiaconseils.com/fr/contact/)';
const sha=value=>createHash('sha256').update(value).digest('hex');
const normalize=value=>String(value||'').replace(/\s+/g,' ').trim();
const failure=(code,message)=>Object.assign(new Error(message),{code});

export function isPublicAddress(address) {
  const kind=isIP(address);
  if(kind===4) {
    const [a,b,c]=address.split('.').map(Number);
    return !(a===0||a===10||a===127||a>=224||a===169&&b===254||a===172&&b>=16&&b<=31||a===192&&b===168||a===100&&b>=64&&b<=127||a===192&&b===0||a===198&&(b===18||b===19)||a===198&&b===51&&c===100||a===203&&b===0&&c===113);
  }
  if(kind===6) {
    const value=address.toLowerCase();
    // Permit global unicast only; mapped IPv4, local/link-local, multicast,
    // documentation, Teredo and 6to4 addresses cannot reach the transport.
    const [first,second]=value.split(':').map(part=>parseInt(part||'0',16));
    return !value.includes('%')&&first>=0x2000&&first<0x3fff&&first!==0x2002&&!(first===0x2001&&(second<0x200||second===0xdb8));
  }
  return false;
}

async function validatedDestination(input,resolver,signal) {
  let url;try{url=new URL(input);}catch{throw failure('invalid_url','Invalid source URL');}
  if(url.protocol!=='https:'||url.username||url.password||url.port&&url.port!=='443'||!allowedHosts.has(url.hostname))throw failure('source_not_allowed','Only HTTPS URLs on registered institutional hosts are allowed');
  url.hash='';
  const addresses=await Promise.race([
    resolver(url.hostname,{all:true,verbatim:true}),
    new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(failure('source_timeout','Source lookup timed out')),{once:true})),
  ]);
  const entries=Array.isArray(addresses)?addresses:[addresses];
  if(!entries.length||entries.some(entry=>!isPublicAddress(typeof entry==='string'?entry:entry.address)))throw failure('private_address','Source DNS resolved to a non-public address');
  return {url,addresses:entries.map(entry=>typeof entry==='string'?{address:entry,family:isIP(entry)}:entry)};
}

// Pin the checked DNS answer to the connection. Native fetch would perform a
// second DNS lookup and leave a DNS rebinding window between check and connect.
function pinnedFetch(url,{signal,headers,approvedAddresses}) {
  return new Promise((resolve,reject)=>{
    const request=https.request(url,{
      method:'GET',signal,headers,
      lookup:(_hostname,options,callback)=>options?.all?callback(null,approvedAddresses):callback(null,approvedAddresses[0].address,approvedAddresses[0].family),
    },response=>{
      const status=response.statusCode||500;
      const body=[204,205,304].includes(status)?null:Readable.toWeb(response);
      resolve(new Response(body,{status,headers:response.headers}));
    });
    request.on('error',reject);request.end();
  });
}

async function readBounded(response,maxBytes,signal) {
  if(Number(response.headers.get('content-length'))>maxBytes){await response.body?.cancel();throw failure('document_too_large','Document exceeds the byte limit');}
  const chunks=[];let length=0;
  if(!response.body)return Buffer.alloc(0);
  const reader=response.body.getReader();
  const abort=()=>{reader.cancel().catch(()=>{});};
  signal.addEventListener('abort',abort,{once:true});
  try {
    for(;;){
      if(signal.aborted)throw failure('source_timeout','Source retrieval timed out');
      const {done,value}=await reader.read();
      if(done){if(signal.aborted)throw failure('source_timeout','Source retrieval timed out');break;}
      length+=value.byteLength;
      if(length>maxBytes){await reader.cancel();throw failure('document_too_large','Document exceeds the byte limit');}
      chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks,length);
  }finally{signal.removeEventListener('abort',abort);reader.releaseLock();}
}

export async function safeFetch(input,{fetcher=pinnedFetch,resolver=lookup,maxBytes=1024*1024,timeoutMs=12000,maxRedirects=3,beforeRequest}={}) {
  const limit=Math.max(1,Math.min(1024*1024,Number(maxBytes)||1024*1024));
  const redirectLimit=Math.max(0,Math.min(3,Number(maxRedirects)||0));
  const signal=AbortSignal.timeout(Math.max(1,Math.min(30000,Number(timeoutMs)||12000)));
  let target=input;
  for(let redirects=0;;redirects++) {
    const {url,addresses}=await validatedDestination(target,resolver,signal);
    if(beforeRequest)await beforeRequest(url.href);
    let response;
    try{response=await fetcher(url.href,{method:'GET',redirect:'manual',signal,approvedAddresses:addresses,headers:{'User-Agent':userAgent,Accept:'text/html, application/xml, text/plain;q=0.8','Accept-Encoding':'identity'}});}
    catch{throw failure(signal.aborted?'source_timeout':'source_network_error','Unable to retrieve institutional source');}
    if([301,302,303,307,308].includes(response.status)) {
      const location=response.headers.get('location');await response.body?.cancel();
      if(!location)throw failure('invalid_redirect','Source redirect has no location');
      if(redirects>=redirectLimit)throw failure('redirect_limit','Too many source redirects');
      target=new URL(location,url).href;continue;
    }
    return {url:url.href,status:response.status,headers:response.headers,bytes:await readBounded(response,limit,signal)};
  }
}

export function robotsAllows(text,target,agent='felexiaintelligence') {
  const groups=[];let group={agents:[],rules:[]};let rulesSeen=false;
  for(const raw of String(text).split(/\r?\n/)) {
    const line=raw.replace(/#.*$/,'').trim();const colon=line.indexOf(':');if(colon<0)continue;
    const field=line.slice(0,colon).toLowerCase().trim(),value=line.slice(colon+1).trim();
    if(field==='user-agent') {
      if(rulesSeen){groups.push(group);group={agents:[],rules:[]};rulesSeen=false;}
      group.agents.push(value.toLowerCase());
    }else if(['allow','disallow'].includes(field)&&group.agents.length){group.rules.push({allow:field==='allow',path:value});rulesSeen=true;}
  }
  groups.push(group);
  const rank=g=>Math.max(-1,...g.agents.map(a=>a==='*'?0:agent.includes(a)?a.length:-1));
  const best=Math.max(-1,...groups.map(rank));
  const path=new URL(target).pathname+new URL(target).search;
  let match={length:-1,allow:true};
  for(const rule of groups.filter(g=>rank(g)===best).flatMap(g=>g.rules)) {
    if(!rule.path)continue;
    const pattern='^'+rule.path.split('*').map(part=>part.replace(/[.+?^{}()|[\]\\]/g,'\\$&')).join('.*').replace(/\$$/,'$');
    if(new RegExp(pattern).test(path)) {
      const length=rule.path.replace(/\*/g,'').length;
      if(length>match.length||length===match.length&&rule.allow)match={length,allow:rule.allow};
    }
  }
  return match.allow;
}

function crawlDelay(text) {
  // Respect the non-standard Crawl-delay extension conservatively, including
  // values for other bots. Large delays defer this source instead of crawling.
  return Math.max(0,...[...String(text).matchAll(/^\s*crawl-delay\s*:\s*(\d+(?:\.\d+)?)\s*(?:#.*)?$/gim)].map(match=>Number(match[1])));
}

export async function collectSources({sources=SOURCE_REGISTRY,maxDocuments=2,fetcher,resolver,now=new Date(),timeoutMs=12000}={}) {
  const timestamp=new Date(now).toISOString();
  const requested=sources.map(source=>typeof source==='string'?SOURCE_REGISTRY.find(item=>item.id===source):source).filter(Boolean);
  const selected=[...new Map(requested.map(source=>[source.url,source])).values()].slice(0,Math.max(1,Math.min(8,Number(maxDocuments)||2)));
  const results=[];const robotsCache=new Map();
  for(const source of selected) {
    const base={id:source.id||sha(source.url).slice(0,20),url:source.url,issuer:source.issuer||'',language:source.language||'fr',title:source.title||source.issuer||'',discoveredAt:timestamp,retrievedAt:null,publicationDate:null,documentType:'html',trust:'primary-host'};
    try {
      const target=new URL(source.url);
      if(!allowedHosts.has(target.hostname))throw failure('source_not_allowed','Source is not in the institutional allowlist');
      const checkPolicy=async destination=>{
        const destinationUrl=new URL(destination);let robots=robotsCache.get(destinationUrl.origin);
        if(!robots){robots=await safeFetch(`${destinationUrl.origin}/robots.txt`,{fetcher,resolver,maxBytes:64*1024,timeoutMs});robotsCache.set(destinationUrl.origin,robots);}
        if(robots.status!==404&&robots.status!==410&&robots.status!==200)throw failure('robots_unavailable','Robots policy could not be determined; collection skipped');
        if(robots.status===200&&!robotsAllows(robots.bytes.toString('utf8'),destinationUrl.href))throw failure('robots_disallowed','Institutional robots policy disallows this URL');
        const seconds=robots.status===200?crawlDelay(robots.bytes.toString('utf8')):0;
        if(seconds>10)throw failure('crawl_delay_deferred','Source requests a crawl delay above this bounded worker window');
        if(seconds)await delay(seconds*1000);
      };
      const document=await safeFetch(source.url,{fetcher,resolver,timeoutMs,beforeRequest:checkPolicy});
      if(document.status!==200)throw failure(`source_http_${document.status}`,`Institutional source returned HTTP ${document.status}`);
      const type=String(document.headers.get('content-type')||'').toLowerCase();
      if(!['','identity'].includes(String(document.headers.get('content-encoding')||'').toLowerCase()))throw failure('unsupported_encoding','The source ignored identity encoding; compressed documents are not extracted');
      const fingerprint=sha(document.bytes);
      if(type.includes('application/pdf')||document.bytes.subarray(0,5).toString()==='%PDF-'){
        results.push({...base,url:document.url,retrievedAt:timestamp,documentType:'pdf',fingerprint,excerpt:'',text:'',status:'unsupported',errorCode:'pdf_extraction_unavailable',error:'PDF extraction is not implemented; no regulatory facts were extracted'});continue;
      }
      if(!/^text\/(?:html|plain)|^(?:application|text)\/(?:rss\+xml|atom\+xml|xml)/.test(type))throw failure('unsupported_content_type','Only HTML, text and XML discovery documents are supported');
      const raw=document.bytes.toString('utf8');let text,title=base.title;
      if(type.includes('html')||type.includes('xml')) {
        const $=load(raw);title=normalize($('title').first().text()||$('h1').first().text()||title);
        $('script,style,noscript,template,iframe,object,embed,form,nav,header,footer,[hidden],[aria-hidden="true"]').remove();
        text=normalize(($('main').first().length?$('main').first():$('body')).text());
        if(!text&&type.includes('xml'))text=normalize($.root().text());
      }else text=normalize(raw);
      if(!text)throw failure('empty_document','No documentary text could be extracted');
      const finalIssuer=SOURCE_REGISTRY.find(item=>new URL(item.url).hostname.replace(/^www\./,'')===new URL(document.url).hostname.replace(/^www\./,''))?.issuer||base.issuer;
      results.push({...base,url:document.url,issuer:finalIssuer,title,retrievedAt:timestamp,fingerprint,excerpt:text.slice(0,1500),text:text.slice(0,16000),status:'retrieved'});
    }catch(error){results.push({...base,status:'error',excerpt:'',text:'',fingerprint:null,errorCode:error.code||'source_error',error:error.code?error.message:'Unable to collect source'});}
  }
  return results;
}
