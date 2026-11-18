import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createFileStore} from '../src/intelligence/store.mjs';
import {createEngine,enqueue} from '../src/intelligence/engine.mjs';
import {localClock,clockDiagnostics} from '../src/intelligence/config.mjs';
import {qualityGate} from '../src/intelligence/quality.mjs';
import {fixtureNow,fixtureEnv,fixturePaths,fixtureTopic,fixtureSource} from './intelligence-fixtures.mjs';

async function fixture(t,options={}) {
  const directory=await mkdtemp(join(tmpdir(),'felexia-engine-'));
  t.after(()=>rm(directory,{recursive:true,force:true}));
  const path=join(directory,'state.json'),store=createFileStore({path});let date=new Date(fixtureNow);
  const engine=createEngine({store,env:fixtureEnv,knownPaths:fixturePaths,now:()=>new Date(date),...options});
  return {path,store,engine,setDate:value=>{date=new Date(value);}};
}
const failed=result=>result.checks.filter(check=>!check.ok).map(check=>check.id);
async function ready(engine,topics=[fixtureTopic()]) {
  await engine.importTopics(topics,[fixtureSource()]);
  for(const topic of topics){const result=await engine.prepareTopic(topic.id);assert.equal(result.ok,true,JSON.stringify(failed(result)));}
}

test('administrator and publication-window diagnostics use the same UTC instant and real IANA clock',async t=>{
  const {engine,setDate}=await fixture(t);const diagnostic=clockDiagnostics(fixtureNow);
  assert.equal(diagnostic.currentTimeUTC,'2026-10-12T09:00:00.000Z');assert.equal(diagnostic.localTime,localClock(fixtureNow).time);assert.equal(diagnostic.runtime.node,process.versions.node);
  const summary=await engine.summaries();assert.deepEqual(summary.clock,diagnostic);assert.equal(summary.day,summary.clock.day);
  // Test a historical +01 date shared by both installed tzdb releases.
  setDate('2026-06-12T07:59:00Z');const before=await engine.publishOne();assert.equal(before.status,'before_window');assert.equal(before.clock.localTime,'08:59');assert.equal(before.publicationHour,'09:00');
  assert.equal(clockDiagnostics(new Date('2026-03-01T09:00:00Z')).localTime,'09:00');
});

test('quality gate blocks unverified tax claims, missing languages and divergent fiscal numbers',async t=>{
  const {engine,store}=await fixture(t);
  const topic=fixtureTopic('tax-fixture');topic.risk='high';
  topic.claims=[{id:'tax-rate',text:'Tax rate',sourceId:'institutional-fixture',quotation:'Le taux explicitement vérifié dans ce test est de 20 %.',factValue:'20%',status:'unverified',jurisdiction:'MA',verifiedAt:null}];
  for(const version of Object.values(topic.translations)){version.claimIds=['tax-rate'];version.factualValues={'tax-rate':'20%'};version.body[0].paragraphs.push('20%');}
  await engine.importTopics([topic],[fixtureSource()]);let result=await engine.prepareTopic(topic.id);
  assert.ok(failed(result).includes('claim_evidence'));assert.equal((await engine.publishOne()).status,'no_ready_topic');
  await store.transaction(state=>{const target=state.topics[0];Object.assign(target.claims[0],{status:'verified',verifiedAt:fixtureNow.toISOString(),sourceFingerprint:state.sources[0].fingerprint,applicableFrom:'2026-01-01',legalStatus:'adopted'});delete target.translations.ar;});
  result=await engine.prepareTopic(topic.id);assert.ok(failed(result).includes('language_ar'));
  await store.transaction(state=>{const target=state.topics[0];target.translations.ar=fixtureTopic(topic.id).translations.ar;target.translations.ar.claimIds=['tax-rate'];target.translations.ar.factualValues={'tax-rate':'20%'};target.translations.ar.body[0].paragraphs.push('٢٠٪');target.translations.en.body[0].paragraphs.pop();target.translations.en.body[0].paragraphs.push('30%');});
  result=await engine.prepareTopic(topic.id);assert.ok(failed(result).includes('numeric_consistency'));assert.ok(failed(result).includes('language_en_unmapped_figures'));
  await store.transaction(state=>{state.topics[0].translations.en.body[0].paragraphs.pop();state.topics[0].translations.en.body[0].paragraphs.push('20%');});
  result=await engine.prepareTopic(topic.id);assert.equal(result.ok,true,JSON.stringify(failed(result)));
});

test('an Arabic letter in an English article does not satisfy Arabic editorial completeness',async t=>{
  const {engine}=await fixture(t);const topic=fixtureTopic('arabic-fixture');topic.translations.ar.body=structuredClone(topic.translations.en.body);topic.translations.ar.body[0].paragraphs[0]+=' ع';
  await engine.importTopics([topic],[fixtureSource()]);assert.ok(failed(await engine.prepareTopic(topic.id)).includes('arabic_script'));
});

test('duplicate intents are rejected against queued and historical guides',async t=>{
  const {engine,store}=await fixture(t,{historical:[{slug:'historical',title:'Existing records guide',intentKey:'already-covered'}]});
  const first=fixtureTopic('first-fixture'),duplicate=fixtureTopic('second-fixture'),historical=fixtureTopic('third-fixture');duplicate.intentKey=first.intentKey;historical.intentKey='already-covered';
  assert.deepEqual(await engine.importTopics([first,duplicate,historical],[fixtureSource()]),{inserted:1});assert.equal((await store.read()).topics.length,1);assert.equal((await store.read()).events.filter(event=>event.type==='duplicate_rejected').length,2);
});

test('concurrent workers publish one complete trilingual group per local Casablanca day',async t=>{
  const {path,engine,store}=await fixture(t);const topics=[fixtureTopic('atomic-one'),fixtureTopic('atomic-two')];await ready(engine,topics);
  const second=createEngine({store:createFileStore({path}),env:fixtureEnv,knownPaths:fixturePaths,now:()=>new Date(fixtureNow)});
  const results=await Promise.all([engine.publishOne(),second.publishOne(),engine.publishOne(),second.publishOne()]);
  assert.equal(results.filter(result=>result.status==='published').length,1);assert.equal(results.filter(result=>result.status==='already_published').length,3);
  const state=await store.read();assert.equal(state.topics.filter(topic=>topic.status==='published').length,1);assert.equal(state.reports.filter(report=>report.type==='daily').length,1);assert.equal(Object.keys(state.reports[0].urls).length,3);
});

test('three daily cycles consume three topics once each and respect UTC offset and publication window',async t=>{
  const {engine,store,setDate}=await fixture(t);await ready(engine,[fixtureTopic('quota-one'),fixtureTopic('quota-two'),fixtureTopic('quota-three')]);
  assert.deepEqual(localClock(new Date('2026-06-12T23:30:00Z')),{day:'2026-06-13',month:'2026-06',time:'00:30'});
  assert.equal(localClock(new Date('2026-03-01T09:00:00Z')).time,'09:00');assert.equal(localClock(new Date('2026-06-12T08:00:00Z')).time,'09:00');
  for(const day of [12,13,14]){setDate(`2026-10-${day}T07:59:00Z`);assert.equal((await engine.publishOne()).status,'before_window');setDate(`2026-10-${day}T09:00:00Z`);assert.equal((await engine.publishOne()).status,'published');assert.equal((await engine.publishOne()).status,'already_published');}
  const state=await store.read();assert.equal(state.reports.filter(report=>report.type==='daily'&&report.topicId).length,3);assert.equal(new Set(state.topics.map(topic=>topic.publicationDay)).size,3);
});

test('paid-disabled jobs make no generation calls; pause stops research and jobs as well as publishing',async t=>{
  let calls=0;const {engine,store}=await fixture(t,{research:async()=>{calls++;return [];},generateDraft:async()=>{calls++;throw new Error('Unexpected');},generateImage:async()=>{calls++;throw new Error('Unexpected');}});
  const topic=fixtureTopic('disabled-fixture');delete topic.translations;delete topic.image;await engine.importTopics([topic],[fixtureSource()]);await store.transaction(state=>enqueue(state,{id:'job-disabled',topicId:topic.id},fixtureNow));
  assert.equal((await engine.processJob()).code,'paid_disabled');assert.equal(calls,0);assert.equal((await store.read()).jobs[0].status,'blocked');
  await store.transaction(state=>{state.settings.paused=true;});assert.equal((await engine.tick()).status,'paused');assert.equal((await engine.processJob()).status,'idle');assert.equal(calls,0);
});

test('image upload failure preserves the generated draft and image for a retry without regeneration',async t=>{
  let draftCalls=0,imageCalls=0,uploads=0;
  const topic=fixtureTopic('retry-fixture'),generated=structuredClone(topic),imageAsset=generated.image;delete generated.image;delete topic.translations;delete topic.image;
  const {engine,store,setDate}=await fixture(t,{env:{...fixtureEnv,FELEXIA_ALLOW_PAID_APIS:'true'},generateDraft:async()=>{draftCalls++;return generated;},generateImage:async()=>{imageCalls++;return {buffer:Buffer.from('fixture-image'),smallBuffer:Buffer.from('fixture-small'),width:1280,height:800};},uploadImage:async(_id,image)=>{uploads++;assert.ok(Buffer.isBuffer(image.buffer));if(uploads===1)throw Object.assign(new Error('Temporary storage outage'),{code:'storage_upload_failed'});return imageAsset;}});
  await engine.importTopics([topic],[fixtureSource()]);await store.transaction(state=>enqueue(state,{id:'job-retry',topicId:topic.id},fixtureNow));
  assert.equal((await engine.processJob()).code,'storage_upload_failed');let saved=await store.read();assert.ok(saved.topics[0].translations.fr);assert.ok(saved.topics[0].pendingImage.buffer);assert.equal(saved.jobs[0].status,'retry');
  setDate('2026-10-12T09:03:00Z');const result=await engine.processJob();assert.equal(result.status,'needs_evidence');saved=await store.read();assert.equal(draftCalls,1);assert.equal(imageCalls,1);assert.equal(uploads,2);assert.equal(saved.topics[0].pendingImage,undefined);assert.equal(saved.topics[0].image.verified,true);assert.equal(saved.topics[0].verifiedAt,null);
});

test('model generation cannot downgrade risk or replace an existing human translation',async t=>{
  const topic=fixtureTopic('human-fixture');topic.risk='high';const original=structuredClone(topic.translations.fr);delete topic.translations.ar;delete topic.translations.en;
  const generated=fixtureTopic(topic.id);generated.translations.fr.title='Replacement model title';generated.risk='low';
  const {engine,store}=await fixture(t,{env:{...fixtureEnv,FELEXIA_ALLOW_PAID_APIS:'true'},generateDraft:async()=>generated});await engine.importTopics([topic],[fixtureSource()]);await store.transaction(state=>enqueue(state,{id:'job-human',topicId:topic.id},fixtureNow));
  assert.equal((await engine.processJob()).status,'needs_evidence');const saved=(await store.read()).topics[0];assert.deepEqual(saved.translations.fr,original);assert.equal(saved.risk,'high');assert.equal(saved.verifiedAt,null);
});

test('fact corrections preserve revision history and flag all three languages for urgent synchronization',async t=>{
  const {engine,store}=await fixture(t);const topic=fixtureTopic('correction-fixture');topic.claims=[{id:'claim-correction',text:'Previous assertion',factValue:'old',status:'verified'}];await engine.importTopics([topic],[fixtureSource()]);
  await engine.correctClaim(topic.id,'claim-correction',{text:'Corrected assertion',factValue:'new',status:'verified',verifiedAt:fixtureNow.toISOString()});
  const saved=(await store.read()).topics[0];assert.equal(saved.claims[0].status,'unverified');assert.equal(saved.claims[0].verifiedAt,null);assert.equal(saved.revisions[0].claims[0].text,'Previous assertion');assert.deepEqual(saved.synchronizationRequired,['fr','ar','en']);assert.equal((await store.read()).jobs[0].queue,'urgent');
});

test('source changes preserve history and PDF/access errors remain diagnostic records',async t=>{
  const changed={...fixtureSource(),fingerprint:'changed-fingerprint'};const diagnostic={id:'official-pdf',status:'unsupported',documentType:'pdf',errorCode:'pdf_extraction_unavailable'};
  const {engine,store}=await fixture(t,{research:async()=>[changed,diagnostic]});await ready(engine);const result=await engine.discover();const state=await store.read();
  assert.equal(result.failures,1);assert.equal(state.sourceHistory.length,1);assert.equal(state.topics[0].requiresRefresh,true);assert.equal(state.topics[0].status,'blocked');assert.equal(state.sourceDiagnostics[0].documentType,'pdf');assert.equal(state.jobs[0].queue,'urgent');
});

test('editorial worker lease prevents overlapping ticks and releases after a research error',async t=>{
  let release;const wait=new Promise(resolve=>{release=resolve;});let entered;const started=new Promise(resolve=>{entered=resolve;});
  const {engine,store}=await fixture(t,{research:async()=>{entered();await wait;throw new Error('Source outage');}});
  const first=engine.tick();await started;await assert.rejects(engine.tick(),{code:'LEASE_BUSY'});release();const result=await first;
  assert.equal(result.status,'completed');assert.equal(result.discovery.status,'failed');assert.equal((await store.read()).settings._leases['editorial-worker'],undefined);
});

function historicalTopic(id) {
  const topic=fixtureTopic(id);topic.kind='backfill';topic.originalSlug=`historical-${id}`;
  topic.originalContent=topic.translations.fr.body.flatMap(section=>section.paragraphs).join('\n');
  topic.translations.fr.slug=topic.originalSlug;return topic;
}

test('backfill publishes at most two groups atomically without consuming the new-topic daily quota',async t=>{
  const topics=['maintenance-one','maintenance-two','maintenance-three'].map(historicalTopic);
  const paths=new Set([...fixturePaths,...topics.map(topic=>`/fr/guides/${topic.originalSlug}/`)]);
  const {engine,store,path}=await fixture(t,{knownPaths:paths});await ready(engine,[fixtureTopic('maintenance-new'),...topics]);
  const other=createEngine({store:createFileStore({path}),env:fixtureEnv,knownPaths:paths,now:()=>new Date(fixtureNow)});
  const results=await Promise.all([engine.publishMaintenance(),other.publishMaintenance(),engine.publishMaintenance()]);
  assert.equal(results.filter(result=>result.status==='published').length,2);assert.equal(results.filter(result=>result.status==='maintenance_quota').length,1);
  assert.equal((await engine.publishOne()).status,'published');
  const state=await store.read();assert.equal(state.reports.filter(report=>report.type==='daily'&&report.topicId).length,1);assert.equal(state.reports.filter(report=>report.type==='maintenance').length,2);
  for(const topic of state.topics.filter(topic=>topic.kind==='backfill'&&topic.status==='published')){
    const original=topics.find(candidate=>candidate.id===topic.id);assert.deepEqual(topic.translations.fr,original.translations.fr);assert.equal(topic.originalContent,original.originalContent);
  }
});

test('tick prioritizes a new publication and verifies maintenance and daily reports without report lookup crashes',async t=>{
  const maintenance=historicalTopic('maintenance-verification');
  const paths=new Set([...fixturePaths,`/fr/guides/${maintenance.originalSlug}/`]);let verified=[];
  const {engine,store}=await fixture(t,{knownPaths:paths,research:async()=>[],verifyPublication:async(topic,urls)=>{verified.push(topic.id);assert.equal(Object.keys(urls).length,3);return {status:'verified'};}});
  await ready(engine,[fixtureTopic('verification-new'),maintenance]);
  const first=await engine.tick();assert.equal(first.publication.status,'published');assert.equal(first.maintenance.status,'published');assert.equal(first.verification.count,1);
  let state=await store.read();assert.equal(state.reports.find(report=>report.type==='maintenance').verification.status,'verified');
  assert.ok(state.events.findIndex(event=>event.type==='topic_published')<state.events.findIndex(event=>event.type==='maintenance_published'));
  await engine.tick();state=await store.read();assert.equal(state.reports.find(report=>report.type==='daily').verification.status,'verified');assert.equal(verified.length,2);
});

test('maintenance rejects unknown French history and keeps refresh as an explicit revision candidate',async t=>{
  const {engine,store}=await fixture(t);const invalid=historicalTopic('unknown-historical');const refresh=fixtureTopic('refresh-candidate');refresh.kind='refresh';
  await engine.importTopics([invalid,refresh],[fixtureSource()]);assert.ok(failed(await engine.prepareTopic(invalid.id)).includes('historical_origin'));assert.equal((await engine.prepareTopic(refresh.id)).ok,true);
  const result=await engine.publishMaintenance();assert.equal(result.status,'no_ready_maintenance');assert.equal(result.refreshStatus,'revision_candidate_required');assert.equal((await store.read()).topics.find(topic=>topic.id===refresh.id).status,'ready');
});

test('concurrent budget allocations reserve the exact upper bound once and never fabricate actual costs',async t=>{
  const {engine,store}=await fixture(t,{env:{...fixtureEnv,FELEXIA_ALLOW_PAID_APIS:'true',FELEXIA_DAILY_API_BUDGET:'0.10',FELEXIA_MONTHLY_API_BUDGET:'0.10'}});
  const allocation={amount:.06,kind:'text',model:'test/model',reservationId:'reservation-one'};
  const results=await Promise.all([engine.reserveSpend(allocation),engine.reserveSpend({...allocation,reservationId:'reservation-two'})]);assert.deepEqual(results.sort(),[false,true]);
  const state=await store.read();assert.equal(state.metrics.length,1);assert.equal(state.metrics[0].amount,.06);assert.equal(state.metrics[0].actualCost,null);
  assert.equal(await engine.reserveSpend({...allocation,reservationId:state.metrics[0].id}),true);assert.equal((await store.read()).metrics.length,1);
});
