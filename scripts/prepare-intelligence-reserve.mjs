import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,join,sep} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import sharp from 'sharp';
import {curatedCoverManifest} from '../src/intelligence/curated-covers.mjs';

const projectRoot=fileURLToPath(new URL('../',import.meta.url));

/** Fail before fetching or writing if a subject's authored artwork is unavailable. */
export async function readCuratedReserveImages(topics,{entries=curatedCoverManifest.entries,publicRoot=join(projectRoot,'public')}={}) {
  const images=new Map();
  const root=resolve(publicRoot);
  for(const topic of topics){
    const entry=entries?.[topic.id];
    if(!entry?.image||entry.image.method!=='ai-generated-imagegen'||entry.image.rights!=='owned'||entry.image.verified!==true)throw new Error('Curated generated cover required for '+topic.id+'; generic artwork will not be recreated');
    const image=entry.image;
    if(image.width!==1280||image.height!==800||!Number.isFinite(Date.parse(image.createdAt)))throw new Error('Invalid curated cover metadata for '+topic.id);
    for(const language of ['fr','en','ar'])if(typeof entry.alt?.[language]!=='string'||!entry.alt[language].trim())throw new Error('Missing '+language+' curated cover description for '+topic.id);
    for(const [src,width,height] of [[image.src,1280,800],[image.smallSrc,640,400]]){
      if(typeof src!=='string'||!/^\/images\/guides\/illustrations\/[a-z0-9-]+\.webp$/.test(src))throw new Error('Invalid curated cover path for '+topic.id);
      const filename=resolve(root,'.'+src);
      if(!filename.startsWith(root+sep))throw new Error('Curated cover outside public directory for '+topic.id);
      let metadata;
      try{metadata=await sharp(await readFile(filename)).metadata();}catch(error){throw new Error('Curated cover file unavailable for '+topic.id+': '+src,{cause:error});}
      if(metadata.format!=='webp'||metadata.width!==width||metadata.height!==height)throw new Error('Curated cover dimensions do not match '+topic.id+': '+src);
    }
    images.set(topic.id,{image:{...image},alt:{...entry.alt}});
  }
  return images;
}

export async function prepareIntelligenceReserve(){
const now=new Date().toISOString();
const fragments=await Promise.all(['a','b'].map(part=>readFile(new URL('../src/intelligence/reserve-'+part+'.json',import.meta.url),'utf8').then(JSON.parse)));
const topics=fragments.flatMap(p=>p.topics);
if(topics.length!==14||new Set(topics.map(t=>t.id)).size!==14)throw new Error('Exactly 14 unique original topics required');
const images=await readCuratedReserveImages(topics);
const sourceResponse=await fetch('https://www.felexiaconseils.com/fr/conseil-gestion/',{redirect:'error',signal:AbortSignal.timeout(15000)});
if(!sourceResponse.ok)throw new Error('Felexia service source not available');
const sourceHtml=await sourceResponse.text();
const {load}=await import('cheerio');const $=load(sourceHtml);$('script,style,nav,footer').remove();
const sourceText=$('main').text().replace(/\s+/g,' ').trim();
const source={id:'felexia-practice',url:'https://www.felexiaconseils.com/fr/conseil-gestion/',issuer:'Felexia Conseils',title:$('h1').first().text().trim(),language:'fr',documentType:'service-page',trust:'first-party',status:'retrieved',discoveredAt:now,retrievedAt:now,fingerprint:createHash('sha256').update(sourceHtml).digest('hex'),text:sourceText,excerpt:sourceText.slice(0,1500),scope:'Contexte des prestations réelles du cabinet. Les recommandations de gestion des guides sont une rédaction originale; cette page ne valide aucune règle juridique ou fiscale.'};
for(const topic of topics){
  const curated=images.get(topic.id);
  topic.image={...curated.image};
  for(const language of ['fr','en','ar'])topic.translations[language].alt=curated.alt[language];
  topic.verifiedAt=now;topic.createdAt=now;
  topic.provenance={...topic.provenance,aiAssisted:true,aiGenerated:false,reviewedBy:null,method:'original-editorial',qualityControl:'documentary-and-editorial-code-review',scope:'Practical management recommendations; no legal or tax rules.'};
}
const extraIdeas=[
 ['organiser-un-registre-de-retours-clients','Organiser un registre de retours clients exploitable'],
 ['preparer-un-plan-de-continuite-operationnelle','Préparer un plan de continuité des activités courantes'],
 ['clarifier-la-repartition-des-responsabilites','Clarifier les responsabilités dans une petite équipe'],
 ['preparer-un-cahier-de-tests-logiciel','Préparer une recette métier avant de choisir un logiciel'],
 ['organiser-la-reception-des-pieces-comptables','Organiser la collecte des pièces destinées au comptable'],
 ['suivre-les-dependances-dun-projet','Suivre les dépendances d’un projet sans multiplier les réunions'],
 ['structurer-un-compte-rendu-actionnable','Rédiger un compte rendu qui débouche sur des actions'],
 ['organiser-une-base-de-connaissances-interne','Organiser une base de connaissances accessible à l’équipe'],
 ['qualifier-une-demande-commerciale','Préparer une grille de qualification des demandes commerciales'],
 ['mettre-en-place-un-journal-dincidents','Apprendre des incidents opérationnels avec un journal utile'],
 ['definir-des-indicateurs-operationnels-utiles','Choisir des indicateurs opérationnels reliés à une décision'],
 ['preparer-une-reunion-de-lancement','Préparer la réunion de lancement d’une mission de conseil'],
 ['organiser-les-demandes-de-modification','Organiser les demandes de modification pendant un projet'],
 ['preparer-un-dossier-de-retour-dexperience','Capitaliser le retour d’expérience à la fin d’un projet'],
 ['organiser-les-priorites-de-la-semaine','Organiser les priorités de la semaine dans une PME'],
 ['construire-une-checklist-de-livraison','Préparer une checklist de livraison de service au client']
].map(([key,title])=>({id:`idea-${key}`,title,intent:title,intentKey:key,category:'Gestion',kind:'new',risk:'low',authorized:true,status:'idea',sourceIds:['felexia-practice'],priority:50,claims:[],provenance:{method:'editorial-idea',reviewedBy:null}}));
await writeFile(new URL('../src/intelligence/reserve.json',import.meta.url),JSON.stringify({createdAt:now,scope:'14 original complete trilingual practical guides and 16 additional ideas, not yet published',sources:[source],topics:[...topics,...extraIdeas]},null,2)+'\n');
return {complete:topics.length,ideas:topics.length+extraIdeas.length,languageVersions:topics.length*3,sourceVerified:sourceResponse.status,createdAt:now};

}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)console.log(JSON.stringify(await prepareIntelligenceReserve()));
