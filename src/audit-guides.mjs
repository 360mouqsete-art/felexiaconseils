// Ten practical guides requested by the 18 November 2026 audit.
// No fees, deadlines, registrations or reviews are invented.
const text = (fr, en, ar) => ({fr, en, ar});
const cover = {
  src:'/assets/corporate/documents.jpg',
  smallSrc:'/assets/corporate/documents-small.jpg',
  width:1100,
  height:734
};
const date = '2026-11-18';

function article(language, guide) {
  const t = value => value[language];
  const sections = guide.sections.map(([heading, paragraph], index) => `<h2 id="etape-${index + 1}">${t(heading)}</h2><p>${t(paragraph)}</p>`).join('');
  const faqs = guide.faqs.map(([question, answer]) => `<details class="seo-faq"><summary>${t(question)}</summary><p>${t(answer)}</p></details>`).join('');
  const links = guide.links.map(item => `<li><a href="/${language}/${item.path}/">${t(item.label)}</a></li>`).join('');
  const caution = text(
    'Ce guide est informatif. Il ne remplace pas l’examen de votre dossier. Les exigences des administrations et des banques peuvent évoluer.',
    'This guide is general information. It does not replace a review of your file. Requirements of administrations and banks can change.',
    'هذا الدليل معلومات عامة. ولا يعوّض دراسة ملفكم. وقد تتغير متطلبات الإدارات والبنوك.'
  );
  return `${sections}<h2 id="questions">${t(text('Questions pratiques','Practical questions','أسئلة عملية'))}</h2>${faqs}<h2 id="liens">${t(text('Pages liées','Related pages','صفحات ذات صلة'))}</h2><ul>${links}</ul><h2 id="sources">${t(text('Sources','Sources','المصادر'))}</h2><p>${t(caution)}</p><ul><li><a href="https://www.ompic.ma/en/content/creation-and-business-life">OMPIC</a></li></ul>`;
}

const guides = [
  {
    slug:'creation-sarl-marrakech',
    category:text('Création d’entreprise','Company formation','تأسيس المقاولة'),
    title:text('Créer une SARL à Marrakech','Form a SARL in Marrakech','تأسيس SARL بمراكش'),
    description:text('Création d’une SARL à Marrakech : le droit des sociétés est national. Le siège, le CRI Marrakech-Safi et le cabinet à Mabrouka organisent le dossier, sans délai publié.','Forming a SARL in Marrakech: company law is national. The office, the Marrakech-Safi CRI and the firm in Mabrouka organise the file, with no published timeline.','تأسيس SARL بمراكش: قانون الشركات وطني. المقر والمركز الجهوي للاستثمار والمكتب بمبروكة ينظمون الملف، دون أجل منشور.'),
    sections:[
      [text('Le cadre reste national','The framework stays national','الإطار يبقى وطنياً'), text('Une SARL à Marrakech suit le même cadre que dans le reste du Maroc : associés, gérance, parts, objet et siège se décident dans les statuts. Marrakech ne crée pas un régime sociétaire à part. Le guide général de la SARL reste la référence pour ces choix.','A SARL in Marrakech follows the same framework as elsewhere in Morocco: shareholders, management, shares, purpose and office are set in the articles. Marrakech does not create a separate company regime. The general SARL guide remains the reference for those choices.','تخضع SARL بمراكش لنفس الإطار كما في بقية المغرب: الشركاء والتسيير والحصص والغرض والمقر تُحدد في النظام الأساسي. ولا تنشئ مراكش نظاماً خاصاً. ويبقى الدليل العام مرجعاً لهذه الاختيارات.')],
      [text('Siège et adresse du cabinet','Office and the firm’s address','المقر وعنوان المكتب'), text('Le siège doit être documenté : domiciliation étudiée, bail ou local dont vous disposez. L’adresse du cabinet, Résidence Al Ihssane à Mabrouka, est une adresse de contact. Elle ne devient le siège de la société que si une proposition écrite le prévoit.','The office must be documented: a reviewed domiciliation, a lease, or premises you control. The firm’s address at Résidence Al Ihssane in Mabrouka is a contact address. It becomes the company’s office only if a written proposal says so.','يجب توثيق المقر: توطين مدروس أو كراء أو محل تتصرفون فيه. عنوان المكتب بإقامة الإحسان في مبروكة عنوان تواصل. ولا يصبح مقر الشركة إلا إذا نص عرض مكتوب على ذلك.')],
      [text('Le CRI Marrakech-Safi','The Marrakech-Safi CRI','المركز الجهوي مراكش-آسفي'), text('Le centre régional d’investissement de Marrakech-Safi est un interlocuteur des démarches d’entreprise. Les pièces et le circuit se confirment sur le dossier. Aucun délai de traitement n’est annoncé ici.','The Marrakech-Safi regional investment centre is a contact for business procedures. Documents and the path are confirmed for the file. No processing time is stated here.','المركز الجهوي للاستثمار بمراكش-آسفي مخاطب لإجراءات المقاولة. تُؤكد الوثائق والمسار حسب الملف. ولا يُعلن هنا أي أجل معالجة.')],
      [text('Ce que la proposition distingue','What the proposal separates','ما يفصله العرض'), text('Felexia Conseils reçoit sur rendez-vous à Mabrouka et travaille aussi à distance. La proposition sépare les honoraires, les frais administratifs et les options. Le dépôt suit l’accord sur ce périmètre.','Felexia Conseils meets by appointment in Mabrouka and also works remotely. The proposal separates fees, administrative charges and options. Filing follows agreement on that scope.','يستقبل Felexia Conseils بموعد في مبروكة ويعمل أيضاً عن بُعد. ويفصل العرض الأتعاب والمصاريف الإدارية والخيارات. ويلي الإيداع الاتفاق على هذا النطاق.')]
    ],
    faqs:[
      [text('La procédure est-elle différente à Marrakech ?','Is the procedure different in Marrakech?','هل الإجراء مختلف بمراكش؟'), text('Non. La forme est nationale. La ville compte pour le siège et les interlocuteurs, pas pour un autre droit des sociétés.','No. The form is national. The city matters for the office and the contacts, not for another company law.','لا. الشكل وطني. والمدينة تهم المقر والمخاطبين، لا قانون شركات آخر.')],
      [text('Un délai est-il garanti ?','Is a timeline guaranteed?','هل الأجل مضمون؟'), text('Non. Le calendrier dépend des pièces et des organismes. Il se discute après lecture du dossier.','No. The schedule depends on the documents and the bodies involved. It is discussed after the file is reviewed.','لا. يتوقف الجدول على الوثائق والجهات. ويُناقش بعد دراسة الملف.')]
    ],
    links:[
      {path:'guides/creer-une-sarl-maroc', label:text('Guide général de la SARL','General SARL guide','الدليل العام لـ SARL')},
      {path:'guides/domiciliation-marrakech', label:text('Domiciliation à Marrakech','Domiciliation in Marrakech','التوطين بمراكش')},
      {path:'creation-entreprise', label:text('Création d’entreprise','Company formation','تأسيس المقاولة')},
      {path:'contact', label:text('Contacter le cabinet','Contact the firm','التواصل مع المكتب')}
    ]
  },
  {
    slug:'domiciliation-marrakech',
    category:text('Domiciliation d’entreprise','Company domiciliation','توطين المقاولة'),
    title:text('Domiciliation à Marrakech : contrat et courrier','Domiciliation in Marrakech: contract and mail','التوطين بمراكش: العقد والبريد'),
    description:text('Domiciliation à Marrakech : le contrat précise l’adresse, le courrier et la durée. L’adresse du cabinet à Mabrouka n’est pas automatiquement le siège de votre société.','Domiciliation in Marrakech: the contract states the address, the mail and the term. The firm’s Mabrouka address is not automatically your company’s office.','التوطين بمراكش: يحدد العقد العنوان والبريد والمدة. وعنوان المكتب بمبروكة ليس تلقائياً مقر شركتكم.'),
    sections:[
      [text('Ce que le contrat organise','What the contract organises','ما ينظمه العقد'), text('Une domiciliation met une adresse à disposition comme siège et, si le contrat le dit, organise le courrier. Les services inclus, la durée et les exclusions se lisent dans le contrat. Felexia ne publie pas de prix unique.','Domiciliation makes an address available as the office and, if the contract says so, organises mail. Included services, term and exclusions are in the contract. Felexia does not publish a single price.','يتيح التوطين عنواناً كمقر، وإذا نص العقد على ذلك ينظم البريد. وتُقرأ الخدمات والمدة والاستثناءات في العقد. ولا تنشر Felexia سعراً واحداً.')],
      [text('Le courrier n’est pas implicite','Mail is not implied','البريد ليس ضمنياً'), text('La réception, la garde ou la réexpédition du courrier n’existent que si elles sont écrites. Demandez qui prévient la société et sous quel délai de remise, sans confondre ce délai avec un délai administratif.','Receiving, holding or forwarding mail exists only if it is written down. Ask who notifies the company and on what handover timing, without confusing that timing with an administrative deadline.','لا يوجد استلام البريد أو حفظه أو إعادة إرساله إلا إذا كُتب ذلك. اسألوا من يُبلغ الشركة وبأي أجل تسليم، دون خلط هذا الأجل بأجل إداري.')],
      [text('Activités qui exigent un local','Activities that need premises','أنشطة تتطلب محلاً'), text('Certaines activités ne se satisfont pas d’une domiciliation : accueil du public, stockage, profession réglementée. Ce point se vérifie avant la signature. La domiciliation n’est pas présentée comme une solution pour tous les métiers.','Some activities cannot rely on domiciliation: receiving the public, storage, a regulated profession. Check this before signing. Domiciliation is not presented as a solution for every trade.','قد لا يكفي التوطين لبعض الأنشطة: استقبال العموم أو التخزين أو مهنة منظمة. يُتحقق من ذلك قبل التوقيع. ولا يُقدَّم التوطين كحل لكل المهن.')],
      [text('Marrakech et les autres villes','Marrakech and other cities','مراكش والمدن الأخرى'), text('Le cabinet est à Mabrouka et peut étudier une domiciliation à Marrakech ou un siège ailleurs au Maroc. La disponibilité et l’adresse exacte figurent dans la proposition, pas dans l’adresse affichée du site.','The firm is in Mabrouka and can review domiciliation in Marrakech or an office elsewhere in Morocco. Availability and the exact address are in the proposal, not in the address shown on the website.','المكتب بمبروكة ويمكنه دراسة التوطين بمراكش أو مقر في مدينة مغربية أخرى. والتوفر والعنوان الدقيق في العرض، لا في العنوان المعروض على الموقع.')]
    ],
    faqs:[
      [text('L’adresse du site est-elle un siège disponible ?','Is the website address an available office?','هل عنوان الموقع مقر متاح؟'), text('Non. C’est l’adresse de contact du cabinet.','No. It is the firm’s contact address.','لا. إنه عنوان التواصل مع المكتب.')],
      [text('Le courrier est-il toujours inclus ?','Is mail always included?','هل البريد مشمول دائماً؟'), text('Non. Seulement si le contrat le prévoit.','No. Only if the contract provides for it.','لا. إلا إذا نص العقد على ذلك.')]
    ],
    links:[
      {path:'domiciliation', label:text('Page domiciliation','Domiciliation page','صفحة التوطين')},
      {path:'guides/siege-social-maroc', label:text('Trois façons de justifier un siège','Three ways to evidence an office','ثلاث طرق لإثبات المقر')},
      {path:'guides/creation-sarl-marrakech', label:text('SARL à Marrakech','SARL in Marrakech','SARL بمراكش')},
      {path:'tarif/domiciliation', label:text('Demander un devis','Request a quote','طلب عرض')}
    ]
  },
  {
    slug:'procuration-creation-etranger',
    category:text('Investissement','Investment','الاستثمار'),
    title:text('Procuration et légalisation depuis l’étranger','Power of attorney and legalisation from abroad','الوكالة والتصديق من الخارج'),
    description:text('Complément du guide MRE : une procuration ne couvre que les actes qu’elle liste. Traduction, légalisation ou apostille dépendent du pays et du destinataire.','A complement to the guide for Moroccans abroad: a power of attorney covers only the acts it lists. Translation, legalisation or an apostille depend on the country and the recipient.','تكملة لدليل مغاربة العالم: لا تغطي الوكالة إلا الأعمال التي تذكرها. والترجمة أو التصديق أو الأبوستيل تتوقف على البلد والجهة.'),
    sections:[
      [text('À lire avec le guide MRE','Read this with the guide from abroad','يُقرأ مع دليل الخارج'), text('Le guide pour créer depuis l’étranger pose le cadre : résidence, documents, banque et coordination. Cette page ne le remplace pas. Elle précise seulement les signatures et la forme des actes.','The guide to starting from abroad sets the frame: residence, documents, banking and coordination. This page does not replace it. It only clarifies signatures and the form of the deeds.','يضع دليل التأسيس من الخارج الإطار: الإقامة والوثائق والبنك والتنسيق. ولا تعوضه هذه الصفحة. فهي توضح التوقيعات وشكل الوثائق فقط.')],
      [text('Le périmètre de la procuration','The scope of the power of attorney','نطاق الوكالة'), text('Listez les actes visés avant la signature : dépôt, statuts, retrait de documents. Un texte trop vague peut être refusé. Un texte trop étroit peut bloquer l’étape suivante.','List the intended acts before signing: filing, articles, collecting documents. Wording that is too vague may be refused. Wording that is too narrow may block the next step.','عدّدوا الأعمال المقصودة قبل التوقيع: الإيداع والنظام الأساسي وسحب الوثائق. قد تُرفض صياغة فضفاضة. وقد تعطل صياغة ضيقة الخطوة التالية.')],
      [text('Forme demandée par le destinataire','The form the recipient requires','الصيغة التي تطلبها الجهة'), text('Selon le pays, le document et l’organisme, une traduction, une légalisation ou une apostille peut être demandée. Aucune de ces formes n’est universelle. Faites confirmer la forme avant de la commander.','Depending on the country, the document and the body, a translation, legalisation or apostille may be required. None of these forms is universal. Have the form confirmed before you order it.','حسب البلد والوثيقة والجهة، قد تُطلب ترجمة أو تصديق أو أبوستيل. وليست أي صيغة منها عامة. أكّدوا الصيغة قبل طلبها.')],
      [text('Présence éventuelle','Possible attendance','حضور محتمل'), text('L’accompagnement à distance ne garantit pas l’absence de déplacement. La banque et certains actes peuvent exiger une présence. Demandez une confirmation séparée pour la constitution et pour la banque.','Remote support does not guarantee that no travel will be needed. The bank and some acts may require attendance. Ask for separate confirmation for incorporation and for the bank.','لا تضمن المواكبة عن بُعد عدم السفر. وقد يشترط البنك وبعض الأعمال الحضور. اطلبوا تأكيداً مستقلاً للتأسيس وللبنك.')]
    ],
    faqs:[
      [text('Une seule procuration suffit-elle ?','Is one power of attorney enough?','هل تكفي وكالة واحدة؟'), text('Pas nécessairement. Chaque destinataire apprécie l’acte qui le concerne.','Not necessarily. Each recipient assesses the deed addressed to it.','ليس بالضرورة. تقدر كل جهة الوثيقة الموجهة إليها.')],
      [text('L’apostille est-elle toujours exigée ?','Is an apostille always required?','هل الأبوستيل مطلوب دائماً؟'), text('Non. Cela dépend du pays, du document et du destinataire.','No. It depends on the country, the document and the recipient.','لا. يتوقف ذلك على البلد والوثيقة والجهة.')]
    ],
    links:[
      {path:'guides/mre-etranger', label:text('Créer depuis l’étranger','Start from abroad','التأسيس من الخارج')},
      {path:'guides/compte-bancaire-mre', label:text('Compte bancaire professionnel','Business bank account','الحساب البنكي المهني')},
      {path:'investir-au-maroc', label:text('Investir au Maroc','Invest in Morocco','الاستثمار بالمغرب')},
      {path:'creation-entreprise', label:text('Création d’entreprise','Company formation','تأسيس المقاولة')}
    ]
  },
  {
    slug:'cout-creation-societe-maroc',
    category:text('Création d’entreprise','Company formation','تأسيس المقاولة'),
    title:text('Combien coûte une création de société au Maroc','What company formation in Morocco costs','كم يكلف تأسيس شركة بالمغرب'),
    description:text('Le coût d’une création sépare honoraires, frais administratifs et options. Aucun montant en dirhams n’est publié : le capital n’est pas un honoraire.','Formation cost separates fees, administrative charges and options. No dirham amount is published: capital is not a fee.','تفصل تكلفة التأسيس الأتعاب والمصاريف الإدارية والخيارات. ولا يُنشر مبلغ بالدرهم: رأس المال ليس أتعاباً.'),
    sections:[
      [text('Les honoraires','Professional fees','الأتعاب'), text('Les honoraires rémunèrent la mission convenue : cadrage, pièces et coordination. Ils figurent dans une proposition écrite. Tant qu’elle n’est pas acceptée, la demande de devis n’est ni une commande ni un paiement.','Fees pay for the agreed work: scoping, documents and coordination. They appear in a written proposal. Until it is accepted, a quote request is neither an order nor a payment.','تقابل الأتعاب العمل المتفق عليه: التأطير والوثائق والتنسيق. وتظهر في عرض مكتوب. وإلى أن يُقبل، لا يكون طلب التسعيرة طلبية ولا أداءً.')],
      [text('Les frais administratifs','Administrative charges','المصاريف الإدارية'), text('Des organismes peuvent demander des droits ou des frais de publication. Leur montant dépend des barèmes en vigueur, que ce guide ne recopie pas. Demandez qu’ils soient séparés des honoraires.','Bodies may charge duties or publication costs. The amount depends on current scales, which this guide does not copy. Ask for them to be separated from fees.','قد تطلب الهيئات رسوماً أو مصاريف نشر. ويتوقف المبلغ على التعريفات الجارية، ولا ينسخها هذا الدليل. اطلبوا فصلها عن الأتعاب.')],
      [text('Les options','Options','الخيارات'), text('Domiciliation, traduction, légalisation ou une formalité hors périmètre sont des options. Une application de gestion citée dans un pack est aussi distincte des formalités de constitution. Elle n’est due que si la proposition l’inscrit.','Domiciliation, translation, legalisation or a formality outside the scope are options. A management application mentioned in a package is also separate from incorporation formalities. It is due only if the proposal includes it.','التوطين والترجمة والتصديق أو إجراء خارج النطاق خيارات. وتطبيق التدبير المذكور في عرض مستقل أيضاً عن إجراءات التأسيس. ولا يُستحق إلا إذا أدرجه العرض.')],
      [text('Ce qui n’est pas le prix de la création','What is not the price of formation','ما ليس ثمن التأسيس'), text('Le capital, les apports et la trésorerie de démarrage appartiennent à la société. Les impôts de l’exploitation future non plus. Les mélanger empêche de comparer deux propositions.','Capital, contributions and opening cash belong to the company. So do taxes of future trading. Mixing them makes two proposals impossible to compare.','رأس المال والمساهمات وخزينة الانطلاق تخص الشركة. وكذلك ضرائب الاستغلال المقبل. ودمجها يمنع مقارنة عرضين.')]
    ],
    faqs:[
      [text('Pourquoi aucun prix n’est-il affiché ?','Why is no price shown?','لماذا لا يُعرض سعر؟'), text('Parce que la mission et les frais dépendent du dossier. Un chiffre isolé serait inexact.','Because the work and the charges depend on the file. A standalone figure would be inaccurate.','لأن العمل والمصاريف يتوقفان على الملف. وسيكون الرقم المنفرد غير دقيق.')],
      [text('Le capital est-il un honoraire ?','Is capital a fee?','هل رأس المال أتعاب؟'), text('Non. Il se discute à part, sans montant type publié ici.','No. It is discussed separately, with no standard amount published here.','لا. يُناقش على حدة، دون مبلغ نموذجي منشور هنا.')]
    ],
    links:[
      {path:'tarif/creation', label:text('Accompagnements création','Formation support','مواكبة التأسيس')},
      {path:'guides/creer-une-sarl-maroc', label:text('Créer une SARL','Form a SARL','تأسيس SARL')},
      {path:'guides/domiciliation-marrakech', label:text('Domiciliation, une option','Domiciliation, an option','التوطين، خيار')},
      {path:'contact', label:text('Demander un devis','Request a quote','طلب عرض')}
    ]
  },
  {
    slug:'choisir-sarl-ou-sarl-au',
    category:text('Création d’entreprise','Company formation','تأسيس المقاولة'),
    title:text('SARL ou SARL AU : comment choisir','SARL or single-member SARL: how to choose','SARL أو SARL AU: كيف تختارون'),
    description:text('Choisir entre SARL et SARL AU selon le nombre d’associés et la façon de décider. Les deux sont des sociétés. Ce n’est pas un choix de prix.','Choose between a SARL and a single-member SARL according to the number of shareholders and how decisions are made. Both are companies. It is not a price choice.','الاختيار بين SARL وSARL AU حسب عدد الشركاء وطريقة القرار. كلاهما شركة. وليس اختيار سعر.'),
    sections:[
      [text('Un associé ou plusieurs','One shareholder or several','شريك أو عدة شركاء'), text('La SARL AU est la forme à associé unique. La SARL correspond à plusieurs associés. Le nombre réel de porteurs du projet prime sur l’étiquette souhaitée.','The single-member SARL is the one-shareholder form. A SARL fits several shareholders. The real number of project owners matters more than the preferred label.','SARL AU صيغة الشريك الوحيد. وتناسب SARL عدة شركاء. وعدد حاملي المشروع الفعلي أهم من التسمية المرغوبة.')],
      [text('Une société distincte','A separate company','شركة مستقلة'), text('Dans les deux cas, la société a ses statuts et ses obligations. La responsabilité limitée ne supprime ni les devoirs du gérant ni une garantie qu’une banque peut demander à titre personnel.','In both cases the company has its articles and obligations. Limited liability removes neither the manager’s duties nor a guarantee a bank may request personally.','في الحالتين للشركة نظامها والتزاماتها. ولا تلغي المسؤولية المحدودة واجبات المسيّر ولا ضماناً قد يطلبه البنك شخصياً.')],
      [text('Décisions et capital','Decisions and capital','القرارات ورأس المال'), text('À plusieurs, les statuts disent qui décide et qui signe. Aucun montant type de capital n’est publié ici. Le chiffre doit correspondre aux apports réels.','With several people, the articles say who decides and who signs. No standard capital amount is published here. The figure should match real contributions.','مع عدة أشخاص يبيّن النظام من يقرر ومن يوقّع. ولا يُنشر هنا مبلغ نموذجي لرأس المال. ويجب أن يوافق الرقم المساهمات الحقيقية.')],
      [text('Autres pistes','Other paths','مسارات أخرى'), text('L’auto-entrepreneur, une autre forme, une filiale ou une succursale répondent à d’autres situations. Comparez les formes juridiques avant de figer les statuts.','Self-employment, another form, a subsidiary or a branch suit other situations. Compare the legal forms before the articles are fixed.','يناسب المقاول الذاتي أو شكل آخر أو شركة تابعة أو فرع أوضاعاً أخرى. قارنوا الأشكال القانونية قبل تثبيت النظام.')]
    ],
    faqs:[
      [text('La SARL AU est-elle réservée aux petits projets ?','Is the single-member SARL only for small projects?','هل SARL AU للمشاريع الصغيرة فقط؟'), text('Non. Elle correspond d’abord à un seul associé.','No. It corresponds first to a single shareholder.','لا. هي توافق أولاً شريكاً واحداً.')],
      [text('Peut-on changer plus tard ?','Can this change later?','هل يمكن التغيير لاحقاً؟'), text('Un changement d’associés ou de gérance est une modification, avec ses propres formalités.','A change of shareholders or manager is a company change, with its own formalities.','تغيير الشركاء أو المسيّر تعديل، بإجراءاته الخاصة.')]
    ],
    links:[
      {path:'guides/sarl-sarl-au', label:text('SARL et SARL AU','SARL and single-member SARL','SARL وSARL AU')},
      {path:'guides/auto-entrepreneur-vs-sarlau', label:text('Auto-entrepreneur ou SARL AU','Self-employment or single-member SARL','المقاول الذاتي أو SARL AU')},
      {path:'formes-juridiques', label:text('Comparer les formes','Compare legal forms','قارنوا الأشكال')},
      {path:'guides/creer-une-sarl-maroc', label:text('Démarches SARL','SARL steps','إجراءات SARL')}
    ]
  },
  {
    slug:'certificat-negatif-ompic',
    category:text('Création d’entreprise','Company formation','تأسيس المقاولة'),
    title:text('Certificat négatif : validité et dénomination','Negative certificate: validity and company name','الشهادة السلبية: الصلاحية والتسمية'),
    description:text('Le certificat négatif réserve une dénomination. Sa durée d’usage est celle écrite sur le document. Il ne dépose pas une marque et ne crée pas la société.','The negative certificate reserves a company name. The period of use is the one written on the document. It does not register a trademark and it does not create the company.','تحجز الشهادة السلبية تسمية. ومدة الاستعمال هي المكتوبة على الوثيقة. وهي لا تسجل علامة ولا تنشئ الشركة.'),
    sections:[
      [text('Un usage précis','One precise use','استعمال دقيق'), text('Ne confondez pas certificat négatif, nom commercial, enseigne et marque. Les guides déjà en ligne décrivent ces différences. Cette page se concentre sur la validité et les refus de nom.','Do not confuse the negative certificate, the trade name, the sign and the trademark. The guides already online describe those differences. This page focuses on validity and name refusals.','لا تخلطوا بين الشهادة السلبية والاسم التجاري واللافتة والعلامة. وتشرح الأدلة المنشورة هذه الفروق. وتركز هذه الصفحة على الصلاحية ورفض الاسم.')],
      [text('Lire la date sur le document','Read the date on the document','اقرأوا التاريخ على الوثيقة'), text('La durée d’utilisation se lit sur le certificat obtenu, pas dans un délai mémorisé. S’il expire avant le dépôt des statuts, la question du nom est à reprendre.','The period of use is read on the certificate you receive, not from a remembered deadline. If it expires before the articles are filed, the name question has to be reopened.','تُقرأ مدة الاستعمال على الشهادة المسلَّمة، لا من أجل محفوظ. وإذا انتهت قبل إيداع النظام، تُعاد مسألة الاسم.')],
      [text('Plusieurs noms','Several names','عدة أسماء'), text('Préparez plusieurs dénominations. Écartez les noms trop proches d’une société existante et les variantes qui ne diffèrent que par un accent ou un mot générique. Le critère d’examen est celui de l’OMPIC au moment de la demande.','Prepare several names. Set aside names too close to an existing company and variants that differ only by an accent or a generic word. The test is OMPIC’s at the time of the application.','حضّروا عدة تسميات. استبعدوا الأسماء القريبة من شركة قائمة والمتغيرات التي لا تختلف إلا بتشكيل أو كلمة عامة. والمعيار هو معيار OMPIC وقت الطلب.')],
      [text('Avant la signature','Before signing','قبل التوقيع'), text('Le nom des statuts doit reprendre exactement celui du certificat. Une graphie différente fait souvent reprendre la pièce. Le certificat ne remplace pas l’immatriculation.','The name in the articles must copy the certificate exactly. A different spelling often means redoing the document. The certificate does not replace registration.','يجب أن ينقل النظام الاسم كما في الشهادة تماماً. واختلاف الرسم يعيد الوثيقة غالباً. ولا تعوّض الشهادة التسجيل.')]
    ],
    faqs:[
      [text('Le certificat dépose-t-il une marque ?','Does the certificate register a trademark?','هل تسجل الشهادة علامة؟'), text('Non. La marque est une démarche distincte.','No. A trademark is a separate step.','لا. العلامة إجراء مستقل.')],
      [text('Peut-on publier un délai standard ?','Can a standard deadline be published?','هل يُنشر أجل معياري؟'), text('Non. La validité se vérifie sur le certificat.','No. Validity is checked on the certificate.','لا. تُتحقق الصلاحية على الشهادة.')]
    ],
    links:[
      {path:'guides/certificat-negatif-maroc', label:text('Guide déjà en ligne','Guide already online','الدليل المنشور')},
      {path:'guides/nom-commercial-enseigne-et-marque', label:text('Nom, enseigne et marque','Name, sign and trademark','الاسم واللافتة والعلامة')},
      {path:'guides/creation-direct-entreprise', label:text('DirectEntreprise','DirectEntreprise','DirectEntreprise')},
      {path:'creation-entreprise', label:text('Accompagnement à la création','Formation support','مواكبة التأسيس')}
    ]
  },
  {
    slug:'modifier-societe-maroc',
    category:text('Modification de société','Company changes','تعديل الشركة'),
    title:text('Modifier une société au Maroc','Changing a company in Morocco','تعديل شركة بالمغرب'),
    description:text('Modifier le gérant, le siège, le capital ou l’objet suppose une décision et des formalités propres. Le modèle unique n’existe pas : tout part des statuts.','Changing the manager, office, capital or purpose requires its own decision and formalities. There is no single template: everything starts from the articles.','تعديل المسيّر أو المقر أو رأس المال أو الغرض يقتضي قراراً وإجراءات خاصة. ولا يوجد نموذج واحد: كل شيء ينطلق من النظام الأساسي.'),
    sections:[
      [text('Partir des statuts','Start from the articles','الانطلاق من النظام'), text('Lisez les statuts et, si vous l’avez, un extrait à jour. Le changement doit être possible dans ce cadre, ou les statuts doivent être adaptés. Cette page ne tranche pas votre cas.','Read the articles and, if you have one, an up-to-date extract. The change must be possible in that framework, or the articles must be adapted. This page does not decide your case.','اقرأوا النظام، وإن توفر مستخرج محين. ويجب أن يكون التغيير ممكناً في هذا الإطار، أو أن يُكيَّف النظام. ولا تحسم هذه الصفحة حالتكم.')],
      [text('Gérant et siège','Manager and office','المسيّر والمقر'), text('Un changement de gérant touche les pouvoirs de signature. Un transfert de siège exige une adresse documentée. L’adresse de contact du cabinet ne remplace pas cette pièce.','A change of manager affects signing powers. An office transfer needs a documented address. The firm’s contact address does not replace that document.','يمس تغيير المسيّر صلاحيات التوقيع. ويحتاج نقل المقر إلى عنوان موثق. ولا يغني عنوان المكتب عن هذه الوثيقة.')],
      [text('Capital et objet','Capital and purpose','رأس المال والغرض'), text('Modifier le capital ou l’objet change l’activité ou les apports. Décrivez le projet réel avant la décision. Les effets fiscaux, s’il y en a, se vérifient pour l’opération ; ils ne sont pas résumés par un barème ici.','Changing capital or purpose changes the activity or the contributions. Describe the real project before the decision. Tax effects, if any, are checked for the transaction; they are not summarised by a scale here.','تغيير رأس المال أو الغرض يغيّر النشاط أو المساهمات. صفوا المشروع الفعلي قبل القرار. والآثار الضريبية، إن وُجدت، تُتحقق للعملية؛ ولا تلخصها تعريفة هنا.')],
      [text('Une modification, une proposition','One change, one proposal','تعديل واحد، عرض واحد'), text('La page de modification sert à décrire le besoin. La proposition indique les actes inclus et les frais administratifs éventuels. Plusieurs changements ne forment pas forcément une seule formalité.','The company-change page is where you describe the need. The proposal states the deeds included and any administrative charges. Several changes are not necessarily one formality.','صفحة التعديل مكان وصف الحاجة. ويبين العرض العقود المشمولة والمصاريف الإدارية المحتملة. وعدة تغييرات ليست بالضرورة إجراءً واحداً.')]
    ],
    faqs:[
      [text('Tout peut-il tenir dans le même dossier ?','Can everything fit in the same file?','هل يمكن جمع كل شيء في الملف نفسه؟'), text('Pas toujours. Le cabinet dit, après lecture, ce qui peut être groupé.','Not always. After reading the file, the firm says what can be grouped.','ليس دائماً. وبعد الاطلاع يبيّن المكتب ما يمكن جمعه.')],
      [text('La décision suffit-elle ?','Is the decision enough?','هل يكفي القرار؟'), text('La décision est une étape. La mise à jour des registres dépend des formalités accomplies.','The decision is one step. Updating the registers depends on the formalities completed.','القرار مرحلة. وتحيين السجلات يتوقف على الإجراءات المنجزة.')]
    ],
    links:[
      {path:'modify-company', label:text('Décrire une modification','Describe a company change','صفوا تعديلاً')},
      {path:'guides/siege-social-maroc', label:text('Changer de siège','Change the office','تغيير المقر')},
      {path:'guides/cout-creation-societe-maroc', label:text('Distinguer honoraires et frais','Separate fees and charges','فصل الأتعاب عن المصاريف')},
      {path:'contact', label:text('Échanger avec le cabinet','Talk to the firm','التحدث مع المكتب')}
    ]
  },
  {
    slug:'siege-social-maroc',
    category:text('Domiciliation d’entreprise','Company domiciliation','توطين المقاولة'),
    title:text('Siège social : domiciliation, bail ou local','Registered office: domiciliation, lease or premises','المقر: توطين أو كراء أو محل'),
    description:text('Trois façons de justifier un siège au Maroc : contrat de domiciliation, bail ou local dont la société dispose. Le choix dépend de l’activité.','Three ways to evidence an office in Morocco: a domiciliation contract, a lease, or premises the company controls. The choice depends on the activity.','ثلاث طرق لإثبات مقر بالمغرب: عقد توطين أو كراء أو محل تتصرف فيه الشركة. ويتوقف الاختيار على النشاط.'),
    sections:[
      [text('Domiciliation','Domiciliation','التوطين'), text('Le contrat précise l’adresse et, le cas échéant, le courrier. Ne signez pas les statuts sur une adresse qui n’est pas encore accordée par écrit.','The contract states the address and, where relevant, the mail. Do not sign articles on an address that is not yet agreed in writing.','يحدد العقد العنوان، وعند الاقتضاء، البريد. ولا توقّعوا النظام على عنوان لم يُوافق عليه كتابة بعد.')],
      [text('Bail ou local propre','Lease or own premises','كراء أو محل خاص'), text('Un bail relie la société à un local loué. Un local déjà disponible suppose un titre et une activité compatible. Une adresse personnelle n’est pas automatiquement un siège recevable.','A lease links the company to rented premises. Premises already available need a title and a compatible activity. A personal address is not automatically an acceptable office.','يربط الكراء الشركة بمحل. والمحل المتاح يحتاج إلى سند ونشاط متوافق. والعنوان الشخصي ليس تلقائياً مقراً مقبولاً.')],
      [text('La même adresse partout','The same address everywhere','العنوان نفسه في كل مكان'), text('Statuts, formulaires et certificat doivent porter la même adresse. Une différence d’étage ou d’orthographe suffit à faire reprendre une pièce.','Articles, forms and the certificate must carry the same address. A difference of floor or spelling is enough to have a document redone.','يجب أن يحمل النظام والاستمارات والشهادة العنوان نفسه. ويكفي اختلاف طابق أو إملاء لإعادة وثيقة.')],
      [text('La ville du siège','The city of the office','مدينة المقر'), text('Felexia Conseils est à Marrakech. La ville du siège est celle de l’adresse retenue, pas automatiquement celle du cabinet.','Felexia Conseils is in Marrakech. The city of the office is the city of the chosen address, not automatically the firm’s city.','Felexia Conseils بمراكش. ومدينة المقر هي مدينة العنوان المختار، لا مدينة المكتب تلقائياً.')]
    ],
    faqs:[
      [text('Faut-il un local commercial pour toute société ?','Does every company need commercial premises?','هل يلزم كل شركة محل تجاري؟'), text('Non. Cela dépend de l’activité et de la solution acceptée pour le dossier.','No. It depends on the activity and on the solution accepted for the file.','لا. يتوقف ذلك على النشاط والحل المقبول للملف.')],
      [text('Peut-on changer ensuite ?','Can it change later?','هل يمكن التغيير لاحقاً؟'), text('Oui, par un transfert de siège, qui est une modification.','Yes, by transferring the office, which is a company change.','نعم، بنقل المقر، وهو تعديل.')]
    ],
    links:[
      {path:'domiciliation', label:text('Étudier une domiciliation','Review domiciliation','دراسة التوطين')},
      {path:'guides/domiciliation-marrakech', label:text('Domiciliation à Marrakech','Domiciliation in Marrakech','التوطين بمراكش')},
      {path:'guides/modifier-societe-maroc', label:text('Modifier le siège','Change the office','تعديل المقر')},
      {path:'creation-entreprise', label:text('Création d’entreprise','Company formation','تأسيس المقاولة')}
    ]
  },
  {
    slug:'compte-bancaire-mre',
    category:text('Investissement','Investment','الاستثمار'),
    title:text('Compte professionnel pour un MRE ou un non-résident','A business account for a Moroccan abroad or a non-resident','حساب مهني لمغربي بالخارج أو غير مقيم'),
    description:text('La banque décide de l’ouverture d’un compte professionnel. Le cabinet peut aider à ordonner les pièces. Il ne garantit ni l’ouverture ni un délai.','The bank decides whether to open a business account. The firm can help organise the documents. It guarantees neither the opening nor a timeline.','يقرر البنك فتح الحساب المهني. ويمكن للمكتب المساعدة في ترتيب الوثائق. ولا يضمن الفتح ولا أجلاً.'),
    sections:[
      [text('Le cabinet n’est pas la banque','The firm is not the bank','المكتب ليس البنك'), text('Aucun partenaire bancaire n’est affiché sur ce site. L’ouverture, le refus ou les conditions appartiennent à l’établissement choisi.','No banking partner is displayed on this website. Opening, refusal or the conditions belong to the chosen institution.','لا يُعرض شريك بنكي على هذا الموقع. والفتح أو الرفض أو الشروط تخص المؤسسة المختارة.')],
      [text('Pièces, sans liste fermée','Documents, without a closed list','وثائق، دون لائحة مغلقة'), text('Les banques demandent en général les identités, les documents de la société et des éléments sur l’activité. Pour un non-résident, la résidence et l’origine des fonds peuvent aussi être demandées. La liste exacte est celle de la banque.','Banks generally ask for identities, company documents and information on the activity. For a non-resident, residence and the source of funds may also be requested. The exact list is the bank’s.','تطلب البنوك عادة الهويات ووثائق الشركة ومعطيات عن النشاط. وللغير المقيم قد تُطلب الإقامة ومصدر الأموال. واللائحة الدقيقة هي لائحة البنك.')],
      [text('Fonds venus de l’étranger','Funds from abroad','أموال من الخارج'), text('L’Office des Changes prévoit un régime pour certains investissements financés en devises, dans les conditions applicables. Cela ne crée pas un droit automatique de transfert sans justificatifs.','The Foreign Exchange Office provides a regime for some investments financed in foreign currency, under the applicable conditions. That does not create an automatic transfer right without evidence.','ينص مكتب الصرف على نظام لبعض الاستثمارات الممولة بالعملة، وفق الشروط المطبقة. ولا ينشئ ذلك حقاً تلقائياً في التحويل دون إثبات.')],
      [text('Ne pas inverser les étapes','Do not reverse the steps','لا تعكسوا المراحل'), text('Clarifiez la société, les signataires et l’origine des fonds avant le rendez-vous bancaire. Une procuration bancaire ne remplace pas la procuration de constitution.','Clarify the company, the signatories and the source of funds before the bank appointment. A banking power of attorney does not replace the incorporation power.','وضّحوا الشركة والموقّعين ومصدر الأموال قبل موعد البنك. والوكالة البنكية لا تعوّض وكالة التأسيس.')]
    ],
    faqs:[
      [text('Le site choisit-il la banque ?','Does the website choose the bank?','هل يختار الموقع البنك؟'), text('Non. Vous choisissez l’établissement.','No. You choose the institution.','لا. تختارون المؤسسة.')],
      [text('Un compte personnel suffit-il ?','Is a personal account enough?','هل يكفي حساب شخصي؟'), text('Non. Les flux de la société se distinguent des flux personnels.','No. The company’s flows are separate from personal flows.','لا. تُميز تدفقات الشركة عن التدفقات الشخصية.')]
    ],
    links:[
      {path:'guides/mre-etranger', label:text('Créer depuis l’étranger','Start from abroad','التأسيس من الخارج')},
      {path:'guides/procuration-creation-etranger', label:text('Procuration et légalisation','Power of attorney and legalisation','الوكالة والتصديق')},
      {path:'investir-au-maroc', label:text('Investir au Maroc','Invest in Morocco','الاستثمار بالمغرب')},
      {path:'contact', label:text('Préparer le dossier','Prepare the file','تحضير الملف')}
    ]
  },
  {
    slug:'creation-direct-entreprise',
    category:text('Création d’entreprise','Company formation','تأسيس المقاولة'),
    title:text('Créer une société avec DirectEntreprise','Form a company with DirectEntreprise','تأسيس شركة عبر DirectEntreprise'),
    description:text('DirectEntreprise est le guichet électronique de l’OMPIC. Préparer le dossier avec le cabinet et déposer sur le téléservice sont deux gestes distincts.','DirectEntreprise is OMPIC’s online portal. Preparing the file with the firm and filing on the portal are two different steps.','DirectEntreprise شباك OMPIC الإلكتروني. وإعداد الملف مع المكتب والإيداع على الخدمة خطوتان مختلفتان.'),
    sections:[
      [text('Le guichet et le cabinet','The portal and the firm','الشباك والمكتب'), text('Les conditions d’accès, les pièces et les signatures se vérifient sur le service officiel. Ce guide ne recopie pas un mode d’emploi qui peut changer. Le cabinet, si vous le mandatez, prépare et coordonne dans le périmètre du devis.','Access conditions, documents and signatures are checked on the official service. This guide does not copy instructions that may change. The firm, if you instruct it, prepares and coordinates within the quote.','تُتحقق شروط الولوج والوثائق والتوقيعات في الخدمة الرسمية. ولا ينسخ هذا الدليل دليلاً قد يتغير. والمكتب، إذا كلفتموه، يحضّر وينسق في نطاق العرض.')],
      [text('Le formulaire du site','The website form','نموذج الموقع'), text('Le formulaire Felexia présente le projet. Il n’est pas l’interface de DirectEntreprise et ne reçoit pas les pièces d’identité. Les identifiants du téléservice se créent selon les règles de l’OMPIC.','The Felexia form introduces the project. It is not the DirectEntreprise interface and it does not receive identity documents. Portal credentials are created under OMPIC’s rules.','يقدم نموذج Felexia المشروع. وهو ليس واجهة DirectEntreprise ولا يستقبل وثائق الهوية. وتُنشأ حسابات الشباك وفق قواعد OMPIC.')],
      [text('Signatures encore possibles','Signatures may still be required','قد تبقى التوقيعات'), text('Un dépôt en ligne peut exiger une signature, une procuration ou un complément. Un nom qui ne correspond pas au certificat négatif retarde le dossier.','Online filing can still require a signature, a power of attorney or an additional document. A name that does not match the negative certificate delays the file.','قد يتطلب الإيداع الإلكتروني توقيعاً أو وكالة أو تكملة. والاسم الذي لا يطابق الشهادة السلبية يؤخر الملف.')],
      [text('Après l’immatriculation','After registration','بعد التسجيل'), text('Un document de création n’organise pas la comptabilité, la banque ni les déclarations. Ces sujets sont une mission distincte s’ils sont confiés au cabinet.','A formation document does not organise accounting, banking or filings. Those subjects are a separate engagement if they are entrusted to the firm.','وثيقة التأسيس لا تنظم المحاسبة ولا البنك ولا التصاريح. وهذه المواضيع مهمة مستقلة إذا عُهد بها إلى المكتب.')]
    ],
    faqs:[
      [text('Le téléservice remplace-t-il le cabinet ?','Does the portal replace the firm?','هل يعوّض الشباك المكتب؟'), text('Non. L’un est le canal administratif. L’autre, si vous le souhaitez, prépare le dossier.','No. One is the administrative channel. The other, if you want it, prepares the file.','لا. أحدهما قناة إدارية. والآخر، إذا أردتم، يحضّر الملف.')],
      [text('Tout se fait-il sans déplacement ?','Can everything be done without travel?','هل يتم كل شيء دون تنقل؟'), text('Pas pour tous les dossiers. Les signatures et la banque se confirment avant cette conclusion.','Not for every file. Signatures and the bank are confirmed before that conclusion.','ليس لكل الملفات. تُؤكد التوقيعات والبنك قبل هذا الاستنتاج.')]
    ],
    links:[
      {path:'guides/creation-entreprise-en-ligne', label:text('Préparer un dossier à distance','Prepare a file remotely','إعداد ملف عن بُعد')},
      {path:'guides/certificat-negatif-ompic', label:text('Certificat négatif','Negative certificate','الشهادة السلبية')},
      {path:'creation-entreprise', label:text('Page création','Formation page','صفحة التأسيس')},
      {path:'guides/cout-creation-societe-maroc', label:text('Comprendre le coût','Understand the cost','فهم التكلفة')}
    ]
  }
];

export function auditGuidesFor(language) {
  return guides.map(guide => ({
    slug:guide.slug,
    category:guide.category[language],
    title:guide.title[language],
    excerpt:guide.description[language],
    metaTitle:`${guide.title[language]} | Felexia Conseils`,
    metaDescription:guide.description[language],
    html:article(language, guide),
    faq:guide.faqs.map(([question, answer]) => ({question:question[language], answer:answer[language]})),
    publicationDate:date,
    modifiedDate:date,
    authors:[],
    audit:true,
    cover:{...cover, alt:guide.title[language]}
  }));
}
