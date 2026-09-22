# Audit SEO Felexia Conseils — 22 septembre 2026

Périmètre : dépôt local, HTML généré dans les trois langues, formulaires existants, réponses HTTP publiques et configuration Vercel en lecture seule. Aucun accès Search Console, GA4, données de classement ou Google Business Profile n’a été utilisé. État initial Git propre, commit `ba8b77e`. Aucun changement DNS, d’offre ou de framework.

## Problèmes critiques

| Fichier / route | Problème et impact | Correction / statut |
|---|---|---|
| `src/content.mjs`, toutes les routes | Canonical sans www alors que Vercel redirige vers www : signaux contradictoires. | Corrigé par `src/site-origin.mjs`. L’ancienne valeur SITE_URL est normalisée pour ce domaine exact. Les domaines personnalisés de test restent configurables. |
| `src/contact-api.mjs`, `/api/contact` | Une origine publique passée à www pouvait être refusée si SITE_URL restait sans www. | Ajout du domaine canonique exact à la liste autorisée. Aucun wildcard. Test POST avec www et conservation du rejet des origines tierces. |
| `src/mylegal-site.mjs`, pages traduites | JSON-LD limité à un bloc entreprise ; pas de description structurée propre au guide ni de fil d’Ariane. | Bloc existant remplacé par un graphe unique dans `src/seo.mjs`, construit à partir du contenu final traduit. |
| `scripts/build.mjs`, sitemap | Pages techniques et doubles URLs légales incluses. | Exclusion des noindex et des pages dont le canonical vise une autre URL. 150 URLs indexables, sans suppression des pages accessibles. |
| Guides prioritaires | Promesses héritées de délais, de signature électronique ou d’absence de déplacement ; risque de contenu trompeur. | Quatre articles réécrits en FR/EN/AR ; limites des démarches à distance explicites ; aucun taux, coût officiel ou délai administratif inventé. |
| Autres guides importés | Plusieurs affirmations juridiques/fiscales datées n’ont pas de preuve actuelle suffisante. | À VÉRIFIER avant promotion de ces articles : voir liste ci-dessous. Aucune certification de conformité juridique complète n’est donnée par cet audit SEO. |

### Réserves éditoriales restantes, à faire valider

Sources concernées : `reference/mylegal/pages/`, adaptations `src/reference-content.mjs`, traductions `src/translations/`.

- `/fr/guides/facturation-electronique-maroc/` : calendrier 2026, format UBL, entreprises visées et sanctions. Les recherches réalisées n’établissent pas ces affirmations ; demander une source DGI datée avant de les utiliser commercialement. Même réserve pour les traductions et cartes du catalogue qui reprennent ce sujet.
- `/fr/guides/auto-entrepreneur-vs-sarlau/`, `/fr/guides/sarl-sarl-au/` : seuils, taux et régimes fiscaux à vérifier avec les textes en vigueur.
- `/fr/guides/certificat-negatif-maroc/`, `/fr/guides/registre-de-commerce-maroc/`, `/fr/guides/ice-identifiant-commun-entreprise-maroc/` : frais, délais, pièces et procédures cités à revalider auprès de l’OMPIC et des organismes compétents.
- `/fr/guides/nom-commercial-enseigne-et-marque/`, `/fr/guides/filiale-ou-succursale-maroc/` : portée des droits, durée de protection et obligations à faire relire.
- Les guides Casablanca et Rabat existent déjà : ils sont conservés, mais leur contenu national très similaire mérite une revue éditoriale spécifique. Aucune nouvelle page de ville n’a été créée. Ne pas y revendiquer de bureau Felexia.

Les anciennes dates des guides non révisés ont été retirées : une date du site source n’est pas une preuve de publication par Felexia. Le 22 septembre 2026 n’est affiché que sur les quatre guides réellement réécrits. Leur auteur éditorial reste Felexia Conseils ; aucun expert, diplôme ou contrôle humain fictif n’est ajouté.

## Opportunités importantes

| Fichier / route | Problème et impact | Correction / recommandation |
|---|---|---|
| `src/seo-content.mjs`, `/fr/creation-entreprise/` | H1 initial « Lancez votre entreprise avec facilité » trop vague, contenu de décision incomplet. | Title demandé, H1 explicite, introduction, documents, structures, distance, budget, délais, étranger et suivi ajoutés. |
| Quatre guides prioritaires | Intention commerciale trop répétée ; risque de concurrence avec la page service. | Titres et contenu informationnels distincts, un maillage vers la page commerciale et les tarifs. |
| `/fr/tarif/creation/` | Devis présents mais peu d’explication du budget. | Distinction honoraires/frais/capital, inclusions et exclusions à vérifier ; trois packs conservés. |
| `/fr/contact/` | Implantation réelle peu exploitée pour l’intention locale. | Section Marrakech utile, adresse exacte, rendez-vous à confirmer, accueil et échanges à distance. Pas de page locale dupliquée. |
| `/fr/legal/`, `/fr/privacy/`, `/fr/terms/` | Contenu légal identique aux aliases issus de la refonte. | Canonicals respectifs vers mentions-legales, politique-confidentialite, cgu ; URLs conservées, sitemap nettoyé. |
| Guides historiques `preparer-creation-entreprise`, `investir-depuis-etranger` | Chevauchement thématique avec les nouveaux guides, sans preuve de cannibalisation dans Google. | Garder leur rôle de préparation/checklist ; ne pas fusionner sans données Search Console. |

## Optimisations secondaires

- `src/seo.mjs` : Open Graph et Twitter cohérents par page, images absolues, liens hreflang réciproques, x-default FR ; breadcrumbs visibles et Schema correspondants.
- `src/image-dimensions.json` : dimensions réelles des images locales plutôt que valeurs génériques 1200 × 800.
- `scripts/prepare-seo-images.mjs` : dérivés WebP plus légers ; originaux conservés. Outil de maintenance facultatif, aucune dépendance supplémentaire au build de production.
- Images secondaires lazy ; aucune priorité haute sur les logos sous le premier écran de l’accueil.
- `public/seo.css` : uniquement lisibilité des ajouts, styles jour/nuit et RTL ; identité, menus et cartes conservés.
- Aucun outil analytics détecté : ne pas ajouter un deuxième système ou injecter une clé fictive. Plan de mesure fourni séparément.
- Core Web Vitals terrain non mesurés ici : aucune promesse de LCP/INP/CLS atteints. Utiliser Search Console et PageSpeed après publication.

## Éléments déjà correctement implémentés

- Génération HTML statique Node/Cheerio, sans hydratation React ni dépendance runtime ; aucune migration nécessaire.
- Routes FR/EN/AR cohérentes, RTL réel et sélecteur vers la même page.
- Police locale, ressources locales, compression Brotli/gzip, site sans scripts tiers obligatoires.
- Formulaires partagés, consentement, validation, limite de débit, idempotence, protection des origines et stockage serveur existant.
- Packs sur devis, coordonnées réelles, WhatsApp mobile ; pas d’avis clients ou de chiffres inventés.
- 404 HTTP réelle pour une URL absente, accès aux sources serveur bloqué.
- Vercel : domaine www vérifié, apex redirigé en 308 ; HTTPS géré par la plateforme. Le passage HTTP apex → HTTPS apex → HTTPS www comporte deux sauts imposés par la configuration observée. Rien n’a été changé : pas de boucle, pas de changement de DNS. Les liens générés visent directement HTTPS www.

## Sources de référence consultées

- [Google — canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google — versions linguistiques](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google — données structurées](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Google — Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [OMPIC — création et vie de l’entreprise](https://www.ompic.ma/en/content/creation-and-business-life) : référence aux formes et à la SARL à associé unique ; aucune reprise de barème non vérifié.
- [DirectEntreprise — guichet OMPIC](https://directentreprise-guichet.sys.ompic.ma/)
- [Office des Changes — investissement étranger](https://www.oc.gov.ma/fr/etrangers-non-residents/realisation-de-l-investissement-etranger-au-maroc) : convertibilité conditionnelle, sans garantie de transfert automatique.
