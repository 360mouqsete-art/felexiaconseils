# Migration des Guides Felexia Conseils

**État : TERMINÉ** — contrôle du 2026-09-24T09:07:45.837Z.

Source crawlée : https://www.upsilon-consulting.com/blog/

## Comptage exhaustif

- SOURCE_TOTAL = 301
- IMPORTED_NEW = 294
- MERGED_EXISTING = 6
- MERGED_SOURCE_ALIAS = 1
- TOTAL_IMPORTED_SOURCES = 301
- TOTAL_SKIPPED = 0
- FAILED = 0
- MISSING = 0
- TOTAL_GUIDES = 313
- TOTAL_IMAGES = 313
- GUIDES_WITHOUT_IMAGE = 0
- DUPLICATED_IMAGES = 0
- BROKEN_IMAGES = 0
- PAGINATION_PRESENT = false
- EXISTING_GUIDES = 19
- NUMERIC_FACTS_LOST = 0

Réconciliation : 294 nouvelles destinations + 6 sources fusionnées avec l’existant + 1 alias source fusionné = 301 sources traitées sur 301.

## Preuves de découverte

Blog : 301 cartes ; recherche intégrée : 301 articles ; 19 archives de catégorie ; 420 pages françaises du sitemap vérifiées ; 424 pages inspectées au total.
Historique : 2019-12-05T13:18:05 à 2026-09-08T00:00:00.
Deuxième crawl : 2026-09-24T08:47:22.897Z, 301 sources. Ensemble identique : true.

## Particularités du site source

- https://www.upsilon-consulting.com/convention-fiscale-maroc-espagne-double-imposition/ : la carte du blog annonce « Convention fiscale Maroc-Espagne : guide pratique 2026 », mais l’URL sert actuellement « Convention fiscale Maroc Espagne — Double imposition | PDF | Upsilon Consulting ». Seul le contenu réellement accessible est repris, avec ses documents utiles ; aucun corps absent n’est inventé.
- https://www.upsilon-consulting.com/plan-comptable-maroc-pdf/ : la carte du blog annonce « Plan Comptable Marocain PDF — Téléchargement Gratuit PCGE 2026 », mais l’URL sert actuellement « Plan Comptable Marocain PDF 2026 : Téléchargement Gratuit PCGE ». Seul le contenu réellement accessible est repris, avec ses documents utiles ; aucun corps absent n’est inventé.
- https://www.upsilon-consulting.com/tenue-de-comptabilite/ : la carte du blog annonce « Tenue de comptabilité au Maroc », mais l’URL sert actuellement « Tenue de comptabilité à Casablanca | Upsilon Consulting ». Seul le contenu réellement accessible est repris, avec ses documents utiles ; aucun corps absent n’est inventé.

## Vérifications

Routes HTTP : 313 réussies, 0 échouées.
Contrôles bloquants : 0. Vérifications en attente : 0.

- lint : PASS — 46 fichiers JavaScript, aucune erreur de syntaxe.
- typecheck : PASS — Projet JavaScript sans TypeScript ; contrats des 300 contenus, 313 couvertures et 301 correspondances validés.
- test : PASS — 48 tests réussis, 0 échec.
- build : PASS — Build de production réussi, 463 pages statiques.
- check : PASS — 462 pages de langue, 39 913 liens/ressources internes et 3 877 occurrences d’images vérifiés.
- http : PASS — 462 routes, 33 anciennes URL, 441 URL du sitemap ; Brotli et gzip vérifiés.



Les contrôles automatisés vérifient les liens HTML de toutes les cartes, leur présence dans le sitemap, H1 unique, métadonnées, canonical, données structurées, liens internes, conservation des routes existantes, profondeur du contenu, fichiers images locaux, dimensions, ratio et unicité SHA256. La pertinence photographique reste une vérification visuelle humaine ou par inspection des images ; les sommes de contrôle ne démontrent pas à elles seules la qualité visuelle.

## Couvertures et présentation

Chaque couverture est une création distincte réalisée avec l’outil imagegen intégré, à partir du titre, du résumé et d’une scène liée au sujet. Les fichiers locaux sont dans public/images/guides/ : 1280 × 800 px et 640 × 400 px, WebP, ratio 16:10. La page conserve les cartes et la grille existantes, avec trois colonnes sur desktop, sans pagination. Tous les liens sont présents dans le HTML statique ; recherche et catégories ne font que filtrer ces cartes.
Revue visuelle des couvertures : 313 couvertures inspectées.
Contrôle complémentaire de similarité : 313 images, 0 paire suspecte selon SHA256 et hash perceptuel de 256 bits (seuil 12). Descriptions alt françaises rédigées à partir des scènes de chaque couverture.
Vérification navigateur : PASS — desktop, mobile, recherche, catégories et tableaux.

## Illustrations indisponibles dans la source

- https://www.upsilon-consulting.com/rapprochement-bancaire-au-maroc-erb/ → /fr/guides/rapprochement-bancaire-au-maroc-erb/ : Invalid image MIME text/html; charset=UTF-8: https://www.compta-facile.com/wp-content/uploads/2013/09/Exemple-d%C3%A9tat-de-rapprochement-bancaire.png
- https://www.upsilon-consulting.com/investir-au-maroc-cadre-juridique-et-fiscal/ → /fr/guides/investir-au-maroc-cadre-juridique-et-fiscal/ : Asset 429: https://media.istockphoto.com/photos/assorted-moroccan-tajines-in-a-souk-picture-id505164464?b=1&k=6&m=505164464&s=170667a&w=0&h=GbEy78sf1ZY2JJp98RJAghA7hO538F1PY4v8XKm2-bM=

Les fichiers indisponibles ne sont pas remplacés par des données inventées. Dans le guide sur le rapprochement bancaire, seul le renvoi vers l’ancien exemple en image est retiré ; l’explication comptable est conservée. L’autre illustration indisponible était décorative. Toutes les couvertures sont des créations nouvelles, indépendantes de ces illustrations.

## Dates et contenu éditorial

Les dates de publication récupérées sont conservées. Les textes fiscaux et juridiques gardent leur contexte historique : cette migration ne constitue pas une actualisation réglementaire générale de tous les articles.
Les 3 guides Felexia préexistants sans date documentée conservent la mention « Guide pratique » et sont placés en tête, avant le classement chronologique des guides datés : /fr/guides/investir-depuis-etranger/, /fr/guides/organiser-gestion-entreprise/, /fr/guides/preparer-creation-entreprise/. Aucune date de publication n’est inventée. Le dernier guide est le plus ancien dont la date est connue : /fr/guides/formes-juridiques-societes-maroc/ (2019-12-05).

Le texte factuel, les tableaux et les exemples sont conservés. Les suppressions de textes commerciaux, les adaptations de métadonnées et les attributions conservées sont traçables dans les journaux de migration. Les originaux restent dans les archives du crawl.

## Reproduction des contrôles

52 liens documentaires, outils et attributions encore hébergés chez Upsilon ont été vérifiés : 52 réponses HTTP 200. Les liens commerciaux disposant d’une destination Felexia ont été adaptés. Le lien d’une annexe a été réparé par normalisation Unicode de son nom de fichier.

`npm run lint` · `npm run typecheck` · `npm test` · `npm run build` · `npm run check` · `node scripts/check-http.mjs` · `node scripts/check-guides-migration.mjs --http`

Le projet est en JavaScript. Le contrôle nommé typecheck valide les contrats des données JSON et leurs types ; il ne prétend pas exécuter un compilateur TypeScript absent du projet.

## Liste exhaustive source → destination

| SOURCE URL | SOURCE TITLE | FELEXIA URL | STATUS | NOTE |
|---|---|---|---|---|
| https://www.upsilon-consulting.com/introduction-en-bourse-maroc-avantages-fiscaux/ | Introduction en bourse au Maroc : les avantages fiscaux (Art. 6-III du CGI) | /fr/guides/introduction-en-bourse-maroc-avantages-fiscaux/ | IMPORTED |  |
| https://www.upsilon-consulting.com/convention-fiscale-maroc-eau/ | Convention fiscale Maroc-EAU : avantages fiscaux et régime de change | /fr/guides/convention-fiscale-maroc-eau/ | IMPORTED |  |
| https://www.upsilon-consulting.com/plus-values-internationales/ | Plus-values internationales au Maroc : cession par non-résident et conventions | /fr/guides/plus-values-internationales/ | IMPORTED |  |
| https://www.upsilon-consulting.com/convention-fiscale-maroc-espagne-double-imposition/ | Convention fiscale Maroc-Espagne : guide pratique 2026 | /fr/guides/convention-fiscale-maroc-espagne-double-imposition/ | IMPORTED | URL listed as a blog article, but current source serves a resource/service page. All currently accessible editorial content is captured; the original longer article body is not served by this URL. |
| https://www.upsilon-consulting.com/igoc-statuts-change/ | Statuts de change au Maroc : résident, non-résident, MRE et étranger (IGOC 2026) | /fr/guides/igoc-statuts-change/ | IMPORTED |  |
| https://www.upsilon-consulting.com/igoc-transfert-dividendes/ | Transfert des dividendes et rapatriement des revenus d'investissement (IGOC 2026) | /fr/guides/igoc-transfert-dividendes/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fiscalite-interets-international/ | Fiscalité internationale des intérêts au Maroc : retenue à la source et conventions | /fr/guides/fiscalite-interets-international/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fiscalite-redevances-international/ | Redevances au Maroc : qualification OCDE, Art. 15 CGI et conventions fiscales | /fr/guides/fiscalite-redevances-international/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fiscalite-salaires-expatries/ | Fiscalité des salaires expatriés au Maroc : résidence, conventions et obligations | /fr/guides/fiscalite-salaires-expatries/ | IMPORTED |  |
| https://www.upsilon-consulting.com/calendrier-fiscal-maroc-2026/ | Calendrier fiscal Maroc 2026 : toutes les échéances IS, IR, TVA | /fr/guides/calendrier-fiscal-maroc-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cloture-comptable-annuelle-maroc/ | Clôture comptable annuelle au Maroc : checklist et bonnes pratiques | /fr/guides/cloture-comptable-annuelle-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comptabilite-immobilisations-maroc/ | Comptabilité des immobilisations au Maroc : acquisition, évaluation et cession | /fr/guides/comptabilite-immobilisations-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/consolidation-comptes-maroc/ | Consolidation des comptes au Maroc : obligations et méthodes | /fr/guides/consolidation-comptes-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/droits-enregistrement-maroc-2026/ | Droits d'enregistrement au Maroc 2026 : tarifs et exonérations | /fr/guides/droits-enregistrement-maroc-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/ecritures-regularisation-fin-exercice-maroc/ | Écritures de régularisation en fin d'exercice au Maroc | /fr/guides/ecritures-regularisation-fin-exercice-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/choisir-expert-comptable-maroc/ | Choisir son expert-comptable au Maroc : critères et questions clés | /fr/guides/choisir-expert-comptable-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/reformes-fiscales-maroc-2020-2026-chronologie/ | Chronologie des réformes fiscales 2020-2026 : de la NC 730 à la NC 737 | /fr/guides/reformes-fiscales-maroc-2020-2026-chronologie/ | IMPORTED |  |
| https://www.upsilon-consulting.com/ifrs-vs-cgnc-maroc/ | IFRS vs CGNC : différences clés pour les entreprises marocaines | /fr/guides/ifrs-vs-cgnc-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/commissariat-apports-fusion-maroc/ | Commissariat aux apports et à la fusion : missions spéciales | /fr/guides/commissariat-apports-fusion-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/erreurs-comptables-reserves-cac/ | 5 erreurs comptables qui déclenchent des réserves du CAC | /fr/guides/erreurs-comptables-reserves-cac/ | IMPORTED |  |
| https://www.upsilon-consulting.com/financements-exterieurs-change-maroc/ | Financements extérieurs au Maroc : emprunts, prêts et crédits commerciaux | /fr/guides/financements-exterieurs-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/investissements-marocains-etranger-change-maroc/ | Investissements marocains à l'étranger : conditions, plafonds et start-ups 2026 | /fr/guides/investissements-marocains-etranger-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/rapport-cac-reserves-consequences/ | Rapport du CAC avec réserves : conséquences pour la société | /fr/guides/rapport-cac-reserves-consequences/ | IMPORTED |  |
| https://www.upsilon-consulting.com/investissements-etrangers-change-maroc/ | Investissements étrangers au Maroc : régime de change et garantie de transfert | /fr/guides/investissements-etrangers-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/transferts-courants-change-maroc/ | Transferts courants à l'étranger : revenus du travail, investissements et opérations diverses | /fr/guides/transferts-courants-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/commerce-electronique-change-maroc/ | Commerce électronique international au Maroc : dotations et régime de change 2026 | /fr/guides/commerce-electronique-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/export-biens-services-change-maroc/ | Exportation de biens et services au Maroc : rapatriement et comptes en devises | /fr/guides/export-biens-services-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/importation-de-biens-change-maroc/ | Importation de biens au Maroc : obligations de change et domiciliation | /fr/guides/importation-de-biens-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/voyages-etranger-dotations-change-maroc/ | Voyages à l'étranger : dotations, plafonds et obligations de change 2026 | /fr/guides/voyages-etranger-dotations-change-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/creation-societe-maroc-non-resident/ | Créer une société au Maroc en tant que non-résident (français ou étranger) : guide 2026 | /fr/guides/mre-etranger/ | MERGED_EXISTING |  |
| https://www.upsilon-consulting.com/reglementation-changes-maroc/ | Réglementation des changes au Maroc 2026 : principes et IGOC | /fr/guides/reglementation-changes-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/difficultes-entreprise-sauvegarde-redressement-maroc/ | Difficultés de l'entreprise au Maroc : sauvegarde, redressement et liquidation (Loi 73-17) | /fr/guides/difficultes-entreprise-sauvegarde-redressement-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/pacte-associes-maroc/ | Pacte d'associés au Maroc : clauses essentielles et rédaction | /fr/guides/pacte-associes-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fiscalite-dividendes-international/ | Fiscalité internationale des dividendes au Maroc : CGI, conventions et IGOC | /fr/guides/fiscalite-dividendes-international/ | IMPORTED |  |
| https://www.upsilon-consulting.com/reduction-capital-maroc/ | Réduction de capital au Maroc : modalités, procédure et protection des créanciers | /fr/guides/reduction-capital-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-promoteurs-immobiliers-lotisseurs-maroc/ | TVA promoteurs immobiliers et lotisseurs au Maroc : guide complet | /fr/guides/tva-promoteurs-immobiliers-lotisseurs-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/assemblee-generale-sarl-maroc/ | Assemblée générale SARL au Maroc : convocation, quorum et PV | /fr/guides/assemblee-generale-sarl-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/bail-commercial-maroc/ | Bail commercial au Maroc : renouvellement, loyer et indemnité d'éviction | /fr/guides/bail-commercial-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/sasu-maroc/ | SASU au Maroc : création, avantages et différences avec la SARLAU | /fr/guides/sasu-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/amortissements-comptables-maroc/ | Amortissements comptables au Maroc : méthodes, durées et écritures CGNC | /fr/guides/amortissements-comptables-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/revenus-capitaux-mobiliers-maroc/ | Revenus de capitaux mobiliers au Maroc : dividendes, intérêts et RAS | /fr/guides/revenus-capitaux-mobiliers-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/profit-cession-valeurs-mobilieres-maroc/ | Profit de cession de valeurs mobilières au Maroc : IR et obligations | /fr/guides/profit-cession-valeurs-mobilieres-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cheque-maroc/ | Chèque au Maroc : émission, provision et sanctions pénales | /fr/guides/cheque-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/effets-commerce-maroc/ | Effets de commerce au Maroc : lettre de change et billet à ordre | /fr/guides/effets-commerce-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/gerance-libre-location-gerance-maroc/ | Gérance libre au Maroc : location-gérance du fonds de commerce | /fr/guides/gerance-libre-location-gerance-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/professions-liberales-ir-is-maroc/ | Professions libérales au Maroc : IR vs IS, comment choisir | /fr/guides/professions-liberales-ir-is-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/credit-impot-double-imposition/ | Crédit d'impôt et élimination de la double imposition au Maroc | /fr/guides/credit-impot-double-imposition/ | IMPORTED |  |
| https://www.upsilon-consulting.com/nantissement-fonds-commerce-maroc/ | Nantissement du fonds de commerce au Maroc : procédure, effets et réalisation | /fr/guides/nantissement-fonds-commerce-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/obligations-declaratives-tva-maroc/ | Obligations déclaratives TVA au Maroc : déclaration, paiement et délais | /fr/guides/obligations-declaratives-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fonds-commerce-maroc/ | Fonds de commerce au Maroc : éléments, évaluation et cession | /fr/guides/fonds-commerce-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/registre-commerce-maroc/ | Registre de commerce au Maroc : inscription, modifications et radiation | /fr/guides/registre-de-commerce-maroc/ | MERGED_EXISTING |  |
| https://www.upsilon-consulting.com/statut-commercant-maroc/ | Statut du commerçant au Maroc : définition, obligations et capacité commerciale | /fr/guides/statut-commercant-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-finance-participative-maroc/ | TVA et Finance Participative (Islamique) au Maroc : Neutralité Fiscale et Taux Applicables | /fr/guides/tva-finance-participative-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-export-services-maroc/ | TVA et export de services au Maroc : Exonération, facturation et remboursement | /fr/guides/tva-export-services-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comptes-devises-maroc/ | Comptes en devises au Maroc : ouverture, fonctionnement et obligations 2026 | /fr/guides/comptes-devises-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/assemblee-generale-ordinaire-annuelle-sa/ | Assemblée générale ordinaire annuelle : guide complet pour la validation des comptes | /fr/guides/assemblee-generale-ordinaire-annuelle-sa/ | IMPORTED |  |
| https://www.upsilon-consulting.com/revenus-fonciers-ir-maroc/ | Revenus fonciers au Maroc : IR locatif, taux et abattements 2026 | /fr/guides/revenus-fonciers-ir-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/profit-foncier-cession-immobiliere-maroc/ | IR sur profit foncier au Maroc : cession immobilière et exonérations | /fr/guides/profit-foncier-cession-immobiliere-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/ir-professionnel-maroc/ | IR professionnel au Maroc : RNR, RNS et contribution professionnelle unique | /fr/guides/ir-professionnel-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/regime-fiscal-startups-pme-maroc/ | Régime fiscal des startups et PME innovantes au Maroc | /fr/guides/regime-fiscal-startups-pme-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-agriculture-maroc/ | TVA et Agriculture au Maroc : Hors Champ, Exonérations et Taux Applicables | /fr/guides/tva-agriculture-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/etats-synthese-maroc/ | États de synthèse au Maroc : bilan, CPC, ESG, tableau de financement et ETIC | /fr/guides/etats-synthese-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/declaration-is-maroc/ | Déclaration IS au Maroc : SIMPL, liasse fiscale et délais | /fr/guides/declaration-is-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/plus-values-cession-is-maroc/ | Plus-values de cession IS : régime fiscal et abattements | /fr/guides/plus-values-cession-is-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/is-societes-etrangeres-maroc/ | IS des sociétés étrangères au Maroc : établissement stable et retenue à la source | /fr/guides/is-societes-etrangeres-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/deductions-tva-maroc/ | Déductions TVA au Maroc : règles, exclusions et régularisations | /fr/guides/deductions-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/sanctions-penalites-tva-maroc/ | Sanctions et penalites TVA au Maroc : Majorations, amendes et prescription | /fr/guides/sanctions-penalites-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/autoliquidation-tva-maroc/ | Autoliquidation TVA au Maroc : mécanisme et obligations 2026 | /fr/guides/autoliquidation-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/retenue-source-tva-maroc/ | Retenue à la source TVA au Maroc : Mécanisme et obligations 2026 | /fr/guides/retenue-source-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-auto-entrepreneur-maroc/ | TVA et auto-entrepreneur au Maroc : Hors champ, seuils et obligations | /fr/guides/tva-auto-entrepreneur-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/provisions-deductibles-is-maroc/ | Provisions déductibles IS : conditions et risques de réintégration | /fr/guides/provisions-deductibles-is-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/base-imposable-tva-maroc/ | Base imposable de la TVA au Maroc : Comment la calculer (Art. 96 du CGI) | /fr/guides/base-imposable-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comparatif-logiciels-paie-maroc/ | Comparatif logiciels de paie au Maroc 2026 : fonctionnalités et prix | /fr/guides/comparatif-logiciels-paie-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/charges-non-deductibles-is-maroc/ | Charges non déductibles IS au Maroc : les 10 erreurs fréquentes | /fr/guides/charges-non-deductibles-is-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/regime-suspensif-tva-maroc/ | Le régime suspensif de TVA au Maroc : Conditions, Formalités et Sanctions (Article 94) | /fr/guides/regime-suspensif-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/stock-options-actions-gratuites-maroc/ | Stock-options et actions gratuites au Maroc : régime fiscal IR | /fr/guides/stock-options-actions-gratuites-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/amortissements-fiscaux-maroc/ | Amortissements fiscaux au Maroc : taux, durées et règles IS | /fr/guides/amortissements-fiscaux-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/option-assujettissement-tva-article-90/ | Option pour l'assujettissement à la TVA au Maroc (Article 90) | /fr/guides/option-assujettissement-tva-article-90/ | IMPORTED |  |
| https://www.upsilon-consulting.com/ir-indemnite-depart-maroc/ | IR sur indemnité de départ au Maroc : retraite, licenciement et démission | /fr/guides/ir-indemnite-depart-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/representants-personnel-maroc/ | Représentants du personnel au Maroc : élection, rôle et protection | /fr/guides/representants-personnel-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/conventions-collectives-maroc/ | Conventions collectives au Maroc : secteurs, contenu et application | /fr/guides/conventions-collectives-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/auto-entrepreneur-ir-regime-fiscal-maroc/ | Auto-entrepreneur et IR au Maroc : régime fiscal simplifié 2026 | /fr/guides/auto-entrepreneur-ir-regime-fiscal-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-services-numeriques-maroc/ | TVA sur les services numériques au Maroc : Taux, Auto-liquidation et Retenue à la source | /fr/guides/tva-services-numeriques-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/ir-mre-maroc/ | IR des MRE au Maroc : obligations, exonérations et conventions fiscales | /fr/guides/ir-mre-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/audit-paie-checklist-cnss/ | Audit de paie au Maroc : checklist complète et contrôle CNSS | /fr/guides/audit-paie-checklist-cnss/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-produits-pharmaceutiques-maroc/ | TVA sur les produits pharmaceutiques au Maroc : exonération totale depuis 2024 | /fr/guides/tva-produits-pharmaceutiques-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fait-generateur-exigibilite-tva-maroc/ | Fait générateur et exigibilité de la TVA au Maroc | /fr/guides/fait-generateur-exigibilite-tva-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/reglement-interieur-entreprise-maroc/ | Règlement intérieur de l'entreprise au Maroc : contenu et obligations | /fr/guides/reglement-interieur-entreprise-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/deductions-ir-maroc/ | Déductions IR au Maroc : intérêts logement, assurance retraite et dons | /fr/guides/deductions-ir-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/embaucher-premier-salarie-maroc/ | Embaucher son premier salarié au Maroc : guide complet 2026 | /fr/guides/embaucher-premier-salarie-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/declaration-annuelle-ir-maroc/ | Déclaration annuelle IR au Maroc : qui, quand, comment | /fr/guides/declaration-annuelle-ir-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/indemnites-exonerees-ir-maroc/ | Indemnités exonérées d'IR au Maroc : liste complète 2026 | /fr/guides/indemnites-exonerees-ir-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/exonerations-tva-avec-droit-deduction-article-92/ | Exonérations TVA avec droit à déduction (Article 92) : Guide complet 2026 | /fr/guides/exonerations-tva-avec-droit-deduction-article-92/ | IMPORTED |  |
| https://www.upsilon-consulting.com/exonerations-is-maroc/ | Exonérations d'IS au Maroc 2026 : quelles sociétés sont vraiment exonérées ? | /fr/guides/exonerations-is-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/charges-sociales-patronales-maroc/ | Charges sociales patronales au Maroc 2026 : coût total employeur | /fr/guides/charges-sociales-patronales-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/sanctions-penalites-cnss-maroc/ | Sanctions et pénalités CNSS au Maroc 2026 : majorations et amendes | /fr/guides/sanctions-penalites-cnss-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/operateur-categorise-office-changes-maroc/ | Opérateur catégorisé au Maroc : statut, avantages et conditions (IGOC 2026) | /fr/guides/operateur-categorise-office-changes-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/taxe-habitation-maroc/ | Taxe d'habitation au Maroc 2026 : barème, exonérations et paiement en ligne | /fr/guides/taxe-habitation-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/loi-09-08-entreprises-etrangeres-maroc/ | Loi 09-08 et entreprises étrangères au Maroc : obligations CNDP | /fr/guides/loi-09-08-entreprises-etrangeres-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/devenir-expert-comptable-maroc/ | Devenir expert-comptable au Maroc : parcours, formation et missions | /fr/guides/devenir-expert-comptable-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/controleur-gestion-maroc/ | Contrôleur de gestion au Maroc : rôle, outils et évolution | /fr/guides/controleur-gestion-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/sanctions-cndp-risques-penaux-amendes/ | Sanctions CNDP : risques pénaux et amendes pour non-conformité | /fr/guides/sanctions-cndp-risques-penaux-amendes/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cotisations-cnss-2026-taux-assiettes/ | Cotisations CNSS 2026 : taux employeur/salarié et assiettes | /fr/guides/cotisations-cnss-2026-taux-assiettes/ | IMPORTED |  |
| https://www.upsilon-consulting.com/juriste-affaires-maroc/ | Juriste d'affaires au Maroc : missions en cabinet d'expertise comptable | /fr/guides/juriste-affaires-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/consultant-fiscal-junior-maroc/ | Consultant fiscal junior au Maroc : rôle et compétences | /fr/guides/consultant-fiscal-junior-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/conges-annuels-maroc/ | Congés annuels au Maroc : durée, calcul et indemnité compensatrice | /fr/guides/conges-annuels-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/preavis-rupture-contrat-maroc/ | Préavis de rupture du contrat de travail au Maroc | /fr/guides/preavis-rupture-contrat-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/dotations-office-des-changes-maroc-2026/ | Dotations de l'Office des Changes au Maroc 2026 : guide complet des plafonds et usages | /fr/guides/dotations-office-des-changes-maroc-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/formule-2-office-des-changes-maroc/ | Formule 2 (F2) de l'Office des Changes au Maroc : définition, rôle et obtention | /fr/guides/formule-2-office-des-changes-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/auditeur-junior-maroc/ | Auditeur junior au Maroc : missions en cabinet et parcours | /fr/guides/auditeur-junior-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/conge-maternite-maroc/ | Congé de maternité au Maroc : durée, indemnités CNSS et protection | /fr/guides/conge-maternite-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/declaration-cnss-maroc/ | Déclaration CNSS : procédure, télédéclaration et sanctions | /fr/guides/declaration-cnss-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comptable-junior-maroc/ | Comptable junior au Maroc : missions, compétences et évolution | /fr/guides/comptable-junior-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/ir-salarial-bareme-2026-maroc/ | IR salarial au Maroc : barème 2026, calcul et exonérations | /fr/guides/ir-salarial-bareme-2026-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/bulletin-paie-maroc-mentions-obligatoires/ | Bulletin de paie au Maroc : 17 mentions obligatoires et modèle conforme | /fr/guides/bulletin-paie-maroc-mentions-obligatoires/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-maroc-arbre-decision-cas-pratiques/ | TVA Maroc : Arbre de Décision en 5 Étapes et Cas Pratiques | /fr/guides/tva-maroc-arbre-decision-cas-pratiques/ | IMPORTED |  |
| https://www.upsilon-consulting.com/guide-damancom-cnss-maroc/ | Guide Damancom 2026 : télédéclaration CNSS étape par étape | /fr/guides/guide-damancom-cnss-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/transfert-international-donnees-personnelles-maroc/ | Transfert international de données personnelles au Maroc : cadre juridique et obligations | /fr/guides/transfert-international-donnees-personnelles-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/exonerations-tva-sans-droit-deduction-article-91/ | Exonérations TVA sans droit à déduction (Article 91) : Liste complète 2026 | /fr/guides/exonerations-tva-sans-droit-deduction-article-91/ | IMPORTED |  |
| https://www.upsilon-consulting.com/licenciement-au-maroc/ | Licenciement au Maroc : procédure légale et indemnités 2026 | /fr/guides/indemnite-de-licenciement-au-maroc/ | MERGED_SOURCE_ALIAS | Source URL redirects to another article; preserve source mapping without duplicate destination. |
| https://www.upsilon-consulting.com/declarations-autorisations-cndp-guide-pratique/ | Déclarations et autorisations CNDP : guide pratique pour les entreprises | /fr/guides/declarations-autorisations-cndp-guide-pratique/ | IMPORTED |  |
| https://www.upsilon-consulting.com/heures-supplementaires-maroc/ | Heures supplémentaires au Maroc : calcul, majoration et limites | /fr/guides/heures-supplementaires-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/periode-essai-maroc/ | Période d'essai au Maroc : durée, renouvellement et rupture | /fr/guides/periode-essai-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/contrat-de-travail-au-maroc/ | Contrat de travail au Maroc : CDD, CDI et obligations légales | /fr/guides/contrat-de-travail-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/reforme-tva-maroc-2024-2026/ | Réforme TVA Maroc 2024-2026 : Calendrier, Nouveaux Taux et Impacts | /fr/guides/reforme-tva-maroc-2024-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cndp-loi-09-08-protection-donnees-personnelles-maroc/ | CNDP et Loi 09-08 : guide complet de la protection des données personnelles au Maroc | /fr/guides/cndp-loi-09-08-protection-donnees-personnelles-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/plan-comptable-maroc-pdf/ | Plan Comptable Marocain PDF — Téléchargement Gratuit PCGE 2026 | /fr/guides/plan-comptable-maroc-pdf/ | IMPORTED | URL listed as a blog article, but current source serves a resource/service page. All currently accessible editorial content is captured; the original longer article body is not served by this URL. |
| https://www.upsilon-consulting.com/resultat-comptable-resultat-fiscal-is-maroc/ | IS au Maroc : passage du résultat comptable au résultat fiscal | /fr/guides/resultat-comptable-resultat-fiscal-is-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/calcul-de-limpot-sur-les-societes/ | Calcul de l'impôt sur les sociétés au Maroc — Guide complet 2026 | /fr/guides/calcul-de-limpot-sur-les-societes/ | IMPORTED |  |
| https://www.upsilon-consulting.com/creer-une-societe-au-maroc/ | Créer une société au Maroc en 2026 : guide complet par un expert-comptable | /fr/guides/creation-entreprise/ | MERGED_EXISTING |  |
| https://www.upsilon-consulting.com/retenue-a-la-source-maroc-services-2026/ | Retenue à la source au Maroc : services 2026 | /fr/guides/retenue-a-la-source-maroc-services-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/auto-entrepreneur-vers-sarl/ | Passer d'auto-entrepreneur à SARL : quand, comment et combien | /fr/guides/auto-entrepreneur-vers-sarl/ | IMPORTED |  |
| https://www.upsilon-consulting.com/charte-investissement-maroc-2023/ | Charte de l'investissement 2023 (Loi 03-22) : primes, conditions et procédures | /fr/guides/charte-investissement-maroc-2023/ | IMPORTED |  |
| https://www.upsilon-consulting.com/controle-fiscal-maroc-checklist-preparation/ | Contrôle fiscal au Maroc : checklist de préparation et droits du contribuable | /fr/guides/controle-fiscal-maroc-checklist-preparation/ | IMPORTED |  |
| https://www.upsilon-consulting.com/conventions-fiscales-maroc-afrique/ | Conventions fiscales Maroc-Afrique : guide pays par pays | /fr/guides/conventions-fiscales-maroc-afrique/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cotisations-cnss-maroc-2026/ | Cotisations CNSS 2026 au Maroc : tableau complet employeur et salarié | /fr/guides/cotisations-cnss-maroc-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cout-creation-sarl-maroc-2026/ | Coût réel de création d'une SARL au Maroc en 2026 : tous les frais | /fr/guides/cout-creation-sarl-maroc-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/holding-maroc-fiscalite-complete/ | Holding au Maroc : fiscalité pure vs mixte, substance et dividendes intragroupe | /fr/guides/holding-maroc-fiscalite-complete/ | IMPORTED |  |
| https://www.upsilon-consulting.com/mre-impots-double-imposition/ | MRE et impôts : guide complet pour éviter la double imposition | /fr/guides/mre-impots-double-imposition/ | IMPORTED |  |
| https://www.upsilon-consulting.com/teletravail-au-maroc/ | Télétravail au Maroc : cadre juridique, obligations et modèle de charte | /fr/guides/teletravail-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/calcul-impot-societes-bareme-progressif/ | Calcul de l'impôt sur les sociétés - Barème progressif | /fr/guides/calcul-impot-societes-bareme-progressif/ | IMPORTED |  |
| https://www.upsilon-consulting.com/contribution-sociale-de-solidarite-2021/ | Contribution sociale de solidarité 2026 | /fr/guides/contribution-sociale-de-solidarite-2021/ | IMPORTED |  |
| https://www.upsilon-consulting.com/conventions-fiscales-maroc/ | Conventions fiscales du Maroc : comprendre les accords de non double imposition | /fr/guides/conventions-fiscales-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/delais-de-paiement-au-maroc/ | Délais de paiement au Maroc : ce qu'il faut savoir | /fr/guides/delais-de-paiement-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fiscaliste-dentreprise/ | Fiscaliste d'entreprise - Comment choisir son consultant ? | /fr/guides/fiscaliste-dentreprise/ | IMPORTED |  |
| https://www.upsilon-consulting.com/jours-feries-au-maroc-les-dates/ | Jours fériés au Maroc : les dates en 2026 | /fr/guides/jours-feries-au-maroc-les-dates/ | IMPORTED |  |
| https://www.upsilon-consulting.com/linventaire-physique-des-immobilisations/ | Inventaire Physique des Immobilisations au Maroc : Guide Complet | /fr/guides/linventaire-physique-des-immobilisations/ | IMPORTED |  |
| https://www.upsilon-consulting.com/quelle-fiscalite-des-hotels/ | Fiscalité des hôtels au Maroc | /fr/guides/quelle-fiscalite-des-hotels/ | IMPORTED |  |
| https://www.upsilon-consulting.com/retenue-a-la-source-sur-prestation-de-service-etrangers-au-maroc/ | Retenue à la source sur prestation de service étrangers au Maroc | /fr/guides/retenue-a-la-source-sur-prestation-de-service-etrangers-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/audit-contractuel/ | audit contractuel : 1 guide complet | /fr/guides/audit-contractuel/ | IMPORTED |  |
| https://www.upsilon-consulting.com/franchise-au-maroc/ | Franchise au Maroc : Guide complet pour créer et gérer une franchise | /fr/guides/franchise-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/facturation-electronique-maroc-2026/ | Facturation électronique au Maroc : guide complet 2026 | /fr/guides/facturation-electronique-maroc/ | MERGED_EXISTING |  |
| https://www.upsilon-consulting.com/loi-de-finances-2026-au-maroc/ | Loi de Finances 2026 au Maroc : les mesures fiscales clés | /fr/guides/loi-de-finances-2026-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cotisation-minimale-is-2026/ | Cotisation minimale IS 2026 : calcul, taux et exonérations | /fr/guides/cotisation-minimale-is-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cgnc-code-general-de-normalisation-comptable/ | CGNC : Code général de normalisation comptable | /fr/guides/cgnc-code-general-de-normalisation-comptable/ | IMPORTED |  |
| https://www.upsilon-consulting.com/conventions-interdites/ | Conventions interdites : Article 62 de la SA au Maroc | /fr/guides/conventions-interdites/ | IMPORTED |  |
| https://www.upsilon-consulting.com/loi-de-finances-2025-au-maroc/ | Loi de Finances 2025 au Maroc : les mesures fiscales clés | /fr/guides/loi-de-finances-2025-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/holding-au-maroc/ | Holding au Maroc : 5 raisons pour en créer | /fr/guides/holding-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/investissement-au-maroc/ | Investissement au Maroc : 1 guide pour débutant | /fr/guides/investissement-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/reporting-financier-au-maroc/ | Le reporting financier au Maroc : 1 guide pratique | /fr/guides/reporting-financier-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/creation-entreprise-maroc/ | Création d'une Entreprise au Maroc : 17 Erreurs Cruciales à Éviter pour les Entrepreneurs et les PME | /fr/guides/creation-entreprise-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/manuel-de-procedures-comptables/ | Manuel de procédures comptables | /fr/guides/manuel-de-procedures-comptables/ | IMPORTED |  |
| https://www.upsilon-consulting.com/modele-j-au-maroc/ | Modèle J au Maroc : 1 Guide Complet pour les Investisseurs | /fr/guides/modele-j-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/loi-de-finance-2024/ | Loi de finance 2024 au Maroc - Principales mesures fiscales | /fr/guides/loi-de-finance-2024/ | IMPORTED |  |
| https://www.upsilon-consulting.com/nearshoring-strategies-externalisation/ | Nearshoring : Décryptage des stratégies d'externalisation | /fr/guides/nearshoring-strategies-externalisation/ | IMPORTED |  |
| https://www.upsilon-consulting.com/elaborer-1-budget-au-maroc/ | Elaborer un budget au Maroc : 3 étapes cruciales | /fr/guides/elaborer-1-budget-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/creation-societe-temara/ | Création de société à Témara : Formalités essentielles | /fr/guides/creation-societe-temara/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fusion-et-acquisition-maroc/ | Fusion et acquisition au Maroc : 1 guide pratique | /fr/guides/fusion-et-acquisition-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/examen-de-situation-densemble-du-contribuable/ | Examen de situation d'ensemble du contribuable | /fr/guides/examen-de-situation-densemble-du-contribuable/ | IMPORTED |  |
| https://www.upsilon-consulting.com/avoirs-etrangers-comprendre-les-dispositions-de-ligoc/ | Avoirs Étrangers et IGOC 2026 au Maroc | /fr/guides/avoirs-etrangers-comprendre-les-dispositions-de-ligoc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/dotations-dexploitation/ | Dotations d'exploitation déductibles au Maroc | /fr/guides/dotations-dexploitation/ | IMPORTED |  |
| https://www.upsilon-consulting.com/calcul-de-lis/ | Calcul de l'impôt sur les sociétés | /fr/guides/calcul-de-lis/ | IMPORTED |  |
| https://www.upsilon-consulting.com/livre-journal-maroc/ | Livre-journal : 1 outil indispensable en comptabilité | /fr/guides/livre-journal-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/grand-livre/ | Grand-livre comptable : Ce qu'il faut savoir | /fr/guides/grand-livre/ | IMPORTED |  |
| https://www.upsilon-consulting.com/regles-comptables-en-vigueur-au-maroc/ | Règles comptables en vigueur au Maroc : 1 guide complet | /fr/guides/regles-comptables-en-vigueur-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/convention-fiscale-maroc-france/ | Convention fiscale Maroc-France | /fr/guides/convention-fiscale-maroc-france/ | IMPORTED |  |
| https://www.upsilon-consulting.com/directeur-financier/ | Directeur financier au Maroc : Quel rôle dans l'entreprise ? | /fr/guides/directeur-financier/ | IMPORTED |  |
| https://www.upsilon-consulting.com/licenciement-disciplinaire-au-maroc/ | Licenciement Disciplinaire au Maroc : 1 Guide Complet | /fr/guides/licenciement-disciplinaire-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/societe-par-actions-simplifiee-s-a-s/ | Société par actions simplifiée (S.A.S) : 4 questions et réponses | /fr/guides/societe-par-actions-simplifiee-s-a-s/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tahfiz/ | TAHFIZ : Incitation au recrutement au Maroc | /fr/guides/tahfiz/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comment-determiner-valeur-entreprise/ | Valeur d'une entreprise : Comment la déterminer ? | /fr/guides/comment-determiner-valeur-entreprise/ | IMPORTED |  |
| https://www.upsilon-consulting.com/taux-de-retenue-a-la-source-sur-dividendes/ | Retenue à la source sur dividendes | /fr/guides/taux-de-retenue-a-la-source-sur-dividendes/ | IMPORTED |  |
| https://www.upsilon-consulting.com/plf-2023/ | PLF 2023 : Nouveaux taux d'IS | /fr/guides/plf-2023/ | IMPORTED |  |
| https://www.upsilon-consulting.com/controle-fiscal-au-maroc-ce-quil-faut-savoir/ | Contrôle fiscal au Maroc : Ce qu'il faut savoir | /fr/guides/controle-fiscal-au-maroc-ce-quil-faut-savoir/ | IMPORTED |  |
| https://www.upsilon-consulting.com/offshoring-de-services-au-maroc/ | Offshoring de services au Maroc 2026 : externalisation, ZAI, CFC et fiscalité | /fr/guides/offshoring-de-services-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/smig-smag-salaire-minimum-au-maroc/ | SMIG SMAG : 3 questions sur le salaire minimum au Maroc | /fr/guides/smig-smag-salaire-minimum-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/commissariat-aux-comptes-au-maroc/ | Commissariat aux comptes au Maroc : 1 guide complet | /fr/guides/commissariat-aux-comptes-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/information-comptable-au-maroc/ | Information comptable au Maroc : 1 guide pratique | /fr/guides/information-comptable-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/operations-en-monnaies-etrangeres/ | Opérations en monnaies étrangères - 1 guide pratique | /fr/guides/operations-en-monnaies-etrangeres/ | IMPORTED |  |
| https://www.upsilon-consulting.com/7-principes-comptables-au-maroc/ | 7 principes comptables au Maroc | /fr/guides/7-principes-comptables-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comptabilite-quest-ce-que-cest/ | Comptabilité : Qu'est ce que c'est ? | /fr/guides/comptabilite-quest-ce-que-cest/ | IMPORTED |  |
| https://www.upsilon-consulting.com/audit-financier/ | Audit financier : 1 guide du déroulement de la mission | /fr/guides/audit-financier/ | IMPORTED |  |
| https://www.upsilon-consulting.com/declaration-9421/ | Déclaration 9421 des traitements et salaires | /fr/guides/declaration-9421/ | IMPORTED |  |
| https://www.upsilon-consulting.com/creer-une-societe-a-mohammedia/ | Créer une société à Mohammedia | /fr/guides/creer-une-societe-a-mohammedia/ | IMPORTED |  |
| https://www.upsilon-consulting.com/creer-une-societe-a-rabat/ | Créer une société à Rabat : 1 guide complet | /fr/guides/creation-entreprise-rabat/ | MERGED_EXISTING |  |
| https://www.upsilon-consulting.com/creer-une-societe-a-tanger/ | Créer une société à Tanger : 1 Guide pratique | /fr/guides/creer-une-societe-a-tanger/ | IMPORTED |  |
| https://www.upsilon-consulting.com/creer-une-societe-a-marrakech/ | Créer une société à Marrakech : 1 Guide complet | /fr/guides/creer-une-societe-a-marrakech/ | IMPORTED |  |
| https://www.upsilon-consulting.com/audit-social/ | Audit social | /fr/guides/audit-social/ | IMPORTED |  |
| https://www.upsilon-consulting.com/rapprochement-bancaire-au-maroc-erb/ | Rapprochement bancaire au Maroc (ERB) : 1 Guide pratique | /fr/guides/rapprochement-bancaire-au-maroc-erb/ | IMPORTED |  |
| https://www.upsilon-consulting.com/audit-de-fraude-au-maroc/ | Audit de fraude au Maroc : 3 éléments clés | /fr/guides/audit-de-fraude-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/automatisation-vba/ | Automatisation VBA (Visual Basic Applications) : 1 ami du financier | /fr/guides/automatisation-vba/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-sur-les-prestations-de-service/ | TVA sur les prestations de service : 1 guide fiscal | /fr/guides/tva-sur-les-prestations-de-service/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-sur-les-operations-de-banque-et-de-credit/ | TVA sur les opérations de banque et de crédit | /fr/guides/tva-sur-les-operations-de-banque-et-de-credit/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-sur-les-operations-immobilieres-au-maroc/ | TVA sur les opérations immobilières : 3 activités | /fr/guides/tva-sur-les-operations-immobilieres-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/expertise-judiciaire-au-maroc/ | Expertise judiciaire au Maroc : 1 guide pratique | /fr/guides/expertise-judiciaire-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/livraison-a-soi-meme-tva/ | Livraison à soi-même (TVA) | /fr/guides/livraison-a-soi-meme-tva/ | IMPORTED |  |
| https://www.upsilon-consulting.com/operations-de-lotissement-de-terrain-tva/ | Opérations de lotissement de terrain (TVA) | /fr/guides/operations-de-lotissement-de-terrain-tva/ | IMPORTED |  |
| https://www.upsilon-consulting.com/licenciement-pour-faute-grave/ | Licenciement pour faute grave au Maroc : 1 Guide pour comprendre | /fr/guides/licenciement-pour-faute-grave/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-au-maroc/ | TVA au Maroc, Ce qu'il faut savoir | /fr/guides/tva-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comptabilite-au-maroc/ | Comptabilité au Maroc - Tenue | /fr/guides/comptabilite-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/formalites-juridiques-upsilon-vous-accompagne/ | Formalités juridiques au maroc - Upsilon vous accompagne | /fr/guides/formalites-juridiques-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/impot-au-maroc/ | L'impôt au Maroc | /fr/guides/impot-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/identifiant-fiscal-au-maroc/ | Identifiant fiscal au Maroc : 1 guide pour l'obtenir | /fr/guides/identifiant-fiscal-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/acomptes-provisionnels-dis-au-maroc/ | Acomptes provisionnels d'IS au Maroc | /fr/guides/acomptes-provisionnels-dis-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/reserve-legale/ | Réserve légale : SARL au Maroc | /fr/guides/reserve-legale/ | IMPORTED |  |
| https://www.upsilon-consulting.com/gerant-dune-sarl-au-maroc/ | Gérant d'une SARL au Maroc | /fr/guides/gerant-dune-sarl-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comptabilite-analytique-mise-en-place/ | Comptabilité analytique : Mise en place | /fr/guides/comptabilite-analytique-mise-en-place/ | IMPORTED |  |
| https://www.upsilon-consulting.com/documentation-des-prix-de-transfert/ | Documentation des prix de transfert | /fr/guides/documentation-des-prix-de-transfert/ | IMPORTED |  |
| https://www.upsilon-consulting.com/charges-dexploitation/ | Charges d'exploitation | /fr/guides/charges-dexploitation/ | IMPORTED |  |
| https://www.upsilon-consulting.com/pieces-justificatives-des-achats-article-146-du-cgi/ | Pièces justificatives des achats : Article 146 du CGI | /fr/guides/pieces-justificatives-des-achats-article-146-du-cgi/ | IMPORTED |  |
| https://www.upsilon-consulting.com/rejet-de-la-comptabilite/ | Rejet de la comptabilité en fiscalité marocaine. | /fr/guides/rejet-de-la-comptabilite/ | IMPORTED |  |
| https://www.upsilon-consulting.com/audit-fiscal-au-maroc/ | Audit fiscal au Maroc | /fr/guides/audit-fiscal-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/consultant-fiscal/ | Consultant fiscal au Maroc | /fr/guides/consultant-fiscal/ | IMPORTED |  |
| https://www.upsilon-consulting.com/quitus-fiscal-pour-depart-definitif-procedure/ | Quitus fiscal pour départ définitif : Procédure | /fr/guides/quitus-fiscal-pour-depart-definitif-procedure/ | IMPORTED |  |
| https://www.upsilon-consulting.com/periode-dessai/ | Période d'essai en droit du travail marocain | /fr/guides/periode-dessai/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cessation-temporaire-dactivite-cadre-legal/ | Cessation temporaire d'activité : Cadre légal | /fr/guides/cessation-temporaire-dactivite-cadre-legal/ | IMPORTED |  |
| https://www.upsilon-consulting.com/recruter-un-salarie-etranger/ | Recruter un salarié étranger au Maroc | /fr/guides/recruter-un-salarie-etranger/ | IMPORTED |  |
| https://www.upsilon-consulting.com/audit-des-comptes-au-maroc/ | Audit des comptes au Maroc | /fr/guides/audit-des-comptes-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cartographie-des-risques/ | Cartographie des risques : ce qu'il faut savoir | /fr/guides/cartographie-des-risques/ | IMPORTED |  |
| https://www.upsilon-consulting.com/simpl-is-ir-tva/ | SIMPL IS, IR, TVA - Télédéclaration des impôts | /fr/guides/simpl-is-ir-tva/ | IMPORTED |  |
| https://www.upsilon-consulting.com/auto-entrepreneur/ | Auto entrepreneur au Maroc : 1 Guide Pratique | /fr/guides/auto-entrepreneur/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fiscalite-au-maroc/ | Fiscalité au Maroc | /fr/guides/fiscalite-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/location-immobiliere-regime-de-tva/ | Location immobilière : Régime de TVA | /fr/guides/location-immobiliere-regime-de-tva/ | IMPORTED |  |
| https://www.upsilon-consulting.com/debours-et-frais-en-fiscalite-marocaine/ | Débours : traitement comptable et fiscal au Maroc | /fr/guides/debours-et-frais-en-fiscalite-marocaine/ | IMPORTED |  |
| https://www.upsilon-consulting.com/reevaluation-libre/ | Réévaluation libre des immobilisations au Maroc | /fr/guides/reevaluation-libre/ | IMPORTED |  |
| https://www.upsilon-consulting.com/commissaire-aux-comptes-au-maroc/ | Commissaire aux comptes au Maroc : Rôle et missions | /fr/guides/commissaire-aux-comptes-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/plan-comptable-marocain-pcge/ | Plan comptable marocain (PCGE) | /fr/guides/plan-comptable-marocain-pcge/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comptabilite-au-maroc-1-guide/ | Comptabilité au Maroc : 1 guide complet | /fr/guides/comptabilite-au-maroc-1-guide/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tenue-de-comptabilite/ | Tenue de comptabilité au Maroc | /fr/guides/tenue-de-comptabilite/ | IMPORTED | URL listed as a blog article, but current source serves a resource/service page. All currently accessible editorial content is captured; the original longer article body is not served by this URL. |
| https://www.upsilon-consulting.com/territorialite-de-la-tva-ce-quil-faut-retenir/ | Territorialité de la TVA : Ce qu'il faut retenir | /fr/guides/territorialite-de-la-tva-ce-quil-faut-retenir/ | IMPORTED |  |
| https://www.upsilon-consulting.com/prorata-de-deduction-de-la-tva/ | Prorata de déduction de la TVA | /fr/guides/prorata-de-deduction-de-la-tva/ | IMPORTED |  |
| https://www.upsilon-consulting.com/tva-au-maroc-champ-dapplication/ | TVA au Maroc : Champ d'application | /fr/guides/tva-au-maroc-champ-dapplication/ | IMPORTED |  |
| https://www.upsilon-consulting.com/taxe-sur-la-valeur-ajoutee-tva-au-maroc/ | Taxe sur la valeur ajoutée au Maroc (TVA) | /fr/guides/taxe-sur-la-valeur-ajoutee-tva-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/regime-fiscal-des-cooperatives/ | Régime fiscal des coopératives au Maroc (IS) | /fr/guides/regime-fiscal-des-cooperatives/ | IMPORTED |  |
| https://www.upsilon-consulting.com/territorialite-de-l-is/ | Territorialité de l'I.S | /fr/guides/territorialite-de-l-is/ | IMPORTED |  |
| https://www.upsilon-consulting.com/retenue-a-la-source-quels-sont-les-produits-soumis/ | Retenue à la source : Quels sont les produits soumis ? | /fr/guides/retenue-a-la-source-quels-sont-les-produits-soumis/ | IMPORTED |  |
| https://www.upsilon-consulting.com/gie-au-maroc-groupements-dinterets-economiques/ | GIE au Maroc : Groupements d'intérêts économiques | /fr/guides/gie-au-maroc-groupements-dinterets-economiques/ | IMPORTED |  |
| https://www.upsilon-consulting.com/societes-transparentes-immobilieres/ | Sociétés transparentes immobilières | /fr/guides/societes-transparentes-immobilieres/ | IMPORTED |  |
| https://www.upsilon-consulting.com/separation-des-exercices/ | Séparation des exercices : un principe comptable | /fr/guides/separation-des-exercices/ | IMPORTED |  |
| https://www.upsilon-consulting.com/continuite-dexploitation/ | Continuité d'exploitation en comptabilité marocaine | /fr/guides/continuite-dexploitation/ | IMPORTED |  |
| https://www.upsilon-consulting.com/detaxe-taxe-free-au-maroc/ | Détaxe au Maroc : ce qu'il faut savoir | /fr/guides/detaxe-taxe-free-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/succursale-dune-societe-etrangere/ | Créer une succursale d'une société étrangère au Maroc : guide 2026 (étapes, PV, formalités) | /fr/guides/succursale-dune-societe-etrangere/ | IMPORTED |  |
| https://www.upsilon-consulting.com/societes-civiles-au-maroc/ | Sociétés Civiles au Maroc - ce qu'il faut savoir | /fr/guides/societes-civiles-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/brevet-dinvention-propriete-intellectuelle/ | Brevet d'invention - Propriété Intellectuelle | /fr/guides/brevet-dinvention-propriete-intellectuelle/ | IMPORTED |  |
| https://www.upsilon-consulting.com/ompic-au-maroc/ | OMPIC au Maroc et propriété commerciale | /fr/guides/ompic-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/associations-fiscalite-is/ | Associations - Quel Régime fiscal en matière d'IS | /fr/guides/associations-fiscalite-is/ | IMPORTED |  |
| https://www.upsilon-consulting.com/export-au-maroc/ | L'export au Maroc est il exonéré d'impôts | /fr/guides/export-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/etat-explicatif-de-lorigine-du-deficit/ | État explicatif de l'origine du déficit | /fr/guides/etat-explicatif-de-lorigine-du-deficit/ | IMPORTED |  |
| https://www.upsilon-consulting.com/etablissements-stables-au-maroc/ | Les établissements stables au Maroc | /fr/guides/etablissements-stables-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/declarations-fiscales-de-fin-d-annee/ | Déclarations fiscales annuelles (I.S) | /fr/guides/declarations-fiscales-de-fin-d-annee/ | IMPORTED |  |
| https://www.upsilon-consulting.com/fiscalite-de-lindemnite-de-licenciement-au-maroc/ | Fiscalité de l'indemnité de licenciement au Maroc | /fr/guides/fiscalite-de-lindemnite-de-licenciement-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/indemnite-de-licenciement-au-maroc/ | Indemnité de licenciement au Maroc | /fr/guides/indemnite-de-licenciement-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/programme-intilaka/ | Intilaka : Programme de financement des TPE | /fr/guides/programme-intilaka/ | IMPORTED |  |
| https://www.upsilon-consulting.com/droit-preferentiel-de-souscription-dps-maroc/ | Droit préférentiel de souscription au Maroc - DPS | /fr/guides/droit-preferentiel-de-souscription-dps-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/retenue-a-la-source-sur-dividendes-au-maroc/ | Dividendes au Maroc : Retenue à la source | /fr/guides/retenue-a-la-source-sur-dividendes-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/simulateur-salaire-net-et-brut/ | Simulateur salaire net et brut | /fr/guides/simulateur-salaire-net-et-brut/ | IMPORTED |  |
| https://www.upsilon-consulting.com/is-deficits-reportables/ | Déficits reportables au Maroc : Quelles règles ? | /fr/guides/is-deficits-reportables/ | IMPORTED |  |
| https://www.upsilon-consulting.com/retenue-a-la-source-sur-interets-au-maroc/ | Retenue à la source sur intérêts au Maroc | /fr/guides/retenue-a-la-source-sur-interets-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/prix-de-transfert-au-maroc/ | Prix de transfert au Maroc : Ce qu'il faut savoir | /fr/guides/prix-de-transfert-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/notes-de-frais/ | Notes de frais - Déduction fiscale au Maroc | /fr/guides/notes-de-frais/ | IMPORTED |  |
| https://www.upsilon-consulting.com/charges-deductibles-i-s-au-maroc/ | Charges déductibles - I.S au Maroc | /fr/guides/charges-deductibles-i-s-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/casablanca-finance-city-cfc/ | Casablanca Finance City (CFC) | /fr/guides/casablanca-finance-city-cfc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/succursale-au-maroc/ | Succursale au Maroc : définition, fiscalité et différences avec une filiale (2026) | /fr/guides/succursale-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/responsabilite-penale-des-dirigeants-maroc/ | La responsabilité pénale des dirigeants au Maroc | /fr/guides/responsabilite-penale-des-dirigeants-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/commissariat-a-la-transformation/ | Commissariat à la transformation | /fr/guides/commissariat-a-la-transformation/ | IMPORTED |  |
| https://www.upsilon-consulting.com/transformation-sarl-en-sa/ | Transformation d'une SARL en SA | /fr/guides/transformation-sarl-en-sa/ | IMPORTED |  |
| https://www.upsilon-consulting.com/conventions-reglementees-ce-quil-faut-savoir/ | Conventions réglementées : Ce qu'il faut savoir | /fr/guides/conventions-reglementees-ce-quil-faut-savoir/ | IMPORTED |  |
| https://www.upsilon-consulting.com/cession-de-parts-actions-comparaison-sa-et-sarl/ | Cession de parts (actions) : Comparaison SA et SARL | /fr/guides/cession-de-parts-actions-comparaison-sa-et-sarl/ | IMPORTED |  |
| https://www.upsilon-consulting.com/difficultes-dentreprises/ | Les difficultés d'entreprises en droit marocain | /fr/guides/difficultes-dentreprises/ | IMPORTED |  |
| https://www.upsilon-consulting.com/societe-anonyme-au-maroc/ | SOCIETE ANONYME AU MAROC : Son fonctionnement | /fr/guides/societe-anonyme-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/logiciel-de-comptabilite-que-choisir/ | Logiciel de comptabilité - Lequel choisir ? | /fr/guides/logiciel-de-comptabilite-que-choisir/ | IMPORTED |  |
| https://www.upsilon-consulting.com/transfert-de-siege-social-au-maroc/ | Transfert de Siège social au Maroc - SARL | /fr/guides/transfert-de-siege-social-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/domiciliation-de-societe/ | Domiciliation de société - SARL | /fr/guides/domiciliation-de-societe/ | IMPORTED |  |
| https://www.upsilon-consulting.com/augmentation-de-capital-sarl/ | Augmentation de capital - SARL | /fr/guides/augmentation-de-capital-sarl/ | IMPORTED |  |
| https://www.upsilon-consulting.com/commissaire-aux-comptes-a-casablanca/ | Commissaire aux comptes à Casablanca | /fr/guides/commissaire-aux-comptes-a-casablanca/ | IMPORTED |  |
| https://www.upsilon-consulting.com/taxe-de-services-communaux-tsc/ | Taxe de services communaux (TSC) | /fr/guides/taxe-de-services-communaux-tsc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/expert-comptable-casablanca/ | Expert Comptable à Casablanca | /fr/guides/expert-comptable-casablanca/ | IMPORTED |  |
| https://www.upsilon-consulting.com/taxe-professionnelle-au-maroc/ | Taxe professionnelle au Maroc | /fr/guides/taxe-professionnelle-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/sarl-au-maroc-pourquoi-est-ce/ | SARL au Maroc (2026) | /fr/guides/creer-une-sarl-maroc/ | MERGED_EXISTING |  |
| https://www.upsilon-consulting.com/residence-fiscale-en-droit-marocain/ | Résidence fiscale en droit marocain | /fr/guides/residence-fiscale-en-droit-marocain/ | IMPORTED |  |
| https://www.upsilon-consulting.com/expert-comptable-au-maroc-upsilon-consulting/ | Expert comptable au Maroc - Upsilon Consulting | /fr/guides/expert-comptable-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/comment-rediger-un-business-plan/ | Business Plan - Les étapes pour rédiger son plan d'affaires | /fr/guides/comment-rediger-un-business-plan/ | IMPORTED |  |
| https://www.upsilon-consulting.com/impot-sur-les-societes-au-maroc/ | Impôt sur les sociétés au Maroc (I.S) | /fr/guides/impot-sur-les-societes-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/investir-au-maroc-cadre-juridique-et-fiscal/ | Investir au Maroc - Cadre Juridique et fiscal | /fr/guides/investir-au-maroc-cadre-juridique-et-fiscal/ | IMPORTED |  |
| https://www.upsilon-consulting.com/le-remboursement-de-credit-de-tva-au-maroc/ | Le remboursement de crédit de TVA au Maroc | /fr/guides/le-remboursement-de-credit-de-tva-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/investissements-etrangers-au-maroc/ | Investissements étrangers au Maroc | /fr/guides/investissements-etrangers-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/representation-fiscale-au-maroc/ | Représentant fiscal au Maroc : désignation, TVA et rôle | /fr/guides/representation-fiscale-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/externalisation-paie-maroc-guide-2026/ | Externalisation de la paie au Maroc : guide complet 2026 | /fr/guides/externalisation-paie-maroc-guide-2026/ | IMPORTED |  |
| https://www.upsilon-consulting.com/dissolution-de-societe-sarl-au-maroc/ | Dissolution et liquidation de société au Maroc | /fr/guides/dissolution-de-societe-sarl-au-maroc/ | IMPORTED |  |
| https://www.upsilon-consulting.com/expert-comptable-devenir/ | Expertise comptable au Maroc : le métier d'expert-comptable et comment y accéder | /fr/guides/expert-comptable-devenir/ | IMPORTED |  |
| https://www.upsilon-consulting.com/formes-juridiques-societes-maroc/ | Formes juridiques de sociétés au Maroc (2026) | /fr/guides/formes-juridiques-societes-maroc/ | IMPORTED |  |

## Fichiers de preuve

- migration-source.json : inventaire de référence établi avant intégration.
- migration/upsilon/inventory-initial.json : copie immuable du premier inventaire.
- migration/upsilon/migration-source-recrawl.json : deuxième inventaire.
- migration/upsilon/crawl-audit.json : classification de chaque page inspectée.
- migration/upsilon/source-destination.json : correspondance des sources et destinations.
- migration/upsilon/qa-results.json : résultats détaillés, images et métriques de contenu.
- migration/upsilon/existing-guides-baseline.json : 19 guides Felexia existants avant migration.

- migration/covers/queue.json et migration/covers/prompts/ : sujets, résumés et consignes de création des couvertures.
- migration/covers/completed/ et migration/covers/reviewed/ : fichiers produits, empreintes et revues image par image.
- migration/upsilon/cover-review.json et migration/upsilon/browser-review.json : synthèses des vérifications visuelles.
- migration/upsilon/metadata-adaptations.json : adaptations éditoriales des titres, résumés et métadonnées.

## Publication en production — 24 septembre 2026

La nouvelle version a été publiée sur https://www.felexiaconseils.com/fr/guides/ à la demande du propriétaire.

- Déploiement Vercel : `dpl_7Rv7uEAcgA2sL1umLzpwvqjVY6Jd`, état **READY**, cible **production**.
- Build distant réussi : 463 pages générées.
- Contrôle HTTP en production : **313/313 guides**, **626/626 fichiers de couverture** (313 couvertures, deux tailles chacune), aucune erreur.
- Les 301 sources possèdent une destination présente au catalogue ; les 313 guides figurent dans le sitemap en ligne.
- Catalogue complet : 313 cartes HTML, même ordre que la version validée, aucune pagination.
- Contrôle visuel : 3 colonnes sur desktop, recherche et filtres fonctionnels, aucune erreur console.
- Accueils FR/EN/AR et anciennes URL de Guides accessibles.
- Preuves : `migration/upsilon/production-deployment.json` et `migration/upsilon/production-verification.json`.
- Les archives de crawl et le dossier généré local ont été exclus de l’envoi Vercel ; les sources, assets et références nécessaires sont inclus.
