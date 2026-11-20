const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const baseSources = [
  src('OMPIC', 'OMPIC', 'المكتب المغربي للملكية الصناعية والتجارية', 'https://www.ompic.ma/'),
  src('DirectInfo', 'DirectInfo', 'DirectInfo', 'https://www.directinfo.ma/'),
  src('Portail de l’investissement', 'Investment portal', 'بوابة الاستثمار', 'https://www.invest.gov.ma/'),
  src('Bulletin officiel', 'Official Gazette', 'الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Portail Adala', 'Adala portal', 'بوابة عدالة', 'https://adala.justice.gov.ma/'),
  src('Direction générale des impôts', 'General Tax Directorate', 'المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/'),
  src('CNSS', 'CNSS', 'الصندوق الوطني للضمان الاجتماعي', 'https://www.cnss.ma/')
];

export const lot1b = [
  {
    slug:'mre-creer-societe-sans-vivre-au-maroc',
    category:t('Investissement', 'Investment', 'الاستثمار'),
    title:t(
      'MRE : créer une société au Maroc sans y vivre toute l’année',
      'Moroccans abroad: forming a company in Morocco without living there all year',
      'مغاربة العالم: تأسيس شركة بالمغرب دون الإقامة فيه طوال السنة'
    ),
    description:t(
      'Un Marocain résidant à l’étranger peut créer une société au Maroc sans y vivre toute l’année. L’absence ne dispense ni d’un siège justifié, ni d’un gérant identifiable, ni des obligations qui suivent l’immatriculation.',
      'A Moroccan living abroad can form a company in Morocco without living there all year. Absence does not remove the need for an evidenced office, an identifiable manager, or the obligations that follow registration.',
      'يمكن لمغربي مقيم في الخارج تأسيس شركة بالمغرب دون أن يعيش فيه طوال السنة. والغياب لا يعفي من مقر مثبت ولا من مسيّر يمكن التعرف عليه ولا من الالتزامات التي تلي التسجيل.'
    ),
    sections:[
      {
        heading:t('L’absence n’est pas un régime à part', 'Absence is not a separate regime', 'الغياب ليس نظاماً خاصاً'),
        paragraphs:[
          t(
            'Créer une société alors que vous ne passez qu’une partie de l’année au Maroc ne crée pas une forme juridique spéciale pour les MRE. La société est marocaine. Elle a des associés, un siège, un objet, une gérance et une immatriculation au registre du commerce, comme une société dont les associés habitent Marrakech. Ce qui change, c’est l’organisation : qui est présent quand une signature est demandée, qui lit le courrier, qui répond à une banque, et comment les décisions sont prises quand les associés ne partagent pas le même calendrier.',
            'Forming a company when you spend only part of the year in Morocco does not create a special legal form for Moroccans abroad. The company is Moroccan. It has shareholders, an office, a purpose, a management and a trade-register entry, like a company whose shareholders live in Marrakech. What changes is the organisation: who is present when a signature is required, who reads the mail, who answers a bank, and how decisions are made when the shareholders do not share the same calendar.',
            'تأسيس شركة وأنتم لا تقضون إلا جزءاً من السنة في المغرب لا ينشئ شكلاً قانونياً خاصاً بمغاربة العالم. الشركة مغربية. لها شركاء ومقر وغرض وتسيير وتسجيل في السجل التجاري، مثل شركة يسكن شركاؤها بمراكش. الذي يتغير هو التنظيم: من يكون حاضراً حين يُطلب توقيع، ومن يقرأ البريد، ومن يجيب البنك، وكيف تُتخذ القرارات حين لا يشترك الشركاء في الرزنامة نفسها.'
          ),
          t(
            'Le [guide général pour créer depuis l’étranger](guides/mre-etranger) et le [guide depuis la France](guides/creer-societe-maroc-depuis-la-france) traitent du trajet de constitution et des actes signés hors du Maroc. Cette page répond à une question plus étroite : peut-on être l’associé d’une société marocaine sans y vivre toute l’année, et qu’est-ce qui doit quand même être vrai le jour de l’immatriculation. La réponse courte est oui, à condition de ne pas confondre votre lieu de vie et le fonctionnement de la société. Felexia Conseils, à Mabrouka, prépare ce cadrage à distance. La proposition ne promet pas que vous n’aurez jamais à vous déplacer.',
            'The [general guide to starting from abroad](guides/mre-etranger) and the [guide from France](guides/creer-societe-maroc-depuis-la-france) cover the formation path and deeds signed outside Morocco. This page answers a narrower question: can you be a shareholder of a Moroccan company without living there all year, and what must still be true on registration day. The short answer is yes, provided you do not confuse where you live with how the company works. Felexia Conseils, in Mabrouka, prepares that scoping remotely. The proposal does not promise that you will never have to travel.',
            'يتناول [الدليل العام للتأسيس من الخارج](guides/mre-etranger) و[الدليل من فرنسا](guides/creer-societe-maroc-depuis-la-france) مسار التأسيس والعقود الموقعة خارج المغرب. وتجيب هذه الصفحة عن سؤال أضيق: هل يمكن أن تكونوا شريكاً في شركة مغربية دون العيش فيها طوال السنة، وما الذي يجب أن يبقى صحيحاً يوم التسجيل. الجواب القصير نعم، بشرط عدم الخلط بين مكان عيشكم وطريقة عمل الشركة. ويحضّر Felexia Conseils، بمبروكة، هذا التأطير عن بُعد. والعرض لا يعد بأنكم لن تسافروا أبداً.'
          )
        ]
      },
      {
        heading:t('Votre résidence et la société sont deux sujets', 'Your residence and the company are two subjects', 'إقامتكم والشركة موضوعان'),
        paragraphs:[
          t(
            'Vivre la plus grande partie de l’année hors du Maroc ne dit pas, à lui seul, comment la société sera imposée, ni comment vous serez imposé à titre personnel. La résidence fiscale se lit dans le Code général des impôts, à partir de votre situation réelle : où est votre foyer, où sont vos intérêts, combien de temps vous passez au Maroc. Ce guide ne tranches pas ce point et ne publie aucun seuil. Faites-le vérifier auprès d’un professionnel, sur le texte en vigueur publié par la Direction générale des impôts. Une erreur fréquente consiste à croire qu’une société « MRE » est automatiquement hors du champ de l’impôt marocain parce que l’associé prend l’avion.',
            'Living most of the year outside Morocco does not, by itself, say how the company will be taxed, nor how you will be taxed personally. Tax residence is read in the General Tax Code, from your real situation: where your home is, where your interests are, how much time you spend in Morocco. This guide does not decide that point and publishes no threshold. Have it checked by a professional, against the current text published by the General Tax Directorate. A frequent mistake is to believe that an “MRE company” is automatically outside Moroccan tax because the shareholder takes a plane.',
            'العيش معظم السنة خارج المغرب لا يقول، وحده، كيف ستُفرض الشركة، ولا كيف ستُفرضون شخصياً. تُقرأ الإقامة الضريبية في المدونة العامة للضرائب، من وضعكم الحقيقي: أين السكن، وأين المصالح، وكم من الوقت تقضون في المغرب. ولا يحسم هذا الدليل هذه النقطة ولا ينشر أي سقف. تحققوا منها لدى مهني، على النص الجاري الذي تنشره المديرية العامة للضرائب. وخطأ شائع أن يُعتقد أن شركة «مغاربة العالم» خارج الضريبة المغربية تلقائياً لأن الشريك يركب الطائرة.'
          ),
          t(
            'L’autre confusion porte sur le change. Financer la société avec des devises venues de l’étranger peut relever d’un régime publié par l’Office des Changes. Ce régime intéresse la trace des fonds et, plus tard, certaines sorties. Il ne remplace pas les statuts, ni la banque, ni la résidence fiscale. Conservez les justificatifs du financement dès le premier virement. Le [guide du compte professionnel](guides/compte-bancaire-mre) détaille ce que le cabinet peut ordonner, et ce qu’il ne peut pas garantir.',
            'The other confusion is foreign exchange. Financing the company with currency from abroad may fall under a regime published by the Foreign Exchange Office. That regime matters for the trail of the funds and, later, for some outward payments. It does not replace the articles, the bank or tax residence. Keep the evidence of the financing from the first transfer. The [business-account guide](guides/compte-bancaire-mre) sets out what the firm can organise, and what it cannot guarantee.',
            'والالتباس الآخر يتعلق بالصرف. فتمويل الشركة بعملة آتية من الخارج قد يدخل في نظام ينشره مكتب الصرف. ويهم هذا النظام أثر الأموال، ولاحقاً، بعض الخروجات. وهو لا يعوّض النظام الأساسي ولا البنك ولا الإقامة الضريبية. احتفظوا بإثبات التمويل منذ أول تحويل. ويفصل [دليل الحساب المهني](guides/compte-bancaire-mre) ما يستطيع المكتب ترتيبه، وما لا يستطيع ضمانه.'
          )
        ]
      },
      {
        heading:t('Qui décide quand vous n’êtes pas là', 'Who decides when you are not there', 'من يقرر حين لا تكونون هناك'),
        paragraphs:[
          t(
            'Nommez les rôles avant de rédiger. Vous pouvez être associé unique et gérant, et ne venir au Maroc que quelques semaines. C’est juridiquement possible dans une SARL à associé unique, mais ce n’est tenable que si les actes courants peuvent attendre votre présence ou être couverts par une procuration précise. Vous pouvez aussi être associé et confier la gérance à une personne qui vit au Maroc. Ses pouvoirs sont ceux des statuts et de la loi applicable à la forme, en particulier la loi n° 5-96 pour une SARL. Ils ne sont pas « tout ce qui est utile ». Écrivez ce que le gérant peut signer seul, ce qui exige votre accord, et comment cet accord est donné quand vous êtes à l’étranger.',
            'Name the roles before you draft. You can be the sole shareholder and the manager, and come to Morocco only for a few weeks. That is legally possible in a single-member SARL, but it is workable only if routine acts can wait for your presence or be covered by a precise power of attorney. You can also be a shareholder and entrust the management to a person who lives in Morocco. Their powers are those of the articles and of the law that applies to the form, in particular Law 5-96 for a SARL. They are not “whatever is useful”. Write what the manager may sign alone, what needs your consent, and how that consent is given when you are abroad.',
            'سمّوا الأدوار قبل الصياغة. يمكن أن تكونوا الشريك الوحيد والمسيّر، ولا تأتوا إلى المغرب إلا لبضعة أسابيع. هذا ممكن قانوناً في SARL ذات الشريك الوحيد، لكنه لا يستقيم إلا إذا كانت الأعمال الجارية تستطيع انتظار حضوركم أو تغطيتها وكالة دقيقة. ويمكن أيضاً أن تكونوا شريكاً وتعهدوا بالتسيير إلى شخص يعيش في المغرب. وسلطاته هي سلطات النظام والقانون المطبق على الشكل، خصوصاً القانون رقم 5-96 بالنسبة إلى SARL. وليست «كل ما هو مفيد». اكتبوا ما يجوز للمسيّر توقيعه وحده، وما يقتضي موافقتكم، وكيف تُعطى هذه الموافقة وأنتم في الخارج.'
          ),
          t(
            'Une procuration n’est pas un substitut de gérant. Elle permet des actes énumérés, dans la forme que le destinataire accepte. Le [guide procuration et légalisation](guides/procuration-creation-etranger) sert au moment de la constitution. Pour la vie de la société, une procuration bancaire, une procuration postale et une procuration pour un dépôt administratif sont souvent des textes différents. Les faire tenir dans une seule page « pour tout » est une cause classique de refus. Si plusieurs MRE sont associés, le [choix entre SARL et SARL AU](guides/choisir-sarl-ou-sarl-au) doit être réglé avant le départ, pas au premier désaccord.',
            'A power of attorney is not a substitute for a manager. It allows listed acts, in the form the recipient accepts. The [power of attorney and legalisation guide](guides/procuration-creation-etranger) is for the formation itself. For the life of the company, a banking power, a postal power and a power for an administrative filing are often different texts. Putting them on a single page “for everything” is a classic cause of refusal. If several Moroccans abroad are shareholders, the [choice between a SARL and a single-member SARL](guides/choisir-sarl-ou-sarl-au) should be settled before you leave, not at the first disagreement.',
            'الوكالة ليست بديلاً عن المسيّر. إنها تتيح أعمالاً معددة، بالصيغة التي تقبلها الجهة. و[دليل الوكالة والتصديق](guides/procuration-creation-etranger) يخدم لحظة التأسيس. ولحياة الشركة، غالباً ما تكون الوكالة البنكية ووكالة البريد ووكالة الإيداع الإداري نصوصاً مختلفة. وجمعها في صفحة واحدة «لكل شيء» سبب كلاسيكي للرفض. وإذا كان عدة مغاربة بالخارج شركاء، فـ[الاختيار بين SARL وSARL AU](guides/choisir-sarl-ou-sarl-au) يُحسم قبل السفر، لا عند أول خلاف.'
          )
        ]
      },
      {
        heading:t('Un siège qui existe même pendant votre absence', 'An office that exists even while you are away', 'مقر موجود حتى أثناء غيابكم'),
        paragraphs:[
          t(
            'La société a besoin d’une adresse que les administrations et les tiers peuvent utiliser pendant que vous êtes à l’étranger. Cette adresse se justifie par un contrat de domiciliation, un bail, ou un local dont la société dispose. Le [guide du siège](guides/siege-social-maroc) compare les trois. Une domiciliation peut convenir à une activité de conseil ou de prestation sans accueil du public. Elle ne convient pas, à elle seule, à un commerce qui reçoit des clients, à un stock, ou à une profession qui exige un local. Le dire après l’immatriculation oblige à un transfert de siège, c’est-à-dire à une modification.',
            'The company needs an address that administrations and third parties can use while you are abroad. That address is evidenced by a domiciliation contract, a lease, or premises the company controls. The [office guide](guides/siege-social-maroc) compares the three. Domiciliation can suit a consulting or service activity with no public reception. By itself it does not suit a shop that receives customers, a stock, or a profession that requires premises. Saying so after registration forces an office transfer, which is a company amendment.',
            'تحتاج الشركة إلى عنوان تستطيع الإدارات والغير استعماله وأنتم في الخارج. ويُثبت هذا العنوان بعقد توطين أو كراء أو محل تتصرف فيه الشركة. ويقارن [دليل المقر](guides/siege-social-maroc) الثلاثة. وقد يناسب التوطين نشاط استشارة أو خدمة بلا استقبال للعموم. ولا يناسب وحده متجراً يستقبل زبائن أو مخزوناً أو مهنة تشترط محلاً. وقول ذلك بعد التسجيل يفرض نقل المقر، أي تعديلاً.'
          ),
          t(
            'Lisez le contrat de domiciliation sur trois points : l’adresse exacte qui sera reprise dans les statuts, ce qui est fait du courrier, et la durée. La réception ou la réexpédition du courrier n’existe que si elle est écrite. Quand vous n’êtes pas au Maroc, un courrier non lu peut contenir une mise en demeure ou une demande de pièce. La page [domiciliation](domiciliation) permet de décrire ce besoin. L’adresse du cabinet à Mabrouka n’est pas, par défaut, le siège de votre société. La ville peut être Marrakech ou une autre ville du Maroc : le droit des sociétés ne change pas avec la ville, le titre sur le local, si.',
            'Read the domiciliation contract on three points: the exact address that will be copied into the articles, what happens to the mail, and the term. Receiving or forwarding mail exists only if it is written down. When you are not in Morocco, unread mail can contain a formal notice or a request for a document. The [domiciliation](domiciliation) page is where you describe that need. The firm’s address in Mabrouka is not, by default, your company’s office. The city can be Marrakech or another Moroccan city: company law does not change with the city; the title to the premises does.',
            'اقرأوا عقد التوطين في ثلاث نقاط: العنوان الدقيق الذي سيُنقل إلى النظام، وما يُفعل بالبريد، والمدة. ولا يوجد استلام البريد أو إعادة إرساله إلا إذا كُتب ذلك. وحين لا تكونون في المغرب، قد يتضمن بريد غير مقروء إنذاراً أو طلباً لوثيقة. وصفحة [التوطين](domiciliation) مكان وصف هذه الحاجة. وعنوان المكتب بمبروكة ليس، تلقائياً، مقر شركتكم. وقد تكون المدينة مراكش أو مدينة مغربية أخرى: قانون الشركات لا يتغير مع المدينة، أما سند المحل فنعم.'
          )
        ]
      },
      {
        heading:t('La banque et les fonds, sans présence permanente', 'The bank and the funds, without a permanent presence', 'البنك والأموال، بلا حضور دائم'),
        paragraphs:[
          t(
            'La banque décide d’ouvrir le compte, et elle décide quelles personnes doivent être présentes. Une absence habituelle du Maroc est précisément le genre de fait qu’elle interroge : résidence, origine des fonds, activité réelle, signataires. Aucun partenaire bancaire n’est affiché sur ce site. Préparez un récit simple et documenté. Qui vend quoi, depuis où, à qui. D’où vient l’argent du capital et, s’il est distinct, l’argent de la trésorerie. Le capital n’est pas un honoraire. Son montant n’est pas fixé dans ce guide.',
            'The bank decides whether to open the account, and it decides which people must attend. Habitual absence from Morocco is exactly the kind of fact it asks about: residence, source of funds, real activity, signatories. No banking partner is displayed on this website. Prepare a simple, documented account. Who sells what, from where, to whom. Where the capital comes from and, if it is separate, where the operating cash comes from. Capital is not a fee. Its amount is not set in this guide.',
            'يقرر البنك فتح الحساب، ويقرر من يجب أن يحضر. والغياب المعتاد عن المغرب هو بالضبط نوع الواقعة التي يسأل عنها: الإقامة، ومصدر الأموال، والنشاط الحقيقي، والموقّعون. ولا يُعرض شريك بنكي على هذا الموقع. حضّروا رواية بسيطة وموثقة. من يبيع ماذا، ومن أين، ولمن. ومن أين يأتي مال رأس المال، وإذا كان منفصلاً، مال الخزينة. ورأس المال ليس أتعاباً. ومبلغه غير محدد في هذا الدليل.'
          ),
          t(
            'Ne mélangez pas le compte personnel ouvert à l’étranger, un compte de Marocain résidant à l’étranger s’il en existe un à votre nom, et le compte de la société. Les flux de la société se distinguent des flux personnels. Utiliser l’un pour l’autre complique à la fois la suivi des obligations déclaratives et les explications demandées plus tard par la banque ou par l’Office des Changes. Si un proche avance des frais avant l’ouverture du compte, notez-le par écrit. Un virement « entre cousins » sans motif devient, des mois après, impossible à qualifier.',
            'Do not mix the personal account opened abroad, a Moroccan-resident-abroad account if one exists in your name, and the company’s account. The company’s flows are separate from personal flows. Using one for the other complicates both the accounts and the explanations later requested by the bank or by the Foreign Exchange Office. If a relative advances expenses before the account is opened, write it down. A transfer “between cousins” with no reason becomes, months later, impossible to classify.',
            'لا تخلطوا بين الحساب الشخصي المفتوح في الخارج، وحساب مغربي مقيم بالخارج إن وُجد باسمكم، وحساب الشركة. فتُميز تدفقات الشركة عن التدفقات الشخصية. واستعمال أحدهما للآخر يعقّد التصاريح والشروح التي يطلبها لاحقاً البنك أو مكتب الصرف. وإذا سبّق قريب مصاريف قبل فتح الحساب، فدوّنوا ذلك. والتحويل «بين أبناء العم» بلا سبب يصبح، بعد أشهر، مستحيل التكييف.'
          )
        ]
      },
      {
        heading:t('Ce qui continue après l’immatriculation', 'What continues after registration', 'ما يستمر بعد التسجيل'),
        paragraphs:[
          t(
            'L’immatriculation n’est pas une mise en sommeil. La société a un identifiant, des déclarations liées à son activité, et une suivi des obligations déclaratives. Si elle emploie des salariés, l’affiliation et les déclarations auprès de la CNSS concernent l’employeur, que l’associé vive ou non au Maroc. Ce guide ne recopie aucun taux de cotisation : les barèmes se lisent auprès de la CNSS. Si personne au Maroc n’est chargé de ces échéances, l’absence de l’associé devient un risque d’oubli, pas une excuse écrite dans la loi.',
            'Registration is not a pause. The company has an identifier, filings tied to its activity, and accounts. If it employs staff, affiliation and filings with the CNSS concern the employer, whether or not the shareholder lives in Morocco. This guide copies no contribution rate: the scales are read from the CNSS. If nobody in Morocco is in charge of those dates, the shareholder’s absence becomes a risk of omission, not an excuse written in the statute.',
            'التسجيل ليس وضعاً في حالة سكون. للشركة معرف وتصاريح مرتبطة بنشاطها وتصاريح. وإذا شغّلت أجراء، فالانخراط والتصاريح لدى الصندوق الوطني للضمان الاجتماعي تخص المشغّل، سواء أقام الشريك في المغرب أم لا. ولا ينسخ هذا الدليل أي سعر اشتراك: التعريفات تُقرأ لدى الصندوق. وإذا لم يُكلَّف أحد في المغرب بهذه المواعيد، صار غياب الشريك خطر نسيان، لا عذراً مكتوباً في القانون.'
          ),
          t(
            'Organisez donc, avant de repartir, qui tient les pièces, qui reçoit le courrier, qui prépare les éléments déclaratifs, et qui vous alerte. Ces personnes ne deviennent pas gérantes par le fait de rendre service. Leur mission se limite à ce que vous avez écrit. Pour la vie courante de la société une fois créée, le [guide pour gérer depuis l’étranger](guides/mre-gerer-societe-depuis-letranger) prolonge celui-ci. En attendant de le lire, ne partez pas en laissant seulement un téléphone et une confiance. La page [création d’entreprise](creation-entreprise) ouvre le cadrage. Un devis se demande sur la page [contact](contact).',
            'So, before you leave again, organise who keeps the documents, who receives the mail, who prepares the tax filings information, and who alerts you. Those people do not become managers by being helpful. Their task is limited to what you have written. For the ordinary life of the company once it exists, the [guide to running it from abroad](guides/mre-gerer-societe-depuis-letranger) continues this one. Until you read it, do not leave with only a phone number and trust. The [company formation](creation-entreprise) page opens the scoping. A quote is requested on the [contact](contact) page.',
            'لذا، قبل أن تسافروا من جديد، نظّموا من يمسك الوثائق، ومن يستلم البريد، ومن يجهّز عناصر التصاريح، ومن ينبهكم. وهؤلاء لا يصبحون مسيّرين لمجرد المساعدة. ومهمتهم محدودة بما كتبتم. ولحياة الشركة العادية بعد وجودها، يكمل [دليل التسيير من الخارج](guides/mre-gerer-societe-depuis-letranger) هذا الدليل. وإلى أن تقرأوه، لا تغادروا بهاتف وثقة فقط. وصفحة [تأسيس المقاولة](creation-entreprise) تفتح التأطير. ويُطلب العرض في صفحة [الاتصال](contact).'
          )
        ]
      },
      {
        heading:t('Erreurs fréquentes quand on ne vit pas sur place', 'Frequent mistakes when you do not live on the spot', 'أخطاء متكررة حين لا تعيشون في عين المكان'),
        paragraphs:[
          t(
            'Ces situations reviennent dans les dossiers de MRE qui veulent une société « prête » avant le prochain séjour. Chacune se corrige plus simplement avant la signature qu’après.',
            'These situations recur in files of Moroccans abroad who want a company “ready” before the next stay. Each one is simpler to correct before signature than after.',
            'تتكرر هذه الوضعيات في ملفات مغاربة العالم الذين يريدون شركة «جاهزة» قبل الإقامة المقبلة. وكل واحدة تُصحح ببساطة أكبر قبل التوقيع منها بعده.'
          )
        ],
        list:t(
          [
            'Croire que le passeport ou la carte consulaire remplace les conditions de la forme choisie.',
            'Mettre comme gérant une personne qui n’a pas accepté les pouvoirs, ou qui n’est pas joignable.',
            'Utiliser l’adresse d’un parent sans titre, parce que « quelqu’un sera là ».',
            'Signer une procuration générale, puis découvrir qu’elle ne couvre ni la banque ni le courrier.',
            'Confondre le compte personnel de MRE et le compte de la société.',
            'Repartir sans désigner qui lit le courrier et qui prépare les déclarations.',
            'Traiter la résidence fiscale et le régime de l’Office des Changes comme une seule formalité.'
          ],
          [
            'Believing that a passport or a consular card replaces the conditions of the form you chose.',
            'Naming as manager a person who has not accepted the powers, or who cannot be reached.',
            'Using a parent’s address with no title, because “someone will be there”.',
            'Signing a general power of attorney, then discovering that it covers neither the bank nor the mail.',
            'Confusing a personal account for Moroccans abroad with the company’s account.',
            'Leaving again without naming who reads the mail and who prepares the filings.',
            'Treating tax residence and the Foreign Exchange Office regime as a single formality.'
          ],
          [
            'اعتقاد أن جواز السفر أو البطاقة القنصلية يعوّض شروط الشكل المختار.',
            'تعيين مسيّر لم يقبل السلطات، أو لا يمكن الاتصال به.',
            'استعمال عنوان أحد الوالدين بلا سند، لأن «أحداً سيكون هناك».',
            'توقيع وكالة عامة، ثم اكتشاف أنها لا تغطي البنك ولا البريد.',
            'الخلط بين حساب شخصي لمغاربة العالم وحساب الشركة.',
            'السفر من جديد دون تعيين من يقرأ البريد ومن يجهّز التصاريح.',
            'معاملة الإقامة الضريبية ونظام مكتب الصرف كإجراء واحد.'
          ]
        )
      }
    ],
    faqs:[
      {q:t('Un MRE peut-il être gérant sans habiter au Maroc ?', 'Can a Moroccan abroad be a manager without living in Morocco?', 'هل يمكن لمغربي بالخارج أن يكون مسيّراً دون أن يسكن في المغرب؟'), a:t('La loi de la forme choisie ne fait pas de l’habitation au Maroc une condition recopiée dans ce guide. En pratique, la gérance suppose de pouvoir signer et répondre. Si vous ne pouvez pas, nommez un gérant qui le peut, avec des pouvoirs écrits, ou limitez l’activité à ce que votre présence permet. La banque peut, de son côté, exiger une présence que la loi des sociétés ne demande pas.', 'The law of the form you chose does not make living in Morocco a condition copied into this guide. In practice, management means being able to sign and to answer. If you cannot, appoint a manager who can, with written powers, or limit the activity to what your presence allows. The bank may, for its part, require a presence that company law does not.', 'قانون الشكل المختار لا يجعل السكن في المغرب شرطاً منسوخاً في هذا الدليل. وعملياً، يقتضي التسيير القدرة على التوقيع والرد. وإذا لم تستطيعوا، عيّنوا مسيّراً يستطيع، بسلطات مكتوبة، أو احصروا النشاط فيما يسمح به حضوركم. وقد يشترط البنك، من جهته، حضوراً لا يطلبه قانون الشركات.')},
      {q:t('Faut-il un associé qui vit au Maroc ?', 'Do you need a shareholder who lives in Morocco?', 'هل يلزم شريك يعيش في المغرب؟'), a:t('Non, pas comme règle générale de constitution. Certaines activités réglementées ont leurs propres conditions, à lire dans le texte qui les régit. Ne ajoutez pas un associé de complaisance pour « avoir quelqu’un sur place » : il devient titulaire de parts, avec les droits que les statuts lui donnent.', 'No, not as a general rule of formation. Some regulated activities have their own conditions, to be read in the text that governs them. Do not add a nominee shareholder in order to “have someone on the spot”: that person becomes the holder of shares, with the rights the articles give them.', 'لا، ليس كقاعدة عامة للتأسيس. ولبعض الأنشطة المنظمة شروطها، تُقرأ في النص الذي يحكمها. ولا تضيفوا شريكاً صورياً «ليكن أحد على الأرض»: فهو يصبح مالكاً لحصص، بالحقوق التي يمنحها النظام.')},
      {q:t('La domiciliation suffit-elle si je ne suis jamais là ?', 'Is domiciliation enough if I am never there?', 'هل يكفي التوطين إذا لم أكن هناك أبداً؟'), a:t('Elle peut justifier le siège si l’activité s’en contente et si le contrat le prévoit. Elle ne remplace pas un gérant, une banque, ni la lecture du courrier. Une activité qui reçoit du public ou stocke des biens appelle en général un local.', 'It can evidence the office if the activity can do with it and the contract provides for it. It does not replace a manager, a bank, or reading the mail. An activity that receives the public or stores goods generally calls for premises.', 'قد يثبت المقر إذا اكتفى به النشاط ونص عليه العقد. وهو لا يعوّض مسيّراً ولا بنكاً ولا قراءة البريد. والنشاط الذي يستقبل العموم أو يخزن بضائع يطلب في الغالب محلاً.')},
      {q:t('Créer sans vivre au Maroc dispense-t-il d’impôt ?', 'Does forming a company without living in Morocco remove tax?', 'هل التأسيس دون العيش في المغرب يعفي من الضريبة؟'), a:t('Non. L’impôt de la société et votre résidence fiscale sont des questions distinctes. Aucun taux n’est donné ici. Faites vérifier la situation auprès d’un professionnel, à partir du Code général des impôts et des lois de finances en vigueur.', 'No. The company’s tax and your tax residence are separate questions. No rate is given here. Have the situation checked by a professional, from the General Tax Code and the finance laws in force.', 'لا. ضريبة الشركة وإقامتكم الضريبية سؤالان منفصلان. ولا يُعطى هنا أي سعر. تحققوا من الوضعية لدى مهني، انطلاقاً من المدونة العامة للضرائب وقوانين المالية الجارية.')}
    ],
    fiscal:true,
    links:[
      link('guides/mre-etranger', 'Créer depuis l’étranger', 'Start from abroad', 'التأسيس من الخارج'),
      link('guides/creer-societe-maroc-depuis-la-france', 'Créer depuis la France', 'Form a company from France', 'التأسيس من فرنسا'),
      link('guides/compte-bancaire-mre', 'Compte professionnel', 'Business account', 'الحساب المهني'),
      link('guides/siege-social-maroc', 'Justifier le siège', 'Evidence the office', 'إثبات المقر'),
      link('domiciliation', 'Domiciliation', 'Domiciliation', 'التوطين'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:baseSources
  },
  {
    slug:'mre-gerer-societe-depuis-letranger',
    category:t('Investissement', 'Investment', 'الاستثمار'),
    title:t(
      'MRE : gérer sa société au Maroc depuis l’étranger',
      'Moroccans abroad: running a Moroccan company from overseas',
      'مغاربة العالم: تسيير الشركة في المغرب من الخارج'
    ),
    description:t(
      'Une société déjà créée se gère depuis l’étranger si les pouvoirs, la banque, le courrier et les échéances sont écrits. L’immatriculation ne pilote pas l’activité à votre place.',
      'A company already formed can be run from overseas if powers, the bank, the mail and the deadlines are written down. Registration does not run the activity for you.',
      'يمكن تسيير شركة قائمة من الخارج إذا كُتبت السلطات والبنك والبريد والمواعيد. والتسجيل لا يسير النشاط بدلاً عنكم.'
    ),
    sections:[
      {
        heading:t('Gérer n’est pas le prolongement automatique de la création', 'Running the company is not the automatic sequel to formation', 'التسيير ليس امتداداً تلقائياً للتأسيس'),
        paragraphs:[
          t(
            'Le dossier de création répond à une question : la société existe-t-elle au registre. La gestion en répond à une autre : qui fait quoi chaque mois, alors que vous n’êtes pas au Maroc. Beaucoup de MRE traitent la seconde comme une suite gratuite de la première. Ce n’est pas le cas. Une procuration signée pour le dépôt des statuts ne donne pas le droit de payer un fournisseur, de recruter, ni de lire le courrier trois ans plus tard. Les statuts disent qui est gérant. Ils ne décrivent pas, à eux seuls, le circuit des factures, des relevés et des relances.',
            'The formation file answers one question: does the company exist on the register. Management answers another: who does what each month, while you are not in Morocco. Many Moroccans abroad treat the second as a free sequel to the first. It is not. A power of attorney signed to file the articles does not give the right to pay a supplier, to hire, or to read the mail three years later. The articles say who the manager is. By themselves they do not describe the path of invoices, statements and reminders.',
            'يجيب ملف التأسيس عن سؤال: هل الشركة موجودة في السجل. ويجيب التسيير عن سؤال آخر: من يفعل ماذا كل شهر، وأنتم لستم في المغرب. ويعامل كثير من مغاربة العالم الثاني كتكملة مجانية للأول. وليس الأمر كذلك. فالوكالة الموقعة لإيداع النظام لا تعطي حق أداء مزود أو تشغيل أجير أو قراءة البريد بعد ثلاث سنوات. والنظام يقول من هو المسيّر. وهو لا يصف، وحده، مسار الفواتير والكشوف والإنذارات.'
          ),
          t(
            'Cette page suppose la société déjà immatriculée. Pour la constituer sans vivre toute l’année au Maroc, lisez le [guide de création pour un MRE absent](guides/mre-creer-societe-sans-vivre-au-maroc). Pour les actes signés hors du Maroc au moment du dépôt, le [guide procuration](guides/procuration-creation-etranger) reste le bon complément. Ici, il s’agit de la vie courante. Felexia Conseils peut aider à ordonner les pouvoirs et les pièces. Le cabinet n’est pas le gérant de votre société, et il n’accède pas à votre banque.',
            'This page assumes the company is already registered. To form it without living in Morocco all year, read the [formation guide for a Moroccan abroad who is away](guides/mre-creer-societe-sans-vivre-au-maroc). For deeds signed outside Morocco at filing, the [power of attorney guide](guides/procuration-creation-etranger) remains the right complement. Here, the subject is ordinary life. Felexia Conseils can help put powers and documents in order. The firm is not the manager of your company, and it does not access your bank.',
            'تفترض هذه الصفحة أن الشركة مسجلة. ولتأسيسها دون العيش في المغرب طوال السنة، اقرأوا [دليل التأسيس لمغربي غائب](guides/mre-creer-societe-sans-vivre-au-maroc). وللعقود الموقعة خارج المغرب وقت الإيداع، يبقى [دليل الوكالة](guides/procuration-creation-etranger) التكملة المناسبة. وهنا الموضوع هو الحياة الجارية. ويمكن لـ Felexia Conseils المساعدة في ترتيب السلطات والوثائق. والمكتب ليس مسيّر شركتكم، ولا يلج بنككم.'
          )
        ]
      },
      {
        heading:t('Décider à distance, par écrit', 'Deciding remotely, in writing', 'القرار عن بُعد، كتابة'),
        paragraphs:[
          t(
            'Relisez les statuts avant le premier acte important. Ils disent qui convoque, quelles décisions relèvent du gérant, et lesquelles exigent les associés. Si vous êtes associé unique, la formalisation reste utile : une décision non écrite est difficile à prouver devant une banque ou un associé entré plus tard. Si vous êtes plusieurs, fixez un moyen d’échange que chacun consulte vraiment. Un message vocal ne remplace pas une décision lorsque les statuts ou la loi demandent un écrit.',
            'Read the articles again before the first important act. They say who calls meetings, which decisions belong to the manager, and which require the shareholders. If you are the sole shareholder, writing things down is still useful: an unwritten decision is hard to prove to a bank or to a shareholder who joins later. If there are several of you, set a means of exchange that each person actually checks. A voice message does not replace a decision when the articles or the law require a writing.',
            'أعيدوا قراءة النظام قبل أول عمل مهم. فهو يقول من يدعو، وأي القرارات للمسيّر، وأيها يقتضي الشركاء. وإذا كنتم الشريك الوحيد، تبقى الكتابة مفيدة: فالقرار غير المكتوب يصعب إثباته أمام بنك أو شريك دخل لاحقاً. وإذا كنتم عدة، حددوا وسيلة تبادل يطلع عليها كل واحد فعلاً. والرسالة الصوتية لا تعوّض قراراً حين يطلب النظام أو القانون كتابة.'
          ),
          t(
            'Prévoyez au moins quatre familles de décisions, et dites pour chacune qui propose et qui signe. D’abord les engagements qui durent : bail, crédit, embauche d’un cadre. Ensuite les paiements au-dessus d’un montant que vous fixez vous-mêmes dans le pacte ou dans une délégation, sans que ce guide impose un chiffre. Ensuite les actes qui touchent les associés : cession de parts, entrée d’un tiers, distribution. Enfin les actes déposés au registre : changement de gérant, de siège, d’objet ou de capital. Ces derniers sont des modifications, décrites dans le [guide modifier une société](guides/modifier-societe-maroc). Les voter depuis l’étranger ne dispense pas des formalités marocaines.',
            'Provide for at least four families of decisions, and say for each who proposes and who signs. First, commitments that last: a lease, a loan, hiring a senior employee. Next, payments above an amount you set yourselves in an agreement or a delegation; this guide imposes no figure. Next, acts that affect the shareholders: a transfer of shares, the entry of a third party, a distribution. Finally, acts filed with the register: a change of manager, office, purpose or capital. Those last ones are amendments, described in the [guide to changing a company](guides/modifier-societe-maroc). Voting them from abroad does not remove the Moroccan formalities.',
            'خصصوا على الأقل أربع عائلات من القرارات، وقولوا لكل واحدة من يقترح ومن يوقّع. أولاً الالتزامات التي تدوم: الكراء، والقرض، وتشغيل إطار. ثم الأداءات فوق مبلغ تحددونه أنتم في اتفاق أو تفويض، من دون أن يفرض هذا الدليل رقماً. ثم الأعمال التي تمس الشركاء: تفويت الحصص، ودخول الغير، والتوزيع. وأخيراً الأعمال المودعة في السجل: تغيير المسيّر أو المقر أو الغرض أو رأس المال. وهذه الأخيرة تعديلات، موصوفة في [دليل تعديل الشركة](guides/modifier-societe-maroc). والتصويت عليها من الخارج لا يعفي من الإجراءات المغربية.'
          )
        ]
      },
      {
        heading:t('La signature bancaire au quotidien', 'Day-to-day bank signing', 'التوقيع البنكي اليومي'),
        paragraphs:[
          t(
            'Demandez à la banque, par écrit, qui peut signer, jusqu’où, et si une double signature est possible. Ces règles sont celles du compte, pas celles des statuts, même si les deux doivent rester compatibles. Un gérant statutaire que la banque n’a pas enregistré ne fera pas partir un virement. Un proche ajouté sur le compte sans figurer dans les pouvoirs de la société crée l’effet inverse : l’argent peut sortir sans que les associés l’aient décidé.',
            'Ask the bank, in writing, who may sign, up to what point, and whether a double signature is possible. Those rules are the account’s, not the articles’, even if the two must stay compatible. A statutory manager whom the bank has not recorded will not send a transfer. A relative added to the account without appearing in the company’s powers creates the opposite effect: money can leave without the shareholders having decided it.',
            'اسألوا البنك، كتابة، من يجوز له التوقيع، وإلى أي حد، وهل التوقيع المزدوج ممكن. هذه قواعد الحساب، لا قواعد النظام، حتى لو وجب أن يظلا متوافقين. والمسيّر النظامي الذي لم يسجله البنك لن يُرسل تحويلاً. والقريب المضاف إلى الحساب دون أن يظهر في سلطات الشركة يحدث الأثر العكسي: قد يخرج المال دون أن يقرره الشركاء.'
          ),
          t(
            'Séparez les flux. Le compte de la société reçoit le chiffre d’affaires et paie les charges de la société. Votre compte personnel, y compris un compte de MRE, ne sert pas de caisse. Lorsque vous avancez une dépense depuis l’étranger, qualifiez l’opération : apport, compte courant, ou remboursement de frais, selon ce que les statuts et la situation permettent. Le choix a des effets déclaratifs et, parfois, fiscaux. Ce guide ne donne pas le régime du compte courant et ne cite aucun taux d’intérêt. Faites qualifier l’écriture par la personne qui tient la suivi des obligations déclaratives, avant qu’une année de virements ne s’accumule.',
            'Separate the flows. The company’s account receives turnover and pays the company’s expenses. Your personal account, including an account for Moroccans abroad, is not the till. When you advance an expense from overseas, classify the operation: a contribution, a shareholder current account, or a repayment of expenses, according to what the articles and the situation allow. The choice has tax filings effects and, sometimes, tax effects. This guide does not give the regime of the current account and cites no interest rate. Have the entry classified by the person who keeps the accounts, before a year of transfers piles up.',
            'افصلوا التدفقات. حساب الشركة يقبض رقم المعاملات ويؤدي أعباء الشركة. وحسابكم الشخصي، بما فيه حساب مغاربة العالم، ليس صندوقاً. وحين تسبقون مصروفاً من الخارج، كيّفوا العملية: مساهمة، أو حساب جار للشريك، أو إرجاع مصاريف، حسب ما يسمح به النظام والوضعية. وللاختيار آثار مستشارية، وأحياناً ضريبية. ولا يعطي هذا الدليل نظام الحساب الجاري ولا يذكر أي سعر فائدة. اطلبوا تكييف القيد من الشخص الذي يمسك التصاريح، قبل أن تتراكم سنة من التحويلات.'
          )
        ]
      },
      {
        heading:t('Courrier, salariés et suivi des obligations déclaratives', 'Mail, employees and accounts', 'البريد والأجراء والتصاريح'),
        paragraphs:[
          t(
            'Le courrier arrivé au siège est souvent le premier signal d’une échéance. Si le contrat de domiciliation prévoit une réexpédition ou une numérisation, vérifiez qu’elle a lieu et que vous la lisez. Si le siège est un local tenu par un salarié ou un proche, dites qui ouvre, qui photographie, et sous quel délai vous êtes prévenu. Un délai de remise interne n’est pas un délai administratif : il ne décale pas une date fixée par un organisme. La page [domiciliation à Marrakech](guides/domiciliation-marrakech) précise que le courrier n’est jamais implicite.',
            'Mail arriving at the office is often the first signal of a deadline. If the domiciliation contract provides for forwarding or scanning, check that it happens and that you read it. If the office is premises kept by an employee or a relative, say who opens, who photographs, and within what time you are told. An internal handover time is not an administrative deadline: it does not move a date set by a public body. The [domiciliation in Marrakech](guides/domiciliation-marrakech) page makes clear that mail is never implied.',
            'البريد الوارد إلى المقر غالباً أول إشارة إلى موعد. وإذا نص عقد التوطين على إعادة الإرسال أو الرقمنة، تحققوا من أنها تقع وأنكم تقرأونها. وإذا كان المقر محلاً يمسكه أجير أو قريب، فقولوا من يفتح، ومن يصوّر، وفي أي أجل تُبلَّغون. وأجل التسليم الداخلي ليس أجلاً إدارياً: فهو لا يؤجل تاريخاً حددته هيئة. وتوضح صفحة [التوطين بمراكش](guides/domiciliation-marrakech) أن البريد ليس ضمنياً أبداً.'
          ),
          t(
            'Dès le premier salarié, la société est employeur. L’affiliation et les déclarations se font auprès de la CNSS selon les règles publiées par cet organisme. Votre présence à l’étranger ne transfère pas cette qualité à une connaissance qui « s’occupe des équipes ». Le bulletin de paie, le contrat et la déclaration portent le nom de la société. Pour la suivi des obligations déclaratives, désignez qui rassemble les pièces chaque mois : factures émises, factures reçues, relevés, contrats. Une suivi des obligations déclaratives reconstituée en fin d’année, à partir de photos envoyées au hasard, laisse des trous. Les obligations fiscales qui en découlent se vérifient dans le Code général des impôts. Aucun calendrier de déclaration n’est recopié ici. Faites-le confirmer par un professionnel pour votre activité.',
            'From the first employee, the company is an employer. Affiliation and filings are made with the CNSS under the rules that body publishes. Your presence abroad does not transfer that status to an acquaintance who “looks after the teams”. The payslip, the contract and the filing carry the company’s name. For the accounts, name who gathers the documents each month: invoices issued, invoices received, statements, contracts. Accounts rebuilt at year end from photos sent at random leave gaps. The tax obligations that follow are checked in the General Tax Code. No filing calendar is copied here. Have it confirmed by a professional for your activity.',
            'منذ أول أجير، الشركة مشغّل. والانخراط والتصاريح لدى الصندوق الوطني للضمان الاجتماعي وفق القواعد التي ينشرها. ووجودكم في الخارج لا ينقل هذه الصفة إلى معرفة «تهتم بالفرق». فكشف الأجر والعقد والتصريح يحملون اسم الشركة. وللتصاريح، عيّنوا من يجمع الوثائق كل شهر: الفواتير الصادرة، والواردة، والكشوف، والعقود. والتصاريح المعاد بناؤها في آخر السنة من صور مرسلة عشوائياً تترك فراغات. والالتزامات الضريبية التي تترتب تُتحقق في المدونة العامة للضرائب. ولا يُنسخ هنا أي جدول تصاريح. اطلبوا تأكيده من مهني لنشاطكم.'
          )
        ]
      },
      {
        heading:t('Ce qui exige encore un déplacement ou un acte local', 'What still requires travel or a local act', 'ما زال يتطلب سفراً أو عملاً محلياً'),
        paragraphs:[
          t(
            'Certaines démarches acceptent un mandataire. D’autres demandent le gérant, un associé, ou une signature dont la forme se confirme au cas par cas. Ne construisez pas l’année sur l’idée que tout est à distance. Au moment de prévoir vos séjours, listez les actes qui ne peuvent pas attendre le suivant : renouvellement d’un titre, rendez-vous bancaire, signature d’un bail, assemblée que les statuts n’autorisent pas à tenir autrement. Le centre régional d’investissement et les guichets de l’OMPIC indiquent, pour la démarche concernée, ce qu’ils attendent. Ce guide ne publie pas leur liste, parce qu’elle change.',
            'Some procedures accept an agent. Others require the manager, a shareholder, or a signature whose form is confirmed case by case. Do not build the year on the idea that everything is remote. When you plan your stays, list the acts that cannot wait for the next one: renewal of a permit, a bank appointment, signing a lease, a meeting that the articles do not allow to be held otherwise. The regional investment centre and OMPIC’s desks state, for the procedure in question, what they expect. This guide does not publish their list, because it changes.',
            'بعض الإجراءات تقبل وكيلاً. وأخرى تطلب المسيّر أو شريكاً أو توقيعاً تُؤكد صيغته حالة بحالة. ولا تبنوا السنة على فكرة أن كل شيء عن بُعد. وحين تخططون لإقاماتكم، عدّدوا الأعمال التي لا تستطيع انتظار التالية: تجديد سند، موعد بنكي، توقيع كراء، جمعية لا يسمح النظام بعقدها بطريقة أخرى. ويبين المركز الجهوي للاستثمار وشبابيك OMPIC، بالنسبة إلى الإجراء المعني، ما ينتظرونه. ولا ينشر هذا الدليل لائحتهم، لأنها تتغير.'
          ),
          t(
            'Gardez au Maroc un jeu de pièces à jour : statuts, extrait du registre, pouvoirs, contrat de siège, relevé d’identité bancaire de la société. Le double que vous emportez à l’étranger ne suffit pas le jour où un guichet demande l’original ou une copie certifiée. Désignez la personne autorisée à les présenter, et seulement celles-là. Perdre la maîtrise des originaux est plus difficile à réparer qu’un oubli de scan.',
            'Keep an up-to-date set of documents in Morocco: articles, register extract, powers, office contract, the company’s bank details. The copy you take abroad is not enough on the day a desk asks for the original or a certified copy. Name the person allowed to present them, and only those documents. Losing control of the originals is harder to repair than a missed scan.',
            'احتفظوا في المغرب بمجموعة وثائق محينة: النظام، ومستخرج السجل، والسلطات، وعقد المقر، وبيان الهوية البنكية للشركة. والنسخة التي تحملونها إلى الخارج لا تكفي يوم يطلب شباك الأصل أو نسخة مصادق عليها. وعيّنوا الشخص المأذون بتقديمها، وهذه الوثائق فقط. وفقدان السيطرة على الأصول أصعب إصلاحاً من نسيان مسح.'
          )
        ]
      },
      {
        heading:t('Erreurs de pilotage à distance', 'Mistakes in remote steering', 'أخطاء القيادة عن بُعد'),
        paragraphs:[
          t(
            'Le pilotage à distance tient si chaque geste a un responsable nommé. Il se défait quand tout repose sur une personne serviable et non mandatée.',
            'Remote steering holds if every act has a named person in charge. It comes apart when everything rests on a helpful person with no mandate.',
            'تستقيم القيادة عن بُعد إذا كان لكل عمل مسؤول مسمى. وتنفرط حين يقوم كل شيء على شخص متعاون بلا تكليف.'
          )
        ],
        list:t(
          [
            'Laisser le gérant de fait signer parce qu’il est sur place, sans pouvoir écrit.',
            'Payer les charges de la société depuis un compte personnel, sans écriture qualifiée.',
            'Découvrir un courrier recommandé plusieurs mois après, parce que personne ne l’ouvre.',
            'Recruter sans affiliation, en se disant que la CNSS attendra le retour au pays.',
            'Modifier le gérant, le siège ou l’objet par un message, sans formalité au registre.',
            'Confondre une alerte du cabinet avec une obligation de l’administration, ou l’inverse.',
            'Ne pas prévoir quel séjour servira aux actes qui exigent une présence.'
          ],
          [
            'Letting the de facto manager sign because they are on the spot, with no written power.',
            'Paying the company’s expenses from a personal account, with no classified entry.',
            'Discovering a registered letter months later, because nobody opens it.',
            'Hiring without affiliation, telling yourself the CNSS will wait until you return.',
            'Changing the manager, the office or the purpose by a message, with no filing at the register.',
            'Confusing an alert from the firm with an obligation of the administration, or the reverse.',
            'Not planning which stay will be used for the acts that require presence.'
          ],
          [
            'ترك المسيّر الفعلي يوقّع لأنه في عين المكان، بلا سلطة مكتوبة.',
            'أداء أعباء الشركة من حساب شخصي، بلا قيد مكيّف.',
            'اكتشاف رسالة مضمونة بعد أشهر، لأن لا أحد يفتحها.',
            'التشغيل بلا انخراط، مع القول إن الصندوق سينتظر العودة إلى البلد.',
            'تغيير المسيّر أو المقر أو الغرض برسالة، بلا إجراء في السجل.',
            'الخلط بين تنبيه من المكتب والتزام تجاه الإدارة، أو العكس.',
            'عدم تخطيط أي إقامة ستُستعمل للأعمال التي تقتضي الحضور.'
          ]
        )
      }
    ],
    faqs:[
      {q:t('Le cabinet peut-il gérer la société à ma place ?', 'Can the firm run the company for me?', 'هل يستطيع المكتب تسيير الشركة بدلاً عني؟'), a:t('Non. Felexia Conseils prépare et coordonne dans le périmètre d’une mission écrite. Il n’est pas gérant, ne signe pas à la banque et ne reçoit pas les pièces d’identité par le formulaire du site. La gérance reste celle des statuts.', 'No. Felexia Conseils prepares and coordinates within a written engagement. It is not the manager, it does not sign at the bank and it does not receive identity documents through the website form. Management remains that of the articles.', 'لا. يحضّر Felexia Conseils وينسق في نطاق مهمة مكتوبة. وهو ليس المسيّر، ولا يوقّع في البنك، ولا يستقبل وثائق الهوية عبر نموذج الموقع. والتسيير يبقى تسيير النظام.')},
      {q:t('Une assemblée peut-elle se tenir depuis l’étranger ?', 'Can a meeting be held from abroad?', 'هل يمكن عقد جمعية من الخارج؟'), a:t('Seulement si les statuts et la loi applicable à votre forme le permettent, dans les conditions qu’ils fixent. À défaut, la réunion se tient comme ces textes le disent. Ne supposez pas qu’une visioconférence suffit sans l’avoir lu.', 'Only if the articles and the law that applies to your form allow it, on the conditions they set. Otherwise the meeting is held as those texts say. Do not assume a video call is enough without having read them.', 'فقط إذا سمح بذلك النظام والقانون المطبق على شكلكم، بالشروط التي يحددونها. وإلا عُقد الاجتماع كما تقول هذه النصوص. ولا تفترضوا أن اتصالاً مرئياً يكفي دون قراءتها.')},
      {q:t('Qui est responsable des déclarations si je vis à l’étranger ?', 'Who is responsible for filings if I live abroad?', 'من المسؤول عن التصاريح إذا كنت أعيش في الخارج؟'), a:t('La société, et les personnes que la loi et les statuts désignent, restent tenues des obligations marocaines. Vivre à l’étranger ne déplace pas ces obligations. Le calendrier exact se confirme auprès de l’organisme et d’un professionnel. Il n’est pas publié ici.', 'The company, and the people the law and the articles designate, remain bound by Moroccan obligations. Living abroad does not move those obligations. The exact calendar is confirmed with the body and with a professional. It is not published here.', 'تبقى الشركة، والأشخاص الذين يعينهم القانون والنظام، ملزمين بالواجبات المغربية. والعيش في الخارج لا ينقل هذه الواجبات. والجدول الدقيق يُؤكد لدى الهيئة ولدى مهني. وهو غير منشور هنا.')},
      {q:t('Faut-il repasser par une modification pour changer le gérant ?', 'Do you need an amendment to change the manager?', 'هل يلزم تعديل لتغيير المسيّر؟'), a:t('Oui. Changer le gérant est une modification de société. Une annonce à la banque ne suffit pas, et une mise à jour bancaire ne met pas le registre à jour. Les deux se coordonnent, dans cet ordre logique : décision, formalités, puis banque.', 'Yes. Changing the manager is a company amendment. Telling the bank is not enough, and a bank update does not update the register. The two are coordinated, in this logical order: decision, formalities, then the bank.', 'نعم. تغيير المسيّر تعديل للشركة. وإخبار البنك لا يكفي، وتحيين بنكي لا يحيّن السجل. ويُنسق الاثنان، بهذا الترتيب المنطقي: القرار، ثم الإجراءات، ثم البنك.')}
    ],
    fiscal:true,
    links:[
      link('guides/mre-creer-societe-sans-vivre-au-maroc', 'Créer sans vivre toute l’année au Maroc', 'Form a company without living in Morocco all year', 'التأسيس دون العيش في المغرب طوال السنة'),
      link('guides/modifier-societe-maroc', 'Modifier la société', 'Change the company', 'تعديل الشركة'),
      link('guides/domiciliation-marrakech', 'Courrier et domiciliation', 'Mail and domiciliation', 'البريد والتوطين'),
      link('guides/compte-bancaire-mre', 'Compte professionnel', 'Business account', 'الحساب المهني'),
      link('modify-company', 'Décrire une modification', 'Describe an amendment', 'صفوا تعديلاً'),
      link('domiciliation', 'Domiciliation', 'Domiciliation', 'التوطين'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:baseSources
  }
];
