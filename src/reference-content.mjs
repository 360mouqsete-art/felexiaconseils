// Keep the source layout, but never transfer another brand's prices, guarantees,
// reviews or software capabilities to Felexia without evidence.
const normalize = value => value.replace(/\s+/g, ' ').trim();
const replacements = new Map(Object.entries({
  'Plateforme N°1 au Maroc': 'Votre cabinet de conseil au Maroc',
  'La plateforme N°1 pour créer et piloter votre société au Maroc, 100% en ligne.': 'Votre cabinet pour créer, structurer et développer votre société partout au Maroc.',
  'Nos partenaires': 'Organismes utiles à vos démarches',
  'Une plateforme,': 'Un cabinet,',
  'Plus de 1000 entreprises accompagnées par Felexia Conseils': 'Un accompagnement adapté à votre projet au Maroc',
  'Plus de 1 000 entrepreneurs nous ont déjà fait confiance': 'Un interlocuteur pour préparer les étapes de votre projet',
  'Satisfait ou remboursé': 'Accompagnement personnalisé',
  'Garantie anti-rejet': 'Préparation de votre dossier',
  'Si votre dossier est refusé par une administration pour une erreur de notre part, nous nous engageons à le corriger ou à vous rembourser.': 'Nous vous aidons à préparer les pièces et à comprendre les demandes de complément des administrations.',
  "Garantie anti-rejet : si votre dossier est refusé par l'administration, nous vous remboursons": 'Les pièces et formalités sont examinées avec vous avant le dépôt de votre dossier',
  "Créez votre société sans déplacement, sans paperasse.": 'Créez votre société avec un accompagnement clair.',
  'Création 100% en ligne': 'Votre projet, étape par étape',
  'Toutes les démarches se font à distance : dépôt du dossier, signature électronique et suivi en temps réel.': 'Présentez votre projet en ligne. Le cabinet vous précise les pièces, signatures et démarches nécessaires.',
  'Sans déplacement': 'Échanges à distance',
  '100% en ligne, depuis chez vous.': 'Un premier échange depuis chez vous.',
  'Une prise en charge complète': 'Des démarches coordonnées',
  "Dossier pris en charge de A à Z : Certificat négatif, statuts, RC, IF, ICE, CNSS… nous gérons l'ensemble des démarches administratives pour vous.": 'Certificat négatif, statuts, RC, IF, ICE, CNSS : nous définissons avec vous les formalités et le périmètre de notre accompagnement.',
  'Une plateforme pensée pour les entrepreneurs marocains et MRE qui veulent aller vite, sans sacrifier la conformité.': 'Un accompagnement pensé pour les entrepreneurs marocains, MRE et investisseurs qui souhaitent structurer leur projet.',
  'Forfait tout inclus, zéro frais cachés. Vous savez exactement ce que vous payez avant de démarrer.': 'Un devis détaille le périmètre de la mission, les honoraires et les frais à prévoir avant votre engagement.',
  'Tarif transparent': 'Un devis détaillé',
  "Les documents sont rédigés par nos juristes, conformes à la législation marocaine.": 'Les documents et pièces nécessaires sont examinés selon les besoins de votre projet.',
  "Un parcours linéaire, sans paperasse, suivi par un juriste dédié jusqu'à l'obtention du Registre du Commerce.": 'Un parcours organisé avec votre interlocuteur, de la préparation des pièces aux formalités d’immatriculation.',
  'Signature électronique conforme et sécurisée dans notre plateforme, sans déplacement.': 'Nous vous indiquons les signatures et éventuelles procurations requises pour votre dossier.',
  'Délai moyen': 'Calendrier du projet',
  'Société livrée en 10 jours': 'Délais précisés selon votre dossier',
  'Délai moyen : 10 jours': 'Calendrier défini selon les formalités',
  'Une adresse à Casablanca,': 'Une adresse professionnelle,',
  'Adresse de prestige': 'Votre siège social',
  'Une adresse reconnue par les administrations, idéale pour vos statuts, votre RC et votre banque.': 'Étudions la solution de siège social adaptée à votre activité et aux formalités de création.',
  'Réception au nom de votre société, scan en temps réel, alerte WhatsApp et e-mail à chaque pli.': 'Les modalités de réception, de transmission et de récupération du courrier sont précisées dans l’offre retenue.',
  'Contrat de domiciliation respectant la réglementation marocaine, transmis dans la demi-journée.': 'Les modalités, pièces et délais du contrat sont étudiés avec vous avant votre engagement.',
  "Centre d'affaires moderne": 'Accompagnement partout au Maroc',
  "Que vous soyez marocain, MRE ou étranger, vous pouvez créer votre société au Maroc, 100% à distance.": 'Entrepreneur marocain, MRE ou investisseur étranger : nous étudions votre projet au Maroc et les formalités adaptées à votre situation.',
  'Procédure entièrement en ligne': 'Premier échange et demande en ligne',
  'Signature électronique sécurisée': 'Modalités de signature expliquées',
  'Accompagnement par un juriste dédié': 'Un interlocuteur pour votre projet',
  'Domiciliation professionnelle incluse': 'Solution de domiciliation à étudier',
  'Suivi du dossier en temps réel': 'Suivi avec votre interlocuteur',
  "Dossier complet prêt pour l'ouverture du compte bancaire": 'Préparation des pièces pour vos démarches bancaires',
  "Notre équipe de formalistes vous accompagne avant, pendant et après la création — sans rendez-vous physique obligatoire, sans paperasse.": 'Notre cabinet vous accompagne avant, pendant et après la création, selon la mission définie avec vous.',
  "Toutes les démarches sont centralisées sur une seule plateforme": 'Les étapes et les pièces à réunir sont coordonnées avec votre interlocuteur',
  "Créer votre SARL rapidement !": 'Préparez la création de votre SARL.',
  "Faites ce que vous aimez faire, on s'occupe du juridique.": 'Concentrez-vous sur votre activité avec un accompagnement pour vos formalités.',
  'Notre équipe vous répond rapidement.': 'Parlons de votre projet.',
  'Réponse rapide pendant les heures ouvrées': 'Échangez directement avec le cabinet',
  'Scan des courriers en temps réel': 'Modalités de numérisation du courrier à convenir',
  'Notification immédiate par WhatsApp et e-mail': 'Canaux de transmission du courrier à convenir',
  'Réception et gestion du courrier au nom de votre société': 'Organisation de la réception du courrier à préciser',
  'Mise à disposition sécurisée des documents': 'Modalités de remise des documents à préciser',
  'Domiciliation incluse dès la création': 'Domiciliation à prévoir selon votre projet',
  'Ce que comprend la domiciliation': 'Les points à préciser pour votre domiciliation',
  'Une domiciliation professionnelle à Casablanca': 'Une domiciliation adaptée à votre activité',
  'Adresse professionnelle reconnue': 'Adresse professionnelle adaptée au projet',
  'Réception et gestion du courrier': 'Organisation de votre courrier',
  'Conforme à la réglementation marocaine': 'Formalités et pièces à examiner',
  'Domiciliation à travers tout le Maroc.': 'Un projet d’implantation au Maroc.',
  'Casablanca · Maarif': 'Projet à Casablanca',
  'Rabat · Agdal': 'Projet à Rabat',
  'Marrakech · centre-ville': 'Projet à Marrakech',
  'Laâyoune · centre-ville': 'Projet à Laâyoune',
  'Aucun poste ouvert pour le moment — vous pouvez nous envoyer une candidature spontanée.': 'Vous pouvez présenter une candidature spontanée au cabinet.',
  'Aucun poste ne correspond exactement ?': 'Vous souhaitez nous présenter votre expérience ?',
  'Des démarches 100 % dématérialisées': 'Des démarches préparées avec vous',
  'Création de société 100 % en ligne, sans déplacement': 'Préparation de votre dossier de création avec le cabinet',
  'Domiciliation premium avec gestion et scan du courrier en temps réel': 'Domiciliation et modalités de courrier à étudier',
  'On gère toute la création de ta SARL AU, sans déplacement': 'Préparez votre création de SARL AU avec le cabinet',
  '3. Signature électronique des documents': '3. Signature des documents',
}));

const metadata = {
  '/': ['Felexia Conseils | Création et accompagnement d’entreprise au Maroc', 'Felexia Conseils accompagne votre création d’entreprise, vos formalités, votre implantation et votre développement partout au Maroc. Présentez votre projet.'],
  '/creation-entreprise': ['Création d’entreprise au Maroc | Felexia Conseils', 'Préparez la création de votre société au Maroc avec Felexia Conseils : choix de la structure, pièces, formalités et accompagnement sur devis.'],
  '/domiciliation': ['Domiciliation d’entreprise au Maroc | Felexia Conseils', 'Étudiez une solution de domiciliation adaptée à votre activité au Maroc. Felexia Conseils vous accompagne dans les démarches et la préparation de votre dossier.'],
  '/tarif/creation': ['Offres de création d’entreprise sur devis | Felexia Conseils', 'Comparez les périmètres d’accompagnement à la création d’entreprise et demandez un devis adapté à votre projet au Maroc auprès de Felexia Conseils.'],
  '/tarif/domiciliation': ['Domiciliation sur devis au Maroc | Felexia Conseils', 'Demandez une proposition de domiciliation adaptée à votre entreprise. Les services, la durée et les modalités sont précisés dans votre devis Felexia Conseils.'],
  '/contact': ['Contactez Felexia Conseils | Votre projet au Maroc', 'Contactez Felexia Conseils par téléphone, WhatsApp, courriel ou formulaire pour préparer votre projet au Maroc ou organiser un rendez-vous au cabinet.'],
  '/rejoignez-nous': ['Candidature spontanée | Felexia Conseils', 'Présentez votre expérience et votre candidature spontanée à Felexia Conseils, cabinet de conseil et d’accompagnement des entreprises au Maroc.'],
};

function rewriteText($, selector, transform) {
  $(selector).find('*').addBack().contents().filter((_, node) => node.type === 'text').each((_, node) => { node.data = transform(node.data); });
}

function setParagraphs($, selector, pattern, replacement) {
  $(selector).filter((_, el) => pattern.test(normalize($(el).text()))).each((_, el) => $(el).text(typeof replacement === 'function' ? replacement($(el).text()) : replacement));
}

export function adaptReferenceContent($, route) {
  const isGuide = route.startsWith('/guides/');
  // Bank marks and Google scores are not evidence of a Felexia integration/review.
  $('footer img').filter((_, el) => /^(CMI|Mastercard|Visa)$/i.test($(el).attr('alt') || '')).closest('div.flex.items-center').remove();
  $('a[aria-label]').filter((_, el) => /avis Google|\b4[,.]9\s*\/\s*5/i.test($(el).attr('aria-label'))).remove();
  $('footer a').filter((_, el) => /Laisser un avis Google/i.test($(el).text())).remove();

  rewriteText($, 'body', value => {
    let result = replacements.get(normalize(value)) ?? value;
    result = result.replace(/un juriste Felexia Conseils|un juriste dédié|nos juristes|par un juriste/gi, match => /^nos/i.test(match) ? 'les membres de notre équipe' : /^par/i.test(match) ? 'par le cabinet' : /^Un/.test(match) ? 'Un interlocuteur du cabinet' : 'un interlocuteur du cabinet');
    result = result.replace(/,?\s*en moyenne en moins d['’]une heure(?: pendant les jours ouvrés)?\.?/gi, '.')
      .replace(/vous répond —\s*\./g, 'vous accompagne.')
      .replace(/(?:dans|sur) notre plateforme/gi, 'avec notre cabinet');
    if (!isGuide) result = result.replace(/domiciliation à Casablanca/gi, 'domiciliation au Maroc')
      .replace(/création d['’]entreprise 100\s*% en ligne/gi, 'création d’entreprise accompagnée')
      .replace(/clair, rapide et 100\s*% en ligne/gi, 'clair et adapté à votre situation');
    return result;
  });

  // The source carousel combines administrations and private commercial brands.
  if (route === '/') {
    $('main img').filter((_, el) => /Auditia|cashplus|cozone|telecontact|Yealead/i.test($(el).attr('alt') || '')).parent().remove();
    $('main h2').filter((_, el) => /Pourquoi nos clients ne reviennent pas en arrière|Des entrepreneurs comme vous/.test($(el).text())).closest('section').remove();
    setParagraphs($, 'main p', /Création d'entreprise, domiciliation/, 'Création d’entreprise, domiciliation et accompagnement des entrepreneurs : un cabinet pour votre projet partout au Maroc.');
    setParagraphs($, 'main p', /Domicilier votre société aux/, 'Étudions ensemble la solution de domiciliation adaptée à votre société et à votre lieu d’implantation au Maroc.');
  }

  // Preserve offer cards and their hierarchy, with project-specific quotations.
  if (route.startsWith('/tarif/')) {
    $('main span').filter((_, el) => /^\d[\d.,\s]*$/.test($(el).text()) && /MAD/.test($(el).parent().text())).each((_, el) => {
      const price = $(el); price.text('Sur devis'); price.siblings().remove();
    });
    rewriteText($, 'main', value => {
      const v = normalize(value);
      if (/^Acompte de/.test(v)) return 'Périmètre et modalités précisés dans votre devis';
      if (/^Soit \d+ MAD/.test(v)) return 'Selon votre projet et les services retenus';
      if (/^\d+ MAD d['’]économie/.test(v)) return 'Une proposition adaptée à la durée souhaitée';
      if (/^Économisez \d+%/.test(v)) return 'Projet à étudier';
      if (v === 'INCLUS') return 'À étudier';
      if (v === 'Recommandé') return 'Projet complet';
      if (v === 'Meilleur rapport qualité prix') return 'Pour structurer votre projet';
      if (v === '12 mois de domiciliation offerts') return 'Étude de votre besoin de domiciliation';
      if (v === '24 mois de domiciliation') return 'Domiciliation selon votre projet';
      if (v === 'Protection de la marque (2 classes incluses)') return 'Protection de marque : périmètre à définir';
      if (/^Tous nos prix sont affichés TTC/.test(v)) return 'Les honoraires, frais administratifs, services et modalités de règlement sont précisés dans un devis avant votre engagement.';
      return value;
    });
    $('main a[href*="/create/"]').text('Demander un devis').attr('href', '/fr/contact/?service=' + (route.endsWith('domiciliation') ? 'domiciliation' : 'creation-entreprise'));
    if (route.endsWith('creation')) {
      setParagraphs($, 'main p', /^Trois formules transparentes/, 'Trois périmètres d’accompagnement pour préparer votre création d’entreprise. Les prestations retenues sont confirmées après étude de votre projet.');
    } else {
      $('main h1').html('Une adresse professionnelle<br><span class="text-brand-ocean">adaptée à votre projet.</span>');
      setParagraphs($, 'main p', /^Domiciliation d'entreprise/, 'Étudiez les modalités de domiciliation, la durée et l’organisation du courrier avec votre interlocuteur. Chaque proposition fait l’objet d’un devis.');
    }
  }

  if (route === '/creation-entreprise') {
    $('main details').each((_, el) => {
      const question = $(el).find('summary').text();
      const answer = $(el).children().not('summary');
      if (/Combien de temps/.test(question)) answer.text('Le calendrier dépend de la forme juridique, des pièces disponibles et du traitement des administrations. Le cabinet vous précise les étapes et les délais estimés pour votre situation.');
      if (/Faut-il se déplacer/.test(question)) answer.text('Le premier échange et la préparation du dossier peuvent commencer à distance. Les signatures, procurations ou présences éventuellement requises sont précisées selon votre situation.');
      if (/Quel est le tarif/.test(question)) answer.text('L’accompagnement est proposé sur devis, après étude de votre projet. Les honoraires, frais et prestations sont précisés avant votre engagement.');
      if (/MRE ou étranger/.test(question)) answer.text('Le cabinet accompagne les MRE et investisseurs étrangers dans l’étude de leur projet au Maroc. Les pièces et formalités dépendent de la structure, de l’activité et de la situation des associés.');
    });
  }

  if (route === '/domiciliation') {
    $('main h1').html('Domiciliation d’entreprise<br><span class="text-brand-ocean">au Maroc.</span>');
    setParagraphs($, 'main h2', /Une domiciliation professionnelle à Casablanca/, 'Une domiciliation adaptée à votre activité');
    setParagraphs($, 'main p', /^à Résidence|^Une adresse professionnelle reconnue,|^Résidence.*situé sur la Route/, 'Étudions votre besoin de siège social et les modalités de domiciliation adaptées à votre entreprise.');
    setParagraphs($, 'main p', /^Notre adresse principale/, 'Felexia Conseils accompagne les projets d’implantation partout au Maroc. Les solutions de domiciliation sont étudiées selon votre activité et la ville souhaitée.');
    setParagraphs($, 'main p', /^Felexia Conseils peut aussi gérer/, 'La domiciliation peut être étudiée dans le cadre de votre projet de création d’entreprise. Son périmètre et ses modalités sont précisés dans votre proposition.');
    const answers = [
      'La domiciliation permet de disposer d’une adresse administrative et juridique pour une société. Le choix de cette adresse et les pièces justificatives sont étudiés selon l’activité et les formalités à réaliser.',
      'Les modalités de réception, de numérisation, de transmission et de récupération du courrier doivent être précisées dans l’offre et le contrat de domiciliation retenus.',
      'Vous pouvez nous présenter votre projet à distance. Nous vous indiquons ensuite les pièces, signatures ou éventuelles présences nécessaires selon votre situation.',
      'Nous étudions les projets dans tout le Maroc. Contactez le cabinet avec votre ville souhaitée pour connaître les possibilités de domiciliation adaptées à votre activité.',
      'Le calendrier dépend de votre dossier et de la solution retenue. Les pièces nécessaires et les délais estimés vous sont précisés avant votre engagement.',
    ];
    $('main details').each((i, el) => { if (answers[i]) $(el).children().not('summary').text(answers[i]); });
  }

  if (route === '/contact') {
    $('main h2,main h3').filter((_, el) => /Laisser un avis Google|^Horaires$/.test($(el).text())).parent().remove();
    setParagraphs($, 'main p', /Nos locaux se trouvent à Maarif/, 'Le cabinet vous reçoit sur rendez-vous à Marrakech. Nous accompagnons également vos projets dans tout le Maroc par téléphone, WhatsApp et courriel.');
    $('main a').filter((_, el) => normalize($(el).text()) === 'Prendre rendez-vous').attr('href', '/fr/rendez-vous/');
  }

  if (route === '/rejoignez-nous') {
    setParagraphs($, 'main p', /^Chez Felexia Conseils, nous avons créé la première plateforme/, 'Felexia Conseils accompagne les entrepreneurs et investisseurs dans la création, la structuration et le développement de leur activité au Maroc.');
    setParagraphs($, 'main p', /équipe ambitieuse en pleine croissance/, 'Vous souhaitez contribuer à l’accompagnement des entrepreneurs ? Présentez-nous votre expérience et les missions qui vous intéressent.');
    setParagraphs($, 'main p', /Nous gardons votre dossier/, 'Vous pouvez adresser une candidature spontanée au cabinet en présentant votre expérience et les missions recherchées. Aucune ouverture de poste n’est annoncée sur cette page.');
  }

  if (isGuide) {
    // Leave educational explanations and statutory fees intact. Only paragraphs
    // advertising the source company's operations are adapted.
    $('main p,main li').each((_, el) => {
      if ($(el).find('p,li').length) return;
      const value = normalize($(el).text());
      const ownedClaim = /Felexia Conseils|notre (?:plateforme|solution de signature)|nos (?:juristes|formalistes|bureaux partenaires)|votre dossier en ligne|Scan de vos courriers en temps réel|Installez votre siège social|Un contrat de domiciliation.*demi.journée/i.test(value);
      if (!ownedClaim) return;
      if (/signature électronique|100\s*%\s*(?:en ligne|à distance)|sans (?:aucun )?déplacement|sans que tu aies à te déplacer|entièrement en ligne|plateforme|dossier en ligne|temps réel|délai moyen.*10 jours|réseau de partenaires|bureaux partenaires|domiciliation de prestige|Oasis|Route de l['’]Oasis|domiciliation.*Casablanca|services digitaux complets|demi.journée/i.test(value)) {
        if (/domiciliation|courrier|adresse.*siège/.test(value)) $(el).text('Felexia Conseils étudie avec vous la solution de domiciliation adaptée à votre activité et à la ville souhaitée. L’adresse proposée, les services, les modalités de courrier et les coûts sont précisés dans le devis et le contrat retenus.');
        else if (/signature/.test(value)) $(el).text('Les modalités de signature, de légalisation ou de procuration sont déterminées selon les documents et votre situation. Felexia Conseils vous indique les formalités à prévoir pour votre dossier.');
        else if (/délai moyen/.test(value)) $(el).text('Les délais dépendent des pièces disponibles et du traitement des administrations. Felexia Conseils précise avec vous les étapes et le calendrier estimé de votre projet.');
        else $(el).text('Felexia Conseils vous accompagne dans la préparation de votre création d’entreprise au Maroc. Vous pouvez présenter votre projet à distance ; le cabinet vous précise ensuite les pièces, formalités et modalités adaptées à votre situation.');
      }
      if (/Expert Felexia Conseils en création.*Publié le/.test(value)) $(el).text('Ressource informative sur la création d’entreprise et les formalités au Maroc.');
    });
    setParagraphs($, 'main h2,main h3,main h4', /La solution Felexia Conseils.*domiciliation de prestige/, 'La domiciliation adaptée à votre projet');
  }

  const values = metadata[route];
  const title = values?.[0] || $('title').text();
  const description = values?.[1] || ($('meta[name="description"]').attr('content') || '').replace(/100\s*%\s*en ligne/gi, 'avec un accompagnement adapté').replace(/sans déplacement/gi, 'selon votre situation');
  $('title').text(title);
  $('meta[name="description"]').attr('content', description);
  return { title, description };
}
