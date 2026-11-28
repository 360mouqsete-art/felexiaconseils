import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
import {createMeasurement} from '../public/measurement-core.js';
import {privateNotice, privateNoticeShort, privateAdvice} from '../src/private-status.mjs';

const consentSource = readFileSync(new URL('../public/google-consent.js', import.meta.url), 'utf8');
const analyticsSource = readFileSync(new URL('../public/analytics.js', import.meta.url), 'utf8');
const measurementSource = readFileSync(new URL('../public/measurement-core.js', import.meta.url), 'utf8');
const denied = "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'})";
const granted = "gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'})";

test('Google Ads tag loads in the head with denied consent before any config', () => {
  assert.ok(consentSource.indexOf(denied) < consentSource.indexOf("gtag('config', 'AW-18492364232')"));
  assert.ok(consentSource.indexOf(denied) < consentSource.indexOf("gtag('config', 'G-5CTT86CCQ2'"));
  assert.ok(consentSource.includes(granted));
  assert.ok(!consentSource.includes('7CimCP-S5rodEMir7PFE'));
  assert.ok(!analyticsSource.includes('7CimCP-S5rodEMir7PFE'));
  assert.equal(measurementSource.includes('AW-18492364232/sQ1vCJnUpbsdEMir7PFE'), true);
  for (const file of ['dist-site/index.html', 'dist/fr/index.html', 'dist/en/creation-entreprise/index.html', 'dist/fr/guides/creer-une-sarl-maroc/index.html']) {
    const html = readFileSync(file, 'utf8');
    const head = html.slice(html.indexOf('<head'), html.indexOf('</head>'));
    assert.match(head, /<script async(?:="")? src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=AW-18492364232"><\/script><script src="\/google-consent\.js\?v=[a-f0-9]+"><\/script>/);
    assert.equal(head.includes('7CimCP-S5rodEMir7PFE'), false);
    assert.ok(head.indexOf('googletagmanager.com/gtag/js?id=AW-18492364232') < head.indexOf('google-consent.js'));
  }
});

test('stored consent and acceptance update consent, and conversions stay on the allowed label', () => {
  assert.match(analyticsSource, /consent','update',\{ad_storage:'granted'/);
  const events = [];
  const measurement = createMeasurement((...entry) => events.push(entry), 'https://www.felexiaconseils.com/fr/', 'fr');
  measurement.click('https://wa.me/212661400352');
  measurement.click('tel:+212520825825');
  measurement.received({kind:'contact', requestId:'confirmed'});
  assert.equal(events.length, 0);
  measurement.consent(true);
  measurement.click('https://wa.me/212661400352');
  measurement.click('tel:+212520825825');
  measurement.received({kind:'contact', requestId:'confirmed'});
  const conversions = events.filter(entry => entry[0] === 'conversion');
  assert.equal(conversions.length, 3);
  assert.ok(conversions.every(entry => entry[1].send_to === 'AW-18492364232/sQ1vCJnUpbsdEMir7PFE'));
  assert.equal(JSON.stringify(events).includes('7CimCP-S5rodEMir7PFE'), false);
});

test('the private-firm notice is on the requested pages and official deliverable lists are gone', () => {
  const pages = [
    ['fr', ''], ['en', ''], ['ar', ''],
    ['fr', 'creation-entreprise/'], ['en', 'creation-entreprise/'], ['ar', 'creation-entreprise/'],
    ['fr', 'domiciliation/'], ['en', 'domiciliation/'], ['ar', 'domiciliation/'],
    ['fr', 'guides/creer-une-sarl-maroc/'], ['en', 'guides/creer-une-sarl-maroc/'], ['ar', 'guides/creer-une-sarl-maroc/'],
    ['fr', 'guides/mre-etranger/'], ['en', 'guides/mre-etranger/'], ['ar', 'guides/mre-etranger/']
  ];
  for (const [lang, slug] of pages) {
    const $ = load(readFileSync(`dist/${lang}/${slug}index.html`));
    assert.equal($('.felexia-private-notice span').text(), privateNoticeShort[lang], `/${lang}/${slug}`);
    assert.equal($('#cabinet-prive').text(), privateNotice[lang], `/${lang}/${slug}`);
  }
  const home = readFileSync('dist/fr/index.html', 'utf8');
  assert.equal(home.includes('Certificat négatif'), false);
  assert.equal(home.includes('logo-ompic'), false);
  assert.equal(home.includes('Organismes utiles'), false);
  assert.equal(home.includes(privateAdvice.fr), true);
  assert.equal(readFileSync('dist/fr/tarif/creation/index.html', 'utf8').includes('Affiliation de la société à la CNSS'), false);
  assert.equal(readFileSync('dist/fr/index.html', 'utf8').includes('Formalités administratives'), false);
});
