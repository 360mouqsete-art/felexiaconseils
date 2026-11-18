import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

// The project is JavaScript, with no TypeScript compiler or TypeScript sources.
// Validate the concrete data contract consumed by the static Guides renderer.
const read=async path=>JSON.parse(await readFile(path,'utf8'));
const [guides,covers,source,mapping]=await Promise.all([
  read('src/guides-imported.json'),read('src/guide-covers.json'),
  read('migration-source.json'),read('migration/upsilon/source-destination.json')
]);
const text=(value,name)=>assert.ok(typeof value==='string'&&value.trim(),name);
assert.ok(Array.isArray(guides));
const slugs=new Set();
for(const guide of guides) {
  for(const key of ['slug','title','sourceUrl','excerpt','metaTitle','metaDescription','html','category'])text(guide[key],`${guide.slug}.${key}`);
  assert.match(guide.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(!slugs.has(guide.slug),`Duplicate guide ${guide.slug}`);slugs.add(guide.slug);
  assert.ok(Array.isArray(guide.authors)&&guide.authors.every(a=>typeof a==='string'));
  assert.ok(Array.isArray(guide.faq));
  for(const faq of guide.faq){text(faq.question,'FAQ question');text(faq.answer,'FAQ answer');}
  assert.equal(typeof guide.mergedExisting,'boolean');
  assert.ok(guide.publicationDate&&Number.isFinite(Date.parse(guide.publicationDate)),guide.slug);
  assert.ok(covers[guide.slug],`Cover definition missing: ${guide.slug}`);
  assert.ok(!/<(?:script|iframe|form)\b|\son\w+=/i.test(guide.html),`Unsafe imported markup: ${guide.slug}`);
}
for(const [slug,cover] of Object.entries(covers)) {
  assert.equal(cover.src,`/images/guides/${slug}.webp`);
  assert.equal(cover.smallSrc,`/images/guides/${slug}-640.webp`);
  text(cover.alt,`${slug}.alt`);assert.equal(cover.width,1280);assert.equal(cover.height,800);
}
assert.equal(mapping.length,source.articles.length);
assert.equal(new Set(mapping.map(x=>x.sourceUrl)).size,source.articles.length);
for(const item of mapping){assert.ok(slugs.has(item.slug));assert.equal(item.felexiaUrl,`/fr/guides/${item.slug}/`);}
console.log(`No TypeScript in this project. Validated data types: ${guides.length} imported/enriched guides, ${Object.keys(covers).length} covers, ${mapping.length} source mappings.`);
