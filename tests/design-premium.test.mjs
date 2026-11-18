import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';

const page = path => load(readFileSync(new URL(`../dist${path}index.html`, import.meta.url)));

test('premium stylesheet is last on the pages the redesign covers', () => {
  for (const path of ['/fr/', '/en/', '/ar/', '/fr/creation-entreprise/', '/fr/domiciliation/', '/fr/guides/', '/fr/guides/creer-une-sarl-maroc/', '/ar/guides/']) {
    const $ = page(path);
    const hrefs = $('link[rel="stylesheet"]').map((_, element) => $(element).attr('href')).get();
    assert.equal(hrefs.filter(href => href.startsWith('/design-premium.css')).length, 1, path);
    assert.ok(hrefs.at(-1).startsWith('/design-premium.css'), path);
    assert.equal($('.fx-dock a').length, 3, path);
    assert.equal($('main h1').length, 1, path);
  }
  assert.equal(page('/ar/')('html').attr('dir'), 'rtl');
  const guide = page('/fr/guides/creer-une-sarl-maroc/');
  const guideStyles = guide('link[rel="stylesheet"]').map((_, element) => guide(element).attr('href')).get();
  const guidesCss = guideStyles.findIndex(href => href.startsWith('/guides.css'));
  const designCss = guideStyles.findIndex(href => href.startsWith('/design-premium.css'));
  assert.ok(guidesCss >= 0 && designCss > guidesCss);
});

test('homepage reassurance uses published facts and no invented figures', () => {
  for (const path of ['/fr/', '/en/', '/ar/']) {
    const strip = page(path)('[data-trust-strip]');
    assert.equal(strip.length, 1, path);
    assert.equal(strip.find('li').length, 4, path);
    assert.doesNotMatch(strip.text(), /\d|%|avis|témoign|clients|étoiles|jours|heures/i, path);
  }
  const french = page('/fr/')('[data-trust-strip]').text();
  assert.match(french, /Mabrouka/);
  assert.match(french, /Marrakech/);
  assert.match(french, /avant engagement/);
});
