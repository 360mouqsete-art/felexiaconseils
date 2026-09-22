import {readFile,readdir} from 'node:fs/promises';
import {createServer} from '../server.mjs';
import {once} from 'node:events';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
async function walk(dir){const result=[];for(const x of await readdir(dir,{withFileTypes:true})){const p=dir+'/'+x.name;if(x.isDirectory())result.push(...await walk(p));else if(p.endsWith('/index.html'))result.push(p);}return result;}
const paths=(await walk('dist')).filter(x=>x!=='dist/index.html');
const server=createServer({env:{}});server.listen(0,'127.0.0.1');await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;
try{let passed=0;for(const path of paths){const route=path.replace(/^dist/,'').replace(/index\.html$/,'');const response=await fetch(base+route);assert.equal(response.status,200,route);assert.match(await response.text(),/<h1/);passed++;}
for(const locale of ['fr','en','ar'])for(const route of ['','about','services','create','legal-advisory','modify-company','support','contact','legal','terms','privacy']){const response=await fetch(`${base}/${locale}${route?'/'+route:''}`,{redirect:'follow'});assert.equal(response.status,200);}
const br=await fetch(base+'/fr/',{headers:{'Accept-Encoding':'br'}});assert.equal(br.headers.get('content-encoding'),'br');assert.match(await br.text(),/Felexia/);
const gz=await fetch(base+'/app.js',{headers:{'Accept-Encoding':'gzip'}});assert.equal(gz.headers.get('content-encoding'),'gzip');assert.match(await gz.text(),/wizard/);
const sitemap=await readFile('dist/sitemap.xml','utf8');const sitemapCount=(sitemap.match(/<loc>/g)||[]).length;let indexable=0;for(const p of paths){const $=load(await readFile(p,'utf8'));if(!/noindex/.test($('meta[name=robots]').attr('content')||'')&&new URL($('link[rel=canonical]').attr('href')).pathname===p.replace(/^dist/,'').replace(/index\.html$/,''))indexable++;}assert.equal(sitemapCount,indexable);
console.log(`PASS: ${passed} routes served, 33 historical URLs preserved, ${sitemapCount} sitemap URLs, Brotli and gzip verified.`);
}finally{server.closeAllConnections();await new Promise(r=>server.close(r));}
