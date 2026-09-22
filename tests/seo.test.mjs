import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {load} from 'cheerio';
import {company} from '../src/content.mjs';
const docs=new Map();
function walk(dir){for(const e of readdirSync(dir,{withFileTypes:true})){const path=dir+'/'+e.name;if(e.isDirectory())walk(path);else if(e.name==='index.html'&&path!=='dist/index.html')docs.set(path.replace(/^dist/,'').replace(/index\.html$/,''),load(readFileSync(path)));}}
walk('dist');
test('SEO has one coherent metadata set and real reciprocal language equivalents',()=>{
  for(const [path,$]of docs){
    for(const selector of ['title','meta[name=description]','link[rel=canonical]','meta[property="og:url"]','meta[property="og:title"]','meta[name="twitter:card"]','script[type="application/ld+json"]'])assert.equal($(selector).length,1,path+' '+selector);
    const canonical=$('link[rel=canonical]').attr('href');assert.equal(new URL(canonical).origin,company.origin);assert.equal($('meta[property="og:url"]').attr('content'),canonical);
    assert.equal($('meta[property="og:title"]').attr('content'),$('title').text());
    for(const lang of ['fr','en','ar']){const link=$(`link[hreflang=${lang}]`);assert.equal(link.length,1);const target=docs.get(new URL(link.attr('href')).pathname);assert.ok(target,path+' '+lang);assert.equal(target('html').attr('lang'),lang);assert.equal(target('link[rel=canonical]').attr('href'),link.attr('href'));}
    assert.equal($('main h1').length,1,path);
  }
});
test('sitemap excludes noindex and canonical duplicates and uses stable modification dates',()=>{
  const $=load(readFileSync('dist/sitemap.xml'),{xmlMode:true});const urls=$('url');const seen=new Set();
  urls.each((_,e)=>{const loc=$(e).find('loc').text();assert.equal(new URL(loc).origin,company.origin);assert.ok(!seen.has(loc));seen.add(loc);const page=docs.get(new URL(loc).pathname);assert.ok(page);assert.equal(page('link[rel=canonical]').attr('href'),loc);assert.ok(!/noindex/.test(page('meta[name=robots]').attr('content')||''));const modified=$(e).find('lastmod').text();if(modified)assert.equal(modified,'2026-09-22');});
  for(const [path,page]of docs){const canonical=page('link[rel=canonical]').attr('href');if(!/noindex/.test(page('meta[name=robots]').attr('content')||'')&&canonical===company.origin+path)assert.ok(seen.has(canonical),path);}
  assert.match(readFileSync('dist/robots.txt','utf8'),new RegExp('Sitemap: '+company.origin+'/sitemap.xml'));
});
test('structured data describes visible breadcrumbs and articles without invented ratings or offers',()=>{
  for(const [path,$]of docs){const data=JSON.parse($('script[type="application/ld+json"]').text());assert.equal(data['@context'],'https://schema.org');const graph=data['@graph'];assert.equal(new Set(graph.map(n=>n['@id'])).size,graph.length);assert.equal(graph.filter(n=>n['@type']==='WebPage').length,1);assert.ok(!/aggregateRating|reviewCount|priceCurrency/.test(JSON.stringify(data)));const crumbs=graph.find(n=>n['@type']==='BreadcrumbList');if(crumbs){const visible=$('main .seo-breadcrumb li');assert.equal(visible.length,crumbs.itemListElement.length,path);crumbs.itemListElement.forEach((item,i)=>assert.equal(visible.eq(i).text(),item.name));}const article=graph.find(n=>n['@type']==='Article');if(article)assert.equal(article.headline,$('main h1').text());}
});
test('priority intent pages keep their routes, differentiated content and conversion links',()=>{
  const creation=docs.get('/fr/creation-entreprise/');assert.equal(creation('title').text(),'Créer une entreprise au Maroc en ligne | Felexia Conseils');
  for(const lang of ['fr','en','ar'])for(const slug of ['creation-entreprise','creation-entreprise-en-ligne','creer-une-sarl-maroc','mre-etranger']){const $=docs.get(`/${lang}/guides/${slug}/`);assert.ok($(`main a[href="/${lang}/creation-entreprise/"]`).length);assert.ok($('.prose-lg p').length>=7);assert.ok($('time[datetime="2026-09-22"]').length);assert.ok(!/100\s*%|10 jours|en quelques jours/.test($('.prose-lg').text()));}
  assert.equal(docs.get('/fr/tarif/creation/')('main article').length,3,'Preserve the three commercial packs');
  for(const slug of ['creation-entreprise','tarif/creation','contact'])assert.equal(docs.get(`/fr/${slug}/`)('meta[name=robots]').length,0);
});
