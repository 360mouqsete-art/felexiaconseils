import {test} from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {SOURCE_REGISTRY,safeFetch,isPublicAddress,robotsAllows,collectSources} from '../src/intelligence/research.mjs';
import {generateTopicDraft,generateTopicImage,uploadImageAsset} from '../src/intelligence/providers.mjs';

const publicResolver=async()=>[{address:'8.8.8.8',family:4}];
const institution='https://www.ompic.ma';
const htmlResponse=html=>new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}});
const paidEnv={FELEXIA_ALLOW_PAID_APIS:'true',FELEXIA_DAILY_API_BUDGET:'2',FELEXIA_MONTHLY_API_BUDGET:'20',FELEXIA_LLM_MAX_COST:'0.25',FELEXIA_IMAGE_MAX_COST:'0.5',FELEXIA_LLM_PROVIDER:'vercel-ai-gateway',FELEXIA_IMAGE_PROVIDER:'vercel-ai-gateway',FELEXIA_LLM_MODEL:'fixture/text-model',FELEXIA_IMAGE_MODEL:'fixture/image-model',AI_GATEWAY_API_KEY:'test_fixture_not_real'};
const source={id:'source-fixture',url:`${institution}/fr`,issuer:'OMPIC',title:'Source fixture',retrievedAt:'2026-10-12T08:00:00Z',status:'retrieved',fingerprint:'test-fingerprint',text:'La préparation du projet facilite les échanges avec les partenaires.'};
const translation=lang=>({title:`Guide ${lang}`,slug:`guide-${lang}`,excerpt:`Extrait ${lang}`,metaTitle:`Guide ${lang}`,metaDescription:`Description ${lang}`,primaryKeyword:`Gestion ${lang}`,secondaryKeywords:[],searchIntent:'practical',alt:`Illustration ${lang}`,body:[1,2,3].map(i=>({heading:`Section ${i}`,paragraphs:['A practical explanatory paragraph.'],bullets:[]})),faq:[{question:'What should I prepare?',answer:'Describe your project.'}],internalLinks:[{path:`/${lang}/contact/`,label:'Contact'}],claimIds:['claim-1'],factualValues:{'claim-1':'project'}});
const draft=()=>({title:'Preparing a business project',category:'Gestion',risk:'low',translations:Object.fromEntries(['fr','ar','en'].map(lang=>[lang,translation(lang)])),claims:[{id:'claim-1',text:'Project preparation supports discussion.',sourceId:source.id,quotation:source.text,factValue:'project'}]});
const topic={id:'topic-fixture',title:'Préparer son projet',category:'Gestion',internalLinkTargets:['/fr/contact/','/ar/contact/','/en/contact/']};
const modelResponse=content=>Response.json({content,finishReason:{unified:'stop',raw:'stop'},usage:{inputTokens:{total:100,noCache:100,cacheRead:0,cacheWrite:0},outputTokens:{total:400,text:400,reasoning:0}},warnings:[]});
const draftFetch=value=>async()=>modelResponse([{type:'text',text:JSON.stringify(value)}]);

test('institutional URL and DNS checks reject private IPv4, IPv6 and lookalike hosts before a request',async()=>{
  let calls=0;const fetcher=async()=>{calls++;return htmlResponse('unexpected');};
  for(const url of ['http://www.ompic.ma/fr','https://www.ompic.ma.evil.test/','https://www.ompic.ma:8443/','https://user:secret@www.ompic.ma/','https://127.0.0.1/'])await assert.rejects(safeFetch(url,{fetcher,resolver:publicResolver}),{code:'source_not_allowed'});
  for(const address of ['0.0.0.0','10.0.0.1','127.0.0.1','169.254.169.254','172.16.0.1','192.168.0.1','100.64.0.1','198.18.0.1','::1','::ffff:127.0.0.1','::ffff:7f00:1','fc00::1','fe80::1','2001:0000::1','2001:0db8::1','2002:7f00:1::','3fff::1']) {
    assert.equal(isPublicAddress(address),false,address);
    await assert.rejects(safeFetch(`${institution}/fr`,{fetcher,resolver:async()=>[{address,family:address.includes(':')?6:4}]}),{code:'private_address'});
  }
  assert.equal(isPublicAddress('2606:4700:4700::1111'),true);
  assert.equal(isPublicAddress('8.8.8.8'),true);
  await assert.rejects(safeFetch(`${institution}/fr`,{fetcher,resolver:async()=>[{address:'8.8.8.8',family:4},{address:'10.0.0.1',family:4}]}),{code:'private_address'});
  assert.equal(calls,0);
});

test('safeFetch validates each redirect, pins checked addresses and stops at three redirects',async()=>{
  const seen=[];
  await assert.rejects(safeFetch(`${institution}/fr`,{resolver:publicResolver,fetcher:async(url,options)=>{seen.push(url);assert.deepEqual(options.approvedAddresses,[{address:'8.8.8.8',family:4}]);return new Response(null,{status:302,headers:{location:'https://metadata.google.internal/'}});}}),{code:'source_not_allowed'});
  assert.equal(seen.length,1);
  let count=0;
  await assert.rejects(safeFetch(`${institution}/fr`,{resolver:publicResolver,fetcher:async()=>{count++;return new Response(null,{status:302,headers:{location:`/redirect-${count}`}});}}),{code:'redirect_limit'});
  assert.equal(count,4);
});

test('safeFetch bounds streaming bodies and times out slow source lookups',async()=>{
  let cancelled=false;
  const stream=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(20));controller.enqueue(new Uint8Array(20));},cancel(){cancelled=true;}});
  await assert.rejects(safeFetch(`${institution}/fr`,{resolver:publicResolver,maxBytes:30,fetcher:async()=>new Response(stream)}),{code:'document_too_large'});
  assert.equal(cancelled,true);
  await assert.rejects(safeFetch(`${institution}/fr`,{timeoutMs:10,resolver:async()=>new Promise(resolve=>setTimeout(()=>resolve([{address:'8.8.8.8',family:4}]),30))}),{code:'source_timeout'});
});

test('robots policies select specific agents and the longest allow/disallow path',()=>{
  const policy='User-agent: *\nDisallow: /private/\nAllow: /private/public/\nUser-agent: FelexiaIntelligence\nDisallow: /fr\nAllow: /fr/public$';
  assert.equal(robotsAllows(policy,`${institution}/fr`),false);
  assert.equal(robotsAllows(policy,`${institution}/fr/public`),true);
  assert.equal(robotsAllows('User-agent: *\nDisallow: /private/\nAllow: /private/public/',`${institution}/private/public/news`),true);
  assert.equal(robotsAllows('User-agent: *\nDisallow: /',`${institution}/fr`),false);
});

test('collection extracts inert documentary text and records real fingerprints without fact validation',async()=>{
  const calls=[];
  const result=await collectSources({sources:[SOURCE_REGISTRY[0]],resolver:publicResolver,now:'2026-10-12T08:00:00Z',fetcher:async url=>{
    calls.push(url);
    return url.endsWith('robots.txt')?new Response('User-agent: *\nAllow: /',{headers:{'Content-Type':'text/plain'}}):htmlResponse('<html lang="fr"><head><title>Publication OMPIC</title></head><body><nav>Navigation</nav><main><h1>Guide officiel</h1><p>Information documentaire.</p><script>throw new Error("must not execute")</script><form>Secret instructions</form></main></body></html>');
  }});
  assert.equal(result.length,1);assert.equal(result[0].status,'retrieved');assert.equal(result[0].title,'Publication OMPIC');assert.match(result[0].fingerprint,/^[a-f0-9]{64}$/);
  assert.equal(result[0].publicationDate,null);assert.equal(result[0].trust,'primary-host');assert.equal(result[0].retrievedAt,'2026-10-12T08:00:00.000Z');assert.match(result[0].text,/Information documentaire/);assert.doesNotMatch(result[0].text,/must not execute|Secret instructions|Navigation/);assert.equal(result[0].verifiedAt,undefined);assert.equal(calls.length,2);
});

test('collection respects robots including redirected paths and persists PDF/HTTP diagnostics',async()=>{
  let documentCalls=0;
  const blocked=await collectSources({sources:[SOURCE_REGISTRY[0]],resolver:publicResolver,fetcher:async url=>url.endsWith('robots.txt')?new Response('User-agent: *\nDisallow: /fr'):((documentCalls++,htmlResponse('Unexpected')))});
  assert.equal(blocked[0].errorCode,'robots_disallowed');assert.equal(documentCalls,0);
  const redirect=await collectSources({sources:[SOURCE_REGISTRY[0]],resolver:publicResolver,fetcher:async url=>url.endsWith('robots.txt')?new Response('User-agent: *\nDisallow: /private/'):url.endsWith('/fr')?new Response(null,{status:302,headers:{location:'/private/document'}}):((documentCalls++,htmlResponse('Unexpected')))});
  assert.equal(redirect[0].errorCode,'robots_disallowed');assert.equal(documentCalls,0);
  const pdf=await collectSources({sources:[SOURCE_REGISTRY[0]],resolver:publicResolver,fetcher:async url=>url.endsWith('robots.txt')?new Response('',{status:404}):new Response('%PDF-1.7 fixture',{headers:{'Content-Type':'application/pdf'}})});
  assert.equal(pdf[0].status,'unsupported');assert.equal(pdf[0].documentType,'pdf');assert.equal(pdf[0].text,'');assert.equal(pdf[0].errorCode,'pdf_extraction_unavailable');
  const unavailable=await collectSources({sources:[SOURCE_REGISTRY[0]],resolver:publicResolver,fetcher:async()=>new Response('',{status:503})});
  assert.equal(unavailable[0].errorCode,'robots_unavailable');
});

test('a collection cycle caps work at two distinct institutional sources by default',async()=>{
  let requests=0;
  const result=await collectSources({sources:[SOURCE_REGISTRY[0],SOURCE_REGISTRY[0],SOURCE_REGISTRY[1],SOURCE_REGISTRY[2]],resolver:publicResolver,fetcher:async url=>{requests++;return url.endsWith('robots.txt')?new Response('',{status:404}):htmlResponse('<main><h1>Official discovery source</h1><p>Documentary content.</p></main>');}});
  assert.equal(result.length,2);assert.equal(requests,4);
});

test('zero-cost defaults block both AI adapters before networking or budget reservations',async()=>{
  let calls=0;const fetcher=async()=>{calls++;throw new Error('Must not call a provider');};const spend=async()=>{calls++;return true;};
  await assert.rejects(generateTopicDraft(topic,[source],{env:{},fetcher,spend}),{code:'paid_disabled'});
  await assert.rejects(generateTopicImage(topic,{env:{},fetcher,spend}),{code:'paid_disabled'});
  assert.equal(calls,0);
});

test('AI requires explicit models, positive budgets and a persistent reservation before networking',async()=>{
  let calls=0;const fetcher=async()=>{calls++;throw new Error('Unexpected paid call');};
  await assert.rejects(generateTopicDraft(topic,[source],{env:{...paidEnv,FELEXIA_DAILY_API_BUDGET:'0'},fetcher}),{code:'budget_not_configured'});
  await assert.rejects(generateTopicDraft(topic,[source],{env:{...paidEnv,FELEXIA_LLM_MODEL:''},fetcher}),{code:'model_not_configured'});
  await assert.rejects(generateTopicDraft(topic,[source],{env:paidEnv,fetcher}),{code:'budget_guard_missing'});
  await assert.rejects(generateTopicDraft(topic,[source],{env:paidEnv,fetcher,spend:async()=>false}),{code:'budget_exceeded'});
  assert.equal(calls,0);
});

test('structured generation uses the installed AI SDK and leaves every claim unverified',async()=>{
  let allocated;let request;
  const result=await generateTopicDraft(topic,[source],{env:paidEnv,spend:async reservation=>{allocated=reservation;return {ok:true};},fetcher:async(url,options)=>{request=JSON.parse(options.body);return draftFetch(draft())(url,options);}});
  assert.equal(allocated.amount,0.25);assert.equal(allocated.actualCost,null);assert.equal(allocated.costStatus,'reserved-allocation');assert.equal(result.claims[0].status,'unverified');assert.equal(result.claims[0].verifiedAt,null);assert.equal(result.claims[0].evidenceStatus,'quotation-found');assert.equal(result.provenance.reviewedBy,null);assert.equal(result.status,'draft');assert.deepEqual(Object.keys(result.translations),['fr','ar','en']);assert.equal(result.usage.inputTokens,100);assert.equal(result.usage.actualCost,null);
  assert.equal(request.responseFormat.type,'json');assert.match(JSON.stringify(request.prompt),/SOURCE_DATA/);
});

test('invented quotations never gain verification and unknown sources/links reject generated drafts',async()=>{
  const invented=draft();invented.claims[0].quotation='A quotation that the source never contained.';
  const result=await generateTopicDraft(topic,[source],{env:paidEnv,spend:async()=>true,fetcher:draftFetch(invented)});
  assert.equal(result.claims[0].status,'unverified');assert.equal(result.claims[0].evidenceStatus,'quotation-not-found');
  const unknown=draft();unknown.claims[0].sourceId='invented-source';
  await assert.rejects(generateTopicDraft(topic,[source],{env:paidEnv,spend:async()=>true,fetcher:draftFetch(unknown)}),{code:'unknown_source'});
  const broken=draft();broken.translations.en.internalLinks[0].path='/en/invented-service/';
  await assert.rejects(generateTopicDraft(topic,[source],{env:paidEnv,spend:async()=>true,fetcher:draftFetch(broken)}),{code:'unknown_internal_link'});
});

test('provider failure preserves its allocation and does not retry or report success',async()=>{
  let calls=0,allocations=0;
  await assert.rejects(generateTopicDraft(topic,[source],{env:paidEnv,spend:async()=>{allocations++;return true;},fetcher:async()=>{calls++;return Response.json({error:'Provider unavailable'},{status:503});}}),{code:'generation_failed'});
  assert.equal(calls,1);assert.equal(allocations,1);
  const incomplete=draft();delete incomplete.translations.ar;
  await assert.rejects(generateTopicDraft(topic,[source],{env:paidEnv,spend:async()=>true,fetcher:draftFetch(incomplete)}),{code:'generation_failed'});
});

test('image adapter accepts inline raster files, optimizes real WebP sizes and rejects URL-backed output',async()=>{
  const png=await sharp({create:{width:32,height:20,channels:3,background:'#123456'}}).png().toBuffer();
  const result=await generateTopicImage(topic,{env:paidEnv,spend:async()=>true,fetcher:async()=>modelResponse([{type:'file',mediaType:'image/png',data:{type:'data',data:png.toString('base64')}}])});
  const metadata=await sharp(result.buffer).metadata(),small=await sharp(result.smallBuffer).metadata();
  assert.equal(metadata.format,'webp');assert.equal(metadata.width,1280);assert.equal(metadata.height,800);assert.equal(small.width,640);assert.equal(small.height,400);assert.equal(result.rights,'generated');assert.equal(result.actualCost,null);
  await assert.rejects(generateTopicImage(topic,{env:paidEnv,spend:async()=>true,fetcher:async()=>modelResponse([{type:'file',mediaType:'image/png',data:{type:'url',url:'http://127.0.0.1/private.png'}}])}),{code:'image_generation_failed'});
});

test('immutable media uploads use secret keys only on apikey, confirm identical retry bytes and avoid public credentials',async()=>{
  const asset={buffer:Buffer.from('webp-fixture'),smallBuffer:Buffer.from('webp-small-fixture'),provenance:{aiGenerated:true}};
  const objects=new Map();const calls=[];
  const options={env:{SUPABASE_URL:'https://fixture.supabase.co',SUPABASE_SECRET_KEY:'sb_secret_fixture_only'},fetcher:async(url,request)=>{
    calls.push(request);
    if(url.includes('/object/public/')){assert.equal(request.headers,undefined);return new Response(objects.get(url.replace('/object/public/','/object/')),{headers:{'Content-Type':'image/webp'}});}
    assert.equal(request.headers.apikey,'sb_secret_fixture_only');assert.equal(request.headers.Authorization,undefined);
    if(request.method==='GET')return new Response(objects.get(url));
    if(objects.has(url))return Response.json({error:'Asset Already Exists'},{status:400});
    objects.set(url,request.body);return Response.json({Key:'stored'});
  }};
  const first=await uploadImageAsset(asset,options),retry=await uploadImageAsset(asset,options);
  assert.equal(first.id,retry.id);assert.match(first.src,/^\/api\/intelligence-media\?asset=[a-f0-9]{64}\.webp$/);assert.equal(first.verified,true);assert.equal(objects.size,2);assert.equal(calls.length,10);
  let attempted=false;
  await assert.rejects(uploadImageAsset(asset,{env:{SUPABASE_URL:'https://fixture.supabase.co',SUPABASE_SECRET_KEY:'sb_publishable_fixture'},fetcher:async()=>{attempted=true;}}),{code:'storage_not_configured'});
  assert.equal(attempted,false);
});

test('uploaded media is not marked publicly verified when anonymous image delivery is unavailable',async()=>{
  const result=await uploadImageAsset({buffer:Buffer.from('webp-fixture'),smallBuffer:Buffer.from('small-fixture')},{env:{SUPABASE_URL:'https://fixture.supabase.co',SUPABASE_SECRET_KEY:'sb_secret_fixture_only'},fetcher:async(url)=>url.includes('/object/public/')?new Response('',{status:403}):Response.json({Key:'stored'})});
  assert.equal(result.verified,false);assert.equal(result.verificationReason,'public_media_unverified');
});
