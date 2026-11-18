# FELEXIA Intelligence 360° — livraison et preuves

Dernière actualisation documentaire : **13 octobre 2026**. Les contrôles datés ci-dessous ont été réalisés le 12 octobre, sauf indication contraire.

État documenté le **12 octobre 2026**, fuseau `Africa/Casablanca`, après la promotion du moteur à 09:24 UTC, sa recette publique, les observations du scheduler/état jusqu'à 09:32 UTC et la recette privée du dashboard jusqu'à 09:39 UTC. Ce rapport distingue les contrôles locaux, les opérations réellement exécutées sur Supabase, les recettes Vercel et les vérifications de production. Trois cycles pg_cron autonomes sont prouvés, dont un sous le calendrier permanent de quinze minutes. Un dernier correctif de libellé du dashboard est en cours de déploiement.

## A. Audit

Le site existant est un générateur HTML Node.js ESM, hébergé sur Vercel, avec un serveur Node local et une API contact persistée dans Supabase. Les routes réelles sont `/{fr|ar|en}/guides/{slug}/`. Le moteur s'intègre à cette architecture.

L'inventaire initial compte **313 sujets**, **351 versions**: 313 FR, 19 EN et 19 AR. **294 sujets** n'ont pas leurs versions EN/AR, soit **588 versions manquantes**. Six guides possèdent également un supplément français à synchroniser avec leurs traductions. Les imports, dates et URL historiques ont été conservés; une date importée ne devient pas une nouvelle date de publication Felexia ou une vérification fiscale.

Les rapports détaillés sont [INTELLIGENCE-AUDIT.md](INTELLIGENCE-AUDIT.md), [INTELLIGENCE-AUDIT-GUIDES.md](INTELLIGENCE-AUDIT-GUIDES.md) et [l'inventaire structuré](INTELLIGENCE-INVENTAIRE-GUIDES.json). Plusieurs modifications et fichiers de migration existaient avant cette intervention: ils constituent le travail de l'utilisateur et ne sont pas attribués au nouveau moteur.

## B. Modifications

Les ajouts du moteur sont regroupés par responsabilité:

| Ensemble | Fichiers |
|---|---|
| État et orchestration | `src/intelligence/config.mjs`, `store.mjs`, `engine.mjs`, `runtime.mjs` |
| Sources, génération et validation | `src/intelligence/research.mjs`, `providers.mjs`, `quality.mjs` |
| Rendu et endpoints | `src/intelligence/render.mjs`, `http.mjs`; `api/intelligence.js`, `intelligence-cron.js`, `intelligence-public.js`, `intelligence-sitemap.js`, `intelligence-media.js` |
| Réserve | `src/intelligence/reserve-a.json`, `reserve-b.json`, `reserve.json`, `reserve-supplement.json`; `scripts/prepare-intelligence-reserve.mjs` |
| Administration | `public/intelligence/index.html`, `public/intelligence-admin.js`, `public/intelligence-admin.css` |
| Affichage et images | `public/intelligence.css`; quatorze sources SVG originales et vingt-huit WebP dans `public/images/intelligence/` |
| Exécution Node | `scripts/intelligence-worker.mjs`, `scripts/intelligence-seed.mjs`; seed CLI et admin chargent la réserve principale et le complément |
| Base et planification | `supabase/migrations/20261012075219_felexia_intelligence_state.sql`, `20261012082004_felexia_intelligence_scheduler.sql` |
| Tests | `tests/intelligence-store.test.mjs`, `intelligence-engine.test.mjs`, `intelligence-providers.test.mjs`, `intelligence-render.test.mjs`, `intelligence-http.test.mjs`, `intelligence-reserve.test.mjs`, `intelligence-vercel-output.test.mjs`, `intelligence-public-verification.test.mjs`, `intelligence-fixtures.mjs` |
| Documentation | Audits, inventaire, ce rapport, [persistance et rollback](INTELLIGENCE-PERSISTENCE-ROLLBACK.md), [ordonnanceur et rollback](INTELLIGENCE-SCHEDULER.md) |

L'intégration complète `server.mjs`, `scripts/build.mjs`, `vercel.json`, `.vercelignore`, `.env.example`, `package.json` et son verrou. Les dépendances ajoutées sont l'AI SDK `ai` 7.0.137 et `sharp` 0.35.5; Cheerio 1.2.0 sert à l'analyse et au rendu. Les fonctions publiques incluent explicitement les pages Guides historiques au bundling; l'administration inclut aussi les corps FR nécessaires au rattrapage. Les fichiers privés `.sites-runtime/` et les `.env*` sont exclus de l'upload Vercel.

## C. Moteur de veille

Huit entrées institutionnelles sont configurées: OMPIC, SGG, ministère des Finances, Office des Changes, Bank Al-Maghrib, CNSS, Maroc PME et Tamwilcom. Un cycle quotidien tente **deux entrées sur huit**, avec rotation persistante; il ne parcourt pas les huit organismes chaque jour. Il collecte des pages HTML, du texte et des documents XML/RSS pour extraire des données inertes, conserver une empreinte et détecter les changements.

Les protections vérifient HTTPS, les domaines autorisés, chaque redirection, les adresses IP publiques et la réponse DNS effectivement utilisée pour la connexion. La taille, les délais, les redirections, robots.txt et Crawl-delay bornent les requêtes. Les instructions contenues dans une page sont traitées comme des données externes sans autorité sur le moteur.

Une collecte gratuite réelle a récupéré la page de l'Office des Changes, redirigée vers `/fr`, avec **6 928 caractères**, et Tamwilcom avec **16 000 caractères conservés**, limite de l'extracteur. Une collecte exécutée depuis la fonction Vercel de préproduction a ensuite enregistré Office des Changes avec une empreinte commençant par `45d31d9`, `retrievedAt=2026-10-12T08:52:47Z`, confirmée dans l'état REST Supabase; ce cycle a compté une récupération et une erreur de source. Ces résultats prouvent la récupération documentaire, pas la validité d'une règle fiscale. Les erreurs d'accès et les PDF sont enregistrés comme diagnostics: **l'extraction PDF n'est pas implémentée**. Les pages DGI, Douanes et CRI n'ont pas d'adaptateur dédié livré; une page SGG n'est pas une extraction automatisée du Bulletin Officiel.

Le classement pondéré et la détection des intentions identiques ou très proches sont disponibles. La collecte n'invente pas un volume de recherche et ne transforme pas chaque document en sujet automatiquement validé.

## D. Génération IA

L'adaptateur de génération utilise **Vercel AI Gateway via l'AI SDK** pour une sortie structurée FR/AR/EN et une matrice d'affirmations. Un fournisseur et un modèle explicites, des credentials serveur et des budgets positifs sont exigés avant tout appel. Les réservations budgétaires sont atomiques; les coûts réellement facturés restent inconnus tant qu'aucune donnée fournisseur ne les confirme.

**Aucun appel IA payant n'a été effectué.** Les adaptateurs IA ont été testés avec des réponses simulées injectées dans le SDK. La configuration de production interdit les appels payants. Une réponse de modèle conserve ses affirmations `unverified` et sa date de contrôle non acquise; une citation trouvée ne vaut pas validation juridique. Le moteur ne fabrique pas de signature d'expert.

Le quality gate exige sources récentes et empreintes, preuves des affirmations, cohérence factuelle, contenu complet, métadonnées, images et liens réels. Conformément à la demande ultérieure du propriétaire, la relecture humaine n'est pas obligatoire dans la configuration retenue; les blocages documentaires restent actifs. La réserve livrée porte uniquement sur des conseils de gestion à faible risque, sans taux, échéances ou règles juridiques inventés.

La source de la réserve est la page publique Felexia de conseil en gestion (`first-party`): elle documente le contexte des prestations, pas une règle fiscale ni une preuve juridique indépendante. Les recommandations sont une rédaction originale. Les contrôles de structure, citations, chiffres, cohérence et classement qualitatif n'équivalent pas à un examen juridique de chaque phrase.

## E. Trilingue

Chaque sujet possède un identifiant commun et trois traductions à slugs explicites. La publication écrit le groupe FR/AR/EN et son rapport dans une seule révision: une langue manquante bloque l'ensemble. Les valeurs factuelles sensibles doivent correspondre à la matrice et rester identiques entre langues.

L'arabe utilise `lang="ar"`, `dir="rtl"`, les textes et métadonnées localisés ainsi que les correspondances de langue réelles. Les tests contrôlent aussi qu'un court fragment arabe dans un article anglais ne satisfait pas la complétude arabe. La recette navigateur locale a vérifié les versions FR desktop et AR/EN mobile, la couverture chargée, le titre, le canonical, l'absence de débordement horizontal mobile et l'ouverture d'une FAQ arabe. La recette navigateur finale sur le domaine public a ensuite confirmé les trois versions, leurs canonical distincts, les FAQ et recherches de catalogue dans chaque langue, ainsi que le RTL mobile sans débordement.

## F. Illustrations

Les **quatorze illustrations de la réserve sont originales**, produites localement en SVG puis converties en WebP 1280 × 800 et 640 × 400. Les vingt-huit fichiers sont décodables, distincts et dimensionnés; les textes ALT sont localisés. Le rendu sert `srcset`, `sizes`, dimensions fixes et chargement adapté à leur position.

Le quinzième guide complet ajouté ensuite réutilise l'illustration originale détenue par Felexia du journal de décisions opérationnelles, avec ses propres textes ALT FR/AR/EN. Le stock de quinze guides n'implique donc pas quinze nouvelles créations graphiques distinctes: il utilise quatorze illustrations originales et leurs vingt-huit variantes WebP.

La génération d'images par modèle, l'optimisation Sharp et l'upload immutable Supabase ont des tests simulés. Aucune image de modèle n'a été générée en production. Le bucket optionnel `intelligence-media` est **absent** à la vérification SQL; les images locales de la réserve n'en ont pas besoin. Le provisionnement et la recette du bucket précèdent toute utilisation future de cet adaptateur.

## G. Publication

Les sujets publiés sont rendus dans les **trois rubriques Guides existantes**. Les catalogues et le sitemap fusionnent l'état éditorial avec les pages historiques, sans rebuild quotidien des nouveaux contenus. Les brouillons et groupes incomplets restent privés. Les articles affichent la date réelle de publication, le contrôle documentaire, leurs sources et un lien vers les prestations locales Felexia.

En cas de panne de la base, les pages historiques déjà construites restent disponibles avec un signal technique de fonctionnement dégradé. Une URL nouvelle ne devient pas une fausse page réussie si son contenu durable est inaccessible. La vérification post-publication exige désormais **neuf contrôles**: trois articles avec langue, titre, canonical et hreflang corrects; deux images; trois catalogues contenant chacun la carte exacte; le sitemap contenant les trois URL. Elle conserve le résultat dans le rapport. Les requêtes sont parallèles, limitées à dix secondes et à 2 Mio de HTML/XML par réponse. Un HTTP 200 sans la carte ou l'URL attendue échoue.

La recette du candidat suivant a identifié un conflit de routage réel: une nouvelle page arabe répondait HTTP 200, mais le catalogue arabe répondait également 200 depuis un fichier statique sans nouvelle carte. La priorité du filesystem Vercel précédait le rewrite; le sitemap statique risquait le même conflit. Le premier groupe avait déjà été committé dans l'état éditorial, tandis que le domaine personnalisé conservait l'ancien déploiement. Ce candidat n'a pas été promu.

Le correctif conserve `dist` complet pour les fonctions et produit une sortie statique distincte `dist-site`, excluant les pages Guides et le sitemap ainsi que leurs variantes compressées. Les autres chemins et ressources restent conservés. Les glob `includeFiles` continuent de référencer `dist` pour le fallback historique, le rattrapage FR et la fusion du sitemap. Le builder Node applique ces glob depuis la racine du projet, indépendamment de `outputDirectory`. Le build corrigé et les trois tests ciblés sur ses fichiers réels ont réussi. La recette Vercel E6 a ensuite confirmé les nouvelles pages, leurs cartes et le sitemap fusionné en préproduction. Le candidat final Dmf a réussi ses propres recettes en préproduction puis sur le domaine public après promotion, avec un rapport quotidien de vérification **9/9**. [Priorité filesystem documentée](https://vercel.com/docs/project-configuration/vercel-json#rewrites), [builder Node officiel](https://github.com/vercel/vercel/blob/main/packages/node/src/build.ts).

## H. SEO

Le rendu ajoute une seule série de métadonnées par article: titre, description, canonical, Open Graph et Twitter. Les alternances FR/AR/EN et x-default sont réciproques et pointent vers les slugs réellement publiés. Le sitemap ajoute les versions publiées et leurs images en conservant les URL historiques.

Article, BreadcrumbList, FAQPage lorsqu'une FAQ est visible, Organization, WebSite et WebPage sont produits à partir des champs affichés. Les liens internes sont contrôlés dans la langue concernée. Les entrées externes sont échappées, le HTML libre d'un modèle n'est pas publié et la politique CSP autorise les données structurées par leurs empreintes.

Search Console, GA4 et un fournisseur de mots-clés ne sont pas connectés au moteur. Aucun clic, impression, position, volume, indexation Google ou gain commercial n'est présenté comme observé.

## I. Automatisation

Le store Supabase et le verrou durable permettent de travailler sans session Codex ouverte. Le réveil retenu est **Supabase pg_cron + pg_net**, toutes les quinze minutes; le moteur applique `Africa/Casablanca` et l'heure cible **09:00**, avec idempotence par journée locale. Le fuseau IANA gère les changements de décalage: un horaire fixe UTC ne les remplace pas.

Le diagnostic réel de préproduction du 12 octobre à **08:49 UTC** a renvoyé **08:49 local**, Node **24.21.0**, ICU **78.3**, tzdata **2026c**. Le résultat `before_window` avant 09:00 était donc attendu. La base IANA 2026c modélise le Maroc en UTC permanent à partir du 20 septembre 2026; la machine Windows avec Node 26.1 et tzdata 2026b utilisait encore l'ancien décalage +01 pour octobre, d'où l'écart observé. Aucun décalage artificiel ni publication forcée n'a été ajouté au moteur. La même suite a été exécutée avec le runtime Node/tzdata de production. [Notes primaires IANA 2026c](https://data.iana.org/time-zones/tzdb-2026c/NEWS).

Les deux migrations ont été appliquées sur le projet existant. Le premier préflight a rejeté une modification inutile de `username` nécessitant superuser; la transaction a été annulée, le paramètre retiré et le préflight corrigé a réussi. La vérification SQL après installation constate un job unique **inactif**, rôle/base `postgres`. Après recette publique réussie, l'opérateur l'a activé temporairement toutes les minutes vers **09:26 UTC** pour observer pg_cron. Une première tentative de verrou de ligne sur `cron.job` a échoué sans commit; le script utilise désormais un verrou advisory de transaction limité à l'opération Felexia, sans élargissement de droits.

Les exécutions pg_cron **1, 2 et 3**, commencées à **09:27:00, 09:28:00 et 09:30:00 UTC**, sont réellement `succeeded`. Les deux premières suivent la cadence temporaire de recette; la troisième a lieu **après restauration du calendrier permanent**. Les requêtes pg_net **1, 2 et 3** ont reçu HTTP **200**, sans timeout ni erreur réseau. Le premier puis le dernier nonce ont été retrouvés consommés dans l'état CAS; les deux premiers transports ont été réconciliés en `http_success` lors des cycles suivants. L'observation finale à **09:31:52 UTC** confirme le job **actif**, rôle/base `postgres`, calendrier permanent **`*/15 * * * *`**.

La première publication avait été déclenchée pendant la recette manuelle autorisée. Ces trois réveils autonomes n'ont pas créé un nouveau groupe: ils ont conservé **un publié, quatorze prêts et un rapport quotidien**, avec vérification publique **9/9** et **zéro réservation d'API payante**; le dernier contrôle d'état date de **09:32:11 UTC**. Cette preuve démontre le transport, l'authentification HMAC et l'idempotence du cycle sans session Codex appelant manuellement la commande SQL; elle ne prétend pas avoir déjà observé plusieurs journées de publication autonome.

Les appels pg_net utilisent HMAC-SHA256, timestamp et UUIDv4; le secret reste dans Vault. Le serveur refuse les signatures dépassant 120 secondes et consomme chaque nonce atomiquement, y compris lorsqu'un worker échoue ensuite. Les tests couvrent replay, concurrence, signature modifiée et dates trop éloignées. Les étapes et reprises sont bornées; un journal de transport HTTP ne prouve pas à lui seul une publication. [Détails opérationnels](INTELLIGENCE-SCHEDULER.md).

## J. Réserve éditoriale

La réserve initiale contenait **30 sujets: 14 guides complets trilingues et 16 idées**, soit **42 versions rédigées**, avec sections, FAQ, métadonnées et images. Les seize idées ne sont pas des articles prêts. Les trente sujets ont été importés dans Supabase et les quatorze guides ont passé le quality gate sans appel payant.

Un complément original dans `src/intelligence/reserve-supplement.json` a ensuite été importé réellement avant la première publication. L'état Supabase compte maintenant **31 sujets: 15 guides complets, soit 45 versions linguistiques, et 16 idées**. Les quinze guides ont passé leurs **35 contrôles bloquants chacun**. Le re-seed réel a ajouté **zéro** sujet et confirmé **15 prêts**, démontrant l'idempotence de l'import; aucun sujet n'était encore publié lors de cette vérification. Le seed CLI et l'action admin lisent les deux fichiers de réserve.

La simulation sur quatorze journées Casablanca publie les quatorze groupes initiaux, une seule fois par jour, vérifie les trois routes, les cartes et le sitemap, puis constate explicitement l'épuisement. La journée suivante conserve seize idées et **zéro** sujet prêt; elle produit les événements de quota manqué et de réserve insuffisante, sans appel de génération. Cette preuve sur quatorze journées reste distincte du contrôle du quinzième guide ajouté ensuite. Après le premier groupe committé dans Supabase et la recette de production sur le domaine personnalisé, le décompte réel confirme **un groupe publié, 14 groupes prêts et 16 idées**; le rapport public du groupe publié est vérifié **9/9**.

Cette réserve fournit une continuité initiale limitée. Elle ne démontre pas 365 sujets par an et ne permet pas une production permanente sans apport futur de contenus conformes ou activation autorisée d'un générateur documenté.

Les dates de récupération de la source Felexia et `verifiedAt` de ces guides ne sont **pas renouvelées automatiquement**. Le quality gate bloque les sources et sujets dépassant **30 jours**, donc la poursuite au-delà de cette durée nécessite de vrais nouveaux contrôles, sans simple redatation. Les seize idées ne se transforment pas automatiquement en réserve même si un budget est activé plus tard: les brouillons du modèle gardent leurs affirmations non vérifiées et une date de contrôle non acquise. Un renouvellement autonome validé de cette réserve n'est pas démontré.

## K. Traduction historique

Les **588 versions EN/AR manquantes**, correspondant à **294 guides historiques français à compléter**, sont inventoriées; elles ne sont pas livrées par la réserve nouvelle. Le compteur de dashboard **294** exprime des guides, pas des versions linguistiques; son libellé corrigé est « Guides historiques à compléter ». Une file distincte `backfill` conserve le texte français et son URL historique, préserve les traductions déjà présentes et limite la maintenance à deux groupes par journée, sans consommer le quota d'un nouveau sujet.

Le scénario de traduction historique et ses hreflang sont testés sur fixtures, avec conservation du corps et de la date FR. L'administration peut importer l'original réel depuis les fichiers FR inclus dans le bundle. Sans preuves documentaires et sans fournisseur autorisé, ces tâches restent bloquées. Aucun rattrapage massif historique réel n'est déclaré terminé.

## L. Administration

L'interface `/intelligence/` expose synthèse, calendrier, veille, Guides, SEO et santé. L'API protégée propose consultation, pause/reprise, cycle, collecte, import, seed, contrôle, file de préparation, retry, autorisation, correction d'affirmation et rattrapage historique. La clé admin reste en mémoire dans le navigateur pendant la visite, sans stockage local; les états et journaux restent persistés côté serveur.

La connexion privée réelle en production a réussi sur les **six onglets** entre **09:37:18 et 09:39:41 UTC**, sans action de mutation. La recette confirme **14 prêts, un publié, 31 lignes Guides**, le calendrier vérifié, les sources récupérées et Search Console explicitement non connecté. La fermeture de session masque le dashboard et vide le champ de clé, qui reste de type password; les logs comptent **zéro erreur et zéro avertissement**. La preuve `.sites-runtime/dashboard-production-browser-qa-20261012/evidence.json` et ses captures `dashboard-synthesis.jpg` / `dashboard-seo.jpg` ne contiennent aucune valeur de credential. Les deux captures ont été inspectées visuellement.

Cette recette a aussi identifié un libellé ambigu: « Traductions historiques à préparer » présentait le nombre de **guides** historiques, 294. Le texte local a été remplacé par « Guides historiques à compléter », sans changement de logique ou de compteur; 588 reste le nombre de versions EN/AR manquantes. Le déploiement de ce texte seul est décrit ci-dessous et reste distinct des preuves déjà acquises pour le moteur.

Les endpoints admin et cron refusent les requêtes non authentifiées; les origins et entrées sont contrôlées. Le dashboard n'affiche aucune donnée SEO inventée. Les alertes sont des événements persistants et un callback de notification est prévu; **aucun envoi email ou autre canal opérationnel d'alertes n'est configuré dans le runtime livré**. Les rapports quotidiens, hebdomadaires et mensuels portent les compteurs et incidents réellement enregistrés.

## M. Tests

La première suite globale `npm test` a réussi **106/106** sous **Node 26.1 / tzdata 2026b**, puis **106/106** sous **Node 24.21.0 / tzdata 2026c**, le runtime de production. Le correctif de sortie Vercel et ses trois tests ont porté la suite à **109/109**. Avec les deux tests supplémentaires de vérification publique, la dernière suite globale sous **Node 24.21.0** a réussi **111/111**, et le lint **73 fichiers / zéro erreur**. Le store a réussi **8/8** et la réserve réelle **3/3**. Les fixtures horaires couvrent le décalage +01 de juin 2026 et UTC de mars, ainsi que la fenêtre 09:00 en octobre avec la nouvelle base IANA. La recette HTTP utilise un vrai serveur Node local et les fichiers persistants; les fournisseurs IA sont simulés.

Les autres contrôles ont réussi: `npm run lint` sur **71 fichiers**, `npm run typecheck` sur **300 imports, 313 couvertures et 301 sources de migration**, build, puis `npm run check` sur **462 routes, 39 913 liens/ressources, 3 877 images, 33 URL historiques et 441 URL du sitemap statique**. Ces compteurs statiques n'incluent pas des nouvelles URL prétendument publiées à cette étape. Le premier scan des **3 257 fichiers de déploiement**, puis le scan final des **4 527 fichiers**, n'ont trouvé aucune des valeurs de secrets réelles configurées.

Après découverte du conflit filesystem Vercel, le build corrigé a annoncé **463 pages** et produit `dist-site`. `node --test tests/intelligence-vercel-output.test.mjs` a réussi **3/3**: aucun fichier Guides ou sitemap, y compris compressé, dans la sortie statique; tous les autres chemins conservés; pages, scripts, styles et vingt-huit WebP identiques; glob des fonctions conservant les 354 HTML Guides et le manifest, les originaux FR et les deux réserves admin, ainsi que le sitemap complet. La suite globale a ensuite réussi **109/109** sous Node 24.21.0, et le lint **72 fichiers / zéro erreur**. Les deux nouveaux tests de vérification publique ont passé: cartes ou URL du sitemap absentes malgré HTTP 200 sont refusées; les neuf contrôles complets passent; un HTML de catalogue dépassant 2 Mio est refusé. La suite globale finale **111/111** et le lint **73 / zéro erreur** comprennent ces contrôles. La recette cloud reste une preuve distincte.

La recette navigateur locale est enregistrée dans `.sites-runtime/qa-reserve-f58d78a7-e325-4ca0-ba1b-84fc05bc42f5/browser-evidence.json`, datée **08:34:25 UTC**, origine `http://127.0.0.1:4322`. FR desktop: largeur et scrollWidth **2 545 px**, couverture chargée **1 152 × 720 px**. AR et EN mobile: largeur et scrollWidth **375 px**, `dir=rtl` et direction calculée `rtl` en arabe; une FAQ ouverte avec réponse visible. Aucune erreur console n'a été relevée. Les images de cartes associées non encore chargées dans cette capture sont sous lazy-loading: la preuve de couverture chargée porte sur l'image principale.

Captures consultées: [FR desktop](../.sites-runtime/qa-reserve-f58d78a7-e325-4ca0-ba1b-84fc05bc42f5/desktop-fr.jpg), [AR mobile](../.sites-runtime/qa-reserve-f58d78a7-e325-4ca0-ba1b-84fc05bc42f5/mobile-ar.jpg), [FAQ arabe ouverte](../.sites-runtime/qa-reserve-f58d78a7-e325-4ca0-ba1b-84fc05bc42f5/mobile-ar-faq.jpg). Ces artefacts de recette restent hors Git et hors upload.

La recette navigateur **de production**, terminée à **09:31:23 UTC**, est `.sites-runtime/production-browser-qa-20261012-0925/evidence.json`, avec six JPEG. Elle vérifie trois articles localisés et trois canonical distincts, FAQ ouvertes dans les trois langues et recherche affichant la carte exacte dans chaque catalogue. Les catalogues comportent **314 FR, 20 AR et 20 EN** cartes après ajout du groupe nouveau. En arabe mobile, viewport **375 px**, largeur et scrollWidth **360 px**, direction `rtl`, couverture chargée depuis la variante `640.webp`: aucun débordement. Le guide historique de création à Rabat reste stylé avec titre **48 px / graisse 700** et couverture chargée. Les logs ne contiennent aucune erreur console ni violation CSP. Les captures [FR desktop](../.sites-runtime/production-browser-qa-20261012-0925/desktop-fr.jpg) et [AR mobile](../.sites-runtime/production-browser-qa-20261012-0925/mobile-ar-375.jpg) ont aussi été inspectées visuellement.

Le déploiement de préproduction **READY** `dpl_2KpzpjQz52hPqMcCr4duGPPULACh` est accessible à [cette URL Vercel](https://felexiaconseils-o4qrvp1n2-360mouqsete-art.vercel.app). La baseline réelle de **08:52:03 UTC** vérifie les trois catalogues, trois articles historiques, le sitemap et `/intelligence/` en HTTP **200**, l'administration authentifiée en **200**, et les appels admin/cron non authentifiés en **401**. `SITE_URL` a été corrigé vers l'origine canonique `https://www.felexiaconseils.com`. Le domaine personnalisé pointait encore sur l'ancien déploiement `dpl_7Rv7uEAcgA2sL1umLzpwvqjVY6Jd` lors de ce contrôle; aucune promotion ou publication finale n'est déduite de cette baseline. La preuve détaillée est `.sites-runtime/intelligence-staging-baseline.json`.

Le candidat ultérieur incluant le complément de réserve est `dpl_C51MczqsgGMpUcKFCzMHCkUuo3jC`, [URL Vercel](https://felexiaconseils-jyhzpw6xt-360mouqsete-art.vercel.app). Son build a été lancé vers 09:01 UTC. Sa recette a ensuite détecté le conflit de priorité filesystem décrit en section G; une nouvelle page arabe était accessible mais son catalogue statique ne l'intégrait pas. Aucun succès complet de publication publique ou de promotion n'est déclaré pour ce candidat. Les résultats de la baseline précédente ne lui sont pas transférés automatiquement.

Le candidat corrigé `dpl_E6TEgU3SpQ8QGQyhwJTCuVzGpTgh`, [URL Vercel](https://felexiaconseils-gv1kc5mi3-360mouqsete-art.vercel.app), est **READY**. Sa recette vers **09:15:29 UTC** a réussi **23 contrôles**: les trois nouvelles pages et leurs cartes dans les trois catalogues, sitemap fusionné, deux images et pages historiques répondent HTTP 200; admin non autorisé 401 et autorisé 200, HMAC accepté 200 puis replay 409, et GET contact 405. Le stock durable est quatorze sujets prêts. Le correctif a donc résolu le conflit de priorité statique en préproduction. La preuve détaillée est `.sites-runtime/intelligence-staging-routing-fix-evidence.json`.

Le candidat final comprenant la vérification automatique des catalogues/sitemap est `dpl_DmfgyPJqeVkqnKhS4DwUv7xg7qcf`, [URL Vercel](https://felexiaconseils-lr7i0d6bw-360mouqsete-art.vercel.app), **READY**. Sa recette propre a réussi **24/24**, dont le refus HTTP 401 de l'ancienne clé admin renouvelée. La promotion CLI sur le domaine personnalisé a réellement réussi à **09:24 UTC**. La recette de [production](https://www.felexiaconseils.com) à **09:24–09:25 UTC** a réussi **24/24**; le rapport quotidien est `verified` avec **9/9** contrôles publics. Le stock compte un groupe publié, quatorze groupes prêts et seize idées; les réservations d'API payantes sont nulles. La preuve privée est `.sites-runtime/intelligence-production-evidence.json`. La preuve distincte du scheduler est décrite en section I et ci-dessous.

Le correctif purement textuel du compteur historique a passé `node --check`. Le déploiement `dpl_HMyU87gRVgpzeQ6uz5eoZ6ekJi1A`, [URL Vercel](https://felexiaconseils-7mylv6j3c-360mouqsete-art.vercel.app), est **READY** et a été promu le **12 octobre vers 09:46 UTC**. La recette ciblée a réussi **6/6 en préproduction**, puis **6/6 sur le domaine public** : refus des accès non authentifiés, API authentifiée, script JavaScript identique octet pour octet à la source corrigée, article français et sitemap. Le libellé servi est « Guides historiques à compléter », avec 294 guides, quatorze sujets prêts et un publié dans cette observation. Les preuves privées sont `.sites-runtime/intelligence-label-staging-evidence.json` et `intelligence-label-production-evidence.json`. La suite moteur 111/111 et les recettes complètes Dmf concernent la logique inchangée; les six onglets du dashboard ont été contrôlés par connexion réelle avant ce correctif textuel. Aucune nouvelle capture navigateur du libellé corrigé n'est revendiquée.

Les **33 URL historiques** de la matrice langues/chemins de `scripts/check-http.mjs` ont ensuite été vérifiées sur `https://www.felexiaconseils.com` entre **09:26:50 et 09:26:53 UTC** avec des requêtes **HEAD uniquement**. Les chaînes de redirection bornées aboutissent toutes au chemin attendu en HTTP **200** avec `Content-Type: text/html`: **33/33 PASS**, aucun échec. Aucun formulaire n'a été soumis. La preuve est `.sites-runtime/intelligence-historical-production-evidence.json`; cette inspection de transport ne prétend pas contrôler tout le corps des pages.

Les scripts privés du scheduler sont `.sites-runtime/intelligence-cron-test-activate.sql`, `intelligence-cron-test-observe.sql` et `intelligence-cron-test-restore.sql`. L'opérateur a effectué l'activation temporaire, l'observation puis la restauration, sans appeler manuellement `cron.job.command`. Les preuves privées sont `.sites-runtime/intelligence-cron-observation-first.json` (**09:27:19 UTC**), `intelligence-cron-state-evidence.json` (**09:27:57 UTC**), `intelligence-cron-restoration-evidence.json`, `intelligence-cron-final-evidence.json` (**09:31:52 UTC**) et `intelligence-cron-final-state-evidence.json` (**09:32:11 UTC**). Elles associent les trois exécutions pg_cron, leurs réponses HTTP 200, la consommation des nonces contrôlés, l'idempotence éditoriale et le calendrier restauré. Aucun secret, en-tête, body ni contenu de commande cron n'est sélectionné par l'observation.

| Acceptation demandée | Preuve disponible à ce stade |
|---|---|
| A — découverte | Collecte institutionnelle gratuite réelle Office des Changes/Tamwilcom; tests d'extraction et sécurité PASS |
| B — déduplication | Intentions identiques ou proches, historique et file contrôlés; tests PASS |
| C — fact checking | Affirmation fiscale non vérifiée, absence de source ou chiffres divergents bloqués; tests PASS |
| D — article | Quatorze guides initiaux complets plus un complément, quinze quality gates réels PASS; adaptateur modèle simulé, aucun modèle réel appelé |
| E — traductions | Trois versions de chaque guide contrôlées; groupe incomplet refusé; tests PASS |
| F — arabe RTL | HTML, navigateur local et production: mobile 375 px sans débordement, RTL effectif, image chargée et FAQ ouverte; captures disponibles |
| G — illustration | Quatorze créations et vingt-huit WebP locaux contrôlés, illustration réutilisée avec ALT localisés pour le quinzième guide; génération/upload IA simulés |
| H — SEO | Canonical, hreflang, métadonnées, données structurées, sitemap et échappement contrôlés; tests PASS |
| I — publication | Publication atomique testée localement; Dmf préproduction et production 24/24 PASS; groupe public et rapport 9/9 vérifiés |
| J — idempotence | Workers concurrents et relances conservant un groupe par jour; tests PASS |
| K — panne | Brouillon/image conservés après échec upload, retry, perte de bail et panne de base; tests PASS |
| L — cron | Trois exécutions pg_cron réelles réussies et trois HTTP 200, dont le cycle 09:30 après retour au calendrier quinze minutes; nonces contrôlés consommés et aucun doublon |
| M — anciens guides | Tests de conservation PASS; articles historiques et sitemap HTTP 200; 33 routes historiques de production HEAD PASS; contact identique en métadonnées cloud |
| N — traduction historique | Rattrapage sur fixtures, quota de maintenance et conservation FR testés; aucun lot réel de 588 versions terminé |
| O — consistance fiscale | Correction historisée et synchronisation FR/AR/EN exigée; tests PASS; republication de révision non automatisée |
| P — sécurité | SSRF, échappement, refus non authentifié, HMAC/replay, RLS/ACL réels et refus REST du profil net; connexion privée et logout dashboard propres contrôlés |
| Q — quota | Vraie réserve simulée sur quatorze jours, relances concurrentes et épuisement explicite; tests PASS |
| R — production | Dmf READY et promu à 09:24 UTC; préproduction et production 24/24 PASS, rapport 9/9; navigateur public PASS; trois cycles autonomes idempotents et cadence quinze minutes prouvés |

La persistance a aussi été testée sur **quatre commits REST CAS concurrents réels**, tous conservés. L'audit SQL du 12 octobre à **08:37 UTC** confirme les ACL ci-dessous; il ne lit aucun contenu client ni secret.

## N. Infrastructure

Le projet Vercel existant `felexiaconseils` utilise Node **24.21.0**, ICU **78.3**, tzdata **2026c** et le plan **Hobby**. Les fonctions de cycle/admin sont limitées à 240 secondes; les rendus publics à 30 secondes. Le projet Supabase existant `yxdmkqdnesemaqzagatm` est `ACTIVE_HEALTHY`, Postgres 17.6, avec pg_cron 1.6.4, pg_net 0.20.4, Vault 0.3.1 et pgcrypto 1.3. Aucun nouveau projet, abonnement ou service payant n'a été créé. **Dépense IA déclenchée: 0**; les consommations de l'hébergement existant restent soumises à ses quotas réels.

L'état est une ligne JSONB privée avec révision CAS. RLS et FORCE RLS sont activés sur l'état, le journal ordonnanceur et les contacts; aucune policy n'est présente. `anon` et `authenticated` n'ont aucun droit sur l'état ni d'exécution CAS. `service_role` possède `SELECT`/`UPDATE` et CAS, sans `INSERT`/`DELETE` sur l'état. CAS est `SECURITY INVOKER`, `search_path` vide et timeout de cinq secondes.

Les métadonnées contact avant/après sont identiques pour colonnes, index, contraintes et RLS; les droits `service_role` restent `SELECT`/`INSERT`, sans `UPDATE`/`DELETE`. Vault refuse `anon`/`authenticated`, mais son rôle serveur privilégié `service_role` peut déjà lire le secret déchiffré. Le profil REST `net` a été refusé par HTTP 406/PGRST106 avec la vraie clé serveur et `limit=0`. Aucun droit global d'objets appartenant à `supabase_admin` n'a été modifié. Les sauvegardes d'état et accès d'administration se trouvent hors Git dans `.sites-runtime/`.

## O. Limitations

- La génération IA/image réelle n'est pas activée; les modèles et leur coût réel ne sont pas validés en production. Les seize idées restantes ne constituent pas un renouvellement automatique démontré de la réserve, même après une éventuelle activation budgétaire: les nouvelles affirmations restent non vérifiées.
- La source de réserve est une page de prestations Felexia; elle constitue un contexte de première partie, pas une validation juridique. Ses dates et les dates de contrôle des sujets ne se renouvellent pas seules; leur péremption à trente jours bloque le quality gate.
- La veille collecte deux sources par jour, sans extraction PDF, crawler réglementaire complet, recherche SEO hebdomadaire ou audit automatique mensuel de tous les anciens articles. Les documents récupérés ne sont pas des règles automatiquement approuvées.
- Une correction ou un changement de source déclenche une tâche urgente et conserve l'historique. La **révision candidate sûre d'un article déjà publié n'est pas encore automatisée**; le moteur ne remplace pas silencieusement sa page par un brouillon incomplet.
- Search Console, GA4, attribution commerciale et notifications externes sont absents; aucune progression SEO ou acquisition ne peut être conclue.
- Le store est plafonné à **16 Mio**, ce qui ne garantit pas un an de longs articles. Il faut surveiller sa taille, archiver les événements/jobs après export vérifié et préparer une normalisation des versions avant saturation, en maintenant toutes les URL publiées.
- pg_net utilise une file non journalisée. Un redémarrage peut perdre une requête en attente; les prochains réveils et l'idempotence durable portent la reprise. Un lecteur PostgreSQL privilégié de la file peut tenter de relayer la signature à usage unique avant l'envoi légitime; cette course est limitée au même cycle autorisé, sans possibilité de changer le sujet ou de publier un doublon.
- Une cadence à 09:00 est un objectif de déclenchement. Elle n'est pas une garantie à la seconde, d'indexation Google ou d'une année de publication sans interruption.

## P. Statut de production

| Élément | État démontré |
|---|---|
| Modules, endpoints, administration et rendu | Implémentés localement |
| Suite automatisée, réserve, serveur HTTP | Initialement 106/106 sous les deux runtimes; version finale 111/111 PASS sous Node 24.21/tz2026c, lint 73 / zéro erreur |
| Rendu navigateur trilingue et RTL mobile | Recettes locale et production PASS; canonical, FAQ, recherche/catalogues, ancien guide stylé, aucun débordement ni erreur console/CSP |
| Administration navigateur authentifiée | Six onglets production PASS; lecture seule, 31 sujets, 14 prêts / un publié, logout propre, zéro erreur/avertissement |
| Sortie Vercel dist-site sans conflit filesystem | Build corrigé et trois tests fichiers PASS; E6 préproduction 23/23, Dmf préproduction et production 24/24 PASS |
| Collecte Office des Changes/Tamwilcom | Testée sur les sources réelles, gratuite |
| Adaptateurs IA/image/upload | Implémentés et testés avec mocks; aucun appel payant réel |
| Migrations Supabase state + scheduler | Préflight cloud corrigé PASS, appliquées par CLI 2.120.0 |
| CAS durable et seed | Testés sur Supabase réel; initialement trente sujets/quatorze prêts, puis complément importé: trente et un sujets/quinze prêts, re-seed zéro insertion |
| Job Supabase toutes quinze minutes | Actif, job 1, rôle/base postgres, calendrier `*/15 * * * *` restauré; exécution 09:30 réussie sous ce calendrier, capture finale 09:31:52 UTC |
| Secret Vault / secrets serveur Vercel | Installés par canal privé; valeurs absentes de Git et des rapports |
| Déploiement initial / préproduction | READY dpl_2KpzpjQz52hPqMcCr4duGPPULACh; baseline HTTP 200/401 et collecte Vercel réellement vérifiées |
| Candidat avec complément de réserve | dpl_C51MczqsgGMpUcKFCzMHCkUuo3jC: recette du catalogue dynamique en échec, conflit filesystem identifié, candidat non promu |
| Candidat corrigeant le conflit statique | dpl_E6TEgU3SpQ8QGQyhwJTCuVzGpTgh READY; 23 contrôles préproduction PASS; candidat non promu |
| Candidat intégrant les neuf contrôles publics | dpl_DmfgyPJqeVkqnKhS4DwUv7xg7qcf READY; recette préproduction 24/24 PASS |
| Version actuellement promue / libellé 294 guides | HMy READY, promu le 12 octobre vers 09:46 UTC; syntaxe PASS, recette ciblée préproduction 6/6 et production 6/6, script servi conforme à la source corrigée |
| Promotion / URL finales / première publication | Promotion réelle à 09:24 UTC; production 24/24 PASS et rapport quotidien 9/9; un groupe publié, quatorze prêts |
| Conservation des 33 routes historiques | Production HEAD 33/33 PASS à 09:26:50–09:26:53 UTC, sans soumission de formulaire |
| Cron activé et exécution sans Codex | Trois cycles pg_cron réels à 09:27, 09:28 et 09:30 UTC, trois HTTP 200, nonces contrôlés consommés, idempotence conservée; dernier cycle au calendrier permanent |
| Rattrapage des 588 versions / refresh automatique | Non terminé |
| Métriques SEO et alertes externes | Non disponibles dans le runtime connecté |

La livraison locale, la persistance cloud, la promotion, la première publication trilingue publique, le rendu navigateur, la conservation des routes historiques et trois cycles autonomes du scheduler sont prouvés. Les limites de réserve, de sources, de renouvellement, de traduction historique et de métriques restent celles de la section O.
