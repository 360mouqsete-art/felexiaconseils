import {load} from 'cheerio';
import {company} from '../content.mjs';
import {headerTools} from '../header-tools.mjs';
import {resolveCuratedCover} from './curated-covers.mjs';

const languages = ['fr', 'en', 'ar'];
const copy = {
  fr: {home:'Accueil', guides:'Guides', language:'Choisir la langue', published:'Publié le', verified:'Dernier contrôle documentaire', reading:'min de lecture', toc:'Sommaire', faq:'Questions fréquentes', sources:'Sources consultées', links:'Pour poursuivre votre lecture', disclosure:'Ce guide a été préparé avec une assistance IA à partir des sources citées. Il fournit des informations générales ; les règles applicables à votre situation doivent être confirmées auprès du cabinet et des organismes compétents.'},
  en: {home:'Home', guides:'Guides', language:'Choose your language', published:'Published on', verified:'Last documentary check', reading:'min read', toc:'Contents', faq:'Frequently asked questions', sources:'Sources consulted', links:'Continue reading', disclosure:'This guide was prepared with AI assistance using the cited sources. It provides general information; confirm the rules applicable to your circumstances with the firm and the relevant authorities.'},
  ar: {home:'الرئيسية', guides:'الأدلة', language:'اختيار اللغة', published:'نُشر في', verified:'آخر تحقق وثائقي', reading:'دقائق للقراءة', toc:'المحتويات', faq:'أسئلة شائعة', sources:'المصادر المعتمدة', links:'لمواصلة القراءة', disclosure:'أُعدّ هذا الدليل بمساعدة الذكاء الاصطناعي اعتماداً على المصادر المذكورة. يقدم معلومات عامة؛ يجب تأكيد القواعد المناسبة لوضعيتك مع المكتب والجهات المختصة.'}
};
const categoryLabels = [
  {keys:['creation', 'Création d’entreprise', "Création d'entreprise"], fr:'Création d’entreprise', en:'Company formation', ar:'تأسيس المقاولات'},
  {keys:['tax', 'fiscalite', 'Fiscalité'], fr:'Fiscalité', en:'Taxation', ar:'الضرائب'},
  {keys:['accounting', 'comptabilite', 'Comptabilité'], fr:'Comptabilité', en:'Accounting', ar:'المحاسبة'},
  {keys:['social', 'rh', 'Paie & CNSS', 'Ressources humaines'], fr:'Paie & CNSS', en:'Payroll & CNSS', ar:'الأجور والضمان الاجتماعي'},
  {keys:['investment', 'investissement', 'Investissement'], fr:'Investissement', en:'Investment', ar:'الاستثمار'},
  {keys:['management', 'gestion', 'Conseil et développement', 'Gestion'], fr:'Conseil et développement', en:'Business advisory', ar:'الاستشارة وتطوير الأعمال'},
  {keys:['legal', 'juridique', 'Droit des sociétés', 'Juridique', 'Réglementation'], fr:'Juridique', en:'Legal matters', ar:'الشؤون القانونية'}
];
const cardClass = 'group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-brand-pale transition hover:-translate-y-1 hover:ring-brand-ocean dark:bg-white/5 dark:ring-white/10 dark:hover:ring-brand-ocean';
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));
const text = value => typeof value === 'string' ? value.trim() : '';
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const slugValid = value => typeof value === 'string' && /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value) && value.length <= 180;
const route = (topic, language) => `/${language}/guides/${encodeURIComponent(topic.translations[language].slug)}/`;
const categoryFor = (topic, language) => typeof topic.category === 'object' && topic.category ? text(topic.category[language]) : categoryLabels.find(item => item.keys.includes(topic.category))?.[language] || text(topic.category);
const published = topic => topic?.status === 'published' && validDate(topic.publishedAt) && languages.every(language => slugValid(topic.translations?.[language]?.slug) && text(topic.translations[language].title));
const publicTopics = topics => (Array.isArray(topics) ? topics : []).filter(published);

function siteOrigin(value = company.origin) {
  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) throw new TypeError('Invalid site origin');
  return parsed.origin;
}

function safeUrl(value, origin, {local = false} = {}) {
  if (typeof value !== 'string' || !value || /[\u0000-\u0020\\]/u.test(value) || value.startsWith('//')) return null;
  try {
    const parsed = new URL(value, origin);
    if (parsed.username || parsed.password || !['https:', 'http:'].includes(parsed.protocol)) return null;
    if (local && (parsed.origin !== origin || !value.startsWith('/'))) return null;
    if (!local && !value.startsWith('/') && parsed.protocol !== 'https:') return null;
    return value.startsWith('/') ? parsed.pathname + parsed.search + parsed.hash : parsed.href;
  } catch { return null; }
}

function sourceLinks(topic, origin) {
  return (Array.isArray(topic.sources) ? topic.sources : []).map(source => ({...source, url:safeUrl(source.url, origin)})).filter(source => source.url && !source.url.startsWith('/'));
}

function imageFor(topic, language, origin) {
  const curated = resolveCuratedCover(topic, language);
  const image = curated || topic.image || {};
  const src = safeUrl(image.src, origin, {local:true});
  const smallSrc = safeUrl(image.smallSrc, origin, {local:true}) || src;
  if (!src || /[,]/.test(src) || /[,]/.test(smallSrc)) throw new TypeError('Published guide requires a safe local image');
  return {src, smallSrc, alt:text(curated?.alt) || text(topic.translations[language].alt) || topic.translations[language].title, width:Number.isInteger(image.width) && image.width > 0 ? image.width : 1280, height:Number.isInteger(image.height) && image.height > 0 ? image.height : 800};
}

function formatDate(value, language) {
  return new Intl.DateTimeFormat({fr:'fr-FR', en:'en-GB', ar:'ar-MA'}[language], {day:'numeric', month:'long', year:'numeric', timeZone:'Africa/Casablanca'}).format(new Date(value));
}

function languageSwitch(topic, language, origin) {
  const labels = {fr:'FR', en:'EN', ar:'العربية'};
  return `<nav class="felexia-language-switch language" aria-label="${copy[language].language}" data-language-switch>${languages.map(target => `<a href="${esc(route(topic, target))}" lang="${target}" hreflang="${target}" data-language-target="equivalent"${target === language ? ' aria-current="true"' : ''}>${labels[target]}</a>`).join('')}</nav>`;
}

function replaceLanguageControls($, topic, language, origin, knownPaths) {
  const controls = load(headerTools(language, `guides/${topic.translations[language].slug}`, knownPaths), null, false);
  controls('.felexia-language-switch').replaceWith(languageSwitch(topic, language, origin));
  $('.felexia-header-tools').replaceWith(controls.html());
  $('footer .felexia-languages').html(languageSwitch(topic, language, origin));
}

function setMeta($, selector, attributes) {
  $(selector).remove();
  $('head').append(`<meta ${Object.entries(attributes).map(([key, value]) => `${key}="${esc(value)}"`).join(' ')}>`);
}

function setAlternates($, topic, origin) {
  $('head link[rel="alternate"][hreflang]').remove();
  for (const language of languages) $('head').append(`<link rel="alternate" hreflang="${language}" href="${esc(origin + route(topic, language))}">`);
  $('head').append(`<link rel="alternate" hreflang="x-default" href="${esc(origin + route(topic, 'fr'))}">`);
}

function articleBody(topic, language, origin, knownPaths) {
  const translation = topic.translations[language];
  const blocks = Array.isArray(translation.body) ? translation.body : [];
  const sections = blocks.map((block, index) => `<section><h2 id="intelligence-section-${index + 1}">${esc(block.heading)}</h2>${(Array.isArray(block.paragraphs) ? block.paragraphs : []).map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}${Array.isArray(block.bullets) && block.bullets.length ? `<ul>${block.bullets.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}</section>`).join('');
  const faq = (Array.isArray(translation.faq) ? translation.faq : []).filter(item => text(item.question) && text(item.answer));
  const faqHtml = faq.length ? `<section class="intelligence-faq"><h2 id="intelligence-faq">${copy[language].faq}</h2>${faq.map(item => `<details><summary>${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`).join('')}</section>` : '';
  const links = (Array.isArray(translation.internalLinks) ? translation.internalLinks : []).map(link => ({...link, path:safeUrl(link.path, origin, {local:true})})).filter(link => link.path && text(link.label) && knownPaths?.has(link.path.split(/[?#]/)[0]));
  const linksHtml = links.length ? `<section><h2 id="intelligence-links">${copy[language].links}</h2><ul>${links.map(link => `<li><a href="${esc(link.path)}">${esc(link.label)}</a></li>`).join('')}</ul></section>` : '';
  const sources = sourceLinks(topic, origin);
  const sourcesHtml = `<section class="intelligence-sources"><h2 id="intelligence-sources">${copy[language].sources}</h2><ul>${sources.map(source => `<li><a href="${esc(source.url)}" rel="noopener noreferrer">${esc(source.title || source.issuer || source.url)}</a>${source.issuer && source.title ? ` — ${esc(source.issuer)}` : ''}</li>`).join('')}</ul>${validDate(topic.verifiedAt) ? `<p>${copy[language].verified} : <time datetime="${esc(topic.verifiedAt)}">${formatDate(topic.verifiedAt, language)}</time>.</p>` : ''}</section>`;
  return {html:sections + faqHtml + linksHtml + sourcesHtml + `<p class="intelligence-disclosure">${copy[language].disclosure}</p>`, faq};
}

/** Clone the already localised static article shell; only published content is public. */
export function renderIntelligenceGuide(topic, language, {baseHtml, origin:originInput, knownPaths} = {}) {
  if (!languages.includes(language) || !published(topic) || !text(baseHtml)) throw new TypeError('A published trilingual topic and an existing article template are required');
  const origin = siteOrigin(originInput);
  const translation = topic.translations[language];
  const $ = load(baseHtml);
  const localPaths = knownPaths || new Set();
  const path = route(topic, language);
  const canonical = origin + path;
  const title = text(translation.metaTitle) || translation.title;
  const description = text(translation.metaDescription) || text(translation.excerpt);
  const cover = imageFor(topic, language, origin);
  const content = articleBody(topic, language, origin, localPaths);
  $('html').attr({lang:language, dir:language === 'ar' ? 'rtl' : 'ltr'});
  $('body').attr('data-lang', language);
  $('title').remove(); $('head').append(`<title>${esc(title)}</title>`);
  setMeta($, 'meta[name="description"]', {name:'description', content:description});
  $('link[rel="canonical"]').remove(); $('head').append(`<link rel="canonical" href="${esc(canonical)}">`);
  setAlternates($, topic, origin);
  for (const [property, value] of Object.entries({'og:title':title, 'og:description':description, 'og:url':canonical, 'og:type':'article', 'og:locale':{fr:'fr_MA', en:'en_GB', ar:'ar_MA'}[language], 'og:image':origin + cover.src, 'og:image:alt':cover.alt, 'og:image:width':cover.width, 'og:image:height':cover.height, 'article:published_time':topic.publishedAt})) setMeta($, `meta[property="${property}"]`, {property, content:value});
  const modifiedAt = validDate(topic.modifiedAt) ? topic.modifiedAt : topic.publishedAt;
  setMeta($, 'meta[property="article:modified_time"]', {property:'article:modified_time', content:modifiedAt});
  for (const [name, value] of Object.entries({'twitter:card':'summary_large_image', 'twitter:title':title, 'twitter:description':description, 'twitter:image':origin + cover.src, 'twitter:image:alt':cover.alt})) setMeta($, `meta[name="${name}"]`, {name, content:value});
  $('meta[name="robots"]').remove();
  $('main h1').first().text(translation.title);
  $('main h1').first().nextAll('p').first().text(translation.excerpt || description);
  $('main article>header .inline-flex').first().text(categoryFor(topic, language));
  const metadata = $('main h1').first().parent().children('div').last();
  const bodyWords = (translation.body || []).flatMap(block => block.paragraphs || []).join(' ').split(/\s+/).filter(Boolean).length;
  metadata.html(`<span class="font-medium text-brand-midnight dark:text-white/80">Felexia Conseils</span><span aria-hidden="true">·</span><time datetime="${esc(topic.publishedAt)}">${copy[language].published} ${formatDate(topic.publishedAt, language)}</time><span aria-hidden="true">·</span><span>${Math.max(1, Math.ceil(bodyWords / 220))} ${copy[language].reading}</span>`);
  const prose = $('main .prose-lg,main .article').first();
  if (!prose.length) throw new TypeError('The existing guide template has no article body');
  prose.html(content.html).attr('data-intelligence-guide', topic.id);
  $('main .guide-related').remove();
  const image = $('main img.guide-cover-image').first();
  image.attr({src:cover.src, srcset:`${cover.smallSrc} ${Math.min(640, cover.width)}w, ${cover.src} ${cover.width}w`, sizes:'(min-width: 1280px) 1152px, 100vw', alt:cover.alt, width:String(cover.width), height:String(cover.height), loading:'eager', decoding:'async', fetchpriority:'high'});
  const toc = $('main nav[aria-label="Sommaire"],main nav[aria-label="Contents"],main nav[aria-label="المحتويات"]').first();
  toc.attr('aria-label', copy[language].toc).addClass('intelligence-toc').html(`<p class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-steel">${copy[language].toc}</p><ul class="space-y-1 border-l border-brand-pale">${prose.find('h2[id]').map((_, heading) => `<li><a class="block px-3 py-1.5" href="#${esc($(heading).attr('id'))}">${esc($(heading).text())}</a></li>`).get().join('')}</ul>`);
  const crumbs = [{name:copy[language].home, url:origin + `/${language}/`}, {name:copy[language].guides, url:origin + `/${language}/guides/`}, {name:translation.title, url:canonical}];
  $('main .seo-breadcrumb').first().html(`<ol>${crumbs.map((crumb, index) => `<li>${index === 2 ? `<span aria-current="page">${esc(crumb.name)}</span>` : `<a href="${esc(new URL(crumb.url).pathname)}">${esc(crumb.name)}</a>`}</li>`).join('')}</ol>`);
  replaceLanguageControls($, topic, language, origin, localPaths);
  $('a[data-share-guide]').each((_, element) => {
    const network = $(element).attr('data-share-guide');
    const url = new URL(network === 'linkedin' ? 'https://www.linkedin.com/sharing/share-offsite/' : network === 'x' ? 'https://x.com/intent/tweet' : 'https://www.facebook.com/sharer/sharer.php');
    url.searchParams.set(network === 'facebook' ? 'u' : 'url', canonical);
    if (network === 'x') url.searchParams.set('text', translation.title);
    $(element).attr('href', url.href);
  });
  const organization = origin + '/#organization';
  const graph = [{'@type':'Organization', '@id':organization, name:company.name, url:origin + '/', logo:origin + '/assets/logo-original.png'}, {'@type':'WebSite', '@id':origin + '/#website', url:origin + '/', name:company.name, publisher:{'@id':organization}}, {'@type':'WebPage', '@id':canonical + '#webpage', url:canonical, name:title, description, inLanguage:language, isPartOf:{'@id':origin + '/#website'}, breadcrumb:{'@id':canonical + '#breadcrumb'}}, {'@type':'BreadcrumbList', '@id':canonical + '#breadcrumb', itemListElement:crumbs.map((crumb, index) => ({'@type':'ListItem', position:index + 1, name:crumb.name, item:crumb.url}))}, {'@type':'Article', '@id':canonical + '#article', headline:translation.title, description, inLanguage:language, image:origin + cover.src, datePublished:topic.publishedAt, dateModified:modifiedAt, mainEntityOfPage:{'@id':canonical + '#webpage'}, publisher:{'@id':organization}, author:{'@id':organization}, articleSection:categoryFor(topic, language), citation:sourceLinks(topic, origin).map(source => source.url)}];
  if (content.faq.length) graph.push({'@type':'FAQPage', '@id':canonical + '#faq', mainEntity:content.faq.map(item => ({'@type':'Question', name:item.question, acceptedAnswer:{'@type':'Answer', text:item.answer}}))});
  $('script[type="application/ld+json"]').remove();
  $('head').append(`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org', '@graph':graph}).replace(/</g, '\\u003c')}</script>`);
  $('link[href^="/intelligence.css"]').remove();
  $('head').append('<link rel="stylesheet" href="/intelligence.css">');
  return $.html();
}

function cardHtml(topic, language, origin) {
  const t = topic.translations[language];
  const image = imageFor(topic, language, origin);
  return `<a class="${cardClass}" href="${esc(route(topic, language))}" data-guide-card data-category="${esc(categoryFor(topic, language))}" data-published="${esc(topic.publishedAt)}" data-intelligence-topic="${esc(topic.id)}"><div class="relative aspect-[16/10] overflow-hidden bg-brand-cloud dark:bg-white/5"><img class="object-cover transition group-hover:scale-105 guide-cover-image" src="${esc(image.src)}" srcset="${esc(image.smallSrc)} ${Math.min(640, image.width)}w, ${esc(image.src)} ${image.width}w" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" width="${image.width}" height="${image.height}" alt="${esc(image.alt)}" loading="lazy" decoding="async"></div><div class="flex flex-1 flex-col gap-3 p-6"><span class="text-xs font-semibold uppercase tracking-[0.18em] text-brand-ocean">${esc(categoryFor(topic, language))}</span><h2 class="text-lg font-semibold leading-snug text-brand-midnight dark:text-white">${esc(t.title)}</h2><p class="line-clamp-3 text-sm leading-relaxed text-brand-steel dark:text-white/70">${esc(t.excerpt)}</p><time class="mt-auto text-xs text-brand-steel/80 dark:text-white/50" datetime="${esc(topic.publishedAt)}">${formatDate(topic.publishedAt, language)}</time></div></a>`;
}

/** Add published cards to the existing Guides grid, preserving historical cards. */
export function mergeGuideCatalogue(baseHtml, topics, language, {origin:originInput} = {}) {
  if (!languages.includes(language)) throw new TypeError('Unsupported guide language');
  const origin = siteOrigin(originInput);
  const $ = load(baseHtml);
  let grid = $('[data-guide-grid]').first();
  if (!grid.length) grid = $('main a.group').filter((_, element) => $(element).find('h2').length).first().parent();
  if (!grid.length) throw new TypeError('Existing guide catalogue grid is missing');
  grid.attr('data-guide-grid', '');
  const paths = new Set(grid.find('a[href]').map((_, element) => $(element).attr('href')).get());
  for (const topic of publicTopics(topics)) {
    const path = route(topic, language);
    if (paths.has(path)) continue;
    grid.append(cardHtml(topic, language, origin)); paths.add(path);
  }
  const cards = grid.children('[data-guide-card]').toArray();
  cards.sort((left, right) => {
    const a = $(left).attr('data-published') || '', b = $(right).attr('data-published') || '';
    if (!a && b) return -1;
    if (a && !b) return 1;
    return (Date.parse(b) || 0) - (Date.parse(a) || 0);
  });
  grid.empty().append(cards);
  const categories = [...new Set(cards.map(card => $(card).attr('data-category')).filter(Boolean))].sort((a, b) => a.localeCompare(b, language));
  const select = $('[data-guide-category]');
  const allLabel = select.find('option[value=""]').first().text();
  select.html(`<option value="">${esc(allLabel)}</option>${categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join('')}`);
  const count = $('[data-guide-count]');
  count.text(`${cards.length} ${count.attr('data-count-label') || copy[language].guides}`);
  return $.html();
}

/** Merge explicit translated slugs into the static sitemap and update reciprocal links. */
export function mergeIntelligenceSitemap(baseXml, topics, {origin:originInput} = {}) {
  const origin = siteOrigin(originInput);
  const $ = load(baseXml, {xmlMode:true});
  const root = $('urlset').first();
  if (!root.length) throw new TypeError('Existing sitemap urlset is missing');
  root.attr('xmlns:xhtml', 'http://www.w3.org/1999/xhtml').attr('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1');
  for (const topic of publicTopics(topics)) for (const language of languages) {
    const loc = origin + route(topic, language);
    const existing = root.children('url').filter((_, node) => $(node).children('loc').text() === loc);
    const retainedLastmod = existing.first().children('lastmod').text();
    existing.remove();
    const lastmod = topic.kind === 'backfill' && language === 'fr' ? retainedLastmod : validDate(topic.modifiedAt) ? topic.modifiedAt : topic.publishedAt;
    const image = imageFor(topic, language, origin);
    root.append(`<url><loc>${esc(loc)}</loc>${lastmod ? `<lastmod>${esc(lastmod)}</lastmod>` : ''}${languages.map(target => `<xhtml:link rel="alternate" hreflang="${target}" href="${esc(origin + route(topic, target))}"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${esc(origin + route(topic, 'fr'))}"/><image:image><image:loc>${esc(origin + image.src)}</image:loc><image:title>${esc(topic.translations[language].title)}</image:title></image:image></url>`);
  }
  return $.xml();
}

/** Return only a published route. Backfill never replaces the historical French body. */
export function findPublishedTopic(state, language, slug) {
  if (!languages.includes(language) || !slugValid(slug)) return null;
  const topics = Array.isArray(state) ? state : state?.topics;
  return publicTopics(topics).find(topic => !(topic.kind === 'backfill' && language === 'fr') && topic.translations[language].slug === slug) || null;
}

/** Add the backfill equivalents to a preserved historical page without touching its body. */
export function mergeHistoricalAlternates(baseHtml, topics, language, {origin:originInput, path, knownPaths} = {}) {
  const origin = siteOrigin(originInput);
  if (!languages.includes(language)) return baseHtml;
  const topic = publicTopics(topics).find(item => item.kind === 'backfill' && route(item, language) === path);
  if (!topic) return baseHtml;
  const $ = load(baseHtml);
  setAlternates($, topic, origin);
  replaceLanguageControls($, topic, language, origin, knownPaths);
  return $.html();
}
