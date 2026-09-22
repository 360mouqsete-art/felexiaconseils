import test from 'node:test';
import assert from 'node:assert/strict';
import {createMeasurement} from '../public/measurement-core.js';
import {readFileSync} from 'node:fs';
import {load} from 'cheerio';
test('measurement requires consent, strips URL data and never sends form values',()=>{
  const events=[];const m=createMeasurement((...e)=>events.push(e),'https://www.felexiaconseils.com/fr/contact/?email=private@example.test#secret','fr');
  m.pageView();m.click('https://wa.me/212661400352?text=private');m.received({kind:'contact',requestId:'a'});assert.equal(events.length,0);
  m.consent(true);m.pageView();m.click('tel:+212661080862');m.click('https://wa.me/212661400352?text=private');m.click('https://wa.me.evil.test');
  m.received({kind:'contact',requestId:'a',email:'private@example.test',message:'secret'});m.received({kind:'contact',requestId:'a'});
  assert.deepEqual(events.map(e=>e[0]),['page_view','click_phone','click_whatsapp','generate_lead','submit_contact']);
  assert(events.every(e=>e[1].page_location==='https://www.felexiaconseils.com/fr/contact/'));
  assert(!JSON.stringify(events).match(/private|secret|requestId|212661/));
  m.consent(false);m.click('tel:test');m.received({kind:'project',requestId:'b'});assert.equal(events.length,5);
});
test('quote requests count once after receipt and recruitment is excluded',()=>{
  const events=[];const m=createMeasurement(name=>events.push(name),'https://www.felexiaconseils.com/ar/create/','ar');m.consent(true);
  m.received({kind:'recruitment',requestId:'r'});m.received({kind:'project'});assert.equal(events.length,0);
  m.received({kind:'project',requestId:'p'});m.received({kind:'project',requestId:'p'});assert.deepEqual(events,['generate_lead','request_quote']);
});
test('privacy choices are translated and no Google script loads in static HTML',()=>{
  for(const lang of ['fr','en','ar']){
    const $=load(readFileSync(`dist/${lang}/index.html`));assert.equal($('[data-analytics-consent]').length,1);assert.equal($('[data-audience-choice]').length,2);assert.equal($('[data-audience-settings]').length,1);assert.equal($('script[src*="googletagmanager"]').length,0);
    const policy=readFileSync(`dist/${lang}/cookies/index.html`,'utf8');assert(policy.includes('Google Analytics'));assert(!/aucun cookie publicitaire|no advertising cookies|لا يثبت الموقع/.test(policy));
  }
});
