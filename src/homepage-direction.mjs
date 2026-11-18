import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const version = createHash('sha256').update(readFileSync(new URL('../public/home-direction.css', import.meta.url))).digest('hex').slice(0,12);

const copy = {
  fr: {
    kicker: 'Cabinet · Mabrouka, Marrakech',
    h1: 'Felexia Conseils : créez et développez votre entreprise au Maroc.',
    lead: 'Création d’entreprise, domiciliation et accompagnement des entrepreneurs : un cabinet pour votre projet partout au Maroc.',
    primary: 'Créer mon entreprise', quiet: 'Écrire au cabinet', missions: 'Les trois missions',
    s1: 'Création', s1d: 'SARL, SARL AU ou une autre forme, examinée avec vous.',
    s2: 'Domiciliation', s2d: 'Une adresse à Marrakech, distincte des honoraires.',
    s3: 'Modification', s3d: 'Gérant, siège, capital ou objet, selon vos statuts.',
    quote: 'Un interlocuteur, du dossier à l’immatriculation.',
    quoteP: 'Un interlocuteur du cabinet vous accompagne à chaque étape. Le devis détaille le périmètre, les honoraires et les frais avant votre engagement.',
    steps: 'Comment le dossier avance',
    stepsP: 'Un parcours organisé avec votre interlocuteur, de la préparation des pièces aux formalités d’immatriculation.',
    t1: 'Vous renseignez vos informations', t1d: 'Présentez votre projet en ligne. Le cabinet vous précise les pièces, signatures et démarches nécessaires.',
    t2: 'Un interlocuteur vous accompagne', t2d: 'Le cabinet vérifie le dossier avec vous et définit le périmètre de l’accompagnement.',
    t3: 'Vous signez vos documents', t3d: 'Nous vous indiquons les signatures et éventuelles procurations requises pour votre dossier.',
    t4: 'Les formalités sont déposées', t4d: 'Nous finalisons les démarches administratives et vous recevez votre dossier complet.',
    visit: 'Venir ou échanger à distance',
    note: 'Rendez-vous au cabinet, ou premier échange à distance. Français, anglais et arabe.',
    book: 'Préparer un rendez-vous', more: 'Aller plus loin',
    office: 'Bureau', mobile: 'Mobile',
    l1: 'Création de société au Maroc', l2: 'Créer une SARL', l3: 'SARL à Marrakech', l4: 'Entreprendre depuis l’étranger', l5: 'Demander un devis', l6: 'Tous les guides'
  },
  en: {
    kicker: 'Firm · Mabrouka, Marrakech',
    h1: 'Felexia Conseils: start and grow your business in Morocco.',
    lead: 'Company formation, domiciliation and support for entrepreneurs: a firm for your project anywhere in Morocco.',
    primary: 'Start my company', quiet: 'Write to the firm', missions: 'Three assignments',
    s1: 'Formation', s1d: 'A SARL, single-member SARL or another form, reviewed with you.',
    s2: 'Domiciliation', s2d: 'An address in Marrakech, separate from professional fees.',
    s3: 'Changes', s3d: 'Manager, office, capital or purpose, under your articles.',
    quote: 'One adviser, from the file to registration.',
    quoteP: 'Someone at the firm stays with you at each step. The quote sets out the scope, fees and charges before you commit.',
    steps: 'How the file moves forward',
    stepsP: 'A path organised with your adviser, from preparing documents to registration formalities.',
    t1: 'You share your information', t1d: 'Present your project online. The firm tells you which documents, signatures and steps are needed.',
    t2: 'An adviser stays with you', t2d: 'The firm reviews the file with you and agrees the scope of support.',
    t3: 'You sign the documents', t3d: 'We tell you which signatures and any powers of attorney your file requires.',
    t4: 'The formalities are filed', t4d: 'We complete the administrative steps and you receive your file.',
    visit: 'Meet in person or talk remotely',
    note: 'An appointment at the firm, or a first remote discussion. French, English and Arabic.',
    book: 'Request an appointment', more: 'Continue reading',
    office: 'Office', mobile: 'Mobile',
    l1: 'Company formation in Morocco', l2: 'Form a SARL', l3: 'A SARL in Marrakech', l4: 'Starting from abroad', l5: 'Request a quote', l6: 'All guides'
  },
  ar: {
    kicker: 'المكتب · مبروكة، مراكش',
    h1: 'Felexia Conseils: أسّس مقاولتك وطوّرها في المغرب.',
    lead: 'تأسيس الشركات والتوطين ومواكبة رواد الأعمال: مكتب لمشروعك في أي مكان بالمغرب.',
    primary: 'إنشاء مقاولتي', quiet: 'مراسلة المكتب', missions: 'ثلاث مهام',
    s1: 'التأسيس', s1d: 'SARL أو SARL AU أو شكل آخر، يُدرس معك.',
    s2: 'التوطين', s2d: 'عنوان بمراكش، منفصل عن الأتعاب.',
    s3: 'التعديل', s3d: 'المسيّر أو المقر أو رأس المال أو الغرض، حسب النظام الأساسي.',
    quote: 'مخاطب واحد، من الملف إلى التسجيل.',
    quoteP: 'يرافقك أحد مستشاري المكتب في كل خطوة. يفصّل العرض النطاق والأتعاب والمصاريف قبل أي التزام.',
    steps: 'كيف يتقدم الملف',
    stepsP: 'مسار منظّم مع مخاطبك، من تحضير الوثائق إلى إجراءات التسجيل.',
    t1: 'تقدّم معلوماتك', t1d: 'اعرض مشروعك عبر الإنترنت. يحدد المكتب الوثائق والتوقيعات والإجراءات اللازمة.',
    t2: 'يرافقك مخاطب', t2d: 'يراجع المكتب الملف معك ويحدد نطاق المواكبة.',
    t3: 'توقّع الوثائق', t3d: 'نشير إلى التوقيعات والوكالات المحتملة التي يتطلبها ملفك.',
    t4: 'تُودع الإجراءات', t4d: 'نُتمّ الإجراءات الإدارية وتصلك وثائق ملفك.',
    visit: 'حضور أو تواصل عن بُعد',
    note: 'موعد في المكتب، أو أول تبادل عن بُعد. الفرنسية والإنجليزية والعربية.',
    book: 'تحضير موعد', more: 'للمتابعة',
    office: 'المكتب', mobile: 'المحمول',
    l1: 'تأسيس شركة في المغرب', l2: 'تأسيس SARL', l3: 'SARL بمراكش', l4: 'التأسيس من الخارج', l5: 'طلب عرض', l6: 'جميع الأدلة'
  }
};

function markup(lang) {
  const c = copy[lang];
  const p = path => `/${lang}/${path}`;
  return `<div class="a">
  <section class="a-hero">
    <div class="a-hero-copy">
      <p class="a-kicker">${c.kicker}</p>
      <h1>${c.h1}</h1>
      <p class="a-lead">${c.lead}</p>
      <p class="a-actions"><a class="a-primary" href="${p('create/')}">${c.primary}</a><a class="a-quiet" href="${p('contact/')}">${c.quiet}</a></p>
    </div>
    <nav class="a-index" aria-label="${c.missions}">
      <a href="${p('creation-entreprise/')}"><span>01</span><strong>${c.s1}</strong><em>${c.s1d}</em></a>
      <a href="${p('domiciliation/')}"><span>02</span><strong>${c.s2}</strong><em>${c.s2d}</em></a>
      <a href="${p('modify-company/')}"><span>03</span><strong>${c.s3}</strong><em>${c.s3d}</em></a>
    </nav>
  </section>
  <section class="a-quote" aria-labelledby="a-quote-title">
    <h2 id="a-quote-title">${c.quote}</h2>
    <p>${c.quoteP}</p>
  </section>
  <section class="a-steps" aria-labelledby="a-steps-title">
    <div class="a-steps-intro">
      <h2 id="a-steps-title">${c.steps}</h2>
      <p>${c.stepsP}</p>
    </div>
    <ol>
      <li><span>01</span><div><h3>${c.t1}</h3><p>${c.t1d}</p></div></li>
      <li><span>02</span><div><h3>${c.t2}</h3><p>${c.t2d}</p></div></li>
      <li><span>03</span><div><h3>${c.t3}</h3><p>${c.t3d}</p></div></li>
      <li><span>04</span><div><h3>${c.t4}</h3><p>${c.t4d}</p></div></li>
    </ol>
  </section>
  <section class="a-close">
    <div>
      <p class="a-kicker">${c.visit}</p>
      <p class="a-address">Résidence Al Ihssane, Immeuble 3, Appartement 4, Mabrouka, Marrakech.</p>
      <p class="a-note">${c.note}</p>
    </div>
    <div class="a-reach">
      <a href="tel:+212520825825">${c.office} · <bdi dir="ltr">+212 520 825 825</bdi></a>
      <a href="tel:+212661080862">${c.mobile} · <bdi dir="ltr">+212 661 080 862</bdi></a>
      <a href="https://wa.me/212661400352">WhatsApp · <bdi dir="ltr">+212 661 400 352</bdi></a>
      <a class="a-primary" href="${p('rendez-vous/')}">${c.book}</a>
    </div>
  </section>
  <nav class="a-more" aria-label="${c.more}">
    <a href="${p('creation-entreprise/')}">${c.l1}</a>
    <a href="${p('guides/creer-une-sarl-maroc/')}">${c.l2}</a>
    <a href="${p('guides/creation-sarl-marrakech/')}">${c.l3}</a>
    <a href="${p('guides/mre-etranger/')}">${c.l4}</a>
    <a href="${p('tarif/creation/')}">${c.l5}</a>
    <a href="${p('guides/')}">${c.l6}</a>
  </nav>
</div>`;
}

export function applyHomepage($, lang) {
  $('body').addClass('fx-home fx-home-a');
  $('main').html(markup(lang));
  $('head').append(`<link rel="stylesheet" href="/home-direction.css?v=${version}"><link rel="preload" href="/assets/fonts/font-14.woff2" as="font" type="font/woff2" crossorigin="anonymous">`);
}
