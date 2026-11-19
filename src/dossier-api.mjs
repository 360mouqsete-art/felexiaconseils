import {randomBytes} from 'node:crypto';
import {canonicalOrigin} from './site-origin.mjs';
import {
  DOSSIER_TYPES, REQUEST_STATUSES, STEP_STATUSES, canReadDossier, cleanReference, cookieHeader,
  isEmail, issueSession, readSession, safeFileName, stepsFor, validateUpload
} from './dossier-model.mjs';
import {
  dossierConfiguration, dossierRow, documentRow, insertDocument, insertDossier, insertNote,
  isStaff, linkClient, loadDossiers, notifyClient, sendMagicLink, signedDownload, signedUpload,
  updateDocument, updateStep, userFromAccessToken
} from './dossier-store.mjs';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function origins(env, req) {
  const local = `http://${req.headers.host}`;
  let configured = null;
  let pub = null;
  try {
    configured = env.SITE_URL ? new URL(env.SITE_URL).origin : null;
    pub = configured ? canonicalOrigin(configured) : null;
  } catch { return {error:'configuration'}; }
  const allowed = configured ? [configured, pub, ...(env.NODE_ENV !== 'production' ? [local] : [])] : [local];
  if (env.VERCEL === '1') for (const host of [env.VERCEL_URL, env.VERCEL_PROJECT_PRODUCTION_URL, env.VERCEL_BRANCH_URL]) {
    if (host && /^[a-z0-9.-]+\.vercel\.app$/i.test(host)) allowed.push('https://' + host);
  }
  return {allowed};
}

function sessionFrom(req, secret) {
  const cookie = String(req.headers.cookie || '');
  const token = cookie.split(';').map(part => part.trim()).find(part => part.startsWith('felexia_dossier='))?.slice('felexia_dossier='.length);
  return token ? readSession(decodeURIComponent(token), secret) : null;
}

function today() {
  return new Intl.DateTimeFormat('en-CA', {timeZone:'Africa/Casablanca', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
}

export function createDossierHandler({env = process.env, fetcher = fetch} = {}) {
  const rates = new Map();
  const json = (res, status, value, extra = {}) => {
    res.writeHead(status, {'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', ...extra});
    res.end(JSON.stringify(value));
  };
  return async function dossier(req, res) {
    if (!['GET','POST'].includes(req.method)) { res.setHeader('Allow','GET, POST'); return json(res, 405, {ok:false, code:'method'}); }
    const gate = origins(env, req);
    if (gate.error) return json(res, 503, {ok:false, code:'configuration'});
    if (req.headers.origin && !gate.allowed.includes(req.headers.origin)) return json(res, 403, {ok:false, code:'origin'});
    const config = dossierConfiguration(env);
    if (req.method === 'GET') {
      if (config.error) return json(res, 200, {ok:true, configured:false, session:null, dossiers:[]});
      const session = sessionFrom(req, config.key);
      if (!session) return json(res, 200, {ok:true, configured:true, session:null, dossiers:[]});
      const staff = await isStaff(config, fetcher, session.uid);
      if (staff.error) return json(res, 503, {ok:false, code:staff.error === 'unavailable' ? 'unavailable' : 'failed'});
      session.staff = staff.staff;
      await linkClient(config, fetcher, session);
      const loaded = await loadDossiers(config, fetcher, session);
      if (loaded.error) return json(res, 503, {ok:false, code:loaded.error === 'unavailable' ? 'unavailable' : 'failed'});
      return json(res, 200, {ok:true, configured:true, session:{email:session.email}, staff:Boolean(staff.staff), dossiers:loaded.dossiers});
    }
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) return json(res, 415, {ok:false, code:'content_type'});
    const chunks = [];
    let size = 0;
    try {
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 16384) return json(res, 413, {ok:false, code:'too_large'});
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
    } catch { return json(res, 400, {ok:false, code:'body'}); }
    let body;
    try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return json(res, 400, {ok:false, code:'json'}); }
    if (!body || typeof body !== 'object') return json(res, 400, {ok:false, code:'json'});
    if (config.error) return json(res, 503, {ok:false, code:config.error});

    if (body.action === 'request-link') {
      if (!isEmail(body.email)) return json(res, 400, {ok:false, code:'email'});
      const ip = String(req.socket?.remoteAddress || 'local');
      const now = Date.now();
      const rate = rates.get(ip) || {start:now, count:0};
      if (now - rate.start > 600000) { rate.start = now; rate.count = 0; }
      rate.count += 1;
      rates.set(ip, rate);
      if (rate.count > 5) return json(res, 429, {ok:false, code:'rate_limited'});
      const lang = ['fr','en','ar'].includes(body.lang) ? body.lang : 'fr';
      const redirect = new URL(`/${lang}/espace-client/`, gate.allowed.find(origin => origin.startsWith('https:')) || gate.allowed[0]);
      const sent = await sendMagicLink(config, fetcher, body.email.trim().toLowerCase(), redirect.href);
      if (sent.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true});
    }

    if (body.action === 'establish') {
      const identified = await userFromAccessToken(config, fetcher, body.accessToken);
      if (identified.error) return json(res, 401, {ok:false, code:'session'});
      const token = issueSession(identified.user, config.key);
      const secure = String(req.headers.origin || '').startsWith('https:') || env.NODE_ENV === 'production';
      return json(res, 200, {ok:true}, {'Set-Cookie':cookieHeader(token, secure)});
    }

    if (body.action === 'sign-out') return json(res, 200, {ok:true}, {'Set-Cookie':'felexia_dossier=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'});

    const session = sessionFrom(req, config.key);
    if (!session) return json(res, 401, {ok:false, code:'session'});
    const staff = await isStaff(config, fetcher, session.uid);
    if (staff.error) return json(res, 503, {ok:false, code:'failed'});
    session.staff = staff.staff;

    async function owned(id) {
      if (!UUID.test(String(id || ''))) return null;
      const found = await dossierRow(config, fetcher, id);
      if (found.error || !found.row) return null;
      const dossier = {id:found.row.id, clientEmail:found.row.client_email, clientUserId:found.row.client_user_id, reference:found.row.reference};
      return canReadDossier(session, dossier) ? dossier : null;
    }

    if (body.action === 'download') {
      const dossier = await owned(body.dossierId);
      const file = UUID.test(String(body.documentId || '')) ? await documentRow(config, fetcher, body.documentId) : {row:null};
      if (!dossier || file.error || !file.row || file.row.dossier_id !== dossier.id || !file.row.storage_path) return json(res, 404, {ok:false, code:'not_found'});
      if (!session.staff && file.row.kind === 'request' && !['received','validated'].includes(file.row.status)) return json(res, 404, {ok:false, code:'not_found'});
      const signed = await signedDownload(config, fetcher, file.row.storage_path);
      if (signed.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true, url:signed.downloadUrl});
    }

    if (body.action === 'upload-slot' || body.action === 'confirm-upload') {
      const dossier = await owned(body.dossierId);
      if (!dossier) return json(res, 404, {ok:false, code:'not_found'});
      const file = UUID.test(String(body.documentId || '')) ? await documentRow(config, fetcher, body.documentId) : {row:null};
      if (file.error || !file.row || file.row.dossier_id !== dossier.id) return json(res, 404, {ok:false, code:'not_found'});
      if (file.row.kind === 'delivery' && !session.staff) return json(res, 403, {ok:false, code:'staff'});
      if (file.row.kind === 'request' && !session.staff && !['to_provide','correction'].includes(file.row.status)) return json(res, 409, {ok:false, code:'status'});
      if (file.row.kind !== 'request' && file.row.kind !== 'delivery') return json(res, 404, {ok:false, code:'not_found'});
      if (body.action === 'upload-slot' && file.row.kind !== 'request') return json(res, 404, {ok:false, code:'not_found'});
      if (body.action === 'upload-slot') {
        const problem = validateUpload({mime:body.mime, size:body.size});
        if (problem) return json(res, 400, {ok:false, code:problem});
        const objectPath = `${dossier.id}/${file.row.id}`;
        const signed = await signedUpload(config, fetcher, objectPath);
        if (signed.error) return json(res, 502, {ok:false, code:'failed'});
        return json(res, 200, {ok:true, uploadUrl:signed.uploadUrl, path:objectPath, filename:safeFileName(body.filename)});
      }
      const objectPath = `${dossier.id}/${file.row.id}`;
      if (body.path !== objectPath) return json(res, 400, {ok:false, code:'path'});
      const nextStatus = file.row.kind === 'delivery' ? 'validated' : 'received';
      const saved = await updateDocument(config, fetcher, file.row.id, {status:nextStatus, storage_path:body.path, filename:safeFileName(body.filename), mime:ALLOWED(body.mime), size_bytes:Number(body.size) || null});
      if (saved.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true});
    }

    if (!session.staff) return json(res, 403, {ok:false, code:'staff'});

    if (body.action === 'create') {
      if (!isEmail(body.email) || !DOSSIER_TYPES.includes(body.type)) return json(res, 400, {ok:false, code:'input'});
      const reference = cleanReference(body.reference) || `FX-${randomBytes(4).toString('hex').toUpperCase()}`;
      if (body.reference && !cleanReference(body.reference)) return json(res, 400, {ok:false, code:'reference'});
      const created = await insertDossier(config, fetcher, {reference, email:body.email.trim().toLowerCase(), type:body.type, steps:stepsFor(body.type)});
      if (created.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true, id:created.id, reference:created.reference});
    }

    const dossier = await owned(body.dossierId);
    if (!dossier && body.action !== 'create') return json(res, 404, {ok:false, code:'not_found'});

    if (body.action === 'step') {
      if (!UUID.test(String(body.stepId || '')) || !STEP_STATUSES.includes(body.status)) return json(res, 400, {ok:false, code:'input'});
      const completedOn = body.status === 'done' ? today() : null;
      const saved = await updateStep(config, fetcher, {dossierId:dossier.id, stepId:body.stepId, status:body.status, completedOn});
      if (saved.error) return json(res, 502, {ok:false, code:'failed'});
      const notice = await notifyClient(env, fetcher, {email:dossier.clientEmail, reference:dossier.reference, lang:['fr','en','ar'].includes(body.lang) ? body.lang : 'fr'});
      return json(res, 200, {ok:true, notified:notice.notified});
    }

    if (body.action === 'request') {
      const label = String(body.label || '').trim();
      if (label.length < 2 || label.length > 160) return json(res, 400, {ok:false, code:'input'});
      const created = await insertDocument(config, fetcher, {dossier_id:dossier.id, kind:'request', label, status:'to_provide'});
      if (created.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true, id:created.id});
    }

    if (body.action === 'review') {
      if (!UUID.test(String(body.documentId || '')) || !REQUEST_STATUSES.includes(body.status)) return json(res, 400, {ok:false, code:'input'});
      const file = await documentRow(config, fetcher, body.documentId);
      if (file.error || !file.row || file.row.dossier_id !== dossier.id) return json(res, 404, {ok:false, code:'not_found'});
      const saved = await updateDocument(config, fetcher, body.documentId, {status:body.status});
      if (saved.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true});
    }

    if (body.action === 'note') {
      const text = String(body.text || '').trim();
      if (text.length < 2 || text.length > 2000) return json(res, 400, {ok:false, code:'input'});
      const saved = await insertNote(config, fetcher, {dossierId:dossier.id, body:text});
      if (saved.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true});
    }

    if (body.action === 'delivery-slot') {
      const label = String(body.label || '').trim();
      const problem = validateUpload({mime:body.mime, size:body.size});
      if (label.length < 2 || label.length > 160 || problem) return json(res, 400, {ok:false, code:problem || 'input'});
      const created = await insertDocument(config, fetcher, {dossier_id:dossier.id, kind:'delivery', label, status:'validated', filename:safeFileName(body.filename)});
      if (created.error) return json(res, 502, {ok:false, code:'failed'});
      const objectPath = `${dossier.id}/${created.id}`;
      const signed = await signedUpload(config, fetcher, objectPath);
      if (signed.error) return json(res, 502, {ok:false, code:'failed'});
      return json(res, 200, {ok:true, uploadUrl:signed.uploadUrl, path:objectPath, documentId:created.id});
    }

    return json(res, 400, {ok:false, code:'action'});
  };
}

function ALLOWED(mime) {
  return ['application/pdf','image/jpeg','image/png'].includes(mime) ? mime : '';
}
