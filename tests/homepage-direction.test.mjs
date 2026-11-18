import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';

const $ = load(readFileSync(new URL('../dist/fr/index.html', import.meta.url)));

test('the French homepage keeps one heading, the cabinet schema and real links', () => {
  assert.equal($('main h1').length, 1);
  assert.match($('title').text(), /Création de société au Maroc/);
  assert.match($('link[rel="stylesheet"]').last().attr('href'), /^\/home-direction\.css/);
  const data = JSON.parse($('script[type="application/ld+json"]').text());
  const organization = data['@graph'].find(node => [].concat(node['@type']).includes('LegalService'));
  assert.equal(organization.address.addressLocality, 'Marrakech');
  assert.equal(JSON.stringify(data).includes('aggregateRating'), false);
  assert.equal(JSON.stringify(data).includes('priceCurrency'), false);
  assert.equal($('main').text().includes('MAD'), false);
  for (const href of ['/fr/create/','/fr/creation-entreprise/','/fr/domiciliation/','/fr/modify-company/','/fr/contact/','/fr/guides/creer-une-sarl-maroc/']) {
    assert.ok($(`main a[href="${href}"]`).length, href);
  }
});
