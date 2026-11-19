const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const official = [
  src('OMPIC, création et vie de l’entreprise', 'OMPIC, company formation and corporate life', 'المكتب المغربي للملكية الصناعية والتجارية، التأسيس وحياة المقاولة', 'https://www.ompic.ma/'),
  src('DirectInfo, renseignements sur les entreprises', 'DirectInfo, company information', 'DirectInfo، معلومات عن المقاولات', 'https://www.directinfo.ma/'),
  src('Portail de l’investissement et centres régionaux d’investissement', 'Investment portal and regional investment centres', 'بوابة الاستثمار والمراكز الجهوية للاستثمار', 'https://www.invest.gov.ma/'),
  src('Secrétariat général du gouvernement, Bulletin officiel', 'General Secretariat of the Government, Official Gazette', 'الأمانة العامة للحكومة، الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Portail Adala du ministère de la Justice', 'Adala legal portal of the Ministry of Justice', 'بوابة عدالة لوزارة العدل', 'https://adala.justice.gov.ma/'),
  src('Direction générale des impôts', 'General Tax Directorate', 'المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/'),
  src('Portail de l’auto-entrepreneur', 'Self-employed status portal', 'بوابة المقاول الذاتي', 'https://ae.gov.ma/')
];

export const lot1 = [
  {
    slug:'creer-societe-maroc-depuis-la-france',
    category:t('Investissement', 'Investment', 'الاستثمار'),
    title:t(
      'Créer une société au Maroc depuis la France : étapes et erreurs à éviter',
      'Forming a Moroccan company from France: steps and mistakes to avoid',
      'تأسيس شركة بالمغرب انطلاقاً من فرنسا: الخطوات والأخطاء التي تُتجنَّب'
    ),
    description:t(
      'Depuis la France, la société se constitue selon le droit marocain. Ce guide ordonne les décisions, les signatures et les pièces, et signale les erreurs qui font reprendre un dossier. Aucun délai n’est promis.',
      'From France, the company is formed under Moroccan law. This guide orders the decisions, the signatures and the documents, and flags the mistakes that send a file back. No timeline is promised.',
      'من فرنسا، تتأسس الشركة وفق القانون المغربي. يرتب هذا الدليل القرارات والتوقيعات والوثائق، وينبه إلى الأخطاء التي تعيد الملف. ولا يُوعد بأي أجل.'
    ),
    sections:[
      {
        heading:t('La société se crée au Maroc, même si vous décidez depuis la France', 'The company is formed in Morocco, even if you decide from France', 'الشركة تتأسس في المغرب حتى لو قررتم من فرنسا'),
        paragraphs:[
          t(
            'Préparer une société depuis la France est possible. Le droit applicable reste le droit marocain. La forme, les statuts, le siège, la gérance et l’immatriculation au registre du commerce se décident selon les textes marocains, pas selon le droit des sociétés français. Une SAS, une SARL de droit français ou une entreprise individuelle française n’est pas une forme marocaine. Si une société française doit détenir la nouvelle structure, le projet devient celui d’une filiale : les pièces de la société mère, la chaîne de signature et la façon de décider ne sont pas celles d’une création entre personnes physiques.',
            'You can prepare a company from France. The law that applies is still Moroccan law. The legal form, the articles, the registered office, the management and registration in the trade register are decided under Moroccan texts, not under French company law. A French SAS, a French SARL or a French sole proprietorship is not a Moroccan form. If a French company is to own the new structure, the project becomes a subsidiary: the parent’s documents, the signing chain and the way decisions are made are not those of a formation between individuals.',
            'يمكن تحضير شركة من فرنسا. والقانون المطبق يبقى القانون المغربي. فالشكل والنظام الأساسي والمقر والتسيير والتسجيل في السجل التجاري تُحسم وفق النصوص المغربية، لا وفق قانون الشركات الفرنسي. وشركة SAS أو SARL فرنسية أو مقاولة فردية فرنسية ليست شكلاً مغربياً. وإذا كانت شركة فرنسية ستملك الهيكل الجديد، صار المشروع شركة تابعة: وثائق الشركة الأم وسلسلة التوقيع وطريقة القرار ليست تلك الخاصة بتأسيس بين أشخاص ذاتيين.'
          ),
          t(
            'Le [guide pour créer depuis l’étranger](guides/mre-etranger) décrit le cadre commun aux porteurs de projet qui ne sont pas sur place. Cette page le complète pour une personne qui réside en France : l’ordre des décisions, la forme des actes signés hors du Maroc, et les erreurs qui reviennent dans ce trajet. Felexia Conseils reçoit à Marrakech, résidence Al Ihssane à Mabrouka, et prépare aussi des dossiers à distance. La proposition écrite dit ce qui est inclus. Elle ne promet pas une date d’immatriculation, parce que les administrations et les banques ne laissent pas un cabinet publier leur calendrier.',
            'The [guide to starting from abroad](guides/mre-etranger) describes the frame shared by founders who are not on the spot. This page adds what changes when you live in France: the order of decisions, the form of deeds signed outside Morocco, and the mistakes that recur on this path. Felexia Conseils meets in Marrakech, at Résidence Al Ihssane in Mabrouka, and also prepares files remotely. The written proposal states what is included. It does not promise a registration date, because administrations and banks do not let an advisory firm publish their calendar.',
            'يصف [دليل التأسيس من الخارج](guides/mre-etranger) الإطار المشترك لمن يؤسسون وهم غير موجودين في عين المكان. وتكمل هذه الصفحة ما يتغير حين تقيمون في فرنسا: ترتيب القرارات، وشكل العقود الموقعة خارج المغرب، والأخطاء المتكررة في هذا المسار. يستقبل Felexia Conseils بمراكش، إقامة الإحسان بمبروكة، ويحضّر أيضاً ملفات عن بُعد. ويبين العرض المكتوب ما هو مشمول. ولا يعد بتاريخ تسجيل، لأن الإدارات والبنوك لا تترك لمكتب استشاري نشر جدولها.'
          )
        ]
      },
      {
        heading:t('Choisir la forme avant de rassembler les pièces', 'Choose the form before you collect the documents', 'اختاروا الشكل قبل جمع الوثائق'),
        paragraphs:[
          t(
            'Le choix se fait parmi les formes du droit marocain, comparées sur la page [formes juridiques](formes-juridiques). Une SARL, régie notamment par la loi n° 5-96, convient en général à un petit nombre d’associés qui veulent une société à responsabilité limitée et des statuts qui organisent les parts et la gérance. La SARL à associé unique répond au projet d’une seule personne. Une société anonyme relève de la loi n° 17-95 : sa gouvernance est plus lourde, et elle ne se choisit pas seulement parce que le mot paraît plus « international » depuis la France. L’auto-entrepreneur n’est pas une société. C’est un statut de personne physique, dont les conditions et les activités admises sont publiées sur le portail officiel. On ne le transforme pas en société en changeant le nom sur une carte de visite.',
            'The choice is among Moroccan forms, compared on the [legal forms](formes-juridiques) page. A SARL, governed in particular by Law 5-96, usually fits a small number of shareholders who want a limited-liability company and articles that organise the shares and the management. The single-member SARL fits a project with one person. A public limited company, the SA, comes under Law 17-95: its governance is heavier, and it is not chosen merely because the word sounds more “international” from France. The auto-entrepreneur status is not a company. It is a status for an individual, and the conditions and permitted activities are published on the official portal. You do not turn it into a company by changing the name on a business card.',
            'يكون الاختيار بين أشكال القانون المغربي، المقارنة في صفحة [الأشكال القانونية](formes-juridiques). وتناسب SARL، التي ينظمها خصوصاً القانون رقم 5-96، في الغالب عدداً قليلاً من الشركاء يريدون شركة ذات مسؤولية محدودة ونظاماً أساسياً ينظم الحصص والتسيير. وتناسب SARL ذات الشريك الوحيد مشروعاً لشخص واحد. وتخضع شركة المساهمة للقانون رقم 17-95: حكامتها أثقل، ولا تُختار لمجرد أن الكلمة تبدو أكثر «دولية» من فرنسا. والمقاول الذاتي ليس شركة. إنه وضع لشخص ذاتي، وشروطه والأنشطة المقبولة منشورة في البوابة الرسمية. ولا يتحول إلى شركة بتغيير الاسم على بطاقة الزيارة.'
          ),
          t(
            'Décidez ensuite qui est associé, qui est gérant, et qui signera à la banque. Ces trois rôles ne se confondent pas. Une personne en France qui « aide au lancement » n’est pas associée tant que les statuts ne la nomment pas et qu’elle n’a pas consenti à l’apport. Un gérant peut ne pas être associé : ses pouvoirs viennent alors des statuts et de la loi, pas d’une conversation. Le [guide SARL ou SARL AU](guides/choisir-sarl-ou-sarl-au) aide à trancher le nombre d’associés avant que le texte ne soit figé. Changer d’avis après la signature est une modification de société, avec ses propres décisions et ses propres formalités.',
            'Then decide who is a shareholder, who is the manager, and who will sign at the bank. Those three roles are not the same. Someone in France who “helps with the launch” is not a shareholder until the articles name them and they have agreed to the contribution. A manager need not be a shareholder: their powers then come from the articles and the law, not from a conversation. The [SARL or single-member SARL guide](guides/choisir-sarl-ou-sarl-au) helps settle the number of shareholders before the text is fixed. Changing your mind after signature is a company amendment, with its own decisions and its own formalities.',
            'ثم قرروا من هو الشريك، ومن هو المسيّر، ومن سيوقّع في البنك. هذه الأدوار الثلاثة لا تختلط. فالشخص في فرنسا الذي «يساعد على الإطلاق» ليس شريكاً ما دام النظام لا يسميه وما دام لم يوافق على المساهمة. وقد لا يكون المسيّر شريكاً: فسلطاته تأتي حينئذ من النظام والقانون، لا من حديث. ويساعد [دليل SARL أو SARL AU](guides/choisir-sarl-ou-sarl-au) على حسم عدد الشركاء قبل تثبيت النص. وتغيير الرأي بعد التوقيع تعديل للشركة، بقراراته وإجراءاته الخاصة.'
          )
        ]
      },
      {
        heading:t('Le nom, l’objet et le certificat négatif', 'The name, the purpose and the negative certificate', 'الاسم والغرض والشهادة السلبية'),
        paragraphs:[
          t(
            'La dénomination se réserve auprès de l’OMPIC par un certificat négatif. Ce document ne crée pas la société, n’ouvre pas le registre du commerce et ne dépose pas une marque. Le [guide du certificat négatif](guides/certificat-negatif-ompic) distingue ces démarches. La durée pendant laquelle le nom peut être utilisé est celle écrite sur le certificat obtenu, pas un délai appris une fois pour toutes. Si le certificat expire avant le dépôt des statuts, la question du nom est à reprendre. Préparez plusieurs dénominations. Écartez les graphies trop proches d’une société déjà immatriculée, et les variantes qui ne diffèrent que par un accent, une ville ou un mot générique.',
            'The company name is reserved with OMPIC through a negative certificate. That document does not create the company, does not open the trade register and does not register a trademark. The [negative-certificate guide](guides/certificat-negatif-ompic) separates those steps. The period during which the name may be used is the period written on the certificate you receive, not a deadline learned once and for all. If the certificate expires before the articles are filed, the name question has to be reopened. Prepare several names. Set aside spellings too close to a company already registered, and variants that differ only by an accent, a city or a generic word.',
            'يُحجز الاسم لدى OMPIC بشهادة سلبية. وهذه الوثيقة لا تنشئ الشركة، ولا تفتح السجل التجاري، ولا تودع علامة. ويفصل [دليل الشهادة السلبية](guides/certificat-negatif-ompic) هذه الإجراءات. والمدة التي يجوز فيها استعمال الاسم هي المدة المكتوبة على الشهادة المسلَّمة، لا أجلاً حُفظ مرة واحدة. وإذا انتهت الشهادة قبل إيداع النظام، تُعاد مسألة الاسم. حضّروا عدة تسميات. واستبعدوا الرسوم القريبة جداً من شركة مسجلة، والمتغيرات التي لا تختلف إلا بتشكيل أو مدينة أو كلمة عامة.'
          ),
          t(
            'L’objet social décrit l’activité que vous allez réellement exercer au Maroc. Un objet recopié sur les statuts d’une société française emploie parfois des mots qui ne correspondent pas à la façon dont l’activité est comprise par le registre, par une banque ou par une administration sectorielle. Un objet trop large, du type « toutes activités commerciales », complique ces lectures sans vous donner une liberté réelle. Un objet trop étroit bloque un développement pourtant prévu. Écrivez l’activité en phrases concrètes, puis faites-la tenir dans la formulation des statuts. Le nom qui figure dans les statuts doit reprendre exactement celui du certificat, y compris les traits d’union et les majuscules.',
            'The corporate purpose describes the activity you will actually carry on in Morocco. A purpose copied from the articles of a French company sometimes uses words that do not match the way the register, a bank or a sector administration understands the activity. A purpose that is too wide, of the “all commercial activities” type, complicates those readings without giving you real freedom. A purpose that is too narrow blocks a development you already planned. Write the activity in concrete sentences, then fit it into the wording of the articles. The name in the articles must copy the certificate exactly, including hyphens and capitals.',
            'يصف الغرض الاجتماعي النشاط الذي ستمارسونه فعلاً في المغرب. والغرض المنسوخ من نظام شركة فرنسية يستعمل أحياناً كلمات لا تطابق فهم السجل أو البنك أو إدارة قطاعية للنشاط. والغرض الواسع جداً، من نوع «كل الأنشطة التجارية»، يعقّد هذه القراءات دون أن يمنح حرية حقيقية. والغرض الضيق جداً يعطل تطوراً كان مقرراً. اكتبوا النشاط بجمل ملموسة، ثم أدخلوه في صياغة النظام. ويجب أن ينقل الاسم الوارد في النظام الشهادة بالحرف، بما في ذلك الشرطات والحروف الكبيرة.'
          )
        ]
      },
      {
        heading:t('Le siège : Marrakech ou une autre ville', 'The office: Marrakech or another city', 'المقر: مراكش أو مدينة أخرى'),
        paragraphs:[
          t(
            'Toute société a un siège. Il se justifie par un contrat de domiciliation, un bail, ou un local dont la société peut disposer. Le [guide du siège](guides/siege-social-maroc) compare ces trois titres. L’adresse affichée du cabinet, Résidence Al Ihssane, immeuble 3, appartement 4, Mabrouka, Marrakech, est une adresse de contact. Elle ne devient le siège de votre société que si une proposition et un contrat le disent. Ne faites pas imprimer des statuts sur l’adresse d’un proche, d’un coworking visité une fois, ou d’une boîte postale, tant qu’un titre écrit n’a pas été accepté.',
            'Every company has a registered office. It is evidenced by a domiciliation contract, a lease, or premises the company can use. The [office guide](guides/siege-social-maroc) compares those three titles. The address shown for the firm, Résidence Al Ihssane, building 3, apartment 4, Mabrouka, Marrakech, is a contact address. It becomes your company’s office only if a proposal and a contract say so. Do not have articles printed on the address of a relative, a coworking space visited once, or a post box, until a written title has been accepted.',
            'لكل شركة مقر. ويُثبت بعقد توطين أو عقد كراء أو محل تستطيع الشركة التصرف فيه. ويقارن [دليل المقر](guides/siege-social-maroc) هذه السندات الثلاثة. والعنوان المعروض للمكتب، إقامة الإحسان، العمارة 3، الشقة 4، مبروكة، مراكش، عنوان تواصل. ولا يصبح مقر شركتكم إلا إذا قال ذلك عرض وعقد. ولا تطبعوا نظاماً على عنوان قريب أو فضاء عمل زاروه مرة أو صندوق بريد، قبل قبول سند مكتوب.'
          ),
          t(
            'L’activité commande le titre. Accueillir du public, stocker, transformer, ou exercer une profession réglementée peut rendre une simple domiciliation insuffisante. Dites-le avant la rédaction, pas le jour du dépôt. La ville du siège est celle de l’adresse retenue : Marrakech n’a pas un droit des sociétés à part. Le centre régional d’investissement de la région concernée est un interlocuteur des démarches d’entreprise. Les pièces et le circuit se confirment sur le dossier. Ce guide n’annonce aucun délai de traitement. Si vous hésitez entre domiciliation et bail, la page [domiciliation](domiciliation) sert à décrire le besoin, pas à considérer l’adresse du site comme déjà attribuée.',
            'The activity drives the title. Receiving the public, storing, processing, or practising a regulated profession can make a plain domiciliation insufficient. Say so before drafting, not on filing day. The city of the office is the city of the address you keep: Marrakech does not have a separate company law. The regional investment centre of the region concerned is a contact for business procedures. The documents and the path are confirmed on the file. This guide states no processing time. If you are hesitating between domiciliation and a lease, the [domiciliation](domiciliation) page is where you describe the need. It does not treat the website address as already assigned.',
            'النشاط هو الذي يفرض السند. فقد لا يكفي التوطين المجرد لاستقبال العموم أو التخزين أو التحويل أو مزاولة مهنة منظمة. قولوا ذلك قبل الصياغة، لا يوم الإيداع. ومدينة المقر هي مدينة العنوان المختار: ليس لمراكش قانون شركات خاص. والمركز الجهوي للاستثمار في الجهة المعنية مخاطب لإجراءات المقاولة. وتُؤكد الوثائق والمسار على الملف. ولا يعلن هذا الدليل أي أجل معالجة. وإذا ترددتم بين التوطين والكراء، فصفحة [التوطين](domiciliation) مكان وصف الحاجة، لا لاعتبار عنوان الموقع ممنوحاً سلفاً.'
          )
        ]
      },
      {
        heading:t('Statuts, apports et signatures faites en France', 'Articles, contributions and signatures made in France', 'النظام والمساهمات والتوقيعات المنجزة في فرنسا'),
        paragraphs:[
          t(
            'Les statuts fixent les associés, les apports, la répartition des parts, la gérance, l’objet et le siège. Le capital est le montant de ces apports. Ce n’est pas le prix de la création, et ce n’est pas un honoraire. Aucun montant type n’est publié dans ce guide : le chiffre doit correspondre aux apports réels et au texte en vigueur de la loi qui régit la forme choisie. On relit ce texte au Bulletin officiel et sur le portail Adala, plutôt que de reprendre un chiffre lu sur un forum. Le [guide du coût d’une création](guides/cout-creation-societe-maroc) sépare les honoraires, les frais demandés par les organismes, et le capital. Les mélanger empêche de comparer deux propositions.',
            'The articles set the shareholders, the contributions, the allocation of shares, the management, the purpose and the office. Capital is the amount of those contributions. It is not the price of formation, and it is not a fee. No standard amount is published in this guide: the figure must match the real contributions and the current text of the law that governs the form you chose. Read that text in the Official Gazette and on the Adala portal, rather than repeating a figure read on a forum. The [guide to the cost of formation](guides/cout-creation-societe-maroc) separates fees, charges asked by public bodies, and capital. Mixing them makes two proposals impossible to compare.',
            'يحدد النظام الشركاء والمساهمات وتوزيع الحصص والتسيير والغرض والمقر. ورأس المال هو مبلغ هذه المساهمات. وليس ثمن التأسيس، وليس أتعاباً. ولا يُنشر في هذا الدليل مبلغ نموذجي: يجب أن يوافق الرقم المساهمات الحقيقية والنص الجاري للقانون الذي يحكم الشكل المختار. يُعاد قراءة هذا النص في الجريدة الرسمية وعلى بوابة عدالة، بدل تكرار رقم قُرأ في منتدى. ويفصل [دليل تكلفة التأسيس](guides/cout-creation-societe-maroc) الأتعاب والمصاريف التي تطلبها الهيئات ورأس المال. ودمجها يمنع مقارنة عرضين.'
          ),
          t(
            'Une signature faite en France n’a pas, par elle-même, la forme que chaque destinataire marocain accepte. Selon le document et l’organisme, une traduction, une légalisation ou une apostille peut être demandée. Aucune de ces formes n’est universelle, et ce guide ne dit pas laquelle sera exigée dans votre cas. Le [guide procuration et légalisation](guides/procuration-creation-etranger) explique comment borner la question. Faites confirmer la forme avant de prendre rendez-vous dans un consulat, une mairie ou chez un notaire en France. Recommencer une légalisation parce que le destinataire attendait une autre mention coûte du temps, sans qu’un délai de rattrapage puisse être annoncé ici.',
            'A signature made in France does not, by itself, have the form that every Moroccan recipient accepts. Depending on the document and the body, a translation, a legalisation or an apostille may be required. None of these forms is universal, and this guide does not say which one will be required in your case. The [power of attorney and legalisation guide](guides/procuration-creation-etranger) explains how to bound the question. Have the form confirmed before you book an appointment at a consulate, a town hall or a notary in France. Redoing a legalisation because the recipient expected different wording costs time, and no catch-up deadline can be stated here.',
            'التوقيع المنجز في فرنسا ليست له، بذاته، الصيغة التي يقبلها كل مخاطب مغربي. فحسب الوثيقة والجهة، قد تُطلب ترجمة أو تصديق أو أبوستيل. وليست أي صيغة منها عامة، ولا يقول هذا الدليل أيها سيُطلب في حالتكم. ويشرح [دليل الوكالة والتصديق](guides/procuration-creation-etranger) كيف تُحصر المسألة. أكّدوا الصيغة قبل حجز موعد في قنصلية أو بلدية أو عند موثق في فرنسا. وإعادة التصديق لأن الجهة كانت تنتظر عبارة أخرى تكلف وقتاً، ولا يمكن هنا إعلان أجل استدراك.'
          )
        ]
      },
      {
        heading:t('Une procuration ne couvre que les actes qu’elle énumère', 'A power of attorney covers only the acts it lists', 'لا تغطي الوكالة إلا الأعمال التي تعدّدها'),
        paragraphs:[
          t(
            'Si vous ne vous déplacez pas pour chaque signature, une procuration peut permettre à une personne au Maroc d’accomplir des actes nommés : déposer un dossier, retirer un document, signer un formulaire précis. Écrivez ces actes. Un texte vague, du type « faire le nécessaire », est souvent inutile. Un texte trop étroit bloque l’étape d’après, par exemple le retrait d’un certificat alors que seule la signature des statuts était visée. Une procuration rédigée pour constituer la société ne vaut pas procuration bancaire. La banque lit son propre texte.',
            'If you do not travel for every signature, a power of attorney can allow a person in Morocco to carry out named acts: file a dossier, collect a document, sign a specific form. Write those acts down. Vague wording, of the “do what is necessary” kind, is often useless. Wording that is too narrow blocks the next step, for example collecting a certificate when only the signature of the articles was covered. A power of attorney drawn up to form the company is not a banking power of attorney. The bank reads its own text.',
            'إذا لم تسافروا لكل توقيع، قد تمكّن وكالة شخصاً في المغرب من إنجاز أعمال مسماة: إيداع ملف، سحب وثيقة، توقيع استمارة محددة. اكتبوا هذه الأعمال. والصياغة الفضفاضة، من نوع «القيام باللازم»، غالباً بلا فائدة. والصياغة الضيقة جداً تعطل الخطوة التالية، مثل سحب شهادة بينما لم تُذكر إلا توقيع النظام. والوكالة المحررة لتأسيس الشركة ليست وكالة بنكية. فالبنك يقرأ نصه هو.'
          ),
          t(
            'L’accompagnement à distance ne garantit pas l’absence de déplacement. Certaines signatures et certains rendez-vous bancaires exigent encore la personne concernée. Demandez deux confirmations séparées, une pour l’immatriculation et une pour la banque, avant d’annoncer à vos associés que « tout se fait en ligne ». Felexia Conseils ne choisit pas l’établissement bancaire et n’affiche aucun partenaire. Le [guide du compte professionnel](guides/compte-bancaire-mre) rappelle que l’ouverture, le refus ou les conditions appartiennent à la banque.',
            'Remote support does not guarantee that no travel will be needed. Some signatures and some bank appointments still require the person concerned. Ask for two separate confirmations, one for registration and one for the bank, before you tell your shareholders that “everything is done online”. Felexia Conseils does not choose the bank and displays no partner. The [business-account guide](guides/compte-bancaire-mre) recalls that opening, refusal or the conditions belong to the bank.',
            'المواكبة عن بُعد لا تضمن عدم السفر. فما زالت بعض التوقيعات وبعض المواعيد البنكية تشترط الشخص المعني. اطلبوا تأكيدين منفصلين، واحداً للتسجيل وواحداً للبنك، قبل أن تعلنوا لشركائكم أن «كل شيء يتم عبر الإنترنت». ولا يختار Felexia Conseils المؤسسة البنكية ولا يعرض أي شريك. ويذكّر [دليل الحساب المهني](guides/compte-bancaire-mre) بأن الفتح أو الرفض أو الشروط تخص البنك.'
          )
        ]
      },
      {
        heading:t('Les fonds envoyés depuis la France', 'Funds sent from France', 'الأموال المرسلة من فرنسا'),
        paragraphs:[
          t(
            'L’ouverture du compte de la société est une décision de la banque. Elle demande en général les identités, les documents de constitution et une description de l’activité. Pour une personne qui ne réside pas au Maroc, elle peut aussi demander des éléments sur la résidence et sur l’origine des fonds. La liste exacte est celle de l’établissement, pas une liste fermée publiée ici. Préparez ces explications avant le rendez-vous, dans l’ordre : qui apporte, depuis quel compte, pour quel usage dans la société.',
            'Opening the company’s account is the bank’s decision. It generally asks for identities, incorporation documents and a description of the activity. For a person who does not live in Morocco, it may also ask for information on residence and on the source of funds. The exact list is the institution’s, not a closed list published here. Prepare those explanations before the appointment, in this order: who contributes, from which account, for which use in the company.',
            'فتح حساب الشركة قرار للبنك. وهو يطلب في الغالب الهويات ووثائق التأسيس ووصفاً للنشاط. وللشخص الذي لا يقيم في المغرب، قد يطلب أيضاً عناصر عن الإقامة وعن مصدر الأموال. واللائحة الدقيقة هي لائحة المؤسسة، لا لائحة مغلقة منشورة هنا. حضّروا هذه الشروح قبل الموعد، بهذا الترتيب: من يساهم، ومن أي حساب، ولأي استعمال في الشركة.'
          ),
          t(
            'L’Office des Changes publie le régime applicable à certains investissements financés en devises. Lire ce régime ne crée pas un virement automatique, ni un droit de ressortir plus tard des dividendes ou un boni de liquidation sans les pièces demandées au moment voulu. Conservez, dès le premier envoi, les relevés et les références qui relient l’argent venu de France à l’apport ou au compte de la société. Sans cette trace, une opération pourtant réelle devient difficile à expliquer, à la banque comme à l’Office. Ce guide ne décrit pas un circuit de transfert et ne cite aucun plafond.',
            'The Foreign Exchange Office publishes the regime that applies to some investments financed in foreign currency. Reading that regime does not create an automatic transfer, nor a right to take dividends or a liquidation surplus out later without the documents required at the time. From the first transfer, keep the statements and references that link the money coming from France to the contribution or to the company’s account. Without that trail, an operation that really happened becomes hard to explain, to the bank as well as to the Office. This guide does not describe a transfer circuit and cites no ceiling.',
            'ينشر مكتب الصرف النظام المطبق على بعض الاستثمارات الممولة بالعملة. وقراءة هذا النظام لا تنشئ تحويلاً تلقائياً، ولا حقاً في إخراج أرباح أو فائض تصفية لاحقاً دون الوثائق المطلوبة في حينه. واحتفظوا، منذ أول إرسال، بالكشوف والمراجع التي تربط المال الآتي من فرنسا بالمساهمة أو بحساب الشركة. ومن دون هذا الأثر، تصبح عملية وقعت فعلاً صعبة الشرح، للبنك كما لمكتب الصرف. ولا يصف هذا الدليل مساراً للتحويل ولا يذكر أي سقف.'
          )
        ]
      },
      {
        heading:t('Ce que l’immatriculation ne règle pas', 'What registration does not settle', 'ما لا يحسمه التسجيل'),
        paragraphs:[
          t(
            'L’immatriculation au registre du commerce constate la société. Elle ne remplace pas l’identifiant commun de l’entreprise, l’affiliation à la CNSS lorsque la société a des salariés, les déclarations liées à l’activité, ni la tenue d’une comptabilité. Chacun de ces sujets a son organisme et, si vous les confiez à un cabinet, sa mission. Le [guide DirectEntreprise](guides/creation-direct-entreprise) rappelle que le téléservice de l’OMPIC est le canal administratif, distinct de la préparation du dossier. Déposer en ligne peut encore exiger une signature, une procuration ou un complément.',
            'Registration in the trade register records the company. It does not replace the common company identifier, affiliation to the CNSS when the company has employees, the filings tied to the activity, or keeping accounts. Each of those subjects has its own body and, if you entrust them to a firm, its own engagement. The [DirectEntreprise guide](guides/creation-direct-entreprise) recalls that OMPIC’s portal is the administrative channel, separate from preparing the file. Filing online can still require a signature, a power of attorney or an additional document.',
            'التسجيل في السجل التجاري يُثبت الشركة. وهو لا يعوّض المعرف الموحد للمقاولة، ولا الانخراط في الصندوق الوطني للضمان الاجتماعي عندما يكون للشركة أجراء، ولا التصاريح المرتبطة بالنشاط، ولا مسك المحاسبة. ولكل موضوع جهته، وإذا عهدتم به إلى مكتب، مهمته. ويذكّر [دليل DirectEntreprise](guides/creation-direct-entreprise) بأن شباك OMPIC قناة إدارية، مستقلة عن تحضير الملف. وقد يتطلب الإيداع الإلكتروني توقيعاً أو وكالة أو تكملة.'
          ),
          t(
            'Si une société française reste associée, prévoyez dans les statuts qui convoque, qui signe les comptes et comment une décision remonte vers la France. Découvrir cette question au premier exercice, alors que les associés ne sont pas dans le même pays, ralentit une opération qui aurait pu être écrite. Ce guide ne rédige pas un pacte. Il évite seulement de croire que les statuts déposés ont tout dit. Pour la suite, la page [création d’entreprise](creation-entreprise) sert à demander un cadrage, et la page [contact](contact) à obtenir une proposition. La demande de devis n’est ni une commande ni un paiement.',
            'If a French company remains a shareholder, provide in the articles who calls meetings, who signs the accounts and how a decision travels back to France. Discovering that question in the first financial year, when the shareholders are not in the same country, slows an operation that could have been written down. This guide does not draft a shareholders’ agreement. It only avoids the belief that the filed articles have said everything. For what comes next, the [company formation](creation-entreprise) page is where you ask for a scoping, and the [contact](contact) page is where you obtain a proposal. A quote request is neither an order nor a payment.',
            'إذا بقيت شركة فرنسية شريكة، بيّنوا في النظام من يدعو الاجتماعات، ومن يوقّع الحسابات، وكيف يصعد قرار إلى فرنسا. واكتشاف هذا السؤال في أول سنة محاسبية، والشركاء ليسوا في البلد نفسه، يبطئ عملية كان يمكن كتابتها. ولا يحرر هذا الدليل اتفاقاً بين الشركاء. وهو يمنع فقط الاعتقاد أن النظام المودع قال كل شيء. ولما يلي، صفحة [تأسيس المقاولة](creation-entreprise) مكان طلب التأطير، وصفحة [الاتصال](contact) مكان الحصول على عرض. وطلب التسعيرة ليس طلبية ولا أداءً.'
          )
        ]
      },
      {
        heading:t('Les erreurs qui font reprendre le dossier', 'The mistakes that send the file back', 'الأخطاء التي تعيد الملف'),
        paragraphs:[
          t(
            'La plupart des reprises ne viennent pas d’un texte obscur. Elles viennent d’un décalage entre ce qui a été signé en France et ce que le dossier marocain doit montrer. Avant d’envoyer des originaux, relisez la liste qui suit avec la personne qui tient les pièces. Une seule discordance de nom, d’adresse ou de signataire suffit souvent à écarter un formulaire.',
            'Most files are sent back not because of an obscure statute, but because of a gap between what was signed in France and what the Moroccan file has to show. Before you send originals, read the list below with the person who holds the documents. A single mismatch of name, address or signatory is often enough to set a form aside.',
            'معظم الإرجاعات لا تأتي من نص غامض. بل من فرق بين ما وُقّع في فرنسا وما يجب أن يُظهره الملف المغربي. وقبل إرسال الأصول، أعيدوا قراءة اللائحة أدناه مع الشخص الذي يمسك الوثائق. وغالباً يكفي اختلاف واحد في الاسم أو العنوان أو الموقّع لإبعاد استمارة.'
          )
        ],
        list:t(
          [
            'Signer des statuts sur un nom qui ne copie pas le certificat négatif, ou sur un certificat déjà expiré.',
            'Indiquer comme siège l’adresse d’un proche, sans titre et sans accord écrit.',
            'Confondre le capital, les honoraires du cabinet et les frais demandés par les organismes.',
            'Utiliser une procuration rédigée pour un autre pays, pour une banque, ou pour des actes qu’elle ne liste pas.',
            'Décrire un objet recopié sur une société française, éloigné de l’activité réelle au Maroc.',
            'Annoncer aux associés que rien n’exigera de déplacement, y compris la banque.',
            'Envoyer des fonds sans garder la trace qui les relie à l’apport ou au compte de la société.',
            'Oublier qu’une société française associée doit produire ses propres pièces, dans la forme demandée.'
          ],
          [
            'Signing articles on a name that does not copy the negative certificate, or on a certificate that has already expired.',
            'Stating a relative’s address as the office, with no title and no written agreement.',
            'Mixing up capital, the firm’s fees and the charges asked by public bodies.',
            'Using a power of attorney drawn up for another country, for a bank, or for acts it does not list.',
            'Describing a purpose copied from a French company, far from the real activity in Morocco.',
            'Telling the shareholders that nothing will require travel, including the bank.',
            'Sending funds without keeping the trail that links them to the contribution or to the company’s account.',
            'Forgetting that a French company which is a shareholder must produce its own documents, in the form required.'
          ],
          [
            'توقيع نظام على اسم لا يطابق الشهادة السلبية، أو على شهادة انتهت صلاحيتها.',
            'ذكر عنوان قريب كمقر، بلا سند وبلا موافقة مكتوبة.',
            'الخلط بين رأس المال وأتعاب المكتب والمصاريف التي تطلبها الهيئات.',
            'استعمال وكالة محررة لبلد آخر أو لبنك أو لأعمال لا تعدّدها.',
            'وصف غرض منسوخ من شركة فرنسية، بعيد عن النشاط الحقيقي في المغرب.',
            'إخبار الشركاء بأن لا شيء سيتطلب سفراً، بما في ذلك البنك.',
            'إرسال أموال دون حفظ الأثر الذي يربطها بالمساهمة أو بحساب الشركة.',
            'نسيان أن الشركة الفرنسية الشريكة يجب أن تقدم وثائقها، بالصيغة المطلوبة.'
          ]
        )
      }
    ],
    faqs:[
      {q:t('Une société française peut-elle être associée d’une société marocaine ?', 'Can a French company be a shareholder of a Moroccan company?', 'هل يمكن لشركة فرنسية أن تكون شريكة في شركة مغربية؟'), a:t('Oui, si la forme choisie l’admet et si les pièces de la société française sont produites dans la forme demandée par le destinataire. Ce n’est pas la même opération qu’une création entre personnes physiques. Les effets fiscaux de la détention se lisent dans le Code général des impôts et, lorsqu’elle s’applique, dans la convention fiscale. Ce guide ne fixe aucun taux : faites vérifier le schéma auprès d’un professionnel.', 'Yes, if the form you chose allows it and if the French company’s documents are produced in the form the recipient requires. It is not the same operation as a formation between individuals. The tax effects of the holding are read in the General Tax Code and, where it applies, in the tax treaty. This guide sets no rate: have the structure checked by a professional.', 'نعم، إذا كان الشكل المختار يقبل ذلك وإذا قُدمت وثائق الشركة الفرنسية بالصيغة التي تطلبها الجهة. وهذه ليست العملية نفسها كتأسيس بين أشخاص ذاتيين. وتُقرأ الآثار الضريبية للحيازة في المدونة العامة للضرائب، وعند انطباقها، في الاتفاقية الجبائية. ولا يحدد هذا الدليل أي سعر: تحققوا من الهيكل لدى مهني.')},
      {q:t('Faut-il venir à Marrakech pour créer la société ?', 'Do you have to come to Marrakech to form the company?', 'هل يجب المجيء إلى مراكش لتأسيس الشركة؟'), a:t('Pas pour chaque étape. Le dossier peut être préparé à distance. Une signature ou un rendez-vous bancaire peut encore exiger un déplacement. On le confirme avant de l’annoncer, séparément pour l’immatriculation et pour la banque.', 'Not for every step. The file can be prepared remotely. A signature or a bank appointment may still require travel. That is confirmed before it is announced, separately for registration and for the bank.', 'ليس لكل مرحلة. يمكن تحضير الملف عن بُعد. وقد يتطلب توقيع أو موعد بنكي سفراً. ويُؤكد ذلك قبل الإعلان عنه، بشكل منفصل للتسجيل وللبنك.')},
      {q:t('Un délai de création est-il garanti depuis la France ?', 'Is a formation timeline guaranteed from France?', 'هل أجل التأسيس مضمون من فرنسا؟'), a:t('Non. Le calendrier dépend des pièces, de la forme des actes signés hors du Maroc, et des organismes. Il se discute après lecture du dossier. Aucun délai n’est publié ici.', 'No. The schedule depends on the documents, on the form of the deeds signed outside Morocco, and on the bodies involved. It is discussed after the file is read. No timeline is published here.', 'لا. يتوقف الجدول على الوثائق وصيغة العقود الموقعة خارج المغرب والجهات. ويُناقش بعد قراءة الملف. ولا يُنشر هنا أي أجل.')},
      {q:t('Peut-on commencer par le statut d’auto-entrepreneur depuis la France ?', 'Can you start with auto-entrepreneur status from France?', 'هل يمكن البدء بوضع المقاول الذاتي من فرنسا؟'), a:t('Seulement si vous remplissez les conditions publiées sur le portail officiel de l’auto-entrepreneur. Résider en France peut être incompatible avec ce statut. Vérifiez-le avant toute demande. Une société reste la voie lorsque le projet doit avoir une personnalité morale distincte ou plusieurs associés.', 'Only if you meet the conditions published on the official auto-entrepreneur portal. Living in France may be incompatible with that status. Check it before any application. A company remains the path when the project needs a separate legal personality or several shareholders.', 'فقط إذا استوفيتم الشروط المنشورة في البوابة الرسمية للمقاول الذاتي. وقد لا يتوافق الإقامة في فرنسا مع هذا الوضع. تحققوا من ذلك قبل أي طلب. وتبقى الشركة هي المسار عندما يحتاج المشروع إلى شخصية معنوية مستقلة أو إلى عدة شركاء.')}
    ],
    links:[
      link('guides/mre-etranger', 'Créer depuis l’étranger', 'Start from abroad', 'التأسيس من الخارج'),
      link('guides/procuration-creation-etranger', 'Procuration et légalisation', 'Power of attorney and legalisation', 'الوكالة والتصديق'),
      link('guides/choisir-sarl-ou-sarl-au', 'SARL ou SARL AU', 'SARL or single-member SARL', 'SARL أو SARL AU'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('formes-juridiques', 'Formes juridiques', 'Legal forms', 'الأشكال القانونية'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('domiciliation', 'Domiciliation', 'Domiciliation', 'التوطين'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:official
  }
];
