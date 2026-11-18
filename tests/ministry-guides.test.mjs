import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {load} from 'cheerio';
import {company} from '../src/content.mjs';

const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('src/guides-ministry.json',root),'utf8'));
const languages=['fr','en','ar'];
const dossierSlug='plf-2027-maroc-documents-officiels';
const sourceUrl=value=>{
  const url=new URL(value);
  assert.equal(url.protocol,'https:');
  assert.ok(['finances.gov.ma','www.finances.gov.ma'].includes(url.hostname));
  assert.equal(url.username+url.password,'');
  return url;
};
const sourceDate=value=>{
  assert.ok(Number.isFinite(Date.parse(value)),`Valid source date: ${value}`);
  assert.ok(value.slice(0,10)<='2026-10-28',`No future source: ${value}`);
};
const articleDocument=async(slug,language)=>load(await readFile(new URL(`dist/${language}/guides/${slug}/index.html`,root),'utf8'));

test('the Ministry release covers the six October news items and a separately sourced PLF dossier',async()=>{
  assert.equal(data.newsPeriod.from,'2026-10-01');
  assert.equal(data.newsPeriod.to,'2026-10-28');
  sourceDate(data.checkedAt);
  assert.equal(data.articles.length,7);
  assert.equal(new Set(data.articles.map(article=>article.slug)).size,7);
  const news=data.articles.filter(article=>article.slug!==dossierSlug);
  assert.equal(news.length,6);
  const dossier=data.articles.find(article=>article.slug===dossierSlug);
  assert.ok(dossier);
  assert.equal(sourceUrl(dossier.sourceUrl).pathname,'/fr/vous-orientez/Pages/plf2027.aspx');
  for(const article of data.articles){
    sourceUrl(article.sourceUrl);sourceDate(article.sourceDate);
    assert.equal(article.publicationDate.slice(0,10),'2026-10-28');
    assert.equal(article.modifiedDate.slice(0,10),'2026-10-28');
    if(article!==dossier){assert.match(article.slug,/^ministere-economie-finances-/);assert.ok(article.sourceDate.slice(0,10)>='2026-10-01');}
    for(const language of languages){
      const translation=article.translations[language];
      for(const field of ['title','excerpt','metaTitle','metaDescription','html','category','alt'])assert.ok(typeof translation[field]==='string'&&translation[field].trim(),`${article.slug}.${language}.${field}`);
      assert.ok(Array.isArray(translation.faq));
      assert.doesNotMatch(translation.html,/<(?:script|iframe|form|object|embed)\b|\son\w+\s*=/i);
    }
    for(const asset of [article.cover.src,article.cover.smallSrc]){
      assert.ok(asset.startsWith('/images/')||asset.startsWith('/assets/'));
      assert.ok((await stat(new URL('public'+asset,root))).size>0,asset);
    }
  }
  assert.ok(data.documents.length>=18,'Complete initial PLF inventory and all discovered official additions');
  if(data.documentCount!==undefined)assert.equal(data.documentCount,data.documents.length);
  const documents=new Set();
  for(const document of data.documents){
    const url=sourceUrl(document.url);
    assert.match(url.pathname,/\.pdf$/i);
    assert.ok(document.title?.trim());
    assert.equal(document.status,'project');
    if(document.officialDate)sourceDate(document.officialDate);
    assert.ok(!documents.has(url.href),`Duplicate official PDF: ${url.href}`);documents.add(url.href);
  }
});

test('all twenty-one localised Ministry pages are public, reciprocal and preserve source provenance',async()=>{
  const manifest=new Set(JSON.parse(await readFile(new URL('dist/route-manifest.json',root),'utf8')));
  const sitemap=load(await readFile(new URL('dist/sitemap.xml',root),'utf8'),{xmlMode:true});
  const locations=new Set(sitemap('url > loc').map((_,element)=>sitemap(element).text()).get());
  for(const language of languages){
    const catalogue=load(await readFile(new URL(`dist/${language}/guides/index.html`,root),'utf8'));
    for(const article of data.articles){
      const path=`/${language}/guides/${article.slug}/`;
      const canonical=company.origin+path;
      const $=await articleDocument(article.slug,language);
      assert.ok(manifest.has(path),path);assert.ok(locations.has(canonical),canonical);
      assert.equal(catalogue(`[data-guide-card][href="${path}"]`).length,1,path);
      assert.equal($('html').attr('lang'),language);
      assert.equal($('html').attr('dir'),language==='ar'?'rtl':'ltr');
      assert.equal($('main h1').text(),article.translations[language].title);
      assert.equal($('link[rel=canonical]').length,1);
      assert.equal($('link[rel=canonical]').attr('href'),canonical);
      assert.ok(!/noindex/i.test($('meta[name=robots]').attr('content')||''));
      assert.equal($('[data-ministry-editorial]').length,1);
      for(const target of languages)assert.equal($(`head link[hreflang="${target}"]`).attr('href'),`${company.origin}/${target}/guides/${article.slug}/`);
      assert.equal($('head link[hreflang="x-default"]').attr('href'),`${company.origin}/fr/guides/${article.slug}/`);
      const graph=JSON.parse($('script[type="application/ld+json"]').text())['@graph'];
      const schema=graph.find(node=>node['@type']==='Article');
      assert.equal(schema.datePublished,article.publicationDate);
      assert.equal(schema.dateModified,article.modifiedDate);
      assert.equal(schema.citation,article.sourceUrl);
      assert.equal(schema.isBasedOn.url,article.sourceUrl);
      assert.equal(schema.isBasedOn.datePublished,article.sourceDate);
      assert.ok($('main a[href]').toArray().some(element=>$(element).attr('href')===article.sourceUrl),'Visible official source link');
    }
  }
});

test('every official PLF document is linked in all three dossiers with its draft status',async()=>{
  const wording={fr:/projet/i,en:/draft|bill|proposal/i,ar:/مشروع/};
  for(const language of languages){
    const $=await articleDocument(dossierSlug,language);
    const editorial=$('[data-ministry-editorial]');
    assert.match(editorial.text(),wording[language]);
    const links=new Set(editorial.find('a[href]').map((_,element)=>{
      try{return new URL($(element).attr('href'),company.origin).href;}catch{return '';}
    }).get());
    for(const document of data.documents)assert.ok(links.has(new URL(document.url).href),`${language}: missing official PDF ${document.title}`);
  }
});

test('the seven Ministry covers are distinct generated illustrations with visible localised captions and consistent image metadata',async()=>{
  assert.equal(new Set(data.articles.map(article=>article.cover.src)).size,7);
  const captions={fr:'Illustration générée par IA.',en:'AI-generated illustration.',ar:'صورة توضيحية مولدة بالذكاء الاصطناعي.'};
  for(const article of data.articles){
    assert.equal(article.cover.method,'ai-generated-imagegen',article.slug);
    assert.match(article.cover.src,/^\/images\/guides\/illustrations\/[a-z0-9-]+\.webp$/);
    for(const language of languages){
      const $=await articleDocument(article.slug,language);
      const image=$('main img.guide-cover-image').first();
      const caption=$('[data-guide-image-caption]');
      assert.equal(caption.length,1,`${language}/${article.slug}: one caption`);
      assert.equal($('[data-ai-cover-credit]').length,1);
      assert.equal(caption.text(),captions[language]);
      assert.equal(image.attr('aria-describedby'),caption.attr('id'));
      assert.equal(image.parent().next('[data-guide-image-caption]').length,1,'Caption directly below the cover');
      assert.equal(image.attr('src'),article.cover.src);
      assert.equal(image.attr('alt'),article.translations[language].alt);
      assert.equal(image.attr('srcset'),`${article.cover.smallSrc} 640w, ${article.cover.src} 1280w`);
      for(const selector of ['meta[property="og:image"]','meta[name="twitter:image"]'])assert.equal($(selector).attr('content'),company.origin+article.cover.src);
      for(const selector of ['meta[property="og:image:alt"]','meta[name="twitter:image:alt"]'])assert.equal($(selector).attr('content'),article.translations[language].alt);
      const graph=JSON.parse($('script[type="application/ld+json"]').text())['@graph'];
      assert.equal(graph.find(node=>node['@type']==='Article').image,company.origin+article.cover.src);
      const catalogue=load(await readFile(new URL(`dist/${language}/guides/index.html`,root),'utf8'));
      const card=catalogue(`[data-guide-card][href="/${language}/guides/${article.slug}/"] img`);
      assert.equal(card.attr('src'),article.cover.src);
      assert.equal(card.attr('alt'),article.translations[language].alt);
    }
  }
});
