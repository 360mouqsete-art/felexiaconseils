/** Exhaustive, reproducible QA of the owner-authorized Upsilon -> Felexia migration.
 * Run after npm run build. Add --http to verify every guide through the real server.
 * This script writes evidence even while the migration is incomplete, then exits 1.
 */
import {readFile, writeFile, stat, mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {once} from 'node:events';
import {load} from 'cheerio';

const root=resolve('.'), evidence='migration/upsilon';
const failures=[], warnings=[], pending=[];
const check=(condition,code,details)=>{if(!condition)failures.push({code,details});return !!condition;};
async function json(path,fallback){try{return JSON.parse(await readFile(path,'utf8'));}catch(e){if(e.code==='ENOENT'){pending.push(path);return fallback;}throw e;}}
async function text(path){try{return await readFile(path,'utf8');}catch{return '';}}
const normalize=s=>String(s||'').normalize('NFC').replace(/\s+/g,' ').trim();
const words=s=>normalize(s).split(/\s+/).filter(Boolean).length;
const plain=html=>normalize(load(html,null,false).text());
const numberTokens=s=>new Set((s.match(/\d+(?:[.,]\d+)*/g)||[]));
const hash=b=>createHash('sha256').update(b).digest('hex');
const escapeCell=s=>normalize(s).replaceAll('|','\\|');
const iso=s=>new Date(s).getTime();
function metrics(html){const $=load(html,null,false);return {words:words($.text()),h2:$('h2').length,h3:$('h3').length,tables:$('table').length,tableCells:$('th,td').length,listItems:$('li').length,paragraphs:$('p').length};}
function schema($){const rows=[];for(const e of $('script[type="application/ld+json"]').toArray()){try{const x=JSON.parse($(e).text());rows.push(...(Array.isArray(x)?x:[x]),...(x['@graph']||[]));}catch{check(false,'INVALID_JSON_LD',$('title').text());}}return rows;}
function dimensions(b){
 if(b.toString('ascii',0,4)==='RIFF'&&b.toString('ascii',8,12)==='WEBP'){
  let p=12;while(p+8<=b.length){const type=b.toString('ascii',p,p+4),size=b.readUInt32LE(p+4),d=p+8;if(type==='VP8X')return {width:1+b.readUIntLE(d+4,3),height:1+b.readUIntLE(d+7,3),format:'webp'};if(type==='VP8 '&&b.length>d+10)return {width:b.readUInt16LE(d+6)&0x3fff,height:b.readUInt16LE(d+8)&0x3fff,format:'webp'};if(type==='VP8L'&&b.length>d+5){const n=b.readUInt32LE(d+1);return {width:(n&0x3fff)+1,height:((n>>>14)&0x3fff)+1,format:'webp'};}p=d+size+(size%2);}
 }
 if(b[0]===0x89&&b.toString('ascii',1,4)==='PNG')return {width:b.readUInt32BE(16),height:b.readUInt32BE(20),format:'png'};
 if(b[0]===0xff&&b[1]===0xd8){let p=2;while(p+9<b.length){if(b[p]!==0xff){p++;continue;}const marker=b[p+1];if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return {height:b.readUInt16BE(p+5),width:b.readUInt16BE(p+7),format:'jpeg'};const n=b.readUInt16BE(p+2);if(n<2)break;p+=n+2;}}
 return null;
}
const source=await json('migration-source.json',{articles:[],discovery:{}});
const baseline=await json(`${evidence}/existing-guides-baseline.json`,[]);
const mappingRaw=await json(`${evidence}/source-destination.json`,[]);const mapping=Array.isArray(mappingRaw)?mappingRaw:mappingRaw.articles||[];
const importedRaw=await json('src/guides-imported.json',[]);const imported=Array.isArray(importedRaw)?importedRaw:importedRaw.articles||[];
const raw=await json(`${evidence}/extracted-articles.json`,[]);
const recrawl=await json(`${evidence}/migration-source-recrawl.json`,null);
const commandResults=await json(`${evidence}/validation-results.json`,null);
const coverReview=await json(`${evidence}/cover-review.json`,null);
const browserReview=await json(`${evidence}/browser-review.json`,null);
const referenceLinkReview=await json(`${evidence}/source-reference-link-check.json`,null);
const similarityReview=await json('migration/covers/similarity-audit.json',null);
const bySource=new Map(mapping.map(x=>[x.sourceUrl,x]));
const sourceSet=new Set(source.articles.map(x=>x.sourceUrl));
check(sourceSet.size===source.articles.length,'DUPLICATE_SOURCE_URL',source.articles.length-sourceSet.size);
check(bySource.size===mapping.length,'DUPLICATE_SOURCE_MAPPING',mapping.length-bySource.size);
for(const item of mapping)check(sourceSet.has(item.sourceUrl),'UNKNOWN_SOURCE_MAPPING',item.sourceUrl);
const missing=source.articles.filter(x=>!bySource.has(x.sourceUrl));
for(const a of missing)check(false,'MISSING_SOURCE_MAPPING',a.sourceUrl);
if(recrawl){const second=new Set(recrawl.articles.map(x=>x.sourceUrl));for(const u of sourceSet)check(second.has(u),'RECRAWL_SOURCE_DISAPPEARED',u);for(const u of second)check(sourceSet.has(u),'RECRAWL_NEW_SOURCE',u);check(recrawl.discovery.failedFetches?.length===0,'RECRAWL_FAILED_FETCH',recrawl.discovery.failedFetches);}
const catalogHtml=await text('dist/fr/guides/index.html');const catalog=load(catalogHtml);
const cards=catalog('main a[href]').filter((_,e)=>catalog(e).find('img').length&&catalog(e).find('h2,h3').length).toArray();
const cardRows=cards.map(el=>{const e=catalog(el),img=e.find('img').first();return {url:e.attr('href'),title:normalize(e.find('h2,h3').first().text()),image:img.attr('src'),alt:img.attr('alt'),width:+img.attr('width'),height:+img.attr('height'),loading:img.attr('loading'),srcset:img.attr('srcset'),ratioClass:img.parent().attr('class'),date:e.find('time').attr('datetime')||e.attr('data-published')||e.attr('data-date'),hidden:e.attr('hidden')!==undefined||/display\s*:\s*none/.test(e.attr('style')||'')};});
const cardMap=new Map(cardRows.map(x=>[x.url,x]));
check(cardRows.length>0,'EMPTY_CATALOG','/fr/guides/');
check(cardMap.size===cardRows.length,'DUPLICATE_CATALOG_LINK',cardRows.length-cardMap.size);
const paginationPresent=catalog('main a[href*="?page="],main a[href*="/guides/page/"],main nav[aria-label*="agination"],main [data-pagination]').length>0;
check(!paginationPresent,'PAGINATION_PRESENT','catalogue');
check(cards.length===0||/\blg:grid-cols-3\b/.test(catalog(cards[0]).parent().attr('class')||''),'DESKTOP_COLUMNS','Expected existing lg:grid-cols-3 grid');
for(let i=1;i<cardRows.length;i++){const a=cardRows[i-1],b=cardRows[i];if(a.date&&b.date)check(iso(a.date)>=iso(b.date),'DATE_SORT',`${a.url} (${a.date}) before ${b.url} (${b.date})`);}
const datedCards=cardRows.filter(item=>item.date);
if(datedCards.length)check(iso(cardRows.at(-1).date)===Math.min(...datedCards.map(item=>iso(item.date))),'OLDEST_GUIDE_NOT_LAST',cardRows.at(-1).url);
for(const a of baseline)check(cardMap.has(a.path),'EXISTING_GUIDE_MISSING_FROM_CATALOG',a.path);
for(const m of mapping)check(cardMap.has(m.felexiaUrl),'SOURCE_DESTINATION_MISSING_FROM_CATALOG',`${m.sourceUrl} -> ${m.felexiaUrl}`);
const sitemap=load(await text('dist/sitemap.xml'),{xml:true});const sitemapUrls=new Set(sitemap('url > loc').map((_,e)=>sitemap(e).text()).get());
const allPaths=[...new Set([...cardMap.keys(),...baseline.map(x=>x.path),...mapping.map(x=>x.felexiaUrl)].filter(Boolean))];
const pages=new Map(),titles=new Map(),h1s=new Map(),imageHashes=new Map(),imageUrls=new Map(),imageEvidence=[],imageMissing=[],imageBroken=[],imageDuplicates=[],contentEvidence=[];
let numericLoss=0,brokenInternal=0,routeFailed=0,withoutSchema=0;
for(const path of allPaths){
 const html=await text('dist'+path.replace(/\/?$/,'/')+'index.html');const $=load(html);pages.set(path,$);
 if(!check(html.length>500&&$('main').text().trim().length>100,'EMPTY_OR_MISSING_GUIDE',path)){routeFailed++;continue;}
 check($('h1').length===1,'H1_COUNT',`${path}: ${$('h1').length}`);
 const title=normalize($('title').text()),h1=normalize($('h1').text());check(!titles.has(title),'DUPLICATE_META_TITLE',`${path} = ${titles.get(title)}`);titles.set(title,path);check(!h1s.has(h1),'DUPLICATE_H1_TITLE',`${path} = ${h1s.get(h1)}`);h1s.set(h1,path);
 check($('link[rel="canonical"]').length===1,'CANONICAL_COUNT',path);const canonical=$('link[rel="canonical"]').attr('href');check(canonical?.endsWith(path),'CANONICAL_DESTINATION',`${path}: ${canonical}`);check(sitemapUrls.has(canonical),'SITEMAP_MISSING',path);
 check(($('meta[name="description"]').attr('content')||'').length>=30,'META_DESCRIPTION',path);check($('meta[property="og:title"]').length===1&&$('meta[property="og:description"]').length===1&&$('meta[property="og:url"]').attr('content')===canonical,'OPEN_GRAPH',path);check($('meta[name="twitter:card"]').length===1,'TWITTER_METADATA',path);check(!/noindex/.test($('meta[name="robots"]').attr('content')||''),'UNEXPECTED_NOINDEX',path);
 const schemas=schema($),article=schemas.find(x=>['Article','BlogPosting'].includes(x['@type']));if(!check(!!article,'ARTICLE_SCHEMA',path))withoutSchema++;check(schemas.some(x=>x['@type']==='BreadcrumbList'),'BREADCRUMB_SCHEMA',path);
 for(const faq of schemas.filter(x=>x['@type']==='FAQPage'))for(const q of faq.mainEntity||[])check(normalize($('main').text()).includes(normalize(q.name)),'FAQ_NOT_VISIBLE',`${path}: ${q.name}`);
 const ids=new Set();$('main [id]').each((_,e)=>{const id=$(e).attr('id');check(!ids.has(id),'DUPLICATE_HEADING_ID',`${path}#${id}`);ids.add(id);});
 check(!$('main img[src*="upsilon-consulting.com"]').length,'UPSILON_IMAGE_HOTLINK',path);
 check(!$('main a[href*="/cdn-cgi/l/email-protection"],main a[href*="login.microsoftonline.com"]').length,'OBSOLETE_SOURCE_INTERFACE_LINK',path);
 for(const a of $('main a[href]').toArray()){const href=$(a).attr('href');if(/^https?:\/\/(?:www\.)?upsilon-consulting\.com\//.test(href)){let u;try{u=new URL(href);u.search='';u.hash='';}catch{}if(u&&bySource.has(u.href))check(false,'UNREWRITTEN_SOURCE_LINK',`${path}: ${href}`);}
  if(href.startsWith('/')&&!href.startsWith('//')){const local=href.split(/[?#]/)[0];let target=resolve(root,'dist','.'+local);try{const info=await stat(target);if(info.isDirectory())await stat(target+'/index.html');}catch{brokenInternal++;check(false,'BROKEN_INTERNAL_LINK',`${path}: ${href}`);}}
 }
 const card=cardMap.get(path);if(!card?.image){imageMissing.push(path);continue;}check(!card.hidden,'CARD_HIDDEN_WITHOUT_INTERACTION',path);check(!!normalize(card.alt),'IMAGE_ALT',path);check(card.width>0&&card.height>0,'IMAGE_DECLARED_DIMENSIONS',path);check(card.loading==='lazy'||cardRows.indexOf(card)<3,'IMAGE_LAZY_LOADING',path);check((card.ratioClass||'').includes('aspect-[16/10]'),'COVER_RENDERED_RATIO',path);check(card.image.startsWith('/'),'EXTERNAL_COVER',`${path}: ${card.image}`);
 try{const bytes=await readFile('dist'+card.image.split(/[?#]/)[0]);const checksum=hash(bytes),dim=dimensions(bytes);check(bytes.length>4000,'PLACEHOLDER_OR_EMPTY_COVER',path);check(!!dim,'UNRECOGNIZED_COVER_FORMAT',`${path}: ${card.image}`);if(dim){check(dim.width/dim.height===1.6,'COVER_NATIVE_RATIO',`${path}: ${dim.width}x${dim.height}`);check(dim.format==='webp','COVER_FORMAT',`${path}: ${dim.format}`);}if(imageUrls.has(card.image)||imageHashes.has(checksum)){const other=imageUrls.get(card.image)||imageHashes.get(checksum);imageDuplicates.push({path,other,image:card.image});check(false,'DUPLICATED_COVER',`${path}: ${other}`);}imageUrls.set(card.image,path);imageHashes.set(checksum,path);imageEvidence.push({path,image:card.image,sha256:checksum,bytes:bytes.length,...dim});}
 catch(e){imageBroken.push({path,image:card.image,error:e.code});check(false,'BROKEN_COVER',`${path}: ${card.image}`);}
}
// Verify deep links against the complete destination graph, not merely file existence.
for(const [path,$] of pages) {
 const cover=cardMap.get(path);
 if(cover)check($('main img.guide-cover-image').first().attr('src')===cover.image,'ARTICLE_COVER_MISMATCH',path);
 for(const element of $('main a[href*="#"]').toArray()) {
  const href=$(element).attr('href');let url;
  try{url=new URL(href,'https://felexia.invalid'+path);}catch{continue;}
  if(url.hostname!=='felexia.invalid'||!pages.has(url.pathname)||!url.hash)continue;
  const target=pages.get(url.pathname);const id=decodeURIComponent(url.hash.slice(1));
  check(target('[id]').toArray().some(e=>target(e).attr('id')===id),'BROKEN_GUIDE_ANCHOR',`${path}: ${href}`);
 }
 if(cover?.srcset)for(const candidate of cover.srcset.split(',').map(item=>item.trim().split(/\s+/)[0])) {
  try{const bytes=await readFile('dist'+candidate);const size=dimensions(bytes);check(size?.width/size?.height===1.6,'RESPONSIVE_COVER_RATIO',`${path}: ${candidate}`);}
  catch{check(false,'BROKEN_RESPONSIVE_COVER',`${path}: ${candidate}`);}
 }
}
// Compare imported fragments against source metrics, excluding only explicitly audited removals.
for(const m of mapping){
 const entry=imported.find(x=>x.slug===m.slug||x.slug===m.felexiaUrl?.split('/').filter(Boolean).at(-1));const original=raw.find(x=>x.sourceUrl===m.sourceUrl);if(!entry||!original)continue;
 const destHtml=entry.html||entry.contentHtml||'',dest=metrics(destHtml);const s=load(original.rawEditorialHtml||'',null,false);s('script,style,aside').remove();const sourceMetrics=metrics(s.html());const sourceWords=m.sourceWords||sourceMetrics.words,importedWords=m.importedWords||dest.words;
 const removedWords=m.removedContentMetrics?.wordCount||0;check(importedWords>=(sourceWords-removedWords)*0.9,'CONTENT_DEPTH_LOSS',`${m.sourceUrl}: ${sourceWords} - ${removedWords} audited removals -> ${importedWords} words`);
 const destination=pages.get(m.felexiaUrl);if(destination){const rendered=destination('[data-imported-editorial]').filter((_,e)=>destination(e).attr('data-source-url')===entry.sourceUrl);const finalText=normalize(rendered.text()||destination('main').text()),importText=plain(destHtml);check(finalText.includes(importText),'CONTENT_NOT_RENDERED',m.felexiaUrl);}
 for(const faq of (original.structuredData||[]).filter(x=>x['@type']==='FAQPage'))for(const q of faq.mainEntity||[]){if(normalize(s.text()).includes(normalize(q.name)))check(plain(destHtml).includes(normalize(q.name).replace(/Upsilon Consulting/g,'Felexia Conseils')),'SOURCE_FAQ_MISSING',`${m.sourceUrl}: ${q.name}`);}
 const expected=m.sourceContentMetrics;if(expected){for(const key of ['h2','h3','tables','tableCells','listItems'])check(dest[key]>=((expected[key]||0)-(m.removedContentMetrics?.[key]||0)),'CONTENT_STRUCTURE_LOSS',`${m.sourceUrl}: ${key} ${expected[key]} - ${m.removedContentMetrics?.[key]||0} audited removals -> ${dest[key]}`);}
 const facts=m.sourceNumericTokens;if(facts){const finalNumbers=numberTokens(plain(destHtml));const auditedRemoved=new Set((m.removedNumericTokens||[]).map(String));const lost=facts.filter(x=>!finalNumbers.has(String(x))&&!auditedRemoved.has(String(x)));numericLoss+=lost.length;check(!lost.length,'NUMERIC_FACT_LOSS',`${m.sourceUrl}: ${lost.join(', ')}`);}
 contentEvidence.push({sourceUrl:m.sourceUrl,felexiaUrl:m.felexiaUrl,sourceWords,importedWords,sourceRawMetrics:sourceMetrics,destinationMetrics:dest,metricsBeforeApprovedRemovals:expected||null,metricsAfterApprovedRemovals:expected?Object.fromEntries(Object.entries(expected).map(([k,v])=>[k,Math.max(0,v-(m.removedContentMetrics?.[k]||0))])):null,approvedRemovals:m.removedContentMetrics||null,numericFactsChecked:!!facts});
}
let httpResult=null;if(process.argv.includes('--http')&&allPaths.length){const {createServer}=await import('../server.mjs');const server=createServer({env:{}});server.listen(0,'127.0.0.1');await once(server,'listening');const base='http://127.0.0.1:'+server.address().port;let cursor=0,passed=0;const bad=[];try{await Promise.all(Array.from({length:8},async()=>{while(cursor<allPaths.length){const route=allPaths[cursor++];try{const r=await fetch(base+route);const html=await r.text();if(r.status!==200||!/<h1\b/.test(html)||html.length<500)bad.push({route,status:r.status});else passed++;}catch(e){bad.push({route,error:e.message});}}}));for(const path of ['/guides','/fr/guides/?page=2','/fr/guides/page/2/']){const r=await fetch(base+path,{redirect:'follow'});check(r.status===200&&new URL(r.url).pathname==='/fr/guides/','LEGACY_PAGINATION_REDIRECT',`${path}: ${r.status} ${r.url}`);}httpResult={passed,failed:bad.length,failures:bad};check(!bad.length,'HTTP_ROUTES',bad);}finally{server.closeAllConnections();await new Promise(r=>server.close(r));}}
const commandsComplete=commandResults&&['lint','typecheck','test','build','check'].every(k=>commandResults[k]?.passed===true);
if(coverReview){check(coverReview.reviewed===true&&coverReview.reviewedGuideCount===cardRows.length,'COVER_VISUAL_REVIEW_INCOMPLETE',coverReview);check(!coverReview.findings?.length,'COVER_VISUAL_REVIEW_FINDINGS',coverReview.findings);}
if(browserReview)check(browserReview.passed===true,'BROWSER_REVIEW_INCOMPLETE',browserReview);
if(similarityReview)check(similarityReview.images===cardRows.length&&!similarityReview.missing.length&&!similarityReview.candidates.length,'COVER_SIMILARITY_REVIEW',similarityReview.candidates);
if(referenceLinkReview)check(referenceLinkReview.rows.every(item=>item.status===200),'SOURCE_REFERENCE_LINK_ERROR',referenceLinkReview.rows.filter(item=>item.status!==200));
const requiredPending=[...pending];if(contentEvidence.some(x=>!x.metricsAfterApprovedRemovals||!x.numericFactsChecked))requiredPending.push('source structural and numeric audits');if(!httpResult)requiredPending.push('all-routes-http-check');if(!commandsComplete)requiredPending.push('lint/typecheck/tests/build/check validation results');
const importedNew=new Set(mapping.filter(x=>x.status==='IMPORTED').map(x=>x.felexiaUrl)).size,merged=mapping.filter(x=>x.status==='MERGED_EXISTING').length,aliases=mapping.filter(x=>x.status==='MERGED_SOURCE_ALIAS').length;
const counts={SOURCE_TOTAL:source.articles.length,IMPORTED_NEW:importedNew,MERGED_EXISTING:merged,MERGED_SOURCE_ALIAS:aliases,TOTAL_IMPORTED_SOURCES:mapping.filter(x=>['IMPORTED','MERGED_EXISTING','MERGED_SOURCE_ALIAS'].includes(x.status)).length,TOTAL_SKIPPED:mapping.filter(x=>x.status==='SKIPPED').length,FAILED:routeFailed+mapping.filter(x=>x.status==='FAILED').length,MISSING:missing.length,TOTAL_GUIDES:cardRows.length,TOTAL_IMAGES:imageEvidence.length,GUIDES_WITHOUT_IMAGE:imageMissing.length,DUPLICATED_IMAGES:imageDuplicates.length,BROKEN_IMAGES:imageBroken.length,PAGINATION_PRESENT:paginationPresent,EXISTING_GUIDES:baseline.length,NUMERIC_FACTS_LOST:numericLoss};
check(counts.TOTAL_IMPORTED_SOURCES+counts.TOTAL_SKIPPED+counts.FAILED+counts.MISSING===counts.SOURCE_TOTAL,'SOURCE_ACCOUNTING',counts);
const result={generatedAt:new Date().toISOString(),status:failures.length||requiredPending.length?'NON_TERMINÉ':'TERMINÉ',counts,discovery:source.discovery,recrawl:recrawl?{completedAt:recrawl.completedAt,total:recrawl.articles.length,sameSet:!failures.some(x=>x.code.startsWith('RECRAWL_'))}:null,http:httpResult,commands:commandResults,failures,warnings,pending:requiredPending,images:imageEvidence,content:contentEvidence};
await mkdir(evidence,{recursive:true});await writeFile(`${evidence}/qa-results.json`,JSON.stringify(result,null,2));
const lines=['# Migration des Guides Felexia Conseils','',`**État : ${result.status}** — contrôle du ${result.generatedAt}.`,'','Source crawlée : https://www.upsilon-consulting.com/blog/','','## Comptage exhaustif','',...Object.entries(counts).map(([k,v])=>`- ${k} = ${v}`),'',`Réconciliation : ${counts.IMPORTED_NEW} nouvelles destinations + ${counts.MERGED_EXISTING} sources fusionnées avec l’existant + ${counts.MERGED_SOURCE_ALIAS} alias source fusionné = ${counts.TOTAL_IMPORTED_SOURCES} sources traitées sur ${counts.SOURCE_TOTAL}.`,'','## Preuves de découverte','',`Blog : ${source.discovery.blogCards||0} cartes ; recherche intégrée : ${source.discovery.searchIndexArticles||0} articles ; ${source.discovery.categoryPages||0} archives de catégorie ; ${source.discovery.sitemapFrench||0} pages françaises du sitemap vérifiées ; ${source.discovery.crawledFrenchPages||0} pages inspectées au total.`, `Historique : ${source.discovery.oldest||'?'} à ${source.discovery.newest||'?'}.`,recrawl?`Deuxième crawl : ${recrawl.completedAt}, ${recrawl.articles.length} sources. Ensemble identique : ${result.recrawl.sameSet}.`:'Deuxième crawl final : EN ATTENTE.','','## Particularités du site source','',...(source.discovery.sourceRouteCollisions||[]).map(x=>`- ${x.sourceUrl} : la carte du blog annonce « ${x.sourceTitle} », mais l’URL sert actuellement « ${x.servedTitle} ». Seul le contenu réellement accessible est repris, avec ses documents utiles ; aucun corps absent n’est inventé.`),'','## Vérifications','',`Routes HTTP : ${httpResult?`${httpResult.passed} réussies, ${httpResult.failed} échouées`:'EN ATTENTE'}.`, `Contrôles bloquants : ${failures.length}. Vérifications en attente : ${requiredPending.length}.`,'',...(commandResults?Object.entries(commandResults).map(([k,v])=>`- ${k} : ${v.passed?'PASS':'NON VALIDÉ'}${v.note?' — '+v.note:''}`):['- lint, typecheck, tests, build, check : EN ATTENTE.']),'',...requiredPending.map(x=>`- En attente : ${x}`),'',...failures.map(x=>`- **${x.code}** : ${typeof x.details==='string'?x.details:JSON.stringify(x.details)}`),'','Les contrôles automatisés vérifient les liens HTML de toutes les cartes, leur présence dans le sitemap, H1 unique, métadonnées, canonical, données structurées, liens internes, conservation des routes existantes, profondeur du contenu, fichiers images locaux, dimensions, ratio et unicité SHA256. La pertinence photographique reste une vérification visuelle humaine ou par inspection des images ; les sommes de contrôle ne démontrent pas à elles seules la qualité visuelle.','','## Liste exhaustive source → destination','', '| SOURCE URL | SOURCE TITLE | FELEXIA URL | STATUS | NOTE |','|---|---|---|---|---|',...source.articles.map(a=>{const m=bySource.get(a.sourceUrl);return `| ${a.sourceUrl} | ${escapeCell(a.title)} | ${m?.felexiaUrl||'—'} | ${m?.status||'MISSING'} | ${escapeCell(m?.sourceNote||a.sourceNote||'')} |`; }),'','## Fichiers de preuve','','- migration-source.json : inventaire de référence établi avant intégration.','- migration/upsilon/inventory-initial.json : copie immuable du premier inventaire.','- migration/upsilon/migration-source-recrawl.json : deuxième inventaire.','- migration/upsilon/crawl-audit.json : classification de chaque page inspectée.','- migration/upsilon/source-destination.json : correspondance des sources et destinations.','- migration/upsilon/qa-results.json : résultats détaillés, images et métriques de contenu.','- migration/upsilon/existing-guides-baseline.json : 19 guides Felexia existants avant migration.',''];
const mediaWarnings=mapping.flatMap(item=>(item.warnings||[]).map(message=>({sourceUrl:item.sourceUrl,felexiaUrl:item.felexiaUrl,message})));
const undated=cardRows.filter(item=>!item.date);
const extraReport=[
 '## Couvertures et présentation','',
 'Chaque couverture est une création distincte réalisée avec l’outil imagegen intégré, à partir du titre, du résumé et d’une scène liée au sujet. Les fichiers locaux sont dans public/images/guides/ : 1280 × 800 px et 640 × 400 px, WebP, ratio 16:10. La page conserve les cartes et la grille existantes, avec trois colonnes sur desktop, sans pagination. Tous les liens sont présents dans le HTML statique ; recherche et catégories ne font que filtrer ces cartes.',
 `Revue visuelle des couvertures : ${coverReview?.reviewed ? `${coverReview.reviewedGuideCount} couvertures inspectées` : 'EN COURS'}.`,
 `Contrôle complémentaire de similarité : ${similarityReview?.images||0} images, ${similarityReview?.candidates.length??'—'} paire suspecte selon SHA256 et hash perceptuel de 256 bits (seuil 12). Descriptions alt françaises rédigées à partir des scènes de chaque couverture.`,
 `Vérification navigateur : ${browserReview?.passed ? 'PASS — desktop, mobile, recherche, catégories et tableaux' : 'EN ATTENTE'}.`,'',
 '## Illustrations indisponibles dans la source','',
 ...(mediaWarnings.length?mediaWarnings.map(item=>`- ${item.sourceUrl} → ${item.felexiaUrl} : ${item.message}`):['Aucune.']),
 ...(mediaWarnings.length?['','Les fichiers indisponibles ne sont pas remplacés par des données inventées. Dans le guide sur le rapprochement bancaire, seul le renvoi vers l’ancien exemple en image est retiré ; l’explication comptable est conservée. L’autre illustration indisponible était décorative. Toutes les couvertures sont des créations nouvelles, indépendantes de ces illustrations.']:[]),'',
 '## Dates et contenu éditorial','',
 'Les dates de publication récupérées sont conservées. Les textes fiscaux et juridiques gardent leur contexte historique : cette migration ne constitue pas une actualisation réglementaire générale de tous les articles.',
 ...(undated.length?[`Les ${undated.length} guides Felexia préexistants sans date documentée conservent la mention « Guide pratique » et sont placés en tête, avant le classement chronologique des guides datés : ${undated.map(item=>item.url).join(', ')}. Aucune date de publication n’est inventée. Le dernier guide est le plus ancien dont la date est connue : ${cardRows.at(-1)?.url} (${cardRows.at(-1)?.date}).`]:[]),'',
 'Le texte factuel, les tableaux et les exemples sont conservés. Les suppressions de textes commerciaux, les adaptations de métadonnées et les attributions conservées sont traçables dans les journaux de migration. Les originaux restent dans les archives du crawl.','',
 '## Reproduction des contrôles','',
 ...(referenceLinkReview?[`${referenceLinkReview.rows.length} liens documentaires, outils et attributions encore hébergés chez Upsilon ont été vérifiés : ${referenceLinkReview.rows.filter(item=>item.status===200).length} réponses HTTP 200. Les liens commerciaux disposant d’une destination Felexia ont été adaptés. Le lien d’une annexe a été réparé par normalisation Unicode de son nom de fichier.`,'']:[]),
 '`npm run lint` · `npm run typecheck` · `npm test` · `npm run build` · `npm run check` · `node scripts/check-http.mjs` · `node scripts/check-guides-migration.mjs --http`','',
 'Le projet est en JavaScript. Le contrôle nommé typecheck valide les contrats des données JSON et leurs types ; il ne prétend pas exécuter un compilateur TypeScript absent du projet.',''
];
lines.splice(lines.indexOf('## Liste exhaustive source → destination'),0,...extraReport);
lines.push('- migration/covers/queue.json et migration/covers/prompts/ : sujets, résumés et consignes de création des couvertures.','- migration/covers/completed/ et migration/covers/reviewed/ : fichiers produits, empreintes et revues image par image.','- migration/upsilon/cover-review.json et migration/upsilon/browser-review.json : synthèses des vérifications visuelles.','- migration/upsilon/metadata-adaptations.json : adaptations éditoriales des titres, résumés et métadonnées.');
await writeFile('GUIDES_MIGRATION_REPORT.md',lines.join('\n'));console.log(JSON.stringify({status:result.status,...counts,checksFailed:failures.length,pending:requiredPending.length,http:httpResult},null,2));if(result.status!=='TERMINÉ')process.exitCode=1;
