import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile, mkdtemp, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve, sep, basename} from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {load} from 'cheerio';
import {createFileStore} from '../src/intelligence/store.mjs';
import {createEngine, enqueue} from '../src/intelligence/engine.mjs';
import {localClock, intelligenceConfig} from '../src/intelligence/config.mjs';
import {qualityGate} from '../src/intelligence/quality.mjs';
import {renderIntelligenceGuide, mergeGuideCatalogue, mergeIntelligenceSitemap} from '../src/intelligence/render.mjs';

const reserve = JSON.parse(await readFile(new URL('../src/intelligence/reserve.json', import.meta.url), 'utf8'));
const inventory = JSON.parse(await readFile(new URL('../docs/INTELLIGENCE-INVENTAIRE-GUIDES.json', import.meta.url), 'utf8'));
const knownPaths = new Set(JSON.parse(await readFile(new URL('../dist/route-manifest.json', import.meta.url), 'utf8')));
const historical = inventory.groups.map(group => ({...group, title:group.titleFr, slug:group.contentGroupKey}));
const languages = ['fr', 'ar', 'en'];
const completeTopics = reserve.topics.filter(topic => languages.every(language => topic.translations?.[language]));
const ideas = reserve.topics.filter(topic => topic.status === 'idea');
const env = {FELEXIA_INTELLIGENCE_ENABLED:'true', FELEXIA_AUTO_PUBLISH:'true', FELEXIA_DRY_RUN:'false', FELEXIA_ALLOW_PAID_APIS:'false', FELEXIA_MIN_ARTICLE_WORDS:'400', FELEXIA_PUBLICATION_HOUR:'09:00', FELEXIA_RESERVE_TARGET:'14', FELEXIA_SOURCE_MAX_AGE_DAYS:'30', SITE_URL:'https://www.felexiaconseils.com'};
const latestVerified = Math.max(...reserve.sources.map(source => Date.parse(source.retrievedAt)), ...completeTopics.map(topic => Date.parse(topic.verifiedAt)));
const initialDate = new Date(latestVerified); initialDate.setUTCHours(9, 0, 0, 0);
if (initialDate.getTime() < latestVerified) initialDate.setUTCDate(initialDate.getUTCDate() + 1);

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'felexia-real-reserve-'));
  t.after(async () => {
    const target = resolve(directory);
    assert.ok(target.startsWith(resolve(tmpdir()) + sep) && basename(target).startsWith('felexia-real-reserve-'));
    await rm(target, {recursive:true, force:true});
  });
  const store = createFileStore({path:join(directory, 'state.json')});
  let date = new Date(initialDate);
  const calls = {research:0, draft:0, image:0, upload:0};
  const unexpectedPaid = kind => async () => {calls[kind]++; throw new Error('Unexpected paid provider call');};
  const engine = createEngine({store, env, knownPaths, historical, now:() => new Date(date), research:async () => {calls.research++; return [];}, generateDraft:unexpectedPaid('draft'), generateImage:unexpectedPaid('image'), uploadImage:unexpectedPaid('upload')});
  return {engine, store, calls, setDate:value => {date = new Date(value);}};
}

test('the real reserve contains fourteen complete trilingual guides and thirty topics in total', async () => {
  assert.equal(reserve.topics.length, 30, 'Thirty subjects includes the complete reserve and further ideas');
  assert.equal(completeTopics.length, 14);
  assert.equal(ideas.length, 16, 'The remaining sixteen subjects are ideas, not publication-ready guides');
  const config = intelligenceConfig(env);
  const state = {topics:reserve.topics, sources:reserve.sources};
  const slugs = new Set();
  for (const topic of completeTopics) {
    const result = qualityGate(topic, {state, config, now:initialDate, knownPaths, historical});
    assert.equal(result.ok, true, `${topic.id}: ${JSON.stringify(result.checks.filter(check => !check.ok))}`);
    assert.equal(topic.status, 'draft');
    assert.equal(topic.risk, 'low');
    assert.equal(topic.claims.length, 0);
    assert.equal(topic.provenance.reviewedBy, null, 'No fictitious expert review');
    for (const language of languages) {
      const version = topic.translations[language];
      assert.ok(version.body.length >= 4);
      assert.ok(version.faq.length >= 2);
      const paragraphs = version.body.flatMap(section => section.paragraphs).join(' ');
      assert.ok(paragraphs.split(/\s+/u).filter(Boolean).length >= 400);
      assert.ok(!slugs.has(`${language}:${version.slug}`)); slugs.add(`${language}:${version.slug}`);
      for (const link of version.internalLinks) assert.ok(knownPaths.has(link.path), `${topic.id}: ${link.path}`);
    }
  }
  for (const topic of ideas) assert.equal(qualityGate(topic, {state, config, now:initialDate, knownPaths, historical}).ok, false, `${topic.id} must remain an idea`);
});

test('all real reserve covers and responsive variants are decodable WebP with accurate dimensions', async () => {
  const checksums = new Set();
  for (const topic of completeTopics) {
    for (const [path, width, height] of [[topic.image.src, 1280, 800], [topic.image.smallSrc, 640, 400]]) {
      assert.match(path, /^\/images\/guides\/illustrations\/[a-z0-9-]+-[a-f0-9]{12}(?:-640)?\.webp$/);
      const bytes = await readFile(new URL('../public' + path, import.meta.url));
      const dimensions = await sharp(bytes).metadata();
      assert.equal(dimensions.format, 'webp', path);
      assert.equal(dimensions.width, width, path);
      assert.equal(dimensions.height, height, path);
      assert.equal(width / height, 1.6);
      const checksum = createHash('sha256').update(bytes).digest('hex');
      assert.ok(!checksums.has(checksum), `${path} duplicates another cover`); checksums.add(checksum);
    }
    assert.equal(topic.image.width, 1280);
    assert.equal(topic.image.height, 800);
    assert.equal(topic.image.rights, 'owned');
    assert.equal(topic.image.verified, true);
    assert.equal(topic.image.method, 'ai-generated-imagegen');
  }
  assert.equal(checksums.size, 28);
});

test('the actual fourteen-topic reserve publishes once on each Casablanca day with three usable routes', async t => {
  const {engine, store, calls, setDate} = await fixture(t);
  assert.equal((await engine.importTopics(reserve.topics, reserve.sources)).inserted, 30);
  assert.equal((await engine.importTopics(reserve.topics, reserve.sources)).inserted, 0);
  for (const topic of completeTopics) assert.equal((await engine.prepareTopic(topic.id)).ok, true, topic.id);
  const shells = Object.fromEntries(await Promise.all(languages.map(async language => [language, await readFile(new URL(`../dist/${language}/guides/creation-entreprise-rabat/index.html`, import.meta.url), 'utf8')])));
  const baseSitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  const days = new Set(), publishedIds = new Set();
  for (let index = 0; index < 14; index++) {
    const date = new Date(initialDate.getTime() + index * 86400000); setDate(date);
    const clock = localClock(date, 'Africa/Casablanca');
    const result = await engine.publishOne();
    assert.equal(result.status, 'published', JSON.stringify(result));
    assert.equal(result.day, clock.day);
    assert.ok(!days.has(result.day)); days.add(result.day);
    assert.ok(!publishedIds.has(result.topicId)); publishedIds.add(result.topicId);
    assert.deepEqual(Object.keys(result.urls).sort(), [...languages].sort());
    const reruns = await Promise.all([engine.publishOne(), engine.publishOne(), engine.publishOne()]);
    assert.ok(reruns.every(rerun => rerun.status === 'already_published' && rerun.topicId === result.topicId));
    const state = await store.read();
    const topic = state.topics.find(item => item.id === result.topicId);
    assert.equal(topic.status, 'published');
    assert.equal(topic.publicationDay, clock.day);
    for (const language of languages) {
      assert.equal(result.urls[language], `${env.SITE_URL}/${language}/guides/${encodeURIComponent(topic.translations[language].slug)}/`);
      const html = renderIntelligenceGuide(topic, language, {baseHtml:shells[language], origin:env.SITE_URL, knownPaths});
      const $ = load(html);
      assert.equal($('link[rel="canonical"]').attr('href'), result.urls[language]);
      assert.equal($('main h1').text(), topic.translations[language].title);
      assert.equal($('html').attr('dir'), language === 'ar' ? 'rtl' : 'ltr');
      for (const target of languages) assert.equal($(`head link[hreflang="${target}"]`).attr('href'), result.urls[target]);
      const catalogue = await readFile(new URL(`../dist/${language}/guides/index.html`, import.meta.url), 'utf8');
      const list = load(mergeGuideCatalogue(catalogue, state.topics, language, {origin:env.SITE_URL}));
      assert.equal(list(`[data-guide-card][href="${new URL(result.urls[language]).pathname}"]`).length, 1);
    }
    const sitemap = load(mergeIntelligenceSitemap(baseSitemap, state.topics, {origin:env.SITE_URL}), {xmlMode:true});
    for (const url of Object.values(result.urls)) assert.equal(sitemap('url>loc').filter((_, element) => sitemap(element).text() === url).length, 1);
  }
  const state = await store.read();
  assert.equal(state.topics.filter(topic => topic.status === 'published').length, 14);
  assert.equal(state.topics.filter(topic => topic.status === 'idea').length, 16);
  assert.equal(state.reports.filter(report => report.type === 'daily' && report.topicId).length, 14);
  assert.equal(days.size, 14); assert.equal(publishedIds.size, 14);
  assert.deepEqual(calls, {research:0, draft:0, image:0, upload:0});

  // The next day has no complete reserve. An incomplete idea job may not spend.
  const emptyDate = new Date(initialDate.getTime() + 14 * 86400000); setDate(emptyDate);
  await store.transaction(next => enqueue(next, {id:'reserve-exhaustion-idea', type:'draft', topicId:ideas[0].id}, emptyDate));
  const exhausted = await engine.tick();
  assert.equal(exhausted.status, 'completed');
  assert.equal(exhausted.publication.status, 'no_ready_topic');
  const after = await store.read();
  const day = localClock(emptyDate).day;
  assert.ok(after.events.some(event => event.type === 'daily_publication_missed' && event.details.day === day));
  assert.ok(after.events.some(event => event.type === 'reserve_low' && event.details.day === day && event.details.ready === 0));
  assert.equal(after.topics.filter(topic => topic.status === 'published').length, 14);
  assert.deepEqual(calls, {research:1, draft:0, image:0, upload:0});
  const repeated = await engine.tick();
  assert.equal(repeated.publication.status, 'no_ready_topic');
  const finalState = await store.read();
  assert.equal(finalState.events.filter(event => event.type === 'daily_publication_missed' && event.details.day === day).length, 1);
  assert.equal(finalState.events.filter(event => event.type === 'reserve_low' && event.details.day === day).length, 1);
  assert.equal(calls.research, 1); assert.equal(calls.draft + calls.image + calls.upload, 0);
});
