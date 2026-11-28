import {load} from 'cheerio';
import {company} from './content.mjs';
import {shortContactForm} from './forms.mjs';

const merci = {
  fr: {
    title: 'Demande envoyée | Felexia Conseils',
    description: 'Le cabinet a reçu votre demande et vous répond sur WhatsApp.',
    heading: 'Votre demande est envoyée.',
    text: 'Felexia Conseils vous répond sur WhatsApp. Le cabinet vous conseille et vous accompagne dans la préparation du dossier.'
  },
  en: {
    title: 'Request sent | Felexia Conseils',
    description: 'The firm has received your request and will reply on WhatsApp.',
    heading: 'Your request has been sent.',
    text: 'Felexia Conseils will reply on WhatsApp. The firm advises you and supports you while you prepare the file.'
  },
  ar: {
    title: 'تم إرسال الطلب | Felexia Conseils',
    description: 'توصل المكتب بالطلب وسيرد عبر واتساب.',
    heading: 'تم إرسال طلبك.',
    text: 'سترسل Felexia Conseils الرد عبر واتساب. المكتب ينصحكم ويواكبكم في إعداد الملف.'
  }
};

function stamp(shell, lang, {title, description, main, languages}) {
  const $ = load(shell);
  $('html').attr({lang, dir: lang === 'ar' ? 'rtl' : 'ltr'});
  $('body').attr('data-lang', lang);
  $('title').text(title);
  $('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').attr('content', description);
  $('meta[property="og:title"],meta[name="twitter:title"]').attr('content', title);
  $('header [data-language-switch] a').each((_, anchor) => {
    const target = $(anchor).attr('lang');
    const choice = languages[target];
    $(anchor).attr({href: choice.href, 'data-language-target': choice.target});
    if (target === lang) $(anchor).attr('aria-current', 'true');
    else $(anchor).removeAttr('aria-current');
  });
  $('main').attr('id', 'main').html(main);
  return $.html();
}

function merciMain(lang) {
  const copy = merci[lang];
  return `<section class="felexia-extra-section"><h1>${copy.heading}</h1><p>${copy.text}</p><p><a class="felexia-action" href="https://wa.me/${company.whatsapp}">WhatsApp · ${company.whatsappDisplay}</a></p></section><script type="module" src="/thanks.js"></script>`;
}

function darijaMain() {
  return `<section class="felexia-extra-section"><p class="felexia-eyebrow">مراكش</p><h1>أسّس الشركة ديالك فالمغرب، مع مكتب خاص</h1><p>فيليكسيا كونساي مكتب استشارة خاص. ماشي إدارة وماشي موقع رسمي. كننصحوك وكنرافقوك باش تحضّر الملف. ما كنسلموش الوثائق الرسمية.</p><p class="d-actions"><a class="felexia-action" href="https://wa.me/${company.whatsapp}">واتساب ${company.whatsappDisplay}</a></p><h2>شنو كنقدرو نعاونوك فيه</h2><ul><li>تأسيس الشركة: كننصحوك فاختيار الشكل وكنرافقوك فتحضير الملف.</li><li>التوطين: عنوان المقر كيتحدد معاك على حساب النشاط.</li><li>التعديل: المسير، المقر، الاسم ولا النشاط، كنحضرو القرار معاك.</li></ul><h2>كيفاش كيمشي الملف</h2><ol><li>كتهضر معانا على الوضع ديالك.</li><li>كنحضرو الوثائق معاك.</li><li>الهيئات العمومية هي اللي كتكمّل وتسلّم الوثائق الرسمية.</li></ol>${shortContactForm('ar').replace('<h2>راسل المكتب</h2>', '<h2>صيفط لينا فالواتساب</h2>')}</section>`;
}

export function addConversionPages(pages) {
  for (const lang of ['fr', 'en', 'ar']) {
    const shell = pages[`${lang}/index.html`];
    if (!shell) continue;
    const languages = {
      fr: {href: '/fr/merci/', target: 'equivalent'},
      en: {href: '/en/merci/', target: 'equivalent'},
      ar: {href: '/ar/merci/', target: 'equivalent'}
    };
    pages[`${lang}/merci/index.html`] = stamp(shell, lang, {...merci[lang], main: merciMain(lang), languages});
  }
  const arabic = pages['ar/index.html'];
  if (arabic) pages['ar/darija/index.html'] = stamp(arabic, 'ar', {
    title: 'تأسيس الشركة فالمغرب | Felexia Conseils',
    description: 'مكتب خاص كينصحك ويرافقك فتأسيس الشركة والتوطين والتعديل. ماشي موقع رسمي.',
    main: darijaMain(),
    languages: {
      fr: {href: '/fr/', target: 'section'},
      en: {href: '/en/', target: 'section'},
      ar: {href: '/ar/darija/', target: 'equivalent'}
    }
  });
  return pages;
}
