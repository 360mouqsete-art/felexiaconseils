import {isUnpublishedAccountingGuide, publishedSlugFor, unpublishedAccountingSlugs} from './unpublished-accounting-guides.mjs';
import {withdrawnGuideSlugs} from './withdrawn-guides.mjs';

// Visible wording only. The patterns are applied longest-first so a later,
// broader replacement cannot rebuild a withdrawn phrase.
const replacements = [
  [/Création de société, domiciliation, comptabilité, accompagnement juridique — une équipe d['’]experts à vos côtés, en moyenne en moins d['’]une heure de réponse pendant les jours ouvrés\./g, 'Création de société, domiciliation, conseil juridique, social et fiscal.'],
  [/Company formation, domiciliation, accounting and legal support—an expert team by your side\. Responses during business days\./g, 'Company formation, domiciliation, and legal, social and tax advice.'],
  [/تأسيس الشركات والتوطين والمحاسبة والمواكبة القانونية — فريق خبراء إلى جانبك\. الرد خلال أيام العمل\./g, 'تأسيس الشركات والتوطين والاستشارة القانونية والاجتماعية والجبائية.'],
  [/mêle juridique, comptabilité et technologie/g, 'mêle juridique, social, fiscal et technologie'],
  [/juridique, comptabilité, growth/g, 'juridique, social, fiscal, growth'],
  [/Coordination administrative, fiscale et comptable/g, 'Coordination administrative, juridique, sociale et fiscale'],
  [/Administrative, tax and accounting coordination/g, 'Administrative, legal, social and tax coordination'],
  [/التنسيق الإداري والضريبي والمحاسبي/g, 'التنسيق الإداري والقانوني والاجتماعي والجبائي'],
  [/Comptabilité & Fiscalité/g, 'Fiscalité'],
  [/Comptabilité et fiscalité/g, 'Fiscalité'],
  [/Accounting and tax/g, 'Tax'],
  [/المحاسبة والضرائب/g, 'الضرائب'],
  [/suivi comptable/gi, 'suivi juridique et fiscal'],
  [/Votre fiduciaire en ligne au Maroc/g, 'Votre cabinet de conseil au Maroc'],
  [/Your online accounting firm in Morocco/g, 'Your advisory firm in Morocco'],
  [/مكتبك للمحاسبة عبر الإنترنت في المغرب/g, 'مكتبك الاستشاري في المغرب'],
  [/pièces comptables/gi, 'pièces justificatives'],
  [/pièce comptable/gi, 'pièce justificative'],
  [/pièces destinées au comptable/gi, 'pièces justificatives des déclarations'],
  [/tenue d['’]une comptabilité/gi, 'suivi des obligations déclaratives'],
  [/tenue de la comptabilité/gi, 'suivi des obligations déclaratives'],
  [/tenue de comptabilité/gi, 'suivi des obligations déclaratives'],
  [/experts?-comptables?/gi, 'conseillers'],
  [/expert comptable/gi, 'conseiller'],
  [/expertise comptable/gi, 'conseil'],
  [/commissaires? aux comptes/gi, 'professionnels agréés pour le contrôle légal'],
  [/commissariat aux comptes/gi, 'contrôle légal des comptes'],
  [/votre comptable/gi, 'la personne chargée des déclarations'],
  [/un comptable/gi, 'un professionnel agréé'],
  [/le comptable/gi, 'le professionnel agréé'],
  [/du comptable/gi, 'du professionnel agréé'],
  [/au comptable/gi, 'à la personne chargée des déclarations'],
  [/des comptables/gi, 'des professionnels agréés'],
  [/résultat comptable/gi, 'résultat avant retraitements fiscaux'],
  [/écritures comptables/gi, 'enregistrements'],
  [/écriture comptable/gi, 'enregistrement'],
  [/plan comptable/gi, 'nomenclature des comptes'],
  [/année comptable/gi, 'exercice'],
  [/documents comptables/gi, 'documents de suivi'],
  [/document comptable/gi, 'document de suivi'],
  [/information comptable/gi, 'information de suivi'],
  [/règles comptables/gi, 'règles de présentation des comptes'],
  [/principes comptables/gi, 'principes de présentation des comptes'],
  [/bilan comptable/gi, 'état de synthèse'],
  [/hors bilan/gi, 'engagements hors état de synthèse'],
  [/AccountingService/g, 'ProfessionalService'],
  [/bookkeeping/gi, 'record follow-up'],
  [/accountants/gi, 'filing advisers'],
  [/accountant/gi, 'filing adviser'],
  [/accounting/gi, 'tax filings'],
  [/comptabilisation/gi, 'enregistrement'],
  [/comptabilisent/gi, 'enregistrent'],
  [/comptabiliser/gi, 'enregistrer'],
  [/comptabilisées/gi, 'enregistrées'],
  [/comptabilisés/gi, 'enregistrés'],
  [/comptabilisée/gi, 'enregistrée'],
  [/comptabilisé/gi, 'enregistré'],
  [/comptabilisees/gi, 'enregistrees'],
  [/comptabilises/gi, 'enregistres'],
  [/comptabilise/gi, 'enregistre'],
  [/comptabilité/gi, 'suivi des obligations déclaratives'],
  [/comptabilite/gi, 'suivi des obligations declaratives'],
  [/comptables/gi, 'déclaratifs'],
  [/comptable/gi, 'déclaratif'],
  [/المحاسبة/g, 'التصاريح'],
  [/محاسبة/g, 'تصاريح'],
  [/محاسبون/g, 'مستشارون'],
  [/محاسب/g, 'مستشار'],
  [/l['’]conseillers/g, 'un conseiller'],
  [/l['’]conseiller\b/g, 'le conseiller'],
  [/\bbilan annuel\b/gi, 'état de synthèse annuel'],
  [/\bbilan de clôture\b/gi, 'état de clôture'],
  [/\ble bilan\b/gi, 'l’état de synthèse'],
  [/\bau bilan\b/gi, 'dans l’état de synthèse'],
  [/\bdu bilan\b/gi, 'de l’état de synthèse'],
  [/\bun bilan\b/gi, 'un état de synthèse'],
  [/الميزانية العمومية/g, 'حالة الوضعية المالية']
];

export function scrubAccountingText(value) {
  let next = String(value ?? '');
  for (const [pattern, replacement] of replacements) next = next.replace(pattern, replacement);
  return next;
}

export function scrubAccountingHtml(html) {
  let next = String(html ?? '');
  const lang = next.match(/<html[^>]*\blang="(fr|en|ar)"/)?.[1] || 'fr';
  for (const slug of [...unpublishedAccountingSlugs, ...withdrawnGuideSlugs].sort((a, b) => b.length - a.length)) {
    next = next.replaceAll(`/guides/${slug}/`, `/guides/`);
  }
  const renamed = publishedSlugFor('resultat-comptable-resultat-fiscal-is-maroc');
  next = next.replaceAll('/guides/resultat-comptable-resultat-fiscal-is-maroc/', `/guides/${renamed}/`);
  next = next.replaceAll('/images/guides/resultat-comptable-resultat-fiscal-is-maroc.webp', `/images/guides/${renamed}.webp`);
  next = next.replaceAll('/images/guides/resultat-comptable-resultat-fiscal-is-maroc-640.webp', `/images/guides/${renamed}-640.webp`);
  for (const slug of [...unpublishedAccountingSlugs].sort((a, b) => b.length - a.length)) {
    next = next.replaceAll(`/images/guides/${slug}.webp`, '/mylegal/images/brand/felexia-office.webp');
    next = next.replaceAll(`/images/guides/${slug}-640.webp`, '/mylegal/images/brand/felexia-office.webp');
    next = next.replaceAll(`/documents/guides/${slug}.pdf`, `/${lang}/guides/`);
  }
  next = next.replace(/https?:\/\/[^\s"'<>]*?(?:comptab|expert-compt|accounting|accountant|bookkeep)[^\s"'<>]*/gi, `/${lang}/guides/`);
  next = next.replace(/\/(?:fr|en|ar)\/[^\s"'<>]*?(?:comptab|expert-compt|accounting|accountant|bookkeep)[^\s"'<>]*/gi, `/${lang}/guides/`);
  return scrubAccountingText(next);
}

export function mentionsWithdrawnAccounting(value) {
  return /comptab|expert-compt|accounting|accountant|bookkeep|محاسب/i.test(String(value ?? ''));
}

export {isUnpublishedAccountingGuide};
