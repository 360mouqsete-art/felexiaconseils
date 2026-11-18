import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const version = createHash('sha256').update(readFileSync(new URL('../public/home-direction.css', import.meta.url))).digest('hex').slice(0,12);
const hero = '/assets/optimized/4efd96d7535341fb.webp';

const copy = {
  fr: {
    kicker: 'Mabrouka · Marrakech',
    h1: 'Un cabinet à Marrakech, pour créer votre société au Maroc.',
    lead: 'Entrepreneurs, MRE et investisseurs étrangers : un interlocuteur vous reçoit sur rendez-vous, ou échange d’abord à distance.',
    meet: 'Rencontrer le cabinet', write: 'Écrire',
    heroAlt: 'Architecture marocaine — visuel d’illustration',
    personTitle: 'Quelqu’un du cabinet suit votre dossier.',
    person: 'Un interlocuteur vous accompagne de la préparation des pièces jusqu’aux formalités. Le devis détaille les honoraires et les frais avant tout engagement.',
    photoAlt: 'Échange autour d’un dossier — visuel d’illustration',
    who: 'Trois façons d’arriver',
    w1: 'Entrepreneurs au Maroc', w1d: 'Structurer une activité, choisir une forme et préparer l’immatriculation.',
    w2: 'MRE', w2d: 'Avancer depuis l’étranger, avec les procurations et les échanges à distance quand ils sont possibles.',
    w3: 'Investisseurs étrangers', w3d: 'Préparer une présence au Maroc : société, siège et modifications ultérieures.',
    visit: 'Le cabinet',
    note: 'Résidence Al Ihssane, Immeuble 3, Appartement 4, Mabrouka, Marrakech. Français, anglais et arabe.',
    office: 'Bureau', mobile: 'Mobile', book: 'Créer mon entreprise',
    more: 'Aller plus loin',
    l1: 'Création de société', l2: 'Domiciliation à Marrakech', l3: 'Modifier une société', l4: 'Créer une SARL', l5: 'Depuis l’étranger', l6: 'Tous les guides'
  },
  en: {
    kicker: 'Mabrouka · Marrakech',
    h1: 'A Marrakech firm, for starting your company in Morocco.',
    lead: 'Entrepreneurs, Moroccans abroad and foreign investors: someone at the firm meets you by appointment, or talks with you remotely first.',
    meet: 'Meet the firm', write: 'Write to us',
    heroAlt: 'Moroccan architecture — illustration',
    personTitle: 'Someone at the firm stays with your file.',
    person: 'An adviser goes with you from preparing the papers to the formalities. The quote sets out fees and charges before you commit.',
    photoAlt: 'A discussion over a file — illustration',
    who: 'Three ways to arrive',
    w1: 'Entrepreneurs in Morocco', w1d: 'Give an activity a structure, choose a legal form and prepare registration.',
    w2: 'Moroccans abroad', w2d: 'Move forward from overseas, with powers of attorney and remote exchanges when they are possible.',
    w3: 'Foreign investors', w3d: 'Prepare a presence in Morocco: the company, the office and later changes.',
    visit: 'The firm',
    note: 'Résidence Al Ihssane, Building 3, Apartment 4, Mabrouka, Marrakech. French, English and Arabic.',
    office: 'Office', mobile: 'Mobile', book: 'Start my company',
    more: 'Continue reading',
    l1: 'Company formation', l2: 'Domiciliation in Marrakech', l3: 'Change a company', l4: 'Form a SARL', l5: 'From abroad', l6: 'All guides'
  },
  ar: {
    kicker: 'مبروكة · مراكش',
    h1: 'مكتب بمراكش لتأسيس شركتك في المغرب.',
    lead: 'رواد الأعمال ومغاربة العالم والمستثمرون الأجانب: يستقبلكم أحد مستشاري المكتب بموعد، أو يبدأ التبادل عن بُعد.',
    meet: 'لقاء المكتب', write: 'مراسلة',
    heroAlt: 'عمارة مغربية — صورة توضيحية',
    personTitle: 'أحد مستشاري المكتب يتابع ملفك.',
    person: 'يرافقك مخاطب من تحضير الوثائق حتى الإجراءات. يفصّل العرض الأتعاب والمصاريف قبل أي التزام.',
    photoAlt: 'تبادل حول ملف — صورة توضيحية',
    who: 'ثلاث طرق للوصول',
    w1: 'رواد الأعمال في المغرب', w1d: 'هيكلة نشاط واختيار شكل قانوني وتحضير التسجيل.',
    w2: 'مغاربة العالم', w2d: 'التقدم من الخارج، مع الوكالات والتبادل عن بُعد حين يكون ذلك ممكناً.',
    w3: 'المستثمرون الأجانب', w3d: 'تحضير حضور في المغرب: الشركة والمقر والتعديلات اللاحقة.',
    visit: 'المكتب',
    note: 'إقامة الإحسان، العمارة 3، الشقة 4، مبروكة، مراكش. الفرنسية والإنجليزية والعربية.',
    office: 'المكتب', mobile: 'المحمول', book: 'إنشاء مقاولتي',
    more: 'للمتابعة',
    l1: 'تأسيس شركة', l2: 'التوطين بمراكش', l3: 'تعديل شركة', l4: 'تأسيس SARL', l5: 'من الخارج', l6: 'جميع الأدلة'
  }
};

function markup(lang) {
  const c = copy[lang];
  const p = path => `/${lang}/${path}`;
  return `<div class="c">
  <section class="c-hero">
    <img src="${hero}" srcset="/assets/corporate/morocco-architecture-small.jpg 480w, ${hero} 938w" sizes="100vw" width="938" height="1280" alt="${c.heroAlt}" fetchpriority="high" decoding="async">
    <div class="c-hero-copy">
      <p class="c-kicker">${c.kicker}</p>
      <h1>${c.h1}</h1>
      <p>${c.lead}</p>
      <p class="c-hero-actions"><a class="c-primary" href="${p('rendez-vous/')}">${c.meet}</a><a class="c-ghost" href="${p('contact/')}">${c.write}</a></p>
    </div>
  </section>
  <section class="c-person">
    <div>
      <h2>${c.personTitle}</h2>
      <p>${c.person}</p>
      <a class="c-text" href="${p('creation-entreprise/')}">${c.l1}</a>
    </div>
    <img src="/assets/optimized/f14b13e65ec8f8fe.webp" width="1100" height="733" alt="${c.photoAlt}" loading="lazy" decoding="async">
  </section>
  <section class="c-who" aria-labelledby="c-who-title">
    <h2 id="c-who-title">${c.who}</h2>
    <div>
      <article><h3>${c.w1}</h3><p>${c.w1d}</p><a href="${p('creation-entreprise/')}">${c.l1}</a></article>
      <article><h3>${c.w2}</h3><p>${c.w2d}</p><a href="${p('guides/mre-etranger/')}">${c.l5}</a></article>
      <article><h3>${c.w3}</h3><p>${c.w3d}</p><a href="${p('modify-company/')}">${c.l3}</a></article>
    </div>
  </section>
  <section class="c-visit">
    <div>
      <p class="c-kicker">${c.visit}</p>
      <p class="c-address">${c.note}</p>
    </div>
    <div class="c-phones">
      <a href="tel:+212520825825">${c.office} · <bdi dir="ltr">+212 520 825 825</bdi></a>
      <a href="tel:+212661080862">${c.mobile} · <bdi dir="ltr">+212 661 080 862</bdi></a>
      <a href="https://wa.me/212661400352">WhatsApp · <bdi dir="ltr">+212 661 400 352</bdi></a>
      <a class="c-primary" href="${p('create/')}">${c.book}</a>
    </div>
  </section>
  <nav class="c-more" aria-label="${c.more}">
    <a href="${p('domiciliation/')}">${c.l2}</a>
    <a href="${p('guides/creer-une-sarl-maroc/')}">${c.l4}</a>
    <a href="${p('guides/')}">${c.l6}</a>
  </nav>
</div>`;
}

export function applyHomepage($, lang) {
  $('body').addClass('fx-home fx-home-c');
  $('main').html(markup(lang));
  $('head').append(`<link rel="stylesheet" href="/home-direction.css?v=${version}"><link rel="preload" as="image" href="${hero}"><link rel="preload" href="/assets/fonts/font-14.woff2" as="font" type="font/woff2" crossorigin="anonymous">`);
}
