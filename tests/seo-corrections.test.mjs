import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {company} from '../src/content.mjs';
import {landingDisclaimer, privateNotice} from '../src/private-status.mjs';

const page = path => load(readFileSync(path));
const languages = ['fr', 'en', 'ar'];

test('contact mobile matches the Google Business number and the office line stays labelled', () => {
  for (const lang of languages) {
    const $ = page(`dist/${lang}/contact/index.html`);
    const mobile = $('main a[href^="tel:"]').filter((_, el) => /Mobile|المحمول/.test($(el).text())).first();
    assert.equal(mobile.attr('href'), 'tel:+212661080862', lang);
    assert.match(mobile.text(), /06 61 08 08 62/);
    const office = $('main a[href="tel:+212520825825"]').filter((_, el) => /Bureau|Office|المكتب/.test($(el).text()));
    assert.ok(office.length, lang);
    assert.match(office.first().text(), /520 825 825/);
  }
});

test('LocalBusiness schema uses the mobile number and the Marrakech postal code', () => {
  const data = JSON.parse(page('dist/fr/index.html')('script[type="application/ld+json"]').text());
  const business = data['@graph'].find(node => [].concat(node['@type']).includes('LocalBusiness'));
  assert.equal(business.telephone, '+212 6 61 08 08 62');
  assert.equal(business.address.postalCode, '40000');
  assert.equal(business.contactPoint.find(point => point.contactType === 'office').telephone, company.officeTel);
  assert.equal(business.contactPoint.find(point => point.contactType === 'mobile').telephone, '+212 6 61 08 08 62');
});

test('every sitemap URL has a real lastmod and the daily guides are included', () => {
  const $ = load(readFileSync('dist/sitemap.xml'), {xmlMode:true});
  const locations = new Map();
  $('url').each((_, element) => {
    const loc = $(element).find('loc').text();
    const lastmod = $(element).find('lastmod').text();
    assert.match(lastmod, /^\d{4}-\d{2}-\d{2}$/, loc);
    locations.set(new URL(loc).pathname, lastmod);
  });
  for (const lang of languages) {
    for (const [slug, date] of [['attestation-regularite-fiscale-dgi-2026', '2026-11-27'], ['radiation-registre-de-commerce-maroc-2026', '2026-11-28']]) {
      const path = `/${lang}/guides/${slug}/`;
      assert.equal(locations.get(path), date, path);
      assert.equal(readFileSync(`dist${path}index.html`, 'utf8').includes(slug), true);
    }
  }
  assert.equal([...locations.keys()].some(path => path.includes('brief-besoins-avant-choix-erp')), false);
});

test('Open Graph no longer uses the generic stock photo and the homepage has one clear heading', () => {
  for (const lang of languages) {
    const $ = page(`dist/${lang}/index.html`);
    assert.equal($('main h1').length, 1);
    assert.equal($('main h1 .d-brand').length, 0);
    assert.equal($('main .d-brand').length, 1);
    const image = $('meta[property="og:image"]').attr('content');
    assert.match(image, /\/assets\/og-felexia-conseils\.png$/);
    assert.equal(/Why-you-should-get-help|mylegal\/images\/static/.test(image), false);
  }
});

test('Mini ERP and the withdrawn ERP guide are absent, with redirects to the guides hub', () => {
  const site = ['dist/fr/tarif/creation/index.html', 'dist/en/tarif/creation/index.html', 'dist/ar/tarif/creation/index.html']
    .map(path => readFileSync(path, 'utf8')).join('\n');
  assert.equal(/Mini ERP|نظام ERP مصغر/i.test(site), false);
  const redirects = JSON.parse(readFileSync('vercel.json', 'utf8')).redirects;
  for (const source of [
    '/fr/guides/brief-besoins-avant-choix-erp/',
    '/en/guides/brief-besoins-avant-choix-erp/',
    '/ar/guides/brief-besoins-avant-choix-erp/',
    '/en/guides/erp-needs-brief-before-selection/',
    '/ar/guides/موجز-الاحتياجات-قبل-اختيار-نظام-تدبير/'
  ]) {
    const rule = redirects.find(item => item.source === source);
    assert.equal(rule.statusCode, 301);
    assert.equal(rule.destination, source.slice(0, 4) + 'guides/');
  }
});

test('creation and SARL landing pages state the private status and link to the public portals', () => {
  for (const lang of languages) {
    for (const slug of ['creation-entreprise/', 'guides/creer-une-sarl-maroc/']) {
      const $ = page(`dist/${lang}/${slug}index.html`);
      const box = $('.felexia-landing-disclaimer');
      assert.equal(box.length, 1, `/${lang}/${slug}`);
      assert.equal(box.find('p').first().text(), landingDisclaimer[lang].text);
      assert.equal(box.find('a[href="https://www.cri-invest.ma/"]').length, 1);
      assert.equal(box.find('a[href="https://www.ompic.ma/"]').length, 1);
      assert.equal($('.felexia-private-notice').text(), privateNotice[lang]);
      const main = $('main').text();
      assert.equal(/obtention du Registre du Commerce|Nous finalisons les démarches administratives|Délai moyen\s*:\s*10 jours|Votre société est créée/i.test(main), false, `/${lang}/${slug}`);
    }
  }
});
