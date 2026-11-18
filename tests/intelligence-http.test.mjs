import {test} from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createHmac,randomUUID} from 'node:crypto';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {load} from 'cheerio';
import {createServer} from '../server.mjs';
import {createFileStore} from '../src/intelligence/store.mjs';
import {createEngine} from '../src/intelligence/engine.mjs';
import {runtimeEngine,readStatic,verifyPublicTopic} from '../src/intelligence/runtime.mjs';
import {createIntelligenceHandler,createPublicGuidesHandler} from '../src/intelligence/http.mjs';
import {fixtureNow,fixtureEnv,fixturePaths,fixtureTopic,fixtureSource} from './intelligence-fixtures.mjs';

const adminToken='test-administrator-credential-012345';
const cronSecret='test-scheduler-credential-abcdef012345';
const adminHeaders={Authorization:`Bearer ${adminToken}`,'Content-Type':'application/json'};

async function application(t,{env:extraEnv={},engine:provided,fetcher}={}) {
  const directory=await mkdtemp(join(tmpdir(),'felexia-http-'));
  const store=createFileStore({path:join(directory,'state.json')});
  const env={...fixtureEnv,NODE_ENV:'production',FELEXIA_ADMIN_TOKEN:adminToken,CRON_SECRET:cronSecret,...extraEnv};
  let worker;
  const engine=Object.fromEntries(['summaries','tick','prepareTopic','discover','importTopics','correctClaim'].map(name=>[name,(...args)=>worker[name](...args)]));
  const staticReader=relative=>relative==='route-manifest.json'?Promise.resolve(JSON.stringify([...fixturePaths])):readStatic(relative);
  const server=createServer({env,store,engine,staticReader,...fetcher?{fetcher}:{}});
  server.listen(0,'127.0.0.1');await once(server,'listening');
  const origin=`http://127.0.0.1:${server.address().port}`;env.SITE_URL=origin;
  worker=provided||createEngine({store,env,knownPaths:fixturePaths,now:()=>new Date(fixtureNow),research:async()=>[],verifyPublication:(topic,urls)=>verifyPublicTopic(topic,urls,{origin})});
  t.after(async()=>{await new Promise(resolve=>server.close(resolve));await rm(directory,{recursive:true,force:true});});
  const request=(path,options)=>fetch(origin+path,options);
  const action=(input,headers={})=>request('/api/intelligence',{method:'POST',headers:{...adminHeaders,...headers},body:JSON.stringify(input)});
  return {store,engine:worker,origin,request,action,env};
}

test('real server publishes one group, serves three SEO pages and retains historical guides and sitemap',async t=>{
  const app=await application(t),topic=fixtureTopic('http-publication');
  await app.engine.importTopics([topic],[fixtureSource()]);assert.equal((await app.engine.prepareTopic(topic.id)).ok,true);
  assert.equal((await app.request('/fr/guides/http-publication-fr/')).status,404);
  const beforeHistorical=load(await readStatic('fr/guides/creation-entreprise-rabat/index.html'));
  const beforeSitemap=load(await readStatic('sitemap.xml'),{xmlMode:true});
  const originalLocations=beforeSitemap('url>loc').map((_,element)=>beforeSitemap(element).text()).get();
  const response=await app.action({action:'tick'}),result=await response.json();
  assert.equal(response.status,200);assert.equal(result.result.publication.status,'published');
  assert.equal((await app.store.read()).reports.find(report=>report.type==='daily').verification.status,'verified');
  for(const language of ['fr','en','ar']){
    const path=`/${language}/guides/http-publication-${language}/`;
    const page=await app.request(path),$=load(await page.text());
    assert.equal(page.status,200);assert.equal(page.headers.get('x-felexia-intelligence'),'active');
    assert.match(page.headers.get('content-security-policy'),/object-src 'none'/);
    assert.match(page.headers.get('content-security-policy'),/'sha256-[A-Za-z0-9+/=]+'/);
    assert.equal($('html').attr('lang'),language);assert.equal($('html').attr('dir'),language==='ar'?'rtl':'ltr');
    assert.equal($('main h1').text(),topic.translations[language].title);
    assert.equal($('link[rel="canonical"]').attr('href'),app.origin+path);
    assert.equal($('main .prose-lg a[href="/'+language+'/contact/"]').length,1);
    for(const alternate of ['fr','en','ar'])assert.equal($(`head link[hreflang="${alternate}"]`).attr('href'),`${app.origin}/${alternate}/guides/http-publication-${alternate}/`);
    const head=await app.request(path,{method:'HEAD'});assert.equal(head.status,200);assert.equal(await head.text(),'');
    const catalogue=load(await(await app.request(`/${language}/guides/`)).text());
    assert.equal(catalogue('[data-guide-card]').length,24);
    assert.ok(catalogue('[data-guide-pagination] a').length>1);
    assert.equal((await app.request(`/${language}/guides/creation-entreprise-rabat/`)).status,200);
  }
  const historical=load(await(await app.request('/fr/guides/creation-entreprise-rabat/')).text());
  assert.equal(historical('main .prose-lg').html(),beforeHistorical('main .prose-lg').html());
  assert.equal(historical('meta[property="article:published_time"]').attr('content'),beforeHistorical('meta[property="article:published_time"]').attr('content'));
  const sitemap=load(await(await app.request('/sitemap.xml')).text(),{xmlMode:true});
  assert.equal(sitemap('url').length,beforeSitemap('url').length+3);
  const locations=sitemap('url>loc').map((_,element)=>sitemap(element).text()).get();
  for(const location of originalLocations)assert.ok(locations.includes(location));
  assert.equal(new Set(locations).size,locations.length);
  const again=await app.action({action:'tick'});assert.equal((await again.json()).result.publication.status,'already_published');
});

test('admin and cron credentials are distinct; unauthorized or foreign-origin calls do not mutate state',async t=>{
  const app=await application(t);
  assert.equal((await app.request('/api/intelligence')).status,401);
  assert.equal((await app.request('/api/intelligence',{headers:{Authorization:`Bearer ${cronSecret}`}})).status,401);
  assert.equal((await app.request('/api/intelligence-cron',{headers:{Authorization:`Bearer ${adminToken}`}})).status,401);
  assert.equal((await app.action({action:'pause'},{Origin:'https://attacker.invalid'})).status,403);
  assert.equal((await app.action({action:'pause'},{Origin:'http://localhost:4173'})).status,403);
  assert.equal((await app.request('/api/intelligence',{method:'DELETE',headers:adminHeaders})).status,405);
  assert.equal((await app.store.read()).settings.paused,undefined);
  assert.equal((await app.action({action:'pause'},{Origin:app.origin})).status,200);
  assert.equal((await app.store.read()).settings.paused,true);
  const cron=await app.request('/api/intelligence-cron',{headers:{Authorization:`Bearer ${cronSecret}`}});
  assert.equal(cron.status,200);assert.equal((await cron.json()).result.status,'paused');
  const summaries=await app.request('/api/intelligence',{headers:adminHeaders});assert.equal(summaries.status,200);
  const text=await summaries.text();assert.ok(!text.includes(adminToken));assert.ok(!text.includes(cronSecret));
});

test('cron HMAC accepts a fresh signature once, rejects replay, expiry and tampering without bearer exposure',async t=>{
  let calls=0;const app=await application(t,{engine:{tick:async()=>{calls++;return {status:'completed'};}}});
  const headers=(timestamp=Math.floor(Date.now()/1000),nonce=randomUUID(),secret=cronSecret)=>{
    const signature=createHmac('sha256',secret).update(`${timestamp}.${nonce}.POST./api/intelligence-cron`).digest('hex');
    return {'Content-Type':'application/json','x-felexia-cron-timestamp':String(timestamp),'x-felexia-cron-nonce':nonce,'x-felexia-cron-signature':signature};
  };
  const valid=headers(),send=h=>app.request('/api/intelligence-cron',{method:'POST',headers:h,body:'{}'});
  assert.equal((await send(valid)).status,200);assert.equal(calls,1);
  const replay=await send(valid);assert.equal(replay.status,409);assert.equal((await replay.json()).code,'cron_replay_rejected');
  assert.equal((await send(headers(Math.floor(Date.now()/1000)-121))).status,401);
  assert.equal((await send(headers(Math.floor(Date.now()/1000)+121))).status,401);
  assert.equal((await send(headers(undefined,undefined,adminToken))).status,401);
  assert.equal((await send({...headers(),'x-felexia-cron-nonce':'not-a-uuid'})).status,401);
  assert.equal((await app.request('/api/intelligence-cron',{headers:valid})).status,401);
  const concurrent=headers();const responses=await Promise.all([send(concurrent),send(concurrent)]);
  assert.deepEqual(responses.map(response=>response.status).sort(),[200,409]);assert.equal(calls,2);
  const state=await app.store.read();assert.equal(state.settings.cronNonces.length,2);
  assert.ok(!JSON.stringify(state).includes(cronSecret));
});

test('cron consumes the signed nonce even when the worker fails',async t=>{
  const app=await application(t,{engine:{tick:async()=>{throw Object.assign(new Error('Unavailable'),{code:'LEASE_BUSY'});}}});
  const timestamp=String(Math.floor(Date.now()/1000)),nonce=randomUUID();
  const headers={'x-felexia-cron-timestamp':timestamp,'x-felexia-cron-nonce':nonce,'x-felexia-cron-signature':createHmac('sha256',cronSecret).update(`${timestamp}.${nonce}.POST./api/intelligence-cron`).digest('hex')};
  const request=()=>app.request('/api/intelligence-cron',{method:'POST',headers,body:'{}'});
  const first=await request();assert.equal(first.status,503);assert.equal((await first.json()).code,'LEASE_BUSY');
  assert.equal((await request()).status,409);
});

test('invalid admin JSON, content types and oversized payloads fail before actions execute',async t=>{
  const app=await application(t);
  assert.equal((await app.request('/api/intelligence',{method:'POST',headers:{Authorization:`Bearer ${adminToken}`},body:'{}'})).status,415);
  assert.equal((await app.request('/api/intelligence',{method:'POST',headers:adminHeaders,body:'{'})).status,400);
  assert.equal((await app.action({})).status,400);
  assert.equal((await app.action({action:'unknown'})).status,400);
  assert.equal((await app.action({action:'import',topics:{}})).status,400);
  const huge=await app.request('/api/intelligence',{method:'POST',headers:adminHeaders,body:JSON.stringify({action:'pause',padding:'x'.repeat(2000000)})});assert.equal(huge.status,413);
  assert.equal((await app.store.read()).settings.paused,undefined);
  assert.equal((await app.request('/fr/guides/broken%ZZ/')).status,400);
  assert.equal((await app.request('/health')).status,200);
});

test('malformed encoded public paths return 404 and parsed Buffer requests remain valid JSON',async()=>{
  const result=()=>({headers:{},setHeader(name,value){this.headers[name]=value;},end(body){this.body=body;}});
  let response=result();await createPublicGuidesHandler()({method:'GET',url:'/fr/guides/broken%ZZ/'},response);assert.equal(response.statusCode,404);
  const state={settings:{},events:[]},store={transaction:async callback=>callback(state)};
  response=result();await createIntelligenceHandler({env:{...fixtureEnv,FELEXIA_ADMIN_TOKEN:adminToken},engine:{},store})({method:'POST',url:'/api/intelligence',headers:{authorization:`Bearer ${adminToken}`,'content-type':'application/json'},body:Buffer.from('{"action":"pause"}')},response);
  assert.equal(response.statusCode,200);assert.equal(state.settings.paused,true);
});

test('legacy catalogue pagination redirects GET and HEAD before any static or database read',async()=>{
  let reads=0;
  const unexpectedRead=async()=>{reads++;throw new Error('Pagination must redirect before reading content');};
  const handler=createPublicGuidesHandler({store:{read:unexpectedRead},staticReader:unexpectedRead});
  for(const language of ['fr','en','ar'])for(const method of ['GET','HEAD']){
    for(const [url,location] of [[`/${language}/guides/?page=2`,`/${language}/guides/page/2/`],[`/api/intelligence-public?lang=${language}&page=`,`/${language}/guides/`],[`/api/intelligence-public?lang=${language}&page=&utm_source=old-link`,`/${language}/guides/`]]){
      const response={headers:{},setHeader(name,value){this.headers[name]=value;},end(body){this.body=body;}};
      await handler({method,url},response);
      assert.equal(response.statusCode,308);assert.equal(response.headers.Location,location);
      assert.equal(response.body,method==='HEAD'?undefined:'');
    }
  }
  const post={headers:{},setHeader(name,value){this.headers[name]=value;},end(body){this.body=body;}};
  await handler({method:'POST',url:'/fr/guides/?page=2'},post);
  assert.equal(post.statusCode,405);assert.equal(post.headers.Location,undefined);assert.equal(reads,0);
});

test('unverified sensitive drafts stay private through the real cron endpoint',async t=>{
  const app=await application(t),topic=fixtureTopic('http-sensitive');topic.risk='high';
  topic.claims=[{id:'sensitive-tax',text:'Unverified fiscal assertion',sourceId:'institutional-fixture',status:'unverified',jurisdiction:'MA',quotation:'20 %',factValue:'20%'}];
  await app.engine.importTopics([topic],[fixtureSource()]);
  const checked=await app.action({action:'check',id:topic.id});assert.equal((await checked.json()).result.ok,false);
  const tick=await app.request('/api/intelligence-cron',{headers:{Authorization:`Bearer ${cronSecret}`}});assert.equal(tick.status,200);assert.equal((await tick.json()).result.publication.status,'no_ready_topic');
  for(const language of ['fr','ar','en'])assert.equal((await app.request(`/${language}/guides/http-sensitive-${language}/`)).status,404);
});

test('runtime loads actual known paths for article CTAs while dependency injection prevents outside calls',async t=>{
  const app=await application(t);let outsideCalls=0;
  const engine=await runtimeEngine(app.env,{store:app.store,now:()=>new Date(fixtureNow),research:async()=>{outsideCalls++;return [];},generateDraft:async()=>{throw new Error('Unexpected paid call');},verifyPublication:async()=>({status:'verified'})});
  await engine.importTopics([fixtureTopic('runtime-cta')],[fixtureSource()]);assert.equal((await engine.prepareTopic('runtime-cta')).ok,true);
  assert.equal((await engine.tick()).publication.status,'published');assert.equal(outsideCalls,1);
  const page=load(await(await app.request('/fr/guides/runtime-cta-fr/')).text());assert.equal(page('main .prose-lg a[href="/fr/contact/"]').length,1);
});

test('media proxy bounds streamed response bytes and serves only public WebP assets',async t=>{
  let calls=0;const app=await application(t,{env:{SUPABASE_URL:'https://fixture.supabase.co'},fetcher:async(url,options)=>{
    calls++;assert.equal(String(url),'https://fixture.supabase.co/storage/v1/object/public/intelligence-media/fixture.webp');assert.equal(options.redirect,'error');
    return new Response(new ReadableStream({start(controller){controller.enqueue(new Uint8Array(3000001));controller.close();}}),{headers:{'Content-Type':'image/webp'}});
  }});
  assert.equal((await app.request('/api/intelligence-media?asset=../secret')).status,404);assert.equal(calls,0);
  assert.equal((await app.request('/api/intelligence-media?asset=fixture.webp')).status,503);assert.equal(calls,1);
});
