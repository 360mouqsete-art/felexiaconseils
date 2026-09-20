// Editorial stock imagery: never presented as Felexia's people or premises.
// Sources and licences are recorded in docs/CORPORATE-PHOTOS.md.
const photos = {
  meeting: ['Réunion de travail autour d’un projet d’entreprise', 'Business meeting to discuss a company project', 'اجتماع عمل لمناقشة مشروع مقاولة'],
  strategy: ['Échange professionnel sur une stratégie de développement', 'Professional discussion about a development strategy', 'نقاش مهني حول استراتيجية التطوير'],
  finance: ['Analyse de documents et de données financières', 'Review of financial documents and data', 'تحليل الوثائق والبيانات المالية'],
  documents: ['Préparation et examen de documents professionnels', 'Preparation and review of business documents', 'إعداد ومراجعة الوثائق المهنية'],
  partnership: ['Échange entre partenaires professionnels', 'Discussion between business partners', 'تبادل بين شركاء مهنيين'],
  architecture: ['Architecture contemporaine de bureaux', 'Contemporary office architecture', 'هندسة معمارية معاصرة للمكاتب'],
  collaboration: ['Travail collaboratif dans un environnement professionnel', 'Collaboration in a professional setting', 'عمل تعاوني في بيئة مهنية'],
  consultation: ['Entretien de conseil autour d’un dossier', 'Advisory discussion about a business file', 'لقاء استشاري لدراسة ملف'],
};

export const servicePhoto = {
  'creation-entreprise': 'meeting',
  'conseil-fiscal': 'finance',
  'conseil-gestion': 'strategy',
  'formalites-administratives': 'documents',
  'investir-au-maroc': 'architecture',
  'legal-advisory': 'partnership',
};

const pagePhotos = {
  ...servicePhoto, services: 'collaboration', about: 'strategy', offres: 'partnership',
  contact: 'consultation', 'rendez-vous': 'consultation',
  'modify-company': 'documents', support: 'collaboration',
};

const photoHeights = { meeting: 733, strategy: 619, finance: 733, documents: 734, partnership: 1650, architecture: 1467, collaboration: 734, consultation: 1650 };

export const photoForPage = slug => pagePhotos[slug];
export function corporatePhoto(key, lang, { priority = false, sizes = '(max-width: 600px) 92vw, (max-width: 900px) 45vw, 360px', className = '' } = {}) {
  const alt = photos[key]?.[{ fr: 0, en: 1, ar: 2 }[lang]];
  if (!alt) throw new Error(`Unknown corporate photo: ${key}`);
  return `<img class="corporate-photo photo-${key} ${className}" src="/assets/corporate/${key}.jpg" srcset="/assets/corporate/${key}-small.jpg 480w, /assets/corporate/${key}.jpg 1100w" sizes="${sizes}" alt="${alt}" width="1100" height="${photoHeights[key]}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
