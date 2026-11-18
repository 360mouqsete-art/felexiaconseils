import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {company} from './content.mjs';
import {headerTools, languageSwitch} from './header-tools.mjs';
import {auditGuidesFor} from './audit-guides.mjs';
import {guideThemes, themeOfCategory, themeLabel} from './guide-themes.mjs';

// Extend the existing, already localised Guides templates at build time. Only
// catalogue summaries reach the browser; article bodies remain static HTML.
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const readJson = (path, fallback) => existsSync(new URL(path, import.meta.url)) ? JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8')) : fallback;
const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();
const slugify = value => normalize(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const textOf = html => normalize(load(String(html || ''), null, false).text());
const route = (slug, lang = 'fr') => `/${lang}/guides/${slug ? `${slug}/` : ''}`;
const articleFile = (slug, lang = 'fr') => `${lang}/guides/${slug}/index.html`;
const isGuideFile = file => /^(fr|en|ar)\/guides\/(?!page\/)[^/]+\/index\.html$/.test(file);
const words = value => textOf(value).split(/\s+/).filter(Boolean).length;
const designVersion = createHash('sha256').update(readFileSync(new URL('../public/design-premium.css', import.meta.url))).digest('hex').slice(0,12);
function attachDesign($) {
  $('link[href^="/design-premium.css"]').remove();
  $('head').append(`<link rel="stylesheet" href="/design-premium.css?v=${designVersion}">`);
}
const labels = {
  fr: {search:'Rechercher un guide…', searchLabel:'Rechercher dans les guides', category:'Catégorie', all:'Toutes les catégories', count:'guides', empty:'Aucun guide ne correspond à votre recherche.', practical:'Guide pratique', toc:'Sommaire', related:'À lire aussi', authors:'Texte d’origine', reading:'min de lecture', supplement:'Pour approfondir ce sujet', date:'Publié le', imageIllustration:'Illustration générée par IA.'},
  en: {search:'Search guides…', searchLabel:'Search the guides', category:'Category', all:'All categories', count:'guides', empty:'No guides match your search.', practical:'Practical guide', toc:'Contents', related:'Read next', authors:'Original text', reading:'min read', supplement:'Explore this topic further', date:'Published on', imageIllustration:'AI-generated illustration.'},
  ar: {search:'ابحث عن دليل…', searchLabel:'البحث في الأدلة', category:'التصنيف', all:'جميع التصنيفات', count:'دليل', empty:'لا توجد أدلة تطابق بحثك.', practical:'دليل عملي', toc:'المحتويات', related:'اقرأ أيضاً', authors:'النص الأصلي', reading:'دقائق للقراءة', supplement:'للتعمق في الموضوع', date:'نُشر في', imageIllustration:'صورة توضيحية مولدة بالذكاء الاصطناعي.'}
};
const categoryNames = {
  "Création d'entreprise":"Création d’entreprise",
  "Création d'Entreprise":"Création d’entreprise", 'CRÉATION D’ENTREPRISE':'Création d’entreprise',
  'Comptabilité & Fiscalité':'Comptabilité', 'GESTION & FISCALITÉ':'Comptabilité',
  'INVESTISSEMENT':'Investissement', 'Propriété Intellectuelle':'Juridique', 'Domiciliation':'Création d’entreprise'
};
const dateLabel = (value, lang) => value ? new Intl.DateTimeFormat({fr:'fr-FR',en:'en-GB',ar:'ar-MA'}[lang], {day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(value)) : labels[lang].practical;
const imageSizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';
const cardClass = 'group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-brand-pale transition hover:-translate-y-1 hover:ring-brand-ocean dark:bg-white/5 dark:ring-white/10 dark:hover:ring-brand-ocean';

function coverFor(slug, title, covers) {
  const entry = covers[slug] || {};
  return {src:entry.src || `/images/guides/${slug}.webp`, smallSrc:entry.smallSrc || `/images/guides/${slug}-640.webp`, alt:entry.alt || title, width:entry.width || 1280, height:entry.height || 800};
}

function imageAttributes(cover, eager = false, sizes = imageSizes) {
  return {src:cover.src, srcset:`${cover.smallSrc} 640w, ${cover.src} 1280w`, sizes, alt:cover.alt, width:String(cover.width), height:String(cover.height), loading:eager ? 'eager' : 'lazy', decoding:'async'};
}

export function guideCard(guide, {lang = 'fr', catalogue = false, eager = false} = {}) {
  const cover = guide.cover;
  const search = catalogue ? ` data-guide-card data-category="${esc(guide.category)}" data-published="${esc(guide.publicationDate || '')}"` : '';
  return `<a class="${cardClass}" href="${route(guide.slug, lang)}"${search}><div class="relative aspect-[16/10] overflow-hidden bg-brand-cloud dark:bg-white/5"><img class="object-cover transition group-hover:scale-105 guide-cover-image" src="${esc(cover.src)}" srcset="${esc(cover.smallSrc)} 640w, ${esc(cover.src)} 1280w" sizes="${imageSizes}" width="${cover.width}" height="${cover.height}" alt="${esc(cover.alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></div><div class="flex flex-1 flex-col gap-3 p-6"><span class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ocean">${esc(guide.category)}</span><h2 class="text-lg font-semibold leading-snug text-brand-midnight dark:text-white">${esc(guide.title)}</h2><p class="line-clamp-3 text-sm leading-relaxed text-brand-steel dark:text-white/70">${esc(guide.excerpt)}</p>${guide.publicationDate ? `<time class="mt-auto text-xs text-brand-steel/80 dark:text-white/50" datetime="${esc(guide.publicationDate)}">${dateLabel(guide.publicationDate, lang)}</time>` : `<span class="mt-auto text-xs text-brand-steel/80 dark:text-white/50">${labels[lang].practical}</span>`}</div></a>`;
}

function existingGuides(pages, lang, covers) {
  const cardData = new Map();
  for (const file of [`${lang}/guides/index.html`, `${lang}/guides/page/2/index.html`]) {
    if (!pages[file]) continue;
    const $ = load(pages[file]);
    $('main a.group').filter((_, e) => $(e).find('h2').length).each((_, e) => {
      const slug = $(e).attr('href')?.match(/\/guides\/([^/]+)\//)?.[1];
      if (slug) cardData.set(slug, {category:$(e).find('div.flex-1>span').first().text()});
    });
  }
  return Object.keys(pages).filter(file => file.startsWith(`${lang}/`) && isGuideFile(file)).map(file => {
    const slug = file.split('/')[2];
    const $ = load(pages[file]);
    let publicationDate = null;
    const source = new URL(`../reference/mylegal/pages/guides__${slug}.html`, import.meta.url);
    if (existsSync(source)) publicationDate = load(readFileSync(source, 'utf8'))('meta[property="article:published_time"]').attr('content') || null;
    const category = normalize(cardData.get(slug)?.category || $('main article>header .inline-flex').first().text() || $('main .article>.eyebrow').text().split(' · ')[0] || labels[lang].practical);
    const title = normalize($('main h1').text());
    const excerpt = normalize($('main h1').first().nextAll('p').first().text() || $('meta[name="description"]').attr('content'));
    return {slug, title, excerpt, category:lang === 'fr' ? categoryNames[category] || category : category, publicationDate, cover:coverFor(slug, title, covers), existing:true};
  });
}

function ensureHeadingIds($, prose, slug) {
  const used = new Set();
  $('[id]').not(prose.find('[id]')).each((_, e) => used.add($(e).attr('id')));
  prose.find('[id]').each((_, e) => {
    const original = $(e).attr('id');
    let id = original, i = 2;
    while (used.has(id)) id = `${original}-${i++}`;
    $(e).attr('id', id); used.add(id);
  });
  prose.find('h2,h3').each((_, e) => {
    if ($(e).attr('id')) return;
    const base = slugify($(e).text()) || `${slug}-section`;
    let id = base, i = 2;
    while (used.has(id)) id = `${base}-${i++}`;
    $(e).attr('id', id); used.add(id);
  });
}

function toc($, prose, lang) {
  const headings = prose.find('h2,h3');
  const nav = $('main nav[aria-label="Sommaire"],main nav[aria-label="Contents"],main nav[aria-label="المحتويات"]').first();
  if (!nav.length) return;
  nav.attr('aria-label', labels[lang].toc).html(`<p class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-steel">${labels[lang].toc}</p><ul class="space-y-1 border-l border-brand-pale">${headings.map((_, e) => `<li><a href="#${esc($(e).attr('id'))}" class="block px-3 py-1.5 text-brand-steel transition hover:text-brand-midnight${e.name === 'h3' ? ' guide-toc-subheading' : ''}">${esc($(e).text())}</a></li>`).get().join('')}</ul>`);
}

function visibleFaq($, supplied) {
  const items = [];
  const body = normalize($('main').text());
  for (const item of supplied || []) {
    const question = normalize(item.question || item.name);
    const answer = textOf(item.answer || item.acceptedAnswer?.text);
    if (question && answer && body.includes(question) && body.includes(answer)) items.push({question, answer});
  }
  $('main .prose-lg details,main .article details').each((_, e) => {
    const question = normalize($(e).find('summary').first().text());
    const clone = $(e).clone(); clone.find('summary').remove();
    const answer = normalize(clone.text());
    if (question && answer) items.push({question, answer});
  });
  return [...new Map(items.map(item => [item.question, item])).values()];
}

function updateMetadata($, guide, lang, pages, knownPaths, {imported = false} = {}) {
  const path = route(guide.slug, lang), canonical = company.origin + path;
  const title = imported ? (guide.metaTitle || guide.title).replace(/\s*[|—–-]\s*Felexia Conseils\s*$/i, '') + ' | Felexia Conseils' : $('title').text();
  const description = imported ? guide.metaDescription || guide.excerpt : $('meta[name="description"]').attr('content');
  $('title').text(title);
  $('meta[name="description"]').attr('content', description);
  $('link[rel="canonical"]').attr('href', canonical);
  $('link[rel="alternate"][hreflang]').remove();
  for (const language of ['fr','en','ar']) if (pages[articleFile(guide.slug, language)]) $('head').append(`<link rel="alternate" hreflang="${language}" href="${company.origin + route(guide.slug, language)}">`);
  $('head').append(`<link rel="alternate" hreflang="x-default" href="${company.origin + route(guide.slug)}">`);
  for (const [property, content] of Object.entries({'og:title':title,'og:description':description,'og:url':canonical,'og:type':'article','og:image':company.origin + guide.cover.src,'og:image:alt':guide.cover.alt,'og:image:width':guide.cover.width,'og:image:height':guide.cover.height})) {
    $(`meta[property="${property}"]`).remove(); $('head').append(`<meta property="${property}" content="${esc(content)}">`);
  }
  for (const [name, content] of Object.entries({'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':company.origin + guide.cover.src,'twitter:image:alt':guide.cover.alt})) {
    $(`meta[name="${name}"]`).remove(); $('head').append(`<meta name="${name}" content="${esc(content)}">`);
  }
  $('meta[property="article:published_time"],meta[property="article:modified_time"]').remove();
  if (guide.publicationDate) $('head').append(`<meta property="article:published_time" content="${esc(guide.publicationDate)}">`);
  if (guide.modifiedDate) $('head').append(`<meta property="article:modified_time" content="${esc(guide.modifiedDate)}">`);
  $('.felexia-header-tools').replaceWith(headerTools(lang, `guides/${guide.slug}`, knownPaths));
  $('footer .felexia-languages').html(languageSwitch(lang, `guides/${guide.slug}`, knownPaths));
  const crumbs = [{name:lang === 'fr' ? 'Accueil' : lang === 'en' ? 'Home' : 'الرئيسية',url:company.origin + `/${lang}/`},{name:lang === 'ar' ? 'الأدلة' : 'Guides',url:company.origin + route('', lang)},{name:guide.title,url:canonical}];
  $('main .seo-breadcrumb').first().html(`<ol>${crumbs.map((crumb,i) => `<li>${i === crumbs.length-1 ? `<span aria-current="page">${esc(crumb.name)}</span>` : `<a href="${new URL(crumb.url).pathname}">${esc(crumb.name)}</a>`}</li>`).join('')}</ol>`);
  let previous = {};
  try { previous = JSON.parse($('script[type="application/ld+json"]').first().text()); } catch {}
  const originalGraph = previous['@graph'] || [];
  const graph = originalGraph.filter(item => ['Organization','ProfessionalService','WebSite'].includes(item['@type']) || Array.isArray(item['@type']) && item['@type'].includes('Organization'));
  const organization = company.origin + '/#organization';
  graph.push({'@type':'WebPage','@id':canonical + '#webpage',url:canonical,name:title,description,inLanguage:lang,isPartOf:{'@id':company.origin + '/#website'},breadcrumb:{'@id':canonical + '#breadcrumb'}});
  graph.push({'@type':'BreadcrumbList','@id':canonical + '#breadcrumb',itemListElement:crumbs.map((crumb,i) => ({'@type':'ListItem',position:i+1,name:crumb.name,item:crumb.url}))});
  const article = {'@type':'Article','@id':canonical + '#article',headline:guide.title,description,inLanguage:lang,image:company.origin + guide.cover.src,mainEntityOfPage:{'@id':canonical + '#webpage'},publisher:{'@id':organization},author:{'@id':organization},articleSection:guide.category};
  if (guide.publicationDate) article.datePublished = guide.publicationDate;
  const previousArticle = originalGraph.find(item => item['@type'] === 'Article');
  if (guide.modifiedDate || previousArticle?.dateModified) article.dateModified = guide.modifiedDate || previousArticle.dateModified;
  if (guide.ministry) {
    article.citation = guide.sourceUrl;
    article.isBasedOn = {'@type':'CreativeWork',name:guide.sourceTitle,url:guide.sourceUrl};
    if (guide.sourceDate) article.isBasedOn.datePublished = guide.sourceDate;
  }
  graph.push(article);
  const faq = visibleFaq($, guide.faq);
  if (faq.length) graph.push({'@type':'FAQPage','@id':canonical + '#faq',mainEntity:faq.map(item => ({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))});
  $('script[type="application/ld+json"]').remove();
  $('head').append(`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g, '\\u003c')}</script>`);
  $('a[data-share-guide]').each((_, e) => {
    const network = $(e).attr('data-share-guide');
    const share = new URL(network === 'linkedin' ? 'https://www.linkedin.com/sharing/share-offsite/' : network === 'x' ? 'https://x.com/intent/tweet' : 'https://www.facebook.com/sharer/sharer.php');
    share.searchParams.set(network === 'facebook' ? 'u' : 'url', canonical);
    if (network === 'x') share.searchParams.set('text', guide.title);
    $(e).attr('href', share.href);
  });
}

function enrichArticle(pages, guide, lang, template, knownPaths, version) {
  const file = articleFile(guide.slug, lang);
  const isNew = !guide.existing;
  const $ = load(isNew ? template : pages[file]);
  let prose = $('main .prose-lg').first();
  if (!prose.length) prose = $('main .article').first();
  if (isNew) {
    $('main h1').text(guide.title);
    $('main h1').first().nextAll('p').first().text(guide.excerpt);
    $('main article>header .inline-flex').first().text(guide.category);
    prose.html(`<div data-imported-editorial${guide.ministry ? ' data-ministry-editorial' : ''} data-source-url="${esc(guide.sourceUrl)}">${guide.html || ''}</div>`);
    const authors = (guide.authors || []).map(author => typeof author === 'string' ? author : author.name).filter(Boolean);
    const credit = authors.length ? `<p class="guide-source-credit">${labels[lang].authors} : ${esc(authors.join(', '))}. Adaptation éditoriale : Felexia Conseils.</p>` : '';
    prose.append(credit);
    const metadata = $('main h1').parent().children('div').last();
    metadata.html(`<span class="font-medium text-brand-midnight dark:text-white/80">Felexia Conseils</span><span aria-hidden="true">·</span>${guide.publicationDate ? `<time datetime="${esc(guide.publicationDate)}">${dateLabel(guide.publicationDate, lang)}</time><span aria-hidden="true">·</span>` : ''}<span>${Math.max(1, Math.ceil(words(guide.html) / 220))} ${labels[lang].reading}</span>`);
  } else if (guide.html && lang === 'fr') {
    prose.append(`<section class="guide-source-supplement" aria-label="${labels[lang].supplement}">${guide.html}</section>`);
  }
  if (!isNew && $('main article>header').length) {
    $('main article>header .inline-flex').first().text(guide.category);
    const metadata = $('main h1').parent().children('div').last();
    const minutes = Math.max(1, Math.ceil(words(prose.html()) / 220));
    metadata.find('span').filter((_, e) => /\d+\s*min(?:utes)?(?:\s|$)|\d+\s*دقائق/.test($(e).text())).remove();
    metadata.find('[aria-hidden="true"]').remove();
    if (!metadata.find('time').length && guide.publicationDate) metadata.append(`<time datetime="${esc(guide.publicationDate)}">${dateLabel(guide.publicationDate, lang)}</time>`);
    metadata.append(`<span>${minutes} ${labels[lang].reading}</span>`);
    metadata.children().slice(1).before('<span aria-hidden="true">·</span>');
  }
  if (!isNew && !guide.publicationDate && !$('main img.guide-cover-image').length && !$('.prose-lg').length) {
    $('main h1').first().closest('section').after(`<div class="wrap guide-legacy-cover"><div class="relative aspect-[16/10] overflow-hidden rounded-2xl"><img class="object-cover guide-cover-image" alt="${esc(guide.cover.alt)}"></div></div>`);
  }
  const hero = $('main>article>div').filter((_, e) => $(e).children('div').first().attr('class')?.includes('aspect-[21/9]')).find('img').first();
  const image = hero.length ? hero : $('main img.guide-cover-image').first();
  if (image.length) image.attr(imageAttributes(guide.cover, true, '(min-width: 1280px) 1152px, (min-width: 1024px) 90vw, 100vw')).attr('fetchpriority','high').addClass('guide-cover-image');
  $('main [data-guide-image-caption]').remove();
  if (image.attr('aria-describedby') === 'guide-cover-illustration-caption') image.removeAttr('aria-describedby');
  if (guide.ministry && guide.cover.method === 'ai-generated-imagegen' && image.length) {
    image.attr('aria-describedby','guide-cover-illustration-caption');
    image.parent().after(`<p id="guide-cover-illustration-caption" class="guide-image-caption" data-guide-image-caption data-ai-cover-credit>${labels[lang].imageIllustration}</p>`);
  }
  ensureHeadingIds($, prose, guide.slug);
  toc($, prose, lang);
  prose.find('table').each((_, e) => { if (!$(e).parent().hasClass('guide-table-scroll')) $(e).wrap('<div class="guide-table-scroll" tabindex="0" role="region" aria-label="Tableau"></div>'); });
  prose.find('img').attr({loading:'lazy',decoding:'async'}).removeAttr('fetchpriority');
  if (!$('link[href^="/guides.css"]').length) $('head').append(`<link rel="stylesheet" href="/guides.css?v=${version}">`);
  updateMetadata($, guide, lang, pages, knownPaths, {imported:isNew});
  attachDesign($);
  pages[file] = $.html();
}

function relatedGuides(pages, catalogue, lang) {
  const tokens = guide => new Set(slugify(guide.title).split('-').filter(word => word.length > 3 && !['maroc','guide','pour','dans','avec','entreprise'].includes(word)));
  for (const guide of catalogue) {
    const $ = load(pages[articleFile(guide.slug, lang)]);
    const ownTokens = tokens(guide);
    const related = catalogue.filter(candidate => candidate.slug !== guide.slug).map(candidate => ({guide:candidate, score:(candidate.category === guide.category ? 2 : 0) + [...tokens(candidate)].filter(token => ownTokens.has(token)).length * 3})).sort((a,b) => b.score-a.score).slice(0,3).map(item => item.guide);
    const zone = $('main>article>div').filter((_, e) => !$(e).find('.prose-lg').length && $(e).find('h2').length && $(e).find('a[href*="/guides/"]').length).last();
    const cards = `<h2 class="text-2xl font-bold tracking-tight text-brand-midnight dark:text-white">${labels[lang].related}</h2><div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">${related.map(item => guideCard(item,{lang})).join('')}</div>`;
    if (zone.length) zone.addClass('guide-related').html(cards);
    else $('main .felexia-legacy').append(`<section class="wrap guide-related">${cards}</section>`);
    pages[articleFile(guide.slug, lang)] = $.html();
  }
}

function renderCatalogue(pages, catalogue, lang, version) {
  const file = `${lang}/guides/index.html`;
  const $ = load(pages[file]);
  const grid = $('main a.group').filter((_, e) => $(e).find('h2').length).first().parent();
  grid.attr('data-guide-grid','').html(catalogue.map((guide,i) => guideCard(guide,{lang,catalogue:true,eager:i === 0})).join(''));
  $('main nav').filter((_, e) => /pagination/i.test($(e).attr('aria-label') || '') || $(e).find('a[href*="/guides/page/"]').length).remove();
  const t = labels[lang];
  const categories = [...new Set(catalogue.map(guide => guide.category))].sort((a,b) => a.localeCompare(b,lang));
  grid.before(`<div class="guide-filters" data-guide-filters><div class="guide-search"><label class="sr-only" for="guide-search">${t.searchLabel}</label><input id="guide-search" type="search" placeholder="${t.search}" autocomplete="off" data-guide-search></div><div class="guide-category"><label class="sr-only" for="guide-category">${t.category}</label><select id="guide-category" data-guide-category><option value="">${t.all}</option>${categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join('')}</select></div><p class="guide-result-count" role="status" aria-live="polite" data-guide-count data-count-label="${t.count}">${catalogue.length} ${t.count}</p></div><p class="guide-no-results" data-guide-empty hidden>${t.empty}</p>`);
  const themeNav = `<nav class="guide-themes" aria-label="${esc(t.category)}">${guideThemes.map(theme => `<a href="/${lang}/guides/theme/${theme.id}/">${esc(themeLabel(theme.id, lang))}</a>`).join('')}</nav>`;
  grid.before(themeNav);
  $('head').append(`<link rel="stylesheet" href="/guides.css?v=${version}"><script src="/guides.js?v=${version}" defer></script>`);
  attachDesign($);
  pages[file] = $.html();
  delete pages[`${lang}/guides/page/2/index.html`];
}

function renderThemePages(pages) {
  const known = new Set(Object.keys(pages).map(file => '/' + file.replace(/index\.html$/, '')));
  for (const theme of guideThemes) for (const lang of ['fr','en','ar']) known.add(`/${lang}/guides/theme/${theme.id}/`);
  for (const lang of ['fr','en','ar']) {
    const source = pages[`${lang}/guides/index.html`];
    for (const theme of guideThemes) {
      const themePage = load(source);
      const themeGrid = themePage('[data-guide-grid]');
      const matching = themeGrid.children('[data-guide-card]').toArray().filter(element => themeOfCategory(themePage(element).attr('data-category')) === theme.id);
      themeGrid.empty().append(matching);
      const themePath = `/${lang}/guides/theme/${theme.id}/`;
      const themeTitle = `${themeLabel(theme.id, lang)} | Felexia Conseils`;
      const description = themePage('meta[name="description"]').attr('content') || themeTitle;
      themePage('title').text(themeTitle);
      themePage('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]').attr('content', description);
      themePage('meta[property="og:title"],meta[name="twitter:title"]').attr('content', themeTitle);
      themePage('link[rel="canonical"],meta[property="og:url"]').attr('href', company.origin + themePath).attr('content', company.origin + themePath);
      themePage('link[rel="alternate"][hreflang]').remove();
      for (const language of ['fr','en','ar']) themePage('head').append(`<link rel="alternate" hreflang="${language}" href="${company.origin}/${language}/guides/theme/${theme.id}/">`);
      themePage('head').append(`<link rel="alternate" hreflang="x-default" href="${company.origin}/fr/guides/theme/${theme.id}/">`);
      themePage('[data-guide-count]').text(`${matching.length} ${labels[lang].count}`);
      if (themePage('main h1').length) themePage('main h1').first().text(themeLabel(theme.id, lang));
      themePage('.felexia-header-tools').replaceWith(headerTools(lang, `guides/theme/${theme.id}`, known));
      themePage('footer .felexia-languages').html(languageSwitch(lang, `guides/theme/${theme.id}`, known));
      pages[`${lang}/guides/theme/${theme.id}/index.html`] = themePage.html();
    }
  }
}

export function renderGuidesSite(pages) {
  const importedData = readJson('./guides-imported.json', []);
  const imported = Array.isArray(importedData) ? importedData : importedData.articles || [];
  const ministryData = readJson('./guides-ministry.json', {articles:[]});
  if (!Array.isArray(ministryData.articles)) throw new TypeError('Ministry Guides must contain an articles array');
  const coverData = readJson('./guide-covers.json', {});
  const covers = Array.isArray(coverData) ? Object.fromEntries(coverData.map(item => [item.slug,item])) : coverData.covers || coverData;
  const version = createHash('sha256').update(readFileSync(new URL('../public/guides.css', import.meta.url))).update(readFileSync(new URL('../public/guides.js', import.meta.url))).digest('hex').slice(0,12);
  const catalogues = Object.fromEntries(['fr','en','ar'].map(lang => [lang,existingGuides(pages,lang,covers)]));
  const template = pages['fr/guides/creation-entreprise-rabat/index.html'];
  const ministryTemplates = Object.fromEntries(['fr','en','ar'].map(lang => [lang,pages[articleFile('creation-entreprise-rabat',lang)]]));
  for (const item of imported) {
    const previous = catalogues.fr.find(guide => guide.slug === item.slug);
    if (previous) {
      previous.html = [previous.html,`<div data-imported-editorial data-source-url="${esc(item.sourceUrl)}">${item.html}</div>`].filter(Boolean).join('\n');
      previous.faq = [...previous.faq || [],...item.faq || []];
      previous.sourceArticles = [...previous.sourceArticles || [],...item.sourceArticles || [item.sourceUrl]];
    } else {
      const sourceCategory = Array.isArray(item.category) ? item.category[0] : item.category;
      const guide = {...item,category:categoryNames[sourceCategory] || sourceCategory,cover:coverFor(item.slug,item.title,covers)};
      catalogues.fr.push(guide);
      // Reserve all routes before generating hreflang and language controls.
      pages[articleFile(item.slug)] = template;
    }
  }
  // Ministry editorial is a separate, explicit publication set. Reserve every
  // translated route before metadata is rendered so all alternates are real.
  for (const item of ministryData.articles) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug || '')) throw new TypeError('Invalid Ministry Guide slug');
    const source = new URL(item.sourceUrl);
    if (source.protocol !== 'https:' || !['finances.gov.ma','www.finances.gov.ma'].includes(source.hostname) || source.username || source.password) throw new TypeError('Ministry Guides require an official HTTPS source');
    for (const lang of ['fr','en','ar']) {
      const translation = item.translations?.[lang];
      const file = articleFile(item.slug,lang);
      if (!ministryTemplates[lang] || !translation?.title || !translation.html || pages[file]) throw new TypeError(`Missing translation/template or occupied Ministry Guide route: ${file}`);
      if (/<(?:script|iframe|form|object|embed)\b|\son\w+\s*=|(?:href|src)\s*=\s*["']?\s*(?:javascript:|data:|\/\/)/i.test(translation.html)) throw new TypeError(`Unsafe Ministry Guide markup: ${file}`);
      const guide = {...translation,slug:item.slug,sourceUrl:item.sourceUrl,sourceTitle:item.sourceTitle,sourceDate:item.sourceDate,publicationDate:item.publicationDate,modifiedDate:item.modifiedDate,authors:[],ministry:true,cover:{...item.cover,alt:translation.alt || item.cover?.alt || translation.title}};
      if (!guide.cover.src || !guide.cover.smallSrc || !guide.cover.width || !guide.cover.height) throw new TypeError(`Missing Ministry Guide cover: ${file}`);
      catalogues[lang].push(guide);
      pages[file] = ministryTemplates[lang];
    }
  }
  for (const lang of ['fr','en','ar']) {
    for (const item of auditGuidesFor(lang)) {
      const file = articleFile(item.slug, lang);
      if (pages[file]) throw new TypeError(`Audit guide route is already used: ${file}`);
      catalogues[lang].push(item);
      pages[file] = ministryTemplates[lang];
    }
  }
  const knownPaths = new Set(Object.keys(pages).map(file => '/' + file.replace(/index\.html$/, '')));
  for (const lang of ['fr','en','ar']) {
    // Keep the three genuinely undated legacy guides visible without inventing
    // publication dates. Every dated guide follows in descending date order,
    // leaving the oldest known publication at the bottom of the catalogue.
    const catalogue = catalogues[lang].sort((a,b) => {
      if (!a.publicationDate && b.publicationDate) return -1;
      if (a.publicationDate && !b.publicationDate) return 1;
      return (b.publicationDate || '').localeCompare(a.publicationDate || '') || a.title.localeCompare(b.title,lang);
    });
    for (const guide of catalogue) enrichArticle(pages,guide,lang,guide.ministry || guide.audit ? ministryTemplates[lang] : template,knownPaths,version);
    relatedGuides(pages,catalogue,lang);
    renderCatalogue(pages,catalogue,lang,version);
  }
  renderThemePages(pages);
  return pages;
}
