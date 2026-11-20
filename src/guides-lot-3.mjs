const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const moneySources = [
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/'),
  src('Direction générale des impôts', 'General Tax Directorate', 'المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('Lois de finances', 'Finance laws', 'قوانين المالية', 'https://www.finances.gov.ma/'),
  src('Bulletin officiel', 'Official Gazette', 'الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('OMPIC', 'OMPIC', 'المكتب المغربي للملكية الصناعية والتجارية', 'https://www.ompic.ma/')
];

const activitySources = [
  src('Portail de l’auto-entrepreneur', 'Self-employed status portal', 'بوابة المقاول الذاتي', 'https://ae.gov.ma/'),
  src('OMPIC', 'OMPIC', 'المكتب المغربي للملكية الصناعية والتجارية', 'https://www.ompic.ma/'),
  src('Direction générale des impôts', 'General Tax Directorate', 'المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('CNSS', 'CNSS', 'الصندوق الوطني للضمان الاجتماعي', 'https://www.cnss.ma/'),
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/'),
  src('Bulletin officiel', 'Official Gazette', 'الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Portail Adala', 'Adala portal', 'بوابة عدالة', 'https://adala.justice.gov.ma/'),
  src('CNDP, protection des données', 'CNDP, data protection', 'اللجنة الوطنية لحماية المعطيات', 'https://www.cndp.ma/')
];

export const lot3a = [
  {
    slug:'rapatrier-benefices-depuis-le-maroc',
    category:t('Investissement', 'Investment', 'الاستثمار'),
    fiscal:true,
    title:t('Rapatrier ses bénéfices du Maroc vers l’étranger', 'Taking profits from Morocco abroad', 'إعادة الأرباح من المغرب إلى الخارج'),
    description:t(
      'Rapatrier un bénéfice suppose d’abord une décision et une qualification fiscale, puis les pièces demandées par la banque et par l’Office des Changes. Ce guide ne promet aucun virement et ne cite aucun taux.',
      'Taking a profit abroad first requires a decision and a tax classification, then the documents asked by the bank and by the Foreign Exchange Office. This guide promises no transfer and cites no rate.',
      'إعادة ربح إلى الخارج تقتضي أولاً قراراً وتكييفاً ضريبياً، ثم الوثائق التي يطلبها البنك ومكتب الصرف. ولا يعد هذا الدليل بأي تحويل ولا يذكر أي سعر.'
    ),
    sections:[
      {
        heading:t('Nommer la somme avant de la transférer', 'Name the sum before you transfer it', 'سمّوا المبلغ قبل تحويله'),
        paragraphs:[
          t(
            '« Rapatrier les bénéfices » mélange des opérations qui ne se traitent pas ensemble. Un dividende décidé par les associés, une rémunération de gérant, le remboursement d’un [compte courant](guides/compte-courant-associe-maroc), et le boni d’une [liquidation](guides/dissoudre-et-liquider-societe-maroc) n’ont ni la même décision, ni la même pièce, ni la même lecture fiscale. Choisissez le canal avant d’appeler la banque. Un virement dont le libellé dit « divers » oblige à reconstruire l’opération des mois plus tard, souvent quand le relevé d’origine n’est plus en ligne.',
            '“Repatriating profits” mixes operations that are not handled together. A dividend decided by the shareholders, a manager’s remuneration, the repayment of a [current account](guides/compte-courant-associe-maroc), and the surplus of a [liquidation](guides/dissoudre-et-liquider-societe-maroc) do not have the same decision, the same document, or the same tax reading. Choose the channel before you call the bank. A transfer whose description says “miscellaneous” forces you to rebuild the operation months later, often when the original statement is no longer online.',
            '«إعادة الأرباح» تخلط عمليات لا تُعالج معاً. فرِبح قرره الشركاء، ومكافأة مسيّر، وسداد [حساب جار](guides/compte-courant-associe-maroc)، وفائض [تصفية](guides/dissoudre-et-liquider-societe-maroc) ليست لها القرار نفسه ولا الوثيقة نفسها ولا القراءة الضريبية نفسها. اختاروا القناة قبل الاتصال بالبنك. وتحويل يقول بيانه «متنوع» يفرض إعادة بناء العملية بعد أشهر، غالباً حين لم يعد الكشف الأصلي متاحاً.'
          ),
          t(
            'La société paie d’abord ce qu’elle doit. Un bénéfice distribuable n’est pas le solde du compte bancaire. Il se lit sur des comptes arrêtés, après les dettes et les réserves que la loi de la forme impose. Pour une SARL, cette loi est la loi n° 5-96, dans son texte en vigueur. Ce guide ne dit pas quel pourcentage mettre de côté. Il dit de le lire dans la loi avant de voter une distribution. Les guides déjà en ligne sur les [revenus de capitaux](guides/revenus-capitaux-mobiliers-maroc), la [retenue sur dividendes](guides/taux-de-retenue-a-la-source-sur-dividendes) et les [transferts de dividendes](guides/igoc-transfert-dividendes) décrivent des mécanismes. Ils ne dispensent pas de relire le CGI à la date du vote.',
            'The company first pays what it owes. A distributable profit is not the bank balance. It is read on approved accounts, after the debts and the reserves the law of the form requires. For a SARL, that law is Law 5-96, in its text in force. This guide does not say what percentage to set aside. It says to read it in the statute before you vote a distribution. The guides already online on [income from capital](guides/revenus-capitaux-mobiliers-maroc), [withholding on dividends](guides/taux-de-retenue-a-la-source-sur-dividendes) and [dividend transfers](guides/igoc-transfert-dividendes) describe mechanisms. They do not remove the need to reread the General Tax Code on the date of the vote.',
            'الشركة تؤدي أولاً ما عليها. والربح القابل للتوزيع ليس رصيد الحساب البنكي. يُقرأ في حسابات موقوفة، بعد الديون والاحتياطيات التي يفرضها قانون الشكل. وبالنسبة إلى SARL، هذا القانون هو القانون رقم 5-96، في نصه الجاري. ولا يقول هذا الدليل أي نسبة تُوضع جانباً. بل يقول أن تُقرأ في القانون قبل التصويت على التوزيع. والأدلة المنشورة عن [مداخيل رؤوس الأموال](guides/revenus-capitaux-mobiliers-maroc) و[الاقتطاع من الأرباح](guides/taux-de-retenue-a-la-source-sur-dividendes) و[تحويلات الأرباح](guides/igoc-transfert-dividendes) تصف آليات. وهي لا تغني عن إعادة قراءة المدونة في تاريخ التصويت.'
          )
        ]
      },
      {
        heading:t('L’impôt se qualifie avant le change', 'Tax is classified before exchange control', 'الضريبة تُكيَّف قبل الصرف'),
        paragraphs:[
          t(
            'La retenue à la source, lorsqu’elle s’applique, se calcule sur le texte du CGI et, s’il y a lieu, de la convention fiscale. Le [guide du non-résident](guides/statut-non-resident-fiscal-maroc) rappelle qu’une convention ne s’applique pas sans résidence prouvée et sans formulaire. Ce guide ne publie aucun taux, ni conventionnel ni interne. Faites vérifier le schéma auprès d’un professionnel avant de promettre un net à l’associé étranger. Une erreur de qualification se paie deux fois : une fois à l’administration, une fois dans le délai du virement que personne ne peut annoncer ici.',
            'Withholding, where it applies, is calculated on the text of the General Tax Code and, where relevant, of the tax treaty. The [non-resident guide](guides/statut-non-resident-fiscal-maroc) recalls that a treaty does not apply without proved residence and without a form. This guide publishes no rate, neither treaty nor domestic. Have the structure checked by a professional before you promise a net amount to the foreign shareholder. A classification error is paid twice: once to the administration, once in the delay of a transfer that nobody can announce here.',
            'الاقتطاع من المنبع، حين ينطبق، يُحسب على نص المدونة، وعند الاقتضاء، الاتفاقية الجبائية. ويذكّر [دليل غير المقيم](guides/statut-non-resident-fiscal-maroc) بأن الاتفاقية لا تطبق بلا إقامة مثبتة وبلا استمارة. ولا ينشر هذا الدليل أي سعر، لا اتفاقي ولا داخلي. تحققوا من الهيكل لدى مهني قبل أن تعدوا شريكاً أجنبياً بصاف. وخطأ التكييف يُدفع مرتين: مرة للإدارة، ومرة في تأخر تحويل لا يستطيع أحد إعلانه هنا.'
          ),
          t(
            'Gardez la preuve du paiement de la retenue, s’il y en a une, avec la décision de distribution. La banque et l’Office des Changes ne refont pas vos calculs. Ils demandent des pièces cohérentes. Le [guide de la fiscalité internationale des dividendes](guides/fiscalite-dividendes-international) est un complément de lecture, pas un barème. Si le texte a changé avec une loi de finances, c’est le texte nouveau qui compte, pas le guide.',
            'Keep proof that withholding was paid, if there was any, with the distribution decision. The bank and the Foreign Exchange Office do not redo your accounts. They ask for consistent documents. The [guide to the international tax treatment of dividends](guides/fiscalite-dividendes-international) is further reading, not a scale. If the text has changed with a finance law, the new text is the one that counts, not the guide.',
            'احتفظوا بإثبات أداء الاقتطاع، إن وُجد، مع قرار التوزيع. والبنك ومكتب الصرف لا يعيدان حساباتكم. وهما يطلبان وثائق متسقة. و[دليل الجباية الدولية للأرباح](guides/fiscalite-dividendes-international) قراءة مكملة، لا تعريفة. وإذا تغير النص بقانون مالية، فالنص الجديد هو المعتد به، لا الدليل.'
          )
        ]
      },
      {
        heading:t('La trace de l’argent entré', 'The trail of the money that came in', 'أثر المال الذي دخل'),
        paragraphs:[
          t(
            'Une sortie se comprend mieux si l’entrée a été documentée. L’Office des Changes publie le régime applicable à certains investissements financés en devises. Ce régime ne crée pas un droit automatique de tout ressortir, et il ne fixe pas le montant de votre dividende. Il demande, selon l’opération, de relier ce qui sort à ce qui est entré et à la décision sociale. Conservez depuis le premier jour les relevés, l’identité de l’apporteur et la nature de la somme : capital, prêt, ou compte courant. Le [guide depuis la France](guides/creer-societe-maroc-depuis-la-france) insiste déjà sur cette trace. Elle sert des années plus tard.',
            'An outward payment is easier to understand if the inward payment was documented. The Foreign Exchange Office publishes the regime that applies to some investments financed in foreign currency. That regime does not create an automatic right to take everything back out, and it does not set the amount of your dividend. It asks, depending on the operation, to link what goes out to what came in and to the company decision. From the first day, keep the statements, the contributor’s identity and the nature of the sum: capital, a loan, or a current account. The [guide from France](guides/creer-societe-maroc-depuis-la-france) already insists on that trail. It is used years later.',
            'يُفهم الخروج بشكل أفضل إذا وُثق الدخول. وينشر مكتب الصرف النظام المطبق على بعض الاستثمارات الممولة بالعملة. وهذا النظام لا ينشئ حقاً تلقائياً في إخراج كل شيء، ولا يحدد مبلغ ربحكم. وهو يطلب، حسب العملية، ربط ما يخرج بما دخل وبالقرار الاجتماعي. واحتفظوا منذ اليوم الأول بالكشوف وهوية المساهم وطبيعة المبلغ: رأس مال، أو قرض، أو حساب جار. و[الدليل من فرنسا](guides/creer-societe-maroc-depuis-la-france) يصر سلفاً على هذا الأثر. وهو يُستعمل بعد سنوات.'
          ),
          t(
            'La banque choisit d’exécuter. Aucun partenaire bancaire n’est affiché sur ce site. Préparez un dossier court : décision, comptes, identité du bénéficiaire, preuve fiscale s’il en faut une, et le lien avec l’investissement d’origine. Deux confirmations valent mieux qu’une promesse orale de guichet. Felexia Conseils peut aider à ordonner ces pièces dans une mission écrite. Le cabinet ne fait pas le virement et ne garantit pas son acceptation.',
            'The bank chooses whether to execute. No banking partner is displayed on this website. Prepare a short file: the decision, the accounts, the beneficiary’s identity, tax evidence if any is required, and the link with the original investment. Two confirmations are better than an oral promise at the counter. Felexia Conseils can help put those documents in order within a written engagement. The firm does not make the transfer and does not guarantee that it will be accepted.',
            'البنك يختار التنفيذ. ولا يُعرض شريك بنكي على هذا الموقع. حضّروا ملفاً قصيراً: القرار، والحسابات، وهوية المستفيد، والإثبات الضريبي إن لزم، والربط بالاستثمار الأصلي. وتأكيدان أفضل من وعد شفوي في الشباك. ويمكن لـ Felexia Conseils المساعدة في ترتيب هذه الوثائق في مهمة مكتوبة. والمكتب لا يجري التحويل ولا يضمن قبوله.'
          )
        ]
      },
      {
        heading:t('Ce qu’il ne faut pas faire partir', 'What should not be sent', 'ما لا ينبغي إخراجه'),
        paragraphs:[
          t(
            'Ne faites pas partir la trésorerie qui paie les salaires, le loyer et l’impôt. Un associé majoritaire qui vide le compte parce qu’il vit à l’étranger met la filiale en difficulté. Le [guide de gouvernance](guides/gouvernance-filiale-marocaine) rappelle que l’instruction du groupe ne remplace pas l’intérêt de la société marocaine. Le [guide des difficultés](guides/difficultes-entreprise-sauvegarde-redressement-maroc) devient le sujet si la société ne peut plus faire face après la sortie.',
            'Do not send out the cash that pays wages, rent and tax. A majority shareholder who empties the account because they live abroad puts the subsidiary in difficulty. The [governance guide](guides/gouvernance-filiale-marocaine) recalls that a group instruction does not replace the interest of the Moroccan company. The [difficulties guide](guides/difficultes-entreprise-sauvegarde-redressement-maroc) becomes the subject if the company can no longer cope after the outward payment.',
            'لا تخرجوا الخزينة التي تؤدي الأجور والكراء والضريبة. والشريك الأغلبي الذي يفرغ الحساب لأنه يعيش في الخارج يضع الشركة التابعة في صعوبة. ويذكّر [دليل الحكامة](guides/gouvernance-filiale-marocaine) بأن تعليم المجموعة لا يعوّض مصلحة الشركة المغربية. ويصبح [دليل الصعوبات](guides/difficultes-entreprise-sauvegarde-redressement-maroc) هو الموضوع إذا لم تعد الشركة قادرة على المواجهة بعد الخروج.'
          )
        ],
        list:t(
          [
            'Voter une distribution sans comptes arrêtés et sans avoir lu la réserve légale dans la loi.',
            'Appeler dividende un remboursement de compte courant, ou l’inverse.',
            'Oublier la retenue, ou appliquer un taux lu dans un ancien article.',
            'Envoyer les fonds vers un compte qui n’est pas celui de l’associé bénéficiaire.',
            'Perdre la trace de l’investissement initial en devises.',
            'Promettre une date de réception à l’étranger.'
          ],
          [
            'Voting a distribution without approved accounts and without reading the legal reserve in the statute.',
            'Calling a current-account repayment a dividend, or the reverse.',
            'Forgetting withholding, or applying a rate read in an old article.',
            'Sending the funds to an account that is not the beneficiary shareholder’s.',
            'Losing the trail of the original investment in foreign currency.',
            'Promising a date of receipt abroad.'
          ],
          [
            'التصويت على توزيع بلا حسابات موقوفة وبلا قراءة الاحتياطي القانوني في القانون.',
            'تسمية سداد الحساب الجاري ربحاً، أو العكس.',
            'نسيان الاقتطاع، أو تطبيق سعر قُرأ في مقال قديم.',
            'إرسال الأموال إلى حساب ليس حساب الشريك المستفيد.',
            'فقدان أثر الاستثمار الأول بالعملة.',
            'الوعد بتاريخ توصل في الخارج.'
          ]
        )
      },
      {
        heading:t('Le calendrier utile, sans date promise', 'A useful calendar, with no date promised', 'جدول مفيد، بلا تاريخ موعود'),
        paragraphs:[
          t(
            'Rangez l’opération dans l’année, pas la veille du virement. Les comptes s’arrêtent, la décision se signe, la retenue éventuelle se vérifie, puis seulement le dossier bancaire se constitue. Inverser cet ordre produit des pièces qui ne se correspondent pas : un virement parti, une décision datée du lendemain, une retenue calculée sur un autre montant. Pour une filiale, la société mère ne vote pas dans son propre conseil à l’étranger à la place de l’assemblée marocaine, sauf si les statuts et la loi organisent exactement cette représentation. Le [guide de gouvernance](guides/gouvernance-filiale-marocaine) le rappelle. Le signataire de la décision doit avoir un mandat qui vise la distribution, pas seulement la gestion courante.',
            'Place the operation in the year, not the day before the transfer. The accounts are closed, the decision is signed, any withholding is checked, and only then is the bank file assembled. Reversing that order produces documents that do not match: a transfer already gone, a decision dated the next day, withholding calculated on another amount. For a subsidiary, the parent does not vote in its own board abroad in place of the Moroccan meeting, unless the articles and the law organise exactly that representation. The [governance guide](guides/gouvernance-filiale-marocaine) recalls this. The signatory of the decision must have a mandate that covers the distribution, not only day-to-day management.',
            'رتبوا العملية في السنة، لا عشية التحويل. تُقفل الحسابات، ويُوقَّع القرار، ويُتحقق من الاقتطاع المحتمل، ثم فقط يُكوَّن الملف البنكي. وعكس هذا الترتيب ينتج وثائق لا تتطابق: تحويل خرج، وقرار مؤرخ في الغد، واقتطاع محسوب على مبلغ آخر. وبالنسبة إلى شركة تابعة، لا تصوّت الشركة الأم في مجلسها بالخارج بدلاً من الجمعية المغربية، إلا إذا نظم النظام والقانون هذه النيابة بالضبط. و[دليل الحكامة](guides/gouvernance-filiale-marocaine) يذكّر بذلك. وموقّع القرار يجب أن تكون له وكالة تشمل التوزيع، لا التسيير الجاري فقط.'
          ),
          t(
            'Si plusieurs associés, au Maroc et à l’étranger, ne sont pas payés le même jour, écrivez pourquoi. Une retenue différente selon la résidence se justifie par le texte, pas par la commodité. Le bénéficiaire conserve la décision, l’avis de virement et, s’il y a lieu, l’attestation de retenue. Ces pièces servent dans son pays de résidence. Ce guide ne décrit pas l’impôt étranger. Il évite seulement que le dossier marocain soit inutilisable là-bas. Quand l’opération est une liquidation, attendez le solde définitif. Une avance appelée « bénéfice » avant la clôture des dettes se requalifie mal. Si la somme doit rejoindre un compte à l’étranger, demandez à la banque, par écrit, la liste des pièces de cette opération précise. Ne réutilisez pas un dossier d’apport pour une distribution. Les deux mouvements vont en sens inverse et ne se prouvent pas avec les mêmes pages. Conservez la réponse de la banque avec la décision. Le jour où un associé demande pourquoi le virement a attendu, le dossier répond à sa place.',
            'If several shareholders, in Morocco and abroad, are not paid on the same day, write why. A different withholding according to residence is justified by the text, not by convenience. The beneficiary keeps the decision, the transfer advice and, where relevant, the withholding certificate. Those documents are used in their country of residence. This guide does not describe foreign tax. It only avoids the Moroccan file being unusable there. When the operation is a liquidation, wait for the final balance. An advance called a “profit” before the debts are closed is hard to reclassify.',
            'إذا لم يُؤدَّ لعدة شركاء، في المغرب وفي الخارج، في اليوم نفسه، فاكتبوا لماذا. واقتطاع مختلف حسب الإقامة يبرره النص، لا اليسر. ويحتفظ المستفيد بالقرار وإشعار التحويل، وعند الاقتضاء، شهادة الاقتطاع. وهذه الوثائق تُستعمل في بلد إقامته. ولا يصف هذا الدليل الضريبة الأجنبية. وهو يمنع فقط أن يكون الملف المغربي غير قابل للاستعمال هناك. وحين تكون العملية تصفية، انتظروا الرصيد النهائي. وتسبقة تُسمى «ربحاً» قبل إقفال الديون تُكيَّف بصعوبة.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Tout bénéfice peut-il quitter le Maroc ?', 'Can every profit leave Morocco?', 'هل يمكن لكل ربح أن يغادر المغرب؟'), a:t('Non, pas par principe. Il faut une opération qualifiée, des comptes, et l’acceptation de la banque au regard des règles publiées par l’Office des Changes. Ce guide ne crée aucun droit automatique.', 'No, not as a principle. You need a classified operation, accounts, and the bank’s acceptance in light of the rules published by the Foreign Exchange Office. This guide creates no automatic right.', 'لا، ليس كمبدأ. يلزم عملية مكيّفة وحسابات وقبول البنك في ضوء القواعد التي ينشرها مكتب الصرف. ولا ينشئ هذا الدليل أي حق تلقائي.')},
      {q:t('Quel est le taux de la retenue ?', 'What is the withholding rate?', 'ما سعر الاقتطاع؟'), a:t('Il n’est pas indiqué ici. Il se lit dans le CGI et, s’il s’applique, dans la convention, à la date de l’opération. Faites-le vérifier par un professionnel.', 'It is not stated here. It is read in the General Tax Code and, where it applies, in the treaty, on the date of the operation. Have it checked by a professional.', 'غير مذكور هنا. يُقرأ في المدونة، وعند انطباقها، في الاتفاقية، في تاريخ العملية. تحققوا منه لدى مهني.')},
      {q:t('Le cabinet peut-il faire le virement ?', 'Can the firm make the transfer?', 'هل يستطيع المكتب إجراء التحويل؟'), a:t('Non. Il peut ordonner les pièces. La banque exécute ou refuse. Un devis se demande au [contact](contact).', 'No. It can organise the documents. The bank executes or refuses. A quote is requested at [contact](contact).', 'لا. يمكنه ترتيب الوثائق. والبنك ينفذ أو يرفض. ويُطلب العرض في [الاتصال](contact).')},
      {q:t('Une liquidation permet-elle de tout reprendre ?', 'Does a liquidation allow you to take everything back?', 'هل تسمح التصفية باسترجاع كل شيء؟'), a:t('Seulement le solde après les dettes, et seulement s’il est qualifié et transférable. Le guide de la dissolution décrit l’ordre. Il ne promet pas le montant.', 'Only the balance after the debts, and only if it is classified and transferable. The dissolution guide describes the order. It does not promise the amount.', 'فقط الرصيد بعد الديون، وفقط إذا كان مكيّفاً وقابلاً للتحويل. ودليل الحل يصف الترتيب. وهو لا يعد بالمبلغ.')}
    ],
    links:[
      link('guides/igoc-transfert-dividendes', 'Transferts de dividendes', 'Dividend transfers', 'تحويلات الأرباح'),
      link('guides/fiscalite-dividendes-international', 'Fiscalité des dividendes', 'Tax on dividends', 'جباية الأرباح'),
      link('guides/statut-non-resident-fiscal-maroc', 'Non-résident fiscal', 'Tax non-resident', 'غير المقيم ضريبياً'),
      link('guides/compte-courant-associe-maroc', 'Compte courant', 'Current account', 'الحساب الجاري'),
      link('guides/dissoudre-et-liquider-societe-maroc', 'Liquidation', 'Liquidation', 'التصفية'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:moneySources
  },
  {
    slug:'devenir-freelance-au-maroc',
    category:t('Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
    fiscal:true,
    title:t('Devenir freelance au Maroc', 'Becoming a freelancer in Morocco', 'العمل الحر بالمغرب'),
    description:t(
      'Le freelance n’est pas une forme juridique. Au Maroc, l’activité se range soit dans le statut d’auto-entrepreneur, soit dans une société. Les plafonds et les activités exclues se lisent sur le portail officiel, pas ici.',
      'Freelancing is not a legal form. In Morocco, the activity sits either in the auto-entrepreneur status or in a company. The ceilings and excluded activities are read on the official portal, not here.',
      'العمل الحر ليس شكلاً قانونياً. في المغرب، يُرتب النشاط إما في وضع المقاول الذاتي وإما في شركة. والأسقف والأنشطة المستبعدة تُقرأ في البوابة الرسمية، لا هنا.'
    ),
    sections:[
      {
        heading:t('Choisir un cadre, pas une étiquette', 'Choose a frame, not a label', 'اختاروا إطاراً، لا تسمية'),
        paragraphs:[
          t(
            'Dire « je suis freelance » ne crée ni un identifiant, ni le droit de facturer. Deux cadres existent, et ils ne se ressemblent pas. L’auto-entrepreneur est un statut de personne physique. Ses conditions, ses plafonds de chiffre d’affaires et les activités qu’il n’admet pas sont publiés sur le portail officiel. Ils changent. Ce guide ne les recopie pas. Une société, souvent une SARL à associé unique, est une personne morale, avec des statuts, un siège et un suivi juridique et fiscal. Le [guide auto-entrepreneur ou SARL AU](guides/auto-entrepreneur-vs-sarlau) compare les deux. Le [guide du passage vers la SARL](guides/auto-entrepreneur-vers-sarl) sert quand le statut ne suffit plus. Lisez les seuils sur ae.gov.ma avant de croire un chiffre ancien.',
            'Saying “I am a freelancer” creates neither an identifier nor the right to invoice. Two frames exist, and they are not alike. The auto-entrepreneur status is a status for an individual. Its conditions, its turnover ceilings and the activities it does not allow are published on the official portal. They change. This guide does not copy them. A company, often a single-member SARL, is a legal person, with articles, an office and company accounts. The [auto-entrepreneur or single-member SARL guide](guides/auto-entrepreneur-vs-sarlau) compares the two. The [guide to moving to a SARL](guides/auto-entrepreneur-vers-sarl) is for when the status is no longer enough. Read the thresholds on ae.gov.ma before you trust an old figure.',
            'قول «أنا أعمل حراً» لا ينشئ معرفاً ولا حق الفوترة. يوجد إطاران، وهما لا يتشابهان. المقاول الذاتي وضع لشخص ذاتي. وشروطه وأسقف رقم معاملاته والأنشطة التي لا يقبلها منشورة في البوابة الرسمية. وهي تتغير. ولا ينسخها هذا الدليل. والشركة، غالباً SARL ذات الشريك الوحيد، شخص معنوي، بنظام ومقر ومتابعة قانونية وجبائية. ويقارن [دليل المقاول الذاتي أو SARL AU](guides/auto-entrepreneur-vs-sarlau) الاثنين. و[دليل الانتقال إلى SARL](guides/auto-entrepreneur-vers-sarl) يخدم حين لم يعد الوضع كافياً. اقرأوا الأسقف على ae.gov.ma قبل تصديق رقم قديم.'
          ),
          t(
            'Le choix dépend de faits, pas d’une image. Travaillez-vous seul, sans local ouvert au public, pour quelques clients ? Le statut peut convenir si l’activité est admise et si vous restez sous les conditions publiées. Avez-vous un associé, des salariés, un stock, ou un client qui exige une société ? La société devient le cadre. Un client étranger qui demande une « company » ne vous dispense pas de vérifier si le statut suffit. Felexia Conseils, à Mabrouka, cadre ce choix. La proposition ne transforme pas un statut en société.',
            'The choice depends on facts, not on an image. Do you work alone, with no premises open to the public, for a few clients? The status may suit if the activity is allowed and you stay within the published conditions. Do you have a partner, employees, stock, or a client who requires a company? The company becomes the frame. A foreign client who asks for a “company” does not remove the need to check whether the status is enough. Felexia Conseils, in Mabrouka, scopes that choice. The proposal does not turn a status into a company.',
            'يتوقف الاختيار على الوقائع، لا على صورة. هل تعملون وحدكم، بلا محل مفتوح للعموم، لبضعة زبناء؟ قد يناسب الوضع إذا كان النشاط مقبولاً وبقيتم ضمن الشروط المنشورة. هل لكم شريك أو أجراء أو مخزون أو زبون يشترط شركة؟ تصبح الشركة هي الإطار. والزبون الأجنبي الذي يطلب «شركة» لا يعفيكم من التحقق هل يكفي الوضع. ويؤطر Felexia Conseils، بمبروكة، هذا الاختيار. والعرض لا يحوّل وضعاً إلى شركة.'
          )
        ]
      },
      {
        heading:t('Facturer, déclarer, ne pas mélanger', 'Invoicing, filing, not mixing', 'الفوترة والتصريح وعدم الخلط'),
        paragraphs:[
          t(
            'Dans les deux cadres, le client paie une activité identifiée, pas un compte personnel anonyme. L’auto-entrepreneur facture selon les règles de son statut, publiées avec lui. La société facture en son nom, avec ses identifiants. Le [guide de la facturation électronique](guides/facturation-electronique-maroc) traite du support de la facture, pas du choix du cadre. Ne faites pas encaisser le chiffre d’affaires de la société sur le compte personnel « en attendant la banque ». Le [compte professionnel](guides/compte-bancaire-mre) se distingue du compte personnel, y compris pour un freelance qui vit une partie de l’année à l’étranger.',
            'In both frames, the client pays an identified activity, not an anonymous personal account. The auto-entrepreneur invoices under the rules of the status, published with it. The company invoices in its own name, with its identifiers. The [electronic invoicing guide](guides/facturation-electronique-maroc) deals with the form of the invoice, not with the choice of frame. Do not collect the company’s turnover in the personal account “until the bank is ready”. The [business account](guides/compte-bancaire-mre) is separate from the personal account, including for a freelancer who lives part of the year abroad.',
            'في الإطارين، يؤدي الزبون نشاطاً معروفاً، لا حساباً شخصياً مجهولاً. والمقاول الذاتي يفوتر وفق قواعد وضعه، المنشورة معه. والشركة تفوتر باسمها، بمعرفاتها. ويعالج [دليل الفوترة الإلكترونية](guides/facturation-electronique-maroc) شكل الفاتورة، لا اختيار الإطار. ولا تقبضوا رقم معاملات الشركة في الحساب الشخصي «إلى أن يجهز البنك». و[الحساب المهني](guides/compte-bancaire-mre) مستقل عن الحساب الشخصي، بما في ذلك لمن يعمل حراً ويعيش جزءاً من السنة في الخارج.'
          ),
          t(
            'Les déclarations et l’impôt dépendent du cadre. Aucun taux n’est publié ici. Le régime de l’auto-entrepreneur se lit sur son portail et dans le CGI. L’impôt de la société et, le cas échéant, la rémunération du gérant se vérifient auprès d’un professionnel. Si vous embauchez, vous devenez employeur : affiliation et déclarations à la CNSS selon les règles de cet organisme. Être freelance ne dispense pas d’un bulletin de paie dès lors qu’il y a un salarié. Votre propre couverture sociale, dans le statut ou dans la société, se confirme auprès de la CNSS ou du régime indiqué sur le portail. Elle ne se devine pas.',
            'Filings and tax depend on the frame. No rate is published here. The auto-entrepreneur regime is read on its portal and in the General Tax Code. Company tax and, where relevant, the manager’s remuneration are checked with a professional. If you hire, you become an employer: affiliation and filings with the CNSS under that body’s rules. Being a freelancer does not remove a payslip once there is an employee. Your own social cover, in the status or in the company, is confirmed with the CNSS or the scheme shown on the portal. It is not guessed.',
            'التصاريح والضريبة تتوقف على الإطار. ولا يُنشر هنا أي سعر. ونظام المقاول الذاتي يُقرأ في بوابته وفي المدونة. وضريبة الشركة، وعند الاقتضاء، مكافأة المسيّر تُتحقق لدى مهني. وإذا شغّلتم، صرتم مشغّلاً: انخراط وتصاريح لدى الصندوق وفق قواعده. والعمل الحر لا يعفي من كشف الأجر منذ وجود أجير. وتغطيتكم الاجتماعية، في الوضع أو في الشركة، تُؤكد لدى الصندوق أو النظام المبين في البوابة. وهي لا تُخمَّن.'
          )
        ]
      },
      {
        heading:t('Clients à l’étranger et siège', 'Clients abroad and the office', 'زبناء في الخارج والمقر'),
        paragraphs:[
          t(
            'Facturer un client hors du Maroc peut relever du régime de change applicable aux exportations de services. L’Office des Changes publie ce régime. Le [guide des exportations de services](guides/export-biens-services-change-maroc) le présente. Il ne crée pas un compte en devises par le seul fait d’avoir un client étranger. Gardez les contrats et les preuves d’encaissement. Un freelance qui vit à l’étranger et facture depuis une structure marocaine ajoute la question de sa [résidence fiscale](guides/statut-non-resident-fiscal-maroc). Les deux sujets ne se répondent pas l’un l’autre.',
            'Invoicing a client outside Morocco may fall under the exchange regime that applies to exports of services. The Foreign Exchange Office publishes that regime. The [guide to exports of services](guides/export-biens-services-change-maroc) presents it. It does not create a foreign-currency account merely because you have a foreign client. Keep the contracts and the proof of collection. A freelancer who lives abroad and invoices from a Moroccan structure adds the question of their [tax residence](guides/statut-non-resident-fiscal-maroc). The two subjects do not answer each other.',
            'فوترة زبون خارج المغرب قد تدخل في نظام الصرف المطبق على تصدير الخدمات. وينشر مكتب الصرف هذا النظام. ويعرضه [دليل تصدير الخدمات](guides/export-biens-services-change-maroc). وهو لا ينشئ حساباً بالعملة لمجرد وجود زبون أجنبي. احتفظوا بالعقود وإثبات القبض. ومن يعمل حراً ويعيش في الخارج ويفوتر من هيكل مغربي يضيف سؤال [إقامته الضريبية](guides/statut-non-resident-fiscal-maroc). والموضوعان لا يجيب أحدهما عن الآخر.'
          ),
          t(
            'Le siège suit l’activité. Une prestation sans accueil du public peut se contenter d’une [domiciliation](domiciliation), si le contrat le permet. Un atelier, un stockage ou des rendez-vous clients sur place appellent un local. Le [guide du siège](guides/siege-social-maroc) compare les titres. À Marrakech, l’adresse du cabinet n’est pas votre siège tant qu’un contrat ne le dit pas. Ne faites pas figurer l’adresse d’un café ou d’un proche sur une facture.',
            'The office follows the activity. A service with no public reception may use [domiciliation](domiciliation), if the contract allows it. A workshop, storage or client meetings on the spot call for premises. The [office guide](guides/siege-social-maroc) compares the titles. In Marrakech, the firm’s address is not your office until a contract says so. Do not put the address of a café or a relative on an invoice.',
            'المقر يتبع النشاط. وخدمة بلا استقبال للعموم قد تكتفي بـ[توطين](domiciliation)، إذا سمح العقد. وورشة أو تخزين أو مواعيد زبناء في عين المكان تطلب محلاً. ويقارن [دليل المقر](guides/siege-social-maroc) السندات. وبمراكش، عنوان المكتب ليس مقركم إلى أن يقول ذلك عقد. ولا تضعوا عنوان مقهى أو قريب على فاتورة.'
          )
        ]
      },
      {
        heading:t('Avant la première facture', 'Before the first invoice', 'قبل أول فاتورة'),
        paragraphs:[
          t('Ces points se vérifient dans l’ordre. Le dernier ne rattrape pas l’absence du premier.', 'These points are checked in order. The last one does not make up for the absence of the first.', 'تُراجع هذه النقاط بالترتيب. والأخيرة لا تعوّض غياب الأولى.')
        ],
        list:t(
          [
            'L’activité est admise par le statut, ou elle est portée par une société.',
            'Les plafonds en vigueur ont été lus sur le portail, pas dans un article.',
            'Le siège est justifié par un titre, pas par une habitude.',
            'Le compte qui encaisse est celui du cadre choisi.',
            'Les clients étrangers sont rapprochés du régime de l’Office des Changes.',
            'L’embauche, s’il y en a une, passe par la CNSS.',
            'L’impôt du cadre est confirmé par un professionnel, sans taux recopié.'
          ],
          [
            'The activity is allowed by the status, or it is carried by a company.',
            'The ceilings in force were read on the portal, not in an article.',
            'The office is evidenced by a title, not by a habit.',
            'The account that collects is the one of the frame you chose.',
            'Foreign clients are matched to the Foreign Exchange Office regime.',
            'Hiring, if there is any, goes through the CNSS.',
            'The tax of the frame is confirmed by a professional, with no rate copied.'
          ],
          [
            'النشاط مقبول في الوضع، أو تحمله شركة.',
            'الأسقف الجارية قُرئت في البوابة، لا في مقال.',
            'المقر مثبت بسند، لا بعادة.',
            'الحساب الذي يقبض هو حساب الإطار المختار.',
            'الزبناء الأجانب قُورنوا بنظام مكتب الصرف.',
            'التشغيل، إن وُجد، يمر عبر الصندوق.',
            'ضريبة الإطار أكدها مهني، بلا سعر منسوخ.'
          ]
        )
      },
      {
        heading:t('Le contrat avec le client', 'The contract with the client', 'العقد مع الزبون'),
        paragraphs:[
          t(
            'Avant le cadre fiscal, décrivez ce que vous vendez. Une mission a un objet, un livrable, un prix et une personne qui paie. Si le client est une société marocaine, il voudra une facture à son nom et, parfois, un contrat. Si vous êtes au statut, la facture est la vôtre. Si vous êtes en société, la facture est celle de la société, même si c’est vous qui faites le travail. Mélanger les deux, une fois sur deux, casse la lecture de l’année. Le prix se négocie. Ce guide n’a pas de tarif de freelance. Une clause de retard ou de propriété des fichiers se rédige dans le contrat. Elle ne se devine pas dans un message.',
            'Before the tax frame, describe what you sell. An assignment has a purpose, a deliverable, a price and a person who pays. If the client is a Moroccan company, it will want an invoice in its name and, sometimes, a contract. If you are under the status, the invoice is yours. If you are in a company, the invoice is the company’s, even if you do the work. Mixing the two, every other time, breaks the reading of the year. The price is negotiated. This guide has no freelancer tariff. A clause on delay or on ownership of the files is written in the contract. It is not guessed from a message.',
            'قبل الإطار الضريبي، صفوا ما تبيعون. للمهمة غرض وتسليم وثمن وشخص يؤدي. وإذا كان الزبون شركة مغربية، فسيريد فاتورة باسمه، وأحياناً عقداً. وإذا كنتم في الوضع، فالفاتورة فاتورتكم. وإذا كنتم في شركة، فالفاتورة فاتورة الشركة، حتى لو أنتم من يعمل. وخلط الاثنين، مرة بعد مرة، يكسر قراءة السنة. والثمن يُتفاوض عليه. وليس لهذا الدليل تعريفة عمل حر. وبند التأخير أو ملكية الملفات يُكتب في العقد. وهو لا يُخمَّن من رسالة.'
          ),
          t(
            'Un client qui vous impose ses horaires, ses outils et l’interdiction de travailler pour d’autres peut poser une question de qualification, distincte du statut que vous avez choisi. Ce guide ne requalifie pas une relation en contrat de travail. Il vous dit de la faire lire avant d’accepter une exclusivité longue. À Marrakech, beaucoup de missions viennent du tourisme, de l’immobilier ou de clients étrangers de passage. Le siège peut rester une domiciliation si personne n’est reçu. Dès que le client vient dans un local, le titre de ce local compte. La page [création](creation-entreprise) ouvre le dossier quand la société est la bonne voie. Notez enfin le nom sous lequel le client vous connaît et le nom qui figure sur la facture. S’ils diffèrent, expliquez-le dans le contrat. Un virement libellé au nom d’une marque que la banque ne relie pas à votre statut ou à votre société reste en suspens. Ce n’est pas un délai administratif. C’est un libellé. Le corriger avant la mission coûte moins qu’un avoir en fin de mois.',
            'A client who imposes your hours, your tools and a ban on working for others may raise a classification question, separate from the status you chose. This guide does not reclassify a relationship as an employment contract. It tells you to have it read before you accept a long exclusivity. In Marrakech, many assignments come from tourism, property or foreign clients passing through. The office can remain a domiciliation if nobody is received. As soon as the client comes to premises, the title to those premises matters. The [formation](creation-entreprise) page opens the file when a company is the right path.',
            'زبون يفرض أوقاتكم وأدواتكم ومنع العمل لغيرهم قد يطرح سؤال تكييف، مستقلاً عن الوضع الذي اخترتم. ولا يعيد هذا الدليل تكييف علاقة إلى عقد شغل. وهو يقول لكم أن تطلبوا قراءتها قبل قبول حصرية طويلة. وبمراكش، كثير من المهام تأتي من السياحة أو العقار أو زبناء أجانب عابرين. وقد يبقى المقر توطيناً إذا لم يُستقبل أحد. ومنذ أن يأتي الزبون إلى محل، يهم سند هذا المحل. وصفحة [التأسيس](creation-entreprise) تفتح الملف حين تكون الشركة هي المسار المناسب.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Le freelance est-il une société ?', 'Is a freelancer a company?', 'هل العمل الحر شركة؟'), a:t('Non. C’est une façon de travailler. Le cadre juridique est le statut d’auto-entrepreneur ou une société. Le [contact](contact) sert à cadrer le choix. Il ne délivre pas le statut.', 'No. It is a way of working. The legal frame is the auto-entrepreneur status or a company. [Contact](contact) is where the choice is scoped. It does not issue the status.', 'لا. إنه طريقة عمل. والإطار القانوني هو وضع المقاول الذاتي أو شركة. و[الاتصال](contact) مكان تأطير الاختيار. وهو لا يسلم الوضع.')},
      {q:t('Puis-je dépasser le plafond et rester au statut ?', 'Can I go over the ceiling and stay in the status?', 'هل يمكن تجاوز السقف والبقاء في الوضع؟'), a:t('Les conséquences d’un dépassement sont celles publiées sur le portail et dans le CGI. Ce guide ne les résume pas par un nombre d’années ou un montant. Vérifiez-les avant de signer un gros contrat.', 'The consequences of going over are those published on the portal and in the General Tax Code. This guide does not summarise them as a number of years or an amount. Check them before you sign a large contract.', 'آثار التجاوز هي المنشورة في البوابة وفي المدونة. ولا يلخصها هذا الدليل بعدد سنوات أو مبلغ. تحققوا منها قبل توقيع عقد كبير.')},
      {q:t('Un MRE peut-il être auto-entrepreneur ?', 'Can a Moroccan abroad be an auto-entrepreneur?', 'هل يمكن لمغربي بالخارج أن يكون مقاولاً ذاتياً؟'), a:t('Seulement si les conditions du statut, y compris celles liées à la résidence, sont remplies. Elles se lisent sur le portail. Résider à l’étranger peut être incompatible. Une société est alors l’autre voie, décrite dans le guide de création sans vivre toute l’année au Maroc.', 'Only if the conditions of the status, including those linked to residence, are met. They are read on the portal. Living abroad may be incompatible. A company is then the other path, described in the guide to forming a company without living in Morocco all year.', 'فقط إذا استُوفيت شروط الوضع، بما فيها المرتبطة بالإقامة. وتُقرأ في البوابة. وقد لا يتوافق العيش في الخارج. والشركة حينئذ هي المسار الآخر، الموصوف في دليل التأسيس دون العيش في المغرب طوال السنة.')},
      {q:t('Faut-il un prestataire pour les déclarations ?', 'Do you need a provider for the filings?', 'هل يلزم مقدم خدمة للتصاريح؟'), a:t('Le statut et la société n’ont pas les mêmes obligations. Ce guide n’impose pas un prestataire. Il dit de faire vérifier l’impôt et les déclarations par un professionnel plutôt que de recopier un taux.', 'The status and the company do not have the same obligations. This guide does not require a provider. It says to have the tax and the filings checked by a professional rather than copying a rate.', 'الوضع والشركة ليست لهما الواجبات نفسها. ولا يفرض هذا الدليل مقدم خدمة. وهو يقول أن تُتحقق الضريبة والتصاريح لدى مهني بدل نسخ سعر.')}
    ],
    links:[
      link('guides/auto-entrepreneur-vs-sarlau', 'Auto-entrepreneur ou SARL AU', 'Auto-entrepreneur or single-member SARL', 'المقاول الذاتي أو SARL AU'),
      link('guides/auto-entrepreneur', 'Le statut déjà décrit', 'The status already described', 'الوضع الموصوف سلفاً'),
      link('guides/auto-entrepreneur-vers-sarl', 'Passer en société', 'Move to a company', 'الانتقال إلى شركة'),
      link('guides/mre-creer-societe-sans-vivre-au-maroc', 'Créer sans vivre toute l’année au Maroc', 'Form a company without living in Morocco all year', 'التأسيس دون العيش طوال السنة'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('formes-juridiques', 'Formes juridiques', 'Legal forms', 'الأشكال القانونية'),
      link('domiciliation', 'Domiciliation', 'Domiciliation', 'التوطين'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:activitySources
  },
  {
    slug:'lancer-ecommerce-au-maroc',
    category:t('Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
    fiscal:true,
    title:t('Lancer un e-commerce au Maroc', 'Starting an online shop in Morocco', 'إطلاق تجارة إلكترونية بالمغرب'),
    description:t(
      'Un site marchand au Maroc repose sur une société ou un statut, un local ou un stock justifié, et des obligations envers le client et les données. Le régime de change des paiements internationaux se lit chez l’Office des Changes.',
      'An online shop in Morocco rests on a company or a status, evidenced premises or stock, and duties towards the customer and towards data. The exchange regime for international payments is read at the Foreign Exchange Office.',
      'متجر إلكتروني بالمغرب يقوم على شركة أو وضع، ومحل أو مخزون مثبت، وواجبات تجاه الزبون والمعطيات. ونظام صرف الأداءات الدولية يُقرأ لدى مكتب الصرف.'
    ),
    sections:[
      {
        heading:t('Le site n’est pas l’entreprise', 'The website is not the business', 'الموقع ليس المقاولة'),
        paragraphs:[
          t(
            'Ouvrir une boutique en ligne commence par le cadre, pas par le thème graphique. Qui vend : une personne au statut d’auto-entrepreneur, si l’activité et les plafonds publiés sur ae.gov.ma le permettent, ou une société. Le [guide freelance](guides/devenir-freelance-au-maroc) aide à ne pas confondre les deux. Le nom de la boutique n’est pas la dénomination. Le [certificat négatif](guides/certificat-negatif-ompic) réserve le nom de la société. La marque, si vous la voulez, se dépose à part à l’OMPIC. Beaucoup de litiges de e-commerce commencent parce que le nom du site, le nom de la société et le compte qui encaisse ne sont pas les mêmes.',
            'Opening an online shop starts with the frame, not with the visual theme. Who sells: a person under the auto-entrepreneur status, if the activity and the ceilings published on ae.gov.ma allow it, or a company. The [freelancer guide](guides/devenir-freelance-au-maroc) helps you not to confuse the two. The shop name is not the company name. The [negative certificate](guides/certificat-negatif-ompic) reserves the company’s name. The trademark, if you want one, is filed separately with OMPIC. Many online-shop disputes start because the site name, the company name and the account that collects are not the same.',
            'فتح متجر إلكتروني يبدأ بالإطار، لا بالقالب البصري. من يبيع: شخص في وضع المقاول الذاتي، إذا سمح النشاط والأسقف المنشورة على ae.gov.ma، أو شركة. و[دليل العمل الحر](guides/devenir-freelance-au-maroc) يساعد على عدم الخلط بينهما. واسم المتجر ليس التسمية. و[الشهادة السلبية](guides/certificat-negatif-ompic) تحجز اسم الشركة. والعلامة، إذا أردتموها، تُودع على حدة لدى OMPIC. وكثير من نزاعات التجارة الإلكترونية تبدأ لأن اسم الموقع واسم الشركة والحساب الذي يقبض ليست واحدة.'
          ),
          t(
            'Le stock et les retours ont une adresse. Un e-commerce n’est pas, par nature, une activité sans local. Si vous stockez, préparez ou recevez des retours, le [siège](guides/siege-social-maroc) doit pouvoir l’accueillir. Une domiciliation sans stockage ne convient pas à un entrepôt, même petit. Dites-le avant les statuts. À Marrakech, un appartement qui reçoit des livreurs toute la journée peut aussi poser une question de copropriété, distincte du droit des sociétés.',
            'Stock and returns have an address. An online shop is not, by nature, an activity without premises. If you store, pack or receive returns, the [office](guides/siege-social-maroc) must be able to take them. A domiciliation with no storage does not suit a warehouse, even a small one. Say so before the articles. In Marrakech, a flat that receives couriers all day can also raise a co-ownership question, separate from company law.',
            'للمخزون والمرتجعات عنوان. والتجارة الإلكترونية ليست، بطبيعتها، نشاطاً بلا محل. وإذا خزنتم أو حضّرتم أو استقبلتم مرتجعات، وجب أن يستطيع [المقر](guides/siege-social-maroc) ذلك. وتوطين بلا تخزين لا يناسب مستودعاً، حتى صغيراً. قولوا ذلك قبل النظام. وبمراكش، شقة تستقبل موزعين طوال اليوم قد تطرح أيضاً سؤال ملكية مشتركة، مستقلاً عن قانون الشركات.'
          )
        ]
      },
      {
        heading:t('Le client et ses données', 'The customer and their data', 'الزبون ومعطياته'),
        paragraphs:[
          t(
            'La vente à distance est encadrée, notamment par la loi n° 31-08 relative à la protection du consommateur, dans son texte au Bulletin officiel. Le client doit pouvoir identifier le vendeur, comprendre le prix et les conditions, et exercer les droits que cette loi prévoit, dont le droit de rétractation lorsqu’il s’applique. Les délais et les exceptions se lisent dans la loi. Ils ne sont pas résumés par un nombre de jours sur cette page, parce qu’une exception oubliée rendrait le chiffre faux. Affichez sur le site l’identité réelle de la société ou du statut, pas seulement une marque.',
            'Distance selling is framed, in particular by Law 31-08 on consumer protection, in its text in the Official Gazette. The customer must be able to identify the seller, understand the price and the conditions, and use the rights that law provides, including the right of withdrawal where it applies. The deadlines and the exceptions are read in the statute. They are not summarised as a number of days on this page, because a forgotten exception would make the figure wrong. Show on the site the real identity of the company or of the status, not only a brand.',
            'البيع عن بُعد مؤطر، خصوصاً بالقانون رقم 31-08 المتعلق بحماية المستهلك، في نصه بالجريدة الرسمية. ويجب أن يستطيع الزبون معرفة البائع وفهم الثمن والشروط وممارسة الحقوق التي ينص عليها هذا القانون، ومنها حق التراجع حين ينطبق. والآجال والاستثناءات تُقرأ في القانون. وهي غير ملخصة بعدد أيام في هذه الصفحة، لأن استثناء منسياً يجعل الرقم خاطئاً. اعرضوا في الموقع الهوية الحقيقية للشركة أو للوضع، لا علامة فقط.'
          ),
          t(
            'Les données des clients, paiements compris dans la mesure où elles identifient une personne, relèvent de la loi n° 09-08. Le [guide CNDP](guides/cndp-loi-09-08-protection-donnees-personnelles-maroc) et le [guide des déclarations](guides/declarations-autorisations-cndp-guide-pratique) disent comment s’orienter. Ce guide ne dit pas si votre formulaire est dispensé ou soumis à autorisation. Il dit de le vérifier avant de brancher un outil qui envoie les adresses à l’étranger. Un bandeau copié d’un site étranger ne vaut pas démarche auprès de la CNDP.',
            'Customers’ data, including payments insofar as they identify a person, come under Law 09-08. The [CNDP guide](guides/cndp-loi-09-08-protection-donnees-personnelles-maroc) and the [declarations guide](guides/declarations-autorisations-cndp-guide-pratique) say how to find your way. This guide does not say whether your form is exempt or subject to authorisation. It says to check before you connect a tool that sends addresses abroad. A banner copied from a foreign site is not a filing with the CNDP.',
            'معطيات الزبناء، بما فيها الأداءات بقدر ما تعرّف شخصاً، تخضع للقانون رقم 09-08. ويقول [دليل اللجنة](guides/cndp-loi-09-08-protection-donnees-personnelles-maroc) و[دليل التصاريح](guides/declarations-autorisations-cndp-guide-pratique) كيف تهتدون. ولا يقول هذا الدليل هل استمارتكم معفاة أو خاضعة لإذن. وهو يقول أن تتحققوا قبل ربط أداة ترسل العناوين إلى الخارج. وشريط منسوخ من موقع أجنبي ليس إجراءً لدى اللجنة.'
          )
        ]
      },
      {
        heading:t('Paiements, factures et l’étranger', 'Payments, invoices and abroad', 'الأداءات والفواتير والخارج'),
        paragraphs:[
          t(
            'Le compte qui reçoit les paiements est celui de l’entreprise. Les prestataires de paiement ont leurs propres conditions. Ce guide n’en recommande aucun et n’annonce aucuns frais. La facture suit le [cadre de la facturation](guides/facturation-electronique-maroc). La TVA, si elle s’applique à votre activité, se vérifie dans le CGI. Aucun taux n’est cité. Un catalogue de prix affiché TTC ou hors taxe se décide après cette vérification, pas avant.',
            'The account that receives payments is the business’s. Payment providers have their own conditions. This guide recommends none and states no fees. The invoice follows the [invoicing frame](guides/facturation-electronique-maroc). VAT, if it applies to your activity, is checked in the General Tax Code. No rate is cited. A price list shown tax-included or before tax is decided after that check, not before.',
            'الحساب الذي يتلقى الأداءات هو حساب المقاولة. ولمقدمي الأداء شروطهم. ولا يوصي هذا الدليل بأي منهم ولا يعلن أي مصاريف. والفاتورة تتبع [إطار الفوترة](guides/facturation-electronique-maroc). والضريبة على القيمة المضافة، إذا انطبقت على نشاطكم، تُتحقق في المدونة. ولا يُذكر أي سعر. وجدول أسعار ظاهر بالضريبة أو دونها يُقرر بعد هذا التحقق، لا قبله.'
          ),
          t(
            'Vendre à l’étranger, ou encaisser depuis l’étranger, relève aussi de l’Office des Changes. Le [guide du commerce électronique et du change](guides/commerce-electronique-change-maroc) traite des dotations et du régime. Il ne remplace pas la lecture du texte à jour. Acheter du stock hors du Maroc pose la question inverse : faire entrer la marchandise et la payer. Ne mélangez pas la carte personnelle et le compte de la société pour « aller plus vite ». La page [création](creation-entreprise) sert à poser le cadre avant la mise en ligne. Un devis se demande au [contact](contact).',
            'Selling abroad, or collecting from abroad, also comes under the Foreign Exchange Office. The [guide to online commerce and exchange control](guides/commerce-electronique-change-maroc) deals with allowances and the regime. It does not replace reading the up-to-date text. Buying stock outside Morocco raises the reverse question: bringing the goods in and paying for them. Do not mix the personal card and the company’s account in order to “go faster”. The [formation](creation-entreprise) page is where the frame is set before you go online. A quote is requested at [contact](contact).',
            'البيع إلى الخارج، أو القبض من الخارج، يخضع أيضاً لمكتب الصرف. ويعالج [دليل التجارة الإلكترونية والصرف](guides/commerce-electronique-change-maroc) المخصصات والنظام. وهو لا يعوّض قراءة النص المحين. وشراء المخزون خارج المغرب يطرح السؤال العكسي: إدخال البضاعة وأداؤها. ولا تخلطوا البطاقة الشخصية وحساب الشركة «للإسراع». وصفحة [التأسيس](creation-entreprise) مكان وضع الإطار قبل الإطلاق. ويُطلب العرض في [الاتصال](contact).'
          )
        ]
      },
      {
        heading:t('Avant la mise en ligne', 'Before going online', 'قبل الإطلاق'),
        paragraphs:[
          t('Le site peut attendre. Le cadre, non.', 'The site can wait. The frame cannot.', 'الموقع يمكن أن ينتظر. الإطار لا.')
        ],
        list:t(
          [
            'Le vendeur est une société ou un statut, avec des identifiants.',
            'Le nom du site, la dénomination et le compte d’encaissement se correspondent.',
            'Le stock et les retours ont une adresse autorisée.',
            'Les mentions au client suivent la loi n° 31-08, exceptions comprises.',
            'Les données personnelles sont rapprochées de la loi n° 09-08.',
            'La TVA et le change international sont vérifiés, sans taux inventé.',
            'Les factures sortent au nom de l’entreprise, pas d’une personne tierce.'
          ],
          [
            'The seller is a company or a status, with identifiers.',
            'The site name, the company name and the collection account match.',
            'Stock and returns have an authorised address.',
            'The information for the customer follows Law 31-08, exceptions included.',
            'Personal data are matched to Law 09-08.',
            'VAT and international exchange control are checked, with no invented rate.',
            'Invoices are issued in the business’s name, not in a third person’s.'
          ],
          [
            'البائع شركة أو وضع، بمعرفات.',
            'اسم الموقع والتسمية وحساب القبض متطابقة.',
            'المخزون والمرتجعات لهما عنوان مأذون.',
            'البيانات للزبون تتبع القانون رقم 31-08، مع الاستثناءات.',
            'المعطيات الشخصية قورنت بالقانون رقم 09-08.',
            'ضريبة القيمة المضافة والصرف الدولي تم التحقق منهما، بلا سعر مخترع.',
            'الفواتير تصدر باسم المقاولة، لا باسم شخص ثالث.'
          ]
        )
      },
      {
        heading:t('Livrer, reprendre, et rester joignable', 'Delivering, taking goods back, and staying reachable', 'التسليم والاسترجاع والبقاء في المتناول'),
        paragraphs:[
          t(
            'La promesse affichée sur le site est un engagement. Délai de livraison, zone desservie, frais et mode de retour se décrivent tels qu’ils sont, pas tels qu’un modèle étranger les a rédigés. Si vous ne livrez pas hors du Maroc, dites-le. Si un transporteur tient le colis, le contrat avec lui dit qui répond au client quand le colis est perdu. La loi n° 31-08 reste le cadre des droits du consommateur. Elle ne choisit pas votre transporteur. Un stock à Marrakech et des clients à Casablanca supposent un circuit écrit : qui prépare, qui remet, qui note le retour. Sans cela, le premier pic de commandes mélange les paiements et les colis.',
            'The promise shown on the site is a commitment. Delivery time, the area served, the cost and the way returns work are described as they are, not as a foreign template wrote them. If you do not deliver outside Morocco, say so. If a carrier holds the parcel, the contract with them says who answers the customer when the parcel is lost. Law 31-08 remains the frame of consumer rights. It does not choose your carrier. Stock in Marrakech and customers in Casablanca assume a written path: who packs, who hands over, who records the return. Without that, the first surge of orders mixes payments and parcels.',
            'الوعد المعروض في الموقع التزام. وأجل التسليم والنطاق والمصروف وطريقة الإرجاع تُوصف كما هي، لا كما كتبها قالب أجنبي. وإذا كنتم لا تسلمون خارج المغرب، فقولوا ذلك. وإذا أمسك ناقل الطرد، فالعقد معه يقول من يجيب الزبون حين يضيع الطرد. ويبقى القانون رقم 31-08 إطار حقوق المستهلك. وهو لا يختار ناقلكم. ومخزون بمراكش وزبناء بالدار البيضاء يفترضان مساراً مكتوباً: من يحضّر، ومن يسلم، ومن يسجل الإرجاع. ومن دون ذلك، أول موجة طلبات تخلط الأداءات والطرود.'
          ),
          t(
            'Gardez une personne joignable à l’adresse annoncée. Une réclamation qui revient « sans destinataire » est un mauvais début de litige. Le courrier du siège, s’il est domicilié, doit être lu. Le [guide de domiciliation à Marrakech](guides/domiciliation-marrakech) rappelle que le courrier n’est pas implicite. Pour les paiements refusés et les commandes annulées, écrivez qui peut rembourser et depuis quel compte. Rembourser depuis une carte personnelle, parce que le compte de la société n’est pas encore ouvert, recrée le mélange que le cadre juridique devait éviter. Notez aussi, avant la première campagne, comment une commande impayée est annulée et comment le stock est remis en vente. Une boutique qui promet un article déjà parti, ou qui encaisse deux fois, crée un litige de consommateur et un trou de caisse. La personne qui tient le tableau des commandes et la personne qui tient la banque doivent se parler chaque semaine. Ce rythme est le vôtre. Il n’est pas une échéance fiscale. L’échéance fiscale, elle, se confirme avec le professionnel, à partir du CGI, une fois le volume réel connu. Si vous vendez aussi en magasin à Marrakech, le stock du site et le stock du rayon sont les mêmes biens. Deux inventaires qui ne se parlent pas créent des ventes de ce qui n’est plus là. Décidez qui met à jour la quantité, et à quel moment de la journée. Cette règle interne évite le geste le plus coûteux : encaisser un client pour un article déjà parti.',
            'Keep a person reachable at the address you announced. A complaint returned “addressee unknown” is a poor start to a dispute. Mail at the office, if it is domiciled, must be read. The [Marrakech domiciliation guide](guides/domiciliation-marrakech) recalls that mail is not implied. For refused payments and cancelled orders, write who may refund and from which account. Refunding from a personal card, because the company’s account is not open yet, recreates the mix that the legal frame was meant to avoid.',
            'أبقوا شخصاً في المتناول في العنوان المعلن. وشكوى تعود «بلا مرسل إليه» بداية سيئة لنزاع. وبريد المقر، إذا كان موطناً، يجب أن يُقرأ. ويذكّر [دليل التوطين بمراكش](guides/domiciliation-marrakech) بأن البريد ليس ضمنياً. وللأداءات المرفوضة والطلبات الملغاة، اكتبوا من يجوز له الإرجاع ومن أي حساب. والإرجاع من بطاقة شخصية، لأن حساب الشركة لم يُفتح بعد، يعيد الخلط الذي كان الإطار القانوني يفترض تجنبه.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Peut-on vendre en ligne sans société ?', 'Can you sell online without a company?', 'هل يمكن البيع عبر الإنترنت بلا شركة؟'), a:t('Oui, si le statut d’auto-entrepreneur admet l’activité et si vous respectez ses conditions publiées. Sinon, la société est le cadre. Le site, à lui seul, n’est ni l’un ni l’autre.', 'Yes, if the auto-entrepreneur status allows the activity and you meet its published conditions. Otherwise the company is the frame. The website, by itself, is neither.', 'نعم، إذا قبل وضع المقاول الذاتي النشاط واستوفيتم شروطه المنشورة. وإلا فالشركة هي الإطار. والموقع، وحده، ليس هذا ولا ذاك.')},
      {q:t('Le délai de rétractation est-il fixé ici ?', 'Is the withdrawal period set here?', 'هل أجل التراجع محدد هنا؟'), a:t('Non. Il se lit dans la loi n° 31-08, avec ses exceptions. Un nombre isolé sur cette page serait inexact pour une partie des ventes.', 'No. It is read in Law 31-08, with its exceptions. A standalone number on this page would be wrong for some sales.', 'لا. يُقرأ في القانون رقم 31-08، مع استثناءاته. ورقم منفرد في هذه الصفحة سيكون غير دقيق لجزء من البيوع.')},
      {q:t('Faut-il une autorisation CNDP avant d’ouvrir ?', 'Do you need a CNDP authorisation before opening?', 'هل يلزم إذن اللجنة قبل الفتح؟'), a:t('Cela dépend du traitement. Les guides CNDP déjà en ligne orientent. La réponse se confirme sur votre formulaire réel, pas dans une phrase générale.', 'It depends on the processing. The CNDP guides already online give direction. The answer is confirmed on your real form, not in a general sentence.', 'يتوقف ذلك على المعالجة. وأدلة اللجنة المنشورة توجه. والجواب يُؤكد على استمارتكم الحقيقية، لا في جملة عامة.')},
      {q:t('Un paiement international est-il libre ?', 'Is an international payment free?', 'هل الأداء الدولي حر؟'), a:t('Il se fait dans le régime publié par l’Office des Changes et selon les conditions de votre prestataire. Ce guide n’annonce ni plafond ni commission.', 'It is made under the regime published by the Foreign Exchange Office and under your provider’s conditions. This guide states neither a ceiling nor a commission.', 'يتم في النظام الذي ينشره مكتب الصرف ووفق شروط مقدم الخدمة. ولا يعلن هذا الدليل سقفاً ولا عمولة.')}
    ],
    links:[
      link('guides/devenir-freelance-au-maroc', 'Freelance ou société', 'Freelancer or company', 'عمل حر أو شركة'),
      link('guides/commerce-electronique-change-maroc', 'E-commerce et change', 'Online commerce and exchange control', 'التجارة الإلكترونية والصرف'),
      link('guides/facturation-electronique-maroc', 'Facturation', 'Invoicing', 'الفوترة'),
      link('guides/cndp-loi-09-08-protection-donnees-personnelles-maroc', 'Données personnelles', 'Personal data', 'المعطيات الشخصية'),
      link('guides/siege-social-maroc', 'Siège et stock', 'Office and stock', 'المقر والمخزون'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:activitySources
  }
];
