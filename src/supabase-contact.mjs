import {createHash} from 'node:crypto';

// Server-only adapter. This module is never imported by the static build or public JS.
const TABLE = 'felexia_contact_requests';
const SELECT = 'request_id,reference,payload_hash';
const FIELDS = ['kind','locale','language','name','email','phone','message','country','city','activity','partners','service','profile','structure','date','time','mode'];
const failure = (status, code) => ({status, body:{ok:false, code}});

function configuration(env) {
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  if (!env.SUPABASE_URL && !key) return {error:'not_configured'};
  if (!env.SUPABASE_URL || !key || typeof key !== 'string' || /\s/.test(key)) return {error:'configuration'};
  let base;
  try { base = new URL(env.SUPABASE_URL); } catch { return {error:'configuration'}; }
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash || !['','/'].includes(base.pathname)) return {error:'configuration'};
  // Secret keys are opaque: they belong on apikey, never Authorization: Bearer.
  const headers = {'Content-Type':'application/json', apikey:key};
  if (!/^sb_secret_[A-Za-z0-9_-]+$/.test(key)) {
    // Compatibility for existing projects that still use a legacy service-role JWT.
    try {
      const parts = key.split('.');
      if (parts.length !== 3 || JSON.parse(Buffer.from(parts[1], 'base64url')).role !== 'service_role') return {error:'configuration'};
    } catch { return {error:'configuration'}; }
    headers.Authorization = `Bearer ${key}`;
  }
  return {base, headers};
}

function prepare(payload) {
  if (!payload || payload.consent !== true || typeof payload.requestId !== 'string' || !/^[A-Za-z0-9-]{8,60}$/.test(payload.requestId)) return null;
  const body = {};
  for (const field of FIELDS) {
    if (payload[field] !== undefined && typeof payload[field] !== 'string') return null;
    body[field] = payload[field] || '';
  }
  if (!body.name || !body.email || !body.message || !['contact','project','appointment'].includes(body.kind) || !['fr','en','ar'].includes(body.locale) || !['fr','en','ar'].includes(body.language)) return null;
  body.consent = true;
  const serialized = JSON.stringify(body);
  if (Buffer.byteLength(serialized) > 16384) return null;
  return {
    request_id:payload.requestId,
    reference:'FLX-' + createHash('sha256').update(payload.requestId).digest('hex').slice(0,8).toUpperCase(),
    payload_hash:createHash('sha256').update(serialized).digest('hex'),
    payload:body
  };
}

function confirmed(rows, expected) {
  if (!Array.isArray(rows) || rows.length !== 1 || rows[0]?.request_id !== expected.request_id || !/^FLX-[A-F0-9]{8}$/.test(rows[0]?.reference || '')) return failure(502, 'delivery_failed');
  if (rows[0].payload_hash !== expected.payload_hash) return failure(409, 'idempotency_conflict');
  return {status:200, body:{ok:true, reference:rows[0].reference}};
}

function providerFailure(status) {
  return [401,403,404].includes(status) ? failure(503, 'configuration') : failure(502, 'delivery_failed');
}

/**
 * Persist a payload already validated by validateContact().
 * Returns the same {status,body} shape used by createContactHandler.
 * A success confirms database storage, not email delivery.
 */
export async function persistContactToSupabase(payload, {env=process.env, fetcher=fetch}={}) {
  const config = configuration(env);
  if (config.error) return failure(503, config.error);
  const record = prepare(payload);
  if (!record) return failure(400, 'invalid_payload');
  const endpoint = new URL(`/rest/v1/${TABLE}`, config.base);
  endpoint.searchParams.set('on_conflict', 'request_id');
  endpoint.searchParams.set('select', SELECT);
  try {
    const inserted = await fetcher(endpoint, {
      method:'POST',
      headers:{...config.headers, Prefer:'resolution=ignore-duplicates,return=representation'},
      body:JSON.stringify(record),
      redirect:'error',
      signal:AbortSignal.timeout(12000)
    });
    if (!inserted.ok) return providerFailure(inserted.status);
    const rows = await inserted.json();
    if (!Array.isArray(rows)) return failure(502, 'delivery_failed');
    if (rows.length) return confirmed(rows, record);

    // ON CONFLICT DO NOTHING preserves the original submission even after a
    // serverless cold start, a concurrent request, or a lost POST response.
    const existing = new URL(`/rest/v1/${TABLE}`, config.base);
    existing.searchParams.set('request_id', `eq.${record.request_id}`);
    existing.searchParams.set('select', SELECT);
    existing.searchParams.set('limit', '1');
    const response = await fetcher(existing, {method:'GET', headers:config.headers, redirect:'error', signal:AbortSignal.timeout(12000)});
    if (!response.ok) return providerFailure(response.status);
    return confirmed(await response.json(), record);
  } catch {
    // Provider errors can contain secrets or personal data; never return them.
    return failure(502, 'delivery_failed');
  }
}
