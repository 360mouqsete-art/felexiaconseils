import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadEnvFile} from 'node:process';
import {createHash} from 'node:crypto';
import {createContactHandler} from './src/contact-api.mjs';
try{loadEnvFile();}catch(e){if(e.code!=='ENOENT')throw e;}
const root=resolve(fileURLToPath(new URL('.',import.meta.url)),'dist');
export function createServer(options={}){const contact=createContactHandler(options);return http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
  try{const url=new URL(req.url,'http://localhost');let pathname=decodeURIComponent(url.pathname);
  if(pathname==='/api/contact')return await contact(req,res);
  if(pathname==='/health'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify({status:'ok'}));}
  if(pathname==='/'){res.writeHead(302,{Location:'/fr/'});return res.end();}
  if(/^\/(creation-entreprise|domiciliation|contact|rejoignez-nous|mentions-legales|politique-confidentialite|cgu|guides(?:\/[a-z0-9-]+)*|tarif\/(creation|domiciliation))\/?$/.test(pathname)){res.writeHead(308,{Location:'/fr'+pathname.replace(/\/$/,'')+'/'+url.search});return res.end();}
  if(pathname==='/fr/guides/'&&url.searchParams.get('page')==='2'){res.writeHead(308,{Location:'/fr/guides/page/2/'});return res.end();}
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end('Method not allowed');}
  let file=resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);return res.end();}
  let info;try{info=await stat(file);}catch{}
  if(info?.isDirectory()){if(!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'+url.search});return res.end();}file=resolve(file,'index.html');}
  let body;try{body=await readFile(file);}catch{res.statusCode=404;const locale=/^\/(fr|en|ar)(\/|$)/.exec(pathname)?.[1]||'fr';try{body=await readFile(resolve(root,locale+'/404/index.html'));}catch{body=Buffer.from('Page introuvable');}file='404.html';}
  const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.avif':'image/avif','.webp':'image/webp','.woff2':'font/woff2'};
  if(extname(file)==='.html'){const scripts=[...body.toString().matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>`'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`);res.setHeader('Content-Security-Policy',`default-src 'self'; script-src 'self' ${scripts.join(' ')}; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`);}
  if(res.statusCode!==404&&/\.(html|css|js|svg|xml|txt)$/.test(file)){res.setHeader('Vary','Accept-Encoding');const accepts=String(req.headers['accept-encoding']||'');const coding=accepts.includes('br')?'br':accepts.includes('gzip')?'gzip':null;if(coding){try{body=await readFile(file+(coding==='br'?'.br':'.gz'));res.setHeader('Content-Encoding',coding);}catch{}}}
  res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');res.setHeader('Cache-Control',extname(file)==='.html'||process.env.NODE_ENV!=='production'?'no-cache':'public, max-age=3600');res.end(req.method==='HEAD'?undefined:body);
  }catch{res.writeHead(400);res.end('Bad request');}
});}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||4173);createServer().listen(port,'0.0.0.0',()=>console.log(`Felexia preview: http://localhost:${port}`));}
