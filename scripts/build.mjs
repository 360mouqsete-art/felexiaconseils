import { mkdir, cp, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import {resolve,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {brotliCompress,gzip,constants} from 'node:zlib';
import {promisify} from 'node:util';
import { renderSite } from '../src/templates.mjs';
import {company,languages} from '../src/content.mjs';
import {load} from 'cheerio';
import {scrubAccountingHtml} from '../src/accounting-language.mjs';
import {editorialDate} from '../src/seo-content.mjs';
import {withdrawnGuideSlugs} from '../src/withdrawn-guides.mjs';
await mkdir('dist', {recursive:true});
// Only retire the old, generated Guides pagination directories. Verify each
// absolute target stays inside this workspace's output before recursive removal.
const outputRoot=resolve('dist');
for(const language of ['fr','en','ar']){
  const obsolete=resolve(outputRoot,language,'guides','page');
  if(!obsolete.startsWith(outputRoot+sep)||obsolete!==resolve('dist',language,'guides','page'))throw new Error('Unsafe generated pagination path');
  await rm(obsolete,{recursive:true,force:true});
}
const pages=renderSite();
await writeFile('dist/route-manifest.json',JSON.stringify(Object.keys(pages).map(p=>'/'+p.replace(/index\.html$/,''))));
await writeFile('public/mylegal/legacy.css','@scope (.felexia-legacy) {\n'+await readFile('public/styles.css','utf8')+'\n}\n');
await cp('public', 'dist', {recursive:true});
const hashes=Object.fromEntries(await Promise.all(['app.js','styles.css'].map(async name=>[name,createHash('sha256').update(await readFile('public/'+name)).digest('hex').slice(0,12)])));
for(const [path,source] of Object.entries(pages)){ const file=`dist/${path}`;const html=scrubAccountingHtml(source).replace('/app.js"',`/app.js?v=${hashes['app.js']}"`).replace('/styles.css"',`/styles.css?v=${hashes['styles.css']}"`);pages[path]=html;await mkdir(file.slice(0,file.lastIndexOf('/')), {recursive:true}); await writeFile(file,html); }
const routes=Object.entries(pages).filter(([p,html])=>{
  if(p==='index.html'||withdrawnGuideSlugs.some(slug=>p.includes(`/guides/${slug}/`)))return false;
  const $=load(html);
  return !/noindex/.test($('meta[name="robots"]').attr('content')||'')&&$('link[rel="canonical"]').attr('href')===company.origin+'/'+p.replace(/index\.html$/,'');
}).map(([p])=>'/'+p.replace(/index\.html$/,''));
const xmlEscape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const isoDate=value=>{const match=String(value||'').match(/\d{4}-\d{2}-\d{2}/);return match?match[0]:'';};
const contentDate=html=>{
  const $=load(html);
  const dates=[
    isoDate($('meta[property="article:modified_time"]').attr('content')),
    isoDate($('meta[property="article:published_time"]').attr('content')),
    isoDate($('main time').first().attr('datetime'))
  ].filter(Boolean).sort();
  return dates.at(-1)||editorialDate;
};
const lastmod=route=>`<lastmod>${contentDate(pages[route.replace(/^\//,'')+'index.html']||'')}</lastmod>`;
const alternates=route=>{const present=languages.filter(l=>routes.includes(route.replace(/^\/(fr|en|ar)\//,'/'+l+'/')));const french=route.replace(/^\/(fr|en|ar)\//,'/fr/');const fallback=routes.includes(french)?french:route;return present.map(l=>`<xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(company.origin+route.replace(/^\/(fr|en|ar)\//,'/'+l+'/'))}"/>`).join('')+`<xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(company.origin+fallback)}"/>`;};
const sitemap='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+routes.map(route=>`<url><loc>${xmlEscape(company.origin+route)}</loc>${lastmod(route)}${alternates(route)}</url>`).join('')+'</urlset>';
await writeFile('dist/sitemap.xml',sitemap);
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /intelligence/\nDisallow: /*/404/\nSitemap: ${company.origin}/sitemap.xml\n`);
await writeFile('dist/_redirects','/ /fr/ 308\n');
await writeFile('dist/404.html',pages['fr/404/index.html']);
async function compressDirectory(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+item.name;if(item.isDirectory()){await compressDirectory(path);continue;}if(!/\.(html|css|js|svg|xml|txt)$/.test(path))continue;const bytes=await readFile(path);const [br,gz]=await Promise.all([promisify(brotliCompress)(bytes,{params:{[constants.BROTLI_PARAM_QUALITY]:6}}),promisify(gzip)(bytes,{level:9})]);await Promise.all([writeFile(path+'.br',br),writeFile(path+'.gz',gz)]);}}
await compressDirectory('dist');
// Vercel serves files before rewrites. Keep the complete historical Guides in
// dist for the Functions' includeFiles and local fallback, but exclude their
// public paths from the static deployment so live catalogues and sitemap run.
const staticRoot=resolve('dist-site');
const workspaceRoot=resolve('.');
if(staticRoot!==resolve(workspaceRoot,'dist-site')||!staticRoot.startsWith(workspaceRoot+sep)||staticRoot===outputRoot)throw new Error('Unsafe static deployment path');
await rm(staticRoot,{recursive:true,force:true});
await cp(outputRoot,staticRoot,{recursive:true,filter:source=>{
  const relative=source.slice(outputRoot.length).replaceAll('\\','/').replace(/^\//,'');
  return !/^(?:fr|en|ar)\/guides\//.test(relative)&&!/^sitemap\.xml(?:\.(?:br|gz))?$/.test(relative);
}});
console.log(`Built ${Object.keys(pages).length} pages, route manifest and the static deployment output.`);
