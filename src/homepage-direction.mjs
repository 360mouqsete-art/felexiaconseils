import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const version = createHash('sha256').update(readFileSync(new URL('../public/home-direction.css', import.meta.url))).digest('hex').slice(0,12);

const copy = {
  fr: {
    kicker: 'Felexia Conseils · Marrakech',
    h1: 'Que voulez-vous préparer au Maroc ?',
    lead: 'Création de société, domiciliation ou modification. Un cabinet à Mabrouka vous répond, en français, en anglais ou en arabe.',
    choose: 'Choisir une démarche',
    c1: 'Créer une société', c1d: 'SARL, SARL AU ou une autre forme',
    c2: 'Domicilier', c2d: 'Une adresse à Marrakech',
    c3: 'Modifier', c3d: 'Gérant, siège, capital ou objet',
    steps: 'Le parcours, en quatre temps',
    t1: 'Vous décrivez le projet', t1d: 'Activité, associés, nom et siège envisagés.',
    t2: 'Le cabinet cadre la mission', t2d: 'Pièces, signatures et périmètre de l’accompagnement.',
    t3: 'Vous signez', t3d: 'Les documents et, si besoin, les procurations.',
    t4: 'Les formalités partent', t4d: 'Le dossier administratif vous est remis.',
    packs: 'Trois packs, toujours sur devis',
    packsP: 'Essentiel, Pro et Premium reprennent les mêmes familles de formalités. Les honoraires, les frais administratifs et les options sont séparés dans la proposition. Aucun montant n’est fixé sur cette page.',
    row: 'Poste', yes: 'Prévu',
    r1: 'Création de société', r2: 'Statuts', r3: 'Registre de commerce', r4: 'Identifiant fiscal', r5: 'Affiliation CNSS',
    quote: 'Voir les packs et demander un devis',
    close: 'Présentez votre projet',
    closeP: 'Rendez-vous à Mabrouka ou échange à distance. Le devis précède l’engagement.',
    primary: 'Créer mon entreprise', book: 'Préparer un rendez-vous',
    more: 'Aller plus loin',
    l1: 'Le détail de la création', l2: 'Créer une SARL', l3: 'SARL à Marrakech', l4: 'Depuis l’étranger', l5: 'Tous les guides', l6: 'Contacter le cabinet'
  },
  en: {
    kicker: 'Felexia Conseils · Marrakech',
    h1: 'What do you want to prepare in Morocco?',
    lead: 'Company formation, domiciliation or a company change. A firm in Mabrouka replies in French, English or Arabic.',
    choose: 'Choose a path',
    c1: 'Form a company', c1d: 'SARL, single-member SARL or another form',
    c2: 'Domicile it', c2d: 'An address in Marrakech',
    c3: 'Change it', c3d: 'Manager, office, capital or purpose',
    steps: 'The path, in four steps',
    t1: 'You describe the project', t1d: 'Activity, shareholders, proposed name and office.',
    t2: 'The firm scopes the work', t2d: 'Documents, signatures and the support included.',
    t3: 'You sign', t3d: 'The papers and, where needed, powers of attorney.',
    t4: 'Formalities are filed', t4d: 'You receive the administrative file.',
    packs: 'Three packages, always quoted',
    packsP: 'Essential, Pro and Premium cover the same families of formalities. Fees, administrative charges and options are separated in the proposal. No amount is fixed on this page.',
    row: 'Item', yes: 'Included in the quote',
    r1: 'Company formation', r2: 'Articles', r3: 'Trade register', r4: 'Tax identifier', r5: 'CNSS affiliation',
    quote: 'See the packages and request a quote',
    close: 'Tell us about your project',
    closeP: 'An appointment in Mabrouka, or a remote discussion. The quote comes before any commitment.',
    primary: 'Start my company', book: 'Request an appointment',
    more: 'Continue reading',
    l1: 'Formation in detail', l2: 'Form a SARL', l3: 'A SARL in Marrakech', l4: 'From abroad', l5: 'All guides', l6: 'Contact the firm'
  },
  ar: {
    kicker: 'Felexia Conseils · مراكش',
    h1: 'ماذا تريد أن تحضّر في المغرب؟',
    lead: 'تأسيس أو توطين أو تعديل. مكتب بمبروكة يجيب بالفرنسية أو الإنجليزية أو العربية.',
    choose: 'اختيار المسار',
    c1: 'تأسيس شركة', c1d: 'SARL أو SARL AU أو شكل آخر',
    c2: 'التوطين', c2d: 'عنوان بمراكش',
    c3: 'التعديل', c3d: 'المسيّر أو المقر أو رأس المال أو الغرض',
    steps: 'المسار في أربع خطوات',
    t1: 'تصف المشروع', t1d: 'النشاط والشركاء والاسم والمقر المرتقب.',
    t2: 'يحدد المكتب المهمة', t2d: 'الوثائق والتوقيعات ونطاق المواكبة.',
    t3: 'توقّع', t3d: 'الوثائق والوكالات عند الحاجة.',
    t4: 'تُودع الإجراءات', t4d: 'تصلك وثائق الملف الإداري.',
    packs: 'ثلاث عروض، دائماً حسب دراسة الملف',
    packsP: 'تغطي العروض الأساسية والاحترافية والممتازة نفس عائلات الإجراءات. تُفصل الأتعاب والمصاريف الإدارية والخيارات في العرض. لا يُثبَّت أي مبلغ في هذه الصفحة.',
    row: 'البند', yes: 'ضمن العرض',
    r1: 'تأسيس الشركة', r2: 'النظام الأساسي', r3: 'السجل التجاري', r4: 'المعرف الضريبي', r5: 'الانخراط في CNSS',
    quote: 'اطلع على العروض واطلب تسعيرة',
    close: 'اعرض مشروعك',
    closeP: 'موعد بمبروكة أو تبادل عن بُعد. يسبق العرض أي التزام.',
    primary: 'إنشاء مقاولتي', book: 'تحضير موعد',
    more: 'للمتابعة',
    l1: 'تفاصيل التأسيس', l2: 'تأسيس SARL', l3: 'SARL بمراكش', l4: 'من الخارج', l5: 'جميع الأدلة', l6: 'التواصل مع المكتب'
  }
};

function cell(label) { return `<td>${label}</td>`; }

function markup(lang) {
  const c = copy[lang];
  const p = path => `/${lang}/${path}`;
  const row = name => `<tr><th scope="row">${name}</th>${cell(c.yes)}${cell(c.yes)}${cell(c.yes)}</tr>`;
  return `<div class="b">
  <section class="b-hero">
    <div class="b-copy">
      <p class="b-kicker">${c.kicker}</p>
      <h1>${c.h1}</h1>
      <p>${c.lead}</p>
    </div>
    <nav class="b-chooser" aria-label="${c.choose}">
      <a href="${p('creation-entreprise/')}"><span>01</span><strong>${c.c1}</strong><small>${c.c1d}</small></a>
      <a href="${p('domiciliation/')}"><span>02</span><strong>${c.c2}</strong><small>${c.c2d}</small></a>
      <a href="${p('modify-company/')}"><span>03</span><strong>${c.c3}</strong><small>${c.c3d}</small></a>
    </nav>
  </section>
  <section class="b-steps" aria-labelledby="b-steps-title">
    <h2 id="b-steps-title">${c.steps}</h2>
    <ol>
      <li><span>1</span><h3>${c.t1}</h3><p>${c.t1d}</p></li>
      <li><span>2</span><h3>${c.t2}</h3><p>${c.t2d}</p></li>
      <li><span>3</span><h3>${c.t3}</h3><p>${c.t3d}</p></li>
      <li><span>4</span><h3>${c.t4}</h3><p>${c.t4d}</p></li>
    </ol>
  </section>
  <section class="b-packs" aria-labelledby="b-packs-title">
    <h2 id="b-packs-title">${c.packs}</h2>
    <p>${c.packsP}</p>
    <div class="b-table-wrap">
      <table class="b-table">
        <thead><tr><th scope="col">${c.row}</th><th scope="col">Essentiel</th><th scope="col">Pro</th><th scope="col">Premium</th></tr></thead>
        <tbody>${row(c.r1)}${row(c.r2)}${row(c.r3)}${row(c.r4)}${row(c.r5)}</tbody>
      </table>
    </div>
    <a class="b-primary" href="${p('tarif/creation/')}">${c.quote}</a>
  </section>
  <section class="b-close">
    <div>
      <h2>${c.close}</h2>
      <p>${c.closeP}</p>
    </div>
    <div class="b-actions">
      <a class="b-primary" href="${p('create/')}">${c.primary}</a>
      <a class="b-secondary" href="${p('rendez-vous/')}">${c.book}</a>
    </div>
  </section>
  <nav class="b-more" aria-label="${c.more}">
    <a href="${p('creation-entreprise/')}">${c.l1}</a>
    <a href="${p('guides/creer-une-sarl-maroc/')}">${c.l2}</a>
    <a href="${p('guides/creation-sarl-marrakech/')}">${c.l3}</a>
    <a href="${p('guides/mre-etranger/')}">${c.l4}</a>
    <a href="${p('guides/')}">${c.l5}</a>
    <a href="${p('contact/')}">${c.l6}</a>
  </nav>
</div>`;
}

export function applyHomepage($, lang) {
  $('body').addClass('fx-home fx-home-b');
  $('main').html(markup(lang));
  $('head').append(`<link rel="stylesheet" href="/home-direction.css?v=${version}"><link rel="preload" href="/assets/fonts/font-14.woff2" as="font" type="font/woff2" crossorigin="anonymous">`);
}
