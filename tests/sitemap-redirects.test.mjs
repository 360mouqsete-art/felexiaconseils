import {test} from 'node:test';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
import {isRedirectedPath} from '../src/sitemap-redirects.mjs';
import {mergeIntelligenceSitemap} from '../src/intelligence/render.mjs';

const origin = 'https://www.felexiaconseils.com';

test('redirected guide addresses are recognised in every language', () => {
  for (const path of [
    '/fr/guides/brief-besoins-avant-choix-erp/',
    '/en/guides/brief-besoins-avant-choix-erp/',
    '/ar/guides/brief-besoins-avant-choix-erp/',
    '/en/guides/erp-needs-brief-before-selection/',
    '/ar/guides/موجز-الاحتياجات-قبل-اختيار-نظام-تدبير/',
    '/fr/guides/7-principes-comptables-au-maroc/',
    '/guides/creer-une-sarl-maroc/'
  ]) assert.equal(isRedirectedPath(origin + path), true, path);
  for (const path of ['/fr/', '/fr/contact/', '/fr/creation-entreprise/', '/fr/guides/', '/fr/guides/creer-une-sarl-maroc/', '/en/guides/radiation-registre-de-commerce-maroc-2026/']) {
    assert.equal(isRedirectedPath(path), false, path);
  }
});

test('the production sitemap drops redirected URLs and does not put a published topic back', () => {
  const redirected = `${origin}/fr/guides/brief-besoins-avant-choix-erp/`;
  const kept = `${origin}/fr/guides/creer-une-sarl-maroc/`;
  const base = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${redirected}</loc></url><url><loc>${kept}</loc></url><url><loc>${origin}/fr/</loc></url></urlset>`;
  const topic = {
    id:'erp-brief', status:'published', kind:'new', category:'management', risk:'low',
    publishedAt:'2026-10-12T08:00:00.000Z',
    image:{src:'/images/guides/creation-entreprise-rabat.webp', smallSrc:'/images/guides/creation-entreprise-rabat-640.webp', width:1280, height:800, rights:'owned'},
    sources:[{id:'practice', url:'https://www.felexiaconseils.com/fr/conseil-gestion/', title:'Conseil', issuer:'Felexia Conseils', retrievedAt:'2026-10-11T16:00:00.000Z'}],
    translations:{
      fr:{slug:'brief-besoins-avant-choix-erp', title:'Brief ERP'},
      en:{slug:'erp-needs-brief-before-selection', title:'ERP brief'},
      ar:{slug:'موجز-الاحتياجات-قبل-اختيار-نظام-تدبير', title:'موجز'}
    }
  };
  const $ = load(mergeIntelligenceSitemap(base, [topic], {origin}), {xmlMode:true});
  const locations = $('url>loc').map((_, element) => $(element).text()).get();
  assert.equal(locations.includes(redirected), false);
  assert.equal(locations.includes(`${origin}/en/guides/erp-needs-brief-before-selection/`), false);
  assert.equal(locations.some(location => decodeURIComponent(location).includes('موجز-الاحتياجات-قبل-اختيار-نظام-تدبير')), false);
  assert.equal(locations.includes(kept), true);
  assert.equal(locations.includes(`${origin}/fr/`), true);
});
