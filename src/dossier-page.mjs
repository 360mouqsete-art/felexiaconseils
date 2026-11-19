import {company} from './content.mjs';
import {demoDossier} from './dossier-model.mjs';

const copy = {
  fr:{
    title:'Mon dossier | Felexia Conseils',
    adminTitle:'Suivi des dossiers | Felexia Conseils',
    description:'Consultez l’avancement de votre dossier Felexia Conseils, les pièces demandées et les documents remis par le cabinet.',
    eyebrow:'MON DOSSIER',
    h1:'Le suivi de votre dossier.',
    intro:'Connectez-vous avec le lien envoyé à votre adresse e-mail. Vous y verrez les étapes, les pièces demandées et les documents remis par le cabinet.',
    email:'Adresse e-mail',
    send:'Recevoir un lien de connexion',
    sent:'Un lien de connexion vient d’être envoyé à cette adresse. Il peut mettre un moment à arriver.',
    unavailable:'L’espace de suivi n’est pas encore relié. Vous pouvez nous écrire : le cabinet fera le point avec vous.',
    example:'Voir un exemple de dossier',
    exampleNote:'Exemple d’affichage. Aucune pièce n’est demandée et aucun document n’est téléchargeable.',
    back:'Retour à la connexion',
    files:'Vos dossiers',
    empty:'Aucun dossier n’est encore associé à cette adresse.',
    steps:'Étapes',
    requests:'Pièces demandées',
    deliveries:'Documents remis par le cabinet',
    notes:'Messages du cabinet',
    upload:'Téléverser',
    download:'Télécharger',
    contact:'Contacter le cabinet',
    whatsapp:'Écrire sur WhatsApp',
    signOut:'Se déconnecter',
    adminEyebrow:'CABINET',
    adminH1:'Suivi des dossiers clients.',
    adminIntro:'Cette page est réservée aux comptes du cabinet. La connexion utilise le même lien e-mail.',
    adminExample:'Aperçu du poste cabinet',
    create:'Créer un dossier',
    type:'Type de dossier',
    reference:'Référence, si vous en avez une',
    types:{creation:'Création', domiciliation:'Domiciliation', modification:'Modification'},
    statuses:{pending:'À venir', current:'En cours', done:'Fait', to_provide:'À fournir', received:'Reçue', validated:'Validée', correction:'À corriger'},
    markCurrent:'Marquer en cours',
    markDone:'Marquer fait',
    ask:'Demander une pièce',
    piece:'Nom de la pièce',
    note:'Note visible par le client',
    publish:'Publier la note',
    deliver:'Déposer un document',
    staffOnly:'Un compte du cabinet est nécessaire pour enregistrer un changement. Cet aperçu ne modifie rien.'
  },
  en:{
    title:'My file | Felexia Conseils',
    adminTitle:'File follow-up | Felexia Conseils',
    description:'See the progress of your Felexia Conseils file, the documents requested and the documents provided by the firm.',
    eyebrow:'MY FILE',
    h1:'Follow-up of your file.',
    intro:'Sign in with the link sent to your email address. You will see the steps, the documents requested and the documents provided by the firm.',
    email:'Email address',
    send:'Email me a sign-in link',
    sent:'A sign-in link has been sent to this address. It can take a moment to arrive.',
    unavailable:'File follow-up is not connected yet. You can write to us and the firm will review the position with you.',
    example:'See an example file',
    exampleNote:'Display example. No document is requested and nothing can be downloaded.',
    back:'Back to sign-in',
    files:'Your files',
    empty:'No file is linked to this address yet.',
    steps:'Steps',
    requests:'Documents requested',
    deliveries:'Documents from the firm',
    notes:'Messages from the firm',
    upload:'Upload',
    download:'Download',
    contact:'Contact the firm',
    whatsapp:'Message on WhatsApp',
    signOut:'Sign out',
    adminEyebrow:'FIRM',
    adminH1:'Client file follow-up.',
    adminIntro:'This page is limited to firm accounts. Sign-in uses the same email link.',
    adminExample:'Preview of the firm desk',
    create:'Create a file',
    type:'File type',
    reference:'Reference, if you already have one',
    types:{creation:'Formation', domiciliation:'Domiciliation', modification:'Company change'},
    statuses:{pending:'Upcoming', current:'In progress', done:'Done', to_provide:'To provide', received:'Received', validated:'Validated', correction:'To correct'},
    markCurrent:'Mark in progress',
    markDone:'Mark done',
    ask:'Request a document',
    piece:'Document name',
    note:'Note visible to the client',
    publish:'Publish the note',
    deliver:'Add a document',
    staffOnly:'A firm account is required to save a change. This preview changes nothing.'
  },
  ar:{
    title:'ملفي | Felexia Conseils',
    adminTitle:'متابعة الملفات | Felexia Conseils',
    description:'تابعوا تقدم ملفكم لدى Felexia Conseils والوثائق المطلوبة والوثائق التي يسلمها المكتب.',
    eyebrow:'ملفي',
    h1:'متابعة ملفكم.',
    intro:'ادخلوا عبر الرابط المرسل إلى بريدكم. ستجدون المراحل والوثائق المطلوبة والوثائق التي يسلمها المكتب.',
    email:'البريد الإلكتروني',
    send:'إرسال رابط الدخول',
    sent:'أُرسل رابط الدخول إلى هذا العنوان. قد يستغرق وصوله بعض الوقت.',
    unavailable:'متابعة الملفات غير مربوطة بعد. يمكنكم مراسلتنا ليعرض المكتب الوضعية معكم.',
    example:'عرض مثال لملف',
    exampleNote:'مثال للعرض. لا تُطلب أي وثيقة ولا يمكن تنزيل أي شيء.',
    back:'العودة إلى الدخول',
    files:'ملفاتكم',
    empty:'لا يوجد ملف مرتبط بهذا العنوان بعد.',
    steps:'المراحل',
    requests:'الوثائق المطلوبة',
    deliveries:'وثائق سلمها المكتب',
    notes:'رسائل المكتب',
    upload:'رفع',
    download:'تنزيل',
    contact:'مراسلة المكتب',
    whatsapp:'مراسلة عبر واتساب',
    signOut:'تسجيل الخروج',
    adminEyebrow:'المكتب',
    adminH1:'متابعة ملفات العملاء.',
    adminIntro:'هذه الصفحة مخصصة لحسابات المكتب. الدخول يتم بنفس رابط البريد.',
    adminExample:'معاينة مكتب المتابعة',
    create:'إنشاء ملف',
    type:'نوع الملف',
    reference:'المرجع، إن كان لديكم واحد',
    types:{creation:'التأسيس', domiciliation:'التوطين', modification:'التعديل'},
    statuses:{pending:'قادمة', current:'جارية', done:'تمت', to_provide:'مطلوبة', received:'مستلمة', validated:'مقبولة', correction:'للتصحيح'},
    markCurrent:'تعليمها جارية',
    markDone:'تعليمها تمت',
    ask:'طلب وثيقة',
    piece:'اسم الوثيقة',
    note:'ملاحظة يراها العميل',
    publish:'نشر الملاحظة',
    deliver:'إيداع وثيقة',
    staffOnly:'يلزم حساب للمكتب لتسجيل تغيير. هذه المعاينة لا تغير شيئاً.'
  }
};

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function dossierCopy(lang) {
  return copy[lang] || copy.fr;
}

export function dossierMain(lang, view = 'client') {
  const t = dossierCopy(lang);
  const admin = view === 'admin';
  const contact = `/${lang}/contact/?service=support`;
  const whatsapp = `https://wa.me/${company.whatsapp}`;
  return `<section class="felexia-extra-section fx-dossier" data-dossier-root data-dossier-view="${admin ? 'admin' : 'client'}" data-dossier-lang="${lang}">
    <p class="fx-dossier-eyebrow">${esc(admin ? t.adminEyebrow : t.eyebrow)}</p>
    <h1>${esc(admin ? t.adminH1 : t.h1)}</h1>
    <p class="fx-dossier-intro">${esc(admin ? t.adminIntro : t.intro)}</p>
    <div class="fx-dossier-panel" data-dossier-auth>
      <form class="fx-dossier-login" data-dossier-login>
        <label>${esc(t.email)}<input type="email" name="email" required autocomplete="email" maxlength="254"></label>
        <button class="felexia-action" type="submit">${esc(t.send)}</button>
      </form>
      <p class="fx-dossier-feedback" data-dossier-feedback hidden></p>
      <p class="fx-dossier-unavailable" data-dossier-unavailable hidden>${esc(t.unavailable)}</p>
    </div>
    <div class="fx-dossier-actions">
      <button class="felexia-action secondary" type="button" data-dossier-example>${esc(admin ? t.adminExample : t.example)}</button>
      <a class="felexia-action secondary" href="${contact}">${esc(t.contact)}</a>
      <a class="felexia-action secondary" href="${whatsapp}">${esc(t.whatsapp)}</a>
    </div>
    <div data-dossier-app hidden></div>
    <script type="application/json" id="fx-dossier-copy">${JSON.stringify({...t, contact, whatsapp, demo:demoDossier}).replace(/</g, '\\u003c')}</script>
  </section>`;
}
