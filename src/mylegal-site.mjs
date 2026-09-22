import {readFileSync, writeFileSync, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {load} from 'cheerio';
import {company} from './content.mjs';
import {contactForm, wizard} from './forms.mjs';
import {adaptReferenceContent} from './reference-content.mjs';
import {headerTools, languageSwitch, simplifiedLogo} from './header-tools.mjs';
import {localizeReferenceSite} from './localize-reference.mjs';
import {optimizeSeo} from './seo.mjs';

// Frozen public pages supplied by the owner. Remote scripts are never executed.
const read = path => readFileSync(new URL('../'+path, import.meta.url), 'utf8');
const manifest = () => JSON.parse(read('reference/mylegal/pages-manifest.json'));
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const localRoute = route => '/fr'+(route==='/'?'/':route.replace(/\/$/,'')+'/');
const legalRoutes = {'/mentions-legales':'legal','/politique-confidentialite':'privacy','/cgu':'terms'};
const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`;

function localLink(value, route) {
  if (!value || value.startsWith('#')) return value;
  if (/^mailto:/i.test(value)) return `mailto:${company.email}`;
  if (/^tel:/i.test(value)) return `tel:${company.tel}`;
  let url; try {url=new URL(value,'https://mylegal.ma'+route);} catch {return value;}
  if (/^(www\.)?mylegal\.ma$/.test(url.hostname)) {
    if(url.pathname==='/guides'&&url.searchParams.get('page')==='2')return '/fr/guides/page/2/'+url.hash;
    return localRoute(url.pathname)+url.search+url.hash;
  }
  if (url.hostname==='app.mylegal.ma') return url.pathname.includes('create-company')?'/fr/create/':'/fr/espace-client/';
  if (url.hostname==='wa.me') return 'https://wa.me/'+company.whatsapp;
  if (/google\./.test(url.hostname)&&/maps|review/.test(value)||url.hostname==='g.page') return mapHref;
  // Sharing a guide must share its new local canonical URL.
  for(const [key,val] of url.searchParams) if (/mylegal/i.test(val)) url.searchParams.set(key,val.replace(/https?:\/\/(?:www\.)?mylegal\.ma[^\s]*/gi,company.origin+localRoute(route)).replace(/mylegal(?:\.ma)?/gi,company.name));
  return url.href;
}

function brandText(value) {
  if(value.trim()==='Oasis Offices Latitudes')return value.replace('Oasis Offices Latitudes',company.name);
  return value.replace(/contact@mylegal\.ma/gi,company.email)
    .replace(/mylegal(?:\.ma)?(?:\s+SARL\s*AU)?/gi,company.name)
    .replace(/\+212\s*6\s*00\s*71\s*00\s*60/g,company.phone)
    .replace(/Oasis Offices Latitudes,?\s*(?:Route de l['’]Oasis[, —·]*\s*)?(?:Bureau 304[, —·]*\s*)?(?:Maarif[, —·]*\s*)?(?:Casablanca)?/gi,company.address)
    .replace(/Route de l['’]Oasis\s*[·—,]?\s*Maarif,?\s*Casablanca/gi,'Mabrouka · Marrakech, Maroc')
    .replace(/Quartier Maarif/gi,'Mabrouka, Marrakech').replace(/Bureau 304/g,'Immeuble 3 · Appartement 4')
    .replace(/Notre bureau à Casablanca/g,'Notre cabinet au Maroc')
    .replace(/Ilyass et toute l['’]équipe d['’]experts Felexia Conseils/g,'Toute l’équipe de Felexia Conseils')
    .replace(/Toute l’équipe de Felexia Conseils sont/g,'Toute l’équipe de Felexia Conseils est');
}

const formZone = content => `<div class="felexia-form-zone">${content}</div>`;
const contactBlock = () => `<div><h3 class="felexia-contact-title">Contactez-nous</h3><ul class="felexia-contact-details text-sm text-brand-midnight/85"><li><a href="${esc(mapHref)}">${esc(company.address)}</a></li><li><a href="tel:${company.officeTel}">Bureau : ${company.officePhone}</a></li><li><a href="tel:${company.tel}">Mobile : ${company.phone}</a></li><li><a href="https://wa.me/${company.whatsapp}">WhatsApp : +212 661 400 352</a></li><li><a href="mailto:${company.email}">${company.email}</a></li></ul></div>`;

export function renderReferenceSite(existing) {
  const pages=[...manifest().pages,{route:'/guides/page/2',file:'reference/mylegal/pages/guides-page-2.html'}];
  const assets=JSON.parse(read('reference/mylegal/pages-assets.json'));
  const initial=JSON.parse(read('reference/mylegal/assets.json'));
  const urlMap={...initial.urlMap,...assets.urlMap};
  const out={}; const inline=new Map();
  const baseCss=initial.css;
  const knownPaths=new Set([...Object.keys(existing).map(x=>'/'+x.replace(/index\.html$/,'')),...pages.map(p=>localRoute(p.route))].flatMap(path=>['fr','en','ar'].map(l=>path.replace(/^\/(fr|en|ar)\//,`/${l}/`))));
  for(const l of ['fr','en','ar'])knownPaths.add(`/${l}/espace-client/`);
  const fingerprint=createHash('sha256');
  for(const path of ['public/app.js','public/styles.css','public/header-tools.css','public/theme.css','public/theme.js','public/mylegal/home.js','public/mylegal/pages.js','public/mylegal/identity.css','public/mylegal/forms.css','public/mylegal/behavior.css','public/mylegal/site.css','src/header-tools.mjs','src/mylegal-site.mjs','src/reference-content.mjs','reference/mylegal/pages-assets.json'])fingerprint.update(read(path));
  for(const page of pages)fingerprint.update(read(page.file));
  for(const file of ['src/localize-reference.mjs','public/mylegal/locale.css','public/mylegal/interaction-copy.js',...readdirSync(new URL('./translations/',import.meta.url)).filter(f=>/\.json$/.test(f)).map(f=>'src/translations/'+f)])fingerprint.update(read(file));
  const version=fingerprint.digest('hex').slice(0,12);

  function render(source, route, mainOverride) {
    const $=load(source);
    let title=brandText($('title').text())+(route==='/guides/page/2'?' — Page 2':'');
    let description=brandText($('meta[name="description"]').attr('content')||'Felexia Conseils vous accompagne dans la création et la gestion de votre entreprise partout au Maroc.');
    $('script,noscript,link[rel="preload"],link[rel="modulepreload"],style').remove();
    $('*').contents().each((_,node)=>{if(node.type==='comment')$(node).remove();if(node.type==='text')node.data=brandText(node.data);});
    $('*').each((_,el)=>{for(const [name,value] of Object.entries(el.attribs||{})) {
      if(/^on/i.test(name)||name==='nonce'||name==='srcset')$(el).removeAttr(name);
      else if(['alt','aria-label','title'].includes(name))$(el).attr(name,brandText(value));
    }});
    $('a[href]').each((_,el)=>{
      const href=$(el).attr('href');
      // Accounts on the source site's social networks are not Felexia accounts.
      if (/instagram\.com|linkedin\.com\/company|facebook\.com\/profile/.test(href)) {$(el).remove();return;}
      $(el).attr('href',localLink(href,route));
      if($(el).attr('href').startsWith('/'))$(el).removeAttr('target rel');
      if($(el).attr('href')==='/fr/espace-client/')$(el).contents().filter((_,n)=>n.type==='text').each((_,n)=>n.data=n.data.replace(/Se connecter/g,'Mon dossier'));
    });
    $('img').each((_,el)=>{
      const src=$(el).attr('src')||'';
      const local=urlMap[src]||urlMap[new URL(src,'https://mylegal.ma').href]||src;
      if(local.includes('/4eb165b9529d.png')){
        $(el).attr({src:'/assets/logo-original.png',width:'40',height:'40',alt:company.name}).addClass('felexia-author-logo');return;
      }
      if(/mylegal-logo/.test(local)||/mylegal-logo/.test(src)) {
        $(el).attr({src:'/assets/logo-original.png',width:'1423',height:'332',alt:company.name,decoding:'async'}).addClass('felexia-brand-slot');
        return;
      }
      const office=/2026-02-Artboar(?:d-1-coxpy-6|xd-1(?:-copy-5)?)-scaled/.test(local)||/\/(?:10f7722574f2|3d66811e79df)\.webp/.test(local);
      const exterior=local.includes('photo-bureau-ext')||local.includes('fe7006bc400d');
      $(el).attr('src',office?'/mylegal/images/brand/felexia-office.webp':exterior?'/mylegal/images/brand/felexia-exterior-sans-enseigne.webp':local);
      if(office||exterior){$(el).attr({width:'1280',height:'853',alt:office?'Bureaux avec le logo original Felexia Conseils — visuel d’illustration':'Bâtiment professionnel de style marocain sans enseigne — visuel d’illustration'});}
      else if(/Felexia Conseils|Résidence Al Ihssane/.test($(el).attr('alt')||''))$(el).attr('alt','Accompagnement et espaces professionnels — photographie d’illustration');
      if(exterior)$(el).after('<span class="felexia-photo-caption">Visuel d’illustration</span>');
      $(el).attr('width',$(el).attr('width')||'1200').attr('height',$(el).attr('height')||'800');
      if(!$(el).attr('alt'))$(el).attr({alt:'','aria-hidden':'true'});
      if(!$(el).attr('loading'))$(el).attr('loading','lazy');
    });
    $('iframe').replaceWith(`<a class="felexia-map-link" href="${esc(mapHref)}" target="_blank" rel="noopener noreferrer">Voir l’adresse du cabinet sur la carte ↗</a>`);
    $('footer ul').first().replaceWith(contactBlock());
    $('main').attr('id','main');
    const adapted=adaptReferenceContent($,route);
    title=brandText(adapted.title||title);description=brandText(adapted.description||description);
    if(route==='/guides/page/2')title+=' — Page 2';

    // Felexia is a cabinet: retain the reference layouts without inventing its
    // legal identity, reviews, hiring commitments or online payment services.
    if(legalRoutes[route]){
      const original=load(existing[`fr/${legalRoutes[route]}/index.html`]);
      const article=original('main .legal-content').length?original('main .legal-content').html():original('main').html();
      const target=$('main article').first();
      if(target.length)target.html(`<div class="felexia-legacy">${article}</div>`);else $('main').html(`<div class="felexia-legacy">${article}</div>`);
      $('main nav[aria-label="Sommaire"],main aside').remove();
      // The verified legal content already supplies its own H1.
      if($('main h1').length>1)$('main h1').first().remove();
      $('main').find('p').filter((_,e)=>/Dernière mise à jour/.test($(e).text())).remove();
    }
    if(route==='/contact'){
      const fragment=load(contactForm('fr'),null,false);fragment('form>h2').remove();
      const form=fragment('form').prop('outerHTML');
      $('main form').replaceWith(`<div class="felexia-form-zone is-embedded">${form}</div>`);
      const mobile=$('main a[href^="tel:"]').first();const office=mobile.clone();office.find('h3').text('Bureau');office.find('p').text(company.officePhone);office.attr('href','tel:'+company.officeTel);mobile.before(office);mobile.find('h3').text('Mobile');
      $('main a').filter((_,e)=>$(e).text().trim()==='Prendre rendez-vous').attr('href','/fr/rendez-vous/');
      $('main a[href*="google.com/maps"]').filter((_,e)=>/avis|expérience/i.test($(e).text())).remove();
      $('main dl').filter((_,e)=>/Lundi|Vendredi/.test($(e).text())).replaceWith('<p>Accueil au cabinet sur rendez-vous.</p><a class="text-brand-ocean" href="/fr/rendez-vous/">Choisir mes préférences de rendez-vous →</a>');
    }
    if(route==='/rejoignez-nous'){
      // There is no verified list of vacancies for Felexia.
      const section=$('main h2').filter((_,e)=>$(e).text()==='Postes ouverts').closest('section');
      section.find('h2').text('Échangeons sur votre profil');
      section.find('article').remove();
      $('main button').filter((_,e)=>$(e).text().includes('Envoyer mon profil')).replaceWith('<a class="felexia-action" href="#candidature">Envoyer mon profil ↗</a>');
      $('main').append(`<section id="candidature" class="felexia-extra-section"><h2>Présentez votre candidature</h2><p>Décrivez votre expérience et les missions qui vous intéressent. Vous pouvez adresser votre CV directement à <a href="mailto:${company.email}?subject=Candidature%20Felexia%20Conseils">${company.email}</a>.</p>${formZone(contactForm('fr'))}</section>`);
    }
    if(route==='/'){
      $('main h2').filter((_,e)=>$(e).text().includes('Des entrepreneurs comme vous')).closest('section').remove();
      $('main').find('a[href*="google.com/maps"]').filter((_,e)=>/avis|Google|étoiles/i.test($(e).text())).remove();
    }
    if(mainOverride)$('main').html(mainOverride);
    $('header nav a').each((_,el)=>{
      const active=$(el).attr('href')===localRoute(route);
      $(el).removeAttr('aria-current');
      if(active)$(el).attr('aria-current','page');
      else{$(el).removeClass('text-brand-ocean');$(el).find('span[aria-hidden="true"].absolute').remove();}
    });
    const slugText=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    const headings=$('main h2,main h3,main h4,main summary');
    $('a[href]').each((_,el)=>{
      const href=$(el).attr('href');if(!href.includes('#'))return;
      const [path,raw]=href.split('#');if(path&&path!==localRoute(route))return;
      const id=decodeURIComponent(raw||'');if(!id||$('[id]').filter((_,x)=>$(x).attr('id')===id).length)return;
      const wanted=slugText($(el).text());const heading=headings.filter((_,x)=>!$(x).attr('id')&&(slugText($(x).text())===wanted||slugText($(x).text())===id)).first();
      if(heading.length)heading.attr('id',id);
    });
    $('main a').filter((_,e)=>$(e).attr('href')==='/fr/espace-client/').attr('href','/fr/contact/');
    $('main img').first().attr({loading:'eager',fetchpriority:'high'});
    $('header nav[aria-label="Navigation principale"]').attr('data-primary-navigation','');
    $('button[aria-label="Retour en haut"]').attr('data-back-to-top','');
    $('button[aria-label="Copier le lien"]').attr('data-copy-guide','');
    for(const [label,network] of [['Partager sur LinkedIn','linkedin'],['Partager sur X','x'],['Partager sur Facebook','facebook']])$(`a[aria-label="${label}"]`).attr('data-share-guide',network);
    for(const position of ['header','footer']) {
      const brandLink=$(`${position} img.felexia-brand-slot`).first().closest('a');
      brandLink.html(simplifiedLogo({footer:position==='footer'})).addClass('felexia-brand-link');
    }
    const routeSlug=route.replace(/^\/+|\/+$/g,'');
    const tools=headerTools('fr',routeSlug,knownPaths);
    if($('#mobile-menu').length)$('#mobile-menu').before(tools);else $('header').append(tools);
    $('footer').append(`<div class="felexia-languages">${languageSwitch('fr',routeSlug,knownPaths)}</div>`);
    $('[style]').each((_,el)=>{
      const style=$(el).attr('style');
      // Semantic colour roles remain stable when the generated class order changes.
      if (/(?:^|;)\s*color:\s*rgb\(26,\s*35,\s*50\)/.test(style)) $(el).addClass('felexia-editorial-ink');
      if (/(?:^|;)\s*color:\s*rgb\(11,\s*92,\s*255\)/.test(style)) $(el).addClass('felexia-editorial-link');
      if(!inline.has(style))inline.set(style,`felexia-inline-${inline.size}`);
      $(el).removeAttr('style').addClass(inline.get(style));
    });
    const canonical=company.origin+localRoute(route);
    const alternates=['fr','en','ar'].map(l=>({l,path:localRoute(route).replace('/fr/','/'+l+'/')})).filter(x=>knownPaths.has(x.path));
    const css=[...baseCss,'/mylegal/site-inline.css','/mylegal/identity.css','/mylegal/behavior.css','/mylegal/forms.css','/mylegal/legacy.css','/mylegal/site.css','/header-tools.css','/theme.css','/mylegal/locale.css'];
    const scripts=['/mylegal/interaction-copy.js','/mylegal/home.js','/mylegal/pages.js','/app.js'];
    $('html').attr({lang:'fr',dir:'ltr'});$('body').attr('data-lang','fr');
    $('head').html(`<meta charset="utf-8"><script src="/theme.js?v=${version}"></script><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="theme-color" content="#2446D8"><link rel="canonical" href="${canonical}">${alternates.map(x=>`<link rel="alternate" hreflang="${x.l}" href="${company.origin+x.path}">`).join('')}<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta property="og:type" content="website"><meta property="og:image" content="${company.origin}/assets/logo-original.png"><link rel="icon" href="/assets/logo-simple-mark.svg" type="image/svg+xml">${css.map(x=>`<link rel="stylesheet" href="${x}?v=${version}">`).join('')}${scripts.map(x=>`<script src="${x}?v=${version}" defer></script>`).join('')}<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'ProfessionalService',name:company.name,url:company.origin,logo:company.origin+'/assets/logo-original.png',email:company.email,telephone:company.officeTel,areaServed:'MA',address:{'@type':'PostalAddress',streetAddress:company.address,addressCountry:'MA'}}).replace(/</g,'\\u003c')}</script>`);
    $('body').prepend('<a class="felexia-skip" href="#main">Aller au contenu</a>');
    return $.html();
  }

  for(const page of pages)out[localRoute(page.route).slice(1)+'index.html']=render(read(page.file),page.route);
  const homeSource=read(pages.find(p=>p.route==='/').file);
  // Remaining Felexia services and guided forms keep their implementation,
  // under the same navigation and visual system as the copied public pages.
  for(const [file,html] of Object.entries(existing)){
    if(!file.startsWith('fr/')||out[file])continue;
    const route='/'+file.slice(3).replace(/\/index\.html$/,'');
    const old=load(html);const content=old('main').html();
    let main=`<div class="felexia-legacy">${content}</div>`;
    if(route==='/create')main=`<section class="felexia-extra-section"><span class="felexia-eyebrow">VOTRE PROJET AU MAROC</span><h1>Créons votre entreprise.</h1><p>Présentez-nous votre projet. Nous préparerons les prochaines étapes avec vous.</p>${formZone(wizard('fr'))}</section>`;
    if(route==='/rendez-vous')main=`<section class="felexia-extra-section"><h1>Préparons notre rendez-vous.</h1><p>Indiquez vos préférences. Le cabinet vous recontactera pour confirmer le créneau.</p>${formZone(contactForm('fr',true))}</section>`;
    const $=load(render(homeSource,route,main));$('title').text(old('title').text());$('meta[name="description"],meta[property="og:description"]').attr('content',old('meta[name="description"]').attr('content'));$('meta[property="og:title"]').attr('content',old('title').text());if(route==='/404')$('head').append('<meta name="robots" content="noindex,follow">');out[file]=$.html();
  }
  const account=`<section class="felexia-extra-section"><span class="felexia-eyebrow">FELEXIA CONSEILS</span><h1>Parlons de votre dossier.</h1><p>Pour connaître l’avancement de votre accompagnement, contactez directement votre cabinet en précisant votre nom et, si vous en disposez, la référence de votre demande.</p><div class="felexia-account-actions"><a class="felexia-action" href="/fr/contact/?service=support">Contacter le cabinet ↗</a><a class="felexia-action secondary" href="https://wa.me/${company.whatsapp}">Échanger sur WhatsApp ↗</a></div><p class="felexia-account-note">Aucun compte en ligne n’est nécessaire pour nous contacter. Cet espace ne donne pas accès à des documents privés.</p></section>`;
  const $account=load(render(homeSource,'/espace-client',account));$account('title').text('Mon dossier | Felexia Conseils');$account('meta[property="og:title"]').attr('content','Mon dossier | Felexia Conseils');$account('meta[name="description"],meta[property="og:description"]').attr('content','Contactez Felexia Conseils pour faire le point sur votre dossier et les prochaines étapes de votre accompagnement.');out['fr/espace-client/index.html']=$account.html();
  Object.assign(out,localizeReferenceSite(out,existing,version));
  writeFileSync(new URL('../public/mylegal/site-inline.css',import.meta.url),[...inline].map(([style,cls])=>`.${cls}{${style}}`).join('\n'));
  return optimizeSeo(out);
}
