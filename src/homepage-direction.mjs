import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const css = readFileSync(new URL('../public/home-direction.css', import.meta.url));
const js = readFileSync(new URL('../public/home-direction.js', import.meta.url));
const version = createHash('sha256').update(css).update(js).digest('hex').slice(0,12);

const svg = (body) => `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
const stroke = 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
const icons = {
  file: svg(`<path ${stroke} d="M7 3.5h6.5L19 9v11.5H7z"/><path ${stroke} d="M13.5 3.5V9H19"/>`),
  pen: svg(`<path ${stroke} d="M4 20l4.2-1.1L19.2 8a2.1 2.1 0 0 0-3-3L5.2 15.9z"/>`),
  building: svg(`<path ${stroke} d="M4 20.5V9l8-4.5 8 4.5v11.5"/><path ${stroke} d="M9 20.5v-5h6v5"/>`),
  id: svg(`<rect ${stroke} x="4" y="6" width="16" height="12" rx="2"/><path ${stroke} d="M8 11h6M8 14.5h3.5"/>`),
  shield: svg(`<path ${stroke} d="M12 3.5l7 2.6v6.2c0 4-2.7 6.8-7 8.4-4.3-1.6-7-4.4-7-8.4V6.1z"/>`),
  plus: svg(`<path ${stroke} d="M12 6v12M6 12h12"/>`),
  pin: svg(`<path ${stroke} d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"/><circle ${stroke} cx="12" cy="11" r="2"/>`),
  refresh: svg(`<path ${stroke} d="M20 12a8 8 0 1 1-2.3-5.6"/><path ${stroke} d="M20 4.5V9h-4.5"/>`),
  globe: svg(`<circle ${stroke} cx="12" cy="12" r="8"/><path ${stroke} d="M4 12h16M12 4c2.2 2.4 3.2 5.1 3.2 8s-1 5.6-3.2 8c-2.2-2.4-3.2-5.1-3.2-8s1-5.6 3.2-8z"/>`),
  quote: svg(`<path ${stroke} d="M6 17.5V8.5A2.5 2.5 0 0 1 8.5 6H15"/><path ${stroke} d="M9 17.5h9.5V10"/>`),
  chat: svg(`<path ${stroke} d="M5 16.5V7.5A2 2 0 0 1 7 5.5h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9z"/>`)
};

const copy = {
  fr: {
    kicker: 'Cabinet · Mabrouka, Marrakech',
    h1a: 'Felexia Conseils', h1b: 'créez et développez', h1c: 'votre entreprise au Maroc.',
    lead: 'Création de société, domiciliation et modification. Un interlocuteur du cabinet, en français, en anglais ou en arabe.',
    primary: 'Créer mon entreprise', quiet: 'Écrire au cabinet',
    board: 'Aperçu illustré', boardNote: 'Les pièces se précisent avec le cabinet. Aucun délai n’est affiché.',
    rows: [['file','Certificat négatif','À préparer'],['pen','Statuts','À préparer'],['building','Registre de commerce','À préparer'],['id','ICE','À préparer'],['shield','CNSS','À préparer']],
    services: 'Ce que le cabinet prépare',
    b1: 'Création', b1d: 'SARL, SARL AU ou une autre forme, examinée avec vous.',
    b2: 'Domiciliation', b2d: 'Une adresse à Marrakech. Le devis sépare l’adresse, le courrier et les honoraires.',
    b3: 'Modification', b3d: 'Gérant, siège, capital ou objet, selon vos statuts.',
    b4: 'Depuis l’étranger', b4d: 'MRE et investisseurs : un premier échange à distance, puis le dossier.',
    b5: 'Devis avant engagement', b5d: 'Honoraires, frais administratifs et options sont séparés dans la proposition.',
    b6: 'Trois langues', b6d: 'Français, anglais et arabe.',
    steps: 'Comment le dossier avance',
    stepsP: 'Un parcours organisé avec votre interlocuteur. Les délais dépendent du dossier et ne sont pas garantis ici.',
    t1: 'Vous décrivez le projet', t1d: 'Activité, associés, nom et siège envisagés.',
    t2: 'Le cabinet cadre la mission', t2d: 'Pièces, signatures et périmètre de l’accompagnement.',
    t3: 'Vous signez', t3d: 'Les documents et, si besoin, les procurations.',
    t4: 'Les formalités partent', t4d: 'Le dossier administratif vous est remis.',
    close: 'Présentez votre projet',
    closeP: 'Rendez-vous à Mabrouka, ou échange à distance. Résidence Al Ihssane, Immeuble 3, Appartement 4, Marrakech.',
    book: 'Préparer un rendez-vous',
    more: 'Aller plus loin',
    l1: 'Création de société au Maroc', l2: 'Domiciliation à Marrakech', l3: 'Modifier une société', l4: 'Créer une SARL', l5: 'Entreprendre depuis l’étranger', l6: 'Tous les guides'
  },
  en: {
    kicker: 'Firm · Mabrouka, Marrakech',
    h1a: 'Felexia Conseils', h1b: 'start and grow', h1c: 'your business in Morocco.',
    lead: 'Company formation, domiciliation and company changes. Someone at the firm, in French, English or Arabic.',
    primary: 'Start my company', quiet: 'Write to the firm',
    board: 'Illustrated preview', boardNote: 'The papers are confirmed with the firm. No timeline is shown.',
    rows: [['file','Negative certificate','To prepare'],['pen','Articles','To prepare'],['building','Trade register','To prepare'],['id','ICE','To prepare'],['shield','CNSS','To prepare']],
    services: 'What the firm prepares',
    b1: 'Formation', b1d: 'A SARL, single-member SARL or another form, reviewed with you.',
    b2: 'Domiciliation', b2d: 'An address in Marrakech. The quote separates the address, mail and fees.',
    b3: 'Changes', b3d: 'Manager, office, capital or purpose, under your articles.',
    b4: 'From abroad', b4d: 'Moroccans abroad and investors: a remote discussion first, then the file.',
    b5: 'A quote before you commit', b5d: 'Fees, administrative charges and options are separated in the proposal.',
    b6: 'Three languages', b6d: 'French, English and Arabic.',
    steps: 'How the file moves forward',
    stepsP: 'A path organised with your adviser. Timing depends on the file and is not guaranteed here.',
    t1: 'You describe the project', t1d: 'Activity, shareholders, proposed name and office.',
    t2: 'The firm scopes the work', t2d: 'Documents, signatures and the support included.',
    t3: 'You sign', t3d: 'The papers and, where needed, powers of attorney.',
    t4: 'Formalities are filed', t4d: 'You receive the administrative file.',
    close: 'Tell us about your project',
    closeP: 'An appointment in Mabrouka, or a remote discussion. Résidence Al Ihssane, Building 3, Apartment 4, Marrakech.',
    book: 'Request an appointment',
    more: 'Continue reading',
    l1: 'Company formation in Morocco', l2: 'Domiciliation in Marrakech', l3: 'Change a company', l4: 'Form a SARL', l5: 'Starting from abroad', l6: 'All guides'
  },
  ar: {
    kicker: 'المكتب · مبروكة، مراكش',
    h1a: 'Felexia Conseils', h1b: 'أسّس وطوّر', h1c: 'مقاولتك في المغرب.',
    lead: 'تأسيس وتوطين وتعديل. مخاطب من المكتب، بالفرنسية أو الإنجليزية أو العربية.',
    primary: 'إنشاء مقاولتي', quiet: 'مراسلة المكتب',
    board: 'معاينة توضيحية', boardNote: 'تُحدَّد الوثائق مع المكتب. لا يُعرض أي أجل.',
    rows: [['file','الشهادة السلبية','للتحضير'],['pen','النظام الأساسي','للتحضير'],['building','السجل التجاري','للتحضير'],['id','ICE','للتحضير'],['shield','CNSS','للتحضير']],
    services: 'ما يحضّره المكتب',
    b1: 'التأسيس', b1d: 'SARL أو SARL AU أو شكل آخر، يُدرس معك.',
    b2: 'التوطين', b2d: 'عنوان بمراكش. يفصل العرض العنوان والبريد والأتعاب.',
    b3: 'التعديل', b3d: 'المسيّر أو المقر أو رأس المال أو الغرض، حسب النظام الأساسي.',
    b4: 'من الخارج', b4d: 'مغاربة العالم والمستثمرون: تبادل عن بُعد أولاً، ثم الملف.',
    b5: 'عرض قبل الالتزام', b5d: 'تُفصل الأتعاب والمصاريف الإدارية والخيارات في العرض.',
    b6: 'ثلاث لغات', b6d: 'الفرنسية والإنجليزية والعربية.',
    steps: 'كيف يتقدم الملف',
    stepsP: 'مسار منظّم مع مخاطبك. الآجال تتوقف على الملف ولا تُضمن هنا.',
    t1: 'تصف المشروع', t1d: 'النشاط والشركاء والاسم والمقر المرتقب.',
    t2: 'يحدد المكتب المهمة', t2d: 'الوثائق والتوقيعات ونطاق المواكبة.',
    t3: 'توقّع', t3d: 'الوثائق والوكالات عند الحاجة.',
    t4: 'تُودع الإجراءات', t4d: 'تصلك وثائق الملف الإداري.',
    close: 'اعرض مشروعك',
    closeP: 'موعد بمبروكة أو تبادل عن بُعد. إقامة الإحسان، العمارة 3، الشقة 4، مراكش.',
    book: 'تحضير موعد',
    more: 'للمتابعة',
    l1: 'تأسيس شركة في المغرب', l2: 'التوطين بمراكش', l3: 'تعديل شركة', l4: 'تأسيس SARL', l5: 'التأسيس من الخارج', l6: 'جميع الأدلة'
  }
};

function mesh() {
  return `<svg class="d-mesh" viewBox="0 0 720 640" aria-hidden="true"><defs><linearGradient id="d-g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d7e4ff"/><stop offset=".45" stop-color="#5d86ff"/><stop offset="1" stop-color="#2446d8"/></linearGradient><linearGradient id="d-g2" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9fbff"/><stop offset="1" stop-color="#7eb6ff"/></linearGradient></defs><path fill="url(#d-g1)" d="M40 180c80-120 260-160 420-80 140 70 250 40 250 160 0 150-120 250-280 300-150 48-330-20-360-160-20-90-40-120-30-220z"/><path fill="url(#d-g2)" opacity=".9" d="M180 60c150-20 320 40 360 150 30 80-10 150-80 190 40-70 20-150-60-200-90-56-150-20-220-140z"/></svg>`;
}

function markup(lang) {
  const c = copy[lang];
  const p = (path) => `/${lang}/${path}`;
  const rows = c.rows.map(([key, name, state], index) => `<li class="d-i${index}">${icons[key]}<span>${name}</span><em>${state}</em></li>`).join('');
  return `<div class="d">
  <section class="d-hero">
    <div class="d-copy">
      <p class="d-kicker">${c.kicker}</p>
      <h1><span class="d-line">${c.h1a}</span><span class="d-grad">${c.h1b}</span><span class="d-line">${c.h1c}</span></h1>
      <p class="d-lead">${c.lead}</p>
      <p class="d-actions"><a class="d-primary" href="${p('create/')}">${c.primary}</a><a class="d-quiet" href="${p('contact/')}">${c.quiet}</a></p>
    </div>
    <div class="d-stage">${mesh()}<div class="d-board"><header><span class="d-dots" aria-hidden="true"></span><strong>${c.board}</strong></header><ol>${rows}</ol><p>${c.boardNote}</p></div></div>
  </section>
  <section class="d-bento" aria-labelledby="d-services" data-reveal>
    <h2 id="d-services">${c.services}</h2>
    <div class="d-grid">
      <a class="d-tile" href="${p('creation-entreprise/')}">${icons.plus}<h3>${c.b1}</h3><p>${c.b1d}</p></a>
      <a class="d-tile" href="${p('domiciliation/')}">${icons.pin}<h3>${c.b2}</h3><p>${c.b2d}</p></a>
      <a class="d-tile" href="${p('modify-company/')}">${icons.refresh}<h3>${c.b3}</h3><p>${c.b3d}</p></a>
      <a class="d-tile" href="${p('guides/mre-etranger/')}">${icons.globe}<h3>${c.b4}</h3><p>${c.b4d}</p></a>
      <a class="d-tile" href="${p('tarif/creation/')}">${icons.quote}<h3>${c.b5}</h3><p>${c.b5d}</p></a>
      <a class="d-tile" href="${p('contact/')}">${icons.chat}<h3>${c.b6}</h3><p>${c.b6d}</p></a>
    </div>
  </section>
  <section class="d-steps" aria-labelledby="d-steps" data-reveal>
    <div class="d-steps-head"><h2 id="d-steps">${c.steps}</h2><p>${c.stepsP}</p></div>
    <ol>
      <li><span>01</span><h3>${c.t1}</h3><p>${c.t1d}</p></li>
      <li><span>02</span><h3>${c.t2}</h3><p>${c.t2d}</p></li>
      <li><span>03</span><h3>${c.t3}</h3><p>${c.t3d}</p></li>
      <li><span>04</span><h3>${c.t4}</h3><p>${c.t4d}</p></li>
    </ol>
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
  $('head').append(`<link rel="stylesheet" href="/home-direction.css?v=${version}"><link rel="preload" href="/assets/fonts/font-14.woff2" as="font" type="font/woff2" crossorigin="anonymous"><script src="/home-direction.js?v=${version}" defer></script>`);
}
