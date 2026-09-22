import { mkdir, cp, writeFile, readFile, readdir } from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {brotliCompress,gzip,constants} from 'node:zlib';
import {promisify} from 'node:util';
import { renderSite } from '../src/templates.mjs';
import {company,languages} from '../src/content.mjs';
import {load} from 'cheerio';
import {revisedSlugs} from '../src/seo.mjs';
import {editorialDate} from '../src/seo-content.mjs';
await mkdir('dist', {recursive:true});
const pages=renderSite();
await writeFile('public/mylegal/legacy.css','@scope (.felexia-legacy) {\n'+await readFile('public/styles.css','utf8')+'\n}\n');
await cp('public', 'dist', {recursive:true});
const hashes=Object.fromEntries(await Promise.all(['app.js','styles.css'].map(async name=>[name,createHash('sha256').update(await readFile('public/'+name)).digest('hex').slice(0,12)])));
for(const [path,source] of Object.entries(pages)){ const file=`dist/${path}`;const html=source.replace('/app.js"',`/app.js?v=${hashes['app.js']}"`).replace('/styles.css"',`/styles.css?v=${hashes['styles.css']}"`);pages[path]=html;await mkdir(file.slice(0,file.lastIndexOf('/')), {recursive:true}); await writeFile(file,html); }
const routes=Object.entries(pages).filter(([p,html])=>{
  if(p==='index.html')return false;
  const $=load(html);
  return !/noindex/.test($('meta[name="robots"]').attr('content')||'')&&$('link[rel="canonical"]').attr('href')===company.origin+'/'+p.replace(/index\.html$/,'');
}).map(([p])=>'/'+p.replace(/index\.html$/,''));
const xmlEscape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const lastmod=route=>revisedSlugs.has(route.replace(/^\/(fr|en|ar)\//,'').replace(/\/$/,''))?`<lastmod>${editorialDate}</lastmod>`:'';
const sitemap='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+routes.map(route=>`<url><loc>${xmlEscape(company.origin+route)}</loc>${lastmod(route)}${languages.filter(l=>routes.includes(route.replace(/^\/(fr|en|ar)\//,'/'+l+'/'))).map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(company.origin+route.replace(/^\/(fr|en|ar)\//,'/'+l+'/'))}"/>`).join('')}</url>`).join('')+'</urlset>';
await writeFile('dist/sitemap.xml',sitemap);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /*/404/\nSitemap: ${company.origin}/sitemap.xml\n`);
await writeFile('dist/_redirects','/ /fr/ 302\n');
await writeFile('dist/404.html',pages['fr/404/index.html']);
async function compressDirectory(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+item.name;if(item.isDirectory()){await compressDirectory(path);continue;}if(!/\.(html|css|js|svg|xml|txt)$/.test(path))continue;const bytes=await readFile(path);const [br,gz]=await Promise.all([promisify(brotliCompress)(bytes,{params:{[constants.BROTLI_PARAM_QUALITY]:6}}),promisify(gzip)(bytes,{level:9})]);await Promise.all([writeFile(path+'.br',br),writeFile(path+'.gz',gz)]);}}
await compressDirectory('dist');
console.log(`Built ${Object.keys(pages).length} pages. No runtime dependencies.`);
