const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const leaseSources = [
  src('Loi n° 49-16 relative aux baux commerciaux, Bulletin officiel', 'Law 49-16 on commercial leases, Official Gazette', 'القانون رقم 49-16 المتعلق بالكراء التجاري، الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Code de commerce et portail Adala', 'Commercial Code and the Adala portal', 'مدونة التجارة وبوابة عدالة', 'https://adala.justice.gov.ma/'),
  src('OMPIC, pour le siège déclaré', 'OMPIC, for the registered office', 'OMPIC، بالنسبة إلى المقر المصرح به', 'https://www.ompic.ma/')
];

const taxSources = [
  src('Code général des impôts, Direction générale des impôts', 'General Tax Code, General Tax Directorate', 'المدونة العامة للضرائب، المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('Lois de finances, ministère de l’Économie et des Finances', 'Finance laws, Ministry of Economy and Finance', 'قوانين المالية، وزارة الاقتصاد والمالية', 'https://www.finances.gov.ma/'),
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/'),
  src('Loi n° 5-96, Bulletin officiel', 'Law 5-96, Official Gazette', 'القانون رقم 5-96، الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('OMPIC', 'OMPIC', 'المكتب المغربي للملكية الصناعية والتجارية', 'https://www.ompic.ma/')
];

export const lot2b = [
  {
    slug:'bail-commercial-droits-des-parties',
    category:t('Siège et bail commercial', 'Office and commercial lease', 'المقر والكراء التجاري'),
    title:t(
      'Bail commercial au Maroc : droits du locataire et du bailleur',
      'A commercial lease in Morocco: the tenant’s and the landlord’s rights',
      'الكراء التجاري بالمغرب: حقوق المكتري والمكري'
    ),
    description:t(
      'La loi n° 49-16 encadre le bail d’un local commercial. Ce guide dit ce que le locataire et le bailleur doivent lire dans le contrat et dans la loi, sans recopier un délai, un loyer ou une indemnité.',
      'Law 49-16 frames the lease of commercial premises. This guide says what the tenant and the landlord should read in the contract and in the statute, without copying a deadline, a rent or an indemnity.',
      'يؤطر القانون رقم 49-16 كراء محل تجاري. ويقول هذا الدليل ما يجب أن يقرأه المكتري والمكري في العقد وفي القانون، دون نسخ أجل أو سومة أو تعويض.'
    ),
    sections:[
      {
        heading:t('Un bail n’est pas une domiciliation', 'A lease is not a domiciliation', 'الكراء ليس توطيناً'),
        paragraphs:[
          t(
            'Le [guide du siège](guides/siege-social-maroc) compare trois titres : domiciliation, bail, local dont la société dispose. Cette page ne traite que du bail d’un local où s’exerce une activité commerciale, industrielle ou artisanale, dans le champ de la loi n° 49-16. Le texte en vigueur se lit au Bulletin officiel et sur le portail Adala. Un contrat de domiciliation, un bail d’habitation ou une mise à disposition familiale n’entrent pas dans ce cadre parce qu’on a écrit « commercial » en tête de page. Le [guide déjà en ligne sur le bail](guides/bail-commercial-maroc) aborde le renouvellement et l’indemnité. Celui-ci ordonne les droits à vérifier avant de signer, à Marrakech comme ailleurs. La ville ne crée pas un régime spécial.',
            'The [office guide](guides/siege-social-maroc) compares three titles: domiciliation, a lease, premises the company controls. This page deals only with the lease of premises where a commercial, industrial or craft activity is carried on, within the scope of Law 49-16. The text in force is read in the Official Gazette and on the Adala portal. A domiciliation contract, a residential lease or a family loan of premises do not enter that frame because someone wrote “commercial” at the top of the page. The [guide already online on leases](guides/bail-commercial-maroc) takes up renewal and the indemnity. This one orders the rights to check before signing, in Marrakech as elsewhere. The city does not create a special regime.',
            'يقارن [دليل المقر](guides/siege-social-maroc) ثلاثة سندات: التوطين، والكراء، والمحل الذي تتصرف فيه الشركة. ولا تعالج هذه الصفحة إلا كراء محل تُمارس فيه تجارة أو صناعة أو حرفة، في نطاق القانون رقم 49-16. والنص الجاري يُقرأ في الجريدة الرسمية وعلى بوابة عدالة. وعقد التوطين أو كراء السكن أو وضع عائلي للمحل لا يدخل في هذا الإطار لأن أحداً كتب «تجاري» في رأس الصفحة. ويتناول [الدليل المنشور عن الكراء](guides/bail-commercial-maroc) التجديد والتعويض. وهذا الدليل يرتب الحقوق التي تُراجع قبل التوقيع، بمراكش كما في غيرها. والمدينة لا تنشئ نظاماً خاصاً.'
          ),
          t(
            'Le local qui sert de siège doit être le local décrit dans les statuts, à la même adresse. Un étage ou un numéro différent suffit à faire reprendre une pièce. Si l’activité reçoit du public, stocke ou transforme, le bail et les autorisations du local se lisent ensemble. Felexia Conseils peut aider à rapprocher le contrat et le dossier de société. Le cabinet n’est pas bailleur, et l’adresse de Mabrouka n’est pas un local commercial proposé par cette page.',
            'The premises used as the office must be the premises described in the articles, at the same address. A different floor or number is enough to have a document redone. If the activity receives the public, stores or processes, the lease and the premises’ authorisations are read together. Felexia Conseils can help match the contract and the company file. The firm is not a landlord, and the Mabrouka address is not commercial premises offered by this page.',
            'المحل المستعمل مقراً يجب أن يكون المحل الموصوف في النظام، بالعنوان نفسه. ويكفي اختلاف طابق أو رقم لإعادة وثيقة. وإذا كان النشاط يستقبل العموم أو يخزن أو يحوّل، يُقرأ الكراء وتراخيص المحل معاً. ويمكن لـ Felexia Conseils المساعدة في مطابقة العقد وملف الشركة. والمكتب ليس مكرياً، وعنوان مبروكة ليس محلاً تجارياً تعرضه هذه الصفحة.'
          )
        ]
      },
      {
        heading:t('Ce que le locataire vérifie avant de signer', 'What the tenant checks before signing', 'ما يراجعه المكتري قبل التوقيع'),
        paragraphs:[
          t(
            'Lisez qui est bailleur et s’il a le droit de louer. Une société ne signe pas avec une personne qui « s’occupe de l’immeuble » sans titre. Décrivez le local, les parties communes s’il y en a, et l’activité autorisée. Une activité plus large que le contrat, ou interdite par le règlement de l’immeuble, se découvre trop tard, souvent au moment d’une autorisation communale. Le loyer, la périodicité et ce qui est en plus du loyer figurent en chiffres dans le contrat, pas dans ce guide. Aucun prix de marché à Marrakech n’est publié ici.',
            'Read who the landlord is and whether they have the right to let. A company does not sign with a person who “looks after the building” with no title. Describe the premises, the common parts if there are any, and the permitted activity. An activity wider than the contract, or forbidden by the building rules, is discovered too late, often when a communal authorisation is needed. The rent, the frequency and what is added to the rent appear as figures in the contract, not in this guide. No market price in Marrakech is published here.',
            'اقرأوا من هو المكري وهل له حق الكراء. والشركة لا توقّع مع شخص «يهتم بالعمارة» بلا سند. صفوا المحل والأجزاء المشتركة إن وُجدت والنشاط المسموح. والنشاط الأوسع من العقد، أو الممنوع بنظام العمارة، يُكتشف متأخراً، غالباً عند الحاجة إلى رخصة جماعية. والسومة والدورية وما يضاف إلى السومة أرقام في العقد، لا في هذا الدليل. ولا يُنشر هنا أي سعر سوق بمراكش.'
          ),
          t(
            'Demandez ce qui est consigné, à quelles conditions c’est rendu, et qui paie les travaux d’entrée. Une clause qui met à la charge du locataire des travaux de structure se négocie les yeux ouverts. L’état des lieux d’entrée, daté et signé, évite une discussion sur des dégâts déjà là. Les clés et les accès numériques se listent. Rien de tout cela n’est un délai légal : ce sont les faits de votre contrat. La loi n° 49-16 ajoute des droits, notamment autour du renouvellement et de l’indemnité d’éviction, lorsque ses conditions sont remplies. Ces conditions se lisent dans la loi. Ce guide ne les remplace pas par un résumé chiffré.',
            'Ask what is deposited, on what conditions it is returned, and who pays the works at entry. A clause that puts structural works on the tenant is negotiated with open eyes. An entry inventory, dated and signed, avoids an argument about damage already there. Keys and digital access are listed. None of that is a statutory deadline: they are the facts of your contract. Law 49-16 adds rights, notably around renewal and the eviction indemnity, when its conditions are met. Those conditions are read in the statute. This guide does not replace them with a figure-based summary.',
            'اسألوا ماذا أُودع، وبأي شروط يُرجع، ومن يؤدي أشغال الدخول. والبند الذي يحمّل المكتري أشغال الهيكل يُتفاوض عليه بعيون مفتوحة. وحالة المكان عند الدخول، مؤرخة وموقعة، تتجنب نقاشاً عن أضرار كانت موجودة. والمفاتيح والولوج الرقمي يُعدَّدان. ولا شيء من ذلك أجل قانوني: إنها وقائع عقدكم. ويضيف القانون رقم 49-16 حقوقاً، خصوصاً حول التجديد وتعويض الإفراغ، حين تستوفى شروطه. وهذه الشروط تُقرأ في القانون. ولا يعوّضها هذا الدليل بملخص مرقّم.'
          )
        ]
      },
      {
        heading:t('Ce que le bailleur vérifie de son côté', 'What the landlord checks on their side', 'ما يراجعه المكري من جهته'),
        paragraphs:[
          t(
            'Le bailleur qui loue à une société vérifie que le signataire engage bien la société : gérant en fonction, ou mandataire dont le pouvoir couvre le bail. Un associé non gérant ne signe pas parce qu’il « est dans les statuts ». Le dépôt de garantie n’est pas un loyer d’avance si le contrat ne le dit pas. Les assurances, les charges et l’accès pour les réparations urgentes se rédigent. Un immeuble en copropriété peut limiter l’activité ou les enseignes. Cette limite s’impose au locataire et, souvent, au bailleur qui l’a ignorée.',
            'The landlord who lets to a company checks that the signatory really binds the company: the manager in office, or an agent whose power covers the lease. A shareholder who is not the manager does not sign because they are “in the articles”. The security deposit is not rent in advance if the contract does not say so. Insurance, charges and access for urgent repairs are written down. A co-owned building may limit the activity or the signs. That limit binds the tenant and, often, the landlord who ignored it.',
            'المكري الذي يكري لشركة يتحقق أن الموقّع يلزم الشركة فعلاً: المسيّر القائم، أو وكيل تغطي وكالته الكراء. والشريك غير المسيّر لا يوقّع لأنه «في النظام». والضمانة ليست سومة مسبقة إذا لم يقل العقد ذلك. والتأمينات والمصاريف والولوج للإصلاحات المستعجلة تُكتب. وقد تحد الملكية المشتركة النشاط أو اللافتات. وهذا الحد يلزم المكتري، وغالباً المكري الذي تجاهله.'
          ),
          t(
            'Reprendre le local n’est pas un simple non-renouvellement de conversation. Lorsque la loi accorde au locataire un droit au renouvellement ou une indemnité, le bailleur suit la procédure du texte, pas une lettre improvisée. Les délais et les formes sont ceux de la loi n° 49-16 et du contrat lorsqu’il est plus précis sans contredire la loi. Ils ne sont pas publiés ici, parce qu’un chiffre détaché de votre dossier serait faux. Le [guide du bail déjà en ligne](guides/bail-commercial-maroc) développe ces mécanismes. Lisez-le avec la loi, pas à sa place.',
            'Taking the premises back is not a mere failure to renew a conversation. When the law gives the tenant a right to renewal or an indemnity, the landlord follows the procedure in the text, not an improvised letter. The deadlines and the forms are those of Law 49-16 and of the contract when it is more precise without contradicting the law. They are not published here, because a figure detached from your file would be wrong. The [lease guide already online](guides/bail-commercial-maroc) develops those mechanisms. Read it with the statute, not instead of it.',
            'استرجاع المحل ليس مجرد عدم تجديد حديث. وحين يمنح القانون المكتري حق التجديد أو تعويضاً، يتبع المكري مسطرة النص، لا رسالة مرتجلة. والآجال والصيغ هي تلك الخاصة بالقانون رقم 49-16 وبالعقد حين يكون أدق دون مناقضة القانون. وهي غير منشورة هنا، لأن رقماً منفصلاً عن ملفكم سيكون خاطئاً. ويطور [دليل الكراء المنشور](guides/bail-commercial-maroc) هذه الآليات. اقرأوه مع القانون، لا بدلاً منه.'
          )
        ]
      },
      {
        heading:t('Cession du bail, sous-location et changement de société', 'Assignment of the lease, subletting and a change of company', 'تفويت الكراء والكراء من الباطن وتغيير الشركة'),
        paragraphs:[
          t(
            'Changer d’associé n’est pas changer de locataire. La société qui a signé reste titulaire du bail tant que le contrat n’est pas cédé ou résilié. Une cession de parts peut pourtant inquiéter un bailleur si le contrat le prévoit. Lisez la clause avant l’opération, pas après. La sous-location et la cession du droit au bail obéissent au contrat et à la loi. Une tolérance orale ne vaut pas autorisation le jour d’un conflit. Le [guide des modifications](guides/modifier-societe-maroc) rappelle qu’un transfert de siège est une formalité propre, distincte du contrat de bail.',
            'Changing a shareholder is not changing the tenant. The company that signed remains the holder of the lease until the contract is assigned or terminated. A transfer of shares may nevertheless worry a landlord if the contract provides for it. Read the clause before the operation, not after. Subletting and assignment of the lease follow the contract and the law. An oral tolerance is not consent on the day of a dispute. The [amendments guide](guides/modifier-societe-maroc) recalls that an office transfer is its own formality, separate from the lease.',
            'تغيير شريك ليس تغيير المكتري. فالشركة التي وقّعت تبقى صاحبة الكراء إلى أن يُفوت العقد أو يُفسخ. وقد يقلق تفويت الحصص مع ذلك مكرياً إذا نص العقد على ذلك. اقرأوا البند قبل العملية، لا بعدها. والكراء من الباطن وتفويت الحق في الكراء يخضعان للعقد والقانون. والتسامح الشفوي ليس إذناً يوم النزاع. ويذكّر [دليل التعديلات](guides/modifier-societe-maroc) بأن نقل المقر شكلية قائمة، مستقلة عن عقد الكراء.'
          ),
          t(
            'Si la société est dissoute, le bail ne s’éteint pas par magie. Il devient un contrat à traiter dans la liquidation. Le [guide dissolution](guides/dissoudre-et-liquider-societe-maroc) le signale. Prévenir le bailleur selon le contrat évite un loyer qui court sur un local vide. À l’inverse, quitter les lieux sans écrit ne rend pas le dépôt et ne libère pas la société.',
            'If the company is dissolved, the lease does not end by magic. It becomes a contract to be dealt with in the liquidation. The [dissolution guide](guides/dissoudre-et-liquider-societe-maroc) points that out. Telling the landlord in accordance with the contract avoids rent running on empty premises. Conversely, leaving without a writing does not return the deposit and does not release the company.',
            'إذا حُلت الشركة، لا ينتهي الكراء بسحر. ويصبح عقداً يُعالج في التصفية. و[دليل الحل](guides/dissoudre-et-liquider-societe-maroc) يشير إلى ذلك. وإبلاغ المكري وفق العقد يتجنب سومة تستمر على محل فارغ. وفي المقابل، مغادرة المحل بلا كتابة لا ترجع الضمانة ولا تبرئ الشركة.'
          )
        ]
      },
      {
        heading:t('Liste avant la signature', 'A list before signature', 'لائحة قبل التوقيع'),
        paragraphs:[
          t(
            'Locataire ou bailleur, la même page se relit. Ce qui n’est pas écrit se discute mal ensuite.',
            'Tenant or landlord, the same page is read again. What is not written is hard to argue later.',
            'مكترياً أو مكرياً، تُعاد قراءة الصفحة نفسها. وما ليس مكتوباً يُناقش بصعوبة بعد ذلك.'
          )
        ],
        list:t(
          [
            'Le bailleur a un titre pour louer, et le signataire de la société a le pouvoir de signer.',
            'L’adresse du bail est exactement celle des statuts si le local est le siège.',
            'L’activité prévue est permise par le contrat et compatible avec l’immeuble.',
            'Loyer, dépôt, charges et travaux sont chiffrés dans le contrat, pas supposés.',
            'L’état des lieux d’entrée est signé.',
            'Cession, sous-location et changement de contrôle sont lus avant une opération sur les parts.',
            'Le droit au renouvellement et l’indemnité se vérifient dans la loi n° 49-16, pas dans un délai retenu de mémoire.'
          ],
          [
            'The landlord has a title to let, and the company’s signatory has the power to sign.',
            'The address in the lease is exactly the one in the articles if the premises are the office.',
            'The planned activity is allowed by the contract and compatible with the building.',
            'Rent, deposit, charges and works are figured in the contract, not assumed.',
            'The entry inventory is signed.',
            'Assignment, subletting and a change of control are read before an operation on the shares.',
            'The right to renewal and the indemnity are checked in Law 49-16, not in a deadline remembered.'
          ],
          [
            'للمكري سند للكراء، ولموقّع الشركة سلطة التوقيع.',
            'عنوان الكراء هو بالضبط عنوان النظام إذا كان المحل هو المقر.',
            'النشاط المقرر مسموح بالعقد ومتوافق مع العمارة.',
            'السومة والضمانة والمصاريف والأشغال مرقّمة في العقد، لا مفترضة.',
            'حالة المكان عند الدخول موقّعة.',
            'التفويت والكراء من الباطن وتغيير المراقبة تُقرأ قبل عملية على الحصص.',
            'حق التجديد والتعويض يُتحقق منهما في القانون رقم 49-16، لا في أجل محفوظ.'
          ]
        )
      },
      {
        heading:t('Le local, l’enseigne et le voisinage à Marrakech', 'The premises, the sign and the neighbourhood in Marrakech', 'المحل واللافتة والجوار بمراكش'),
        paragraphs:[
          t(
            'À Marrakech comme dans une autre ville, le bail ne tient pas lieu d’autorisation d’exploiter. Une terrasse, une enseigne sur la façade, des horaires de nuit ou une activité alimentaire peuvent dépendre de la commune, de la copropriété ou d’une autre administration. Ces autorisations se demandent sur le dossier réel. Ce guide n’en publie pas la liste, parce qu’elle change avec l’activité et l’adresse. Le locataire qui signe d’abord et demande ensuite découvre parfois que le local ne peut pas recevoir le public. Le bailleur qui promet « tout est possible dans la médina » promet plus que le contrat.',
            'In Marrakech as in another city, the lease is not an authorisation to trade. A terrace, a sign on the front, night hours or a food activity may depend on the commune, the co-ownership or another administration. Those authorisations are requested on the real file. This guide does not publish the list, because it changes with the activity and the address. The tenant who signs first and asks later sometimes discovers that the premises cannot receive the public. The landlord who promises “anything is possible in the medina” promises more than the contract.',
            'بمراكش كما في مدينة أخرى، الكراء ليس ترخيصاً بالاستغلال. فالشرفة أو اللافتة على الواجهة أو أوقات الليل أو نشاط غذائي قد تتوقف على الجماعة أو الملكية المشتركة أو إدارة أخرى. وهذه التراخيص تُطلب على الملف الحقيقي. ولا ينشر هذا الدليل اللائحة، لأنها تتغير مع النشاط والعنوان. والمكتري الذي يوقّع أولاً ويسأل بعد ذلك يكتشف أحياناً أن المحل لا يستطيع استقبال العموم. والمكري الذي يعد بأن «كل شيء ممكن في المدينة العتيقة» يعد بأكثر من العقد.'
          ),
          t(
            'Notez aussi qui entretient, qui assure, et comment le locataire prévient d’un dégât. Un dégât des eaux non signalé devient une discussion sur la remise en état au moment du départ, alors que la loi n° 49-16 parle d’autre chose : le sort du bail. Les deux sujets se règlent mieux s’ils ne sont pas mélangés. Pour un projet de restaurant, d’agence ou de commerce, le bail se lit avant la création de la société, pas après l’impression des statuts. La page [création](creation-entreprise) sert à poser cet ordre. Elle ne choisit pas le local.',
            'Also note who maintains, who insures, and how the tenant reports damage. Unreported water damage becomes an argument about reinstatement on departure, while Law 49-16 is about something else: the fate of the lease. Both subjects are settled more cleanly if they are not mixed. For a restaurant, an agency or a shop, the lease is read before the company is formed, not after the articles are printed. The [formation](creation-entreprise) page is where that order is set. It does not choose the premises.',
            'ودوّنوا أيضاً من يصون، ومن يؤمّن، وكيف يبلغ المكتري عن ضرر. وضرر مياه غير مبلغ عنه يصبح نقاشاً عن الإصلاح عند المغادرة، بينما القانون رقم 49-16 يتحدث عن شيء آخر: مصير الكراء. والموضوعان يُحسمان بشكل أنظف إذا لم يُخلطا. ولمشروع مطعم أو وكالة أو تجارة، يُقرأ الكراء قبل تأسيس الشركة، لا بعد طبع النظام. وصفحة [التأسيس](creation-entreprise) مكان وضع هذا الترتيب. وهي لا تختار المحل.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Tout local professionnel est-il un bail commercial ?', 'Is every business premises a commercial lease?', 'هل كل محل مهني كراء تجاري؟'), a:t('Non. Le champ de la loi n° 49-16 se lit dans son texte. Une domiciliation ou un bail d’habitation ne deviennent pas commerciaux par l’usage. En cas de doute, faites qualifier le contrat avant de l’opposer.', 'No. The scope of Law 49-16 is read in its text. A domiciliation or a residential lease do not become commercial by use. If in doubt, have the contract classified before you rely on it.', 'لا. نطاق القانون رقم 49-16 يُقرأ في نصه. والتوطين أو كراء السكن لا يصبحان تجاريين بالاستعمال. وعند الشك، اطلبوا تكييف العقد قبل الاحتجاج به.')},
      {q:t('Le guide fixe-t-il le préavis ou l’indemnité ?', 'Does the guide set the notice or the indemnity?', 'هل يحدد الدليل الإنذار أو التعويض؟'), a:t('Non. Les conditions, les formes et les montants éventuels sont ceux de la loi n° 49-16 et du contrat. Un chiffre publié ici serait inexact.', 'No. The conditions, the forms and any amounts are those of Law 49-16 and of the contract. A figure published here would be inaccurate.', 'لا. الشروط والصيغ والمبالغ المحتملة هي تلك الخاصة بالقانون رقم 49-16 وبالعقد. ورقم منشور هنا سيكون غير دقيق.')},
      {q:t('Peut-on domicilier la société dans le local loué ?', 'Can the company be domiciled in the rented premises?', 'هل يمكن توطين الشركة في المحل المكترى؟'), a:t('Si le bail autorise l’activité et l’adresse, le local peut justifier le siège. L’adresse doit être identique dans le bail et dans les statuts. La page [domiciliation](domiciliation) concerne l’autre solution, le contrat de domiciliation.', 'If the lease allows the activity and the address, the premises can evidence the office. The address must be the same in the lease and in the articles. The [domiciliation](domiciliation) page concerns the other solution, the domiciliation contract.', 'إذا أجاز الكراء النشاط والعنوان، أمكن للمحل إثبات المقر. ويجب أن يكون العنوان واحداً في الكراء وفي النظام. وصفحة [التوطين](domiciliation) تخص الحل الآخر، عقد التوطين.')},
      {q:t('Un litige de loyer se règle-t-il sur cette page ?', 'Is a rent dispute settled on this page?', 'هل يُحسم نزاع السومة في هذه الصفحة؟'), a:t('Non. Cette page prépare la lecture du contrat et de la loi. Elle ne tranche pas un dossier. Le [contact](contact) sert à demander un cadrage écrit.', 'No. This page prepares the reading of the contract and the statute. It does not decide a file. [Contact](contact) is where you ask for a written scoping.', 'لا. هذه الصفحة تحضّر قراءة العقد والقانون. وهي لا تحسم ملفاً. و[الاتصال](contact) مكان طلب تأطير مكتوب.')}
    ],
    links:[
      link('guides/bail-commercial-maroc', 'Renouvellement et indemnité', 'Renewal and indemnity', 'التجديد والتعويض'),
      link('guides/siege-social-maroc', 'Justifier le siège', 'Evidence the office', 'إثبات المقر'),
      link('domiciliation', 'Domiciliation', 'Domiciliation', 'التوطين'),
      link('guides/modifier-societe-maroc', 'Transfert de siège', 'Office transfer', 'نقل المقر'),
      link('guides/dissoudre-et-liquider-societe-maroc', 'Bail et liquidation', 'Lease and liquidation', 'الكراء والتصفية'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:leaseSources
  },
  {
    slug:'compte-courant-associe-maroc',
    category:t('Fiscalité', 'Tax', 'الضرائب'),
    title:t(
      'Compte courant d’associé au Maroc',
      'A shareholder current account in Morocco',
      'الحساب الجاري للشريك بالمغرب'
    ),
    description:t(
      'Le compte courant d’associé est un financement de la société, distinct du capital. Il s’écrit, il se rembourse selon ce qui est convenu, et son régime fiscal se vérifie. Aucun taux n’est publié ici.',
      'A shareholder current account is financing of the company, separate from capital. It is written down, it is repaid as agreed, and its tax treatment is checked. No rate is published here.',
      'الحساب الجاري للشريك تمويل للشركة، مستقل عن رأس المال. ويُكتب، ويُسدد حسب المتفق عليه، ويُتحقق من نظامه الضريبي. ولا يُنشر هنا أي سعر.'
    ),
    fiscal:true,
    sections:[
      {
        heading:t('Ce n’est ni le capital ni la caisse personnelle', 'It is neither capital nor the personal till', 'ليس رأس المال ولا الصندوق الشخصي'),
        paragraphs:[
          t(
            'Un associé qui avance de l’argent à la société, en plus de son apport, crée en principe une créance. On l’appelle souvent compte courant d’associé. Ce n’est pas une augmentation de capital, et ce n’est pas un salaire. Le [guide du capital](guides/capital-social-maroc-quel-montant) sépare l’apport, qui entre dans les statuts, de cet autre financement. Mélanger les deux fausse les parts et la lecture d’une banque. Utiliser le compte personnel de l’associé pour encaisser le chiffre d’affaires n’est pas non plus un compte courant. C’est un flux non qualifié.',
            'A shareholder who advances money to the company, in addition to their contribution, in principle creates a claim. It is often called a shareholder current account. It is not a capital increase, and it is not a wage. The [capital guide](guides/capital-social-maroc-quel-montant) separates the contribution, which goes into the articles, from this other financing. Mixing the two distorts the shares and a bank’s reading. Using the shareholder’s personal account to collect turnover is not a current account either. It is an unclassified flow.',
            'الشريك الذي يسبق مالاً للشركة، إضافة إلى مساهمته، ينشئ من حيث المبدأ ديناً. ويُسمى غالباً الحساب الجاري للشريك. وهو ليس زيادة في رأس المال، وليس أجراً. ويفصل [دليل رأس المال](guides/capital-social-maroc-quel-montant) المساهمة، التي تدخل في النظام، عن هذا التمويل الآخر. ودمجهما يشوه الحصص وقراءة البنك. واستعمال الحساب الشخصي للشريك لقبض رقم المعاملات ليس حساباً جارياً أيضاً. إنه تدفق غير مكيّف.'
          ),
          t(
            'Le [guide pour gérer depuis l’étranger](guides/mre-gerer-societe-depuis-letranger) signale le réflexe du virement « entre cousins ». Ici, le sujet est la convention. Sans écrit, on ne sait pas si la somme est un prêt, un apport à venir, ou un don. La société et l’associé n’ont pas le même intérêt le jour où l’un veut récupérer l’argent et l’autre veut le garder. Écrivez-le avant le premier virement important, pas au moment du contentieux.',
            'The [guide to running a company from abroad](guides/mre-gerer-societe-depuis-letranger) flags the reflex of a transfer “between cousins”. Here, the subject is the agreement. Without a writing, one does not know whether the sum is a loan, a future contribution, or a gift. The company and the shareholder do not have the same interest on the day one wants the money back and the other wants to keep it. Write it down before the first large transfer, not at the time of a dispute.',
            'يشير [دليل التسيير من الخارج](guides/mre-gerer-societe-depuis-letranger) إلى رد الفعل المتمثل في التحويل «بين أبناء العم». وهنا الموضوع هو الاتفاقية. ومن دون كتابة، لا يُعرف هل المبلغ قرض أو مساهمة مقبلة أو هبة. والشركة والشريك ليست لهما المصلحة نفسها يوم يريد أحدهما استرجاع المال ويريد الآخر إبقاؤه. اكتبوها قبل أول تحويل مهم، لا وقت النزاع.'
          )
        ]
      },
      {
        heading:t('Ce que la convention fixe, sans taux imposé', 'What the agreement sets, with no imposed rate', 'ما تحدده الاتفاقية، بلا سعر مفروض'),
        paragraphs:[
          t(
            'La convention nomme l’associé, la société, le montant ou le plafond, la monnaie, et ce qui prouve chaque versement. Elle dit si la somme est remboursable, à quelle condition, et si un préavis est convenu entre vous. Ce préavis est le vôtre. Il n’est pas un délai légal publié ici. Elle dit aussi si un intérêt est prévu. S’il n’y en a pas, écrivez-le. Un silence ne veut pas dire « au taux du marché ». S’il y en a un, la méthode de calcul se lit dans la convention. Ce guide n’indique aucun taux, parce que le taux légal, le taux du marché et le taux admis au plan fiscal ne sont pas interchangeables et se vérifient à la date de l’opération.',
            'The agreement names the shareholder, the company, the amount or the ceiling, the currency, and what proves each payment. It says whether the sum is repayable, on what condition, and whether a notice is agreed between you. That notice is yours. It is not a statutory deadline published here. It also says whether interest is provided. If there is none, write that. Silence does not mean “at the market rate”. If there is interest, the method of calculation is read in the agreement. This guide states no rate, because the legal rate, the market rate and the rate allowed for tax are not interchangeable and are checked at the date of the operation.',
            'تسمي الاتفاقية الشريك والشركة والمبلغ أو السقف والعملة وما يثبت كل دفع. وتقول هل المبلغ قابل للسداد، وبأي شرط، وهل اتُفق بينكم على إخطار. وهذا الإخطار لكم. وهو ليس أجلاً قانونياً منشوراً هنا. وتقول أيضاً هل فائدة مقررة. وإذا لم تكن، فاكتبوا ذلك. والصمت لا يعني «بسعر السوق». وإذا وُجدت فائدة، فطريقة الحساب تُقرأ في الاتفاقية. ولا يذكر هذا الدليل أي سعر، لأن السعر القانوني وسعر السوق والسعر المقبول ضريبياً ليست متبادلة وتُتحقق في تاريخ العملية.'
          ),
          t(
            'La déductibilité d’un intérêt, pour la société, et l’imposition de cet intérêt, pour l’associé, se lisent dans le Code général des impôts et la loi de finances en vigueur. Des conditions de forme, de taux ou de qualité de l’associé peuvent exister. Elles changent. Faites-les vérifier auprès d’un professionnel avant de « mettre un intérêt pour que ce soit plus propre ». Une convention qui prévoit un intérêt non déductible coûte à la société sans produire l’effet attendu. Une absence d’intérêt peut aussi avoir une lecture fiscale. Aucune des deux voies n’est neutre par principe.',
            'The deductibility of interest, for the company, and the taxation of that interest, for the shareholder, are read in the General Tax Code and the finance law in force. Conditions of form, of rate or of the shareholder’s status may exist. They change. Have them checked by a professional before you “add interest so that it looks tidier”. An agreement that provides non-deductible interest costs the company without producing the expected effect. A lack of interest can also have a tax reading. Neither path is neutral in principle.',
            'قابلية خصم الفائدة، بالنسبة إلى الشركة، وفرض هذه الفائدة، بالنسبة إلى الشريك، يُقرآن في المدونة العامة للضرائب وقانون المالية الجاري. وقد توجد شروط شكل أو سعر أو صفة الشريك. وهي تتغير. تحققوا منها لدى مهني قبل «وضع فائدة ليبدو الأمر أنظف». واتفاقية تنص على فائدة غير قابلة للخصم تكلف الشركة دون الأثر المنتظر. وغياب الفائدة قد تكون له أيضاً قراءة ضريبية. ولا أحد المسارين محايد من حيث المبدأ.'
          )
        ]
      },
      {
        heading:t('Rembourser sans assécher la société', 'Repaying without draining the company', 'السداد دون تجفيف الشركة'),
        paragraphs:[
          t(
            'Le remboursement est un paiement de la société à son associé. Il suppose que la créance existe, que la trésorerie le permet, et que les pouvoirs de signature l’autorisent. Un gérant qui se rembourse en priorité, alors que les salaires ou les fournisseurs ne sont pas payés, crée un conflit et parfois une difficulté de l’entreprise. Le [guide des difficultés](guides/difficultes-entreprise-sauvegarde-redressement-maroc) n’est pas le sujet ordinaire. Il le devient si la société ne peut plus faire face. Inscrivez dans la convention ce qui bloque le remboursement : trésorerie insuffisante, accord des autres associés, ou respect d’un crédit bancaire.',
            'Repayment is a payment by the company to its shareholder. It assumes the claim exists, that cash allows it, and that the signing powers authorise it. A manager who repays himself or herself first, while wages or suppliers are unpaid, creates a conflict and sometimes a business difficulty. The [difficulties guide](guides/difficultes-entreprise-sauvegarde-redressement-maroc) is not the ordinary subject. It becomes so if the company can no longer cope. Write in the agreement what blocks repayment: insufficient cash, the consent of the other shareholders, or compliance with a bank loan.',
            'السداد أداء من الشركة لشريكها. وهو يفترض أن الدين موجود، وأن الخزينة تسمح، وأن سلطات التوقيع تجيزه. والمسيّر الذي يسدد لنفسه أولاً، بينما الأجور أو المزودون غير مؤداة، ينشئ نزاعاً وأحياناً صعوبة للمقاولة. و[دليل الصعوبات](guides/difficultes-entreprise-sauvegarde-redressement-maroc) ليس الموضوع العادي. ويصبح كذلك إذا لم تعد الشركة قادرة على المواجهة. اكتبوا في الاتفاقية ما يوقف السداد: خزينة غير كافية، أو موافقة بقية الشركاء، أو احترام قرض بنكي.'
          ),
          t(
            'Transformer le compte courant en capital est une augmentation, pas une écriture de confort. Elle a ses décisions et ses formalités, décrites à part dans le [guide d’augmentation](guides/augmentation-de-capital-sarl) pour une SARL. L’opération inverse, sortir du capital pour « remettre en compte courant », est une réduction, avec la protection des créanciers. Le [guide de la réduction](guides/reduction-capital-maroc) est le renvoi. Ne faites pas l’un pour l’autre dans un tableur.',
            'Turning the current account into capital is an increase, not a comfort entry. It has its own decisions and formalities, described separately in the [increase guide](guides/augmentation-de-capital-sarl) for a SARL. The reverse operation, taking capital out to “put it back on current account”, is a reduction, with the protection of creditors. The [reduction guide](guides/reduction-capital-maroc) is the pointer. Do not do one for the other in a spreadsheet.',
            'تحويل الحساب الجاري إلى رأس مال زيادة، لا قيد راحة. وله قراراته وإجراءاته، الموصوفة على حدة في [دليل الزيادة](guides/augmentation-de-capital-sarl) بالنسبة إلى SARL. والعملية العكسية، إخراج رأس المال «لإعادته إلى الحساب الجاري»، تخفيض، مع حماية الدائنين. و[دليل التخفيض](guides/reduction-capital-maroc) هو الإحالة. ولا تفعلوا أحدهما بدل الآخر في جدول.'
          )
        ]
      },
      {
        heading:t('Associé à l’étranger et devise', 'A shareholder abroad and foreign currency', 'شريك في الخارج والعملة'),
        paragraphs:[
          t(
            'Un MRE ou une société étrangère qui prête à la filiale marocaine ajoute une question de change. L’Office des Changes publie le régime de certains financements et de certaines sorties. Un remboursement vers l’étranger n’est pas un virement domestique. Conservez le contrat, les relevés d’entrée et l’identité du prêteur. Le [guide du compte professionnel](guides/compte-bancaire-mre) rappelle que la banque apprécie l’origine des fonds. Elle peut refuser une sortie que la convention, à elle seule, présente comme due.',
            'A Moroccan abroad or a foreign company that lends to the Moroccan subsidiary adds a foreign-exchange question. The Foreign Exchange Office publishes the regime of some financing and some outward payments. A repayment abroad is not a domestic transfer. Keep the contract, the incoming statements and the lender’s identity. The [business-account guide](guides/compte-bancaire-mre) recalls that the bank assesses the source of funds. It may refuse an outward payment that the agreement, by itself, presents as due.',
            'مغربي بالخارج أو شركة أجنبية تقرض الشركة التابعة المغربية يضيف سؤال صرف. وينشر مكتب الصرف نظام بعض التمويلات وبعض الخروجات. والسداد إلى الخارج ليس تحويلاً داخلياً. احتفظوا بالعقد وكشوف الدخول وهوية المقرض. ويذكّر [دليل الحساب المهني](guides/compte-bancaire-mre) بأن البنك يقدر مصدر الأموال. وقد يرفض خروجاً تقدمه الاتفاقية، وحدها، كمستحق.'
          ),
          t(
            'Si plusieurs associés avancent des sommes inégales, le [pacte](guides/pacte-associes-que-prevoir) peut dire qui est remboursé en premier. À défaut, le silence favorise celui qui tient la banque. Écrivez la priorité. Elle ne doit pas empêcher de payer les dettes envers les tiers. La page [contact](contact) sert à faire cadrer la convention avec les statuts. Le devis ne fixe ni le montant ni le taux.',
            'If several shareholders advance unequal sums, the [agreement](guides/pacte-associes-que-prevoir) can say who is repaid first. Otherwise, silence favours the person who holds the bank. Write the priority. It must not prevent paying debts to third parties. The [contact](contact) page is where the agreement is scoped against the articles. The quote sets neither the amount nor the rate.',
            'إذا سبق عدة شركاء مبالغ غير متساوية، أمكن لـ[الاتفاق](guides/pacte-associes-que-prevoir) أن يقول من يُسدَّد أولاً. وإلا، فالصمت يخدم من يمسك البنك. اكتبوا الأولوية. ويجب ألا تمنع أداء الديون تجاه الغير. وصفحة [الاتصال](contact) مكان تأطير الاتفاقية مع النظام. والعرض لا يحدد المبلغ ولا السعر.'
          )
        ]
      },
      {
        heading:t('Tenir le compte pour qu’il se lise', 'Keeping the account so it can be read', 'مسك الحساب حتى يُقرأ'),
        paragraphs:[
          t(
            'Chaque versement et chaque remboursement a une pièce : relevé, facture de frais avancés, ou décision. Le solde du compte courant dans la suivi des obligations déclaratives doit pouvoir être rapproché de ces pièces. Une ligne unique « associé » qui mélange apport, frais, retraits personnels et chiffre d’affaires encaissé par erreur ne se défend pas. Désignez qui passe les écritures, et à quelle fréquence l’associé reçoit le solde. Cette fréquence est la vôtre. Elle n’est pas une échéance fiscale. L’échéance fiscale, elle, se confirme avec le professionnel qui établit les déclarations, à partir du CGI.',
            'Each payment in and each repayment has a document: a statement, an invoice for expenses advanced, or a decision. The current-account balance in the accounts must be reconcilable with those documents. A single line “shareholder” that mixes a contribution, expenses, personal withdrawals and turnover collected by mistake cannot be defended. Name who makes the entries, and how often the shareholder receives the balance. That frequency is yours. It is not a tax deadline. The tax deadline is confirmed with the professional who prepares the filings, from the General Tax Code.',
            'لكل دفع ولكل سداد وثيقة: كشف، أو فاتورة مصاريف مسبقة، أو قرار. ويجب أن يُقرَّب رصيد الحساب الجاري في التصاريح من هذه الوثائق. وسطر واحد «شريك» يخلط مساهمة ومصاريف وسحوبات شخصية ورقم معاملات قُبض خطأ لا يُدافع عنه. عيّنوا من يمرر القيود، وبأي وتيرة يتلقى الشريك الرصيد. وهذه الوتيرة وتيرتكم. وهي ليست أجلاً ضريبياً. والأجل الضريبي يُؤكد مع المهني الذي يعد التصاريح، انطلاقاً من المدونة.'
          ),
          t(
            'Si l’associé est aussi gérant, séparez trois enveloppes dans les écrits, même si la banque ne montre qu’un compte : la rémunération convenue, le remboursement de frais sur justificatifs, et le mouvement du compte courant. Les payer en un seul virement avec un libellé vague oblige à reconstruire l’année. Le [guide pour modifier la société](modify-company) n’est pas l’outil de cette écriture. Il le devient seulement si vous transformez la créance en capital. Jusque-là, la discipline est déclaratif et contractuelle.',
            'If the shareholder is also the manager, separate three envelopes in the writings, even if the bank shows only one account: the agreed remuneration, the repayment of expenses against invoices, and the movement on the current account. Paying them in a single transfer with a vague description forces you to rebuild the year. The [company-amendment guide](modify-company) is not the tool for that entry. It becomes so only if you turn the claim into capital. Until then, the discipline is tax filings and contractual.',
            'إذا كان الشريك هو المسيّر أيضاً، فافصلوا ثلاث أظرفة في الكتابات، حتى لو أظهر البنك حساباً واحداً: المكافأة المتفق عليها، وإرجاع المصاريف مقابل فواتير، وحركة الحساب الجاري. وأداؤها في تحويل واحد ببيان غامض يفرض إعادة بناء السنة. و[دليل تعديل الشركة](modify-company) ليس أداة هذا القيد. ويصبح كذلك فقط إذا حولتم الدين إلى رأس مال. وإلى ذلك الحين، الانضباط مستشاري وتعاقدي.'
          ),
          t(
            'En fin d’exercice, faites signer à l’associé un relevé du solde. Ce papier ne crée pas la créance : il constate ce que les pièces disent déjà. Il évite qu’un associé entrant, ou un liquidateur, reconstitue des années de virements. Si le solde est nul, écrivez-le aussi. Une société qui « doit encore quelque chose » sans chiffre est le conflit le plus long à dénouer, surtout quand l’associé vit à l’étranger et que les relevés bancaires ne sont plus en ligne.',
            'At year end, have the shareholder sign a statement of the balance. That paper does not create the claim: it records what the documents already say. It avoids a new shareholder, or a liquidator, rebuilding years of transfers. If the balance is nil, write that too. A company that “still owes something” with no figure is the longest conflict to untangle, especially when the shareholder lives abroad and the bank statements are no longer online.',
            'في نهاية السنة، اطلبوا من الشريك توقيع كشف بالرصيد. وهذه الورقة لا تنشئ الدين: إنها تثبت ما تقوله الوثائق سلفاً. وهي تتجنب أن يعيد شريك جديد، أو مصفٍّ، بناء سنوات من التحويلات. وإذا كان الرصيد صفراً، فاكتبوا ذلك أيضاً. وشركة «ما زالت مدينة بشيء» بلا رقم هي أطول نزاع يُحل، خصوصاً حين يعيش الشريك في الخارج ولم تعد الكشوف البنكية متاحة.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Le compte courant augmente-t-il les parts ?', 'Does the current account increase the shares?', 'هل يزيد الحساب الجاري الحصص؟'), a:t('Non. Il crée une créance, pas des parts. Les parts ne changent que par une opération sur le capital, décidée et déposée comme telle.', 'No. It creates a claim, not shares. The shares change only by an operation on the capital, decided and filed as such.', 'لا. ينشئ ديناً، لا حصصاً. والحصص لا تتغير إلا بعملية على رأس المال، مقررة ومودعة بهذه الصفة.')},
      {q:t('Faut-il un intérêt ?', 'Is interest required?', 'هل الفائدة لازمة؟'), a:t('La convention le dit. Le régime fiscal de l’intérêt ou de son absence se vérifie dans le CGI. Ce guide n’impose ni n’interdit un intérêt, et il ne publie aucun taux.', 'The agreement says so. The tax treatment of interest or of its absence is checked in the General Tax Code. This guide neither requires nor forbids interest, and it publishes no rate.', 'الاتفاقية تقول ذلك. والنظام الضريبي للفائدة أو لغيابها يُتحقق منه في المدونة. ولا يفرض هذا الدليل فائدة ولا يمنعها، ولا ينشر أي سعر.')},
      {q:t('Peut-on récupérer l’argent à tout moment ?', 'Can the money be taken back at any time?', 'هل يمكن استرجاع المال في أي وقت؟'), a:t('Seulement si la convention, la trésorerie et les pouvoirs le permettent, et si aucune règle de difficulté de l’entreprise ne s’y oppose. Un virement décidé seul ne suffit pas à qualifier le droit.', 'Only if the agreement, the cash and the powers allow it, and if no rule on business difficulties stands in the way. A transfer decided alone is not enough to establish the right.', 'فقط إذا سمحت بذلك الاتفاقية والخزينة والسلطات، وإذا لم تعارض ذلك قاعدة من قواعد صعوبات المقاولة. والتحويل المقرر وحده لا يكفي لإثبات الحق.')},
      {q:t('Un associé non résident est-il traité autrement ?', 'Is a non-resident shareholder treated differently?', 'هل يُعامل الشريك غير المقيم بشكل مختلف؟'), a:t('La créance peut être la même. Le remboursement vers l’étranger ajoute le regard de la banque et de l’Office des Changes, et parfois une retenue dont le taux se lit dans le CGI ou la convention fiscale. Aucun taux n’est indiqué ici. Faites vérifier l’opération.', 'The claim may be the same. Repayment abroad adds the view of the bank and of the Foreign Exchange Office, and sometimes a withholding whose rate is read in the General Tax Code or the tax treaty. No rate is stated here. Have the operation checked.', 'قد يكون الدين هو نفسه. والسداد إلى الخارج يضيف نظر البنك ومكتب الصرف، وأحياناً اقتطاعاً يُقرأ سعره في المدونة أو الاتفاقية الجبائية. ولا يُذكر هنا أي سعر. تحققوا من العملية.')}
    ],
    links:[
      link('guides/capital-social-maroc-quel-montant', 'Capital et apports', 'Capital and contributions', 'رأس المال والمساهمات'),
      link('guides/augmentation-de-capital-sarl', 'Augmentation de capital', 'Capital increase', 'زيادة رأس المال'),
      link('guides/reduction-capital-maroc', 'Réduction de capital', 'Capital reduction', 'تخفيض رأس المال'),
      link('guides/mre-gerer-societe-depuis-letranger', 'Gérer depuis l’étranger', 'Run the company from abroad', 'التسيير من الخارج'),
      link('guides/compte-bancaire-mre', 'Compte professionnel', 'Business account', 'الحساب المهني'),
      link('guides/pacte-associes-que-prevoir', 'Pacte d’associés', 'Shareholders’ agreement', 'اتفاق الشركاء'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:taxSources
  },
  {
    slug:'statut-non-resident-fiscal-maroc',
    category:t('Fiscalité', 'Tax', 'الضرائب'),
    title:t(
      'Statut de non-résident fiscal au Maroc',
      'Non-resident tax status in Morocco',
      'وضع غير المقيم ضريبياً بالمغرب'
    ),
    description:t(
      'La résidence fiscale se lit dans le Code général des impôts, sur votre situation réelle. Être MRE, avoir une société au Maroc ou vivre une partie de l’année à l’étranger ne tranche pas la question. Aucun seuil n’est recopié ici.',
      'Tax residence is read in the General Tax Code, from your real situation. Being a Moroccan abroad, having a company in Morocco or living part of the year overseas does not settle the question. No threshold is copied here.',
      'تُقرأ الإقامة الضريبية في المدونة العامة للضرائب، من وضعكم الحقيقي. وكونكم من مغاربة العالم أو ملكيتكم لشركة بالمغرب أو عيشكم جزءاً من السنة في الخارج لا يحسم السؤال. ولا يُنسخ هنا أي سقف.'
    ),
    fiscal:true,
    sections:[
      {
        heading:t('Le passeport ne dit pas la résidence fiscale', 'A passport does not state tax residence', 'جواز السفر لا يقول الإقامة الضريبية'),
        paragraphs:[
          t(
            'On demande souvent si un MRE, ou un étranger qui crée une société à Marrakech, est « non-résident ». La réponse ne se trouve pas dans la carte consulaire, ni dans le fait d’avoir un billet d’avion, ni dans le siège de la société. La résidence fiscale des personnes est définie par le Code général des impôts. Le texte retient des critères tirés de la vie réelle : le foyer, le centre des intérêts, et une présence au Maroc appréciée selon la règle écrite dans le code. Cette règle a un seuil. Il se lit dans l’article en vigueur sur le site de la Direction générale des impôts. Il n’est pas recopié ici, pour ne pas figer un chiffre que une loi de finances peut modifier, et pour ne pas l’appliquer à votre place.',
            'People often ask whether a Moroccan abroad, or a foreigner who forms a company in Marrakech, is a “non-resident”. The answer is not in the consular card, nor in the fact of having a plane ticket, nor in the company’s office. Tax residence of individuals is defined by the General Tax Code. The text uses criteria drawn from real life: the home, the centre of interests, and a presence in Morocco assessed under the rule written in the code. That rule has a threshold. It is read in the article in force on the General Tax Directorate’s website. It is not copied here, so as not to freeze a figure a finance law can change, and so as not to apply it for you.',
            'يُسأل غالباً هل مغربي بالخارج، أو أجنبي يؤسس شركة بمراكش، «غير مقيم». والجواب ليس في البطاقة القنصلية، ولا في وجود تذكرة طائرة، ولا في مقر الشركة. فالإقامة الضريبية للأشخاص معرفة في المدونة العامة للضرائب. ويستعمل النص معايير من الحياة الحقيقية: السكن، ومركز المصالح، وحضوراً في المغرب يُقدر وفق القاعدة المكتوبة في المدونة. ولهذه القاعدة سقف. ويُقرأ في المادة الجارية على موقع المديرية العامة للضرائب. وهو غير منسوخ هنا، حتى لا يُجمد رقم يمكن لقانون مالية أن يعدله، وحتى لا يُطبق بدلاً عنكم.'
          ),
          t(
            'Le [guide pour créer sans vivre toute l’année au Maroc](guides/mre-creer-societe-sans-vivre-au-maroc) dit déjà que l’absence n’est pas un régime fiscal. Cette page va un cran plus loin : elle sépare votre imposition personnelle, l’imposition de la société, et le cas d’une activité exercée depuis l’étranger pour des clients marocains. Trois questions, trois lectures. Les confondre conduit à déclarer trop, ou pas assez, sans que ce guide puisse chiffrer l’écart. Faites vérifier la qualification auprès d’un professionnel, sur les textes en vigueur.',
            'The [guide to forming a company without living in Morocco all year](guides/mre-creer-societe-sans-vivre-au-maroc) already says that absence is not a tax regime. This page goes one step further: it separates your personal tax, the company’s tax, and the case of an activity carried on from abroad for Moroccan clients. Three questions, three readings. Confusing them leads to declaring too much, or not enough, without this guide being able to quantify the gap. Have the classification checked by a professional, against the texts in force.',
            'يقول [دليل التأسيس دون العيش في المغرب طوال السنة](guides/mre-creer-societe-sans-vivre-au-maroc) سلفاً إن الغياب ليس نظاماً ضريبياً. وتذهب هذه الصفحة خطوة أبعد: تفصل ضريبتكم الشخصية، وضريبة الشركة، وحالة نشاط يُمارس من الخارج لزبناء مغاربة. ثلاثة أسئلة، ثلاث قراءات. والخلط بينها يؤدي إلى التصريح بأكثر، أو بأقل، من دون أن يستطيع هذا الدليل تقدير الفرق. تحققوا من التكييف لدى مهني، على النصوص الجارية.'
          )
        ]
      },
      {
        heading:t('Vous, et la société, n’êtes pas le même contribuable', 'You, and the company, are not the same taxpayer', 'أنتم والشركة لستما الملزم نفسه'),
        paragraphs:[
          t(
            'Une société marocaine est imposée selon les règles qui s’appliquent aux sociétés, que son associé soit résident ou non. Votre qualité de non-résident ne transporte pas la société hors du champ marocain. Inversement, le fait que la société paie l’impôt au Maroc ne dit pas si vos autres revenus, votre salaire à l’étranger ou vos loyers personnels y sont imposables. Le [guide de la filiale](guides/gouvernance-filiale-marocaine) rappelle que la société a sa vie propre. Le même principe vaut pour l’impôt.',
            'A Moroccan company is taxed under the rules that apply to companies, whether its shareholder is resident or not. Your non-resident status does not take the company out of the Moroccan field. Conversely, the fact that the company pays tax in Morocco does not say whether your other income, your wage abroad or your personal rents are taxable there. The [subsidiary guide](guides/gouvernance-filiale-marocaine) recalls that the company has its own life. The same principle applies to tax.',
            'تُفرض الشركة المغربية وفق القواعد المطبقة على الشركات، سواء أكان شريكها مقيماً أم لا. وصفتكم كغير مقيم لا تنقل الشركة خارج المجال المغربي. وفي المقابل، كون الشركة تؤدي الضريبة في المغرب لا يقول هل مداخلكم الأخرى أو أجركم في الخارج أو كراءاتكم الشخصية خاضعة للضريبة هناك. ويذكّر [دليل الشركة التابعة](guides/gouvernance-filiale-marocaine) بأن للشركة حياتها. والمبدأ نفسه يسري على الضريبة.'
          ),
          t(
            'Les sommes que vous retirez de la société changent de nature selon le canal : rémunération de gérant, dividende, remboursement de compte courant, ou remboursement de frais. Chacun a sa qualification. Les [guides des dividendes](guides/revenus-capitaux-mobiliers-maroc) déjà en ligne détaillent des mécanismes de revenus de capitaux. Cette page ne reprend aucun taux de retenue. Le taux, lorsqu’il existe, se lit dans le CGI ou, s’il s’applique, dans la convention fiscale entre le Maroc et votre pays de résidence. Une convention ne s’applique pas toute seule : elle suppose souvent une résidence prouvée de l’autre côté, et des formulaires. Demandez lesquels avant de calculer un net.',
            'The sums you take from the company change nature according to the channel: manager’s remuneration, a dividend, repayment of a current account, or repayment of expenses. Each has its classification. The [dividend guides](guides/revenus-capitaux-mobiliers-maroc) already online set out mechanisms for income from capital. This page repeats no withholding rate. The rate, where one exists, is read in the General Tax Code or, where it applies, in the tax treaty between Morocco and your country of residence. A treaty does not apply by itself: it often assumes residence proved on the other side, and forms. Ask which ones before you calculate a net amount.',
            'المبالغ التي تسحبونها من الشركة تتغير طبيعتها حسب القناة: مكافأة مسيّر، أو ربح، أو سداد حساب جار، أو إرجاع مصاريف. ولكل تكييفه. وتفصل [أدلة الأرباح](guides/revenus-capitaux-mobiliers-maroc) المنشورة آليات مداخيل رؤوس الأموال. ولا تعيد هذه الصفحة أي سعر اقتطاع. والسعر، حين يوجد، يُقرأ في المدونة أو، عند انطباقها، في الاتفاقية الجبائية بين المغرب وبلد إقامتكم. والاتفاقية لا تطبق وحدها: فهي تفترض غالباً إقامة مثبتة في الجانب الآخر، واستمارات. اسألوا أيها قبل حساب صاف.'
          )
        ]
      },
      {
        heading:t('Travailler pour le Maroc sans y vivre', 'Working for Morocco without living there', 'العمل لفائدة المغرب دون العيش فيه'),
        paragraphs:[
          t(
            'Un non-résident peut avoir des revenus de source marocaine : redevance, prestation, dividende, intérêt de compte courant. La retenue et l’obligation déclarative, lorsqu’elles existent, sont celles du CGI. Elles ne sont pas les mêmes pour toutes ces sommes. Une facture envoyée depuis l’étranger à une société marocaine n’est pas « hors impôt » parce qu’elle est en devise. Le [guide du compte courant](guides/compte-courant-associe-maroc) traite du prêt d’associé. Une prestation facturée par le même associé est un autre contrat. Ne les compensez pas dans un seul virement.',
            'A non-resident can have Moroccan-source income: a royalty, a service, a dividend, interest on a current account. The withholding and the filing obligation, where they exist, are those of the General Tax Code. They are not the same for all these sums. An invoice sent from abroad to a Moroccan company is not “outside tax” because it is in foreign currency. The [current-account guide](guides/compte-courant-associe-maroc) deals with a shareholder loan. A service invoiced by the same shareholder is another contract. Do not net them in a single transfer.',
            'قد تكون لغير المقيم مداخيل من مصدر مغربي: إتاوة، أو خدمة، أو ربح، أو فائدة حساب جار. والاقتطاع وواجب التصريح، حين يوجدان، هما ما في المدونة. وليسا نفسهما لكل هذه المبالغ. وفاتورة مرسلة من الخارج إلى شركة مغربية ليست «خارج الضريبة» لأنها بالعملة. ويعالج [دليل الحساب الجاري](guides/compte-courant-associe-maroc) قرض الشريك. والخدمة المفوترة من الشريك نفسه عقد آخر. ولا تقاصوهما في تحويل واحد.'
          ),
          t(
            'L’activité exercée au Maroc par une personne ou par une société étrangère peut créer une présence imposable, selon les critères du CGI et, s’il y a une convention, selon celle-ci. Un bureau, un chantier, ou une personne qui engage l’entreprise sur place ne se jugent pas à l’intuition. Ce guide ne définit pas le seuil. Il vous dit de le faire qualifier avant d’ouvrir un local « temporaire » ou de laisser un collaborateur signer des contrats à Marrakech. La [création depuis la France](guides/creer-societe-maroc-depuis-la-france) est une autre voie : une société marocaine, avec son propre périmètre.',
            'Activity carried on in Morocco by a person or by a foreign company can create a taxable presence, under the criteria of the General Tax Code and, if there is a treaty, under that treaty. An office, a site, or a person who binds the business on the spot are not judged by intuition. This guide does not define the threshold. It tells you to have it classified before you open a “temporary” premises or let a colleague sign contracts in Marrakech. [Formation from France](guides/creer-societe-maroc-depuis-la-france) is another path: a Moroccan company, with its own perimeter.',
            'النشاط الممارس في المغرب من شخص أو من شركة أجنبية قد ينشئ حضوراً خاضعاً للضريبة، وفق معايير المدونة، وإن وُجدت اتفاقية، وفقها. والمكتب أو الورش أو الشخص الذي يلزم المقاولة في عين المكان لا يُحكم بالحدس. ولا يحدد هذا الدليل السقف. وهو يقول لكم أن تطلبوا تكييفه قبل فتح محل «مؤقت» أو ترك زميل يوقّع عقوداً بمراكش. و[التأسيس من فرنسا](guides/creer-societe-maroc-depuis-la-france) مسار آخر: شركة مغربية، بنطاقها الخاص.'
          )
        ]
      },
      {
        heading:t('Change, banque et preuves', 'Exchange control, the bank and evidence', 'الصرف والبنك والإثبات'),
        paragraphs:[
          t(
            'Le statut fiscal et le régime de l’Office des Changes ne se confondent pas. Vous pouvez avoir à justifier une sortie de fonds auprès de la banque et de l’Office alors même que l’impôt a été regardé. Conservez : preuve de résidence à l’étranger s’il en faut une, décision de distribution ou contrat, preuve du paiement de la retenue s’il y en a une, et relevés. Le [guide du compte professionnel](guides/compte-bancaire-mre) dit ce que le cabinet peut ordonner. Il ne promet pas le virement.',
            'Tax status and the Foreign Exchange Office regime are not the same. You may have to justify an outward payment to the bank and to the Office even when the tax has been looked at. Keep: proof of residence abroad if one is needed, the distribution decision or the contract, proof that withholding was paid if there was any, and statements. The [business-account guide](guides/compte-bancaire-mre) says what the firm can organise. It does not promise the transfer.',
            'الوضع الضريبي ونظام مكتب الصرف لا يختلطان. وقد يلزمكم تبرير خروج أموال تجاه البنك ومكتب الصرف حتى لو نُظر إلى الضريبة. احتفظوا: بإثبات الإقامة في الخارج إن لزم، وبقرار التوزيع أو العقد، وبإثبات أداء الاقتطاع إن وُجد، وبالكشوف. ويقول [دليل الحساب المهني](guides/compte-bancaire-mre) ما يستطيع المكتب ترتيبه. وهو لا يعد بالتحويل.'
          ),
          t(
            'Comptez vos jours et vos attaches pour vous, avec un professionnel, pas avec un forum. Le foyer, l’école des enfants, le lieu où vous décidez de vos affaires et le temps passé au Maroc se décrivent avec des faits. Une semaine à Marrakech pour signer des statuts n’a pas le même poids qu’une année d’allers-retours non notés. La page [investir au Maroc](investir-au-maroc) ouvre le cadrage du projet. La question fiscale personnelle se traite à part, sur devis, via le [contact](contact). Aucun statut « non-résident Felexia » n’existe.',
            'Count your days and your ties for yourself, with a professional, not with a forum. The home, the children’s school, the place where you decide your business and the time spent in Morocco are described with facts. A week in Marrakech to sign articles does not have the same weight as a year of unrecorded trips. The [invest in Morocco](investir-au-maroc) page opens the scoping of the project. The personal tax question is handled separately, on a quote, through [contact](contact). No “Felexia non-resident status” exists.',
            'عدّوا أيامكم وروابطكم لأنفسكم، مع مهني، لا مع منتدى. والسكن ومدرسة الأطفال ومكان تقرير أعمالكم والوقت المقضي في المغرب تُوصف بالوقائع. وأسبوع في مراكش لتوقيع النظام ليس له وزن سنة من الذهاب والإياب غير المدون. وصفحة [الاستثمار بالمغرب](investir-au-maroc) تفتح تأطير المشروع. والسؤال الضريبي الشخصي يُعالج على حدة، بعرض، عبر [الاتصال](contact). ولا يوجد «وضع غير مقيم لدى Felexia».'
          )
        ]
      },
      {
        heading:t('Ce qu’il faut apporter au professionnel', 'What to bring to the professional', 'ما تحضرونه إلى المهني'),
        paragraphs:[
          t(
            'Une opinion sur la résidence ne vaut que si les faits sont posés. Préparez, sans les envoyer par le formulaire du site : où vous dormez réellement dans l’année, où vivent les personnes à votre charge, où sont vos comptes principaux, et combien de séjours vous faites au Maroc. Ajoutez le schéma de la société : qui est associé, qui est gérant, quels flux sont prévus. Le professionnel lit ensuite le CGI, la loi de finances utile et, s’il y a lieu, la convention. Ce guide ne remplace pas cette lecture. Il évite d’arriver avec la seule phrase « je suis MRE, donc non-résident ».',
            'An opinion on residence is only as good as the facts laid out. Prepare, without sending them through the website form: where you actually sleep during the year, where the people you support live, where your main accounts are, and how many stays you make in Morocco. Add the company’s outline: who is a shareholder, who is the manager, which flows are planned. The professional then reads the General Tax Code, the relevant finance law and, where relevant, the treaty. This guide does not replace that reading. It avoids arriving with only the sentence “I am a Moroccan abroad, therefore a non-resident”.',
            'رأي في الإقامة لا يساوي إلا إذا وُضعت الوقائع. حضّروا، دون إرسالها عبر نموذج الموقع: أين تنامون فعلاً خلال السنة، وأين يعيش من تعولون، وأين حساباتكم الرئيسية، وكم إقامة تقومون بها في المغرب. وأضيفوا رسم الشركة: من الشريك، ومن المسيّر، وأي تدفقات مقررة. ثم يقرأ المهني المدونة وقانون المالية المفيد، وعند الاقتضاء، الاتفاقية. ولا يعوّض هذا الدليل هذه القراءة. وهو يمنع الوصول بالجملة الوحيدة «أنا من مغاربة العالم، إذن غير مقيم».'
          ),
          t(
            'Gardez la conclusion par écrit, avec la date des textes utilisés. Si vous emménagez au Maroc, si un enfant y est scolarisé, ou si vous devenez gérant opérationnel à plein temps, la conclusion peut changer. Revenez vers le professionnel à ce moment-là, plutôt que d’appliquer encore une note ancienne. Felexia Conseils, à Mabrouka, peut organiser ce cadrage dans une mission distincte de la création. La mission fiscale n’est pas incluse parce que la société a été immatriculée.',
            'Keep the conclusion in writing, with the date of the texts used. If you move to Morocco, if a child is schooled there, or if you become a full-time operating manager, the conclusion can change. Go back to the professional then, rather than still applying an old note. Felexia Conseils, in Mabrouka, can organise that scoping in an engagement separate from formation. The tax engagement is not included merely because the company was registered.',
            'احتفظوا بالخلاصة كتابة، مع تاريخ النصوص المستعملة. وإذا انتقلتم إلى المغرب، أو تدرس فيه طفل، أو صرتم مسيّراً تشغيلياً كامل الوقت، فقد تتغير الخلاصة. عودوا إلى المهني حينئذ، بدل الاستمرار في تطبيق مذكرة قديمة. ويمكن لـ Felexia Conseils، بمبروكة، تنظيم هذا التأطير في مهمة مستقلة عن التأسيس. والمهمة الضريبية ليست مشمولة لمجرد أن الشركة سُجلت.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Créer une SARL me rend-il résident fiscal ?', 'Does forming a SARL make me tax resident?', 'هل تأسيس SARL يجعلني مقيماً ضريبياً؟'), a:t('Non, pas à lui seul. La société a son imposition. La vôtre dépend des critères du CGI appliqués à votre vie. Faites-les vérifier. Ce guide ne conclut pas à votre place.', 'No, not by itself. The company has its own tax. Yours depends on the General Tax Code’s criteria applied to your life. Have them checked. This guide does not conclude for you.', 'لا، ليس وحده. للشركة فرضها. وفرضكم يتوقف على معايير المدونة مطبقة على حياتكم. تحققوا منها. ولا يخلص هذا الدليل بدلاً عنكم.')},
      {q:t('Le seuil de jours est-il publié ici ?', 'Is the day-count threshold published here?', 'هل سقف الأيام منشور هنا؟'), a:t('Non. Il figure dans le Code général des impôts, sur le site de la Direction générale des impôts. Recopier un nombre exposerait à une erreur si le texte change, et à une mauvaise application s’il est lu seul.', 'No. It is in the General Tax Code, on the General Tax Directorate’s website. Copying a number would risk an error if the text changes, and a wrong application if it is read alone.', 'لا. هو في المدونة العامة للضرائب، على موقع المديرية العامة للضرائب. ونسخ عدد يعرض لخطأ إذا تغير النص، ولتطبيق سيئ إذا قُرأ وحده.')},
      {q:t('Une convention fiscale annule-t-elle l’impôt marocain ?', 'Does a tax treaty cancel Moroccan tax?', 'هل تلغي اتفاقية جبائية الضريبة المغربية؟'), a:t('Elle répartit, dans ses conditions, le droit d’imposer. Elle ne s’applique pas sans résidence établie et sans les justificatifs demandés. Aucun taux conventionnel n’est cité ici.', 'It allocates, on its conditions, the right to tax. It does not apply without residence established and without the evidence required. No treaty rate is cited here.', 'توزع، بشروطها، حق الفرض. وهي لا تطبق بلا إقامة مثبتة وبلا الإثباتات المطلوبة. ولا يُذكر هنا أي سعر اتفاقي.')},
      {q:t('Non-résident fiscal et non-résident au sens du change, est-ce pareil ?', 'Are tax non-residence and foreign-exchange non-residence the same?', 'هل عدم الإقامة الضريبية وعدم الإقامة في معنى الصرف شيء واحد؟'), a:t('Non. L’Office des Changes a ses catégories et ses régimes. La DGI a les siens. Un dossier solide répond aux deux, avec des pièces qui peuvent se recouper sans se confondre.', 'No. The Foreign Exchange Office has its categories and its regimes. The tax directorate has its own. A solid file answers both, with documents that may overlap without being the same.', 'لا. لمكتب الصرف فئاته وأنظمته. وللمديرية فئاتها. والملف المتين يجيب عن الاثنين، بوثائق قد تتقاطع دون أن تختلط.')}
    ],
    links:[
      link('guides/mre-creer-societe-sans-vivre-au-maroc', 'Créer sans vivre toute l’année au Maroc', 'Form a company without living in Morocco all year', 'التأسيس دون العيش في المغرب طوال السنة'),
      link('guides/compte-courant-associe-maroc', 'Compte courant d’associé', 'Shareholder current account', 'الحساب الجاري للشريك'),
      link('guides/revenus-capitaux-mobiliers-maroc', 'Revenus de capitaux', 'Income from capital', 'مداخيل رؤوس الأموال'),
      link('guides/gouvernance-filiale-marocaine', 'Filiale marocaine', 'Moroccan subsidiary', 'الشركة التابعة المغربية'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('guides/compte-bancaire-mre', 'Compte professionnel', 'Business account', 'الحساب المهني'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:taxSources
  }
];
