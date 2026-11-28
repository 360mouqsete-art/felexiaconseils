const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const sources = [
  src(
    'Loi n° 15-95 formant Code de commerce, version consolidée au 29 janvier 2026 (Adala)',
    'Law 15-95, Commercial Code, consolidated to 29 January 2026 (Adala)',
    'القانون رقم 15.95 بمثابة مدونة التجارة، صيغة محينة بتاريخ 29 يناير 2026 (عدالة)',
    'https://adala.justice.gov.ma/api/uploads/2026/02/11/%D8%B8%D9%80%D9%80%D9%87%D9%80%D9%80%D9%8A%D9%80%D9%80%D8%B1%20%D8%B4%D9%80%D9%80%D8%B1%D9%8A%D9%80%D9%80%D9%81%20%D8%B1%D9%82%D9%80%D9%80%D9%85%201.96.83-1770806715042.pdf'
  ),
  src(
    'Décret n° 2-96-906 du 18 janvier 1997 sur le registre de commerce (Adala)',
    'Decree 2-96-906 of 18 January 1997 on the trade register (Adala)',
    'المرسوم رقم 2.96.906 الصادر في 18 يناير 1997 المتعلق بالسجل التجاري (عدالة)',
    'https://adala.justice.gov.ma/api/uploads/2025/02/11/%D9%85%D8%B1%D8%B3%D9%88%D9%85%20%D8%B1%D9%82%D9%85%20%202.96.906%20%20%D9%84%D8%AA%D8%B7%D8%A8%D9%8A%D9%86%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D8%A9-1739286919682.pdf'
  ),
  src(
    'Loi n° 5-96, version consolidée au 22 août 2024, articles 95 à 97 (Adala)',
    'Law 5-96, consolidated to 22 August 2024, articles 95 to 97 (Adala)',
    'القانون رقم 5.96، صيغة محينة بتاريخ 22 أغسطس 2024، المواد 95 إلى 97 (عدالة)',
    'https://adala.justice.gov.ma/api/uploads/2025/12/03/%D8%B8%D9%87%D9%8A%D8%B1%20%D8%B4%D8%B1%D9%8A%D9%81%20%D8%B1%D9%82%D9%85%201.97.49-1764751267036.pdf'
  ),
  src(
    'Loi n° 17-95 relative aux sociétés anonymes, articles 37 et 361 à 370 (Adala)',
    'Law 17-95 on public limited companies, articles 37 and 361 to 370 (Adala)',
    'القانون رقم 17.95 المتعلق بشركات المساهمة، المواد 37 و361 إلى 370 (عدالة)',
    'https://adala.justice.gov.ma/api/uploads/2024/12/12/Soci%C3%A9t%C3%A9s%20Anonymes-1734015032558.pdf'
  ),
  src(
    'Secrétariat général du gouvernement, Bulletin officiel',
    'General Secretariat of the Government, Official Gazette',
    'الأمانة العامة للحكومة، الجريدة الرسمية',
    'https://www.sgg.gov.ma/'
  ),
  src(
    'Code général des impôts publié par la DGI, article 150 de l’édition 2022 en ligne, et édition 2026 annoncée sur la même page',
    'General Tax Code published by the DGI, article 150 of the 2022 online edition, and the 2026 edition announced on the same page',
    'المدونة العامة للضرائب المنشورة لدى المديرية، المادة 150 من طبعة 2022 المتاحة، وطبعة 2026 المعلن عنها في الصفحة نفسها',
    'https://www.tax.gov.ma/wps/portal/DGI/Documentation-fiscale/Arretes'
  ),
  src(
    'DGI, page « Attestations », radiation de la taxe professionnelle',
    'DGI, “Certificates” page, striking off the professional tax',
    'المديرية العامة للضرائب، صفحة «الشهادات»، التشطيب من الرسم المهني',
    'https://portail.tax.gov.ma/wps/portal/DGI/Vos-impots-procedures/Attestations'
  ),
  src(
    'DGI, page « Taxe professionnelle »',
    'DGI, “Professional tax” page',
    'المديرية العامة للضرائب، صفحة «الرسم المهني»',
    'https://www.tax.gov.ma/wps/portal/DGI/Vos-impots-procedures/Taxe-professionnelle'
  ),
  src(
    'Portail de la Direction générale des impôts',
    'General Tax Directorate portal',
    'بوابة المديرية العامة للضرائب',
    'https://www.tax.gov.ma/'
  ),
  src(
    'CNSS, textes et lois',
    'CNSS, statutes and regulations',
    'الصندوق الوطني للضمان الاجتماعي، نصوص وقوانين',
    'https://www.cnss.ma/ar/content/%D9%86%D8%B5%D9%88%D8%B5-%D9%88%D9%82%D9%88%D8%A7%D9%86%D9%8A%D9%86?language_content_entity=ar'
  ),
  src(
    'OMPIC',
    'OMPIC',
    'المكتب المغربي للملكية الصناعية والتجارية',
    'https://www.ompic.ma/'
  ),
  src(
    'Portail juridique du ministère de la Justice (Adala)',
    'Legal portal of the Ministry of Justice (Adala)',
    'البوابة القانونية لوزارة العدل (عدالة)',
    'https://adala.justice.gov.ma/'
  ),
  src(
    'Portail de l’investissement',
    'Investment portal',
    'بوابة الاستثمار',
    'https://www.invest.gov.ma/'
  )
];

export const lot5 = [
  {
    slug:'radiation-registre-de-commerce-maroc-2026',
    category:t('Modification de société', 'Company changes', 'تعديل الشركة'),
    fiscal:true,
    modifiedOn:'2026-11-28',
    updated:t(
      'Dernière mise à jour : 28 novembre 2026. Les textes et les portails peuvent changer. Relisez la source officielle avant de décider.',
      'Last updated: 28 November 2026. Statutes and portals can change. Read the official source again before you decide.',
      'آخر تحيين: 28 نوفمبر 2026. قد تتغير النصوص والبوابات. أعيدوا قراءة المصدر الرسمي قبل القرار.'
    ),
    title:t(
      'Radiation du registre de commerce au Maroc 2026',
      'Striking a business off the Moroccan trade register in 2026',
      'التشطيب من السجل التجاري بالمغرب 2026'
    ),
    description:t(
      'La radiation sort une personne ou une société du registre de commerce. Elle se demande au greffe, ou elle est ordonnée par le président du tribunal. Ce guide 2026 reprend le Code de commerce consolidé, sans délai ni frais que ce texte ne donne pas. Le cabinet ne délivre pas la radiation.',
      'Striking off takes a person or a company off the trade register. It is requested at the court registry, or ordered by the president of the court. This 2026 guide follows the consolidated Commercial Code, with no timeline or fee that text does not give. The firm does not issue the striking-off.',
      'التشطيب يخرج شخصاً أو شركة من السجل التجاري. ويُطلب بكتابة الضبط، أو يأمر به رئيس المحكمة. ويعيد دليل 2026 مدونة التجارة المحينة، بلا أجل ولا رسم لا يعطيهما هذا النص. والمكتب لا يسلم التشطيب.'
    ),
    sections:[
      {
        heading:t('Trois cas, pas une seule formalité', 'Three cases, not one formality', 'ثلاث حالات، لا إجراء واحد'),
        paragraphs:[
          t(
            'Le registre de commerce note les immatriculations, les modifications et les radiations. La radiation n’est pas la dissolution, et elle n’est pas la liquidation. La dissolution décide la fin du contrat de société. La liquidation réalise l’actif et paie les dettes. La radiation enlève l’inscription. Le [guide de la dissolution](guides/dissoudre-et-liquider-societe-maroc) et le [guide de la SARL à associé unique](guides/dissolution-de-societe-sarl-au-maroc) traitent de la décision. Le [guide du registre](guides/registre-de-commerce-maroc) traite de l’inscription. Cette page traite de la sortie.',
            'The trade register records registrations, amendments and striking-off. Striking off is not dissolution, and it is not liquidation. Dissolution decides the end of the company contract. Liquidation realises the assets and pays the debts. Striking off removes the entry. The [dissolution guide](guides/dissoudre-et-liquider-societe-maroc) and the [single-member SARL guide](guides/dissolution-de-societe-sarl-au-maroc) deal with the decision. The [register guide](guides/registre-de-commerce-maroc) deals with the entry. This page deals with the exit.',
            'السجل التجاري يقيد التسجيلات والتعديلات والتشطيبات. والتشطيب ليس الحل، وليس التصفية. والحل يقرر نهاية عقد الشركة. والتصفية تحقق الأصول وتؤدي الديون. والتشطيب يزيل القيد. ويعالج [دليل الحل](guides/dissoudre-et-liquider-societe-maroc) و[دليل الشركة ذات الشريك الوحيد](guides/dissolution-de-societe-sarl-au-maroc) القرار. ويعالج [دليل السجل](guides/registre-de-commerce-maroc) القيد. وهذه الصفحة تعالج الخروج.'
          ),
          t(
            'L’article 51 de la loi n° 15-95, dans la version consolidée au 29 janvier 2026, impose la radiation quand le commerçant cesse son commerce, ou quand il décède sans cession du fonds, ou quand la société est dissoute. La même règle vise une succursale ou une agence. La demande peut être présentée par le commerçant, par ses héritiers, par le liquidateur, ou par les gérants et les membres des organes d’administration ou de direction en fonction pendant la dissolution. Avant la radiation, les inscriptions doivent être apurées et les créanciers titulaires d’un gage informés. Ce guide ne dresse pas la liste des pièces du greffe : le décret n° 2-96-906 applique le chapitre du registre, et le greffe du tribunal de commerce dit ce qu’il exige ce jour-là.',
            'Article 51 of Law 15-95, in the text consolidated to 29 January 2026, requires striking off when the merchant stops trading, or dies without a transfer of the business, or when the company is dissolved. The same rule covers a branch or an agency. The request may be made by the merchant, by the heirs, by the liquidator, or by the managers and the members of the administrative or management bodies in office during the dissolution. Before striking off, the entries must be cleared and the creditors holding a pledge informed. This guide does not draw up the registry’s document list: Decree 2-96-906 applies the chapter on the register, and the commercial-court registry says what it requires on the day.',
            'تلزم المادة 51 من القانون رقم 15.95، في الصيغة المحينة بتاريخ 29 يناير 2026، بالتشطيب حين يتوقف التاجر عن تجارته، أو حين يتوفى دون تفويت الأصل التجاري، أو حين تُحل الشركة. والقاعدة نفسها تخص فرعاً أو وكالة. ويمكن أن يقدم الطلب التاجر، أو ورثته، أو المصفي، أو المسيرون وأعضاء أجهزة الإدارة أو التدبير المزاولون أثناء الحل. وقبل التشطيب، تُصفى التقييدات ويُخبر الدائنون المرتهنون. ولا يضع هذا الدليل لائحة وثائق كتابة الضبط: المرسوم رقم 2.96.906 يطبق باب السجل، وكتابة ضبط المحكمة التجارية تقول ما تقتضيه ذلك اليوم.'
          )
        ]
      },
      {
        heading:t('La radiation d’office', 'Striking off by the court', 'التشطيب التلقائي'),
        paragraphs:[
          t(
            'L’article 54 vise le commerçant. Il est radié d’office s’il est frappé d’une interdiction d’exercer, par une décision passée en force de chose jugée ; s’il est décédé depuis plus d’un an ; ou s’il est établi qu’il a cessé depuis plus de trois ans l’activité pour laquelle il était inscrit. Ce n’est pas une demande de l’intéressé. C’est une radiation que le registre peut faire sans lui.',
            'Article 54 concerns the merchant. The merchant is struck off by the court if banned from trading by a final judgment; if dead for more than one year; or if it is established that the activity for which the merchant was registered stopped more than three years earlier. That is not a request by the person. It is a striking-off the register can make without them.',
            'المادة 54 تخص التاجر. ويُشطب تلقائياً إذا صدر في حقه منع من مزاولة النشاط بمقرر اكتسى قوة الأمر المقضي به؛ أو إذا توفي منذ أكثر من سنة؛ أو إذا ثبت أنه توقف منذ أكثر من ثلاث سنوات عن النشاط الذي قُيد من أجله. وهذا ليس طلب المعني. بل تشطيب يمكن للسجل أن يجريه من دونه.'
          ),
          t(
            'L’article 55, complété par la loi n° 89-17, vise le commerçant et la personne morale. La radiation d’office part de la clôture d’une procédure de règlement ou de liquidation judiciaire. Elle part aussi après une année à compter de la date de l’inscription de la dissolution. Le même article exige que le délai entre cette radiation et la date de publication du procès-verbal de nomination du liquidateur ne soit pas inférieur à soixante jours. Le liquidateur peut demander une prolongation de la liquidation, valable un an, renouvelable d’année en année. Le président du tribunal statue sur cette demande avant qu’elle soit portée par une inscription modificative. L’article 56 dit que la radiation d’office se fait par ordonnance du président du tribunal. L’article 57 permet au greffier d’annuler une radiation d’office fondée sur des informations qui se révèlent inexactes, là encore sur ordonnance du président.',
            'Article 55, supplemented by Law 89-17, concerns the merchant and the legal entity. Striking off by the court starts from the close of a reorganisation or judicial-liquidation proceeding. It also starts one year after the date the dissolution was entered. The same article requires that the time between that striking-off and the date of publication of the minutes appointing the liquidator is not shorter than sixty days. The liquidator may ask for an extension of the liquidation, valid for one year, renewable year by year. The president of the court rules on that request before it is entered by an amending registration. Article 56 says striking off by the court is done by order of the president of the court. Article 57 lets the clerk cancel a striking-off by the court that rested on information later shown to be wrong, again by order of the president.',
            'المادة 55، المتممة بالقانون رقم 89.17، تخص التاجر والشخص الاعتباري. ويبدأ التشطيب التلقائي من اختتام مسطرة التسوية أو التصفية القضائية. ويبدأ أيضاً بعد سنة من تاريخ تقييد حل الشركة. وتشترط المادة نفسها ألا يقل الأجل بين هذا التشطيب وتاريخ نشر محضر تعيين المصفي عن ستين يوماً. ويمكن للمصفي أن يطلب تمديد آجال التصفية، صالحاً لسنة واحدة، قابلاً للتجديد سنة فسنة. ويبت رئيس المحكمة في الطلب قبل تقييده بتقييد تعديلي. وتقول المادة 56 إن التشطيب التلقائي يتم بأمر من رئيس المحكمة. وتجيز المادة 57 لكاتب الضبط إلغاء تشطيب تلقائي بُني على معلومات تبين أنها غير صحيحة، وذلك أيضاً بأمر من الرئيس.'
          )
        ]
      },
      {
        heading:t('Le dépôt qui constate la fin', 'The filing that records the end', 'الإيداع الذي يثبت النهاية'),
        paragraphs:[
          t(
            'Pour une société à responsabilité limitée, l’article 97 de la loi n° 5-96 soumet aux mêmes conditions de dépôt et de publication que les articles 95 et 96 l’acte qui constate la dissolution, avec le nom du liquidateur et le siège de la liquidation, et l’acte qui constate la clôture de la liquidation. L’article 95 vise le dépôt, en deux exemplaires, au greffe du tribunal du siège. L’article 94 met ces formalités à la charge du liquidateur pendant la liquidation, sous sa responsabilité. Pour une société anonyme, l’article 37 de la loi n° 17-95 vise le même dépôt et la même publication, et fixe le délai de ces publications à trente jours à compter de l’acte. L’article 370 de la même loi décrit l’avis de clôture signé par le liquidateur, publié dans un journal d’annonces légales, et au Bulletin officiel si la société a fait publiquement appel à l’épargne. Le secrétariat général du gouvernement publie ce bulletin.',
            'For a limited-liability company, article 97 of Law 5-96 subjects to the same filing and publication conditions as articles 95 and 96 the deed recording the dissolution, with the liquidator’s name and the seat of the liquidation, and the deed recording the close of the liquidation. Article 95 concerns filing, in two copies, at the registry of the court of the registered office. Article 94 places these formalities on the liquidator during the liquidation, under the liquidator’s responsibility. For a public limited company, article 37 of Law 17-95 covers the same filing and the same publication, and sets the time for those publications at thirty days from the deed. Article 370 of the same law describes the notice of closure signed by the liquidator, published in a legal-announcements newspaper, and in the Official Gazette if the company has made a public offering. The General Secretariat of the Government publishes that gazette.',
            'بالنسبة إلى الشركة ذات المسؤولية المحدودة، تخضع المادة 97 من القانون رقم 5.96 لنفس شروط الإيداع والنشر المنصوص عليها في المادتين 95 و96 العقد المثبت للحل، مع اسم المصفي ومقر التصفية، والعقد المثبت لقفل التصفية. والمادة 95 تخص الإيداع، من نظيرين، بكتابة ضبط محكمة المقر. والمادة 94 تضع هذه الإجراءات على المصفي أثناء التصفية، تحت مسؤوليته. وبالنسبة إلى شركة المساهمة، تخص المادة 37 من القانون رقم 17.95 الإيداع والنشر نفسهما، وتحدد أجل هذه المنشورات في ثلاثين يوماً من تاريخ المحرر. وتصف المادة 370 من القانون نفسه إعلان القفل الموقع من المصفي، المنشور في جريدة للإعلانات القانونية، وفي الجريدة الرسمية إذا كانت الشركة قد دعت الجمهور إلى الاكتتاب. وتنشر الأمانة العامة للحكومة هذه الجريدة.'
          ),
          t(
            'Le registre local est tenu au greffe. Le Code prévoit aussi un registre central. Le texte consolidé de 2026 dit qu’il est tenu par l’Office marocain de la propriété industrielle et commerciale, qu’il est public, et qu’il se consulte par la plateforme électronique de création et d’accompagnement des entreprises. Une mention portée au registre local est transcrite au registre central. Felexia Conseils n’est pas ce greffe et n’est pas cet office. Le cabinet peut aider à rassembler la décision et à lire ce que le greffe demande. Il ne radie pas la société.',
            'The local register is kept at the court registry. The Code also provides a central register. The 2026 consolidated text says it is kept by the Moroccan Office of Industrial and Commercial Property, that it is public, and that it is consulted through the electronic platform for forming and supporting companies. An entry made on the local register is transcribed on the central register. Felexia Conseils is not that registry and is not that office. The firm can help gather the decision and read what the registry asks for. It does not strike the company off.',
            'السجل المحلي يُمسك بكتابة الضبط. والمدونة تنص أيضاً على سجل مركزي. وتقول الصيغة المحينة لسنة 2026 إنه يمسكه المكتب المغربي للملكية الصناعية والتجارية، وإنه عمومي، وإن الاطلاع عليه يتم عبر المنصة الإلكترونية لإحداث المقاولات ومواكبتها. والقيد في السجل المحلي يُنقل إلى السجل المركزي. وFelexia Conseils ليس كتابة الضبط هذه وليس هذا المكتب. ويمكن للمكتب المساعدة على جمع القرار وقراءة ما تطلبه كتابة الضبط. وهو لا يشطب الشركة.'
          )
        ]
      },
      {
        heading:t('L’impôt et les déclarations de salaires', 'Tax and wage filings', 'الضريبة وتصاريح الأجور'),
        paragraphs:[
          t(
            'L’article 51 ajoute une règle fiscale précise : le redevable ne peut être radié des rôles de la taxe professionnelle de l’activité pour laquelle il est immatriculé qu’en justifiant d’abord de la radiation du registre. La page « Attestations » de la Direction générale des impôts le retrouve pour la demande de radiation de cette taxe, en cas de cessation ou de liquidation : elle demande, parmi les pièces, une copie du certificat de radiation du registre, ou un certificat de non-inscription, et elle ne délivre l’attestation qu’aux contribuables à jour de leurs déclarations et paiements. En cas de liquidation, la même page demande aussi les procès-verbaux de dissolution et de clôture déjà enregistrés, le rapport du liquidateur, et le jugement de liquidation judiciaire s’il y en a un. Elle précise que l’attestation n’est délivrée qu’après la liquidation définitive. C’est la DGI qui la délivre, pas le cabinet.',
            'Article 51 adds a precise tax rule: the taxpayer cannot be struck off the professional-tax roll for the activity for which the taxpayer is registered without first proving striking-off from the register. The General Tax Directorate’s “Certificates” page repeats this for the request to strike that tax off, in the event of cessation or liquidation: among the documents, it asks for a copy of the certificate of striking-off from the register, or a certificate of non-registration, and it issues the certificate only to taxpayers whose filings and payments are up to date. In a liquidation, the same page also asks for the already registered minutes of dissolution and of closure, the liquidator’s report, and the judicial-liquidation judgment if there is one. It states that the certificate is issued only after the liquidation is final. The DGI issues it, not the firm.',
            'تضيف المادة 51 قاعدة جبائية محددة: لا يمكن شطب الملزم من جداول الرسم المهني الخاصة بالنشاط الذي سُجل من أجله إلا بإثبات التشطيب من السجل أولاً. وتعيد صفحة «الشهادات» للمديرية العامة للضرائب ذلك في طلب التشطيب من هذا الرسم، عند التوقف أو التصفية: تطلب، من بين الوثائق، نسخة من شهادة التشطيب من السجل، أو شهادة عدم التسجيل، ولا تسلم الشهادة إلا للملزمين الذين تصاريحهم ومدفوعاتهم في وضع قانوني. وعند التصفية، تطلب الصفحة نفسها أيضاً محاضر الحل والقفل المسجلة سلفاً، وتقرير المصفي، وحكم التصفية القضائية إن وُجد. وتبين أن الشهادة لا تُسلم إلا بعد التصفية النهائية. والمديرية تسلمها، لا المكتب.'
          ),
          t(
            'La déclaration de cessation totale, de cession, de fusion, de scission ou de transformation est celle de l’article 150 du Code général des impôts dans l’édition 2022 mise en ligne par la DGI. Les contribuables la souscrivent dans les quarante-cinq jours de l’événement. Si la cessation est suivie d’une liquidation, cette déclaration indique le liquidateur et l’étendue de ses pouvoirs. Pendant la liquidation, une déclaration des résultats provisoires est souscrite pour chaque période de douze mois, dans le délai des articles 20 et 82 du même code. Dans les quarante-cinq jours de la clôture des opérations, le liquidateur souscrit la déclaration du résultat final. La DGI publie aussi, sur sa page documentaire, une édition 2026 du code, datée du 30 décembre 2025. Relisez cette édition avant d’agir : une loi de finances peut déplacer un article. Ce guide ne recopie pas l’article 114, qui n’est pas, dans le texte lu, la déclaration de cessation. La page de la taxe professionnelle, qui résume la loi n° 47-06, indique de son côté une déclaration de cession, de cessation, de transfert ou de transformation dans les quarante-cinq jours de l’événement. Ce n’est pas le même imprimé que l’article 150.',
            'The declaration of total cessation, transfer, merger, split or transformation is article 150 of the General Tax Code in the 2022 edition published online by the DGI. Taxpayers file it within forty-five days of the event. If cessation is followed by liquidation, that declaration names the liquidator and the extent of the powers. During the liquidation, a declaration of provisional results is filed for each twelve-month period, within the time in articles 20 and 82 of the same code. Within forty-five days of the close of the operations, the liquidator files the declaration of the final result. The DGI also publishes, on its documentation page, a 2026 edition of the code, dated 30 December 2025. Reread that edition before you act: a finance law can move an article. This guide does not copy article 114, which is not, in the text read, the cessation declaration. The professional-tax page, which summarises Law 47-06, separately indicates a declaration of transfer, cessation, move or transformation within forty-five days of the event. That is not the same form as article 150.',
            'تصريح التوقف الكلي أو التفويت أو الاندماج أو الانقسام أو التحويل هو المادة 150 من المدونة العامة للضرائب في طبعة 2022 التي نشرتها المديرية. ويودعه الملزمون خلال خمسة وأربعين يوماً من الواقعة. وإذا تلا التوقف تصفية، يبين هذا التصريح المصفي ومدى سلطاته. وأثناء التصفية، يودع تصريح بالنتائج المؤقتة عن كل فترة من اثني عشر شهراً، في أجل المادتين 20 و82 من المدونة نفسها. وخلال خمسة وأربعين يوماً من قفل العمليات، يودع المصفي تصريح النتيجة النهائية. وتنشر المديرية أيضاً، في صفحتها الوثائقية، طبعة 2026 من المدونة، مؤرخة في 30 ديسمبر 2025. أعيدوا قراءة هذه الطبعة قبل التصرف: فقد ينقل قانون مالية مادة. ولا ينسخ هذا الدليل المادة 114، فهي ليست، في النص المقروء، تصريح التوقف. وتبين صفحة الرسم المهني، التي تلخص القانون رقم 47.06، من جهتها تصريح تفويت أو توقف أو نقل أو تحويل خلال خمسة وأربعين يوماً من الواقعة. وليس المطبوع نفسه المادة 150.'
          ),
          t(
            'La cessation temporaire n’est pas une radiation. L’article 150 bis du même code permet, pour les entreprises qu’il vise, une déclaration de cessation temporaire, dans le mois qui suit la clôture du dernier exercice, pour deux exercices renouvelables une fois. L’entreprise continue alors certaines déclarations. Le [guide déjà en ligne](guides/cessation-temporaire-dactivite-cadre-legal) développe ce régime. Une société radiée n’est plus dans ce régime : elle est sortie du registre. Si la société a eu des salariés, les déclarations de salaires et l’affiliation relèvent de la CNSS. Les pages de textes consultées sur cnss.ma ne décrivent pas, en une seule règle lue pour ce guide, le formulaire ni le délai de radiation de l’employeur. Demandez-les à la caisse. N’inventez pas un délai.',
            'Temporary cessation is not striking off. Article 150 bis of the same code allows, for the businesses it covers, a declaration of temporary cessation, in the month after the close of the last period, for two periods renewable once. The business then continues certain filings. The [guide already online](guides/cessation-temporaire-dactivite-cadre-legal) develops that regime. A company that has been struck off is no longer in that regime: it has left the register. If the company had employees, wage filings and affiliation belong to the CNSS. The statute pages consulted on cnss.ma do not describe, in one rule read for this guide, the form or the time for striking an employer off. Ask the fund for them. Do not invent a time.',
            'التوقف المؤقت ليس تشطيباً. وتجيز المادة 150 مكررة من المدونة نفسها، للمقاولات التي تعنيها، تصريح توقف مؤقت، في الشهر الذي يلي قفل آخر فترة، لفترتين قابلتين للتجديد مرة. وتواصل المقاولة آنذاك بعض التصاريح. ويفصل [الدليل المنشور](guides/cessation-temporaire-dactivite-cadre-legal) هذا النظام. والشركة المشطبة لم تعد في هذا النظام: لقد خرجت من السجل. وإذا كان للشركة أجراء، فتصاريح الأجور والانخراط من اختصاص الصندوق الوطني للضمان الاجتماعي. وصفحات النصوص التي رُجع إليها في cnss.ma لا تصف، في قاعدة واحدة قُرئت لهذا الدليل، المطبوع ولا أجل تشطيب المشغل. اطلبوهما من الصندوق. ولا تخترعوا أجلاً.'
          )
        ]
      },
      {
        heading:t('Ce qu’un cabinet privé peut faire', 'What a private firm can do', 'ما يمكن لمكتب خاص أن يفعله'),
        paragraphs:[
          t(
            'Felexia Conseils est un cabinet privé de conseil à Marrakech. Il peut relire la décision, distinguer une cessation d’activité d’une dissolution, et préparer les questions à poser au greffe, à la direction des impôts et à la CNSS. Il ne signe pas la radiation, il ne la « fait sortir », et il ne remplace pas le liquidateur. Le portail de l’investissement oriente vers les centres régionaux. Il n’est pas le greffe du tribunal de commerce.',
            'Felexia Conseils is a private advisory firm in Marrakech. It can reread the decision, separate a cessation of activity from a dissolution, and prepare the questions to put to the registry, the tax directorate and the CNSS. It does not sign the striking-off, it does not “get it issued”, and it does not replace the liquidator. The investment portal points to the regional centres. It is not the registry of the commercial court.',
            'Felexia Conseils مكتب خاص للاستشارة بمراكش. ويمكنه إعادة قراءة القرار، وتمييز توقف النشاط عن الحل، وتحضير الأسئلة التي تُطرح على كتابة الضبط ومديرية الضرائب والصندوق. وهو لا يوقع التشطيب، ولا «يخرجه»، ولا يحل محل المصفي. وبوابة الاستثمار توجه إلى المراكز الجهوية. وهي ليست كتابة ضبط المحكمة التجارية.'
          ),
          t(
            'Le périmètre se fixe dans un devis, après lecture du dossier. Aucun honoraire n’est indiqué ici. La page [contact](contact) sert à demander un échange. N’y déposez pas les identifiants du téléservice. Apportez la situation : personne physique ou société, dissolution déjà décidée ou non, salariés ou non, et le tribunal du siège.',
            'The scope is set in a quote, after the file is read. No fee is stated here. The [contact](contact) page is for requesting a conversation. Do not put online-service identifiers in it. Bring the situation: a natural person or a company, whether dissolution has already been decided, whether there are employees, and the court of the registered office.',
            'يُحدد النطاق في عرض، بعد قراءة الملف. ولا تُذكر هنا أي أتعاب. وصفحة [الاتصال](contact) لطلب حوار. ولا تضعوا فيها معرّفات الخدمة عن بعد. أحضروا الوضعية: شخص ذاتي أو شركة، وهل قُرر الحل سلفاً، وهل يوجد أجراء، ومحكمة المقر.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('La société disparaît-elle quand l’activité s’arrête ?', 'Does the company disappear when the activity stops?', 'هل تختفي الشركة حين يتوقف النشاط؟'), a:t('Non. Tant qu’elle est inscrite, l’article 51 n’est pas encore exécuté. L’arrêt de l’activité, la dissolution, la liquidation et la radiation sont des étapes distinctes.', 'No. As long as it is registered, article 51 has not yet been carried out. Stopping the activity, dissolution, liquidation and striking-off are separate steps.', 'لا. ما دامت مقيدة، فالمادة 51 لم تُنفذ بعد. وتوقف النشاط والحل والتصفية والتشطيب مراحل متمايزة.')},
      {q:t('Qui radie la société ?', 'Who strikes the company off?', 'من يشطب الشركة؟'), a:t('Le greffe, sur demande des personnes que l’article 51 énumère, ou d’office par ordonnance du président du tribunal dans les cas des articles 54 à 56. Felexia Conseils ne délivre pas cet acte.', 'The registry, on the request of the persons article 51 lists, or by the court under an order of the president in the cases in articles 54 to 56. Felexia Conseils does not issue that act.', 'كتابة الضبط، بطلب من الأشخاص الذين تعدهم المادة 51، أو تلقائياً بأمر من رئيس المحكمة في حالات المواد 54 إلى 56. وFelexia Conseils لا يسلم هذا المحرر.')},
      {q:t('Quel délai le Code fixe-t-il après la dissolution ?', 'What time does the Code set after dissolution?', 'أي أجل تحدده المدونة بعد الحل؟'), a:t('Dans le texte consolidé au 29 janvier 2026, l’article 55 place la radiation d’office après une année à compter de l’inscription de la dissolution, avec un écart d’au moins soixante jours par rapport à la publication du procès-verbal de nomination du liquidateur, sauf prolongation décidée par le président. Ce n’est pas un délai de traitement du greffe, que ce guide ne publie pas.', 'In the text consolidated to 29 January 2026, article 55 places striking-off by the court one year after the dissolution was entered, with a gap of at least sixty days from the publication of the minutes appointing the liquidator, unless the president grants an extension. That is not a processing time of the registry, which this guide does not publish.', 'في الصيغة المحينة بتاريخ 29 يناير 2026، تضع المادة 55 التشطيب التلقائي بعد سنة من تقييد الحل، بفارق لا يقل عن ستين يوماً عن نشر محضر تعيين المصفي، ما لم يمنح الرئيس تمديداً. وهذا ليس أجل معالجة كتابة الضبط، وهو ما لا ينشره هذا الدليل.')},
      {q:t('Faut-il d’abord la radiation pour quitter la taxe professionnelle ?', 'Is striking-off required before leaving the professional tax?', 'هل يلزم التشطيب أولاً لمغادرة الرسم المهني؟'), a:t('Oui, pour l’activité concernée. L’article 51 l’écrit, et la page des attestations de la DGI demande le certificat de radiation du registre pour délivrer l’attestation de radiation de la taxe professionnelle.', 'Yes, for the activity concerned. Article 51 says so, and the DGI certificates page asks for the certificate of striking-off from the register in order to issue the certificate striking off the professional tax.', 'نعم، بالنسبة إلى النشاط المعني. والمادة 51 تكتبه، وصفحة شهادات المديرية تطلب شهادة التشطيب من السجل لتسليم شهادة التشطيب من الرسم المهني.')}
    ],
    links:[
      link('guides/dissoudre-et-liquider-societe-maroc', 'Dissolution et liquidation', 'Dissolution and liquidation', 'الحل والتصفية'),
      link('guides/dissolution-de-societe-sarl-au-maroc', 'Dissolution d’une SARL à associé unique', 'Dissolution of a single-member SARL', 'حل شركة ذات شريك وحيد'),
      link('guides/registre-de-commerce-maroc', 'Le registre de commerce', 'The trade register', 'السجل التجاري'),
      link('guides/cessation-temporaire-dactivite-cadre-legal', 'Cessation temporaire', 'Temporary cessation', 'التوقف المؤقت'),
      link('guides/attestation-regularite-fiscale-dgi-2026', 'Attestation de régularité fiscale', 'Tax regularity certificate', 'شهادة الوضعية الجبائية'),
      link('contact', 'Demander un échange', 'Request a conversation', 'طلب حوار')
    ],
    sources
  }
];
