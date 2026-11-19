const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const laws = [
  src('Loi n° 5-96, SARL, Bulletin officiel', 'Law 5-96, SARL, Official Gazette', 'القانون رقم 5-96، شركة ذات المسؤولية المحدودة، الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Loi n° 17-95, société anonyme, Bulletin officiel', 'Law 17-95, public limited company, Official Gazette', 'القانون رقم 17-95، شركة المساهمة، الجريدة الرسمية', 'https://www.sgg.gov.ma/'),
  src('Code de commerce, Bulletin officiel et Adala', 'Commercial Code, Official Gazette and Adala', 'مدونة التجارة، الجريدة الرسمية وعدالة', 'https://adala.justice.gov.ma/'),
  src('OMPIC', 'OMPIC', 'المكتب المغربي للملكية الصناعية والتجارية', 'https://www.ompic.ma/'),
  src('Direction générale des impôts', 'General Tax Directorate', 'المديرية العامة للضرائب', 'https://www.tax.gov.ma/'),
  src('Office des Changes', 'Foreign Exchange Office', 'مكتب الصرف', 'https://www.oc.gov.ma/'),
  src('CNSS', 'CNSS', 'الصندوق الوطني للضمان الاجتماعي', 'https://www.cnss.ma/')
];

export const lot2a = [
  {
    slug:'gouvernance-filiale-marocaine',
    category:t('Investissement', 'Investment', 'الاستثمار'),
    title:t(
      'Gouvernance d’une filiale marocaine',
      'Governing a Moroccan subsidiary',
      'حكامة شركة تابعة مغربية'
    ),
    description:t(
      'Une filiale marocaine est une société de droit marocain. Les instructions de la société mère ne remplacent ni les statuts, ni les devoirs du dirigeant, ni les décisions que la loi réserve aux associés.',
      'A Moroccan subsidiary is a company under Moroccan law. Instructions from the parent do not replace the articles, the manager’s duties, or the decisions the law reserves to the shareholders.',
      'الشركة التابعة المغربية شركة خاضعة للقانون المغربي. وتعليمات الشركة الأم لا تعوّض النظام ولا واجبات المسيّر ولا القرارات التي يخصصها القانون للشركاء.'
    ),
    sections:[
      {
        heading:t('Une filiale n’est pas un service de la société mère', 'A subsidiary is not a department of the parent', 'الشركة التابعة ليست مصلحة في الشركة الأم'),
        paragraphs:[
          t(
            'Choisir entre filiale et succursale est déjà traité dans le [guide filiale ou succursale](guides/filiale-ou-succursale-maroc) et dans la page [succursale](guides/succursale-au-maroc). Cette page part du choix déjà fait : la structure marocaine est une société, avec sa propre immatriculation, ses propres statuts et son propre dirigeant. Elle peut être une SARL, régie notamment par la loi n° 5-96, ou une société anonyme, régie par la loi n° 17-95. Le groupe n’efface pas cette loi parce que les consignes partent de Paris, de Dubaï ou de Casablanca.',
            'Choosing between a subsidiary and a branch is already covered in the [subsidiary or branch guide](guides/filiale-ou-succursale-maroc) and on the [branch](guides/succursale-au-maroc) page. This page starts from the choice already made: the Moroccan structure is a company, with its own registration, its own articles and its own manager. It may be a SARL, governed in particular by Law 5-96, or a public limited company, governed by Law 17-95. The group does not erase that law because the instructions leave from Paris, Dubai or Casablanca.',
            'الاختيار بين شركة تابعة وفرع معالج سلفاً في [دليل الشركة التابعة أو الفرع](guides/filiale-ou-succursale-maroc) وفي صفحة [الفرع](guides/succursale-au-maroc). وتنطلق هذه الصفحة من الاختيار المنجز: الهيكل المغربي شركة، بتسجيلها ونظامها ومسيّرها. وقد تكون SARL، ينظمها خصوصاً القانون رقم 5-96، أو شركة مساهمة، ينظمها القانون رقم 17-95. والمجموعة لا تمحو هذا القانون لأن التعليمات تخرج من باريس أو دبي أو الدار البيضاء.'
          ),
          t(
            'La société mère est associée, ou actionnaire. Elle vote dans les formes prévues. Elle ne signe pas à la place du gérant un contrat que les statuts réservent à celui-ci, et un courriel du siège ne tient pas lieu de décision d’associés lorsque la loi ou les statuts exigent cette décision. Écrivez qui, dans le groupe, a le droit de voter, et sur quelle pièce : procès-verbal, mandat, ou délégation. Un nom cité dans un organigramme interne n’est pas un pouvoir opposable au Maroc.',
            'The parent is a shareholder. It votes in the forms provided. It does not sign, in place of the manager, a contract the articles reserve to the manager, and an email from headquarters is not a shareholders’ decision when the law or the articles require one. Write who, in the group, may vote, and on which document: minutes, a mandate, or a delegation. A name on an internal organisation chart is not a power enforceable in Morocco.',
            'الشركة الأم شريكة أو مساهمة. وهي تصوّت بالصيغ المقررة. وهي لا توقّع بدلاً من المسيّر عقداً يخصصه النظام له، ورسالة من المقر لا تقوم مقام قرار الشركاء حين يفرض القانون أو النظام هذا القرار. اكتبوا من، في المجموعة، له حق التصويت، وعلى أي وثيقة: محضر، أو وكالة، أو تفويض. والاسم المذكور في هيكل تنظيمي داخلي ليس سلطة يُحتج بها في المغرب.'
          )
        ]
      },
      {
        heading:t('Ce que le dirigeant marocain peut refuser', 'What the Moroccan manager may refuse', 'ما يجوز للمسيّر المغربي رفضه'),
        paragraphs:[
          t(
            'Le gérant d’une SARL, ou les organes d’une société anonyme, ont des devoirs envers la société marocaine, pas seulement envers l’associé majoritaire. Une instruction qui vide la trésorerie, qui fait signer un engagement sans contrepartie identifiable, ou qui décrit une activité que l’objet social ne couvre pas, doit pouvoir être discutée. Le dirigeant qui exécute sans écrire s’expose, et la société aussi. Notez l’instruction, la décision, et le refus s’il y en a un. Le [guide pour gérer depuis l’étranger](guides/mre-gerer-societe-depuis-letranger) complète ce point lorsque les signataires ne sont pas dans le même pays.',
            'The manager of a SARL, or the bodies of a public limited company, have duties to the Moroccan company, not only to the majority shareholder. An instruction that empties the cash, that has someone sign a commitment with no identifiable return, or that describes an activity the corporate purpose does not cover, must be open to discussion. The manager who carries it out without writing anything down is exposed, and so is the company. Record the instruction, the decision, and the refusal if there is one. The [guide to running a company from abroad](guides/mre-gerer-societe-depuis-letranger) adds to this point when the signatories are not in the same country.',
            'لمسيّر SARL، أو لأجهزة شركة المساهمة، واجبات تجاه الشركة المغربية، لا تجاه الشريك الأغلبي فقط. والتعليم الذي يفرغ الخزينة، أو يجعل أحداً يوقّع التزاماً بلا مقابل يمكن تحديده، أو يصف نشاطاً لا يغطيه الغرض، يجب أن يكون قابلاً للنقاش. والمسيّر الذي ينفذ بلا كتابة يعرّض نفسه، والشركة أيضاً. دوّنوا التعليم والقرار والرفض إن وُجد. ويكمل [دليل التسيير من الخارج](guides/mre-gerer-societe-depuis-letranger) هذه النقطة حين لا يكون الموقّعون في البلد نفسه.'
          ),
          t(
            'Nommez un dirigeant qui existe vraiment : une personne qui peut signer, répondre à une banque et lire un courrier. Une filiale « sans personne » dont tous les pouvoirs restent à l’étranger se bloque au premier acte local. La procuration utile énumère les actes. Elle ne dit pas « gérer la filiale ». Le [guide procuration](guides/procuration-creation-etranger) rappelle la forme des actes signés hors du Maroc. La banque, de son côté, enregistre ses propres signataires. Les deux listes doivent rester compatibles.',
            'Name a manager who really exists: a person who can sign, answer a bank and read a letter. A subsidiary “with nobody”, whose powers all stay abroad, stalls at the first local act. A useful power of attorney lists the acts. It does not say “run the subsidiary”. The [power of attorney guide](guides/procuration-creation-etranger) recalls the form of deeds signed outside Morocco. The bank, for its part, records its own signatories. The two lists must stay compatible.',
            'سمّوا مسيّراً موجوداً فعلاً: شخصاً يستطيع التوقيع والرد على بنك وقراءة رسالة. وشركة تابعة «بلا أحد»، تبقى كل سلطاتها في الخارج، تتعطل عند أول عمل محلي. والوكالة المفيدة تعدّد الأعمال. وهي لا تقول «سيّروا الشركة التابعة». ويذكّر [دليل الوكالة](guides/procuration-creation-etranger) بصيغة العقود الموقعة خارج المغرب. والبنك، من جهته، يسجل موقّعيه. ويجب أن تبقى اللائحتان متوافقتين.'
          )
        ]
      },
      {
        heading:t('Les flux entre la mère et la filiale', 'Flows between the parent and the subsidiary', 'التدفقات بين الأم والتابعة'),
        paragraphs:[
          t(
            'Un prix de vente au groupe, une redevance, un prêt, une refacturation de personnel ou un compte courant ne sont pas des détails comptables qu’on régularise en fin d’année. Ce sont des conventions. Écrivez l’objet, le montant ou la méthode de calcul, la durée et qui signe des deux côtés. Une méthode vaut mieux qu’un chiffre figé qui ne correspondra plus à l’activité. Ce guide ne publie aucun prix de pleine concurrence et ne dit pas qu’une convention est « au prix du marché » parce que le groupe l’affirme. La qualification fiscale se vérifie dans le Code général des impôts, pour l’opération réelle. Faites-la relire par un professionnel.',
            'A sale price to the group, a royalty, a loan, a recharge of staff or a current account are not accounting details to be tidied at year end. They are agreements. Write the purpose, the amount or the method of calculation, the term and who signs on both sides. A method is better than a frozen figure that will no longer match the activity. This guide publishes no arm’s-length price and does not say an agreement is “at market price” because the group says so. The tax classification is checked in the General Tax Code, for the real operation. Have it reread by a professional.',
            'ثمن بيع للمجموعة أو إتاوة أو قرض أو إعادة فوترة مستخدمين أو حساب جار ليست تفاصيل محاسبية تُسوّى في آخر السنة. إنها اتفاقيات. اكتبوا الغرض والمبلغ أو طريقة الحساب والمدة ومن يوقّع من الجانبين. والطريقة أفضل من رقم مجمد لن يطابق النشاط. ولا ينشر هذا الدليل أي ثمن منافسة كاملة ولا يقول إن اتفاقية «بسعر السوق» لأن المجموعة تؤكد ذلك. والتكييف الضريبي يُتحقق في المدونة العامة للضرائب، للعملية الحقيقية. اطلبوا إعادة قراءته من مهني.'
          ),
          t(
            'Si l’argent vient de l’étranger ou doit y retourner, l’Office des Changes publie le régime applicable à certains investissements et à certains revenus. Lire ce régime ne crée pas un virement automatique. Conservez la trace : qui a versé, sur quel compte, au titre de quel apport ou de quel prêt. Le [guide du capital](guides/capital-social-maroc-quel-montant) distingue l’apport des autres financements. Le [guide depuis la France](guides/creer-societe-maroc-depuis-la-france) revient sur les pièces de la société étrangère associée.',
            'If the money comes from abroad or must go back there, the Foreign Exchange Office publishes the regime that applies to some investments and some income. Reading that regime does not create an automatic transfer. Keep the trail: who paid, into which account, as which contribution or which loan. The [capital guide](guides/capital-social-maroc-quel-montant) separates the contribution from other financing. The [guide from France](guides/creer-societe-maroc-depuis-la-france) returns to the documents of the foreign company shareholder.',
            'إذا أتى المال من الخارج أو وجب أن يعود إليه، ينشر مكتب الصرف النظام المطبق على بعض الاستثمارات وبعض المداخيل. وقراءة هذا النظام لا تنشئ تحويلاً تلقائياً. احتفظوا بالأثر: من دفع، وفي أي حساب، وبأي صفة مساهمة أو قرض. ويميز [دليل رأس المال](guides/capital-social-maroc-quel-montant) المساهمة عن التمويلات الأخرى. ويعود [الدليل من فرنسا](guides/creer-societe-maroc-depuis-la-france) إلى وثائق الشركة الأجنبية الشريكة.'
          )
        ]
      },
      {
        heading:t('Information, comptes et marque', 'Information, accounts and the brand', 'الإخبار والحسابات والعلامة'),
        paragraphs:[
          t(
            'La mère a besoin des comptes. La filiale a besoin que quelqu’un les tienne au Maroc, avec les pièces locales : factures, relevés, contrats, paie. Un reporting de groupe en anglais ne remplace pas les obligations comptables et fiscales marocaines. Le calendrier de ces obligations se confirme auprès de la Direction générale des impôts et d’un professionnel. Il n’est pas recopié ici. Si la filiale emploie, l’affiliation et les déclarations à la CNSS suivent les règles de cet organisme, quel que soit le pays de la mère.',
            'The parent needs the accounts. The subsidiary needs someone to keep them in Morocco, with the local documents: invoices, statements, contracts, payroll. Group reporting in English does not replace Moroccan accounting and tax obligations. The calendar of those obligations is confirmed with the General Tax Directorate and a professional. It is not copied here. If the subsidiary employs people, affiliation and filings with the CNSS follow that body’s rules, whatever the parent’s country.',
            'تحتاج الأم إلى الحسابات. وتحتاج التابعة إلى من يمسكها في المغرب، بالوثائق المحلية: الفواتير، والكشوف، والعقود، والأجور. وتقرير المجموعة بالإنجليزية لا يعوّض الواجبات المحاسبية والضريبية المغربية. وجدول هذه الواجبات يُؤكد لدى المديرية العامة للضرائب ولدى مهني. وهو غير منسوخ هنا. وإذا شغّلت التابعة أجراء، فالانخراط والتصاريح لدى الصندوق الوطني للضمان الاجتماعي تتبع قواعد هذه الهيئة، أياً كان بلد الأم.'
          ),
          t(
            'Le nom de la filiale et la marque du groupe ne sont pas le même dépôt. Le certificat négatif réserve une dénomination. La marque se dépose à part, auprès de l’OMPIC, si vous voulez cette protection. Le [guide du certificat négatif](guides/certificat-negatif-ompic) sépare ces démarches. Une enseigne utilisée à Marrakech sans titre sur le signe peut être un sujet distinct du siège. Le siège, lui, se justifie par domiciliation, bail ou local, comme pour toute société. La page [domiciliation](domiciliation) décrit le besoin. Elle n’attribue pas l’adresse du cabinet.',
            'The subsidiary’s name and the group’s trademark are not the same filing. The negative certificate reserves a company name. The trademark is filed separately, with OMPIC, if you want that protection. The [negative-certificate guide](guides/certificat-negatif-ompic) separates those steps. A sign used in Marrakech with no title to the sign can be a subject distinct from the office. The office is evidenced by domiciliation, a lease or premises, as for any company. The [domiciliation](domiciliation) page describes the need. It does not assign the firm’s address.',
            'اسم الشركة التابعة وعلامة المجموعة ليسا الإيداع نفسه. فالشهادة السلبية تحجز تسمية. والعلامة تُودع على حدة، لدى OMPIC، إذا أردتم هذه الحماية. ويفصل [دليل الشهادة السلبية](guides/certificat-negatif-ompic) هذه الإجراءات. ولافتة مستعملة بمراكش بلا سند على العلامة قد تكون موضوعاً مستقلاً عن المقر. والمقر يُثبت بتوطين أو كراء أو محل، كأي شركة. وتصف صفحة [التوطين](domiciliation) الحاجة. وهي لا تمنح عنوان المكتب.'
          )
        ]
      },
      {
        heading:t('Ce qu’il faut avoir écrit avant le premier exercice', 'What should be written before the first financial year', 'ما يجب أن يكون مكتوباً قبل أول سنة'),
        paragraphs:[
          t(
            'La gouvernance tenue est celle qu’un nouvel arrivant comprend sans appeler le siège. Avant la clôture, vérifiez les points suivants.',
            'Governance that holds is governance a newcomer understands without calling headquarters. Before the year closes, check the following points.',
            'الحكامة التي تصمد هي التي يفهمها وافد جديد دون الاتصال بالمقر. وقبل الإقفال، راجعوا النقاط التالية.'
          )
        ],
        list:t(
          [
            'Les statuts disent qui vote les comptes, qui nomme le dirigeant et quelles décisions ne sont pas de sa seule main.',
            'La personne qui vote pour la société mère a un mandat qui couvre cet acte.',
            'Les conventions avec le groupe sont écrites, avec une méthode de calcul, pas seulement un usage.',
            'Les signataires bancaires et les pouvoirs statutaires se correspondent.',
            'Les pièces comptables restent au Maroc, même si le reporting part à l’étranger.',
            'Le capital, les prêts et les apports en compte courant ne sont pas mélangés.',
            'Le pacte, s’il existe, ne contredit pas la loi marocaine de la forme. Le [guide du pacte](guides/pacte-associes-que-prevoir) sert à cette lecture.'
          ],
          [
            'The articles say who approves the accounts, who appoints the manager and which decisions are not his or hers alone.',
            'The person who votes for the parent has a mandate that covers that act.',
            'Agreements with the group are in writing, with a method of calculation, not only a habit.',
            'The bank signatories and the statutory powers match.',
            'The accounting documents stay in Morocco, even if the reporting goes abroad.',
            'Capital, loans and current-account contributions are not mixed.',
            'The shareholders’ agreement, if there is one, does not contradict the Moroccan law of the form. The [agreement guide](guides/pacte-associes-que-prevoir) is for that reading.'
          ],
          [
            'النظام يقول من يصوّت على الحسابات، ومن يعيّن المسيّر، وأي القرارات ليست بيده وحده.',
            'الشخص الذي يصوّت عن الشركة الأم له وكالة تغطي هذا العمل.',
            'الاتفاقيات مع المجموعة مكتوبة، بطريقة حساب، لا بعادة فقط.',
            'الموقّعون البنكيون والسلطات النظامية متطابقون.',
            'وثائق المحاسبة تبقى في المغرب، حتى لو ذهب التقرير إلى الخارج.',
            'رأس المال والقروض والمساهمات في الحساب الجاري غير مختلطة.',
            'اتفاق الشركاء، إن وُجد، لا يناقض القانون المغربي للشكل. و[دليل الاتفاق](guides/pacte-associes-que-prevoir) يخدم هذه القراءة.'
          ]
        )
      },
      {
        heading:t('Marrakech ne change pas la chaîne de décision', 'Marrakech does not change the chain of decision', 'مراكش لا تغيّر سلسلة القرار'),
        paragraphs:[
          t(
            'Installer la filiale à Marrakech, ou y domicilier seulement le siège, ne crée pas un droit des sociétés local. Le centre régional d’investissement de la région est un interlocuteur des démarches. Il ne vote pas à la place des associés et il ne confirme pas qu’une instruction du groupe est régulière. Quand le dirigeant est à Marrakech et la mère à l’étranger, fixez l’heure à laquelle une décision urgente est réputée reçue, et le support qui fait foi : un courriel nommé, pas une messagerie personnelle. Ce délai interne n’est pas un délai d’administration. Il évite qu’un contrat soit signé ici pendant que le groupe croit encore en débattre.',
            'Setting the subsidiary up in Marrakech, or only domiciling the office there, does not create a local company law. The region’s investment centre is a contact for procedures. It does not vote in place of the shareholders and it does not confirm that a group instruction is regular. When the manager is in Marrakech and the parent is abroad, set the time at which an urgent decision is treated as received, and the medium that counts: a named email, not a personal chat. That internal timing is not an administrative deadline. It avoids a contract being signed here while the group still thinks it is debating it.',
            'إقامة الشركة التابعة بمراكش، أو توطين المقر فيها فقط، لا ينشئ قانون شركات محلياً. والمركز الجهوي للاستثمار في الجهة مخاطب للإجراءات. وهو لا يصوّت بدلاً من الشركاء ولا يؤكد أن تعليم المجموعة سليم. وحين يكون المسيّر بمراكش والأم في الخارج، حددوا الساعة التي يُعد فيها قرار مستعجل متوصلاً به، والوسيلة التي يُعتد بها: بريد مسمى، لا محادثة شخصية. وهذا التوقيت الداخلي ليس أجلاً إدارياً. وهو يمنع توقيع عقد هنا بينما المجموعة تظن أنها ما زالت تناقشه.'
          ),
          t(
            'Prévoyez aussi la relève. Si le dirigeant marocain part, la filiale ne peut pas attendre le prochain conseil du groupe pour payer un salaire ou un loyer. Les statuts disent comment il est remplacé. Le [guide des modifications](guides/modifier-societe-maroc) rappelle que le changement se dépose. Jusque-là, une personne nommément habilitée tient les actes courants, dans une liste courte. Cette liste se relit une fois par an, en même temps que les comptes. Une gouvernance qui n’a pas été relue depuis la constitution décrit une société qui n’existe plus.',
            'Also plan the handover. If the Moroccan manager leaves, the subsidiary cannot wait for the group’s next board to pay a wage or a rent. The articles say how the manager is replaced. The [amendments guide](guides/modifier-societe-maroc) recalls that the change is filed. Until then, a person named as authorised carries the routine acts, on a short list. That list is read again once a year, at the same time as the accounts. Governance that has not been reread since formation describes a company that no longer exists.',
            'وتوقعوا أيضاً الخلافة. إذا غادر المسيّر المغربي، لا تستطيع الشركة التابعة انتظار مجلس المجموعة المقبل لأداء أجر أو كراء. والنظام يقول كيف يُستخلف. ويذكّر [دليل التعديلات](guides/modifier-societe-maroc) بأن التغيير يُودع. وإلى ذلك الحين، شخص مسمى مأذون يمسك الأعمال الجارية، في لائحة قصيرة. وتُعاد قراءة هذه اللائحة مرة في السنة، مع الحسابات. وحكامة لم تُعاد قراءتها منذ التأسيس تصف شركة لم تعد موجودة.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('La société mère peut-elle donner des ordres quotidiens au gérant ?', 'Can the parent give the manager daily orders?', 'هل تستطيع الشركة الأم إعطاء أوامر يومية للمسيّر؟'), a:t('Elle peut convenir d’une politique, dans le respect des statuts et de la loi. Un ordre qui ignore les pouvoirs du dirigeant ou l’intérêt de la filiale n’est pas une décision régulière. Écrivez ce qui relève du vote et ce qui relève de la gestion courante.', 'It can agree a policy, within the articles and the law. An order that ignores the manager’s powers or the subsidiary’s interest is not a regular decision. Write what belongs to a vote and what belongs to day-to-day management.', 'يمكنها الاتفاق على سياسة، في حدود النظام والقانون. والأمر الذي يتجاهل سلطات المسيّر أو مصلحة الشركة التابعة ليس قراراً سليماً. اكتبوا ما يرجع للتصويت وما يرجع للتسيير الجاري.')},
      {q:t('Faut-il un administrateur résident ?', 'Do you need a resident director?', 'هل يلزم مدير مقيم؟'), a:t('La loi de la forme choisie se lit dans le texte en vigueur. Ce guide n’ajoute pas une condition de résidence qui n’y figurerait pas. En pratique, quelqu’un doit pouvoir signer et répondre au Maroc. La banque peut exiger une présence que les statuts ne prévoient pas.', 'The law of the form you chose is read in the text in force. This guide does not add a residence condition that is not in it. In practice, someone must be able to sign and answer in Morocco. The bank may require a presence the articles do not provide.', 'يُقرأ قانون الشكل المختار في النص الجاري. ولا يضيف هذا الدليل شرط إقامة غير وارد فيه. وعملياً، يجب أن يستطيع أحد التوقيع والرد في المغرب. وقد يشترط البنك حضوراً لا ينص عليه النظام.')},
      {q:t('Une convention non écrite est-elle sans effet ?', 'Is an unwritten agreement without effect?', 'هل اتفاقية غير مكتوبة بلا أثر؟'), a:t('Elle est d’abord difficile à prouver, envers le groupe comme envers l’administration. Faites-la écrire avant que les flux s’accumulent. Les effets fiscaux se vérifient sur la convention réelle, pas sur son absence.', 'It is first of all hard to prove, towards the group as towards the administration. Have it written before the flows pile up. The tax effects are checked on the real agreement, not on its absence.', 'هي أولاً صعبة الإثبات، تجاه المجموعة كما تجاه الإدارة. اطلبوا كتابتها قبل تراكم التدفقات. والآثار الضريبية تُتحقق على الاتفاقية الحقيقية، لا على غيابها.')},
      {q:t('Le cabinet devient-il organe de la filiale ?', 'Does the firm become a body of the subsidiary?', 'هل يصبح المكتب جهازاً في الشركة التابعة؟'), a:t('Non. Felexia Conseils prépare et coordonne dans une mission écrite. Il n’est pas gérant et ne siège pas dans un organe. La page [investir au Maroc](investir-au-maroc) ouvre le cadrage. Un devis se demande au [contact](contact).', 'No. Felexia Conseils prepares and coordinates within a written engagement. It is not the manager and it does not sit on a body. The [invest in Morocco](investir-au-maroc) page opens the scoping. A quote is requested at [contact](contact).', 'لا. يحضّر Felexia Conseils وينسق في مهمة مكتوبة. وهو ليس المسيّر ولا يجلس في جهاز. وصفحة [الاستثمار بالمغرب](investir-au-maroc) تفتح التأطير. ويُطلب العرض في [الاتصال](contact).')}
    ],
    fiscal:true,
    links:[
      link('guides/filiale-ou-succursale-maroc', 'Filiale ou succursale', 'Subsidiary or branch', 'شركة تابعة أو فرع'),
      link('guides/succursale-au-maroc', 'La succursale', 'The branch', 'الفرع'),
      link('guides/pacte-associes-que-prevoir', 'Pacte d’associés', 'Shareholders’ agreement', 'اتفاق الشركاء'),
      link('guides/capital-social-maroc-quel-montant', 'Capital', 'Capital', 'رأس المال'),
      link('investir-au-maroc', 'Investir au Maroc', 'Invest in Morocco', 'الاستثمار بالمغرب'),
      link('formes-juridiques', 'Formes juridiques', 'Legal forms', 'الأشكال القانونية'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض')
    ],
    sources:laws
  },
  {
    slug:'dissoudre-et-liquider-societe-maroc',
    category:t('Modification de société', 'Company changes', 'تعديل الشركة'),
    title:t(
      'Dissolution et liquidation d’une société au Maroc',
      'Dissolving and liquidating a company in Morocco',
      'حل وتصفية شركة بالمغرب'
    ),
    description:t(
      'Dissoudre une société est une décision, puis une liquidation. Ce guide distingue la dissolution voulue par les associés des procédures de difficultés, sans publier de délai ni de coût.',
      'Dissolving a company is a decision, then a liquidation. This guide separates a dissolution wanted by the shareholders from insolvency proceedings, without publishing a timeline or a cost.',
      'حل الشركة قرار، ثم تصفية. ويميز هذا الدليل الحل الذي يريده الشركاء عن مساطر الصعوبات، دون نشر أجل أو تكلفة.'
    ),
    fiscal:true,
    sections:[
      {
        heading:t('Décider d’arrêter n’est pas rayer la société', 'Deciding to stop is not striking the company off', 'قرار التوقف ليس شطب الشركة'),
        paragraphs:[
          t(
            'Une société marocaine ne disparaît pas parce que l’activité s’est arrêtée ou parce que les associés ne répondent plus. Tant qu’elle est immatriculée, elle a un siège, un dirigeant et des obligations. La dissolution est la décision de mettre fin au contrat de société. La liquidation est la suite : réaliser l’actif, payer les dettes, puis rendre le solde s’il en reste. Le [guide déjà en ligne](guides/dissolution-de-societe-sarl-au-maroc) décrit le sujet. Cette page ne le recopie pas. Elle ordonne les questions à trancher avant de signer, pour une SARL comme pour une autre forme, et elle renvoie à la loi plutôt qu’à un calendrier mémorisé.',
            'A Moroccan company does not disappear because the activity has stopped or because the shareholders no longer answer. As long as it is registered, it has an office, a manager and obligations. Dissolution is the decision to end the company contract. Liquidation is what follows: realise the assets, pay the debts, then return the balance if any remains. The [guide already online](guides/dissolution-de-societe-sarl-au-maroc) describes the subject. This page does not copy it. It orders the questions to settle before signing, for a SARL as for another form, and it points to the law rather than to a remembered calendar.',
            'الشركة المغربية لا تختفي لأن النشاط توقف أو لأن الشركاء لم يعودوا يجيبون. ما دامت مسجلة، فلها مقر ومسيّر وواجبات. والحل هو قرار إنهاء عقد الشركة. والتصفية هي ما يلي: تحقيق الأصول، وأداء الديون، ثم إرجاع الرصيد إن بقي. ويصف [الدليل المنشور](guides/dissolution-de-societe-sarl-au-maroc) الموضوع. وهذه الصفحة لا تنسخه. إنها ترتب الأسئلة التي تُحسم قبل التوقيع، لـ SARL كما لشكل آخر، وتحيل إلى القانون بدل جدول محفوظ.'
          ),
          t(
            'Ne confondez pas cette voie avec les procédures ouvertes quand l’entreprise est en difficulté. Sauvegarde, redressement et liquidation judiciaire relèvent d’un autre texte, notamment la loi relative aux difficultés de l’entreprise. Le [guide des difficultés](guides/difficultes-entreprise-sauvegarde-redressement-maroc) est le bon renvoi. Si des salaires, des dettes fiscales ou des créanciers ne sont pas payés, arrêter « à l’amiable » sans regarder ces dettes n’est pas une liquidation. C’est un dossier incomplet.',
            'Do not confuse this path with the proceedings opened when the business is in difficulty. Safeguard, reorganisation and judicial liquidation come under another text, in particular the law on business difficulties. The [difficulties guide](guides/difficultes-entreprise-sauvegarde-redressement-maroc) is the right pointer. If wages, tax debts or creditors are unpaid, stopping “amicably” without looking at those debts is not a liquidation. It is an incomplete file.',
            'لا تخلطوا هذا المسار بالمساطر المفتوحة حين تكون المقاولة في صعوبة. فالإنقاذ والتسوية والتصفية القضائية تخضع لنص آخر، خصوصاً القانون المتعلق بصعوبات المقاولة. و[دليل الصعوبات](guides/difficultes-entreprise-sauvegarde-redressement-maroc) هو الإحالة المناسبة. وإذا لم تُؤد أجور أو ديون ضريبية أو دائنون، فالتوقف «حبياً» دون النظر إلى هذه الديون ليس تصفية. إنه ملف ناقص.'
          )
        ]
      },
      {
        heading:t('Qui décide, et sur quel texte', 'Who decides, and on which text', 'من يقرر، وعلى أي نص'),
        paragraphs:[
          t(
            'Relisez les statuts avant toute convocation. Ils disent, dans le cadre de la loi de la forme, qui peut provoquer la dissolution et à quelles conditions. Pour une SARL, la loi n° 5-96 est le texte de base, dans sa version en vigueur au Bulletin officiel. Pour une société anonyme, c’est la loi n° 17-95. Le Code de commerce intéresse la radiation et la vie commerciale. Ne recopiez pas ici une majorité apprise ailleurs. Si les associés sont à l’étranger, la forme de leur signature et de leur mandat se confirme avant la réunion. Le [guide des modifications](guides/modifier-societe-maroc) rappelle qu’une décision n’est pas, à elle seule, la mise à jour du registre.',
            'Read the articles again before any notice. They say, within the law of the form, who may bring about dissolution and on what conditions. For a SARL, Law 5-96 is the base text, in the version in force in the Official Gazette. For a public limited company, it is Law 17-95. The Commercial Code matters for striking off and for commercial life. Do not copy here a majority learned elsewhere. If the shareholders are abroad, the form of their signature and of their mandate is confirmed before the meeting. The [amendments guide](guides/modifier-societe-maroc) recalls that a decision is not, by itself, the update of the register.',
            'أعيدوا قراءة النظام قبل أي استدعاء. فهو يقول، في إطار قانون الشكل، من يستطيع إحداث الحل وبأي شروط. وبالنسبة إلى SARL، القانون رقم 5-96 هو النص الأساس، في صيغته الجارية في الجريدة الرسمية. وبالنسبة إلى شركة المساهمة، القانون رقم 17-95. ومدونة التجارة تهم الشطب والحياة التجارية. ولا تنسخوا هنا أغلبية تعلمت في مكان آخر. وإذا كان الشركاء في الخارج، فصيغة توقيعهم ووكالتهم تُؤكد قبل الاجتماع. ويذكّر [دليل التعديلات](guides/modifier-societe-maroc) بأن القرار ليس، وحده، تحيين السجل.'
          ),
          t(
            'La cause mérite une phrase exacte. Arrivée du terme, décision des associés, ou une autre cause prévue par les statuts et par la loi : ce n’est pas le même récit. Une dispute entre associés n’est pas, à elle seule, une cause. Le [pacte](guides/pacte-associes-que-prevoir) peut avoir prévu une sortie. Il ne dissout pas la société à la place de la décision sociale. Si un seul associé reste, la forme à associé unique peut être une autre réponse qu’une dissolution. Ce choix se vérifie sur le dossier, pas dans une préférence.',
            'The cause deserves an exact sentence. Expiry of the term, a decision of the shareholders, or another cause provided by the articles and the law: these are not the same story. A dispute between shareholders is not, by itself, a cause. The [agreement](guides/pacte-associes-que-prevoir) may have provided an exit. It does not dissolve the company in place of the company decision. If only one shareholder remains, the single-member form may be another answer than dissolution. That choice is checked on the file, not from a preference.',
            'السبب يستحق جملة دقيقة. انتهاء المدة، أو قرار الشركاء، أو سبب آخر ينص عليه النظام والقانون: ليست الرواية نفسها. والنزاع بين الشركاء ليس، وحده، سبباً. وقد يكون [الاتفاق](guides/pacte-associes-que-prevoir) قد توقع خروجاً. وهو لا يحل الشركة بدلاً من القرار الاجتماعي. وإذا بقي شريك واحد، فقد يكون الشكل ذو الشريك الوحيد جواباً آخر غير الحل. ويُتحقق من هذا الاختيار على الملف، لا من ميل.'
          )
        ]
      },
      {
        heading:t('Le liquidateur et les comptes', 'The liquidator and the accounts', 'المصفي والحسابات'),
        paragraphs:[
          t(
            'Nommer un liquidateur, c’est désigner la personne qui exécute la liquidation dans les pouvoirs que la décision et la loi lui donnent. Ce n’est pas un titre honorifique pour l’ancien gérant. Dites ce qu’il peut vendre, ce qu’il doit soumettre aux associés, et comment il rend compte. Les pouvoirs trop vagues bloquent une banque. Les pouvoirs trop étroits bloquent une vente d’actif pourtant décidée. Le cabinet, si vous le mandatez, prépare les actes. Il ne devient pas liquidateur parce qu’il rédige.',
            'Appointing a liquidator means naming the person who carries out the liquidation within the powers the decision and the law give them. It is not an honorary title for the former manager. Say what they may sell, what they must put to the shareholders, and how they report. Powers that are too vague stall a bank. Powers that are too narrow stall a sale of assets that was nevertheless decided. The firm, if you instruct it, prepares the deeds. It does not become liquidator because it drafts.',
            'تعيين مصفٍّ هو تسمية الشخص الذي ينفذ التصفية في السلطات التي يمنحها القرار والقانون. وهو ليس لقباً شرفياً للمسيّر السابق. قولوا ما يجوز له بيعه، وما يجب عرضه على الشركاء، وكيف يقدم الحساب. والسلطات الفضفاضة جداً تعطل بنكاً. والسلطات الضيقة جداً تعطل بيع أصل كان مقرراً. والمكتب، إذا كلفتموه، يحضّر العقود. وهو لا يصبح مصفياً لأنه يحرر.'
          ),
          t(
            'Avant de promettre un boni aux associés, établissez ce que la société doit : fournisseurs, bailleur, salariés, organismes. Les salariés relèvent notamment de la CNSS pour ce qui concerne l’affiliation et les déclarations encore dues. Les règles se lisent auprès de la CNSS. Aucun barème n’est recopié ici. Le boni éventuel, une fois les dettes payées, n’est pas un dividende ordinaire par le seul fait qu’il est versé à un associé. Sa qualification fiscale se vérifie dans le Code général des impôts. Faites-la confirmer. S’il faut ensuite transférer des fonds à l’étranger, l’Office des Changes et la banque demandent leurs propres pièces. Le guide sur le rapatriement, lorsqu’il est publié, prolonge cette question. En attendant, ne promettez pas un virement.',
            'Before you promise a surplus to the shareholders, establish what the company owes: suppliers, the landlord, employees, public bodies. Employees come in particular under the CNSS for affiliation and filings still due. The rules are read from the CNSS. No scale is copied here. Any surplus, once the debts are paid, is not an ordinary dividend merely because it is paid to a shareholder. Its tax classification is checked in the General Tax Code. Have it confirmed. If funds must then be transferred abroad, the Foreign Exchange Office and the bank ask for their own documents. The guide on repatriation, when it is published, continues that question. Until then, do not promise a transfer.',
            'قبل أن تعدوا الشركاء بفائض، حددوا ما تدين به الشركة: المزودون، والمكري، والأجراء، والهيئات. والأجراء يخضعون خصوصاً للصندوق الوطني للضمان الاجتماعي فيما يخص الانخراط والتصاريح التي ما زالت مستحقة. والقواعد تُقرأ لدى الصندوق. ولا تُنسخ هنا أي تعريفة. والفائض المحتمل، بعد أداء الديون، ليس ربحاً عادياً لمجرد أنه يُدفع لشريك. وتكييفه الضريبي يُتحقق في المدونة العامة للضرائب. اطلبوا تأكيده. وإذا وجب بعد ذلك تحويل أموال إلى الخارج، فمكتب الصرف والبنك يطلبان وثائقهما. ودليل إعادة الأموال، حين يُنشر، يكمل هذا السؤال. وإلى ذلك الحين، لا تعدوا بتحويل.'
          )
        ]
      },
      {
        heading:t('Siège, contrats et radiation', 'Office, contracts and striking off', 'المقر والعقود والشطب'),
        paragraphs:[
          t(
            'La dissolution ne résilie pas, à elle seule, un bail, un contrat de domiciliation ou un contrat de travail. Chacun se lit. Un bailleur ou un salarié non prévenu selon son contrat devient un créancier de la liquidation. Le siège doit rester joignable pendant les opérations : un courrier qui revient « parti sans adresse » retarde les tiers et les organismes. Si le contrat de domiciliation expire au milieu de la liquidation, renouvelez-le ou transférez le siège. Le [guide du siège](guides/siege-social-maroc) reste utile jusqu’à la radiation.',
            'Dissolution does not, by itself, terminate a lease, a domiciliation contract or an employment contract. Each one is read. A landlord or an employee not told in accordance with their contract becomes a creditor of the liquidation. The office must stay reachable during the operations: mail returned “gone away” delays third parties and public bodies. If the domiciliation contract expires in the middle of the liquidation, renew it or transfer the office. The [office guide](guides/siege-social-maroc) stays useful until striking off.',
            'الحل لا يفسخ، وحده، عقد كراء أو عقد توطين أو عقد شغل. يُقرأ كل واحد. والمكري أو الأجير الذي لم يُبلَّغ وفق عقده يصبح دائناً في التصفية. ويجب أن يبقى المقر قابلاً للاتصال أثناء العمليات: فالبريد العائد «غاب دون عنوان» يؤخر الغير والهيئات. وإذا انتهى عقد التوطين وسط التصفية، جددوه أو انقلوا المقر. ويبقى [دليل المقر](guides/siege-social-maroc) مفيداً إلى الشطب.'
          ),
          t(
            'La radiation au registre du commerce est l’étape qui constate la fin de l’immatriculation. Elle suppose les actes préalables accomplis, pas seulement une volonté. Les pièces et le circuit se confirment auprès de l’OMPIC ou du greffe compétent. Ce guide n’annonce ni délai ni taxe. Après la radiation, conservez les archives : un organisme ou un ancien associé peut encore interroger une année close. La page [modification](modify-company) sert à décrire le besoin. Elle n’est pas le dépôt. Un devis se demande au [contact](contact).',
            'Striking off the trade register is the step that records the end of registration. It assumes the prior acts have been completed, not only a wish. The documents and the path are confirmed with OMPIC or the competent registry. This guide states neither a timeline nor a fee. After striking off, keep the archives: a public body or a former shareholder may still ask about a closed year. The [amendment](modify-company) page is where you describe the need. It is not the filing. A quote is requested at [contact](contact).',
            'الشطب من السجل التجاري هو المرحلة التي تُثبت نهاية التسجيل. وهو يفترض إنجاز الأعمال السابقة، لا مجرد إرادة. والوثائق والمسار يُؤكدان لدى OMPIC أو كتابة الضبط المختصة. ولا يعلن هذا الدليل أجلاً ولا رسماً. وبعد الشطب، احتفظوا بالأرشيف: فقد تسأل هيئة أو شريك سابق عن سنة مقفلة. وصفحة [التعديل](modify-company) مكان وصف الحاجة. وهي ليست الإيداع. ويُطلب العرض في [الاتصال](contact).'
          )
        ]
      },
      {
        heading:t('Erreurs qui laissent la société vivante', 'Mistakes that leave the company alive', 'أخطاء تترك الشركة حية'),
        paragraphs:[
          t(
            'La société reste immatriculée, et donc tenue, tant que la chaîne n’est pas allée au bout.',
            'The company stays registered, and therefore bound, until the chain has gone through to the end.',
            'تبقى الشركة مسجلة، وبالتالي ملزمة، ما لم تبلغ السلسلة نهايتها.'
          )
        ],
        list:t(
          [
            'Cesser de facturer et croire que la société est dissoute.',
            'Signer une décision sans la majorité et la forme exigées par les statuts et la loi.',
            'Oublier de nommer un liquidateur, ou lui donner un pouvoir inutilisable.',
            'Promettre le partage avant d’avoir listé les dettes, y compris sociales et fiscales.',
            'Laisser expirer le siège pendant la liquidation.',
            'Confondre dissolution amiable et procédure de difficultés.',
            'Annoncer un délai de radiation que ni l’OMPIC ni le greffe n’ont confirmé.'
          ],
          [
            'Stopping invoicing and believing the company is dissolved.',
            'Signing a decision without the majority and the form required by the articles and the law.',
            'Forgetting to appoint a liquidator, or giving them a power that cannot be used.',
            'Promising the distribution before listing the debts, including employment and tax debts.',
            'Letting the office expire during the liquidation.',
            'Confusing an amicable dissolution with insolvency proceedings.',
            'Announcing a striking-off timeline that neither OMPIC nor the registry has confirmed.'
          ],
          [
            'التوقف عن الفوترة واعتقاد أن الشركة محلولة.',
            'توقيع قرار دون الأغلبية والصيغة اللتين يفرضهما النظام والقانون.',
            'نسيان تعيين مصفٍّ، أو منحه سلطة لا تُستعمل.',
            'الوعد بالقسمة قبل جرد الديون، بما فيها الاجتماعية والضريبية.',
            'ترك المقر ينتهي أثناء التصفية.',
            'الخلط بين الحل الحبي ومسطرة الصعوبات.',
            'الإعلان عن أجل شطب لم تؤكده OMPIC ولا كتابة الضبط.'
          ]
        )
      },
      {
        heading:t('Les associés absents et les archives', 'Absent shareholders and the archives', 'الشركاء الغائبون والأرشيف'),
        paragraphs:[
          t(
            'Une dissolution décidée depuis l’étranger échoue souvent sur la forme, pas sur le fond. Chaque associé signe dans la forme que le dépôt marocain accepte, avec un mandat si une personne signe pour plusieurs. Le [guide procuration](guides/procuration-creation-etranger) borne cette question au moment de la création. Il sert encore ici : une procuration de constitution ne couvre pas la dissolution. Écrivez une procuration qui vise la décision, la nomination du liquidateur et le retrait des actes, si c’est bien ce que vous voulez. Ne laissez pas un proche « s’occuper de la fermeture » sans texte.',
            'A dissolution decided from abroad often fails on form, not on substance. Each shareholder signs in the form the Moroccan filing accepts, with a mandate if one person signs for several. The [power of attorney guide](guides/procuration-creation-etranger) bounds that question at formation. It still helps here: a formation power of attorney does not cover dissolution. Write a power that covers the decision, the appointment of the liquidator and the collection of the deeds, if that is really what you want. Do not leave a relative to “deal with the closure” with no text.',
            'الحل المقرر من الخارج يفشل غالباً في الشكل، لا في الجوهر. كل شريك يوقّع بالصيغة التي يقبلها الإيداع المغربي، بوكالة إذا وقّع شخص عن عدة. و[دليل الوكالة](guides/procuration-creation-etranger) يحصر هذا السؤال وقت التأسيس. وهو يفيد هنا أيضاً: وكالة التأسيس لا تغطي الحل. اكتبوا وكالة تشمل القرار وتعيين المصفي وسحب العقود، إذا كان هذا ما تريدون فعلاً. ولا تتركوا قريباً «يهتم بالإغلاق» بلا نص.'
          ),
          t(
            'Gardez, après la radiation, un dossier que quelqu’un peut encore ouvrir : statuts, décision, comptes de liquidation, quittances des dettes payées, et la trace des fonds rendus aux associés. Un MRE qui a financé la société voudra rapprocher ce qu’il récupère de ce qu’il a envoyé. Sans cette piste, la banque et l’Office des Changes n’ont rien à lire. Désignez qui conserve les originaux, et pendant que la loi ou un organisme peut encore les demander. Ce guide ne fixe pas cette durée. Elle se confirme auprès du professionnel qui suit le dossier.',
            'After striking off, keep a file someone can still open: articles, the decision, liquidation accounts, receipts for the debts paid, and the trail of the funds returned to the shareholders. A Moroccan abroad who financed the company will want to match what they recover with what they sent. Without that trail, the bank and the Foreign Exchange Office have nothing to read. Name who keeps the originals, and for as long as the law or a body may still ask for them. This guide does not set that period. It is confirmed with the professional who follows the file.',
            'احتفظوا، بعد الشطب، بملف يستطيع أحد فتحه: النظام، والقرار، وحسابات التصفية، وإثباتات الديون المؤداة، وأثر الأموال المرجعة إلى الشركاء. والمغربي بالخارج الذي مول الشركة سيرغب في مطابقة ما يسترجعه مع ما أرسل. ومن دون هذا الأثر، ليس للبنك ولا لمكتب الصرف ما يقرأونه. وعيّنوا من يحفظ الأصول، وللفترة التي قد يطلبها فيها القانون أو هيئة. ولا يحدد هذا الدليل هذه المدة. وتُؤكد لدى المهني الذي يتابع الملف.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Peut-on dissoudre une société qui n’a jamais eu d’activité ?', 'Can you dissolve a company that never traded?', 'هل يمكن حل شركة لم يكن لها نشاط قط؟'), a:t('L’absence d’activité ne dispense pas de la décision, de la liquidation et des formalités. Il reste à établir qu’il n’y a ni dette ni bien oublié. Le dossier est souvent plus court. Il n’est pas facultatif.', 'Lack of activity does not remove the decision, the liquidation and the formalities. It remains to establish that there is neither a debt nor a forgotten asset. The file is often shorter. It is not optional.', 'غياب النشاط لا يعفي من القرار والتصفية والإجراءات. ويبقى إثبات أنه لا دين ولا مال منسي. والملف غالباً أقصر. وهو ليس اختيارياً.')},
      {q:t('Le gérant peut-il dissoudre seul ?', 'Can the manager dissolve the company alone?', 'هل يستطيع المسيّر الحل وحده؟'), a:t('Seulement si les statuts et la loi de la forme le permettent, ce qui se lit dans votre texte et non dans une habitude. Dans le cas ordinaire, la dissolution est une décision d’associés.', 'Only if the articles and the law of the form allow it, which is read in your text and not in a habit. In the ordinary case, dissolution is a decision of the shareholders.', 'فقط إذا سمح بذلك النظام وقانون الشكل، وهذا يُقرأ في نصكم لا في عادة. وفي الحالة العادية، الحل قرار للشركاء.')},
      {q:t('La liquidation règle-t-elle l’impôt ?', 'Does liquidation settle the tax?', 'هل التصفية تحسم الضريبة؟'), a:t('Elle doit tenir compte des déclarations encore dues et de la qualification du boni. Aucun taux n’est donné ici. Faites vérifier la situation auprès d’un professionnel, sur le Code général des impôts et la loi de finances en vigueur.', 'It must take account of filings still due and of the classification of any surplus. No rate is given here. Have the situation checked by a professional, against the General Tax Code and the finance law in force.', 'يجب أن تراعي التصاريح التي ما زالت مستحقة وتكييف الفائض. ولا يُعطى هنا أي سعر. تحققوا من الوضعية لدى مهني، على المدونة العامة للضرائب وقانون المالية الجاري.')},
      {q:t('Combien de temps faut-il ?', 'How long does it take?', 'كم يلزم من الوقت؟'), a:t('Ce guide ne publie aucun délai. La durée dépend des dettes, des actes et des organismes. Elle se discute après lecture du dossier.', 'This guide publishes no timeline. The duration depends on the debts, the deeds and the bodies. It is discussed after the file is read.', 'لا ينشر هذا الدليل أي أجل. والمدة تتوقف على الديون والعقود والجهات. وتُناقش بعد قراءة الملف.')}
    ],
    links:[
      link('guides/dissolution-de-societe-sarl-au-maroc', 'Guide déjà en ligne', 'Guide already online', 'الدليل المنشور'),
      link('guides/difficultes-entreprise-sauvegarde-redressement-maroc', 'Difficultés de l’entreprise', 'Business difficulties', 'صعوبات المقاولة'),
      link('guides/modifier-societe-maroc', 'Modifier une société', 'Change a company', 'تعديل شركة'),
      link('modify-company', 'Décrire l’opération', 'Describe the operation', 'صفوا العملية'),
      link('guides/siege-social-maroc', 'Le siège pendant la liquidation', 'The office during liquidation', 'المقر أثناء التصفية'),
      link('guides/pacte-associes-que-prevoir', 'Sortie prévue au pacte', 'An exit provided in the agreement', 'خروج منصوص عليه في الاتفاق'),
      link('contact', 'Demander un devis', 'Request a quote', 'طلب عرض'),
      link('creation-entreprise', 'Création, si le projet continue autrement', 'Formation, if the project continues another way', 'التأسيس، إذا استمر المشروع بطريقة أخرى')
    ],
    sources:laws
  }
];
