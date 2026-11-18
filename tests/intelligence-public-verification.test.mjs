import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verifyPublicTopic} from '../src/intelligence/runtime.mjs';

const origin='https://www.felexiaconseils.com';
const languages=['fr','ar','en'];
const topic={translations:Object.fromEntries(languages.map(language=>[language,{title:`Guide ${language}`}])) ,image:{src:'/images/cover.webp',smallSrc:'/images/cover-640.webp'}};
const urls=Object.fromEntries(languages.map(language=>[language,`${origin}/${language}/guides/verified-${language}/`]));
function fetcher({missingCard,missingSitemap,oversizedCatalogue=false}={}) {
  return async(value,options)=>{
    const url=new URL(value);assert.equal(url.origin,origin);assert.equal(options.redirect,'error');assert.ok(options.signal);
    if(url.pathname.endsWith('.webp'))return new Response('image',{headers:{'Content-Type':'image/webp'}});
    if(url.pathname==='/sitemap.xml')return new Response(`<urlset>${languages.filter(language=>language!==missingSitemap).map(language=>`<url><loc>${urls[language]}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
    const language=url.pathname.split('/')[1];
    if(url.pathname===`/${language}/guides/`){
      const body=oversizedCatalogue?'x'.repeat(2*1024*1024+1):`<html lang="${language}"><body>${missingCard===language?'':`<a data-guide-card href="${new URL(urls[language]).pathname}">Guide</a>`}</body></html>`;
      return new Response(body,{headers:{'Content-Type':'text/html; charset=utf-8'}});
    }
    return new Response(`<html lang="${language}"><head><link rel="canonical" href="${urls[language]}">${languages.map(code=>`<link rel="alternate" hreflang="${code}" href="${urls[code]}">`).join('')}</head><body><main><h1>${topic.translations[language].title}</h1></main></body></html>`,{headers:{'Content-Type':'text/html; charset=utf-8'}});
  };
}

test('public verification fails when all pages return 200 but a catalogue card or sitemap URL is missing',async()=>{
  const missingCard=await verifyPublicTopic(topic,urls,{origin,fetcher:fetcher({missingCard:'ar'})});
  assert.equal(missingCard.status,'failed');assert.ok(missingCard.checks.filter(check=>check.kind==='article'||check.kind==='image').every(check=>check.ok));
  assert.equal(missingCard.checks.find(check=>check.kind==='catalogue'&&check.language==='ar').ok,false);
  const missingSitemap=await verifyPublicTopic(topic,urls,{origin,fetcher:fetcher({missingSitemap:'en'})});
  assert.equal(missingSitemap.status,'failed');assert.ok(missingSitemap.checks.filter(check=>check.kind!=='sitemap').every(check=>check.ok));assert.equal(missingSitemap.checks.find(check=>check.kind==='sitemap').ok,false);
});

test('public verification requires all nine checks and rejects oversized streamed catalogue HTML',async()=>{
  const complete=await verifyPublicTopic(topic,urls,{origin,fetcher:fetcher()});
  assert.equal(complete.status,'verified');assert.equal(complete.checks.length,9);assert.ok(complete.checks.every(check=>check.ok));
  const oversized=await verifyPublicTopic(topic,urls,{origin,fetcher:fetcher({oversizedCatalogue:true})});
  assert.equal(oversized.status,'failed');assert.ok(oversized.checks.filter(check=>check.kind==='catalogue').every(check=>!check.ok));
  assert.ok(oversized.checks.filter(check=>check.kind==='article'||check.kind==='image'||check.kind==='sitemap').every(check=>check.ok));
});
