const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const lawSources = [
  src('Loi n° 5-96 relative à la SARL, au Bulletin officiel', 'Law 5-96 on the SARL, in the Official Gazette', 'القانون رقم 5-96 المتعلق بشركة ذات المسؤولية المحدودة، في الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Loi n° 17-95 relative à la société anonyme, au Bulletin officiel', 'Law 17-95 on the public limited company, in the Official Gazette', 'القانون رقم 17-95 المتعلق بشركة المساهمة، في الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Portail Adala, textes consolidés à vérifier', 'Adala portal, consolidated texts to check', 'بوابة عدالة، نصوص مجمعة يجب التحقق منها', 'https://adala.justice.gov.ma/'),
  src('OMPIC', 'OMPIC', 'المكتب المغربي للملكية الصناعية والتجارية', 'https://www.ompic.ma/'),
  src('Code général des impôts, Direction générale des impôts', 'General Tax Code, General Tax Directorate', 'المدونة العامة للضرائب، المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/')
];

export const lot1c = [
  {
    slug:'capital-social-maroc-quel-montant',
    category:t('Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
    title:t(
      'Capital social au Maroc : quel montant choisir',
      'Share capital in Morocco: how to choose the amount',
      'رأس المال بالمغرب: أي مبلغ تختارون'
    ),
    description:t(
      'Le capital est le montant des apports, pas le prix de la création. Aucun montant type n’est publié ici : il se lit dans la loi de la forme choisie et doit correspondre aux apports réels.',
      'Capital is the amount of the contributions, not the price of formation. No standard amount is published here: it is read in the law of the form you chose and must match the real contributions.',
      'رأس المال هو مبلغ المساهمات، لا ثمن التأسيس. ولا يُنشر هنا مبلغ نموذجي: يُقرأ في قانون الشكل المختار ويجب أن يوافق المساهمات الحقيقية.'
    ),
    fiscal:true,
    sections:[
      {
        heading:t('Le capital n’est pas une facture', 'Capital is not an invoice', 'رأس المال ليس فاتورة'),
        paragraphs:[
          t(
            'Quand on demande « quel capital choisir », la réponse attendue est souvent un chiffre rond. Ce guide n’en donne pas. Publier un montant type serait inexact : le texte applicable dépend de la forme, il a pu être modifié par une loi postérieure, et le chiffre utile est celui des apports que vous pouvez réellement libérer. Le capital figure dans les statuts. Il n’est pas un honoraire de cabinet, ni un droit d’enregistrement recopié ici, ni la trésorerie dont l’activité aura besoin le deuxième mois.',
            'When people ask “what capital should we choose”, the expected answer is often a round figure. This guide does not give one. Publishing a standard amount would be inaccurate: the applicable text depends on the form, it may have been amended by a later law, and the useful figure is the contributions you can actually pay in. Capital appears in the articles. It is not a firm’s fee, nor a registration duty copied here, nor the cash the activity will need in the second month.',
            'حين يُسأل «أي رأس مال نختار»، يكون الجواب المنتظر غالباً رقماً مدوراً. ولا يعطي هذا الدليل رقماً. فنشر مبلغ نموذجي سيكون غير دقيق: النص المطبق يتوقف على الشكل، وقد عدّله قانون لاحق، والرقم المفيد هو المساهمات التي تستطيعون تحريرها فعلاً. ويظهر رأس المال في النظام. وهو ليس أتعاب مكتب، ولا رسم تسجيل منسوخاً هنا، ولا الخزينة التي سيحتاجها النشاط في الشهر الثاني.'
          ),
          t(
            'Le [guide du coût d’une création](guides/cout-creation-societe-maroc) sépare déjà trois masses : honoraires, frais demandés par les organismes, et argent qui appartient à la société. Cette page ne reprend que la troisième. Pour une SARL, la loi de référence est la loi n° 5-96. Pour une société anonyme, c’est la loi n° 17-95. Lisez le texte en vigueur au Bulletin officiel ou sur le portail Adala au moment de la rédaction, y compris les modifications. Ne reprenez pas un minimum lu dans un article ancien, ni un montant « que tout le monde met » à Marrakech ou ailleurs. La page [formes juridiques](formes-juridiques) aide à choisir la forme avant de figer le chiffre.',
            'The [guide to the cost of formation](guides/cout-creation-societe-maroc) already separates three amounts: fees, charges asked by public bodies, and money that belongs to the company. This page takes up only the third. For a SARL, the reference statute is Law 5-96. For a public limited company, it is Law 17-95. Read the text in force in the Official Gazette or on the Adala portal when you draft, including amendments. Do not repeat a minimum read in an old article, nor an amount “everyone uses” in Marrakech or elsewhere. The [legal forms](formes-juridiques) page helps you choose the form before the figure is fixed.',
            'يفصل [دليل تكلفة التأسيس](guides/cout-creation-societe-maroc) سلفاً ثلاث كتل: الأتعاب، والمصاريف التي تطلبها الهيئات، والمال الذي يخص الشركة. ولا تتناول هذه الصفحة إلا الثالثة. وبالنسبة إلى SARL، قانون المرجع هو القانون رقم 5-96. وبالنسبة إلى شركة المساهمة، القانون رقم 17-95. اقرأوا النص الجاري في الجريدة الرسمية أو على بوابة عدالة وقت الصياغة، بما فيه التعديلات. ولا تعيدوا حداً أدنى قُرأ في مقال قديم، ولا مبلغاً «يضعه الجميع» بمراكش أو في غيرها. وتساعد صفحة [الأشكال القانونية](formes-juridiques) على اختيار الشكل قبل تثبيت الرقم.'
          )
        ]
      },
      {
        heading:t('Ce que le capital dit aux tiers', 'What capital says to third parties', 'ما يقوله رأس المال للغير'),
        paragraphs:[
          t(
            'Le capital annoncé dans les statuts est une information. Il dit aux associés quelle part chacun détient, et il dit aux tiers qu’un certain montant d’apports a été prévu. Il ne garantit pas que ce montant est encore en caisse le jour où un fournisseur cherche un responsable. L’argent, une fois libéré, sert à l’activité : il paie un loyer, un stock, un salaire. La responsabilité limitée, dans une SARL, borne en principe la poursuite des associés au montant de leurs apports. Elle ne supprime pas une garantie personnelle qu’une banque peut demander à part, ni la responsabilité propre du gérant lorsqu’elle est engagée.',
            'The capital stated in the articles is a piece of information. It tells the shareholders what share each one holds, and it tells third parties that a certain amount of contributions was planned. It does not guarantee that this amount is still in the account on the day a supplier looks for someone to answer. Once paid in, the money serves the activity: it pays rent, stock, a wage. Limited liability, in a SARL, in principle limits claims against the shareholders to the amount of their contributions. It does not remove a personal guarantee a bank may ask for separately, nor the manager’s own liability when it is incurred.',
            'رأس المال المعلن في النظام معلومة. وهو يقول للشركاء أي حصة يملك كل واحد، ويقول للغير إن مبلغاً معيناً من المساهمات كان مقرراً. وهو لا يضمن أن هذا المبلغ ما زال في الصندوق يوم يبحث مزود عن مسؤول. والمال، بعد تحريره، يخدم النشاط: يؤدي كراء أو مخزوناً أو أجراً. والمسؤولية المحدودة، في SARL، تحد من حيث المبدأ مطالبة الشركاء في مبلغ مساهماتهم. وهي لا تلغي ضماناً شخصياً قد يطلبه البنك على حدة، ولا مسؤولية المسيّر الخاصة حين تنشأ.'
          ),
          t(
            'Choisissez donc un montant que vous pouvez expliquer. Un capital élevé sans argent correspondant est une affirmation fausse. Un capital très bas, alors que l’activité exige des achats immédiats, oblige à financer autrement : compte courant d’associé, crédit, ou nouveaux apports. Chacune de ces voies a ses écritures et, pour certaines, des effets fiscaux que ce guide ne résume pas par un barème. Le [guide pour créer une SARL](guides/creer-une-sarl-maroc) rappelle le cadre de la forme. Le montant, lui, reste le vôtre.',
            'Choose an amount you can explain. High capital with no matching money is a false statement. Very low capital, when the activity needs immediate purchases, forces you to finance another way: a shareholder current account, a loan, or further contributions. Each of those paths has its entries and, for some, tax effects that this guide does not summarise in a scale. The [guide to forming a SARL](guides/creer-une-sarl-maroc) recalls the frame of the form. The amount remains yours.',
            'اختاروا إذن مبلغاً تستطيعون شرحه. فرأس المال المرتفع بلا مال يقابله تصريح كاذب. ورأس المال المنخفض جداً، حين يحتاج النشاط إلى مشتريات فورية، يفرض تمويلاً بطريقة أخرى: حساب جار للشريك، أو قرض، أو مساهمات جديدة. ولكل مسار قيوده، ولبعضها آثار ضريبية لا يلخصها هذا الدليل في تعريفة. ويذكّر [دليل تأسيس SARL](guides/creer-une-sarl-maroc) بإطار الشكل. ويبقى المبلغ ملككم.'
          )
        ]
      },
      {
        heading:t('Numéraire, nature et libération', 'Cash, kind and paying-in', 'النقد والعين والتحرير'),
        paragraphs:[
          t(
            'Un apport en numéraire est une somme d’argent. Un apport en nature est un bien : matériel, véhicule, fonds, droit. Les deux peuvent composer le capital si la loi de la forme et les statuts les admettent. L’apport en nature se décrit avec assez de précision pour qu’on sache ce qui entre dans le patrimoine de la société. Il ne se résume pas à une phrase du type « matériel de bureau ». Lorsque la loi exige une évaluation ou un contrôle, suivez ce texte. Ce guide n’invente pas le seuil à partir duquel cette formalité s’applique : il se lit dans la loi en vigueur.',
            'A cash contribution is a sum of money. A contribution in kind is an asset: equipment, a vehicle, a business, a right. Both can make up the capital if the law of the form and the articles allow them. A contribution in kind is described precisely enough that one knows what enters the company’s estate. It is not summed up in a phrase such as “office equipment”. When the law requires a valuation or a review, follow that text. This guide does not invent the threshold from which that formality applies: it is read in the law in force.',
            'المساهمة النقدية مبلغ من المال. والمساهمة العينية مال: معدات أو عربة أو أصل تجاري أو حق. ويمكن أن تكوّنا رأس المال إذا قبلهما قانون الشكل والنظام. وتُوصف المساهمة العينية بدقة كافية ليُعرف ما يدخل في ذمة الشركة. ولا تُختصر في عبارة من نوع «معدات مكتب». وحين يفرض القانون تقييماً أو مراقبة، اتبعوا ذلك النص. ولا يخترع هذا الدليل السقف الذي منه تطبق هذه الشكلية: يُقرأ في القانون الجاري.'
          ),
          t(
            'Libérer, c’est remettre à la société ce qui a été promis. La loi de la forme peut distinguer ce qui est libéré à la constitution et ce qui peut l’être plus tard. Ne recopiez pas ici un pourcentage de mémoire. Vérifiez-le dans le texte, puis écrivez dans les statuts le calendrier que vous pouvez tenir. Une promesse de libération que personne ne financera est un défaut dès le départ. Si l’argent vient de l’étranger, conservez la trace qui le relie à l’apporteur. L’Office des Changes publie le régime de certains financements en devises. Cette publication ne fixe pas le montant de votre capital.',
            'Paying in means handing the company what was promised. The law of the form may distinguish what is paid in at formation and what may be paid in later. Do not copy a percentage from memory here. Check it in the text, then write in the articles a timetable you can keep. A promise to pay in that nobody will fund is a defect from the start. If the money comes from abroad, keep the trail that links it to the contributor. The Foreign Exchange Office publishes the regime of some financing in foreign currency. That publication does not set the amount of your capital.',
            'التحرير هو تسليم الشركة ما وُعد به. وقد يميز قانون الشكل بين ما يُحرر عند التأسيس وما يمكن تحريره لاحقاً. ولا تنسخوا هنا نسبة من الذاكرة. تحققوا منها في النص، ثم اكتبوا في النظام جدولاً تستطيعون الوفاء به. ووعد تحرير لن يموله أحد عيب منذ البداية. وإذا أتى المال من الخارج، فاحتفظوا بالأثر الذي يربطه بالمساهم. وينشر مكتب الصرف نظام بعض التمويلات بالعملة. وهذا النشر لا يحدد مبلغ رأس مالكم.'
          )
        ]
      },
      {
        heading:t('Un montant trop bas ou trop haut, sans barème', 'An amount too low or too high, with no scale', 'مبلغ منخفض جداً أو مرتفع جداً، بلا تعريفة'),
        paragraphs:[
          t(
            'Posez trois questions, dans cet ordre. De quoi l’activité a-t-elle besoin avant d’encaisser ses premières factures : dépôt de garantie, stock, outil, salaire. Quelle part de ce besoin est un apport qui reste dans la société, et quelle part est une dépense. Qui, parmi les associés, peut verser sa quote-part sans emprunter à un tiers qu’il ne pourra pas nommer. Le capital répond à la deuxième question. Il n’a pas à égaler tout le besoin de trésorerie, et il ne peut pas être inférieur à ce que la loi de la forme impose si elle impose un plancher. Ce plancher, s’il existe pour votre forme, se lit dans le texte, pas dans ce guide.',
            'Ask three questions, in this order. What does the activity need before it collects its first invoices: a security deposit, stock, a tool, a wage. What share of that need is a contribution that stays in the company, and what share is an expense. Which of the shareholders can pay their portion without borrowing from a third party they will not be able to name. Capital answers the second question. It does not have to equal the whole cash need, and it cannot be below what the law of the form requires if that law sets a floor. That floor, if it exists for your form, is read in the text, not in this guide.',
            'اطرحوا ثلاثة أسئلة، بهذا الترتيب. ماذا يحتاج النشاط قبل قبض فواتيره الأولى: ضمانة، مخزون، أداة، أجر. وأي جزء من هذه الحاجة مساهمة تبقى في الشركة، وأي جزء مصروف. ومن بين الشركاء يستطيع أداء حصته دون الاقتراض من غير لن يستطيع تسميته. ويجيب رأس المال عن السؤال الثاني. وليس عليه أن يساوي كل الحاجة من الخزينة، ولا يمكن أن ينزل تحت ما يفرضه قانون الشكل إذا فرض حداً أدنى. وهذا الحد، إن وُجد لشكلكم، يُقرأ في النص، لا في هذا الدليل.'
          ),
          t(
            'Un capital très haut a aussi un coût d’opportunité : l’argent est immobilisé dans la société. Le sortir plus tard, par une réduction ou une distribution, est une opération propre, avec une décision et, le cas échéant, des effets fiscaux. Ne gonflez pas le capital pour « faire sérieux » si vous aurez besoin de récupérer les fonds à court terme. Ne le réduisez pas non plus au plus petit nombre que vous avez entendu, si ce nombre ne finance rien et si la banque vous demandera de toute façon une garantie personnelle. La banque ne publie pas de capital minimum sur ce site. Elle apprécie le dossier.',
            'Very high capital also has an opportunity cost: the money is tied up in the company. Taking it out later, by a reduction or a distribution, is its own operation, with a decision and, where relevant, tax effects. Do not inflate the capital to “look serious” if you will need the funds back in the short term. Do not cut it to the smallest number you have heard, either, if that number funds nothing and the bank will ask for a personal guarantee anyway. The bank does not publish a minimum capital on this website. It assesses the file.',
            'ولرأس المال المرتفع جداً أيضاً تكلفة فرصة: المال محبوس في الشركة. وإخراجه لاحقاً، بتخفيض أو توزيع، عملية قائمة بذاتها، بقرار، وعند الاقتضاء، بآثار ضريبية. ولا تضخّموا رأس المال «لتبدوا جديين» إذا ستحتاجون إلى استرجاع الأموال في الأجل القصير. ولا تخفضوه أيضاً إلى أصغر عدد سمعتموه، إذا كان هذا العدد لا يمول شيئاً وإذا كان البنك سيطلب على كل حال ضماناً شخصياً. والبنك لا ينشر رأس مال أدنى على هذا الموقع. فهو يقدر الملف.'
          )
        ]
      },
      {
        heading:t('Parts, égalité et associés qui n’apportent pas la même chose', 'Shares, equality and shareholders who do not contribute the same thing', 'الحصص والمساواة والشركاء الذين لا يساهمون بالشيء نفسه'),
        paragraphs:[
          t(
            'La répartition des parts suit les apports, sauf arrangement écrit qui reste fidèle à la loi. Deux associés qui veulent « être à moitié » alors que l’un seul verse l’argent doivent dire ce que l’autre apporte : travail, clientèle, bien. Un apport en industrie, lorsqu’il est admis, ne se confond pas avec un salaire. S’il n’est pas admis dans votre forme, ne l’écrivez pas comme s’il créait des parts. Le désaccord sur ce point, laissé oral, est une source classique de conflit au premier exercice. Le pacte d’associés peut préciser la relation. Il ne remplace pas le montant inscrit dans les statuts.',
            'The allocation of shares follows the contributions, unless a written arrangement stays faithful to the law. Two shareholders who want to be “equal” when only one pays the money must say what the other contributes: work, clients, an asset. A contribution of work, where it is allowed, is not the same as a wage. If it is not allowed in your form, do not write it as if it created shares. Disagreement on this point, left oral, is a classic source of conflict in the first financial year. A shareholders’ agreement can clarify the relationship. It does not replace the amount written in the articles.',
            'يتبع توزيع الحصص المساهمات، إلا إذا بقي ترتيب مكتوب وفياً للقانون. والشريكات اللذان يريدان «المناصفة» بينما واحد فقط يدفع المال يجب أن يقولا ماذا يساهم به الآخر: عمل، زبناء، مال. والمساهمة بالصناعة، حين تُقبل، لا تختلط بأجر. وإذا لم تُقبل في شكلكم، فلا تكتبوها كما لو أنها تنشئ حصصاً. والخلاف في هذه النقطة، إذا بقي شفوياً، مصدر كلاسيكي للنزاع في أول سنة. ويمكن لاتفاق الشركاء أن يوضح العلاقة. وهو لا يعوّض المبلغ المكتوب في النظام.'
          ),
          t(
            'Si un associé est une société étrangère, ou un MRE qui verse depuis l’étranger, le montant en dirhams des statuts doit pouvoir être rapproché du virement. Écartez les écarts de change non expliqués. Le [guide depuis la France](guides/creer-societe-maroc-depuis-la-france) revient sur la trace des fonds. Le capital d’une filiale n’obéit pas à un barème du groupe : il obéit au droit marocain de la forme, puis à ce que l’activité marocaine consomme.',
            'If a shareholder is a foreign company, or a Moroccan abroad who pays from overseas, the dirham amount in the articles must be reconcilable with the transfer. Set aside unexplained exchange differences. The [guide from France](guides/creer-societe-maroc-depuis-la-france) returns to the trail of the funds. The capital of a subsidiary does not follow a group scale: it follows the Moroccan law of the form, then what the Moroccan activity consumes.',
            'إذا كان الشريك شركة أجنبية، أو مغربياً بالخارج يدفع من الخارج، وجب أن يُقرَّب مبلغ الدراهم في النظام من التحويل. واستبعدوا فروقات الصرف غير المشروحة. ويعود [الدليل من فرنسا](guides/creer-societe-maroc-depuis-la-france) إلى أثر الأموال. ورأس مال الشركة التابعة لا يخضع لتعريفة المجموعة: بل لقانون الشكل المغربي، ثم لما يستهلكه النشاط المغربي.'
          )
        ]
      },
      {
        heading:t('Changer le capital plus tard', 'Changing the capital later', 'تغيير رأس المال لاحقاً'),
        paragraphs:[
          t(
            'Augmenter ou réduire le capital est une modification. Elle part des statuts : qui décide, à quelle majorité, avec quel droit de préférence s’il existe. La page [modifier une société](modify-company) sert à décrire l’opération. Elle n’est pas un formulaire de l’OMPIC. Une augmentation par incorporation de compte courant, une augmentation en numéraire et une réduction ne sont pas le même dossier. Les effets fiscaux éventuels se vérifient sur l’opération, dans le Code général des impôts. Aucun régime de faveur n’est affirmé ici.',
            'Increasing or reducing capital is an amendment. It starts from the articles: who decides, by what majority, with what preference right if one exists. The [change a company](modify-company) page is where you describe the operation. It is not an OMPIC form. An increase by incorporating a current account, a cash increase and a reduction are not the same file. Any tax effects are checked on the operation, in the General Tax Code. No favourable regime is asserted here.',
            'زيادة رأس المال أو تخفيضه تعديل. وهو ينطلق من النظام: من يقرر، وبأي أغلبية، وبأي حق أفضلية إن وُجد. وصفحة [تعديل شركة](modify-company) مكان وصف العملية. وهي ليست استمارة OMPIC. والزيادة بإدماج حساب جار، والزيادة النقدية، والتخفيض ليست الملف نفسه. والآثار الضريبية المحتملة تُتحقق على العملية، في المدونة العامة للضرائب. ولا يُؤكد هنا أي نظام تفضيلي.'
          ),
          t(
            'Avant de signer les statuts initiaux, demandez-vous si le montant choisi survivra au premier contrat important. Le changer tout de suite après l’immatriculation est possible, mais c’est une seconde formalité. Mieux vaut un chiffre tenu qu’un chiffre symbolique corrigé le mois suivant. Pour faire écrire ce choix dans une proposition, utilisez la page [création d’entreprise](creation-entreprise) ou le [contact](contact). La demande de devis ne fixe pas le capital et ne vaut pas libération.',
            'Before you sign the initial articles, ask yourself whether the amount you chose will survive the first important contract. Changing it immediately after registration is possible, but it is a second formality. A figure you can stand by is better than a symbolic figure corrected the following month. To have this choice written into a proposal, use the [company formation](creation-entreprise) page or [contact](contact). A quote request does not set the capital and is not a payment-in.',
            'قبل توقيع النظام الأول، اسألوا أنفسكم هل يصمد المبلغ المختار أمام أول عقد مهم. وتغييره فور التسجيل ممكن، لكنه شكلية ثانية. ورقم يمكن الالتزام به أفضل من رقم رمزي يُصحح في الشهر التالي. ولإدخال هذا الاختيار في عرض، استعملوا صفحة [تأسيس المقاولة](creation-entreprise) أو [الاتصال](contact). وطلب التسعيرة لا يحدد رأس المال وليس تحريراً.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Pourquoi aucun montant en dirhams n’est-il indiqué ?', 'Why is no dirham amount stated?', 'لماذا لا يُذكر أي مبلغ بالدرهم؟'), a:t('Parce que le minimum éventuel dépend de la forme et du texte en vigueur, et parce que le montant utile dépend de vos apports réels. Un chiffre isolé sur cette page serait faux pour une partie des lecteurs.', 'Because any minimum depends on the form and on the text in force, and because the useful amount depends on your real contributions. A standalone figure on this page would be wrong for some readers.', 'لأن الحد الأدنى المحتمل يتوقف على الشكل والنص الجاري، ولأن المبلغ المفيد يتوقف على مساهماتكم الحقيقية. ورقم منفرد في هذه الصفحة سيكون خاطئاً لجزء من القراء.')},
      {q:t('Le capital doit-il rester sur le compte ?', 'Must the capital stay in the account?', 'هل يجب أن يبقى رأس المال في الحساب؟'), a:t('Une fois libéré, il appartient à la société et sert son activité. Il n’est pas un dépôt intangible que le gérant n’aurait pas le droit de dépenser pour l’objet social. Le sortir au profit d’un associé est une autre opération.', 'Once paid in, it belongs to the company and serves its activity. It is not an intangible deposit that the manager would not be allowed to spend for the corporate purpose. Taking it out for a shareholder is another operation.', 'بعد تحريره، يخص الشركة ويخدم نشاطها. وهو ليس وديعة جامدة لا يحق للمسيّر إنفاقها في الغرض الاجتماعي. وإخراجه لفائدة شريك عملية أخرى.')},
      {q:t('Un apport en nature évite-t-il de déposer de l’argent ?', 'Does a contribution in kind avoid paying in cash?', 'هل المساهمة العينية تغني عن إيداع المال؟'), a:t('Elle remplace l’argent à hauteur du bien réellement apporté et évalué comme la loi l’exige. Elle n’autorise pas à inscrire une valeur qui ne correspond pas au bien. La trésorerie, elle, peut manquer même si le capital en nature est élevé.', 'It replaces cash to the extent of the asset actually contributed and valued as the law requires. It does not allow you to enter a value that does not match the asset. Cash can still be short even if the capital in kind is high.', 'تعوّض المال في حدود المال المقدم فعلاً والمقيَّم كما يفرض القانون. وهي لا تجيز قيد قيمة لا تطابق المال. وقد تنقص الخزينة حتى لو كان رأس المال العيني مرتفعاً.')},
      {q:t('La banque impose-t-elle un capital ?', 'Does the bank impose a capital?', 'هل يفرض البنك رأس مال؟'), a:t('La banque peut refuser un compte ou demander une garantie. Elle ne fixe pas, à la place de la loi et des associés, le capital des statuts. Ses conditions se demandent à l’établissement, pas sur ce site.', 'The bank may refuse an account or ask for a guarantee. It does not set, in place of the law and the shareholders, the capital in the articles. Its conditions are asked of the institution, not of this website.', 'قد يرفض البنك حساباً أو يطلب ضماناً. وهو لا يحدد، بدلاً من القانون والشركاء، رأس مال النظام. وشروطه تُطلب من المؤسسة، لا من هذا الموقع.')}
    ],
    links:[
      link('guides/cout-creation-societe-maroc', 'Coût d’une création', 'Cost of formation', 'تكلفة التأسيس'),
      link('guides/creer-une-sarl-maroc', 'Créer une SARL', 'Form a SARL', 'تأسيس SARL'),
      link('guides/choisir-sarl-ou-sarl-au', 'SARL ou SARL AU', 'SARL or single-member SARL', 'SARL أو SARL AU'),
      link('formes-juridiques', 'Formes juridiques', 'Legal forms', 'الأشكال القانونية'),
      link('guides/modifier-societe-maroc', 'Modifier le capital', 'Change the capital', 'تعديل رأس المال'),
      link('guides/augmentation-de-capital-sarl', 'Augmentation de capital', 'Capital increase', 'زيادة رأس المال'),
      link('guides/reduction-capital-maroc', 'Réduction de capital', 'Capital reduction', 'تخفيض رأس المال'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('modify-company', 'Décrire une modification', 'Describe an amendment', 'صفوا تعديلاً'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:lawSources
  },
  {
    slug:'pacte-associes-que-prevoir',
    category:t('Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
    title:t(
      'Pacte d’associés au Maroc : ce qu’il faut prévoir',
      'A shareholders’ agreement in Morocco: what to provide for',
      'اتفاق الشركاء بالمغرب: ما يجب توقعه'
    ),
    description:t(
      'Le pacte d’associés complète les statuts entre ceux qui le signent. Il prévoit la cession, le blocage, l’information et le départ. Il ne se dépose pas à la place des statuts et ne fixe aucun modèle unique.',
      'A shareholders’ agreement supplements the articles between those who sign it. It provides for transfers, deadlock, information and departure. It is not filed in place of the articles and it sets no single template.',
      'يكمل اتفاق الشركاء النظام بين من يوقعونه. وهو يتوقع التفويت والانسداد والإخبار والمغادرة. ولا يُودع بدلاً من النظام ولا يفرض نموذجاً واحداً.'
    ),
    sections:[
      {
        heading:t('Le pacte n’est pas les statuts', 'The agreement is not the articles', 'الاتفاق ليس النظام'),
        paragraphs:[
          t(
            'Les statuts sont l’acte de la société. Ils sont déposés avec le dossier d’immatriculation et organisent ce que la loi de la forme laisse aux associés : parts, gérance, décisions, siège, objet. Pour une SARL, cette loi est notamment la loi n° 5-96. Pour une société anonyme, la loi n° 17-95. Le pacte d’associés est un contrat entre les personnes qui le signent. Il peut être plus précis, plus confidentiel, et plus facile à modifier entre eux. Il ne remplace pas les statuts. Ce qui doit être opposable au registre, à une banque ou à un tiers se juge d’abord sur les statuts et sur la loi, pas sur un document qu’ils n’ont pas vu.',
            'The articles are the company’s deed. They are filed with the registration file and organise what the law of the form leaves to the shareholders: shares, management, decisions, office, purpose. For a SARL, that law is in particular Law 5-96. For a public limited company, Law 17-95. A shareholders’ agreement is a contract between the people who sign it. It can be more precise, more confidential, and easier for them to amend. It does not replace the articles. What must be enforceable against the register, a bank or a third party is judged first on the articles and the law, not on a document they have not seen.',
            'النظام هو عقد الشركة. ويُودع مع ملف التسجيل وينظم ما يتركه قانون الشكل للشركاء: الحصص، والتسيير، والقرارات، والمقر، والغرض. وبالنسبة إلى SARL، هذا القانون هو خصوصاً القانون رقم 5-96. وبالنسبة إلى شركة المساهمة، القانون رقم 17-95. واتفاق الشركاء عقد بين الأشخاص الذين يوقعونه. ويمكن أن يكون أدق وأكثر سرية وأسهل تعديلاً بينهم. وهو لا يعوّض النظام. وما يجب أن يُحتج به تجاه السجل أو بنك أو الغير يُقدر أولاً على النظام والقانون، لا على وثيقة لم يروها.'
          ),
          t(
            'Le [guide déjà en ligne](guides/pacte-associes-maroc) recense des familles de clauses. Cette page ne le répète pas : elle dit ce qu’il faut avoir tranché avant de signer, sans modèle et sans chiffre. Signez le pacte en même temps que les statuts, pas après le premier conflit. Un associé qui refuse de le signer plus tard n’est pas tenu par un projet de clauses. Si vous êtes seul, un pacte n’a pas d’autre partie : la SARL à associé unique se pilote par les statuts et par vos décisions écrites. Le [guide SARL ou SARL AU](guides/choisir-sarl-ou-sarl-au) précède donc cette page. Felexia Conseils peut aider à lister les clauses utiles à votre dossier. Il ne publie pas de pacte type, parce qu’un modèle unique ignore qui apporte l’argent, qui apporte l’activité, et qui vit à l’étranger.',
            'The [guide already online](guides/pacte-associes-maroc) lists families of clauses. This page does not repeat it: it says what you should have decided before signing, with no template and no figure. Sign the agreement at the same time as the articles, not after the first conflict. A shareholder who refuses to sign it later is not bound by a draft of clauses. If you are alone, an agreement has no other party: the single-member SARL is steered by the articles and by your written decisions. The [SARL or single-member SARL guide](guides/choisir-sarl-ou-sarl-au) therefore comes before this page. Felexia Conseils can help list the clauses useful to your file. It does not publish a standard agreement, because a single template ignores who contributes the money, who contributes the activity, and who lives abroad.',
            'يعدّ [الدليل المنشور](guides/pacte-associes-maroc) عائلات من البنود. وهذه الصفحة لا تعيده: إنها تقول ما يجب أن يكون محسماً قبل التوقيع، بلا نموذج وبلا رقم. وقّعوا الاتفاق في الوقت نفسه مع النظام، لا بعد أول نزاع. والشريك الذي يرفض توقيعه لاحقاً غير ملزم بمشروع بنود. وإذا كنتم وحدكم، فليس للاتفاق طرف آخر: تُقاد SARL ذات الشريك الوحيد بالنظام وبقراراتكم المكتوبة. لذا يسبق [دليل SARL أو SARL AU](guides/choisir-sarl-ou-sarl-au) هذه الصفحة. ويمكن لـ Felexia Conseils المساعدة في عد البنود المفيدة لملفكم. وهو لا ينشر اتفاقاً نموذجياً، لأن النموذج الواحد يتجاهل من يساهم بالمال، ومن يساهم بالنشاط، ومن يعيش في الخارج.'
          )
        ]
      },
      {
        heading:t('Faire entrer et faire sortir', 'Letting people in and letting people out', 'الإدخال والإخراج'),
        paragraphs:[
          t(
            'La loi organise déjà, pour la SARL, un régime de cession des parts, en particulier lorsque l’acheteur n’est pas associé. Les statuts peuvent préciser ce régime dans les limites du texte. Le pacte ajoute ce que vous voulez entre vous : qui est prévenu, dans quel délai vous vous répondez, si les associés présents ont une priorité, et ce qui se passe si personne ne répond. N’écrivez pas un délai ou une majorité qui contredit la loi. Relisez la loi n° 5-96 et vos statuts avant de négocier un pourcentage de mémoire. Ce guide ne publie pas cette majorité.',
            'The law already organises, for the SARL, a regime for transferring shares, in particular when the buyer is not a shareholder. The articles can specify that regime within the limits of the text. The agreement adds what you want among yourselves: who is told, within what time you answer each other, whether the existing shareholders have a priority, and what happens if nobody answers. Do not write a deadline or a majority that contradicts the law. Read Law 5-96 and your articles again before negotiating a percentage from memory. This guide does not publish that majority.',
            'ينظم القانون سلفاً، بالنسبة إلى SARL، نظام تفويت الحصص، خصوصاً حين لا يكون المشتري شريكاً. ويمكن للنظام أن يدقق هذا النظام في حدود النص. ويضيف الاتفاق ما تريدونه فيما بينكم: من يُبلَّغ، وفي أي أجل تجيبون بعضكم، وهل للشركاء الحاليين أولوية، وماذا يقع إذا لم يجب أحد. ولا تكتبوا أجلاً أو أغلبية تناقض القانون. أعيدوا قراءة القانون رقم 5-96 ونظامكم قبل التفاوض على نسبة من الذاكرة. ولا ينشر هذا الدليل هذه الأغلبية.'
          ),
          t(
            'Prévoyez les départs que vous connaissez déjà. Un MRE qui rentre au pays, un associé qui vend sa part parce qu’il ne vit pas au Maroc, un héritier qui n’a rien à voir avec l’activité. Le décès et l’incapacité ne se règlent pas par une phrase « les héritiers feront le nécessaire ». Dites si la société ou les autres associés peuvent racheter, et comment le prix sera déterminé. Évitez un prix fixe en dirhams qui sera faux deux ans plus tard. Préférez une méthode : comptes arrêtés, ou expert désigné d’une façon que vous décrivez. La méthode n’est pas un barème publié par l’État. C’est la vôtre, et elle doit pouvoir s’appliquer sans l’accord de celui qui veut partir.',
            'Provide for the departures you already know. A Moroccan abroad who returns, a shareholder who sells because they do not live in Morocco, an heir who has nothing to do with the activity. Death and incapacity are not settled by a sentence saying “the heirs will do what is necessary”. Say whether the company or the other shareholders may buy, and how the price will be set. Avoid a fixed dirham price that will be wrong two years later. Prefer a method: approved accounts, or an expert appointed in a way you describe. The method is not a scale published by the State. It is yours, and it must be workable without the consent of the person who wants to leave.',
            'توقعوا المغادرات التي تعرفونها سلفاً. مغربي بالخارج يعود إلى البلد، شريك يبيع حصته لأنه لا يعيش في المغرب، وارث لا علاقة له بالنشاط. والوفاة وفقدان الأهلية لا يُحسمان بجملة «الورثة سيقومون باللازم». قولوا هل يجوز للشركة أو لبقية الشركاء الشراء، وكيف سيُحدد الثمن. وتجنبوا ثمناً ثابتاً بالدرهم سيصبح خاطئاً بعد سنتين. وفضّلوا طريقة: حسابات موقوفة، أو خبير يُعيَّن بطريقة تصفونها. والطريقة ليست تعريفة تنشرها الدولة. إنها طريقتكم، ويجب أن تُطبق دون موافقة من يريد المغادرة.'
          )
        ]
      },
      {
        heading:t('Le blocage à parts égales', 'Deadlock with equal shares', 'الانسداد عند تساوي الحصص'),
        paragraphs:[
          t(
            'Deux associés à parts égales ne peuvent pas se départager par un vote. C’est le cas que le pacte doit regarder en face, surtout lorsque l’un vit au Maroc et l’autre non. Sans clause, le blocage dure jusqu’à ce qu’un juge soit saisi ou que l’un cède. La loi ne choisit pas à votre place le mécanisme : rachat forcé, médiateur nommé d’avance, ou décision confiée à un troisième. Choisissez-en un que vous accepteriez si vous étiez le minoritaire de circonstance. Une clause qui ne punit qu’un seul des deux, écrit dans la confiance du premier jour, est celle qu’on conteste le jour du conflit.',
            'Two shareholders with equal shares cannot break a tie by a vote. That is the case the agreement must look at directly, especially when one lives in Morocco and the other does not. Without a clause, the deadlock lasts until a court is seized or one of them sells. The law does not choose the mechanism for you: a forced buy-out, a mediator named in advance, or a decision entrusted to a third person. Choose one you would accept if you were the temporary minority. A clause that punishes only one of the two, written in the trust of the first day, is the one that is challenged on the day of the conflict.',
            'شريكان بحصص متساوية لا يستطيعان حسم التعادل بتصويت. وهذه هي الحالة التي يجب أن ينظر إليها الاتفاق مباشرة، خصوصاً حين يعيش أحدهما في المغرب والآخر لا. ومن دون بند، يدوم الانسداد إلى أن تُرفع دعوى أو يتنازل أحدهما. والقانون لا يختار الآلية بدلاً عنكم: شراء إجباري، أو وسيط مسمى سلفاً، أو قرار يُعهد به إلى ثالث. اختاروا آلية تقبلونها لو كنتم الأقلية الظرفية. والبند الذي يعاقب واحداً فقط من الاثنين، المكتوب في ثقة اليوم الأول، هو الذي يُنازع يوم الخلاف.'
          ),
          t(
            'Distinguez le blocage des associés et le pouvoir du gérant. Le gérant continue les actes courants pendant que les associés ne s’entendent plus, dans la limite de ses pouvoirs. Si le pacte lui retire toute signature dès le premier désaccord, la société s’arrête : salaires, loyer, fournisseurs. Écrivez ce qui continue. Si le gérant est l’un des deux associés, dites qui surveille les paiements pendant la dispute. Le [guide pour gérer depuis l’étranger](guides/mre-gerer-societe-depuis-letranger) est utile lorsque la dispute se joue aussi sur les fuseaux horaires et sur l’accès à la banque.',
            'Separate a deadlock between shareholders from the manager’s power. The manager carries on routine acts while the shareholders no longer agree, within the limit of their powers. If the agreement removes every signature at the first disagreement, the company stops: wages, rent, suppliers. Write what continues. If the manager is one of the two shareholders, say who watches payments during the dispute. The [guide to managing from abroad](guides/mre-gerer-societe-depuis-letranger) is useful when the dispute is also about time zones and access to the bank.',
            'ميّزوا بين انسداد الشركاء وسلطة المسيّر. فالمسيّر يواصل الأعمال الجارية بينما لم يعد الشركاء متفقين، في حد سلطاته. وإذا سحب الاتفاق كل توقيع عند أول خلاف، تتوقف الشركة: الأجور، والكراء، والمزودون. اكتبوا ما يستمر. وإذا كان المسيّر أحد الشريكين، فقولوا من يراقب الأداءات أثناء النزاع. ويفيد [دليل التسيير من الخارج](guides/mre-gerer-societe-depuis-letranger) حين يدور النزاع أيضاً حول التوقيت والوصول إلى البنك.'
          )
        ]
      },
      {
        heading:t('L’information et les comptes', 'Information and the accounts', 'الإخبار والحسابات'),
        paragraphs:[
          t(
            'La loi donne déjà aux associés un droit d’information. Le pacte peut le rendre praticable pour quelqu’un qui n’est pas à Marrakech : quels documents, à quelle fréquence, sous quelle forme, et qui les envoie. Un droit de « tout consulter sur place » est faible si l’associé vit à l’étranger et si personne n’archive. Prévoyez un envoi régulier des relevés, du chiffre d’affaires et des engagements qui dépassent la gestion courante. La fréquence est la vôtre. Ce guide n’impose pas un rythme.',
            'The law already gives shareholders a right to information. The agreement can make it workable for someone who is not in Marrakech: which documents, how often, in what form, and who sends them. A right to “consult everything on the spot” is weak if the shareholder lives abroad and nobody files. Provide for a regular sending of statements, turnover and commitments that go beyond day-to-day management. The frequency is yours. This guide does not impose a rhythm.',
            'يمنح القانون سلفاً الشركاء حق الإخبار. ويمكن للاتفاق أن يجعله قابلاً للتطبيق لمن ليس في مراكش: أي وثائق، وبأي وتيرة، وبأي صيغة، ومن يرسلها. وحق «الاطلاع على كل شيء في عين المكان» ضعيف إذا كان الشريك يعيش في الخارج ولا أحد يؤرشف. خصصوا إرسالاً منتظماً للكشوف ورقم المعاملات والالتزامات التي تتجاوز التسيير الجاري. والوتيرة وتيرتكم. ولا يفرض هذا الدليل إيقاعاً.'
          ),
          t(
            'Dites aussi ce qu’un associé ne fait pas de l’information reçue. Une liste de clients ou un prix de revient n’est pas un document à transférer à une société concurrente, y compris une société que l’associé détient à l’étranger. La clause reste un contrat entre vous. Elle ne remplace pas les règles pénales ou la protection des données lorsqu’elles s’appliquent. Les comptes annuels, eux, suivent les obligations déclaratifs et fiscales de la société. Le pacte ne choisit pas un régime d’impôt et ne cite pas de taux. Faites vérifier les conséquences d’une distribution ou d’une rémunération d’associé auprès d’un professionnel.',
            'Also say what a shareholder does not do with the information received. A client list or a cost price is not a document to pass to a competing company, including a company the shareholder owns abroad. The clause remains a contract between you. It does not replace criminal rules or data protection where they apply. The annual accounts follow the company’s tax filings and tax obligations. The agreement does not choose a tax regime and cites no rate. Have the consequences of a distribution or of a shareholder’s remuneration checked by a professional.',
            'قولوا أيضاً ما لا يفعله الشريك بالمعلومة المتلقاة. لائحة الزبناء أو سعر التكلفة ليست وثيقة تُنقل إلى شركة منافسة، بما فيها شركة يملكها الشريك في الخارج. ويبقى البند عقداً بينكم. وهو لا يعوّض القواعد الزجرية أو حماية المعطيات حين تنطبق. والحسابات السنوية تتبع الواجبات المستشارية والضريبية للشركة. والاتفاق لا يختار نظام ضريبة ولا يذكر سعراً. تحققوا من آثار التوزيع أو مكافأة الشريك لدى مهني.'
          )
        ]
      },
      {
        heading:t('Activité à côté et départ d’un fondateur', 'A side activity and a founder’s departure', 'نشاط موازٍ ومغادرة مؤسس'),
        paragraphs:[
          t(
            'Si l’un de vous peut exercer la même activité de son côté, dites-le avant. Un silence veut souvent dire, plus tard, que chacun croyait l’inverse. Une clause qui limite une activité concurrente se rédige avec mesure : quelle activité, quel territoire, quelle durée, et ce qui reste libre. Une interdiction générale de travailler est un mauvais texte, difficile à tenir et parfois inutile. Le cas du MRE qui a déjà une société à l’étranger dans le même métier doit être décrit, pas découvert.',
            'If one of you may carry on the same activity on the side, say so beforehand. Silence often means, later, that each person believed the opposite. A clause that limits a competing activity is drafted with measure: which activity, which territory, which duration, and what stays free. A general ban on working is a poor text, hard to keep and sometimes useless. The case of a Moroccan abroad who already has a company overseas in the same trade must be described, not discovered.',
            'إذا كان أحدكم يستطيع مزاولة النشاط نفسه لحسابه، فقولوا ذلك قبل. والصمت يعني غالباً، لاحقاً، أن كل واحد كان يعتقد العكس. والبند الذي يحد نشاطاً منافساً يُصاغ بقدر: أي نشاط، وأي مجال، وأي مدة، وما يبقى حراً. والمنع العام من العمل نص رديء، صعب الالتزام به وأحياناً بلا فائدة. وحالة المغربي بالخارج الذي يملك سلفاً شركة في الخارج في المهنة نفسها يجب أن تُوصف، لا أن تُكتشف.'
          ),
          t(
            'Le fondateur qui apporte le carnet de commandes n’est pas le même que celui qui apporte le capital. Si le premier part, le second reste avec une société et sans l’activité. Le pacte peut prévoir une période de passation, la remise des accès, et le sort des contrats qui étaient liés à la personne. Il ne peut pas forcer un client à rester. Écrivez ce qui est entre vos mains : mots de passe de la société, contrats signés par la société, fichiers qu’elle a payés. Les accès personnels d’un associé ne sont pas un actif social. Les confondre bloque le départ et, parfois, le fonctionnement.',
            'The founder who brings the order book is not the same as the one who brings the capital. If the first leaves, the second remains with a company and without the activity. The agreement can provide for a handover period, the return of access, and the fate of contracts that were tied to the person. It cannot force a client to stay. Write what is in your hands: the company’s passwords, contracts signed by the company, files it has paid for. A shareholder’s personal access is not a company asset. Confusing them blocks the departure and, sometimes, operations.',
            'المؤسس الذي يأتي بدفتر الطلبات ليس هو من يأتي برأس المال. وإذا غادر الأول، بقي الثاني مع شركة وبلا نشاط. ويمكن للاتفاق أن يتوقع فترة تسليم، وإرجاع الولوج، ومصير العقود التي كانت مرتبطة بالشخص. وهو لا يستطيع إجبار زبون على البقاء. اكتبوا ما هو بين أيديكم: كلمات سر الشركة، والعقود التي وقعتها الشركة، والملفات التي أدت ثمنها. وولوج الشريك الشخصي ليس أصلاً للشركة. والخلط بينهما يعطل المغادرة، وأحياناً العمل.'
          )
        ]
      },
      {
        heading:t('Ce qu’il ne faut pas laisser oral', 'What should not stay oral', 'ما لا ينبغي تركه شفوياً'),
        paragraphs:[
          t(
            'Le pacte utile tient en clauses que vous sauriez appliquer un mardi, sans avocat dans la pièce. Avant de signer, cochez ce qui est vraiment écrit.',
            'A useful agreement is made of clauses you would know how to apply on a Tuesday, with no lawyer in the room. Before you sign, check what is actually written.',
            'الاتفاق المفيد يتكون من بنود تعرفون تطبيقها يوم ثلاثاء، بلا محام في القاعة. وقبل التوقيع، راجعوا ما هو مكتوب فعلاً.'
          )
        ],
        list:t(
          [
            'Qui est prévenu avant une cession, et ce qui se passe en cas de silence.',
            'Comment se dénoue une égalité de voix, sans bloquer les paiements courants.',
            'Quels documents sont envoyés aux associés qui ne vivent pas au Maroc.',
            'Comment un prix de rachat sera calculé, sans chiffre figé en dirhams.',
            'Ce qu’un associé peut faire dans le même métier à côté, y compris à l’étranger.',
            'Qui remet les accès et les contrats si un fondateur part.',
            'Ce qui reste dans les statuts, parce que le registre et les tiers ne lisent pas le pacte.',
            'Qui signe le pacte, y compris une société étrangère associée, par un représentant habilité.'
          ],
          [
            'Who is told before a transfer, and what happens if there is silence.',
            'How a tie is broken, without blocking routine payments.',
            'Which documents are sent to shareholders who do not live in Morocco.',
            'How a buy-out price will be calculated, with no figure frozen in dirhams.',
            'What a shareholder may do in the same trade on the side, including abroad.',
            'Who hands over access and contracts if a founder leaves.',
            'What stays in the articles, because the register and third parties do not read the agreement.',
            'Who signs the agreement, including a foreign company shareholder, through an authorised representative.'
          ],
          [
            'من يُبلَّغ قبل التفويت، وماذا يقع عند الصمت.',
            'كيف يُحسم تعادل الأصوات، دون تعطيل الأداءات الجارية.',
            'أي وثائق تُرسل إلى الشركاء الذين لا يعيشون في المغرب.',
            'كيف سيُحسب ثمن إعادة الشراء، بلا رقم مجمد بالدرهم.',
            'ما يجوز للشريك فعله في المهنة نفسها لحسابه، بما في ذلك في الخارج.',
            'من يسلم الولوج والعقود إذا غادر مؤسس.',
            'ما يبقى في النظام، لأن السجل والغير لا يقرأون الاتفاق.',
            'من يوقّع الاتفاق، بما فيه الشركة الأجنبية الشريكة، عبر ممثل مؤهل.'
          ]
        )
      }
    ],
    faqs:[
      {q:t('Le pacte doit-il être déposé au registre du commerce ?', 'Must the agreement be filed with the trade register?', 'هل يجب إيداع الاتفاق في السجل التجاري؟'), a:t('Ce qui organise la société envers les tiers se trouve dans les statuts déposés. Le pacte, contrat entre ses signataires, n’est pas un substitut de ce dépôt. Demandez, pour votre forme, ce que la formalité exige. Ne comptez pas sur un pacte secret pour contredire des statuts publiés.', 'What organises the company towards third parties is in the filed articles. The agreement, a contract between its signatories, is not a substitute for that filing. Ask, for your form, what the formality requires. Do not rely on a secret agreement to contradict published articles.', 'ما ينظم الشركة تجاه الغير يوجد في النظام المودع. والاتفاق، وهو عقد بين موقّعيه، ليس بديلاً عن هذا الإيداع. اسألوا، بالنسبة إلى شكلكم، ماذا تقتضي الشكلية. ولا تعتمدوا على اتفاق سري لمناقضة نظام منشور.')},
      {q:t('Un pacte signé à l’étranger est-il valable ?', 'Is an agreement signed abroad valid?', 'هل اتفاق موقّع في الخارج صحيح؟'), a:t('La forme de la signature se confirme selon le lieu et selon l’usage que vous voulez en faire au Maroc. Une traduction ou une légalisation peut être demandée. Le [guide procuration et légalisation](guides/procuration-creation-etranger) borne cette question. Le fond des clauses, lui, ne doit pas contredire la loi marocaine de la société.', 'The form of the signature is confirmed according to the place and according to the use you want to make of it in Morocco. A translation or a legalisation may be required. The [power of attorney and legalisation guide](guides/procuration-creation-etranger) bounds that question. The substance of the clauses must not contradict the Moroccan law of the company.', 'صيغة التوقيع تُؤكد حسب المكان وحسب الاستعمال الذي تريدونه في المغرب. وقد تُطلب ترجمة أو تصديق. و[دليل الوكالة والتصديق](guides/procuration-creation-etranger) يحصر هذا السؤال. أما جوهر البنود فلا ينبغي أن يناقض القانون المغربي للشركة.')},
      {q:t('Peut-on copier un pacte français ?', 'Can you copy a French shareholders’ agreement?', 'هل يمكن نسخ اتفاق شركاء فرنسي؟'), a:t('Non, pas tel quel. Les mots de la pratique française, comme certaines clauses de SAS, ne correspondent pas à une SARL marocaine. Repartez des statuts marocains et de la loi de la forme, puis ajoutez seulement les règles qui vous manquent.', 'No, not as it stands. Words from French practice, such as some SAS clauses, do not match a Moroccan SARL. Start again from the Moroccan articles and the law of the form, then add only the rules you are missing.', 'لا، ليس كما هو. فألفاظ الممارسة الفرنسية، مثل بعض بنود SAS، لا تطابق SARL مغربية. عودوا إلى النظام المغربي وقانون الشكل، ثم أضيفوا فقط القواعد التي تنقصكم.')},
      {q:t('Le pacte fixe-t-il la fiscalité des associés ?', 'Does the agreement set the shareholders’ tax?', 'هل يحدد الاتفاق جبائية الشركاء؟'), a:t('Non. Une clause de répartition ne choisit pas le régime fiscal. Dividendes, rémunération ou compte courant se qualifient selon le Code général des impôts. Faites vérifier le schéma auprès d’un professionnel. Aucun taux n’est indiqué ici.', 'No. A sharing clause does not choose the tax regime. Dividends, remuneration or a current account are classified under the General Tax Code. Have the structure checked by a professional. No rate is stated here.', 'لا. بند التوزيع لا يختار النظام الضريبي. والأرباح والمكافأة أو الحساب الجاري تُكيَّف وفق المدونة العامة للضرائب. تحققوا من الهيكل لدى مهني. ولا يُذكر هنا أي سعر.')}
    ],
    fiscal:true,
    links:[
      link('guides/pacte-associes-maroc', 'Clauses déjà recensées', 'Clauses already listed', 'بنود سبق جردها'),
      link('guides/choisir-sarl-ou-sarl-au', 'SARL ou SARL AU', 'SARL or single-member SARL', 'SARL أو SARL AU'),
      link('guides/capital-social-maroc-quel-montant', 'Choisir le capital', 'Choose the capital', 'اختيار رأس المال'),
      link('guides/mre-gerer-societe-depuis-letranger', 'Gérer depuis l’étranger', 'Run the company from abroad', 'التسيير من الخارج'),
      link('guides/modifier-societe-maroc', 'Modifier la société', 'Change the company', 'تعديل الشركة'),
      link('formes-juridiques', 'Formes juridiques', 'Legal forms', 'الأشكال القانونية'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:lawSources
  }
];
