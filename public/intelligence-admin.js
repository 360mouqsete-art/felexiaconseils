(()=>{
  let token='',snapshot=null,view='overview';
  const $=selector=>document.querySelector(selector),esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const date=value=>value?new Intl.DateTimeFormat('fr-MA',{dateStyle:'medium',timeStyle:'short',timeZone:'Africa/Casablanca'}).format(new Date(value)):'—';
  const status=(text,error=false)=>{$('#status').textContent=text;$('#status').classList.toggle('error',error);};
  async function request(action,data={}){
    const response=await fetch('/api/intelligence',{method:action?'POST':'GET',headers:{Authorization:`Bearer ${token}`,...action?{'Content-Type':'application/json'}:{}},...action?{body:JSON.stringify({action,...data})}:{}});
    const result=await response.json();if(!response.ok)throw new Error(result.code||'Service indisponible');return result;
  }
  const table=(headers,rows)=>`<div class="table-scroll"><table><thead><tr>${headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')||`<tr><td colspan="${headers.length}">Aucune donnée pour le moment.</td></tr>`}</tbody></table></div>`;
  function render(){
    if(!snapshot)return;const d=snapshot;
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.view===view)));
    let html='';
    if(view==='overview')html=`<div class="metrics">${[['Sujets prêts',d.reserve],['Objectif de réserve',d.reserveTarget],['Sujets publiés',d.topics.filter(t=>t.status==='published').length],['Guides historiques à compléter',d.backfill.pending]].map(([label,value])=>`<div class="metric">${esc(label)}<strong>${esc(value)}</strong></div>`).join('')}</div><article><h2>État du moteur</h2><p>${d.config.enabled?'Activé':'Désactivé'} · ${d.config.dryRun?'Simulation':'Publication réelle'} · ${d.config.allowPaidApis?'Appels IA autorisés':'Appels payants désactivés'}</p><p>Publication cible ${esc(d.config.publicationHour)} · ${esc(d.config.timezone)}</p>${d.clock?`<p>Horloge serveur : ${esc(d.clock.day)} ${esc(d.clock.localTime)} (${esc(d.clock.timezone)}) · UTC ${esc(d.clock.currentTimeUTC)}</p><p>Runtime : Node ${esc(d.clock.runtime.node)} · ICU ${esc(d.clock.runtime.icu)} · fuseaux ${esc(d.clock.runtime.tz)}</p>`:''}<p>${d.warnings.map(esc).join(' · ')}</p></article>`;
    if(view==='calendar')html=table(['Journée locale','Sujet','Publication','Contrôle public'],d.reports.filter(r=>r.type==='daily').reverse().map(r=>[esc(r.day),esc(r.title||'Objectif non atteint'),date(r.publishedAt),esc(r.verification?.status||'—')]));
    if(view==='research')html=table(['Organisme','Document','Contrôle','État'],d.sources.map(s=>[esc(s.issuer),`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title||s.id)}</a>`,date(s.retrievedAt),esc(s.status)]));
    if(view==='guides')html=table(['Sujet','Langues','Statut','Actions'],d.topics.map(t=>[esc(t.title||t.intent||t.id),esc(Object.keys(t.translations||{}).join(' / ').toUpperCase()),esc(t.status),t.status==='published'?'Publié':`<button data-check="${esc(t.id)}">Contrôler</button> <button data-queue="${esc(t.id)}">Préparer</button>`]));
    if(view==='seo')html=`<article><h2>Mesures disponibles</h2><p>Search Console : ${esc(d.analytics.status)}. Aucun classement, volume de recherche, clic ou impression n’est inventé.</p></article>`+table(['Sujet','Contrôles','Dernier contrôle'],d.topics.filter(t=>t.quality).map(t=>[esc(t.title||t.id),esc(t.quality.ok?'Conforme':t.quality.checks.filter(c=>!c.ok).map(c=>c.id).join(', ')),date(t.quality.checkedAt)]));
    if(view==='health')html=table(['Tâche','File','État','Tentatives','Erreur'],d.jobs.map(j=>[esc(j.id),esc(j.queue),esc(j.status),esc(j.attempts),esc(j.error||'—')]))+table(['Événement','Date','Détail'],d.events.slice().reverse().map(e=>[esc(e.type),date(e.at),esc(JSON.stringify(e.details))]));
    $('#content').innerHTML=html;
    document.querySelectorAll('[data-check],[data-queue]').forEach(button=>button.addEventListener('click',()=>act(button.dataset.check?'check':'queue',{id:button.dataset.check||button.dataset.queue})));
  }
  async function refresh(){snapshot=await request();render();}
  async function act(action,data={}){try{status('Traitement en cours…');const result=await request(action,data);await refresh();status(result.result?.status||'Opération enregistrée.');}catch(error){status(error.message,true);}}
  $('#login').addEventListener('submit',async event=>{event.preventDefault();token=$('#token').value;$('#token').value='';try{await refresh();$('#login').hidden=true;$('#dashboard').hidden=false;status('Session ouverte.');}catch(error){token='';status(error.message,true);}});
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{view=button.dataset.view;render();}));
  ['pause','resume','tick','seed'].forEach(id=>$('#'+id).addEventListener('click',()=>act(id)));
  $('#refresh').addEventListener('click',()=>refresh().catch(error=>status(error.message,true)));
  $('#import').addEventListener('click',()=>{try{const input=JSON.parse($('#import-json').value);act('import',input);}catch{status('JSON invalide.',true);}});
  $('#logout').addEventListener('click',()=>{token='';snapshot=null;$('#content').replaceChildren();$('#dashboard').hidden=true;$('#login').hidden=false;status('Session fermée.');});
})();
