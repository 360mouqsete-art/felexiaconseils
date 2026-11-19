// Pure rules for the client file. No network, no environment values.
import {createHmac, timingSafeEqual} from 'node:crypto';

export const DOSSIER_TYPES = ['creation', 'domiciliation', 'modification'];
export const STEP_STATUSES = ['pending', 'current', 'done'];
export const REQUEST_STATUSES = ['to_provide', 'received', 'validated', 'correction'];
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const ALLOWED_MIME = {
  'application/pdf': 'pdf',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
const SESSION_MS = 14 * 24 * 60 * 60 * 1000;

export const STEP_TEMPLATES = {
  creation: [
    ['received', {fr:'Dossier reçu', en:'File received', ar:'تم استلام الملف'}],
    ['negative-certificate', {fr:'Certificat négatif', en:'Negative certificate', ar:'الشهادة السلبية'}],
    ['articles', {fr:'Statuts', en:'Articles of association', ar:'النظام الأساسي'}],
    ['filing', {fr:'Dépôt et enregistrement', en:'Filing and registration', ar:'الإيداع والتسجيل'}],
    ['trade-register', {fr:'Registre de commerce', en:'Trade register', ar:'السجل التجاري'}],
    ['identifiers', {fr:'ICE, IF et CNSS', en:'ICE, IF and CNSS', ar:'ICE وIF والصندوق الوطني'}],
    ['handed-over', {fr:'Dossier remis', en:'File handed over', ar:'تسليم الملف'}]
  ],
  domiciliation: [
    ['received', {fr:'Demande reçue', en:'Request received', ar:'تم استلام الطلب'}],
    ['contract', {fr:'Contrat de domiciliation', en:'Domiciliation contract', ar:'عقد التوطين'}],
    ['address', {fr:'Adresse confirmée', en:'Address confirmed', ar:'تأكيد العنوان'}],
    ['mail', {fr:'Courrier', en:'Mail', ar:'البريد'}],
    ['handed-over', {fr:'Dossier remis', en:'File handed over', ar:'تسليم الملف'}]
  ],
  modification: [
    ['received', {fr:'Demande reçue', en:'Request received', ar:'تم استلام الطلب'}],
    ['decision', {fr:'Décision', en:'Decision', ar:'القرار'}],
    ['formalities', {fr:'Formalités', en:'Formalities', ar:'الإجراءات'}],
    ['register', {fr:'Mise à jour du registre', en:'Register update', ar:'تحيين السجل'}],
    ['handed-over', {fr:'Dossier remis', en:'File handed over', ar:'تسليم الملف'}]
  ]
};

export function stepsFor(type) {
  return (STEP_TEMPLATES[type] || []).map(([key, label], position) => ({
    key,
    position,
    label,
    status: position === 0 ? 'current' : 'pending',
    completedOn: null
  }));
}

export function isEmail(value) {
  return typeof value === 'string' && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

export function cleanReference(value) {
  const text = String(value || '').trim().toUpperCase();
  if (!text) return '';
  return /^[A-Z0-9][A-Z0-9-]{2,31}$/.test(text) ? text : null;
}

export function sameIdentity(left, right) {
  return String(left || '').trim().toLowerCase() === String(right || '').trim().toLowerCase();
}

export function canReadDossier(session, dossier) {
  if (!session?.uid || !dossier) return false;
  if (session.staff) return true;
  if (dossier.clientUserId && dossier.clientUserId === session.uid) return true;
  return sameIdentity(dossier.clientEmail, session.email);
}

export function visibleDossiers(session, dossiers) {
  return (dossiers || []).filter(dossier => canReadDossier(session, dossier));
}

export function validateUpload({mime, size}) {
  if (!ALLOWED_MIME[mime]) return 'type';
  if (!Number.isInteger(size) || size < 1 || size > MAX_UPLOAD_BYTES) return 'size';
  return '';
}

export function safeFileName(name) {
  const base = String(name || 'document').split(/[/\\]/).pop().replace(/[^\w.\- ]+/g, '').trim().slice(0, 120);
  return base || 'document';
}

function sign(body, secret) {
  return createHmac('sha256', secret).update(body).digest('base64url');
}

export function issueSession(session, secret, now = Date.now()) {
  if (!secret || !session?.uid || !isEmail(session.email)) throw new Error('session');
  const body = Buffer.from(JSON.stringify({uid:session.uid, email:session.email.trim().toLowerCase(), exp:now + SESSION_MS})).toString('base64url');
  return `${body}.${sign(body, secret)}`;
}

export function readSession(token, secret, now = Date.now()) {
  if (!secret || typeof token !== 'string' || !token.includes('.')) return null;
  const [body, signature] = token.split('.');
  const expected = sign(body, secret);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const value = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!value?.uid || !isEmail(value.email) || typeof value.exp !== 'number' || value.exp < now) return null;
    return {uid:value.uid, email:value.email};
  } catch {
    return null;
  }
}

export function cookieHeader(token, secure) {
  return `felexia_dossier=${token}; HttpOnly; Path=/; Max-Age=${SESSION_MS / 1000}; SameSite=Lax${secure ? '; Secure' : ''}`;
}

export const demoDossier = {
  id:'example',
  reference:'EXEMPLE',
  type:'creation',
  state:'open',
  example:true,
  steps:stepsFor('creation').map((step, index) => ({
    ...step,
    status:index < 2 ? 'done' : index === 2 ? 'current' : 'pending',
    completedOn:index < 2 ? '2026-11-19' : null
  })),
  requests:[
    {id:'example-id', label:{fr:'Pièce d’identité', en:'Identity document', ar:'وثيقة الهوية'}, status:'to_provide'},
    {id:'example-proof', label:{fr:'Justificatif de siège', en:'Proof of registered office', ar:'إثبات المقر'}, status:'received'}
  ],
  deliveries:[
    {id:'example-negative', label:{fr:'Certificat négatif', en:'Negative certificate', ar:'الشهادة السلبية'}}
  ],
  notes:[
    {id:'example-note', at:'2026-11-19', text:{fr:'Ceci est un exemple d’affichage. Ce n’est pas un dossier réel.', en:'This is a display example. It is not a real file.', ar:'هذا مثال للعرض. وليس ملفاً حقيقياً.'}}
  ]
};
