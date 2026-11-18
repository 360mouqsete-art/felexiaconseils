// Shared catalogue themes. Presentation only: it does not change what the
// editorial engine is allowed to publish.
export const guidePageSize = 24;

export const guideThemes = [
  {id:'creation', fr:'Création', en:'Formation', ar:'التأسيس'},
  {id:'domiciliation', fr:'Domiciliation', en:'Domiciliation', ar:'التوطين'},
  {id:'mre', fr:'Depuis l’étranger', en:'From abroad', ar:'من الخارج'},
  {id:'modification', fr:'Modification', en:'Company changes', ar:'التعديل'},
  {id:'fiscalite', fr:'Fiscalité', en:'Tax', ar:'الضرائب'}
];

export function themeOfCategory(category = '') {
  const value = String(category).toLowerCase();
  if (value.includes('domicil') || value.includes('توطين') || value.includes('siège') || value.includes('siege')) return 'domiciliation';
  if (value.includes('invest') || value.includes('mre') || value.includes('étranger') || value.includes('etranger') || value.includes('خارج')) return 'mre';
  if (value.includes('modif') || value.includes('juridique') || value.includes('تعديل')) return 'modification';
  if (value.includes('fiscal') || value.includes('compta') || value.includes('tva') || value.includes('impôt') || value.includes('impot') || value.includes('ضريب')) return 'fiscalite';
  if (value.includes('créa') || value.includes('crea') || value.includes('تأسيس')) return 'creation';
  return 'autres';
}

export function themeLabel(id, lang) {
  return guideThemes.find(theme => theme.id === id)?.[lang] || id;
}
