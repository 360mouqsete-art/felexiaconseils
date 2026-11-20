// Guides whose subject is bookkeeping, the chartered-accountant profession
// or statutory audit. They are not published. Tax, payroll and company-law
// guides stay, with the forbidden wording rewritten.
export const unpublishedAccountingSlugs = [
  '7-principes-comptables-au-maroc',
  'amortissements-comptables-maroc',
  'audit-contractuel',
  'audit-de-fraude-au-maroc',
  'audit-des-comptes-au-maroc',
  'audit-financier',
  'auditeur-junior-maroc',
  'cabinet-comptable-casablanca',
  'cgnc-code-general-de-normalisation-comptable',
  'choisir-expert-comptable-maroc',
  'cloture-comptable-annuelle-maroc',
  'commissaire-aux-comptes-a-casablanca',
  'commissaire-aux-comptes-au-maroc',
  'commissariat-aux-comptes-au-maroc',
  'comptabilite-analytique-mise-en-place',
  'comptabilite-au-maroc',
  'comptabilite-au-maroc-1-guide',
  'comptabilite-immobilisations-maroc',
  'comptabilite-quest-ce-que-cest',
  'comptable-junior-maroc',
  'consolidation-comptes-maroc',
  'continuite-dexploitation',
  'devenir-expert-comptable-maroc',
  'dotations-dexploitation',
  'ecritures-regularisation-fin-exercice-maroc',
  'erreurs-comptables-reserves-cac',
  'etats-synthese-maroc',
  'expert-comptable-au-maroc',
  'expert-comptable-casablanca',
  'expert-comptable-devenir',
  'fiduciaire-maroc',
  'grand-livre',
  'ifrs-vs-cgnc-maroc',
  'information-comptable-au-maroc',
  'juriste-affaires-maroc',
  'linventaire-physique-des-immobilisations',
  'livre-journal-maroc',
  'logiciel-de-comptabilite-que-choisir',
  'manuel-de-procedures-comptables',
  'plan-comptable-maroc-pdf',
  'plan-comptable-marocain-pcge',
  'rapport-cac-reserves-consequences',
  'rapprochement-bancaire-au-maroc-erb',
  'reporting-financier-au-maroc',
  'reevaluation-libre',
  'regles-comptables-en-vigueur-au-maroc',
  'rejet-de-la-comptabilite',
  'separation-des-exercices',
  'tenue-de-comptabilite'
];

const unpublished = new Set(unpublishedAccountingSlugs);

// The tax bridge from the pre-tax result stays public under a slug that does
// not name the withdrawn activity. The old address redirects to this one.
export const accountingSlugRenames = {
  'resultat-comptable-resultat-fiscal-is-maroc':'passage-resultat-fiscal-is-maroc'
};

export function isUnpublishedAccountingGuide(slug) {
  return unpublished.has(slug);
}

export function publishedSlugFor(slug) {
  return accountingSlugRenames[slug] || slug;
}
