# FELEXIA INTELLIGENCE 360° — audit Guides et SEO

Date de référence : **12 octobre 2026**, Africa/Casablanca. Audit local, réalisé avant les modifications du moteur. Les URL enregistrées sont les canoniques des fichiers locaux ; cet audit ne prouve ni leur disponibilité en production ni leur indexation Google.

## Inventaire exhaustif

L’inventaire structuré `INTELLIGENCE-INVENTAIRE-GUIDES.json` contient une fiche pour chacune des **351 versions linguistiques** trouvées dans `dist/` et un regroupement des **313 sujets**.

| Mesure locale | Résultat |
|---|---:|
| Guides français | 313 |
| Guides anglais | 19 |
| Guides arabes | 19 |
| Sujets sans versions EN et AR | 294 |
| Versions EN/AR manquantes | 588 |
| Guides trilingues avec supplément français non traduit | 6 |
| Entrées du fichier des imports | 300 |
| Destinations nouvelles des imports | 294 |
| Imports fusionnés dans une destination existante | 6 |
| Sources de migration, y compris un alias fusionné | 301 |
| Guides français sans date documentée | 3 |
| Date de vérification documentaire enregistrée | 0 |

Les 19 sujets historiques préexistants sont conservés. Les six destinations enrichies uniquement en français sont `mre-etranger`, `registre-de-commerce-maroc`, `creation-entreprise`, `facturation-electronique-maroc`, `creation-entreprise-rabat` et `creer-une-sarl-maroc`. Leurs routes EN/AR existent, mais leurs suppléments importés ne constituent pas des traductions synchronisées.

Les trois sujets sans date documentée sont `investir-depuis-etranger`, `organiser-gestion-entreprise` et `preparer-creation-entreprise`. Ne pas leur attribuer une date historique inventée.

Les imports portent des dates de publication de **2019-12-05 à 2026-09-08** et, lorsque présentes, des dates de modification de **2026-04-06 à 2026-09-13**. Il s’agit des dates récupérées des sources. Aucun champ n’atteste la première publication Felexia, une vérification fiscale actuelle ou l’approbation par un relecteur autorisé.

## Architecture réellement observée

Le site utilise des modules JavaScript natifs, Node.js ≥ 22 et Cheerio (contrainte déclarée `^1.2.0`). Il produit du HTML statique par `scripts/build.mjs`, sans framework Next.js ni compilateur TypeScript. `src/templates.mjs` assemble les pages de base, `src/mylegal-site.mjs` reprend et localise les références puis applique `src/seo.mjs`, et `src/guides-site.mjs` enrichit les guides et construit les catalogues. Le rendu est effectué au build ; les scripts navigateur améliorent le filtrage et l’interface.

Les corps éditoriaux proviennent de trois ensembles :

- Les captures historiques dans `reference/mylegal/pages/`, utilisées comme références, avec traductions locales indexées par empreinte dans `src/translations/`.
- Les trois guides locaux et leurs variantes FR/EN/AR dans `src/editorial.mjs` ; quatre guides stratégiques reçoivent aussi des textes localisés de `src/seo-content.mjs`.
- Les 300 entrées HTML françaises dans `src/guides-imported.json`. Les auteurs, dates originales, FAQ, empreintes et traces de suppressions sont présents. Les fichiers de migration doivent être préservés.

`src/guide-covers.json` décrit 313 couvertures locales et leurs versions 1280 × 800 / 640 × 400, WebP. Les copies publiques et documents sont dans `public/images/guides/` et `public/documents/`. L’audit a constaté un fichier de couverture présent pour chacune des 351 pages linguistiques. Il ne constitue pas une nouvelle vérification de licence ou de pertinence visuelle.

Les routes réelles suivent `/{fr|en|ar}/guides/{slug}/`. Les anciens guides partagent un slug entre langues ; l’ajout de slugs localisés doit établir une correspondance explicite entre les versions et préserver les chemins historiques. Les catalogues affichent toutes les cartes dans le HTML, avec recherche et filtres progressifs dans `public/guides.js`. La pagination historique est supprimée au rendu et redirigée par le serveur.

Il n’existe pas de CMS éditorial ou d’administration des guides identifié dans ce circuit. Leur création/modification passe par les sources du dépôt et un nouveau build. La collecte historique n’est pas un moteur quotidien autonome. La vérification de migration `qa-results.json` porte l’état historique `TERMINÉ` ; elle ne démontre pas la qualité réglementaire actuelle.

## SEO présent et limites

Chaque guide reçoit canonical, Open Graph, Twitter, Article, BreadcrumbList, FAQ visible lorsque présente, sommaire et trois articles associés. Les hreflang existants n’inventent pas les versions absentes : 294 guides français ont uniquement FR et x-default. Les 19 sujets trilingues sont réciproques. L’audit local des 351 fiches n’a trouvé aucun problème de cible ou de réciprocité hreflang, ni de couverture absente. Les pages arabes déclarent `dir="rtl"`.

Le sitemap est produit au build à partir des routes canoniques indexables. Les équivalences y reposent actuellement sur le même slug. Les `lastmod` sont définis uniquement pour les quelques routes présentes dans `revisedSlugs`, avec la date éditoriale locale ; les autres guides n’y exposent pas automatiquement leur dernière révision individuelle. Un sujet publié depuis une base persistante doit donc être ajouté à la fois au rendu serveur du catalogue, à sa page et au sitemap, ou déclencher un nouveau build vérifiable.

Le catalogue affiche les dates originales comme « Publié le ». Cette provenance doit être distinguée de la date de publication réelle d’un nouveau sujet Felexia. Les dates des nouvelles pages, leur date de vérification et une éventuelle validation humaine doivent être séparées. Le schéma historique attribue l’article à l’organisation Felexia tandis que les imports affichent un crédit de texte original ; conserver une attribution honnête, sans prétendre qu’un expert Felexia a revu un contenu sans preuve.

## Qualité apparente et risques documentaires

Aucun import ne possède de champs `verifiedAt`, `risk`, d’approbation ou de matrice d’affirmations. Une source privée ou une date de modification récente ne suffisent pas à valider une règle fiscale. Les traces de migration démontrent une provenance et une conservation du texte ; elles ne démontrent pas la validité actuelle des taux, délais, pénalités ou conditions.

Le nombre de mots du corps français varie de 147 à 5 965 dans le HTML inspecté. Six pages comptent moins de 300 mots : les trois guides locaux cités ci-dessus, `convention-fiscale-maroc-espagne-double-imposition`, `plan-comptable-maroc-pdf` et `tenue-de-comptabilite`. C’est un indice de profondeur à examiner selon l’intention, pas un verdict automatique. Les liens institutionnels candidats sont consignés dans l’inventaire par une liste explicite de domaines institutionnels. Leur présence n’atteste aucune vérification ou disponibilité actuelle ; leur absence ne prouve pas l’absence de tout document utile.

Aucun titre français strictement identique et aucune empreinte du corps français strictement identique n’ont été trouvés. Des intentions proches demandent une analyse éditoriale :

- `calcul-de-limpot-sur-les-societes`, `calcul-de-lis`, `calcul-impot-societes-bareme-progressif`.
- `comptabilite-au-maroc` et `tenue-de-comptabilite`.
- `retenue-a-la-source-sur-dividendes-au-maroc` et `taux-de-retenue-a-la-source-sur-dividendes`.
- `cotisations-cnss-2026-taux-assiettes` et `cotisations-cnss-maroc-2026`.
- `plan-comptable-maroc-pdf` et `plan-comptable-marocain-pcge`.
- `expert-comptable-au-maroc` et `expert-comptable-casablanca`.
- `fiscalite-de-lindemnite-de-licenciement-au-maroc` et `indemnite-de-licenciement-au-maroc`.

Les articles de lois de finances 2025 et 2026, ou les exonérations des articles 91 et 92, ne doivent pas être fusionnés sur une simple similarité lexicale : période et portée font partie de l’intention. Aucune consolidation, suppression ou redirection n’a été effectuée lors de cet audit.

## Intégration recommandée

Conserver le renderer, les styles, les assets, les captures et les URL historiques. Ajouter un module éditorial persistant et des rendus complémentaires aux trois rubriques existantes. Une publication doit être atomique au niveau du sujet trilingue, idempotente par jour local et traçable dans les jobs. Toute action de publication doit passer par le même quality gate serveur ; une interface d’administration seule ne suffit pas à protéger les données.

Créer une clé de groupe indépendante du slug et des localisations ayant leur propre slug. Pour les historiques, enregistrer les chemins originaux et une provenance `legacy`, sans les approuver automatiquement. Les 294 sujets sans EN/AR constituent 588 versions à rattraper ; les six suppléments FR constituent une autre tâche de synchronisation. Maintenir les files « nouveaux sujets », « rattrapage » et « corrections urgentes » séparées.

Les liens associés existants sont scorés par catégorie et mots du titre. Ce mécanisme peut être conservé pour l’historique. Les nouvelles localisations doivent recevoir des liens locaux réellement existants et des correspondances de prestations ; pour l’arabe, la tokenisation latine existante ne suffit pas au choix sémantique des associations.

Le sitemap du moteur doit fusionner les routes publiées et leurs équivalences explicites avec le sitemap statique, sans inventer de pages ni de date de modification. Les contenus externes et textes du modèle sont non fiables : échapper le texte, limiter les URL et produire du HTML à partir de blocs structurés plutôt que publier un champ HTML libre.

## Préservation et preuve

Au début de l’audit, plusieurs fichiers applicatifs étaient déjà modifiés et les fichiers de migration des guides non suivis par Git. Ils constituent le travail antérieur de l’utilisateur : aucune restauration, suppression ou réécriture n’a été effectuée. Cet audit a uniquement créé les deux fichiers `docs/INTELLIGENCE-AUDIT-GUIDES.md` et `docs/INTELLIGENCE-INVENTAIRE-GUIDES.json`.

L’inspection a lu les fichiers statiques existants. Elle n’a pas relancé `renderSite()` car `renderReferenceSite()` écrit lui-même `public/mylegal/site-inline.css`, ce qui dépasserait le périmètre de lecture de l’audit. Les tests de publication serveur, les vérifications navigateur mobile et les réponses HTTP publiques restent des étapes d’acceptation du moteur à exécuter après intégration.
