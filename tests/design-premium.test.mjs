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

test('public schema uses the real cabinet and never an invented price or rating', () => {
  for (const path of ['/fr/', '/fr/creation-entreprise/', '/fr/domiciliation/', '/fr/modify-company/', '/ar/guides/creer-une-sarl-maroc/']) {
    const data = JSON.parse(page(path)('script[type="application/ld+json"]').text());
    const graph = data['@graph'];
    assert.equal(new Set(graph.map(node => node['@id'])).size, graph.length, path);
    const organization = graph.find(node => [].concat(node['@type']).includes('LegalService'));
    assert.ok(organization, path);
    assert.equal(organization.address.addressLocality, 'Marrakech');
    assert.match(organization.telephone, /\+212520825825/);
    assert.equal(JSON.stringify(data).includes('priceCurrency'), false);
    assert.equal(JSON.stringify(data).includes('aggregateRating'), false);
  }
  const creation = JSON.parse(page('/fr/creation-entreprise/')('script[type="application/ld+json"]').text());
  assert.ok(creation['@graph'].some(node => node['@type'] === 'FAQPage'));
  assert.ok(creation['@graph'].some(node => node['@type'] === 'Service' && !node.offers));
  const theme = page('/fr/guides/theme/domiciliation/');
  const english = page('/en/guides/theme/domiciliation/');
  assert.notEqual(theme('title').text(), english('title').text());
  assert.equal(theme('header [data-language-switch] a[lang="fr"]').attr('aria-label').includes('FR'), true);
  assert.equal(theme('.seo-breadcrumb li').length, 3);
});
