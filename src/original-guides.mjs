// Original Felexia guides. Facts stay qualitative: no fees, rates, delays or
// testimonials are invented. Official sources are linked at the end of each
// article. Tax-sensitive guides carry an explicit professional-review note.
import {lot1} from './guides-lot-1.mjs';
import {lot1b} from './guides-lot-1b.mjs';
import {lot1c} from './guides-lot-1c.mjs';

// dateModified stays 19 November 2026. The catalogue date and datePublished
// are the day the lot goes online.
const modified = '2026-11-19';
const lot1Published = '2026-11-19';
const cover = {
  src:'/assets/corporate/documents.jpg',
  smallSrc:'/assets/corporate/documents-small.jpg',
  width:1100,
  height:734
};

const copy = {
  questions:{fr:'Questions pratiques', en:'Practical questions', ar:'أسئلة عملية'},
  links:{fr:'Pages liées', en:'Related pages', ar:'صفحات ذات صلة'},
  sources:{fr:'Sources officielles', en:'Official sources', ar:'مصادر رسمية'},
  updated:{
    fr:'Dernière mise à jour : 19 novembre 2026. Les textes et les portails peuvent changer. Relisez la source officielle avant de décider.',
    en:'Last updated: 19 November 2026. Statutes and portals can change. Read the official source again before you decide.',
    ar:'آخر تحيين: 19 نوفمبر 2026. قد تتغير النصوص والبوابات. أعيدوا قراءة المصدر الرسمي قبل القرار.'
  },
  fiscal:{
    fr:'Sujet fiscal : ce guide ne fixe aucun taux, aucun seuil et aucun délai de déclaration. Le Code général des impôts et les lois de finances font foi. Faites vérifier votre situation auprès d’un professionnel avant d’agir.',
    en:'Tax topic: this guide sets no rate, no threshold and no filing deadline. The General Tax Code and the finance laws prevail. Have your situation checked by a professional before you act.',
    ar:'موضوع ضريبي: لا يحدد هذا الدليل أي سعر أو سقف أو أجل تصريح. المرجع هو المدونة العامة للضرائب وقوانين المالية. تحققوا من وضعيتكم لدى مهني قبل التصرف.'
  },
  caution:{
    fr:'Ce guide est informatif. Il ne remplace pas l’examen de votre dossier.',
    en:'This guide is general information. It does not replace a review of your file.',
    ar:'هذا الدليل معلومات عامة. ولا يعوّض دراسة ملفكم.'
  }
};

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function inline(language, value) {
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let html = '';
  let last = 0;
  for (const match of value.matchAll(pattern)) {
    html += esc(value.slice(last, match.index));
    const href = match[2].startsWith('http') ? match[2] : `/${language}/${match[2].replace(/^\/+|\/+$/g, '')}/`;
    html += `<a href="${esc(href)}">${esc(match[1])}</a>`;
    last = match.index + match[0].length;
  }
  return html + esc(value.slice(last));
}

function article(language, guide) {
  const t = value => value[language];
  const sections = guide.sections.map((section, index) => {
    const paragraphs = section.paragraphs.map(paragraph => `<p>${inline(language, t(paragraph))}</p>`).join('');
    const list = section.list ? `<ul>${t(section.list).map(item => `<li>${inline(language, item)}</li>`).join('')}</ul>` : '';
    return `<h2 id="etape-${index + 1}">${esc(t(section.heading))}</h2>${paragraphs}${list}`;
  }).join('');
  const faqs = guide.faqs.map(item => `<details class="seo-faq"><summary>${esc(t(item.q))}</summary><p>${inline(language, t(item.a))}</p></details>`).join('');
  const links = guide.links.map(item => `<li><a href="/${language}/${item.path}/">${esc(t(item.label))}</a></li>`).join('');
  const sources = guide.sources.map(item => `<li><a href="${esc(item.href)}">${esc(t(item.name))}</a></li>`).join('');
  const fiscal = guide.fiscal ? `<p>${esc(copy.fiscal[language])}</p>` : '';
  return `${sections}<h2 id="questions">${esc(copy.questions[language])}</h2>${faqs}<h2 id="liens">${esc(copy.links[language])}</h2><ul>${links}</ul><h2 id="sources">${esc(copy.sources[language])}</h2><p>${esc(copy.updated[language])}</p>${fiscal}<p>${esc(copy.caution[language])}</p><ul>${sources}</ul>`;
}

function publish(guide, language) {
  return {
    slug:guide.slug,
    category:guide.category[language],
    title:guide.title[language],
    excerpt:guide.description[language],
    metaTitle:`${guide.title[language]} | Felexia Conseils`,
    metaDescription:guide.description[language],
    html:article(language, guide),
    faq:guide.faqs.map(item => ({question:item.q[language], answer:item.a[language]})),
    publicationDate:guide.publishedOn,
    modifiedDate:modified,
    authors:[],
    audit:true,
    cover:{...cover, alt:guide.title[language]}
  };
}

function dated(guides, publishedOn) {
  return guides.map(guide => ({...guide, publishedOn}));
}

export function originalGuidesFor(language) {
  return dated([...lot1, ...lot1b, ...lot1c], lot1Published).map(guide => publish(guide, language));
}
