import {load} from 'cheerio';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {company} from './content.mjs';
import {addAnalytics} from './analytics.mjs';
import {editorial,editorialDate,creationSections,guideBody,contentHelpers,pick} from './seo-content.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const canonicalAliases={legal:'mentions-legales',privacy:'politique-confidentialite',terms:'cgu'};
export const nonIndexable=new Set(['404','espace-client','create','rendez-vous']);
export const revisedSlugs=new Set(['','creation-entreprise','tarif/creation','contact',...['general','online','sarl','foreign'].map(k=>editorial[k].slug)]);
const copyCatalog=Object.assign({},...[1,2,3].map(n=>JSON.parse(readFileSync(new URL(`./translations/part-${n}.json`,import.meta.url),'utf8'))));
const translated=(s,l)=>l==='fr'?s:copyCatalog[createHash('sha1').update(s).digest('hex').slice(0,12)]?.[l];
const version=createHash('sha256').update(readFileSync(new URL('../public/seo.css',import.meta.url))).digest('hex').slice(0,12);
const imageDimensions=JSON.parse(readFileSync(new URL('./image-dimensions.json',import.meta.url),'utf8'));
const optimizedImages=JSON.parse(readFileSync(new URL('./image-optimized.json',import.meta.url),'utf8'));

export function optimizeSeo(pages){
  for(const [file,html] of Object.entries(pages)){
    if(!/^(fr|en|ar)\//.test(file))continue;
    const l=file.split('/')[0],slug=file.slice(3).replace(/(?:\/)?index\.html$/,'');
    const $=load(html),{t,a,p,section}=contentHelpers(l);
    const route=s=>`/${l}/${s?s+'/':''}`;
    const canonicalSlug=canonicalAliases[slug]||slug;
    const canonical=company.origin+route(canonicalSlug);
    const guide=slug.startsWith('guides/')&&!slug.startsWith('guides/page/');
    const key=['general','online','sarl','foreign'].find(k=>editorial[k].slug===slug);
    const setIntro=value=>{$('main h1').first().nextAll('p').first().text(value);};
    const metadata=(title,description)=>{$('title').text(title);$('meta[name="description"]').attr('content',description);};

    if(slug==='creation-entreprise'){
      const c=editorial.creation;metadata(c.title[l],c.description[l]);$('main h1').text(c.h1[l]);
      const heroParagraphs=$('main >section').first().find('p');heroParagraphs.first().text(c.intro[l]);heroParagraphs.slice(1).remove();
      $('main details').eq(1).find('p').text(t('Nous étudions notamment les projets de SARL et SARL AU. Une autre forme peut être envisagée selon l’activité, les associés et l’organisation souhaitée ; le choix est examiné avec vous.','We assess SARL and single-member SARL projects in particular. Other structures may suit the activity, shareholders and intended organisation; we review the choice with you.','ندرس خصوصاً مشاريع SARL وSARL AU. وقد يلائم شكل آخر النشاط والشركاء والتنظيم المطلوب؛ ندرس الاختيار معك.'));
      $('main details').eq(3).find('p').text(t('Préparez les identités des associés et du gérant, l’activité, le nom et le siège envisagés. La liste exacte, les pouvoirs et les éventuelles formalités bancaires sont précisés selon la structure et votre dossier.','Prepare shareholder and manager identities, the activity, proposed name and registered office. The precise checklist, signing powers and any banking formalities depend on the structure and your file.','حضّر هويات الشركاء والمسيّر والنشاط والاسم والمقر المرتقبين. تُحدَّد اللائحة الدقيقة والصلاحيات والإجراءات البنكية المحتملة حسب الشكل القانوني والملف.'));
      // Replace the slogan, retaining the existing visual component.
      $('main h2').first().text(t('Créer votre société avec un accompagnement adapté','Create your company with tailored support','أسّس شركتك بمواكبة ملائمة'));
      const faq=$('main > section').last();
      faq.before(`<div class="seo-content">${creationSections(l)}<a class="felexia-action" href="${route('create')}">${t('Démarrer mon dossier','Start my project','ابدأ ملف مشروعي')}</a></div>`);
      const steps=$('main h2').filter((_,e)=>/étapes de création|formation steps|خطوات/i.test($(e).text())).first();
      if(steps.length)steps.text(t('Comment créer une entreprise au Maroc ?','How do you start a company in Morocco?','كيف تؤسّس شركة في المغرب؟'));
    }
    if(key){
      const c=editorial[key];metadata(c.seoTitle[l]+' | Felexia Conseils',c.description[l]);$('main h1').text(c.title[l]);setIntro(c.intro[l]);
      const prose=$('.prose-lg').first();
      // Preserve old fragment URLs after the editorial rewrite.
      const oldIds=prose.find('[id]').map((_,e)=>$(e).attr('id')).get();
      prose.html(guideBody(key,l));
      for(const id of oldIds){
        let target='seo-step-1';
        if(/faq/.test(id))target='seo-faq';
        else if(/pourquoi.*felexia|pret|sources/.test(id))target='seo-next';
        else if(/capital|financ|banc|changes/.test(id))target=key==='foreign'?'seo-step-4':key==='sarl'?'seo-step-2':'seo-step-5';
        else if(/statut|signature|procuration|depot|immatriculation/.test(id))target=key==='online'||key==='foreign'?'seo-step-3':'seo-step-4';
        else if(/document|piece|siege|domicil/.test(id))target=key==='foreign'?'seo-step-2':'seo-step-3';
        else if(/forme|sarl|nom|denomination|certificat/.test(id))target='seo-step-2';
        else if(/erreur|obligation|fiscal|delai|cout|apres/.test(id))target='seo-step-5';
        prose.find('#'+target).prepend(`<span class="seo-archive-anchor" id="${esc(id)}"></span>`);
      }
      const headings=prose.find('h2');
      $('aside nav ul').first().html(headings.map((_,e)=>`<li><a class="block px-3 py-1.5" href="#${$(e).parent().attr('id')}">${esc($(e).text())}</a></li>`).get().join(''));
      $('main time').attr('datetime',editorialDate).text(t('Mis à jour le 22 septembre 2026','Updated 22 September 2026','حُدّث في 22 سبتمبر 2026'));
      $('main header span').filter((_,e)=>/min de lecture|minute read|دقائق.*قراءة/.test($(e).text())).remove();
      $('main time').next('span[aria-hidden="true"]').remove();
    }
    if(slug==='tarif/creation'){
      metadata(t('Prix de création d’entreprise au Maroc : devis | Felexia Conseils','Company formation costs in Morocco: quotes | Felexia Conseils','تكلفة تأسيس شركة بالمغرب: عرض سعر | Felexia Conseils'),t('Comprenez le coût d’une création de société au Maroc : honoraires, formalités et prestations. Comparez les packs Felexia et demandez un devis détaillé.','Understand company formation costs in Morocco: fees, formalities and services. Compare Felexia packages and request a detailed quote.','افهم تكلفة تأسيس شركة بالمغرب من أتعاب وإجراءات وخدمات. قارن عروض Felexia واطلب تسعيرة مفصّلة.'));
      $('main h1').text(t('Prix et tarifs de création d’entreprise au Maroc','Company formation costs in Morocco','أسعار وتكلفة تأسيس شركة بالمغرب'));
      $('main').append(`<div class="seo-content">${section('comprendre-devis',['Que comprend le coût de création d’une société ?','What makes up company formation costs?','ماذا تشمل تكلفة تأسيس الشركة؟'],p('Le coût dépend notamment de la forme juridique, des prestations choisies, des formalités nécessaires et de votre situation. Les packs ci-dessus restent sur devis. Demandez une ventilation entre honoraires, frais administratifs, domiciliation éventuelle et autres prestations.','The cost depends on the legal structure, selected services, formalities and your circumstances. The packages above remain quote-based. Ask for a breakdown of professional fees, administrative charges, any domiciliation and other services.','تتوقف التكلفة على الشكل القانوني والخدمات والإجراءات ووضعيتك. تبقى العروض أعلاه حسب دراسة الملف. اطلب تفصيل الأتعاب والمصاريف الإدارية والتوطين المحتمل والخدمات الأخرى.')+p('Vérifiez ce qui est inclus, les exclusions, le traitement des frais supplémentaires et les conditions de règlement avant de vous engager. Le capital de la société et son budget de fonctionnement ne sont pas des honoraires de création.','Check inclusions, exclusions, additional charges and payment terms before committing. Company capital and operating funds are not formation fees.','تحقّق قبل الالتزام من الخدمات المشمولة والمستثناة والمصاريف الإضافية وشروط الأداء. رأس مال الشركة وميزانية تشغيلها ليسا أتعاب تأسيس.')+`<p>${a('creation-entreprise','Voir l’accompagnement à la création','Explore company formation support','اطّلع على مواكبة التأسيس')} · ${a('contact','Demander mon devis détaillé','Request my detailed quote','اطلب عرض سعر مفصّلاً')}</p>`)}</div>`);
    }
    if(slug===''){
      $('main h1').text(t('Felexia Conseils : créez et développez votre entreprise au Maroc','Felexia Conseils: start and grow your business in Morocco','Felexia Conseils: أسّس مقاولتك وطوّرها في المغرب'));
      $('main').append(`<div class="seo-content">${section('reperes-creation',['Votre projet de création, de la réflexion au dossier','Your formation project, from decisions to documents','مشروع تأسيسك، من الفكرة إلى الملف'],p('Entrepreneur au Maroc, MRE ou investisseur : préparez vos choix avec un cabinet et avancez avec des repères clairs. Retrouvez notre accompagnement et les guides utiles selon votre situation.','Entrepreneur in Morocco, Moroccan abroad or investor: prepare your decisions with an advisory firm and clear guidance. Explore our support and the guides relevant to your situation.','مقاول في المغرب أو مغربي بالخارج أو مستثمر: حضّر قراراتك مع مكتب استشاري ومعلومات واضحة. اكتشف مواكبتنا والأدلة المناسبة لوضعيتك.')+`<p>${a('creation-entreprise','Création d’entreprise au Maroc','Company formation in Morocco','تأسيس شركة في المغرب')} · ${a('tarif/creation','Tarifs sur devis','Tailored quotes','تسعيرة حسب المشروع')} · ${a('guides','Tous les guides','All guides','جميع الأدلة')} · ${a('guides/creer-une-sarl-maroc','Créer une SARL','Forming a SARL','تأسيس SARL')} · ${a('guides/mre-etranger','Entreprendre depuis l’étranger','Starting from abroad','التأسيس من الخارج')}</p>`)}</div>`);
    }
    if(slug==='contact'){
      metadata(t('Création d’entreprise à Marrakech : contact | Felexia Conseils','Company formation in Marrakech: contact | Felexia Conseils','تأسيس شركة بمراكش: تواصل معنا | Felexia Conseils'),t('Rencontrez Felexia Conseils à Mabrouka, Marrakech, sur rendez-vous. Création de société au Maroc, devis et échanges par téléphone, WhatsApp ou formulaire.','Meet Felexia Conseils in Mabrouka, Marrakech, by appointment. Company formation in Morocco, tailored quotes, phone, WhatsApp and online enquiries.','قابل Felexia Conseils بمبروكة، مراكش، بموعد مسبق. تأسيس الشركات بالمغرب وعروض أسعار وتواصل بالهاتف وواتساب أو النموذج.'));
      $('main').append(`<div class="seo-content">${section('cabinet-marrakech',['Votre cabinet pour créer une entreprise à Marrakech','Your company formation adviser in Marrakech','مكتبك لمواكبة تأسيس شركة بمراكش'],p('Le cabinet Felexia Conseils est situé à Mabrouka, Marrakech. Nous recevons sur rendez-vous pour préparer votre projet, examiner les informations disponibles et convenir des prochaines étapes. Notre accompagnement s’adresse également aux entrepreneurs dans tout le Maroc et aux porteurs de projet résidant à l’étranger.','Felexia Conseils is based in Mabrouka, Marrakech. We meet by appointment to discuss your project, review available information and agree next steps. We also support entrepreneurs throughout Morocco and project owners living abroad.','يوجد مكتب Felexia Conseils بمبروكة، مراكش. نستقبلك بموعد لدراسة مشروعك والمعلومات المتاحة والاتفاق على الخطوات التالية. وتشمل مواكبتنا المقاولين في جميع أنحاء المغرب وأصحاب المشاريع المقيمين بالخارج.')+`<p>${esc(company.address)}</p>`+p('Pour préparer le rendez-vous, indiquez votre activité, votre situation actuelle et les questions à traiter. Le créneau demandé dans le formulaire reste à confirmer par le cabinet. Vous pouvez aussi commencer par un échange à distance.','To prepare the appointment, explain your activity, current circumstances and questions. A requested time in the form must be confirmed by the firm. You can also begin with a remote discussion.','لتحضير الموعد، اذكر نشاطك ووضعيتك الحالية وأسئلتك. يبقى الموعد المطلوب في النموذج رهناً بتأكيد المكتب. ويمكن البدء بتواصل عن بُعد.')+`<p>${a('rendez-vous','Préparer mon rendez-vous à Marrakech','Request my Marrakech appointment','اطلب موعداً بمراكش')} · ${a('creation-entreprise','Découvrir les démarches de création au Maroc','Explore formation steps in Morocco','اكتشف إجراءات التأسيس بالمغرب')}</p>`)}</div>`);
    }

    // Remove the inherited unverified speed promise from every translated guide.
    for(const fr of ['Créez votre entreprise au Maroc en quelques jours','Votre fiduciaire en ligne au Maroc']){
      const old=translated(fr,l);if(!old)continue;
      $('main *').contents().filter((_,n)=>n.type==='text'&&n.data.trim()===old).each((_,n)=>{n.data=fr.startsWith('Créez')?t('Préparez votre création d’entreprise au Maroc','Plan your company formation in Morocco','حضّر تأسيس شركتك في المغرب'):t('Votre cabinet de conseil au Maroc','Your advisory firm in Morocco','مكتبك الاستشاري في المغرب');});
    }
    if(guide&&!key){
      // Copied source publication dates are not Felexia publication evidence.
      $('main time').remove();
    }
    if(guide){
      $('main aside h3').each((_,e)=>$(e).closest('aside').find('p').text(t('Présentez votre projet au cabinet. Les prestations, les frais et les modalités sont précisés dans une proposition adaptée à votre dossier.','Tell the firm about your project. Services, fees and arrangements are specified in a proposal tailored to your file.','اعرض مشروعك على المكتب. تُحدَّد الخدمات والأتعاب والشروط في عرض يناسب ملفك.')));
      const target=$('.prose-lg').first();
      if(!key&&target.length)target.append(`<p>${a('creation-entreprise','Passer des démarches à un accompagnement adapté à votre projet','Turn these steps into support tailored to your project','انتقل من فهم الإجراءات إلى مواكبة مناسبة لمشروعك')}</p>`);
    }

    // One visible breadcrumb and matching schema, including on service pages.
    let breadcrumb=$('main nav').filter((_,e)=>$(e).find('ol').length).first();
    const crumbs=[{name:t('Accueil','Home','الرئيسية'),url:company.origin+route('')}];
    if(slug){
      if(guide||slug==='guides/page/2')crumbs.push({name:t('Guides','Guides','الأدلة'),url:company.origin+route('guides')});
      const crumbName=slug==='creation-entreprise'?t('Création d’entreprise','Company formation','تأسيس الشركات'):slug==='contact'?t('Contact à Marrakech','Contact in Marrakech','التواصل بمراكش'):$('main h1').first().text().trim();
      crumbs.push({name:crumbName,url:canonical});
      const markup=`<ol>${crumbs.map((c,i)=>`<li>${i===crumbs.length-1?`<span aria-current="page">${esc(c.name)}</span>`:`<a href="${new URL(c.url).pathname}">${esc(c.name)}</a>`}</li>`).join('')}</ol>`;
      if(breadcrumb.length)breadcrumb.attr('class','seo-breadcrumb').html(markup);
      else{$('main').prepend(`<nav class="seo-breadcrumb" aria-label="${t('Fil d’Ariane','Breadcrumb','مسار التصفح')}">${markup}</nav>`);breadcrumb=$('main>.seo-breadcrumb');}
    }
    const title=$('title').text(),description=$('meta[name="description"]').attr('content');
    $('link[rel="canonical"]').attr('href',canonical);
    $('link[hreflang]').remove();
    for(const lang of ['fr','en','ar'])if(pages[`${lang}/${canonicalSlug?canonicalSlug+'/':''}index.html`])$('head').append(`<link rel="alternate" hreflang="${lang}" href="${company.origin}/${lang}/${canonicalSlug?canonicalSlug+'/':''}">`);
    $('head').append(`<link rel="alternate" hreflang="x-default" href="${company.origin}/fr/${canonicalSlug?canonicalSlug+'/':''}">`);
    $('meta[name="robots"]').remove();
    if(nonIndexable.has(slug))$('head').append('<meta name="robots" content="noindex,follow">');
    const socialPhoto=$('main img').filter((_,e)=>!/logos?\//.test($(e).attr('src')||'')&&!/logo-/.test($(e).attr('src')||'')).first();
    const image=socialPhoto.attr('src')||'/assets/logo-original.png';
    const absoluteImage=new URL(image,company.origin).href;
    const social={'og:title':title,'og:description':description,'og:url':canonical,'og:type':guide?'article':'website','og:site_name':company.name,'og:locale':{fr:'fr_MA',en:'en_GB',ar:'ar_MA'}[l],'og:image':absoluteImage,'og:image:alt':socialPhoto.attr('alt')||company.name};
    for(const [name,value]of Object.entries(social)){$(`meta[property="${name}"]`).remove();$('head').append(`<meta property="${name}" content="${esc(value)}">`);}
    for(const [name,value]of Object.entries({'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':absoluteImage})){$(`meta[name="${name}"]`).remove();$('head').append(`<meta name="${name}" content="${esc(value)}">`);}
    // Replace, never append to, the previous single ProfessionalService block.
    const org=company.origin+'/#organization',site=company.origin+'/#website';
    const graph=[{'@type':['Organization','ProfessionalService'],'@id':org,name:company.name,url:company.origin,logo:company.origin+'/assets/logo-simple-mark.svg',telephone:company.officeTel,email:company.email,address:{'@type':'PostalAddress',streetAddress:'Résidence Al Ihssane, Immeuble 3, Appartement 4, Mabrouka',addressLocality:'Marrakech',addressCountry:'MA'},areaServed:{'@type':'Country',name:'Morocco'}},{'@type':'WebSite','@id':site,url:company.origin,name:company.name,inLanguage:['fr','en','ar'],publisher:{'@id':org}},{'@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:title,description,inLanguage:l,isPartOf:{'@id':site},about:{'@id':org}}];
    if(slug){graph.push({'@type':'BreadcrumbList','@id':canonical+'#breadcrumb',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,name:c.name,item:c.url}))});graph[2].breadcrumb={'@id':canonical+'#breadcrumb'};}
    if(guide){const article={'@type':'Article','@id':canonical+'#article',headline:$('main h1').text(),description,inLanguage:l,image:absoluteImage,mainEntityOfPage:{'@id':canonical+'#webpage'},publisher:{'@id':org}};if($('main').text().includes('Felexia Conseils'))article.author={'@id':org};if(key)article.dateModified=editorialDate;graph.push(article);}
    $('script[type="application/ld+json"]').remove();$('head').append(`<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script><link rel="stylesheet" href="/seo.css?v=${version}">`);
    // De-prioritise images lower on the page; never eagerly fetch every photo.
    $('main img').slice(1).removeAttr('fetchpriority').attr({loading:'lazy',decoding:'async'});
    if(!slug)$('main img').removeAttr('fetchpriority').attr('loading','lazy');
    $('img').each((_,e)=>{const original=$(e).attr('src');if(optimizedImages[original])$(e).attr('src',optimizedImages[original]);const size=imageDimensions[$(e).attr('src')];if(size)$(e).attr({width:String(size[0]),height:String(size[1])});});
    addAnalytics($,l,slug);
    pages[file]=$.html();
  }
  return pages;
}
