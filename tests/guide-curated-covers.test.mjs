import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {curatedCoverManifest,resolveCuratedCover} from '../src/intelligence/curated-covers.mjs';
import {renderIntelligenceGuide,mergeGuideCatalogue,mergeIntelligenceSitemap} from '../src/intelligence/render.mjs';
import {readCuratedReserveImages} from '../scripts/prepare-intelligence-reserve.mjs';
import {fixtureTopic} from './intelligence-fixtures.mjs';

const origin='https://www.felexiaconseils.com';
const languages=['fr','en','ar'];
const [key,entry]=Object.entries(curatedCoverManifest.entries)[0];
const baseHtml='<html><head><title>Guide</title></head><body><main><article><header><h1>Guide</h1><p>Summary</p><div></div></header><img class="guide-cover-image"><nav aria-label="Sommaire"></nav><div class="prose-lg"></div></article></main></body></html>';
const catalogue='<html><head></head><body><main><div data-guide-grid></div><select data-guide-category><option value="">Toutes</option></select><span data-guide-count></span></main></body></html>';

function legacyTopic(){
  const topic=fixtureTopic(key);
  topic.status='published';topic.publishedAt='2026-10-28T09:00:00.000Z';
  topic.image.src=entry.legacySources[0];
  topic.image.smallSrc=topic.image.src.replace('.webp','-640.webp');
  topic.quality={fingerprint:'retained-editorial-fingerprint'};
  return topic;
}

test('legacy state resolves curated cover and localised descriptions without changing editorial state',()=>{
  const topic=legacyTopic(),before=structuredClone(topic),manifestBefore=structuredClone(entry);
  for(const language of languages){
    const image=resolveCuratedCover(topic,language);
    assert.equal(image.src,entry.image.src);
    assert.equal(image.smallSrc,entry.image.smallSrc);
    assert.equal(image.alt,entry.alt[language]);
    image.src='/changed-copy.webp';
  }
  assert.deepEqual(topic,before);
  assert.deepEqual(entry,manifestBefore);
});

test('article, cards, responsive images, social metadata, structured data and sitemap share the curated cover',()=>{
  const topic=legacyTopic(),before=structuredClone(topic);
  for(const language of languages){
    const $=load(renderIntelligenceGuide(topic,language,{baseHtml,origin}));
    const image=$('main img.guide-cover-image');
    assert.equal(image.attr('src'),entry.image.src);
    assert.equal(image.attr('alt'),entry.alt[language]);
    assert.equal(image.attr('srcset'),`${entry.image.smallSrc} 640w, ${entry.image.src} 1280w`);
    for(const selector of ['meta[property="og:image"]','meta[name="twitter:image"]'])assert.equal($(selector).attr('content'),origin+entry.image.src);
    for(const selector of ['meta[property="og:image:alt"]','meta[name="twitter:image:alt"]'])assert.equal($(selector).attr('content'),entry.alt[language]);
    const article=JSON.parse($('script[type="application/ld+json"]').text())['@graph'].find(item=>item['@type']==='Article');
    assert.equal(article.image,origin+entry.image.src);
    const grid=load(mergeGuideCatalogue(catalogue,[topic],language,{origin}));
    const card=grid('[data-guide-card] img');
    assert.equal(card.attr('src'),entry.image.src);
    assert.equal(card.attr('alt'),entry.alt[language]);
    assert.equal(card.attr('srcset'),image.attr('srcset'));
  }
  const sitemap=load(mergeIntelligenceSitemap('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',[topic],{origin}),{xmlMode:true});
  assert.equal(sitemap('url').length,3);
  assert.deepEqual(sitemap('image\\:loc').map((_,node)=>sitemap(node).text()).get(),languages.map(()=>origin+entry.image.src));
  assert.deepEqual(topic,before);
});

test('curated state stays current while a later deliberately selected image is preserved',()=>{
  const topic=legacyTopic();
  topic.image={...entry.image};
  assert.equal(resolveCuratedCover(topic,'en').alt,entry.alt.en);
  topic.image={src:'/images/guides/custom-future.webp',smallSrc:'/images/guides/custom-future-640.webp',width:1280,height:800};
  assert.equal(resolveCuratedCover(topic,'en'),null);
  const $=load(renderIntelligenceGuide(topic,'en',{baseHtml,origin}));
  assert.equal($('main img').attr('src'),topic.image.src);
  assert.equal($('main img').attr('alt'),topic.translations.en.alt);
  topic.id='unrelated-topic';
  assert.equal(resolveCuratedCover(topic,'en'),null);
});

test('reserve preparation reads complete generated WebP pairs and preserves image generation dates',async()=>{
  const topics=Object.keys(curatedCoverManifest.entries).map(id=>({id}));
  assert.ok(topics.length>0);
  const images=await readCuratedReserveImages(topics);
  const hashes=[];
  for(const topic of topics){
    const expected=curatedCoverManifest.entries[topic.id];
    assert.deepEqual(images.get(topic.id),{image:expected.image,alt:expected.alt});
    hashes.push(createHash('sha256').update(await readFile(new URL('../public'+expected.image.src,import.meta.url))).digest('hex'));
  }
  assert.equal(new Set(hashes).size,topics.length,'Each subject has a distinct generated cover');
});

test('reserve preparation refuses missing, unsafe or invalid covers instead of recreating generic artwork',async()=>{
  await assert.rejects(readCuratedReserveImages([{id:'absent-cover'}]),/Curated generated cover required/);
  const fixture={...structuredClone(entry),image:{...entry.image,src:'/../outside.webp'}};
  await assert.rejects(readCuratedReserveImages([{id:'test'}],{entries:{test:fixture}}),/Invalid curated cover path/);
  fixture.image={...entry.image,smallSrc:'/images/guides/illustrations/nonexistent.webp'};
  await assert.rejects(readCuratedReserveImages([{id:'test'}],{entries:{test:fixture}}),/Curated cover file unavailable/);
  fixture.image={...entry.image,smallSrc:entry.image.src};
  await assert.rejects(readCuratedReserveImages([{id:'test'}],{entries:{test:fixture}}),/dimensions do not match/);
  fixture.image={...entry.image,method:'original-vector-fallback'};
  await assert.rejects(readCuratedReserveImages([{id:'test'}],{entries:{test:fixture}}),/Curated generated cover required/);
});
