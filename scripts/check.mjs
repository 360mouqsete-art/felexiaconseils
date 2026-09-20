import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
async function walk(dir){const output=[];for(const item of await readdir(dir,{withFileTypes:true})){const file=dir+'/'+item.name;if(item.isDirectory())output.push(...await walk(file));else output.push(file);}return output;}
const files=await walk('dist');let pages=0,links=0,images=0;const failures=[];const titles=new Set();
for(const file of files.filter(f=>f.endsWith('.html')&&!['dist/index.html','dist/404.html'].includes(f))){pages++;const html=await readFile(file,'utf8');
const check=(condition,message)=>{if(!condition)failures.push(`${file}: ${message}`);};
check((html.match(/<h1[ >]/g)||[]).length===1,'exactly one H1');check(/name="description" content="[^"]{20,}"/.test(html),'description');check(/rel="canonical"/.test(html),'canonical');check(html.includes(`hreflang="${file.split('/')[1]}"`),'self language alternate');check(html.includes('id="main"'),'skip target');if(file.startsWith('dist/ar/'))check(html.includes('lang="ar" dir="rtl"'),'Arabic RTL');
const title=html.match(/<title>(.*?)<\/title>/)?.[1];const titleKey=file.split('/')[1]+':'+title;check(!titles.has(titleKey),'unique title');titles.add(titleKey);
for(const match of html.matchAll(/\b(?:href|src)="([^"?#]+)(?:[^\"]*)"/g)){let value=match[1];if(!value.startsWith('/'))continue;links++;let target=resolve('dist','.'+value);try{let info=await stat(target);if(info.isDirectory())await stat(target+'/index.html');}catch{check(false,`broken local link ${value}`);}}
for(const match of html.matchAll(/<img\b[^>]*>/g)){images++;check(/alt="[^"]+"/.test(match[0])||(/alt=""/.test(match[0])&&/aria-hidden="true"/.test(match[0])),'image alt');check(/width="\d+"/.test(match[0])&&/height="\d+"/.test(match[0]),'image dimensions');}
for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{JSON.parse(match[1]);}catch{check(false,'invalid structured data');}}
check(!/Lorem ipsum|TODO|placeholder text|undefined/.test(html),'unfinished content');
}
const css=await readFile('dist/styles.css','utf8');assert.ok(!css.includes('@import'),'Fonts must be hosted locally');for(const match of css.matchAll(/url\((\/[\w/.-]+)\)/g))await stat('dist'+match[1]);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`PASS: ${pages} language pages, ${links} internal links/assets, ${images} images. Metadata, unique titles, local fonts and RTL verified.`);
