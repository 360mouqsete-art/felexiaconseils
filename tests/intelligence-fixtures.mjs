import {createHash} from 'node:crypto';
// 09:00 UTC is inside the publication window with both tzdb 2026b (+01)
// and tzdb 2026c (+00 after Morocco's 20 September 2026 change).
export const fixtureNow=new Date('2026-10-12T09:00:00.000Z');
export const fixtureEnv={FELEXIA_INTELLIGENCE_ENABLED:'true',FELEXIA_AUTO_PUBLISH:'true',FELEXIA_DRY_RUN:'false',FELEXIA_ALLOW_PAID_APIS:'false',FELEXIA_MIN_ARTICLE_WORDS:'100',FELEXIA_PUBLICATION_HOUR:'09:00',SITE_URL:'https://www.felexiaconseils.com'};
export const fixturePaths=new Set(['fr','ar','en'].flatMap(language=>[`/${language}/contact/`,`/${language}/services/`,`/${language}/guides/`]));
export function fixtureSource(now=fixtureNow) {
  const text='La préparation du projet facilite les échanges avec les partenaires. Le taux explicitement vérifié dans ce test est de 20 %.';
  return {id:'institutional-fixture',url:'https://www.ompic.ma/fr',issuer:'OMPIC',title:'Document de test institutionnel',status:'retrieved',trust:'primary-host',fingerprint:createHash('sha256').update(text).digest('hex'),text,excerpt:text,retrievedAt:now.toISOString(),publicationDate:null};
}
const paragraphs={
  fr:'Pour organiser votre projet au Maroc, rassemblez les informations disponibles dans un dossier de travail accessible. Décrivez votre activité et vos objectifs, puis identifiez les interlocuteurs concernés. Une préparation attentive facilite les échanges, permet de comparer les solutions et aide à définir les prochaines étapes selon les besoins réels de votre entreprise.',
  en:'To organise your business project in Morocco, bring the available information together in an accessible working file. Describe the proposed activity and objectives, then identify the people involved. Careful preparation supports useful conversations, helps compare possible approaches and makes it easier to define the next stages according to the actual needs of the business.',
  ar:'لتنظيم مشروعك في المغرب اجمع المعلومات المتاحة في ملف عمل واضح يسهل الوصول إليه. صف نشاطك وأهدافك ثم حدد الأشخاص المعنيين بالمشروع ومسؤولياتهم. يساعد التحضير الدقيق على تبادل المعلومات ومقارنة الحلول المتاحة وتحديد المراحل المقبلة بحسب احتياجات مقاولتك الفعلية. راجع الوثائق بانتظام وناقش الأسئلة المفتوحة مع الشركاء قبل اتخاذ القرارات المناسبة لتطوير نشاطك.',
};
export function fixtureTopic(id='editorial-fixture',now=fixtureNow) {
  return {id,title:`Organisation ${id}`,intent:`intention spécifique ${id}`,intentKey:`intent:${id}`,kind:'new',risk:'low',category:'management',authorized:true,status:'draft',verifiedAt:now.toISOString(),sourceIds:['institutional-fixture'],claims:[],image:{src:'/images/guides/creation-entreprise-rabat.webp',smallSrc:'/images/guides/creation-entreprise-rabat-640.webp',width:1280,height:800,rights:'owned',verified:true},translations:Object.fromEntries(['fr','ar','en'].map(language=>[language,{
    title:language==='ar'?`تنظيم مشروعك ${id}`:`Organise your project ${id} ${language}`,slug:`${id}-${language}`,excerpt:paragraphs[language].slice(0,180),metaTitle:`Organisation ${id} ${language}`,metaDescription:paragraphs[language].slice(0,150),primaryKeyword:language==='ar'?'تنظيم المقاولة':'organisation entreprise',alt:language==='ar'?'وثائق مشروع مقاولة':'Illustration du dossier entreprise',body:[1,2,3].map(number=>({heading:language==='ar'?`المرحلة ${number}`:`Étape ${number}`,paragraphs:[paragraphs[language]],bullets:[]})),faq:[{question:language==='ar'?'من أين أبدأ؟':'Where should I start?',answer:paragraphs[language]},{question:language==='ar'?'من يواكب المشروع؟':'Who supports the project?',answer:paragraphs[language]}],internalLinks:[{path:`/${language}/contact/`,label:language==='ar'?'تواصل مع فيليكسيا':'Contact Felexia'}],claimIds:[],factualValues:{},
  }]))};
}
