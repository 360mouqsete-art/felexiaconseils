const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const localSources = [
  src('Bulletin officiel', 'Official Gazette', 'الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Loi n° 49-16, baux commerciaux', 'Law 49-16, commercial leases', 'القانون رقم 49-16، الكراء التجاري', 'https://www.sgg.gov.ma/'),
  src('OMPIC', 'OMPIC', 'المكتب المغربي للملكية الصناعية والتجارية', 'https://www.ompic.ma/'),
  src('Direction générale des impôts', 'General Tax Directorate', 'المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('CNSS', 'CNSS', 'الصندوق الوطني للضمان الاجتماعي', 'https://www.cnss.ma/'),
  src('Portail de l’investissement', 'Investment portal', 'بوابة الاستثمار', 'https://www.invest.gov.ma/'),
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/')
];

export const lot3b = [
  {
    slug:'ouvrir-un-restaurant-au-maroc',
    category:t('Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
    fiscal:true,
    title:t('Ouvrir un restaurant au Maroc', 'Opening a restaurant in Morocco', 'فتح مطعم بالمغرب'),
    description:t(
      'Un restaurant au Maroc est une société ou un statut, un local dont le bail et les autorisations correspondent à l’activité, et des salariés déclarés. Aucun coût d’ouverture ni délai de licence n’est publié ici.',
      'A restaurant in Morocco is a company or a status, premises whose lease and authorisations match the activity, and declared employees. No opening cost and no licence timeline is published here.',
      'المطعم بالمغرب شركة أو وضع، ومحل يطابق كراؤه وتراخيصه النشاط، وأجراء مصرَّح بهم. ولا يُنشر هنا أي تكلفة فتح ولا أجل رخصة.'
    ),
    sections:[
      {
        heading:t('Le local avant l’enseigne', 'The premises before the sign', 'المحل قبل اللافتة'),
        paragraphs:[
          t(
            'On n’ouvre pas un restaurant sur une domiciliation. Le public entre, la cuisine stocke, les odeurs et les horaires concernent l’immeuble. Le [bail](guides/bail-commercial-droits-des-parties) se lit avant les travaux : activité permise, terrasse, enseigne, horaires. La loi n° 49-16 régit le bail commercial lorsqu’elle s’applique. Elle ne remplace pas l’autorisation de la commune ni les règles sanitaires. À Marrakech, un local dans la médina ajoute souvent une contrainte de copropriété ou de façade. Le promettre « simple » avant la visite du titre est une erreur de calendrier, pas un détail.',
            'You do not open a restaurant on a domiciliation. The public comes in, the kitchen stores, and smells and hours concern the building. The [lease](guides/bail-commercial-droits-des-parties) is read before the works: permitted activity, terrace, sign, hours. Law 49-16 governs the commercial lease where it applies. It does not replace the commune’s authorisation or the health rules. In Marrakech, premises in the medina often add a co-ownership or façade constraint. Promising that it is “simple” before reading the title is a calendar mistake, not a detail.',
            'لا يُفتح مطعم على توطين. فالعموم يدخل، والمطبخ يخزن، والروائح والأوقات تخص العمارة. ويُقرأ [الكراء](guides/bail-commercial-droits-des-parties) قبل الأشغال: النشاط المسموح، والشرفة، واللافتة، والأوقات. والقانون رقم 49-16 يحكم الكراء التجاري حين ينطبق. وهو لا يعوّض رخصة الجماعة ولا القواعد الصحية. وبمراكش، محل في المدينة العتيقة يضيف غالباً قيداً للملكية المشتركة أو للواجهة. والوعد بأنه «بسيط» قبل قراءة السند خطأ في الجدول، لا تفصيل.'
          ),
          t(
            'Les autorisations dépendent de l’adresse et de ce que vous servez. Restauration, terrasse, musique, vente d’alcool : chaque sujet a son interlocuteur. Ce guide ne publie pas la liste, parce qu’elle n’est pas la même à Marrakech et dans une autre commune, et parce qu’elle change. Demandez-la à la commune et aux administrations compétentes avant de commander une cuisine. Une enseigne posée sans accord se retire. Le centre régional d’investissement peut orienter. Il ne délivre pas, à lui seul, toutes les autorisations d’exploitation.',
            'Authorisations depend on the address and on what you serve. Catering, a terrace, music, the sale of alcohol: each subject has its own contact. This guide does not publish the list, because it is not the same in Marrakech and in another commune, and because it changes. Ask the commune and the competent administrations for it before you order a kitchen. A sign put up without consent comes down. The regional investment centre can point you. It does not, by itself, issue every operating authorisation.',
            'التراخيص تتوقف على العنوان وعلى ما تقدمونه. الإطعام، والشرفة، والموسيقى، وبيع الكحول: لكل موضوع مخاطبه. ولا ينشر هذا الدليل اللائحة، لأنها ليست واحدة بمراكش وفي جماعة أخرى، ولأنها تتغير. اطلبوها من الجماعة والإدارات المختصة قبل طلب مطبخ. واللافتة الموضوعة بلا موافقة تُنزع. والمركز الجهوي للاستثمار يمكنه التوجيه. وهو لا يسلم، وحده، كل رخص الاستغلال.'
          )
        ]
      },
      {
        heading:t('La société qui exploite', 'The company that operates', 'الشركة التي تستغل'),
        paragraphs:[
          t(
            'Le restaurant est exploité par une personne identifiée. Une société, en général, lorsque plusieurs personnes financent, lorsqu’il y a des salariés, ou lorsqu’un bail est signé au nom de l’exploitation. L’auto-entrepreneur n’est envisageable que si l’activité est admise et si les conditions du portail ae.gov.ma sont remplies. Beaucoup d’activités de restauration n’y entrent pas. Vérifiez avant de choisir. Le [guide des formes](formes-juridiques) et le [guide freelance](guides/devenir-freelance-au-maroc) évitent de coller une étiquette sur un local déjà loué.',
            'The restaurant is operated by an identified person. A company, as a rule, when several people finance it, when there are employees, or when a lease is signed in the name of the business. The auto-entrepreneur status is conceivable only if the activity is allowed and the conditions on the ae.gov.ma portal are met. Many catering activities do not fit. Check before you choose. The [legal forms guide](formes-juridiques) and the [freelancer guide](guides/devenir-freelance-au-maroc) avoid sticking a label on premises already rented.',
            'يستغل المطعم شخص معروف. وشركة، في الغالب، حين يمول عدة أشخاص، أو حين يوجد أجراء، أو حين يُوقَّع كراء باسم الاستغلال. ولا يُتصور المقاول الذاتي إلا إذا كان النشاط مقبولاً واستُوفيت شروط بوابة ae.gov.ma. وكثير من أنشطة الإطعام لا تدخل. تحققوا قبل الاختيار. و[دليل الأشكال](formes-juridiques) و[دليل العمل الحر](guides/devenir-freelance-au-maroc) يجنبان لصق تسمية على محل مكترى سلفاً.'
          ),
          t(
            'Le capital finance une partie des travaux et du stock. Il n’est pas le coût de l’ouverture, et aucun montant n’est proposé ici. Le [guide du capital](guides/capital-social-maroc-quel-montant) sépare l’apport des dépenses. Si un associé avance le matériel, qualifiez l’opération : apport en nature, compte courant, ou achat par la société. Un four « prêté » sans écrit devient un conflit le jour où l’associé part. Le [pacte](guides/pacte-associes-que-prevoir) est utile dès qu’il y a deux porteurs, l’un en salle et l’autre à l’étranger.',
            'Capital finances part of the works and the stock. It is not the cost of opening, and no amount is suggested here. The [capital guide](guides/capital-social-maroc-quel-montant) separates the contribution from the expenses. If a shareholder advances the equipment, classify the operation: a contribution in kind, a current account, or a purchase by the company. An oven “lent” with no writing becomes a conflict on the day the shareholder leaves. The [agreement](guides/pacte-associes-que-prevoir) is useful as soon as there are two founders, one in the dining room and the other abroad.',
            'يمول رأس المال جزءاً من الأشغال والمخزون. وهو ليس تكلفة الفتح، ولا يُقترح هنا أي مبلغ. ويفصل [دليل رأس المال](guides/capital-social-maroc-quel-montant) المساهمة عن المصاريف. وإذا سبق شريك المعدات، فكيّفوا العملية: مساهمة عينية، أو حساب جار، أو شراء من الشركة. وفرن «مُعار» بلا كتابة يصبح نزاعاً يوم يغادر الشريك. و[الاتفاق](guides/pacte-associes-que-prevoir) مفيد منذ وجود حاملَين، واحد في القاعة والآخر في الخارج.'
          )
        ]
      },
      {
        heading:t('Les équipes et l’impôt', 'The teams and the tax', 'الفرق والضريبة'),
        paragraphs:[
          t(
            'Dès le premier salarié, la société est employeur. Contrat, paie, affiliation et déclarations suivent les règles de la CNSS et du droit du travail. Les barèmes ne sont pas recopiés. Un extra payé en espèces sans déclaration n’est pas une souplesse : c’est un écart. Désignez qui tient les présences quand le gérant n’est pas en salle. Le [guide pour gérer depuis l’étranger](guides/mre-gerer-societe-depuis-letranger) sert si l’exploitant ne vit pas à Marrakech toute l’année. La cuisine, elle, ne se gère pas seulement par message.',
            'From the first employee, the company is an employer. The contract, the payroll, affiliation and filings follow the rules of the CNSS and of labour law. The scales are not copied. An extra paid in cash with no filing is not flexibility: it is a gap. Name who keeps attendance when the manager is not in the dining room. The [guide to running a company from abroad](guides/mre-gerer-societe-depuis-letranger) helps if the operator does not live in Marrakech all year. The kitchen, for its part, is not run only by message.',
            'منذ أول أجير، الشركة مشغّل. والعقد والأجر والانخراط والتصاريح تتبع قواعد الصندوق وقانون الشغل. والتعريفات غير منسوخة. وعامل إضافي يُؤدى نقداً بلا تصريح ليس مرونة: إنه خلل. عيّنوا من يمسك الحضور حين لا يكون المسيّر في القاعة. ويفيد [دليل التسيير من الخارج](guides/mre-gerer-societe-depuis-letranger) إذا كان المستغل لا يعيش بمراكش طوال السنة. والمطبخ، من جهته، لا يُدار بالرسائل فقط.'
          ),
          t(
            'L’impôt de l’activité, la TVA si elle s’applique, et les obligations liées aux recettes se vérifient dans le CGI pour un restaurant, pas pour une activité de conseil. Aucun taux n’est donné. Faites qualifier le régime avant d’imprimer les tickets. La caisse et le compte de la société racontent la même histoire. Un écart permanent entre les deux est le premier sujet qu’un contrôle regarde. La personne chargée des déclarations doit recevoir les pièces chaque mois, pas une boîte en fin d’année.',
            'The tax on the activity, VAT if it applies, and the duties linked to takings are checked in the General Tax Code for a restaurant, not for a consulting activity. No rate is given. Have the regime classified before you print the receipts. The till and the company’s account tell the same story. A permanent gap between the two is the first subject an audit looks at. The person in charge of the filings must receive the documents each month, not a box at year end.',
            'ضريبة النشاط، والضريبة على القيمة المضافة إن انطبقت، والواجبات المرتبطة بالمقبوضات تُتحقق في المدونة لمطعم، لا لنشاط استشارة. ولا يُعطى أي سعر. اطلبوا تكييف النظام قبل طبع التذاكر. والصندوق وحساب الشركة يرويان القصة نفسها. وفرق دائم بينهما أول موضوع ينظر إليه فحص. والمكلف بالتصاريح يجب أن يتلقى الوثائق كل شهر، لا صندوقاً في آخر السنة.'
          )
        ]
      },
      {
        heading:t('Avant le premier service', 'Before the first service', 'قبل أول خدمة'),
        paragraphs:[
          t('Le service n’ouvre pas un dossier incomplet.', 'Service does not open an incomplete file.', 'الخدمة لا تفتح ملفاً ناقصاً.')
        ],
        list:t(
          [
            'Le bail autorise la restauration, la terrasse et l’enseigne prévues.',
            'Les autorisations de la commune et des administrations sanitaires sont demandées sur ce local.',
            'La vente d’alcool, si elle est prévue, est traitée comme une autorisation distincte.',
            'La société ou le statut qui exploite est identifié, et le bail est à son nom.',
            'Les salariés sont déclarés à la CNSS dès l’embauche.',
            'Le régime fiscal est confirmé par un professionnel, sans taux recopié.',
            'La caisse et le compte bancaire sont réconciliés dès le premier mois.'
          ],
          [
            'The lease allows the catering, the terrace and the sign you planned.',
            'The commune’s and the health administrations’ authorisations are requested for these premises.',
            'The sale of alcohol, if planned, is treated as a separate authorisation.',
            'The company or the status that operates is identified, and the lease is in its name.',
            'Employees are filed with the CNSS from hiring.',
            'The tax regime is confirmed by a professional, with no rate copied.',
            'The till and the bank account are reconciled from the first month.'
          ],
          [
            'الكراء يجيز الإطعام والشرفة واللافتة المقررة.',
            'تراخيص الجماعة والإدارات الصحية مطلوبة لهذا المحل.',
            'بيع الكحول، إن كان مقرراً، يُعامل كترخيص مستقل.',
            'الشركة أو الوضع الذي يستغل معروف، والكراء باسمه.',
            'الأجراء مصرَّح بهم لدى الصندوق منذ التشغيل.',
            'النظام الضريبي أكده مهني، بلا سعر منسوخ.',
            'الصندوق والحساب البنكي يُسوَّيان منذ الشهر الأول.'
          ]
        )
      },
      {
        heading:t('Fournisseurs, hygiène et assurance', 'Suppliers, hygiene and insurance', 'المزودون والنظافة والتأمين'),
        paragraphs:[
          t(
            'La cuisine dépend de fournisseurs qui livrent à une adresse et à des heures. Écrivez qui commande et qui contrôle la réception. Un écart entre le bon de livraison et la facture se règle le jour même, pas à la clôture. Les règles sanitaires applicables à la restauration se confirment auprès des administrations compétentes pour votre local. Ce guide n’en fait pas la liste et ne cite pas de température ou de délai de conservation. Afficher un protocole copié d’un autre pays ne remplace pas la règle marocaine du moment.',
            'The kitchen depends on suppliers who deliver to an address and at hours. Write who orders and who checks receipt. A gap between the delivery note and the invoice is settled the same day, not at year end. The health rules that apply to catering are confirmed with the administrations competent for your premises. This guide does not list them and cites no temperature or storage time. Displaying a protocol copied from another country does not replace the Moroccan rule of the moment.',
            'يعتمد المطبخ على مزودين يسلمون في عنوان وفي أوقات. اكتبوا من يطلب ومن يراقب الاستلام. وفرق بين وصل التسليم والفاتورة يُسوى في اليوم نفسه، لا عند الإقفال. والقواعد الصحية المطبقة على الإطعام تُؤكد لدى الإدارات المختصة لمحلكم. ولا يضع هذا الدليل لائحتها ولا يذكر حرارة أو أجل حفظ. وعرض بروتوكول منسوخ من بلد آخر لا يعوّض القاعدة المغربية للحظة.'
          ),
          t(
            'Assurez le local et l’exploitation selon ce que le bail et l’activité exigent. Le contrat d’assurance se lit : qui est assuré, pour quels dommages, et qui prévient. Il ne se résume pas à une quittance. Si la société n’est pas encore immatriculée, ne faites pas courir des travaux lourds sur le seul nom d’un associé sans écrire qui paie et qui sera propriétaire des aménagements. Ces aménagements, à la fin du bail, suivent le contrat et la loi n° 49-16 lorsqu’elle s’applique. Les reprendre pour acquis est une cause classique de conflit avec le bailleur au moment de partir. Avant l’ouverture, faites aussi le tour des accès : eau, électricité, évacuation, et le nom du titulaire de chaque contrat. Un compteur resté au nom du précédent exploitant mélange les factures. Un accès refusé par la copropriété le soir du premier service ne se négocie pas dans l’urgence. Écrivez qui a les clés et qui peut fermer. Si deux associés se relaient, le [pacte](guides/pacte-associes-que-prevoir) dit qui décide d’un embauche ou d’un changement de carte. La salle ne peut pas attendre une discussion entre deux villes pour payer un fournisseur du jour. Le jour de l’ouverture, gardez à portée de main le bail, les autorisations obtenues, la liste des salariés déclarés et le nom de la personne qui tient la caisse. Un contrôle ou un voisin ne se satisfait pas d’un dossier resté chez le cabinet. Felexia Conseils prépare les actes de société. Il ne tient pas la salle. Si une pièce manque, on le sait avant le service, pas pendant.',
            'Insure the premises and the business as the lease and the activity require. The insurance contract is read: who is insured, for which damage, and who gives notice. It is not summed up in a receipt. If the company is not yet registered, do not let heavy works run in an individual shareholder’s name alone without writing who pays and who will own the fittings. Those fittings, at the end of the lease, follow the contract and Law 49-16 where it applies. Treating them as already yours is a classic cause of conflict with the landlord when you leave.',
            'أمّنوا المحل والاستغلال حسب ما يقتضيه الكراء والنشاط. ويُقرأ عقد التأمين: من المؤمن، وعن أي أضرار، ومن يبلغ. وهو لا يُختصر في وصل. وإذا لم تكن الشركة مسجلة بعد، فلا تُجروا أشغالاً ثقيلة باسم شريك وحده دون كتابة من يؤدي ومن سيملك التجهيزات. وهذه التجهيزات، في نهاية الكراء، تتبع العقد والقانون رقم 49-16 حين ينطبق. واعتبارها ملككم سلفاً سبب كلاسيكي للنزاع مع المكري عند المغادرة.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Peut-on ouvrir avec une simple domiciliation ?', 'Can you open with a plain domiciliation?', 'هل يمكن الفتح بتوطين بسيط؟'), a:t('Non pour un lieu qui reçoit du public et cuisine. La domiciliation peut servir d’adresse administrative à une autre activité. Elle ne remplace pas la salle et la cuisine.', 'Not for a place that receives the public and cooks. Domiciliation can serve as an administrative address for another activity. It does not replace the dining room and the kitchen.', 'لا لمكان يستقبل العموم ويطبخ. قد يخدم التوطين عنواناً إدارياً لنشاط آخر. وهو لا يعوّض القاعة والمطبخ.')},
      {q:t('Combien coûte une licence ?', 'How much does a licence cost?', 'كم تكلف رخصة؟'), a:t('Ce guide ne publie aucun coût. Les droits, s’il y en a, sont ceux demandés par l’administration compétente pour votre adresse et votre activité.', 'This guide publishes no cost. The fees, if any, are those asked by the competent administration for your address and your activity.', 'لا ينشر هذا الدليل أي تكلفة. والرسوم، إن وُجدت، هي التي تطلبها الإدارة المختصة لعنوانكم ونشاطكم.')},
      {q:t('Un associé absent peut-il être le gérant ?', 'Can an absent shareholder be the manager?', 'هل يمكن لشريك غائب أن يكون المسيّر؟'), a:t('Juridiquement, selon la forme. Pratiquement, quelqu’un doit signer, embaucher et répondre sur place. Écrivez les pouvoirs. Le guide de gestion depuis l’étranger détaille ce point.', 'Legally, depending on the form. Practically, someone must sign, hire and answer on the spot. Write the powers. The guide to management from abroad sets out that point.', 'قانوناً، حسب الشكل. وعملياً، يجب أن يوقّع أحد ويشغّل ويرد في عين المكان. اكتبوا السلطات. ودليل التسيير من الخارج يفصل هذه النقطة.')},
      {q:t('La TVA est-elle due dès l’ouverture ?', 'Is VAT due from opening?', 'هل تجب الضريبة على القيمة المضافة منذ الفتح؟'), a:t('Cela dépend du régime applicable à votre activité, dans le CGI. Aucun seuil n’est recopié ici. Faites-le vérifier avant d’afficher les prix.', 'It depends on the regime that applies to your activity, in the General Tax Code. No threshold is copied here. Have it checked before you display prices.', 'يتوقف ذلك على النظام المطبق على نشاطكم، في المدونة. ولا يُنسخ هنا أي سقف. تحققوا منه قبل عرض الأسعار.')}
    ],
    links:[
      link('guides/bail-commercial-droits-des-parties', 'Lire le bail', 'Read the lease', 'قراءة الكراء'),
      link('guides/devenir-freelance-au-maroc', 'Statut ou société', 'Status or company', 'وضع أو شركة'),
      link('guides/capital-social-maroc-quel-montant', 'Capital', 'Capital', 'رأس المال'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('domiciliation', 'Pourquoi la domiciliation ne suffit pas', 'Why domiciliation is not enough', 'لماذا لا يكفي التوطين'),
      link('guides/mre-gerer-societe-depuis-letranger', 'Gérer à distance', 'Run it remotely', 'التسيير عن بُعد'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:localSources
  },
  {
    slug:'creer-une-agence-de-voyages-au-maroc',
    category:t('Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
    fiscal:true,
    title:t('Créer une agence de voyages au Maroc', 'Forming a travel agency in Morocco', 'إنشاء وكالة أسفار بالمغرب'),
    description:t(
      'L’agence de voyages est une activité réglementée. La société et le local ne suffisent pas : l’agrément et ses conditions se vérifient auprès de l’administration du tourisme et dans le Bulletin officiel. Aucune caution n’est chiffrée ici.',
      'A travel agency is a regulated activity. The company and the premises are not enough: the approval and its conditions are checked with the tourism administration and in the Official Gazette. No bond is given a figure here.',
      'وكالة الأسفار نشاط منظم. والشركة والمحل لا يكفيان: الاعتماد وشروطه يُتحقق منهما لدى إدارة السياحة وفي الجريدة الرسمية. ولا تُرقم هنا أي كفالة.'
    ),
    sections:[
      {
        heading:t('Ne pas vendre avant d’être autorisé', 'Do not sell before you are authorised', 'لا تبيعوا قبل الترخيص'),
        paragraphs:[
          t(
            'Proposer des voyages, des billets ou des séjours au public n’est pas une activité libre que l’on commence avec un site. L’exercice d’une agence de voyages est réglementé. Les conditions d’agrément, de capacité et de garantie financière, lorsqu’elles existent, se lisent dans le texte en vigueur au Bulletin officiel et auprès de l’administration du tourisme. Ce guide ne recopie ni le montant d’une caution, ni un diplôme, ni un délai d’instruction. Ces éléments changent, et un chiffre détaché ferait ouvrir une agence qui ne peut pas facturer.',
            'Offering trips, tickets or stays to the public is not a free activity you start with a website. Running a travel agency is regulated. The conditions of approval, capacity and financial guarantee, where they exist, are read in the text in force in the Official Gazette and from the tourism administration. This guide copies neither the amount of a bond, nor a diploma, nor a processing time. Those elements change, and a detached figure would have you open an agency that cannot invoice.',
            'عرض الأسفار أو التذاكر أو الإقامات على العموم ليس نشاطاً حراً يبدأ بموقع. ومزاولة وكالة أسفار منظمة. وشروط الاعتماد والكفاءة والضمانة المالية، حين توجد، تُقرأ في النص الجاري بالجريدة الرسمية ولدى إدارة السياحة. ولا ينسخ هذا الدليل مبلغ كفالة ولا دبلوماً ولا أجل دراسة. وهذه العناصر تتغير، ورقم منفصل يجعلكم تفتحون وكالة لا تستطيع الفوترة.'
          ),
          t(
            'Le [guide des dotations de voyage](guides/voyages-etranger-dotations-change-maroc) parle des plafonds du voyageur, pas de la licence de l’agence. Ne les confondez pas. L’agence, elle, encaisse pour le compte de clients et paie des fournisseurs souvent hors du Maroc. Ce second mouvement relève de l’Office des Changes. Le régime se lit sur oc.gov.ma. Il ne s’improvise pas avec la carte du gérant. Felexia Conseils peut préparer la société et lister les pièces. Le cabinet ne délivre pas l’agrément.',
            'The [guide to travel allowances](guides/voyages-etranger-dotations-change-maroc) is about the traveller’s ceilings, not the agency’s licence. Do not confuse them. The agency, for its part, collects on behalf of clients and pays suppliers often outside Morocco. That second movement comes under the Foreign Exchange Office. The regime is read on oc.gov.ma. It is not improvised with the manager’s card. Felexia Conseils can prepare the company and list the documents. The firm does not issue the approval.',
            'يتحدث [دليل مخصصات السفر](guides/voyages-etranger-dotations-change-maroc) عن أسقف المسافر، لا عن رخصة الوكالة. لا تخلطوا بينهما. والوكالة، من جهتها، تقبض لفائدة الزبناء وتؤدي لمزودين غالباً خارج المغرب. وهذه الحركة الثانية تخضع لمكتب الصرف. والنظام يُقرأ على oc.gov.ma. وهو لا يُرتجل ببطاقة المسيّر. ويمكن لـ Felexia Conseils تحضير الشركة وجرد الوثائق. والمكتب لا يسلم الاعتماد.'
          )
        ]
      },
      {
        heading:t('La société, l’objet et le local', 'The company, the purpose and the premises', 'الشركة والغرض والمحل'),
        paragraphs:[
          t(
            'L’objet social doit décrire l’activité d’agence, pas « toutes prestations ». Un objet trop vague complique l’agrément et la banque. La forme se choisit parmi les [formes juridiques](formes-juridiques). Une SARL convient souvent à un petit nombre d’associés. Le capital, s’il est exigé par le texte de l’agrément en plus de la loi des sociétés, se lit dans ce texte. Le [guide du capital](guides/capital-social-maroc-quel-montant) ne le remplace pas. N’annoncez pas un capital « suffisant pour l’agrément » sans avoir lu la condition du jour.',
            'The corporate purpose must describe the agency activity, not “all services”. A purpose that is too vague complicates the approval and the bank. The form is chosen among the [legal forms](formes-juridiques). A SARL often suits a small number of shareholders. Capital, if the approval text requires it in addition to company law, is read in that text. The [capital guide](guides/capital-social-maroc-quel-montant) does not replace it. Do not announce capital “enough for the approval” without having read the condition of the day.',
            'يجب أن يصف الغرض نشاط الوكالة، لا «كل الخدمات». والغرض الفضفاض جداً يعقّد الاعتماد والبنك. والشكل يُختار من [الأشكال القانونية](formes-juridiques). وغالباً ما تناسب SARL عدداً قليلاً من الشركاء. ورأس المال، إذا اشترطه نص الاعتماد إضافة إلى قانون الشركات، يُقرأ في ذلك النص. و[دليل رأس المال](guides/capital-social-maroc-quel-montant) لا يعوّضه. ولا تعلنوا رأس مال «كافياً للاعتماد» دون قراءة شرط اليوم.'
          ),
          t(
            'Le local accueille le public ou, à tout le moins, correspond à ce que l’administration demande pour l’agrément. Une domiciliation peut être refusée pour cette activité. Vérifiez-le avant de signer les statuts. Le [guide du siège](guides/siege-social-maroc) compare les titres. À Marrakech, l’adresse doit être la même sur le bail, les statuts et le dossier d’agrément. Une vitrine dans la médina se lit aussi avec le [bail](guides/bail-commercial-droits-des-parties) : enseigne, accès, horaires.',
            'The premises receive the public or, at least, match what the administration asks for the approval. Domiciliation may be refused for this activity. Check that before you sign the articles. The [office guide](guides/siege-social-maroc) compares the titles. In Marrakech, the address must be the same on the lease, the articles and the approval file. A shopfront in the medina is also read with the [lease](guides/bail-commercial-droits-des-parties): sign, access, hours.',
            'المحل يستقبل العموم أو، على الأقل، يطابق ما تطلبه الإدارة للاعتماد. وقد يُرفض التوطين لهذا النشاط. تحققوا من ذلك قبل توقيع النظام. ويقارن [دليل المقر](guides/siege-social-maroc) السندات. وبمراكش، يجب أن يكون العنوان واحداً في الكراء والنظام وملف الاعتماد. وواجهة في المدينة العتيقة تُقرأ أيضاً مع [الكراء](guides/bail-commercial-droits-des-parties): اللافتة، والولوج، والأوقات.'
          )
        ]
      },
      {
        heading:t('L’argent des clients', 'The clients’ money', 'مال الزبناء'),
        paragraphs:[
          t(
            'L’agence encaisse souvent avant de payer le fournisseur. Cet écart de trésorerie n’est pas un bénéfice. Il appartient, selon le contrat, au voyage ou au prestataire. Le tenir sur le même compte que les frais de l’agence, sans écriture, rend les comptes illisibles et complique un contrôle. Séparez, au moins dans les enregistrements, l’argent des clients et le produit de la commission. La commission, elle, est le revenu. Son régime fiscal se vérifie dans le CGI. Aucun taux de marge ni de TVA n’est indiqué ici. Faites-le confirmer par un professionnel avant d’afficher des prix.',
            'The agency often collects before it pays the supplier. That cash gap is not a profit. It belongs, under the contract, to the trip or to the provider. Holding it in the same account as the agency’s expenses, with no entry, makes the accounts unreadable and complicates an audit. Separate, at least in the records, the clients’ money and the commission income. The commission is the revenue. Its tax regime is checked in the General Tax Code. No margin rate and no VAT rate is stated here. Have it confirmed by a professional before you display prices.',
            'غالباً ما تقبض الوكالة قبل أن تؤدي للمزود. وهذه الفجوة في الخزينة ليست ربحاً. فهي تخص، حسب العقد، السفر أو المقدم. وإبقاؤها في الحساب نفسه مع مصاريف الوكالة، بلا قيد، يجعل الحسابات غير مقروءة ويعقّد الفحص. افصلوا، على الأقل في السجلات، مال الزبناء ودخل العمولة. والعمولة هي الإيراد. ونظامها الضريبي يُتحقق في المدونة. ولا يُذكر هنا سعر هامش ولا سعر ضريبة على القيمة المضافة. اطلبوا تأكيده من مهني قبل عرض الأسعار.'
          ),
          t(
            'Payer un hôtel ou une compagnie à l’étranger suit le régime de l’Office des Changes et les conditions de la banque. Conservez le contrat client, la facture fournisseur et la preuve du paiement. Le [guide du rapatriement](guides/rapatrier-benefices-depuis-le-maroc) concerne la sortie des bénéfices, pas le paiement d’une prestation pour un client. Les deux dossiers ne se mélangent pas. Si l’agence a des salariés, la CNSS s’applique comme pour toute entreprise. Les guides ne fixent pas les cotisations.',
            'Paying a hotel or an airline abroad follows the Foreign Exchange Office regime and the bank’s conditions. Keep the client contract, the supplier invoice and proof of payment. The [repatriation guide](guides/rapatrier-benefices-depuis-le-maroc) is about taking profits out, not about paying a service for a client. The two files are not mixed. If the agency has employees, the CNSS applies as for any business. The guides do not set the contributions.',
            'أداء فندق أو شركة طيران في الخارج يتبع نظام مكتب الصرف وشروط البنك. احتفظوا بعقد الزبون وفاتورة المزود وإثبات الأداء. و[دليل إعادة الأرباح](guides/rapatrier-benefices-depuis-le-maroc) يخص إخراج الأرباح، لا أداء خدمة لزبون. والملفان لا يختلطان. وإذا كان للوكالة أجراء، ينطبق الصندوق كما على أي مقاولة. والأدلة لا تحدد الاشتراكات.'
          )
        ]
      },
      {
        heading:t('Avant la première réservation', 'Before the first booking', 'قبل أول حجز'),
        paragraphs:[
          t('La réservation vient après l’autorisation, pas à la place.', 'The booking comes after the authorisation, not instead of it.', 'الحجز يأتي بعد الترخيص، لا بدلاً منه.')
        ],
        list:t(
          [
            'Les conditions d’agrément ont été lues dans le texte en vigueur, pas dans un souvenir.',
            'La garantie financière, s’il y en a une, est celle demandée aujourd’hui, sans montant inventé.',
            'L’objet social et l’adresse correspondent au dossier d’agrément.',
            'Le local est compatible avec l’accueil du public si l’administration l’exige.',
            'L’argent des clients est distingué de la commission dans les enregistrements.',
            'Les paiements vers l’étranger sont prévus avec la banque et l’Office des Changes.',
            'L’impôt de la commission est confirmé par un professionnel.'
          ],
          [
            'The approval conditions were read in the text in force, not in a memory.',
            'The financial guarantee, if there is one, is the one asked today, with no invented amount.',
            'The corporate purpose and the address match the approval file.',
            'The premises are compatible with receiving the public if the administration requires it.',
            'Clients’ money is distinguished from the commission in the records.',
            'Payments abroad are planned with the bank and the Foreign Exchange Office.',
            'The tax on the commission is confirmed by a professional.'
          ],
          [
            'شروط الاعتماد قُرئت في النص الجاري، لا في ذاكرة.',
            'الضمانة المالية، إن وُجدت، هي المطلوبة اليوم، بلا مبلغ مخترع.',
            'الغرض والعنوان يطابقان ملف الاعتماد.',
            'المحل متوافق مع استقبال العموم إذا اشترطته الإدارة.',
            'مال الزبناء مميز عن العمولة في السجلات.',
            'الأداءات إلى الخارج مخططة مع البنك ومكتب الصرف.',
            'ضريبة العمولة أكدها مهني.'
          ]
        )
      },
      {
        heading:t('Le contrat du voyageur et la réclamation', 'The traveller’s contract and the complaint', 'عقد المسافر والشكوى'),
        paragraphs:[
          t(
            'Chaque vente a un écrit : qui voyage, ce qui est inclus, ce qui ne l’est pas, le prix, et le nom du fournisseur lorsque vous n’êtes pas l’organisateur. Le client doit voir que l’agence est identifiée, avec son agrément si l’administration l’exige sur les documents. Une page web qui ne montre qu’une marque, sans la société, complique une réclamation. Les conditions d’annulation se lisent dans votre contrat et dans les règles du fournisseur. Ce guide n’invente pas un barème de remboursement. Promettre « remboursé quoi qu’il arrive » sans l’avoir écrit avec le fournisseur est un engagement que la trésorerie de l’agence ne pourra pas tenir.',
            'Each sale has a writing: who travels, what is included, what is not, the price, and the supplier’s name when you are not the organiser. The client must see that the agency is identified, with its approval if the administration requires it on the documents. A web page that shows only a brand, without the company, complicates a complaint. Cancellation conditions are read in your contract and in the supplier’s rules. This guide does not invent a refund scale. Promising “refunded whatever happens” without having written it with the supplier is a commitment the agency’s cash will not be able to keep.',
            'لكل بيع كتابة: من يسافر، وما هو مشمول، وما ليس كذلك، والثمن، واسم المزود حين لا تكونون المنظم. ويجب أن يرى الزبون أن الوكالة معروفة، باعتمادها إذا اشترطته الإدارة على الوثائق. وصفحة لا تظهر إلا علامة، بلا الشركة، تعقّد الشكوى. وشروط الإلغاء تُقرأ في عقدكم وفي قواعد المزود. ولا يخترع هذا الدليل تعريفة إرجاع. والوعد «بمردود مهما وقع» دون كتابته مع المزود التزام لن تستطيع خزينة الوكالة الوفاء به.'
          ),
          t(
            'Désignez qui reçoit la réclamation et sous quel délai interne vous répondez. Ce délai n’est pas un délai légal publié ici. Il évite qu’un message reste dans une boîte que personne n’ouvre pendant un départ. Si l’agence a une vitrine à Marrakech et une personne qui vend depuis l’étranger, les deux doivent voir le même dossier client. Le [guide de gestion à distance](guides/mre-gerer-societe-depuis-letranger) sert à organiser cela. Il ne remplace pas l’agrément. La page [création](creation-entreprise) ouvre le cadrage de la société. L’agrément reste une démarche distincte, confirmée à la source officielle. Prévoyez enfin qui signe les bons d’achat auprès des fournisseurs et jusqu’où. Une agence qui laisse chaque vendeur engager un hôtel sans plafond découvre la facture après le départ du client. Le plafond se fixe dans une délégation interne. Ce guide n’en impose pas le montant. Il impose seulement qu’il existe, et que la banque voie les mêmes signataires que cette délégation. Quand le fondateur est à l’étranger, une procuration trop large ou trop étroite bloque soit un paiement utile, soit le contrôle. Relisez-la avant la saison, pas pendant. Enfin, archivez chaque dossier de voyage assez longtemps pour répondre à un client qui revient après coup. La durée exacte se confirme avec le professionnel et, s’il y a une règle du secteur, avec l’administration. Ce guide ne la fixe pas. Une agence qui efface les échanges dès le retour du client ne peut plus expliquer un paiement. Le classeur, papier ou numérique, fait partie de l’exploitation au même titre que la vitrine.',
            'Name who receives the complaint and within what internal time you answer. That time is not a statutory deadline published here. It avoids a message sitting in a box nobody opens during a departure. If the agency has a shopfront in Marrakech and a person selling from abroad, both must see the same client file. The [remote-management guide](guides/mre-gerer-societe-depuis-letranger) is for organising that. It does not replace the approval. The [formation](creation-entreprise) page opens the scoping of the company. The approval remains a separate step, confirmed at the official source.',
            'عيّنوا من يتلقى الشكوى وفي أي أجل داخلي تجيبون. وهذا الأجل ليس أجلاً قانونياً منشوراً هنا. وهو يمنع بقاء رسالة في صندوق لا يفتحه أحد أثناء سفر. وإذا كان للوكالة واجهة بمراكش وشخص يبيع من الخارج، وجب أن يريا ملف الزبون نفسه. و[دليل التسيير عن بُعد](guides/mre-gerer-societe-depuis-letranger) لتنظيم ذلك. وهو لا يعوّض الاعتماد. وصفحة [التأسيس](creation-entreprise) تفتح تأطير الشركة. ويبقى الاعتماد خطوة مستقلة، تُؤكد في المصدر الرسمي.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Une SARL suffit-elle pour vendre des voyages ?', 'Is a SARL enough to sell trips?', 'هل تكفي SARL لبيع الأسفار؟'), a:t('La société est une étape. L’agrément de l’activité en est une autre. L’une ne remplace pas l’autre. Les conditions se confirment auprès de l’administration du tourisme.', 'The company is one step. Approval of the activity is another. One does not replace the other. The conditions are confirmed with the tourism administration.', 'الشركة مرحلة. واعتماد النشاط مرحلة أخرى. وإحداهما لا تعوّض الأخرى. والشروط تُؤكد لدى إدارة السياحة.')},
      {q:t('Quel est le montant de la caution ?', 'What is the amount of the bond?', 'ما مبلغ الكفالة؟'), a:t('Il n’est pas publié ici. S’il en existe une, son montant et sa forme sont ceux du texte en vigueur. Demandez-les à la source officielle avant de les budgéter.', 'It is not published here. If one exists, its amount and its form are those of the text in force. Ask the official source for them before you budget them.', 'غير منشور هنا. وإن وُجدت، فمبلغها وصيغتها هما ما في النص الجاري. اطلبوهما من المصدر الرسمي قبل إدراجها في الميزانية.')},
      {q:t('Peut-on travailler seulement en ligne ?', 'Can you work only online?', 'هل يمكن العمل عبر الإنترنت فقط؟'), a:t('Seulement si les conditions d’agrément l’admettent. Un site ne remplace pas l’autorisation. Le local, s’il est exigé, se vérifie avant la création.', 'Only if the approval conditions allow it. A website does not replace the authorisation. The premises, if required, are checked before formation.', 'فقط إذا قبلت ذلك شروط الاعتماد. والموقع لا يعوّض الترخيص. والمحل، إن كان مطلوباً، يُتحقق منه قبل التأسيس.')},
      {q:t('Les dotations de change du voyageur sont-elles la licence ?', 'Are the traveller’s exchange allowances the licence?', 'هل مخصصات صرف المسافر هي الرخصة؟'), a:t('Non. Ce sont des règles pour le voyageur. L’agence a son agrément et ses paiements fournisseurs. Les deux guides ne se substituent pas.', 'No. Those are rules for the traveller. The agency has its approval and its supplier payments. The two guides do not stand in for each other.', 'لا. تلك قواعد للمسافر. وللوكالة اعتمادها وأداءاتها للمزودين. والدليلان لا يحل أحدهما محل الآخر.')}
    ],
    links:[
      link('guides/voyages-etranger-dotations-change-maroc', 'Dotations du voyageur, un autre sujet', 'Traveller allowances, a different subject', 'مخصصات المسافر، موضوع آخر'),
      link('guides/rapatrier-benefices-depuis-le-maroc', 'Sortie des bénéfices', 'Taking profits out', 'إخراج الأرباح'),
      link('guides/bail-commercial-droits-des-parties', 'Bail du local', 'Lease of the premises', 'كراء المحل'),
      link('guides/siege-social-maroc', 'Siège', 'Office', 'المقر'),
      link('formes-juridiques', 'Formes juridiques', 'Legal forms', 'الأشكال القانونية'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:localSources
  }
];
