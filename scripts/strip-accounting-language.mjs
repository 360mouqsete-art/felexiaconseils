import {copyFile, rm} from 'node:fs/promises';
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {unpublishedAccountingSlugs, publishedSlugFor} from '../src/unpublished-accounting-guides.mjs';
import {scrubAccountingHtml, scrubAccountingText} from '../src/accounting-language.mjs';

const renamedFrom = 'resultat-comptable-resultat-fiscal-is-maroc';
const renamedTo = publishedSlugFor(renamedFrom);
for (const suffix of ['.webp', '-640.webp']) {
  const from = `public/images/guides/${renamedFrom}${suffix}`;
  const to = `public/images/guides/${renamedTo}${suffix}`;
  if (existsSync(from)) await copyFile(from, to);
  if (existsSync(from)) await rm(from);
}
let removedFiles = 0;
for (const slug of unpublishedAccountingSlugs) {
  for (const file of [`public/images/guides/${slug}.webp`, `public/images/guides/${slug}-640.webp`, `public/documents/guides/${slug}.pdf`]) {
    if (!existsSync(file)) continue;
    await rm(file);
    removedFiles += 1;
  }
}

const guides = JSON.parse(readFileSync('src/guides-imported.json', 'utf8'));
let replacements = 0;
const count = (before, after) => { if (before !== after) replacements += 1; return after; };
for (const guide of guides) {
  if (unpublishedAccountingSlugs.includes(guide.slug)) continue;
  for (const key of ['title', 'excerpt', 'metaTitle', 'metaDescription', 'html']) {
    if (typeof guide[key] === 'string') guide[key] = count(guide[key], scrubAccountingHtml(guide[key]));
  }
  if (Array.isArray(guide.faq)) for (const item of guide.faq) {
    if (typeof item.question === 'string') item.question = count(item.question, scrubAccountingText(item.question));
    if (typeof item.answer === 'string') item.answer = count(item.answer, scrubAccountingText(item.answer));
  }
}
writeFileSync('src/guides-imported.json', JSON.stringify(guides, null, 2) + '\n');

const covers = JSON.parse(readFileSync('src/guide-covers.json', 'utf8'));
const coverMap = covers.covers || covers;
for (const [slug, cover] of Object.entries(coverMap)) {
  if (!cover || typeof cover.alt !== 'string') continue;
  cover.alt = count(cover.alt, scrubAccountingText(cover.alt));
}
writeFileSync('src/guide-covers.json', JSON.stringify(covers, null, 2) + '\n');

for (const file of [
  'src/guides-lot-1.mjs','src/guides-lot-1b.mjs','src/guides-lot-1c.mjs','src/guides-lot-2.mjs','src/guides-lot-2b.mjs',
  'src/audit-guides.mjs','src/seo-content.mjs','src/intelligence/reserve.json','scripts/prepare-intelligence-reserve.mjs',
  'src/translations/part-1.json','src/translations/part-2.json','src/translations/part-3.json'
]) {
  const before = readFileSync(file, 'utf8');
  const after = scrubAccountingHtml(before);
  if (after !== before) { writeFileSync(file, after); replacements += 1; }
}

const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
const present = new Set(vercel.redirects.map(item => item.source));
for (const slug of unpublishedAccountingSlugs) for (const lang of ['fr', 'en', 'ar']) {
  const source = `/${lang}/guides/${slug}/`;
  if (present.has(source)) continue;
  vercel.redirects.push({source, destination:`/${lang}/guides/`, statusCode:301});
}
const renamedSource = `/${'fr'}/guides/${renamedFrom}/`;
for (const lang of ['fr', 'en', 'ar']) {
  const source = `/${lang}/guides/${renamedFrom}/`;
  if (!present.has(source)) vercel.redirects.push({source, destination:`/${lang}/guides/${renamedTo}/`, statusCode:301});
}
writeFileSync('vercel.json', JSON.stringify(vercel, null, 2) + '\n');
console.log(JSON.stringify({unpublished:unpublishedAccountingSlugs.length, removedFiles, replacements, renamedTo}, null, 2));
