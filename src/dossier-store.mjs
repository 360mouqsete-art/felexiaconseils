// Server-only Supabase adapter for client files. Never log env values or tokens.
const TABLES = {
  staff:'felexia_dossier_staff',
  dossiers:'felexia_dossiers',
  steps:'felexia_dossier_steps',
  documents:'felexia_dossier_documents',
  notes:'felexia_dossier_notes'
};
const BUCKET = 'felexia-dossiers';

export function dossierConfiguration(env) {
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  if (!env.SUPABASE_URL && !key) return {error:'not_configured'};
  if (!env.SUPABASE_URL || !key || typeof key !== 'string' || /\s/.test(key)) return {error:'configuration'};
  let base;
  try { base = new URL(env.SUPABASE_URL); } catch { return {error:'configuration'}; }
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash || !['','/'].includes(base.pathname)) return {error:'configuration'};
  const headers = {apikey:key, 'Content-Type':'application/json'};
  if (!/^sb_secret_[A-Za-z0-9_-]+$/.test(key)) {
    try {
      const parts = key.split('.');
      if (parts.length !== 3 || JSON.parse(Buffer.from(parts[1], 'base64url')).role !== 'service_role') return {error:'configuration'};
    } catch { return {error:'configuration'}; }
    headers.Authorization = `Bearer ${key}`;
  }
  return {base, headers, key};
}

async function rest(config, fetcher, path, options = {}) {
  const response = await fetcher(new URL('/rest/v1/' + path, config.base), {
    ...options,
    headers:{...config.headers, Prefer:options.prefer || 'return=representation', ...options.headers},
    signal:AbortSignal.timeout(12000),
    redirect:'error'
  });
  const text = await response.text();
  if (!response.ok) return {error:response.status === 404 ? 'unavailable' : 'failed'};
  if (!text) return {data:[]};
  try { return {data:JSON.parse(text)}; } catch { return {error:'failed'}; }
}

export async function sendMagicLink(config, fetcher, email, redirectTo) {
  const url = new URL('/auth/v1/otp', config.base);
  url.searchParams.set('redirect_to', redirectTo);
  const headers = {...config.headers};
  if (!headers.Authorization) headers.Authorization = `Bearer ${config.key}`;
  const response = await fetcher(url, {
    method:'POST',
    headers,
    body:JSON.stringify({email, create_user:true}),
    signal:AbortSignal.timeout(12000),
    redirect:'error'
  });
  await response.text().catch(() => '');
  return response.ok ? {ok:true} : {error:'failed'};
}

export async function userFromAccessToken(config, fetcher, accessToken) {
  if (typeof accessToken !== 'string' || accessToken.length < 20 || accessToken.length > 4096) return {error:'session'};
  const headers = {...config.headers, Authorization:`Bearer ${accessToken}`};
  const response = await fetcher(new URL('/auth/v1/user', config.base), {headers, signal:AbortSignal.timeout(12000), redirect:'error'});
  const text = await response.text();
  if (!response.ok) return {error:'session'};
  try {
    const user = JSON.parse(text);
    if (!user?.id || !user.email) return {error:'session'};
    return {user:{uid:user.id, email:String(user.email).toLowerCase()}};
  } catch { return {error:'session'}; }
}

export async function isStaff(config, fetcher, uid) {
  const result = await rest(config, fetcher, `${TABLES.staff}?user_id=eq.${encodeURIComponent(uid)}&select=user_id`);
  if (result.error) return result;
  return {staff:Array.isArray(result.data) && result.data.length > 0};
}

function mapDossier(row, steps, documents, notes) {
  return {
    id:row.id,
    reference:row.reference,
    type:row.type,
    state:row.state,
    clientEmail:row.client_email,
    clientUserId:row.client_user_id,
    steps:(steps || []).filter(step => step.dossier_id === row.id).sort((a,b) => a.position - b.position).map(step => ({
      id:step.id, key:step.step_key, position:step.position, status:step.status, completedOn:step.completed_on,
      label:{fr:step.label_fr, en:step.label_en, ar:step.label_ar}
    })),
    requests:(documents || []).filter(item => item.dossier_id === row.id && item.kind === 'request').map(item => ({
      id:item.id, status:item.status, filename:item.filename || '', label:item.label
    })),
    deliveries:(documents || []).filter(item => item.dossier_id === row.id && item.kind === 'delivery' && item.storage_path).map(item => ({
      id:item.id, filename:item.filename || '', label:item.label
    })),
    notes:(notes || []).filter(note => note.dossier_id === row.id).map(note => ({
      id:note.id, at:String(note.created_at).slice(0,10), text:note.body
    }))
  };
}

export async function loadDossiers(config, fetcher, session) {
  const filter = session.staff
    ? 'select=*'
    : `select=*&or=(client_user_id.eq.${encodeURIComponent(session.uid)},client_email.eq.${encodeURIComponent(session.email)})`;
  const dossiers = await rest(config, fetcher, `${TABLES.dossiers}?${filter}&order=created_at.desc`);
  if (dossiers.error) return dossiers;
  const rows = Array.isArray(dossiers.data) ? dossiers.data : [];
  if (!rows.length) return {dossiers:[]};
  const ids = rows.map(row => row.id).join(',');
  const [steps, documents, notes] = await Promise.all([
    rest(config, fetcher, `${TABLES.steps}?dossier_id=in.(${ids})&select=*`),
    rest(config, fetcher, `${TABLES.documents}?dossier_id=in.(${ids})&select=id,dossier_id,kind,label,status,filename,storage_path`),
    rest(config, fetcher, `${TABLES.notes}?dossier_id=in.(${ids})&select=id,dossier_id,body,created_at&order=created_at.asc`)
  ]);
  if (steps.error || documents.error || notes.error) return {error:'failed'};
  return {dossiers:rows.map(row => mapDossier(row, steps.data, documents.data, notes.data))};
}

export async function linkClient(config, fetcher, session) {
  await rest(config, fetcher, `${TABLES.dossiers}?client_user_id=is.null&client_email=eq.${encodeURIComponent(session.email)}`, {
    method:'PATCH',
    body:JSON.stringify({client_user_id:session.uid})
  });
}

export async function insertDossier(config, fetcher, {reference, email, type, steps}) {
  const created = await rest(config, fetcher, TABLES.dossiers, {
    method:'POST',
    body:JSON.stringify({reference, client_email:email, type, state:'open'})
  });
  if (created.error || !created.data?.[0]?.id) return {error:created.error || 'failed'};
  const dossierId = created.data[0].id;
  const stepRows = steps.map(step => ({
    dossier_id:dossierId, position:step.position, step_key:step.key, status:step.status,
    label_fr:step.label.fr, label_en:step.label.en, label_ar:step.label.ar
  }));
  const saved = await rest(config, fetcher, TABLES.steps, {method:'POST', body:JSON.stringify(stepRows)});
  if (saved.error) return saved;
  return {id:dossierId, reference};
}

export async function updateStep(config, fetcher, {dossierId, stepId, status, completedOn}) {
  return rest(config, fetcher, `${TABLES.steps}?id=eq.${encodeURIComponent(stepId)}&dossier_id=eq.${encodeURIComponent(dossierId)}`, {
    method:'PATCH',
    body:JSON.stringify({status, completed_on:completedOn})
  });
}

export async function insertDocument(config, fetcher, row) {
  const created = await rest(config, fetcher, TABLES.documents, {method:'POST', body:JSON.stringify(row)});
  if (created.error || !created.data?.[0]?.id) return {error:created.error || 'failed'};
  return {id:created.data[0].id};
}

export async function updateDocument(config, fetcher, id, patch) {
  return rest(config, fetcher, `${TABLES.documents}?id=eq.${encodeURIComponent(id)}`, {method:'PATCH', body:JSON.stringify(patch)});
}

export async function documentRow(config, fetcher, id) {
  const result = await rest(config, fetcher, `${TABLES.documents}?id=eq.${encodeURIComponent(id)}&select=*`);
  if (result.error) return result;
  return {row:result.data?.[0] || null};
}

export async function insertNote(config, fetcher, {dossierId, body}) {
  return rest(config, fetcher, TABLES.notes, {method:'POST', body:JSON.stringify({dossier_id:dossierId, body})});
}

export async function dossierRow(config, fetcher, id) {
  const result = await rest(config, fetcher, `${TABLES.dossiers}?id=eq.${encodeURIComponent(id)}&select=*`);
  if (result.error) return result;
  return {row:result.data?.[0] || null};
}

async function storage(config, fetcher, path, options) {
  const response = await fetcher(new URL('/storage/v1/' + path, config.base), {
    ...options,
    headers:{...config.headers, ...options.headers},
    signal:AbortSignal.timeout(12000),
    redirect:'error'
  });
  const text = await response.text();
  if (!response.ok) return {error:'failed'};
  try { return {data:JSON.parse(text)}; } catch { return {error:'failed'}; }
}

export async function signedUpload(config, fetcher, objectPath) {
  const result = await storage(config, fetcher, `object/upload/sign/${BUCKET}/${objectPath}`, {method:'POST', body:JSON.stringify({upsert:false})});
  const token = result.data?.token || result.data?.url;
  if (!token) return {error:'failed'};
  const path = typeof result.data.url === 'string' && result.data.url.startsWith('/') ? result.data.url : `/object/upload/sign/${BUCKET}/${objectPath}?token=${token}`;
  return {uploadUrl:new URL('/storage/v1' + (path.startsWith('/') ? path : `/${path}`), config.base).href};
}

export async function signedDownload(config, fetcher, objectPath) {
  const result = await storage(config, fetcher, `object/sign/${BUCKET}/${objectPath}`, {method:'POST', body:JSON.stringify({expiresIn:120})});
  const signed = result.data?.signedURL || result.data?.signedUrl;
  if (!signed) return {error:'failed'};
  return {downloadUrl:signed.startsWith('http') ? signed : new URL(signed.startsWith('/') ? '/storage/v1' + signed : '/storage/v1/' + signed, config.base).href};
}

export async function notifyClient(env, fetcher, {email, reference, lang}) {
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL) return {notified:false};
  const subject = {fr:`Felexia Conseils — dossier ${reference}`, en:`Felexia Conseils — file ${reference}`, ar:`Felexia Conseils — ملف ${reference}`}[lang] || `Felexia Conseils — ${reference}`;
  const text = {
    fr:`Votre dossier ${reference} a été mis à jour. Connectez-vous à l’espace « Mon dossier » avec le lien envoyé sur cet e-mail.`,
    en:`Your file ${reference} has been updated. Sign in to “My file” with the link sent to this email.`,
    ar:`تم تحيين ملفكم ${reference}. ادخلوا إلى «ملفي» عبر الرابط المرسل إلى هذا البريد.`
  }[lang] || `File ${reference} was updated.`;
  try {
    const response = await fetcher('https://api.resend.com/emails', {
      method:'POST',
      headers:{'Content-Type':'application/json', Authorization:`Bearer ${env.RESEND_API_KEY}`},
      body:JSON.stringify({from:env.CONTACT_FROM_EMAIL, to:[email], subject, text}),
      signal:AbortSignal.timeout(12000),
      redirect:'error'
    });
    await response.text().catch(() => '');
    return {notified:response.ok};
  } catch {
    return {notified:false};
  }
}
