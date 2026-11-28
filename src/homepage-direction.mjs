import {createHash} from 'node:crypto';
import {privateAdvice} from './private-status.mjs';

const version = createHash('sha1').update('home-d-illustrated-v2').digest('hex').slice(0, 8);

const copy = {
  fr: {
    kicker: 'Marrakech · MRE · investisseurs étrangers',
    h1a: 'Felexia Conseils',
    h1b: 'Créez et développez',
    h1c: 'votre entreprise au Maroc.',
    lead: 'Un cabinet à Marrakech pour la création de société, la domiciliation et les modifications. Un devis précède tout engagement.',
    primary: 'Créer une société',
    quiet: 'Demander un devis',
    services: 'Ce que le cabinet prend en charge',
    b1: 'Création de société', b1d: 'SARL, SARL AU et les autres formes, selon votre activité.',
    b2: 'Domiciliation', b2d: 'Une adresse de siège à Marrakech, avec le contrat et l’attestation.',
    b3: 'Modification', b3d: 'Gérance, siège, dénomination, capital ou activité.',
    b4: 'MRE et étrangers', b4d: 'Une procuration permet d’avancer lorsque vous n’êtes pas au Maroc.',
    b5: 'Devis', b5d: 'Le montant est établi selon votre dossier, avant de commencer.',
    b6: 'Trois langues', b6d: 'Le cabinet vous répond en français, en anglais et en arabe.',
    steps: 'Comment le dossier avance',
    stepsP: 'Les pièces et l’ordre se précisent avec le cabinet.',
    t1: 'Échange', t1d: 'Votre situation, la forme envisagée et les pièces à réunir.',
    t2: 'Statuts', t2d: 'Rédaction et signature, y compris par procuration.',
    t3: 'Dossier', t3d: privateAdvice.fr,
    t4: 'Suite', t4d: 'Domiciliation, modifications et questions après l’immatriculation.',
    close: 'Parlons de votre projet.',
    closeP: 'Écrivez au cabinet ou prenez rendez-vous. Le devis vient avant l’engagement.',
    book: 'Prendre rendez-vous',
    advice: privateAdvice.fr,
    paperA: 'Statuts', paperB: 'Dossier',
    more: 'Pour aller plus loin',
    l1: 'Création de société au Maroc', l2: 'Domiciliation à Marrakech', l3: 'Modifier une société', l4: 'Créer une SARL', l5: 'Créer depuis l’étranger', l6: 'Tous les guides'
  },
  en: {
    kicker: 'Marrakech · Moroccans abroad · foreign investors',
    h1a: 'Felexia Conseils',
    h1b: 'Form and grow',
    h1c: 'your company in Morocco.',
    lead: 'A Marrakech firm for company formation, a registered office and later changes. A quote comes before any commitment.',
    primary: 'Form a company',
    quiet: 'Request a quote',
    services: 'What the firm handles',
    b1: 'Company formation', b1d: 'SARL, single-member SARL and other forms, matched to the activity.',
    b2: 'Registered office', b2d: 'A Marrakech address, with the contract and the certificate.',
    b3: 'Amendments', b3d: 'Manager, address, name, capital or business activity.',
    b4: 'From abroad', b4d: 'A power of attorney lets the filing move forward while you are away.',
    b5: 'A quote', b5d: 'The fee is set from your file, before work begins.',
    b6: 'Three languages', b6d: 'The firm replies in French, English and Arabic.',
    steps: 'How a file moves forward',
    stepsP: 'The documents and their order are confirmed with the firm.',
    t1: 'A conversation', t1d: 'Your situation, the form you have in mind and the papers to gather.',
    t2: 'Bylaws', t2d: 'Drafting and signature, including under a power of attorney.',
    t3: 'File', t3d: privateAdvice.en,
    t4: 'Afterward', t4d: 'Domiciliation, amendments and questions once the company exists.',
    close: 'Tell us about the project.',
    closeP: 'Write to the firm or book a meeting. The quote comes first.',
    book: 'Book a meeting',
    advice: privateAdvice.en,
    paperA: 'Bylaws', paperB: 'File',
    more: 'Read on',
    l1: 'Form a company in Morocco', l2: 'Domiciliation in Marrakech', l3: 'Amend a company', l4: 'Form an SARL', l5: 'Form a company from abroad', l6: 'All guides'
  },
  ar: {
    kicker: 'مراكش · مغاربة العالم · مستثمرون أجانب',
    h1a: 'فيليكسيا كونساي',
    h1b: 'أسّسوا وطوّروا',
    h1c: 'شركتكم في المغرب.',
    lead: 'مكتب بمراكش لتأسيس الشركات والتوطين والتعديلات. يسبق كل التزام عرض سعر.',
    primary: 'تأسيس شركة',
    quiet: 'طلب عرض سعر',
    services: 'ما يتولاه المكتب',
    b1: 'تأسيس شركة', b1d: 'SARL وSARL AU والصيغ الأخرى، حسب النشاط.',
    b2: 'التوطين', b2d: 'عنوان مقر بمراكش، مع العقد والشهادة.',
    b3: 'التعديل', b3d: 'التسيير، المقر، التسمية، رأس المال أو النشاط.',
    b4: 'من الخارج', b4d: 'تتيح الوكالة تقدم الملف وأنتم خارج المغرب.',
    b5: 'عرض سعر', b5d: 'يُحدد المبلغ حسب الملف، قبل البدء.',
    b6: 'ثلاث لغات', b6d: 'يجيب المكتب بالفرنسية والإنجليزية والعربية.',
    steps: 'كيف يتقدم الملف',
    stepsP: 'تتضح الوثائق وترتيبها مع المكتب.',
    t1: 'تبادل', t1d: 'وضعكم، والصيغة المتوقعة، والوثائق اللازمة.',
    t2: 'النظام الأساسي', t2d: 'الصياغة والتوقيع، بما في ذلك عبر وكالة.',
    t3: 'الملف', t3d: privateAdvice.ar,
    t4: 'المتابعة', t4d: 'التوطين والتعديلات والأسئلة بعد التسجيل.',
    close: 'لنتحدث عن مشروعكم.',
    closeP: 'اكتبوا إلى المكتب أو احجزوا موعداً. عرض السعر يسبق الالتزام.',
    book: 'حجز موعد',
    advice: privateAdvice.ar,
    paperA: 'النظام الأساسي', paperB: 'الملف',
    more: 'للمتابعة',
    l1: 'تأسيس شركة في المغرب', l2: 'التوطين بمراكش', l3: 'تعديل شركة', l4: 'تأسيس SARL', l5: 'التأسيس من الخارج', l6: 'جميع الأدلة'
  }
};

function heroArt() {
  return `<svg class="d-scene" viewBox="0 0 640 520" aria-hidden="true">
    <defs>
      <linearGradient id="d-sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e7f6ff"/><stop offset=".5" stop-color="#9eb6ff"/><stop offset="1" stop-color="#2446d8"/></linearGradient>
      <linearGradient id="d-face" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f9ff"/><stop offset="1" stop-color="#d5e2ff"/></linearGradient>
      <linearGradient id="d-side" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6f93ff"/><stop offset="1" stop-color="#2446d8"/></linearGradient>
      <linearGradient id="d-sea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#39c3ff"/><stop offset="1" stop-color="#2446d8"/></linearGradient>
    </defs>
    <ellipse cx="210" cy="470" rx="150" ry="18" fill="#2446d8" opacity=".08"/>
    <ellipse cx="470" cy="210" rx="90" ry="16" fill="#2446d8" opacity=".08"/>
    <g class="d-bob"><g transform="translate(-16,24) scale(1.18)">
      <polygon points="70,300 250,236 330,278 150,344" fill="#e7f0ff"/>
      <polygon points="150,344 330,278 330,328 150,394" fill="url(#d-side)"/>
      <polygon points="70,300 150,344 150,394 70,350" fill="#c5d6ff"/>
      <path d="M120 322l90-28 36 16M140 338l96-30M168 286l52 18" fill="none" stroke="#2446d8" stroke-width="2.2" opacity=".5"/>
      <path d="M214 258l16 9-16 26-16-9z" fill="#2446d8"/>
      <circle cx="230" cy="250" r="9" fill="#39c3ff"/>
    </g></g>
    <g class="d-bob d-bob-late"><g transform="translate(-8,8) scale(1.28)">
      <polygon points="118,78 188,112 118,146 48,112" fill="url(#d-face)"/>
      <polygon points="48,112 118,146 118,224 48,190" fill="#b7cbff"/>
      <polygon points="118,146 188,112 188,190 118,224" fill="url(#d-side)"/>
      <path d="M70 158h26v32H70zM102 158h26v20h-26zM136 158h26v32h-26zM70 196h26v16H70z" fill="#fff" opacity=".9"/>
      <path d="M102 186h26v34h-26z" fill="#0e1730" opacity=".22"/>
    </g></g>
    <g class="d-spin">
      <circle cx="512" cy="128" r="78" fill="url(#d-sea)"/>
      <ellipse cx="512" cy="128" rx="32" ry="78" fill="none" stroke="#fff" stroke-width="2.4" opacity=".75"/>
      <ellipse cx="512" cy="128" rx="78" ry="26" fill="none" stroke="#fff" stroke-width="2.4" opacity=".75"/>
      <path d="M458 106c22 10 36 10 58-4 14 20 10 38-6 54-26-8-44-4-60 8-10-20-6-40 8-58z" fill="#e7f6ff" opacity=".4"/>
    </g>
    <g class="d-stamp">
      <circle cx="500" cy="392" r="42" fill="#fff"/>
      <circle cx="500" cy="392" r="33" fill="none" stroke="#2446d8" stroke-width="3.2"/>
      <circle cx="500" cy="392" r="24" fill="none" stroke="#39c3ff" stroke-width="2.2"/>
      <path d="M486 392l9 9 18-20" fill="none" stroke="#2446d8" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;
}

function art(kind, id) {
  const head = `<svg class="d-art d-art-${kind}" viewBox="0 0 160 120" aria-hidden="true"><defs><linearGradient id="a-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d7e6ff"/><stop offset="1" stop-color="#2446d8"/></linearGradient><linearGradient id="b-${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c9d8ff"/></linearGradient></defs>`;
  const scenes = {
    create: `<ellipse cx="80" cy="104" rx="46" ry="8" fill="#2446d8" opacity=".1"/><polygon points="34,34 80,18 126,34 80,50" fill="url(#b-${id})"/><polygon points="34,34 80,50 80,86 34,70" fill="#b9ccff"/><polygon points="80,50 126,34 126,70 80,86" fill="url(#a-${id})"/><polygon points="48,28 86,16 118,28 80,40" fill="#fff" opacity=".9"/><circle cx="112" cy="62" r="14" fill="#fff" stroke="#2446d8" stroke-width="3"/><path d="M106 62l4 4 8-9" fill="none" stroke="#2446d8" stroke-width="2.4" stroke-linecap="round"/>`,
    home: `<ellipse cx="80" cy="106" rx="42" ry="7" fill="#2446d8" opacity=".1"/><polygon points="80,16 128,40 80,64 32,40" fill="url(#b-${id})"/><polygon points="32,40 80,64 80,96 32,72" fill="#c5d4ff"/><polygon points="80,64 128,40 128,72 80,96" fill="url(#a-${id})"/><rect x="70" y="72" width="16" height="20" rx="2" fill="#fff"/><path class="d-key" d="M46 78h18v6H46zM40 74h10v14H40z" fill="#2446d8"/>`,
    gears: `<circle class="d-gear" cx="62" cy="58" r="28" fill="none" stroke="url(#a-${id})" stroke-width="10" stroke-dasharray="8 7"/><circle cx="62" cy="58" r="8" fill="#2446d8"/><circle class="d-gear d-gear-b" cx="104" cy="78" r="18" fill="none" stroke="#39c3ff" stroke-width="8" stroke-dasharray="6 6"/><circle cx="104" cy="78" r="5" fill="#0e1730"/>`,
    globe: `<circle class="d-spin" cx="80" cy="58" r="36" fill="url(#a-${id})"/><ellipse cx="80" cy="58" rx="16" ry="36" fill="none" stroke="#fff" opacity=".75"/><ellipse cx="80" cy="58" rx="36" ry="12" fill="none" stroke="#fff" opacity=".75"/><path d="M58 48c10 4 16 4 26-2 6 10 4 18-4 24-12-4-20-2-28 4-4-10-2-18 6-26z" fill="#e7f6ff" opacity=".4"/>`,
    quote: `<polygon points="36,28 108,28 120,40 120,96 36,96" fill="url(#b-${id})"/><polygon points="108,28 120,40 108,40" fill="#2446d8"/><path d="M52 52h44M52 66h36M52 80h24" stroke="#2446d8" stroke-width="3" stroke-linecap="round"/>`,
    chat: `<rect x="28" y="24" width="104" height="64" rx="16" fill="url(#b-${id})"/><path d="M58 88l8-12h18" fill="#d5e2ff"/><circle cx="62" cy="56" r="5" fill="#2446d8"/><circle cx="80" cy="56" r="5" fill="#39c3ff"/><circle cx="98" cy="56" r="5" fill="#2446d8"/>`
  };
  return `${head}${scenes[kind]}</svg>`;
}

function markup(lang) {
  const c = copy[lang];
  const p = (path) => `/${lang}/${path}`;
  const tiles = [
    ['create', 'creation-entreprise/', c.b1, c.b1d],
    ['home', 'domiciliation/', c.b2, c.b2d],
    ['gears', 'modify-company/', c.b3, c.b3d],
    ['globe', 'guides/mre-etranger/', c.b4, c.b4d],
    ['quote', 'tarif/creation/', c.b5, c.b5d],
    ['chat', 'contact/', c.b6, c.b6d]
  ];
  const grid = tiles.map(([kind, href, title, text], index) => `<a class="d-tile d-s${index}" href="${p(href)}">${art(kind, `t${index}`)}<h3>${title}</h3><p>${text}</p></a>`).join('');
  const steps = [
    ['quote', c.t1, c.t1d],
    ['create', c.t2, c.t2d],
    ['home', c.t3, c.t3d],
    ['gears', c.t4, c.t4d]
  ].map(([kind, title, text], index) => `<li class="d-s${index}">${art(kind, `s${index}`)}<span>0${index + 1}</span><h3>${title}</h3><p>${text}</p></li>`).join('');
  return `<div class="d">
  <section class="d-hero">
    <div class="d-copy">
      <p class="d-kicker">${c.kicker}</p>
      <h1><span class="d-grad">${c.h1b}</span> ${c.h1c}</h1>
      <p class="d-brand">${c.h1a}</p>
      <p class="d-lead">${c.lead}</p>
      <p class="d-scope">${c.advice}</p>
      <p class="d-actions"><a class="d-primary" href="${p('create/')}">${c.primary}</a><a class="d-quiet" href="${p('contact/')}">${c.quiet}</a></p>
    </div>
    <div class="d-stage">
      <div class="d-back"><div class="d-y">${heroArt()}</div></div>
      <div class="d-front"><div class="d-y">
        <article class="d-sheet d-sheet-a"><strong>${c.paperA}</strong><span></span><span></span><span></span></article>
        <article class="d-sheet d-sheet-b"><strong>${c.paperB}</strong><span></span><span></span></article>
      </div></div>
    </div>
  </section>
  <section class="d-bento" aria-labelledby="d-services" data-reveal>
    <h2 id="d-services">${c.services}</h2>
    <div class="d-grid">${grid}</div>
  </section>
  <section class="d-steps" aria-labelledby="d-steps" data-reveal>
    <div class="d-steps-head"><h2 id="d-steps">${c.steps}</h2><p>${c.stepsP}</p></div>
    <ol>${steps}</ol>
  </section>
  <section class="d-close" data-reveal>
    <div><h2>${c.close}</h2><p>${c.closeP}</p></div>
    <p class="d-actions"><a class="d-primary" href="${p('rendez-vous/')}">${c.book}</a><a class="d-quiet" href="${p('contact/')}">${c.quiet}</a></p>
  </section>
  <nav class="d-more" aria-label="${c.more}">
    <a href="${p('creation-entreprise/')}">${c.l1}</a>
    <a href="${p('domiciliation/')}">${c.l2}</a>
    <a href="${p('modify-company/')}">${c.l3}</a>
    <a href="${p('guides/creer-une-sarl-maroc/')}">${c.l4}</a>
    <a href="${p('guides/mre-etranger/')}">${c.l5}</a>
    <a href="${p('guides/')}">${c.l6}</a>
  </nav>
</div>`;
}

export function applyHomepage($, lang) {
  $('body').addClass('fx-home fx-home-d');
  $('main').html(markup(lang));
  $('footer .felexia-languages').attr('hidden', '');
  $('head').append(`<link rel="stylesheet" href="/home-direction.css?v=${version}"><link rel="preload" href="/assets/fonts/font-14.woff2" as="font" type="font/woff2" crossorigin="anonymous"><script src="/home-direction.js?v=${version}" defer></script>`);
}
