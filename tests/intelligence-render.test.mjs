import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {renderIntelligenceGuide, mergeGuideCatalogue, mergeIntelligenceSitemap, findPublishedTopic, mergeHistoricalAlternates} from '../src/intelligence/render.mjs';

const origin = 'https://www.felexiaconseils.com';
const languageSlugs = {fr:'organiser-dossier-pme', en:'organising-business-records', ar:'تنظيم-وثائق-المقاولة'};
const shells = Object.fromEntries(['fr', 'en', 'ar'].map(language => [language, readFileSync(`dist/${language}/guides/creation-entreprise-rabat/index.html`, 'utf8')]));
const topic = {
  id:'topic-records', status:'published', kind:'new', category:'management', risk:'low',
  publishedAt:'2026-10-12T08:00:00.000Z', verifiedAt:'2026-10-11T16:00:00.000Z',
  image:{src:'/images/guides/creation-entreprise-rabat.webp', smallSrc:'/images/guides/creation-entreprise-rabat-640.webp', width:1280, height:800, rights:'owned'},
  sources:[{id:'source-ompic', url:'https://www.ompic.ma/fr/content/creation', title:'Documentation OMPIC', issuer:'OMPIC', retrievedAt:'2026-10-11T16:00:00.000Z'}],
  translations:Object.fromEntries(['fr', 'en', 'ar'].map(language => [language, {
    slug:languageSlugs[language], title:{fr:'Organiser les documents de son entreprise', en:'Organising your business records', ar:'تنظيم وثائق مقاولتك'}[language],
    excerpt:'An article excerpt with useful context.', metaTitle:`Guide ${language} | Felexia Conseils`, metaDescription:`Documentary guide in ${language} for entrepreneurs in Morocco.`, alt:`Business records ${language}`,
    body:[{heading:'Organise your records', paragraphs:['A practical overview of keeping business records together.'], bullets:['List your documents', 'Assign a contact person']}],
    faq:[{question:'Where should I start?', answer:'Begin by identifying the documents already available.'}],
    internalLinks:[{path:`/${language}/contact/`, label:'Contact the firm'}, {path:`/${language}/does-not-exist/`, label:'Unavailable link'}],
    claimIds:[]
  }]))
};
const knownPaths = new Set(['fr', 'en', 'ar'].flatMap(language => [`/${language}/contact/`, `/${language}/guides/${languageSlugs[language]}/`]));
const clone = value => structuredClone(value);
const parse = (value, language = 'fr') => load(renderIntelligenceGuide(value, language, {baseHtml:shells[language], origin, knownPaths}));

test('published articles use the three explicit localised routes and one metadata set', () => {
  for (const language of ['fr', 'en', 'ar']) {
    const $ = parse(topic, language);
    const canonical = `${origin}/${language}/guides/${encodeURIComponent(languageSlugs[language])}/`;
    for (const selector of ['title', 'meta[name="description"]', 'link[rel="canonical"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:url"]', 'meta[property="article:published_time"]', 'meta[name="twitter:card"]', 'script[type="application/ld+json"]']) assert.equal($(selector).length, 1, `${language}: ${selector}`);
    assert.equal($('link[rel="canonical"]').attr('href'), canonical);
    assert.equal($('meta[property="og:url"]').attr('content'), canonical);
    assert.equal($('main h1').text(), topic.translations[language].title);
    assert.equal($('html').attr('lang'), language);
    assert.equal($('html').attr('dir'), language === 'ar' ? 'rtl' : 'ltr');
    for (const target of ['fr', 'en', 'ar']) {
      const href = `${origin}/${target}/guides/${encodeURIComponent(languageSlugs[target])}/`;
      assert.equal($(`head link[hreflang="${target}"]`).attr('href'), href);
      assert.equal($(`.felexia-header-tools a[hreflang="${target}"]`).attr('href'), new URL(href).pathname);
      assert.equal($(`footer .felexia-languages a[hreflang="${target}"]`).attr('href'), new URL(href).pathname);
    }
    assert.equal($('head link[hreflang="x-default"]').attr('href'), `${origin}/fr/guides/${languageSlugs.fr}/`);
    const graph = JSON.parse($('script[type="application/ld+json"]').text())['@graph'];
    const article = graph.find(item => item['@type'] === 'Article');
    assert.equal(article.datePublished, topic.publishedAt);
    assert.equal(article.dateModified, topic.publishedAt);
    assert.equal(article.inLanguage, language);
    assert.deepEqual(article.citation, [topic.sources[0].url]);
    assert.equal(graph.find(item => item['@type'] === 'FAQPage').mainEntity[0].name, topic.translations[language].faq[0].question);
    assert.ok($('.intelligence-disclosure').text());
    assert.ok($(`.intelligence-sources time[datetime="${topic.verifiedAt}"]`).length);
    assert.equal($('main a[href*="does-not-exist"]').length, 0);
    assert.equal($('main .guide-source-supplement').length, 0);
  }
});

test('untrusted model text and source labels cannot create executable HTML', () => {
  const hostile = clone(topic);
  const payload = '</title><script id="injected">alert(1)</script><img id="injected-image" src=x onerror="alert(1)">';
  hostile.translations.fr.title = payload;
  hostile.translations.fr.metaTitle = payload;
  hostile.translations.fr.body[0] = {heading:payload, paragraphs:[payload], bullets:[payload]};
  hostile.translations.fr.faq = [{question:payload, answer:payload}];
  hostile.translations.fr.alt = payload;
  hostile.sources.push({id:'bad', url:'javascript:alert(1)', title:payload});
  hostile.sources[0].title = payload;
  hostile.translations.fr.internalLinks.push({path:'//attacker.invalid/', label:payload});
  const $ = parse(hostile);
  assert.equal($('#injected,#injected-image').length, 0);
  assert.equal($('[onerror]').length, 0);
  assert.equal($('main a[href^="javascript:"],main a[href^="//"]').length, 0);
  assert.equal($('main h1').text(), payload);
  assert.equal($('.prose-lg section').first().find('p').text(), payload);
  assert.ok(JSON.parse($('script[type="application/ld+json"]').text())['@graph']);
});

test('drafts and incomplete groups never become public, and backfill preserves French history', () => {
  const draft = {...topic, status:'draft'};
  const incomplete = clone(topic); delete incomplete.translations.ar;
  assert.equal(findPublishedTopic({topics:[draft, incomplete]}, 'fr', languageSlugs.fr), null);
  assert.throws(() => parse(draft), /published trilingual/);
  assert.throws(() => parse(incomplete), /published trilingual/);
  const historical = {...topic, kind:'backfill'};
  assert.equal(findPublishedTopic({topics:[historical]}, 'fr', languageSlugs.fr), null);
  assert.equal(findPublishedTopic({topics:[historical]}, 'en', languageSlugs.en)?.id, topic.id);
  assert.equal(findPublishedTopic({topics:[topic]}, 'fr', languageSlugs.fr)?.id, topic.id);
});

test('catalogues preserve existing cards, add the daily group and remain idempotent', () => {
  for (const language of ['fr', 'en', 'ar']) {
    const base = readFileSync(`dist/${language}/guides/index.html`, 'utf8');
    const before = load(base);
    const originalCards = before('[data-guide-card]').length;
    const result = mergeGuideCatalogue(base, [topic, {...topic, status:'draft'}], language, {origin});
    const $ = load(result);
    assert.equal($('[data-guide-card]').length, originalCards + 1);
    assert.equal($(`[data-guide-card][href="/${language}/guides/${encodeURIComponent(languageSlugs[language])}/"]`).length, 1);
    assert.equal($('a[data-intelligence-topic] img').attr('alt'), topic.translations[language].alt);
    assert.ok($('[data-guide-category] option').toArray().some(option => $(option).text() === $('a[data-intelligence-topic]').attr('data-category')));
    const again = load(mergeGuideCatalogue(result, [topic], language, {origin}));
    assert.equal(again('[data-guide-card]').length, originalCards + 1);
    for (const path of before('[data-guide-card]').map((_, element) => before(element).attr('href')).get()) assert.equal(again(`[data-guide-card][href="${path}"]`).length, 1);
  }
});

test('sitemap adds only published localisations with reciprocal alternates and images', () => {
  const base = '<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://www.felexiaconseils.com/fr/</loc></url></urlset>';
  const result = mergeIntelligenceSitemap(base, [topic, {...topic, status:'draft'}], {origin});
  const $ = load(result, {xmlMode:true});
  assert.equal($('url').length, 4);
  for (const language of ['fr', 'en', 'ar']) {
    const item = $('url').filter((_, element) => $(element).find('loc').first().text() === `${origin}/${language}/guides/${encodeURIComponent(languageSlugs[language])}/`);
    assert.equal(item.length, 1);
    assert.equal(item.find('lastmod').text(), topic.publishedAt);
    assert.equal(item.find('xhtml\\:link').length, 4);
    assert.equal(item.find('image\\:loc').text(), origin + topic.image.src);
  }
  const again = load(mergeIntelligenceSitemap(result, [topic], {origin}), {xmlMode:true});
  assert.equal(again('url').length, 4);
  assert.equal(new Set(again('url>loc').map((_, element) => again(element).text()).get()).size, 4);
});

test('historical backfill updates alternatives without changing historical body or publication date', () => {
  const historical = clone(topic);
  historical.kind = 'backfill'; historical.originalSlug = 'creation-entreprise-rabat';
  historical.translations.fr.slug = historical.originalSlug;
  const original = load(shells.fr);
  const result = mergeHistoricalAlternates(shells.fr, [historical], 'fr', {origin, path:'/fr/guides/creation-entreprise-rabat/', knownPaths});
  const $ = load(result);
  assert.equal($('.prose-lg').html(), original('.prose-lg').html());
  assert.equal($('meta[property="article:published_time"]').attr('content'), original('meta[property="article:published_time"]').attr('content'));
  assert.equal($('head link[hreflang="en"]').attr('href'), `${origin}/en/guides/${languageSlugs.en}/`);
  const xml = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/fr/guides/creation-entreprise-rabat/</loc><lastmod>2026-09-22</lastmod></url></urlset>`;
  const sitemap = load(mergeIntelligenceSitemap(xml, [historical], {origin}), {xmlMode:true});
  assert.equal(sitemap('url').first().find('lastmod').text(), '2026-09-22');
});

test('remote image injection is refused and signed media proxy query remains escaped', () => {
  const hostile = clone(topic);
  hostile.image.src = 'https://attacker.invalid/image.webp';
  assert.throws(() => parse(hostile), /safe local image/);
  const proxy = clone(topic);
  proxy.image.src = '/api/intelligence-media?asset=cover&variant=full';
  proxy.image.smallSrc = '/api/intelligence-media?asset=cover&variant=small';
  const $ = parse(proxy);
  assert.equal($('main img.guide-cover-image').first().attr('src'), proxy.image.src);
  assert.equal($('meta[property="og:image"]').attr('content'), origin + proxy.image.src);
});
