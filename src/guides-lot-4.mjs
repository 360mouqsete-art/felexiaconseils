const t = (fr, en, ar) => ({fr, en, ar});
const link = (path, fr, en, ar) => ({path, label:t(fr, en, ar)});
const src = (fr, en, ar, href) => ({name:t(fr, en, ar), href});

const sources = [
  src(
    'Direction générale des impôts, page « Attestations »',
    'General Tax Directorate, “Certificates” page',
    'المديرية العامة للضرائب، صفحة «الشهادات»',
    'https://portail.tax.gov.ma/wps/portal/DGI/Vos-impots-procedures/Attestations'
  ),
  src(
    'Espace SIMPL-Attestation de la DGI',
    'DGI SIMPL-Certificate area',
    'فضاء SIMPL-Attestation للمديرية العامة للضرائب',
    'https://attestation.tax.gov.ma/attestations/'
  ),
  src(
    'DGI, attestations électroniques SIMPL (page en arabe)',
    'DGI, SIMPL electronic certificates (Arabic page)',
    'المديرية العامة للضرائب، الشهادات الإلكترونية SIMPL',
    'https://www.tax.gov.ma/wps/portal/DGI-Ar/ar/Accueil/teleservices-simpl/tous-teleservices/vos-attestations'
  ),
  src(
    'Portail de la Direction générale des impôts',
    'General Tax Directorate portal',
    'بوابة المديرية العامة للضرائب',
    'https://www.tax.gov.ma/'
  ),
  src(
    'Décret n° 2-22-431 du 8 mars 2023 relatif aux marchés publics, articles 27 et 28 (version consolidée, Adala)',
    'Decree 2-22-431 of 8 March 2023 on public contracts, articles 27 and 28 (consolidated text, Adala)',
    'المرسوم رقم 2.22.431 الصادر في 8 مارس 2023 المتعلق بالصفقات العمومية، المادتان 27 و28 (صيغة محينة، عدالة)',
    'https://adala.justice.gov.ma/api/uploads/2025/11/10/%D9%85%D9%80%D8%B1%D8%B3%D9%80%D9%88%D9%85%20%D8%B1%D9%82%D9%85%202.22.431%20%D9%8A%D8%AA%D8%B9%D9%84%D9%82%20%D8%A8%D8%A7%D9%84%D8%B5%D9%81%D9%82%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B9%D9%85%D9%88%D9%85%D9%8A%D8%A9-1762786798852.pdf'
  ),
  src(
    'Portail marocain des marchés publics, texte du décret',
    'Moroccan public-procurement portal, text of the decree',
    'البوابة المغربية للصفقات العمومية، نص المرسوم',
    'https://www.marchespublics.gov.ma/pmmp/textereg.html?lang=fr'
  ),
  src(
    'Secrétariat général du gouvernement, Bulletin officiel',
    'General Secretariat of the Government, Official Gazette',
    'الأمانة العامة للحكومة، الجريدة الرسمية',
    'https://www.sgg.gov.ma/'
  )
];

export const lot4 = [
  {
    slug:'attestation-regularite-fiscale-dgi-2026',
    category:t('Fiscalité', 'Fiscal', 'الضريبة'),
    fiscal:true,
    modifiedOn:'2026-11-27',
    updated:t(
      'Dernière mise à jour : 27 novembre 2026. Les textes et les portails peuvent changer. Relisez la source officielle avant de décider.',
      'Last updated: 27 November 2026. Statutes and portals can change. Read the official source again before you decide.',
      'آخر تحيين: 27 نوفمبر 2026. قد تتغير النصوص والبوابات. أعيدوا قراءة المصدر الرسمي قبل القرار.'
    ),
    title:t(
      'Attestation de régularité fiscale DGI 2026',
      'DGI tax regularity certificate 2026',
      'شهادة الوضعية الجبائية القانونية لدى المديرية العامة للضرائب 2026'
    ),
    description:t(
      'L’attestation de régularité fiscale est délivrée par la Direction générale des impôts, pas par un cabinet privé. Ce guide 2026 dit à qui la page officielle l’ouvre, comment la demander, et ce que le décret des marchés publics exige. Aucun délai de traitement n’est publié ici.',
      'The tax regularity certificate is issued by the General Tax Directorate, not by a private firm. This 2026 guide says whom the official page opens it to, how to request it, and what the public-procurement decree requires. No processing time is published here.',
      'شهادة الوضعية الجبائية القانونية تسلمها المديرية العامة للضرائب، لا مكتب خاص. ويقول دليل 2026 لمن تفتحها الصفحة الرسمية، وكيف تُطلب، وما يقتضيه مرسوم الصفقات العمومية. ولا يُنشر هنا أي أجل معالجة.'
    ),
    sections:[
      {
        heading:t('À quoi elle sert, et qui la délivre', 'What it is for, and who issues it', 'فيم تُستخدم، ومن يسلمها'),
        paragraphs:[
          t(
            'L’attestation de régularité fiscale est un document de la Direction générale des impôts. Elle constate, pour l’administration fiscale, une situation. Elle n’est pas une pièce que Felexia Conseils établit, signe ou tamponne. Le cabinet est un conseil privé à Marrakech. Il n’est pas une direction des impôts, ni un percepteur, ni un organisme public.',
            'The tax regularity certificate is a document of the General Tax Directorate. It records, for the tax administration, a situation. It is not a paper that Felexia Conseils draws up, signs or stamps. The firm is a private advisory practice in Marrakech. It is not a tax directorate, a tax collector, or a public body.',
            'شهادة الوضعية الجبائية القانونية وثيقة للمديرية العامة للضرائب. وهي تثبت، بالنسبة إلى الإدارة الجبائية، وضعية. وليست ورقة يحررها Felexia Conseils أو يوقعها أو يختمها. والمكتب استشارة خاصة بمراكش. وهو ليس مديرية للضرائب، ولا قابضاً، ولا هيئة عمومية.'
          ),
          t(
            'Dans un marché public, le décret n° 2-22-431 du 8 mars 2023 s’en sert à un moment précis. L’article 28 vise le concurrent auquel il est envisagé d’attribuer le marché. Il demande une attestation, ou une copie certifiée conforme, délivrée depuis moins d’un an par le percepteur du lieu d’imposition. Elle doit établir que le concurrent est en situation fiscale régulière ou, à défaut de paiement, qu’il a constitué les garanties prévues à l’article 27. Elle doit aussi indiquer l’activité au titre de laquelle il est imposé. Le même article prend pour base d’appréciation de la validité la date à laquelle ces pièces sont produites au maître d’ouvrage. Ce n’est pas un délai de fabrication du document : c’est une règle du dossier de marché.',
            'In a public contract, Decree 2-22-431 of 8 March 2023 uses it at a precise moment. Article 28 concerns the competitor to whom the contract is to be awarded. It asks for a certificate, or a certified true copy, issued less than one year earlier by the tax collector of the place of taxation. It must show that the competitor is in a regular tax situation or, if payment has not been made, that the guarantees provided for in article 27 have been put in place. It must also state the activity for which the competitor is taxed. The same article takes, as the basis for assessing validity, the date on which those documents are produced to the project owner. That is not a manufacturing time for the paper: it is a rule of the tender file.',
            'في صفقة عمومية، يستعمل المرسوم رقم 2.22.431 الصادر في 8 مارس 2023 هذه الشهادة في لحظة محددة. والمادة 28 تخص المتنافس المزمع إسناد الصفقة إليه. وهي تطلب شهادة، أو نسخة مشهوداً بمطابقتها للأصل، مسلمة منذ أقل من سنة من القابض في محل فرض الضريبة. ويجب أن تثبت أن المتنافس في وضعية جبائية قانونية أو، عند عدم الأداء، أنه قدم الضمانات المنصوص عليها في المادة 27. ويجب أيضاً أن تبين النشاط الذي فُرضت على أساسه الضريبة. وتتخذ المادة نفسها تاريخ الإدلاء بهذه الوثائق إلى صاحب المشروع أساساً لتقييم الصلاحية. وهذا ليس أجل صنع الوثيقة: بل قاعدة من قواعد ملف الصفقة.'
          ),
          t(
            'Hors marché public, une administration ou une banque peut demander une attestation fiscale dans son propre dossier. La page de la DGI ne dit pas que ce document ouvre tous les guichets. Lisez la liste de pièces de l’organisme qui vous la demande. S’il en veut une autre, par exemple un bulletin d’identification fiscale ou une attestation de chiffre d’affaires, ce n’est pas le même imprimé. Le [guide du compte courant d’associé](guides/compte-courant-associe-maroc) et le [guide du non-résident](guides/statut-non-resident-fiscal-maroc) traitent d’autres questions fiscales. Ils ne remplacent pas cette attestation.',
            'Outside a public contract, an administration or a bank may ask for a tax certificate in its own file. The DGI page does not say that this document opens every counter. Read the list of documents of the body that asks you for it. If it wants another one, for example a tax identification bulletin or a turnover certificate, that is not the same form. The [shareholder current-account guide](guides/compte-courant-associe-maroc) and the [non-resident guide](guides/statut-non-resident-fiscal-maroc) deal with other tax questions. They do not replace this certificate.',
            'خارج الصفقة العمومية، قد تطلب إدارة أو بنك شهادة جبائية في ملفه الخاص. وصفحة المديرية لا تقول إن هذه الوثيقة تفتح كل الشبابيك. اقرأوا لائحة وثائق الهيئة التي تطلبها منكم. وإذا أرادت أخرى، كبيان التعريف الجبائي أو شهادة رقم المعاملات، فليست المطبوع نفسه. ويعالج [دليل الحساب الجاري للشريك](guides/compte-courant-associe-maroc) و[دليل غير المقيم](guides/statut-non-resident-fiscal-maroc) مسائل ضريبية أخرى. وهما لا يعوّضان هذه الشهادة.'
          )
        ]
      },
      {
        heading:t('Qui peut la demander', 'Who can request it', 'من يمكنه طلبها'),
        paragraphs:[
          t(
            'Sur la page « Attestations » de la DGI, l’attestation de régularité fiscale figure dans deux listes : les personnes physiques professionnelles, et les personnes morales. Elle n’est pas présentée, sur cette page, parmi les attestations des particuliers. Une personne qui n’exerce pas une activité professionnelle ne doit donc pas supposer que le même imprimé lui est ouvert. En cas de doute, la direction dont elle dépend confirme.',
            'On the DGI “Certificates” page, the tax regularity certificate appears in two lists: professional natural persons, and legal entities. It is not presented, on that page, among the certificates for private individuals. A person who does not carry on a professional activity should therefore not assume that the same form is open to them. If in doubt, the directorate they depend on confirms.',
            'في صفحة «الشهادات» للمديرية، ترد شهادة الوضعية الجبائية القانونية في لائحتين: الأشخاص الذاتيون المهنيون، والأشخاص الاعتباريون. وهي غير معروضة، في هذه الصفحة، ضمن شهادات الخواص. والشخص الذي لا يزاول نشاطاً مهنياً لا يفترض أن المطبوع نفسه مفتوح له. وعند الشك، تؤكد المديرية التي يتبع لها.'
          ),
          t(
            'Le décret des marchés publics ne crée pas un autre public. Il dit quelles personnes peuvent participer à une procédure, puis quelle pièce le concurrent pressenti produit. L’article 27 exige, parmi d’autres conditions, une situation fiscale régulière : avoir souscrit les déclarations et payé les sommes exigibles, ou, à défaut de paiement, avoir constitué des garanties que l’agent chargé du recouvrement juge suffisantes au regard des règles de recouvrement des créances publiques. Ce guide ne transforme pas cette phrase en une liste de cases à cocher. Votre situation se lit sur votre dossier, pas sur une page générale.',
            'The public-procurement decree does not create another audience. It says which persons may take part in a procedure, then which document the proposed competitor produces. Article 27 requires, among other conditions, a regular tax situation: having filed the returns and paid the amounts due, or, if payment has not been made, having put in place guarantees that the officer in charge of collection considers sufficient under the rules for collecting public debts. This guide does not turn that sentence into a checklist of boxes. Your situation is read from your file, not from a general page.',
            'مرسوم الصفقات العمومية لا يخلق جمهوراً آخر. وهو يقول من يجوز له المشاركة في مسطرة، ثم أي وثيقة يقدمها المتنافس المزمع اختياره. وتشترط المادة 27، من بين شروط أخرى، وضعية جبائية قانونية: الإدلاء بالتصاريح ودفع المبالغ المستحقة، أو، عند عدم الأداء، تقديم ضمانات يراها المكلف بالتحصيل كافية وفق قواعد تحصيل الديون العمومية. ولا يحوّل هذا الدليل هذه الجملة إلى خانات. ووضعيتكم تُقرأ من ملفكم، لا من صفحة عامة.'
          )
        ]
      },
      {
        heading:t('La demande en ligne ou au guichet', 'The request online or at the counter', 'الطلب عبر الخط أو في الشباك'),
        paragraphs:[
          t(
            'La DGI décrit deux voies, sans publier sur cette page un nombre de jours. Pour une demande électronique : une demande sur son portail, dans l’espace téléservices SIMPL, rubrique « vos attestations ». L’espace SIMPL-Attestation est annoncé sur attestation.tax.gov.ma. Pour une demande physique : le formulaire modèle AAC270. La page en arabe des attestations électroniques SIMPL range dans le même service la demande de certificat de situation fiscale régulière, à côté d’autres attestations qui ne sont pas celle-ci.',
            'The DGI describes two paths, without publishing a number of days on that page. For an electronic request: a request on its portal, in the SIMPL online-services area, under “your certificates”. The SIMPL-Certificate area is announced at attestation.tax.gov.ma. For a request at the counter: form AAC270. The Arabic page on SIMPL electronic certificates places in the same service the request for a certificate of regular tax status, next to other certificates that are not this one.',
            'تصف المديرية طريقين، دون أن تنشر في هذه الصفحة عدداً من الأيام. وللطلب الإلكتروني: طلب في بوابتها، في فضاء الخدمات عن بعد SIMPL، خانة «شهاداتكم». ويُعلن فضاء SIMPL-Attestation في attestation.tax.gov.ma. وللطلب الحضوري: المطبوع نموذج AAC270. وتضع الصفحة العربية للشهادات الإلكترونية SIMPL في الخدمة نفسها طلب شهادة الوضعية الجبائية القانونية، إلى جانب شهادات أخرى ليست هذه.'
          ),
          t(
            'Connectez-vous avec les identifiants de l’assujetti concerné, pas avec ceux d’une autre société du groupe. Le certificat portera sur l’activité imposée. Si le marché vise une activité et le certificat en nomme une autre, le dossier ne se correspond pas. La page arabe de la DGI ajoute un point utile à la personne qui reçoit le document : elle peut en vérifier l’authenticité avec le numéro qui figure dessus, et le télécharger sur le site de la DGI sans être elle-même adhérente. Gardez donc ce numéro. Une photocopie sans lui se discute.',
            'Sign in with the identifiers of the taxpayer concerned, not those of another company in the group. The certificate will relate to the taxed activity. If the contract concerns one activity and the certificate names another, the file does not match. The DGI’s Arabic page adds a point that is useful to the person who receives the document: they can check its authenticity with the number printed on it, and download it from the DGI website without themselves being a subscriber. Keep that number. A photocopy without it is open to argument.',
            'ادخلوا بمعرّفات الملزم المعني، لا بمعرّفات شركة أخرى في المجموعة. وستخص الشهادة النشاط المفروض. وإذا كانت الصفقة تخص نشاطاً والشهادة تسمي آخر، فالملف لا يتطابق. وتضيف الصفحة العربية للمديرية نقطة مفيدة لمن يتلقى الوثيقة: يمكنه التحقق من صحتها بالرقم الموجود فيها، وتنزيلها من موقع المديرية دون أن يكون هو نفسه منخرطاً. فاحتفظوا بهذا الرقم. ونسخة من دونه قابلة للنقاش.'
          )
        ],
        list:t(
          [
            'Vérifier que la personne ou la société figure bien parmi les publics indiqués par la DGI pour cette attestation.',
            'Choisir la voie électronique SIMPL ou le formulaire AAC270, selon ce que le service vous indique.',
            'Relire l’activité mentionnée avant de joindre le document à un marché.',
            'Conserver le numéro qui permet au destinataire de contrôler le document sur le site de la DGI.'
          ],
          [
            'Check that the person or the company is among the audiences the DGI indicates for this certificate.',
            'Choose the SIMPL electronic path or form AAC270, according to what the service tells you.',
            'Reread the activity stated before you attach the document to a contract.',
            'Keep the number that lets the recipient check the document on the DGI website.'
          ],
          [
            'تحققوا من أن الشخص أو الشركة ضمن الفئات التي تبينها المديرية لهذه الشهادة.',
            'اختاروا المسار الإلكتروني SIMPL أو المطبوع AAC270، حسب ما يبينه لكم المرفق.',
            'أعيدوا قراءة النشاط المذكور قبل ضم الوثيقة إلى صفقة.',
            'احتفظوا بالرقم الذي يتيح للمتلقي مراقبة الوثيقة في موقع المديرية.'
          ]
        )
      },
      {
        heading:t('Ce que les textes ne chiffrent pas', 'What the texts do not put a figure on', 'ما لا ترقمه النصوص'),
        paragraphs:[
          t(
            'La page des attestations ne donne pas de durée de validité propre au document, en dehors de l’usage qu’en fait le décret des marchés publics. Elle ne donne pas non plus de délai de délivrance, de tarif de la demande, ni de seuil de chiffre d’affaires. Ce guide n’en ajoute pas. Une loi de finances ou une note de service peut préciser un point plus tard. Tant qu’elle n’est pas sur le portail ou au Bulletin officiel, elle n’est pas reprise ici. Le secrétariat général du gouvernement publie le Bulletin officiel ; le numéro utile se cherche sur ce site, pas dans un article de cabinet.',
            'The certificates page does not give a validity period of its own for the document, apart from the use the public-procurement decree makes of it. It also gives no issue time, no fee for the request, and no turnover threshold. This guide adds none. A finance law or a service note may clarify a point later. Until it is on the portal or in the Official Gazette, it is not repeated here. The General Secretariat of the Government publishes the Official Gazette; the relevant issue is looked up on that site, not in a firm’s article.',
            'صفحة الشهادات لا تعطي مدة صلاحية خاصة بالوثيقة، خارج الاستعمال الذي يصنعه منها مرسوم الصفقات العمومية. وهي لا تعطي أيضاً أجل تسليم، ولا تعريفة للطلب، ولا سقفاً لرقم المعاملات. ولا يضيف هذا الدليل شيئاً من ذلك. وقد يوضح قانون مالية أو مذكرة لاحقاً نقطة. وما لم تكن في البوابة أو في الجريدة الرسمية، فلا تُعاد هنا. وتنشر الأمانة العامة للحكومة الجريدة الرسمية؛ والعدد المناسب يُبحث في هذا الموقع، لا في مقال مكتب.'
          ),
          t(
            'Une situation irrégulière ne se corrige pas par une lettre du cabinet. Si des déclarations manquent ou si des sommes exigibles restent dues, c’est le dossier fiscal qui est en cause, devant la direction compétente. Les garanties mentionnées par l’article 27 sont celles que l’agent du recouvrement apprécie. Elles ne sont pas un modèle que ce guide rédige. Pour le reste de la vie fiscale de la société, la page [conseil fiscal](conseil-fiscal) cadre un échange. Elle ne promet pas l’attestation.',
            'An irregular situation is not cured by a letter from the firm. If returns are missing or amounts due remain unpaid, it is the tax file that is at issue, before the competent directorate. The guarantees mentioned by article 27 are those the collection officer assesses. They are not a template this guide drafts. For the rest of the company’s tax life, the [tax advisory](conseil-fiscal) page frames a conversation. It does not promise the certificate.',
            'الوضعية غير القانونية لا تُصحح برسالة من المكتب. وإذا نقصت تصاريح أو بقيت مبالغ مستحقة غير مؤداة، فالملف الجبائي هو المقصود، أمام المديرية المختصة. والضمانات التي تذكرها المادة 27 هي التي يقدرها مكلف التحصيل. وهي ليست نموذجاً يحرره هذا الدليل. ولباقي الحياة الضريبية للشركة، تؤطر صفحة [الاستشارة الضريبية](conseil-fiscal) حواراً. وهي لا تعد بالشهادة.'
          )
        ]
      },
      {
        heading:t('Le rôle d’un cabinet privé', 'The role of a private firm', 'دور مكتب خاص'),
        paragraphs:[
          t(
            'Felexia Conseils peut vous aider à lire la liste de pièces, à rapprocher l’activité du marché et celle du certificat, et à préparer les questions à poser à la direction des impôts. Il peut aussi vous dire si le document demandé est bien celui-ci. Il ne se substitue pas à l’administration. Il ne dépose pas la demande à votre place sur un compte qui ne serait pas le vôtre, et il ne « fait sortir » une attestation. La délivrance reste un acte de la DGI.',
            'Felexia Conseils can help you read the list of documents, match the activity in the contract with that on the certificate, and prepare the questions to put to the tax directorate. It can also tell you whether the document requested is indeed this one. It does not take the place of the administration. It does not file the request for you on an account that would not be yours, and it does not “get a certificate issued”. Issuing it remains an act of the DGI.',
            'يمكن لـ Felexia Conseils أن يساعدكم على قراءة لائحة الوثائق، ومقاربة نشاط الصفقة بنشاط الشهادة، وتحضير الأسئلة التي تطرحونها على مديرية الضرائب. ويمكنه أيضاً أن يقول لكم هل الوثيقة المطلوبة هي هذه حقاً. وهو لا يحل محل الإدارة. ولا يودع الطلب نيابة عنكم في حساب لا يكون حسابكم، ولا «يُخرج» شهادة. والتسليم يبقى عملاً للمديرية العامة للضرائب.'
          ),
          t(
            'Le périmètre se fixe dans un devis, après lecture de votre situation. Aucun honoraire n’est indiqué sur cette page. La page [création d’entreprise](creation-entreprise) concerne la constitution de la société, pas la délivrance d’une attestation fiscale. Le [contact](contact) sert à demander un échange. Apportez la liste de pièces de l’organisme demandeur, sans déposer vos identifiants de téléservice dans le formulaire du site.',
            'The scope is set in a quote, after reading your situation. No fee is stated on this page. The [company formation](creation-entreprise) page is about incorporating the company, not about issuing a tax certificate. [Contact](contact) is for requesting a conversation. Bring the document list of the body that asks for it, without putting your online-service identifiers in the website form.',
            'يُحدد النطاق في عرض، بعد قراءة وضعيتكم. ولا يُذكر أي أتعاب في هذه الصفحة. وصفحة [تأسيس المقاولة](creation-entreprise) تخص تأسيس الشركة، لا تسليم شهادة جبائية. و[الاتصال](contact) لطلب حوار. أحضروا لائحة وثائق الهيئة الطالبة، دون وضع معرّفات الخدمة عن بعد في استمارة الموقع.'
          )
        ]
      }
    ],
    faqs:[
      {q:t('Qui délivre l’attestation ?', 'Who issues the certificate?', 'من يسلم الشهادة؟'), a:t('La Direction générale des impôts, par la voie qu’elle indique : l’espace SIMPL « vos attestations », ou le formulaire AAC270 pour une demande physique. Un cabinet privé ne la délivre pas.', 'The General Tax Directorate, by the path it indicates: the SIMPL “your certificates” area, or form AAC270 for a request at the counter. A private firm does not issue it.', 'المديرية العامة للضرائب، بالطريق التي تبينها: فضاء SIMPL «شهاداتكم»، أو المطبوع AAC270 للطلب الحضوري. والمكتب الخاص لا يسلمها.')},
      {q:t('Quelle est sa durée de validité ?', 'How long is it valid?', 'ما مدة صلاحيتها؟'), a:t('La page des attestations de la DGI, consultée pour ce guide, ne publie pas de durée propre au document. Pour un marché public, le décret n° 2-22-431 demande une attestation délivrée depuis moins d’un an, et retient la date de production au maître d’ouvrage pour en apprécier la validité. Ne transposez pas cette règle à un autre dossier sans lire ce que cet autre dossier exige.', 'The DGI certificates page, consulted for this guide, does not publish a period of its own for the document. For a public contract, Decree 2-22-431 asks for a certificate issued less than one year earlier, and takes the date it is produced to the project owner in order to assess validity. Do not carry that rule over to another file without reading what that other file requires.', 'صفحة شهادات المديرية، التي رُجع إليها لهذا الدليل، لا تنشر مدة خاصة بالوثيقة. ولصفقة عمومية، يطلب المرسوم رقم 2.22.431 شهادة مسلمة منذ أقل من سنة، ويعتمد تاريخ الإدلاء بها إلى صاحب المشروع لتقدير الصلاحية. ولا تنقلوا هذه القاعدة إلى ملف آخر دون قراءة ما يقتضيه ذلك الملف.')},
      {q:t('Faut-il être à jour des déclarations ?', 'Do the returns have to be up to date?', 'هل يجب أن تكون التصاريح في وضع قانوني؟'), a:t('Pour participer à un marché public, l’article 27 du décret relie la situation fiscale régulière au fait d’avoir souscrit les déclarations et payé les sommes exigibles, ou, à défaut, constitué des garanties jugées suffisantes. La DGI apprécie le dossier. Ce guide ne dit pas qu’une déclaration isolée suffit, ni le contraire, pour une personne donnée.', 'To take part in a public contract, article 27 of the decree links a regular tax situation to having filed the returns and paid the amounts due, or, failing that, to having put in place guarantees considered sufficient. The DGI assesses the file. This guide does not say that one isolated return is enough, or the opposite, for a given person.', 'للمشاركة في صفقة عمومية، تربط المادة 27 من المرسوم الوضعية الجبائية القانونية بالإدلاء بالتصاريح ودفع المبالغ المستحقة، أو، عند عدم ذلك، بتقديم ضمانات تُعد كافية. والمديرية تقدر الملف. ولا يقول هذا الدليل إن تصريحاً معزولاً يكفي، ولا العكس، لشخص معين.')},
      {q:t('Felexia Conseils peut-il obtenir le document à ma place ?', 'Can Felexia Conseils obtain the document for me?', 'هل يمكن لـ Felexia Conseils الحصول على الوثيقة نيابة عني؟'), a:t('Non. Le cabinet peut préparer l’échange et relire les pièces. La demande et la délivrance relèvent de la DGI, sur le compte de l’assujetti et selon ses règles. Aucun document officiel n’est vendu par le cabinet.', 'No. The firm can prepare the conversation and reread the documents. The request and the issue belong to the DGI, on the taxpayer’s account and under its rules. The firm sells no official document.', 'لا. يمكن للمكتب تحضير الحوار وإعادة قراءة الوثائق. والطلب والتسليم من اختصاص المديرية، في حساب الملزم ووفق قواعدها. والمكتب لا يبيع أي وثيقة رسمية.')}
    ],
    links:[
      link('guides/compte-courant-associe-maroc', 'Compte courant d’associé', 'Shareholder current account', 'الحساب الجاري للشريك'),
      link('guides/statut-non-resident-fiscal-maroc', 'Non-résident fiscal', 'Non-resident tax status', 'غير المقيم ضريبياً'),
      link('conseil-fiscal', 'Conseil fiscal', 'Tax advisory', 'الاستشارة الضريبية'),
      link('creation-entreprise', 'Création d’entreprise', 'Company formation', 'تأسيس المقاولة'),
      link('contact', 'Demander un échange', 'Request a conversation', 'طلب حوار')
    ],
    sources
  }
];
