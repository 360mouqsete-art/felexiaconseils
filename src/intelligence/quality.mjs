import {createHash} from 'node:crypto';
import {languages} from './config.mjs';
export const contentFingerprint = topic => createHash('sha256').update(JSON.stringify({translations:topic.translations,claims:topic.claims,sourceIds:topic.sourceIds,image:topic.image})).digest('hex');
export function normalizeIntent(text) {
  return String(text || '').normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
}
export function duplicateTopic(topic, topics = [], historical = []) {
  const own = normalizeIntent(topic.intent || topic.title || topic.translations?.fr?.title);
  const tokens = new Set(own.split(' ').filter(w=>w.length>3 && !['maroc','morocco','guide','entreprise','pour','dans','comment'].includes(w)));
  const candidates = [...topics.filter(t=>t.id!==topic.id), ...historical];
  return candidates.find(other=> {
    if (topic.id === other.id || topic.originalSlug && topic.kind !== 'new' && topic.originalSlug === other.slug) return false;
    if (topic.intentKey && topic.intentKey === other.intentKey) return true;
    const value = normalizeIntent(other.intent || other.title || other.translations?.fr?.title);
    if (own && own === value) return true;
    const theirs = new Set(value.split(' ').filter(w=>w.length>3 && !['maroc','morocco','guide','entreprise','pour','dans','comment'].includes(w)));
    const overlap = [...tokens].filter(t=>theirs.has(t)).length;
    return tokens.size >= 4 && theirs.size >= 4 && overlap/Math.max(tokens.size,theirs.size) >= .86;
  });
}
const dateValid = value => typeof value==='string' && Number.isFinite(Date.parse(value));
const printable = text => typeof text === 'string' && text.trim().length > 0 && text.length <= 20000;
const words = text => text.trim().split(/\s+/u).filter(Boolean).length;
const bodyText = version => (version?.body || []).map(s=>[s.heading,...s.paragraphs || [],...s.bullets || []].join(' ')).join(' ');
const normalizeNumbers = text => String(text).replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/[۰-۹]/g,c=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/٪/g,'%').replace(/٫/g,'.');
function sensitiveValues(text) {
  return [...normalizeNumbers(text).matchAll(/\d+(?:[.,]\d+)?\s*(?:%|MAD\b|DH\b|dirhams?\b|درهم)|\b\d{4}-\d{2}-\d{2}\b/giu)].map(m=>m[0].replace(/\s+/g,'').toLowerCase()).sort();
}
export function qualityGate(topic, {state = {topics:[],sources:[]},config,now = new Date(),knownPaths = new Set(),historical = []} = {}) {
  const checks = [];
  const check = (id, ok, reason) => checks.push({id,ok:Boolean(ok),reason:ok ? null : reason});
  check('topic_identity', /^[a-zA-Z0-9][a-zA-Z0-9_-]{2,120}$/.test(topic.id || '') && printable(topic.intent || topic.title) && ['new','backfill','refresh'].includes(topic.kind),'Identifiant, type ou intention manquant.');
  check('risk', ['low','moderate','high'].includes(topic.risk),'Le risque doit être explicitement classé.');
  check('historical_origin',topic.kind!=='backfill'||printable(topic.originalContent)&&topic.originalSlug===topic.translations?.fr?.slug&&knownPaths.has(`/fr/guides/${topic.originalSlug}/`),'Le rattrapage exige un original conservé et son URL française historique réelle.');
  check('deduplication', !duplicateTopic(topic,state.topics,historical),'Un guide couvre déjà cette intention; préparer une mise à jour.');
  const sources = (topic.sourceIds || []).map(id=>state.sources.find(s=>s.id===id));
  check('sources', sources.length > 0 && sources.every(s=>s && ['retrieved','verified'].includes(s.status) && /^https:\/\//.test(s.url) && s.fingerprint),'Sources documentaires récupérées et empreintes requises.');
  check('source_freshness',sources.length && sources.every(s=>dateValid(s?.retrievedAt) && Date.parse(s.retrievedAt)<=now.getTime() && now.getTime()-Date.parse(s.retrievedAt)<=config.maxSourceAgeDays*86400000 && !s.changed),'Une source manque, a changé ou doit être revérifiée.');
  check('verification_date', dateValid(topic.verifiedAt) && Date.parse(topic.verifiedAt)<=now.getTime() && now.getTime()-Date.parse(topic.verifiedAt)<=config.maxSourceAgeDays*86400000,'Date réelle de contrôle récente requise.');
  const claims = topic.claims || [];
  check('claim_evidence',claims.every(claim=> {
    const source = sources.find(s=>s?.id===claim.sourceId);
    return claim.id && claim.status === 'verified' && claim.jurisdiction === 'MA' && dateValid(claim.verifiedAt) && Date.parse(claim.verifiedAt)<=now.getTime() && source && claim.sourceFingerprint===source.fingerprint && printable(claim.quotation) && String(source.text || source.excerpt).includes(claim.quotation) && !claim.conflict && (topic.risk==='low' || dateValid(claim.applicableFrom) && claim.legalStatus==='adopted' && source.trust==='primary-host');
  }),'Une affirmation est non confirmée, contredite ou ne possède pas de preuve primaire applicable.');
  check('sensitive_scope', topic.risk==='low' || claims.length>0,'Les procédures et règles sensibles exigent une matrice d’affirmations vérifiées.');
  check('legal_review',!(config.requireLegalReview && topic.risk==='high') || topic.approval?.status==='approved' && topic.approval?.reviewer && topic.approval?.fingerprint===contentFingerprint(topic),'Validation humaine réglementaire requise par la configuration.');
  const image = topic.image || {};
  const validAsset = value => typeof value==='string' && (/^\/(?:images|assets)\/[a-zA-Z0-9/_-]+\.(?:webp|avif|png|jpe?g)$/.test(value) || /^\/api\/intelligence-media\?asset=[a-zA-Z0-9_-]+(?:-640)?\.webp$/.test(value));
  check('image',validAsset(image.src) && validAsset(image.smallSrc) && image.width>=640 && image.height>=360 && ['generated','owned','licensed'].includes(image.rights) && image.verified===true,'Illustration permanente, accessible, dimensionnée et droits confirmés requis.');
  const slugs = new Set();
  const allNumbers = [];
  for (const lang of languages) {
    const version = topic.translations?.[lang];
    const prefix = `language_${lang}`;
    check(prefix,version && printable(version.title) && printable(version.excerpt) && Array.isArray(version.body) && version.body.length>=3 && version.body.every(s=>printable(s.heading) && Array.isArray(s.paragraphs) && s.paragraphs.length && s.paragraphs.every(printable) && (!s.bullets || s.bullets.every(printable))) && words(bodyText(version))>=config.minWords,'Article complet et structuré requis.');
    if (!version) continue;
    check(`${prefix}_seo`,printable(version.metaTitle) && version.metaTitle.length<=100 && printable(version.metaDescription) && version.metaDescription.length>=70 && version.metaDescription.length<=240 && printable(version.alt) && printable(version.primaryKeyword),'Métadonnées SEO localisées, mot-clé et ALT requis.');
    check(`${prefix}_slug`, typeof version.slug==='string' && /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(version.slug) && version.slug.length<=140 && !state.topics.some(t=>t.id!==topic.id && t.translations?.[lang]?.slug===version.slug) && (!knownPaths.has(`/${lang}/guides/${version.slug}/`) || topic.kind!=='new'),'Slug unique et valide requis.');
    slugs.add(`${lang}:${version.slug}`);
    check(`${prefix}_links`,Array.isArray(version.internalLinks) && version.internalLinks.length>0 && version.internalLinks.every(l=>printable(l.label) && typeof l.path==='string' && l.path.startsWith(`/${lang}/`) && knownPaths.has(l.path)),'Liens internes vers des pages existantes dans la langue requise.');
    check(`${prefix}_claims`,claims.every(c=>(version.claimIds || []).includes(c.id) && version.factualValues?.[c.id]===String(c.factValue || '')) && (version.claimIds || []).every(id=>claims.some(c=>c.id===id)),'Matrice factuelle et versions linguistiques désynchronisées.');
    check(`${prefix}_faq`,Array.isArray(version.faq) && version.faq.length>=2 && version.faq.every(f=>printable(f.question)&&printable(f.answer)),'FAQ localisée incomplète.');
    const numbers = sensitiveValues([bodyText(version),...(version.faq || []).map(f=>f.answer)].join(' '));
    allNumbers.push(numbers.join('|'));
    check(`${prefix}_unmapped_figures`,!numbers.length || claims.length>0 && numbers.every(n=>claims.some(c=>normalizeNumbers(c.factValue || '').replace(/\s+/g,'').toLowerCase()===n)),'Chiffre fiscal ou date non rattaché à une affirmation vérifiée.');
    if(lang==='ar') {
      const arabic=(bodyText(version).match(/[\u0620-\u064a\u066e-\u06d3\u06fa-\u06fc]/g)||[]).length;
      const latin=(bodyText(version).match(/[a-zA-Z]/g)||[]).length;
      check('arabic_script',arabic>=40&&arabic>latin,'Un article principalement rédigé en arabe est requis.');
    }
  }
  check('numeric_consistency',allNumbers.length===3 && new Set(allNumbers).size===1,'Les chiffres et dates diffèrent entre les langues.');
  check('authorization',topic.authorized===true,'Publication non autorisée pour ce sujet.');
  return {ok:checks.every(c=>c.ok),checkedAt:now.toISOString(),fingerprint:contentFingerprint(topic),checks};
}
export function topicScore(scores = {}) {
  const weights = {commercial:25,seo:20,reliability:20,freshness:10,practical:15,originality:10};
  return {value:Object.entries(weights).reduce((sum,[key,max])=>sum+Math.min(max,Math.max(0,Number(scores[key])||0)),0),seoEvidence:scores.seoEvidence || 'qualitative-estimate',searchVolume:null};
}
