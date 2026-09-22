import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {company} from './content.mjs';
import {contactForm, wizard} from './forms.mjs';
import {headerTools, languageSwitch} from './header-tools.mjs';

const normalize = value => String(value).replace(/\s+/g, ' ').trim();
const keyFor = value => createHash('sha1').update(normalize(value)).digest('hex').slice(0,12);
const legalAliases = {'mentions-legales':'legal','politique-confidentialite':'privacy','cgu':'terms'};
const legalTitles = {
  'mentions-legales': {en:'Legal information',ar:'المعلومات القانونية'},
  'politique-confidentialite': {en:'Privacy policy',ar:'سياسة حماية البيانات الشخصية'},
  cgu: {en:'General terms of use',ar:'الشروط العامة للاستخدام'}
};
const excluded = 'script,style,.felexia-legacy,.felexia-form-zone,.felexia-header-tools,.felexia-languages,.felexia-logo';
const readCatalog = name => JSON.parse(readFileSync(new URL(`./translations/${name}.json`,import.meta.url),'utf8'));

// Build-time translations: the browser receives complete, indexable pages with
// the exact same template and photographs as French, without a translation API.
export function localizeReferenceSite(frenchPages, existing, version) {
  const catalog = Object.assign({},...['part-1','part-2','part-3','extra'].map(readCatalog));
  for(const source of readCatalog('source'))if(/MyLegal/i.test(source.fr))catalog[keyFor(source.fr.replace(/mylegal(?:\.ma)?(?:\s+SARL\s*AU)?/gi,company.name))]=catalog[source.id];
  const missing = new Map();
  const result = {};
  const files = Object.keys(frenchPages).filter(file=>file.startsWith('fr/'));
  const knownPaths = new Set(files.flatMap(file=>['fr','en','ar'].map(l=>'/'+file.replace(/^fr\//,l+'/').replace(/index\.html$/,''))));
  function translate(value,language,route) {
    const text=normalize(value);
    if (!/[A-Za-zÀ-ÿ]/.test(text) || /^(?:https?:|tel:|mailto:)/.test(text)) return value;
    const translated=catalog[keyFor(text)]?.[language];
    if (typeof translated!=='string' || !translated.trim()) {
      missing.set(text,route);
      return value;
    }
    return value.replace(/\S[\s\S]*\S|\S/,translated.replace(/MyLegal/gi,'Felexia Conseils'));
  }
  for (const file of files) for (const language of ['en','ar']) {
    const slug=file.slice(3).replace(/(?:\/)?index\.html$/,'');
    const destination=file.replace(/^fr\//,language+'/');
    const path='/'+destination.replace(/index\.html$/,'');
    const $=load(frenchPages[file]);
    const nativeHtml=existing[destination] || existing[`${language}/${legalAliases[slug]}/index.html`];
    const native=nativeHtml?load(nativeHtml):null;
    const legacy=$('main .felexia-legacy').first();
    const hasNativeMain=Boolean(legacy.length&&native);
    const nativeTitle=hasNativeMain?native('title').text():null;
    const nativeDescription=hasNativeMain?native('meta[name="description"]').attr('content'):null;

    $('body *').contents().each((_,node)=>{
      if(node.type==='text'&&!$(node.parent).closest(excluded).length)node.data=translate(node.data,language,path);
    });
    $('[alt],[aria-label],[title],[placeholder]').each((_,element)=>{
      if($(element).closest(excluded).length)return;
      for(const attribute of ['alt','aria-label','title','placeholder']) {
        const value=$(element).attr(attribute);
        if(value)$(element).attr(attribute,translate(value,language,path));
      }
    });

    // The existing translated service/legal content has the same component
    // model as its French counterpart; retain it inside the shared FR shell.
    if(hasNativeMain) {
      const content=legalAliases[slug]&&native('main .legal-content').length?native('main .legal-content').html():native('main').html();
      legacy.html(content);
    }
    $('.felexia-form-zone').each((_,zone)=>{
      const element=$(zone);
      if(element.find('.wizard').length)element.html(wizard(language));
      else if(element.find('form').length) {
        const appointment=element.find('[name="kind"]').attr('value')==='appointment';
        const fragment=load(contactForm(language,appointment),null,false);
        if(element.hasClass('is-embedded')){fragment('form>h2').remove();element.html(fragment('form').prop('outerHTML'));}
        else element.html(fragment.html());
      }
    });

    const title=legalTitles[slug]?legalTitles[slug][language]+' | Felexia Conseils':nativeTitle||translate($('title').text(),language,path);
    const description=nativeDescription||translate($('meta[name="description"]').attr('content')||'',language,path);
    $('html').attr({lang:language,dir:language==='ar'?'rtl':'ltr'});
    $('body').attr('data-lang',language);
    $('title').text(title);
    $('meta[name="description"],meta[property="og:description"]').attr('content',description);
    $('meta[property="og:title"]').attr('content',title);
    $('link[rel="canonical"]').attr('href',company.origin+path);
    $('meta[property="og:url"]').attr('content',company.origin+path);
    $('meta[property="og:locale"]').remove();
    $('head').append(`<meta property="og:locale" content="${language==='ar'?'ar_MA':'en_GB'}">`);

    // Switch all internal destinations, including canonical links nested in
    // sharing URLs, while preserving IDs, form values and the local endpoint.
    $('[href]').not('[hreflang]').each((_,element)=>{
      const value=$(element).attr('href');
      if(value.startsWith('/fr/'))$(element).attr('href',value.replace(/^\/fr\//,`/${language}/`));
      else if(value.startsWith(company.origin+'/fr/'))$(element).attr('href',value.replace(company.origin+'/fr/',company.origin+`/${language}/`));
    });
    $('a[data-share-guide]').each((_,element)=>{
      const network=$(element).attr('data-share-guide');
      const share=new URL($(element).attr('href'));
      share.searchParams.set(network==='facebook'?'u':'url',company.origin+path);
      if(network==='x')share.searchParams.set('text',$('main h1').text().trim());
      $(element).attr('href',share.href);
    });
    $('a[href^="mailto:"]').each((_,element)=>{
      const href=$(element).attr('href');
      if(/subject=Candidature/.test(href))$(element).attr('href',`mailto:${company.email}?subject=${encodeURIComponent((language==='ar'?'ترشيح':'Job application')+' Felexia Conseils')}`);
    });
    $('.felexia-header-tools').replaceWith(headerTools(language,slug,knownPaths));
    $('footer .felexia-languages').html(languageSwitch(language,slug,knownPaths));
    $('link[rel="alternate"][hreflang]').remove();
    for(const l of ['fr','en','ar'])$('head').append(`<link rel="alternate" hreflang="${l}" href="${company.origin}/${l}/${slug?slug+'/':''}">`);
    $('head').append(`<link rel="alternate" hreflang="x-default" href="${company.origin}/fr/${slug?slug+'/':''}">`);
    if(slug==='404')$('head').append('<meta name="robots" content="noindex,follow">');
    if(language==='ar') {
      $('a[href^="tel:"],a[href^="mailto:"],input[type="email"],input[type="tel"]').attr('dir','ltr');
      $('.felexia-logo').attr('dir','ltr');
    }
    result[destination]=$.html();
  }
  if(missing.size) {
    mkdirSync(new URL('../.sites-runtime/',import.meta.url),{recursive:true});
    writeFileSync(new URL('../.sites-runtime/missing-translations.json',import.meta.url),JSON.stringify([...missing].map(([fr,path])=>({id:keyFor(fr),fr,path})),null,2));
    const details=[...missing].slice(0,20).map(([text,path])=>`${path}: ${text}`).join('\n');
    throw new Error(`Missing ${missing.size} complete EN/AR translations:\n${details}`);
  }
  return result;
}
