import {randomUUID} from 'node:crypto';
import {intelligenceConfig,localClock,clockDiagnostics,languages} from './config.mjs';
import {qualityGate,duplicateTopic,contentFingerprint,topicScore} from './quality.mjs';

const queues = {urgent:0,new:1,backfill:2,refresh:3};
const instant = now => now.toISOString();
export function addEvent(state, type, details = {}, now = new Date()) {
  state.events.push({id:randomUUID(),type,at:instant(now),details});
  state.events=state.events.slice(-2000);
}
export function enqueue(state, {id,queue='new',type='draft',topicId,payload={}},now=new Date()) {
  const existing = state.jobs.find(j=>j.id===id);
  if(existing)return existing;
  const job={id,queue,type,topicId,payload,status:'pending',attempts:0,availableAt:instant(now),createdAt:instant(now)};
  state.jobs.push(job);return job;
}
export function createEngine({store,env=process.env,knownPaths=new Set(),historical=[],research,generateDraft,generateImage,uploadImage,verifyPublication,notify,now=()=>new Date()}={}) {
  const config=intelligenceConfig(env);
  const gate=(topic,state,date=now())=>qualityGate(topic,{state,config,now:date,knownPaths,historical});
  async function reserveSpend({amount,kind,model,reservationId}) {
    if(!config.allowPaidApis||!config.dailyBudget||!config.monthlyBudget)throw Object.assign(new Error('Paid APIs disabled'),{code:'paid_disabled'});
    if(!Number.isFinite(amount)||amount<=0)throw new Error('Invalid cost reservation');
    const clock=localClock(now(),config.timezone);
    return store.transaction(state=>{
      if(state.metrics.some(m=>m.id===reservationId))return true;
      const dayUsed=state.metrics.filter(m=>m.day===clock.day&&m.type==='cost_reservation').reduce((s,m)=>s+m.amount,0);
      const monthUsed=state.metrics.filter(m=>m.month===clock.month&&m.type==='cost_reservation').reduce((s,m)=>s+m.amount,0);
      if(dayUsed+amount>config.dailyBudget||monthUsed+amount>config.monthlyBudget){addEvent(state,'budget_exceeded',{kind},now());return false;}
      state.metrics.push({id:reservationId,type:'cost_reservation',amount,actualCost:null,currency:'USD',day:clock.day,month:clock.month,kind,model,at:instant(now())});return true;
    });
  }
  async function importTopics(topics,sources=[]) {
    return store.transaction(state=>{
      let inserted=0;
      for(const source of sources){const old=state.sources.find(s=>s.id===source.id);if(!old)state.sources.push(structuredClone(source));}
      for(const topic of topics){if(state.topics.some(t=>t.id===topic.id))continue;if(duplicateTopic(topic,state.topics,historical)){addEvent(state,'duplicate_rejected',{topicId:topic.id},now());continue;}state.topics.push({...structuredClone(topic),status:topic.status==='idea'?'idea':'draft',createdAt:topic.createdAt||instant(now())});inserted++;}
      addEvent(state,'topics_imported',{inserted},now());return {inserted};
    });
  }
  async function prepareTopic(id) {
    return store.transaction(state=> {
      const topic=state.topics.find(t=>t.id===id);if(!topic)throw Object.assign(new Error('Topic not found'),{code:'not_found'});
      if(topic.status==='published')throw new Error('Published topic cannot be prepared');
      const result=gate(topic,state);
      topic.quality=result;topic.status=result.ok?'ready':'blocked';
      addEvent(state,'quality_checked',{topicId:id,ok:result.ok,failed:result.checks.filter(c=>!c.ok).map(c=>c.id)},now());return result;
    });
  }
  async function correctClaim(topicId,claimId,patch) {
    return store.transaction(state=>{
      const topic=state.topics.find(t=>t.id===topicId),claim=topic?.claims?.find(c=>c.id===claimId);
      if(!claim)throw new Error('Claim not found');
      topic.revisions=[...topic.revisions||[],{at:instant(now()),reason:'claim_correction',fingerprint:contentFingerprint(topic),claims:structuredClone(topic.claims),translations:structuredClone(topic.translations)}].slice(-10);
      Object.assign(claim,patch,{status:'unverified',verifiedAt:null});
      topic.requiresRefresh=true;topic.synchronizationRequired=[...languages];
      if(topic.status!=='published')topic.status='blocked';
      enqueue(state,{id:`urgent:${topicId}:${contentFingerprint(topic)}`,queue:'urgent',type:'refresh',topicId},now());
      addEvent(state,'claim_correction',{topicId,claimId,languages},now());return {ok:true};
    });
  }
  async function publishOne({date=now(),force=false}={}) {
    const clock=localClock(date,config.timezone);
    return store.transaction(state=>{
      if(!config.enabled||!config.autoPublish||state.settings.paused)return {status:'disabled'};
      if(!force&&clock.time<config.publicationHour)return {status:'before_window',day:clock.day,clock:clockDiagnostics(date,config.timezone),publicationHour:config.publicationHour};
      const previous=state.reports.find(r=>r.type==='daily'&&r.day===clock.day&&r.topicId);
      if(previous)return {status:'already_published',topicId:previous.topicId,day:clock.day};
      const candidates=state.topics.filter(t=>t.kind==='new'&&t.status==='ready').sort((a,b)=>(b.priority||0)-(a.priority||0));
      for(const topic of candidates){
        const result=gate(topic,state,date);topic.quality=result;
        if(!result.ok){topic.status='blocked';addEvent(state,'publication_blocked',{topicId:topic.id,checks:result.checks.filter(c=>!c.ok)},date);continue;}
        if(config.dryRun){addEvent(state,'publication_simulated',{topicId:topic.id,day:clock.day},date);return {status:'dry_run',topicId:topic.id,day:clock.day};}
        topic.status='published';topic.publishedAt=instant(date);topic.modifiedAt=instant(date);topic.publicationDay=clock.day;
        topic.sources=(topic.sourceIds||[]).map(id=>structuredClone(state.sources.find(s=>s.id===id)));
        const urls=Object.fromEntries(languages.map(l=>[l,config.origin+`/${l}/guides/${encodeURIComponent(topic.translations[l].slug)}/`]));
        const report={type:'daily',day:clock.day,topicId:topic.id,title:topic.translations.fr.title,publishedAt:topic.publishedAt,urls,sources:topic.sources.map(s=>({url:s.url,fingerprint:s.fingerprint})),image:topic.image.src,quality:result,verification:{status:'pending'},incidents:[]};
        state.reports=state.reports.filter(r=>!(r.type==='daily'&&r.day===clock.day));state.reports.push(report);
        addEvent(state,'topic_published',{topicId:topic.id,day:clock.day,urls},date);return {status:'published',topicId:topic.id,day:clock.day,urls};
      }
      const missed=state.reports.find(r=>r.type==='daily'&&r.day===clock.day);
      if(!missed){state.reports.push({type:'daily',day:clock.day,topicId:null,incidents:['daily_publication_missed'],createdAt:instant(date)});addEvent(state,'daily_publication_missed',{day:clock.day},date);}
      return {status:'no_ready_topic',day:clock.day};
    });
  }
  async function publishMaintenance({date=now()}={}) {
    const clock=localClock(date,config.timezone);
    return store.transaction(state=>{
      if(!config.enabled||!config.autoPublish||state.settings.paused)return {status:'disabled'};
      const used=state.topics.filter(topic=>topic.kind==='backfill'&&topic.status==='published'&&topic.publicationDay===clock.day).length;
      if(used>=config.backfillPerDay)return {status:'maintenance_quota',day:clock.day};
      const candidates=state.topics.filter(topic=>topic.kind==='backfill'&&topic.status==='ready').sort((a,b)=>(b.priority||0)-(a.priority||0));
      for(const topic of candidates){
        const result=gate(topic,state,date);topic.quality=result;
        if(!result.ok){topic.status='blocked';addEvent(state,'maintenance_blocked',{topicId:topic.id,checks:result.checks.filter(check=>!check.ok).map(check=>check.id)},date);continue;}
        if(config.dryRun)return {status:'dry_run',topicId:topic.id,day:clock.day};
        topic.status='published';topic.publishedAt=instant(date);topic.modifiedAt=instant(date);topic.publicationDay=clock.day;
        topic.sources=(topic.sourceIds||[]).map(id=>structuredClone(state.sources.find(source=>source.id===id)));
        const urls=Object.fromEntries(languages.map(language=>[language,config.origin+`/${language}/guides/${encodeURIComponent(topic.translations[language].slug)}/`]));
        state.reports.push({type:'maintenance',day:clock.day,topicId:topic.id,kind:topic.kind,urls,publishedAt:topic.publishedAt,verification:{status:'pending'}});
        addEvent(state,'maintenance_published',{topicId:topic.id,day:clock.day,kind:topic.kind,urls},date);
        return {status:'published',topicId:topic.id,day:clock.day,urls};
      }
      // A refresh needs a separate revision candidate so the old public page
      // remains available until all regenerated languages pass documentary QA.
      return {status:'no_ready_maintenance',refreshStatus:'revision_candidate_required',day:clock.day};
    });
  }
  async function discover() {
    if(!research)return {status:'not_configured'};
    const records=await research({now:now()});
    await store.transaction(state=>{
      for(const source of records){
        if(source.status!=='retrieved'){state.sourceDiagnostics=[...(state.sourceDiagnostics||[]),structuredClone(source)].slice(-500);addEvent(state,'source_unavailable',{sourceId:source.id,code:source.errorCode||source.status},now());continue;}
        const previous=state.sources.find(s=>s.id===source.id || s.url===source.url);
        if(previous){
          if(previous.fingerprint!==source.fingerprint){
            state.sourceHistory=[...state.sourceHistory||[],{id:previous.id,fingerprint:previous.fingerprint,retrievedAt:previous.retrievedAt,excerpt:previous.excerpt}].slice(-1000);
            for(const topic of state.topics.filter(t=>t.sourceIds?.includes(previous.id))){topic.requiresRefresh=true;if(topic.status!=='published')topic.status='blocked';enqueue(state,{id:`source-refresh:${topic.id}:${source.fingerprint}`,queue:'urgent',type:'refresh',topicId:topic.id},now());}
            addEvent(state,'source_changed',{sourceId:previous.id},now());
          }
          Object.assign(previous,{...source,id:previous.id});
        }else state.sources.push(source);
      }
    });return {status:'collected',count:records.filter(s=>s.status==='retrieved').length,failures:records.filter(s=>s.status!=='retrieved').length};
  }
  async function processJob() {
    const job=await store.transaction(state=>{
      if(state.settings.paused)return null;
      for(const j of state.jobs.filter(j=>j.status==='running'&&Date.parse(j.lockedUntil)<=now().getTime())){j.status='retry';j.availableAt=instant(now());}
      const selected=state.jobs.filter(j=>['pending','retry'].includes(j.status)&&Date.parse(j.availableAt)<=now().getTime()).sort((a,b)=>(queues[a.queue]??9)-(queues[b.queue]??9)||a.createdAt.localeCompare(b.createdAt))[0];
      if(!selected)return null;selected.status='running';selected.attempts++;selected.lockToken=randomUUID();selected.lockedUntil=instant(new Date(now().getTime()+240000));return structuredClone(selected);
    });
    if(!job)return {status:'idle'};
    try {
      const snapshot=await store.read(),topic=snapshot.topics.find(t=>t.id===job.topicId);
      if(!topic)throw Object.assign(new Error('Topic not found'),{code:'not_found'});
      if(['backfill','refresh'].includes(job.type)){
        // Historic translations must be based on the preserved original and
        // refreshed evidence. Never regenerate an existing translation silently.
        if(!topic.originalContent)throw Object.assign(new Error('Historic content and evidence need import'),{code:'original_content_required'});
      }
      const sources=snapshot.sources.filter(s=>topic.sourceIds?.includes(s.id));
      if(!languages.every(language=>topic.translations?.[language])){
        if(!config.allowPaidApis)throw Object.assign(new Error('Generation disabled: no paid APIs authorised'),{code:'paid_disabled'});
        if(!sources.length)throw Object.assign(new Error('No documentation'),{code:'sources_required'});
        if(!generateDraft)throw Object.assign(new Error('LLM not configured'),{code:'llm_not_configured'});
        const draft=await generateDraft({...topic,internalLinkTargets:[...knownPaths]},sources,{env,spend:reserveSpend});
        await store.transaction(state=>{const target=state.topics.find(t=>t.id===topic.id);const active=state.jobs.find(j=>j.id===job.id);if(active.lockToken!==job.lockToken)throw new Error('Job lease lost');
          const riskRank={low:0,moderate:1,high:2};
          const risk=(riskRank[draft.risk]??2)>(riskRank[target.risk]??2)?draft.risk:target.risk;
          const translations={...draft.translations,...(target.translations||{})};
          // Preserve any existing translation, including a human adaptation.
          // New factual matrices still have to match it before publication.
          Object.assign(target,draft,{id:topic.id,kind:topic.kind,risk,translations,status:'draft',authorized:topic.authorized,verifiedAt:null});addEvent(state,'draft_created',{topicId:topic.id},now());});
      }
      const current=(await store.read()).topics.find(t=>t.id===topic.id);
      if(!current.image){
        if(!generateImage||!uploadImage)throw Object.assign(new Error('Image storage not configured'),{code:'image_not_configured'});
        let image;
        if(current.pendingImage){image={...current.pendingImage,buffer:Buffer.from(current.pendingImage.buffer,'base64'),smallBuffer:Buffer.from(current.pendingImage.smallBuffer,'base64')};}
        else {
          if(!config.allowPaidApis)throw Object.assign(new Error('Generation disabled: no paid APIs authorised'),{code:'paid_disabled'});
          image=await generateImage(current,{env,spend:reserveSpend});
          await store.transaction(state=>{const active=state.jobs.find(j=>j.id===job.id);if(active.lockToken!==job.lockToken)throw new Error('Job lease lost');state.topics.find(t=>t.id===topic.id).pendingImage={...image,buffer:image.buffer.toString('base64'),smallBuffer:image.smallBuffer.toString('base64')};});
        }
        const asset=await uploadImage(current.id,image,{env});
        await store.transaction(state=>{const active=state.jobs.find(j=>j.id===job.id);if(active.lockToken!==job.lockToken)throw new Error('Job lease lost');const target=state.topics.find(t=>t.id===topic.id);target.image=asset;delete target.pendingImage;});
      }
      // Model output alone never upgrades factual claims to verified.
      const result=await prepareTopic(topic.id);
      await store.transaction(state=>{const j=state.jobs.find(j=>j.id===job.id);if(j.lockToken!==job.lockToken)throw new Error('Job lease lost');j.status=result.ok?'complete':'needs_evidence';j.finishedAt=instant(now());});
      return {status:result.ok?'complete':'needs_evidence',jobId:job.id};
    }catch(error){
      const code=String(error.code||'provider_failure');
      await store.transaction(state=>{const j=state.jobs.find(j=>j.id===job.id);if(j.lockToken!==job.lockToken)return;j.error=code;j.status=['paid_disabled','original_content_required','sources_required'].includes(code)?'blocked':j.attempts>=5?'failed':'retry';j.availableAt=instant(new Date(now().getTime()+Math.min(86400000,60000*2**j.attempts)));addEvent(state,'job_error',{jobId:job.id,code,attempt:j.attempts},now());});
      return {status:'error',jobId:job.id,code};
    }
  }
  async function verifyPendingPublications() {
    if(!verifyPublication)return {status:'not_configured'};
    const snapshot=await store.read();
    const pending=snapshot.reports.filter(r=>r.topicId&&r.verification?.status!=='verified').slice(-1);
    for(const report of pending){
      let verification;
      try{verification=await verifyPublication(snapshot.topics.find(t=>t.id===report.topicId),report.urls);}catch{verification={status:'failed',reason:'public_verification_failed'};}
      await store.transaction(state=>{const r=state.reports.find(r=>r.type===report.type&&r.day===report.day&&r.topicId===report.topicId);if(!r)return;r.verification={...verification,checkedAt:instant(now())};if(verification.status!=='verified')addEvent(state,'public_url_failure',{topicId:report.topicId,verification},now());});
    }return {count:pending.length};
  }
  async function summaries() {
    const state=await store.read(),date=now(),clock=localClock(date,config.timezone);
    const ready=state.topics.filter(t=>t.status==='ready'&&t.kind==='new');
    return {config:{...config},day:clock.day,clock:clockDiagnostics(date,config.timezone),reserve:ready.length,reserveTarget:config.reserveTarget,topics:state.topics,jobs:state.jobs,sources:state.sources,events:state.events.slice(-100),reports:state.reports,metrics:state.metrics,backfill:{pending:historical.filter(h=>h.missingLanguages?.length).length},analytics:{status:state.metrics.some(m=>m.type==='search_console')?'available':'not_connected'},warnings:[...ready.length<config.reserveTarget?['reserve_low']:[],...!config.allowPaidApis?['paid_apis_disabled']:[]]};
  }
  async function tick({force=false}={}) {
    if(!config.enabled)return {status:'disabled'};
    if((await store.read()).settings.paused)return {status:'paused'};
    return store.lease('editorial-worker',async()=>{
      const date=now(),clock=localClock(date,config.timezone);
      // Publication comes first: generation/backfill cannot exhaust its window.
      const publication=await publishOne({date,force});
      const before=await store.read();
      const lastResearch=before.events.findLast(e=>e.type==='research_daily'&&e.details.day===clock.day);
      let discovery={status:'already_checked'};
      if(!lastResearch){try{discovery=await discover();await store.transaction(state=>addEvent(state,'research_daily',{day:clock.day,...discovery},now()));}catch{discovery={status:'failed'};await store.transaction(state=>addEvent(state,'research_failure',{day:clock.day},now()));}}
      const job=await processJob();
      const maintenance=await publishMaintenance({date});
      const verification=await verifyPendingPublications();
      await store.transaction(state=>{
        const ready=state.topics.filter(t=>t.kind==='new'&&t.status==='ready').length;
        if(ready<config.reserveTarget&&!state.events.some(e=>e.type==='reserve_low'&&e.details.day===clock.day))addEvent(state,'reserve_low',{day:clock.day,ready,target:config.reserveTarget},now());
        for(const kind of ['weekly','monthly']){
          const weekDate=new Date(clock.day+'T12:00:00Z');weekDate.setUTCDate(weekDate.getUTCDate()-(weekDate.getUTCDay()+6)%7);
          const period=kind==='weekly'?weekDate.toISOString().slice(0,10):clock.month;
          const published=state.topics.filter(t=>t.status==='published'&&t.publicationDay&&(kind==='weekly'?t.publicationDay>=period&&t.publicationDay<=clock.day:t.publicationDay.startsWith(clock.month)));
          const report={type:kind,period,updatedAt:instant(now()),newTopics:published.filter(t=>t.kind==='new').length,translations:published.reduce((sum,t)=>sum+Object.keys(t.translations||{}).length,0),ready,apiReservedUsd:state.metrics.filter(m=>m.month===clock.month&&m.type==='cost_reservation').reduce((s,m)=>s+m.amount,0),actualApiCostUsd:null,seoStatus:state.metrics.some(m=>m.type==='search_console')?'available':'not_connected'};
          const index=state.reports.findIndex(r=>r.type===kind&&r.period===period);if(index<0)state.reports.push(report);else state.reports[index]=report;
        }
        state.jobs=state.jobs.filter(j=>!['complete'].includes(j.status)||Date.parse(j.finishedAt)>date.getTime()-30*86400000);
      });
      if(notify){const snapshot=await store.read();const event=snapshot.events.findLast(e=>['daily_publication_missed','reserve_low','public_url_failure','job_error'].includes(e.type)&&!e.notification);if(event){let sent=false;try{sent=await notify(event);}catch{}await store.transaction(s=>{const e=s.events.find(e=>e.id===event.id);if(e)e.notification=sent?'sent':'failed';});}}
      return {status:'completed',clock:clockDiagnostics(date,config.timezone),publication,discovery,job,maintenance,verification};
    },{ttlMs:240000});
  }
  return {config,gate,importTopics,prepareTopic,publishOne,publishMaintenance,discover,processJob,tick,summaries,correctClaim,reserveSpend};
}
