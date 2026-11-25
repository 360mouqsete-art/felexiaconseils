// Visible status of the firm. The wording is fixed so the site is not presented as a public authority.
export const privateNotice = {
  fr: "FELEXIA CONSEILS SARL AU est un cabinet privé de conseil juridique, social et fiscal, basé à Marrakech. Nous ne sommes pas une administration, ni un organisme public, ni un prestataire agréé par l'État. Nous n'émettons pas de documents officiels et nous ne vendons pas de services publics. Notre rôle est d'accompagner nos clients, à titre privé, dans leurs projets d'entreprise.",
  en: 'FELEXIA CONSEILS SARL AU is a private legal, social and tax advisory firm based in Marrakech. We are not a government body, a public authority, or a state-authorized provider. We do not issue official documents and we do not sell government services. We only provide private advice and accompaniment for your business project.',
  ar: 'شركة FELEXIA CONSEILS SARL AU مكتب خاص للاستشارة القانونية والاجتماعية والجبائية، مقره مراكش. لسنا إدارة ولا هيئة عمومية ولا مقدم خدمات معتمداً من الدولة. لا نصدر وثائق رسمية ولا نبيع خدمات عمومية. دورنا هو مواكبة زبنائنا، بصفة خاصة، في مشاريعهم المقاولاتية.'
};

export const privateAdvice = {
  fr: "Nous vous conseillons sur l'organisation juridique, sociale et fiscale de votre projet, et nous vous accompagnons dans la préparation de votre dossier, sans nous substituer à l'administration.",
  en: 'We advise you on the legal, social and tax organisation of your project, and we help you prepare your file, without taking the place of the administration.',
  ar: 'ننصحكم في التنظيم القانوني والاجتماعي والجبائي لمشروعكم، ونواكبكم في إعداد ملفكم، دون أن نحل محل الإدارة.'
};

export const privateNoticeSlugs = new Set(['', 'creation-entreprise', 'domiciliation', 'guides/creer-une-sarl-maroc', 'guides/mre-etranger']);

export const officialDeliverables = new Set([
  'Certificat négatif',
  'Registre de commerce',
  'ICE',
  'CNSS',
  'Identifiant fiscal',
  'Taxe professionnelle',
  'Affiliation de la société à la CNSS',
  "Publication dans un journal d'annonce légal",
  'Publication au Bulletin Officiel',
  'Enregistrement des contrats'
]);
