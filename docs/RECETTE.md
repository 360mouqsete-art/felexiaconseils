# Recette locale — 20 septembre 2026

Cette recette concerne la refonte étendue aux pages publiques de MyLegal, intégrées sous l’identité Felexia. Elle ne constitue pas une validation d’un déploiement cloud.

## Construction et contrôles

Environnement : Windows et Node.js 26.1.0. Cheerio est une dépendance de développement nécessaire à l’import et aux tests ; le serveur n’a aucune dépendance d’exécution supplémentaire.

```powershell
npm ci
npm run build
npm run check
npm test
```

État généré :

- 122 entrées HTML : 118 pages publiques, trois 404 linguistiques et la redirection racine ; une 404 générique supplémentaire est fournie à l’hébergeur.
- 121 routes linguistiques contrôlables en local et 33 anciennes URL préservées.
- Sitemap de 118 URL publiques, sans les pages 404.
- 27 pages sources importées et seconde page de la bibliothèque ; les 16 articles ont des URL locales distinctes.
- Pages Felexia EN/AR conservées et mise en page arabe RTL. Les nouveaux articles sont français uniquement : aucune traduction inexistante n’est annoncée dans les hreflang.
- Polices, photos et scripts hébergés localement ; versions Brotli et gzip générées.

Les contrôles automatiques vérifient titres, H1, descriptions, canonicals, alternates disponibles, liens internes, ancres, images et assets. Ils vérifient également les réponses HTTP des routes, la 404, les anciennes URL et la décompression Brotli/gzip.

## Tests de la refonte

La suite `tests/reference-site.test.mjs` vérifie notamment :

- Présence locale de chaque page importée, avec sa propre canonique.
- Absence de destination `mylegal.ma` ou `app.mylegal.ma` dans les liens, formulaires, scripts et styles publiés, y compris les URL encodées.
- Véritable logo Felexia dans les en-têtes et pieds de page français.
- Sommaires et ancres des guides menant à des sections existantes.
- Pagination des guides : seconde liste distincte et retour fonctionnel.
- Formulaires de contact, projet, rendez-vous et candidature utilisant `/api/contact`, sans ancienne action serveur Next.js.
- Métadonnées de partage correspondant au contenu de leur page.

## Tests de réception

Les suites serveur et Vercel couvrent champs obligatoires, consentement, dates de rendez-vous, formats invalides, limites de taille, contrôle d’origine, piège antipourriel, limitation des tentatives et UTF-8 arabe. Elles vérifient également les erreurs de configuration/prestataire, l’absence de faux succès, les reprises et l’adaptation du corps de requête Vercel.

Les tests de l’adaptateur Supabase ont réussi localement avec des réponses REST simulées :

- Insertion des seuls champs attendus, clé conservée côté serveur.
- Reprise identique conservant sa référence, y compris après perte de la réponse réseau.
- Requêtes concurrentes ne créant qu’un enregistrement dans la simulation.
- Refus d’un identifiant réutilisé avec un contenu différent, sans écrasement.
- Refus des clés publiques, configurations incomplètes, URL non sécurisées et payloads invalides.
- Compatibilité de la clé secrète moderne et de l’ancienne clé JWT `service_role`.
- Réponses incorrectes ou erreurs du prestataire jamais considérées comme une livraison.

Ces tests ne se connectent pas au projet cloud. Aucun message n’a été envoyé au cabinet ni à un tiers par les tests automatisés. La limitation locale est par instance ; elle ne constitue pas une protection distribuée.

## Interactions et contrôle visuel

Menus, onglets de services, fermeture par Échap, navigation clavier et comportement mobile ont été contrôlés au cours des itérations de l’accueil. Les parcours projet, contact, rendez-vous et secours e-mail/WhatsApp ont également été exercés localement, notamment en anglais et arabe. Ces vérifications ont servi à corriger les menus et les débordements initiaux.

Pour la reprise étendue page par page, compléter la recette visuelle sur l’aperçu reconstruit : accueil, création, domiciliation, tarifs, guides et pagination, article, contact, candidature, questionnaire, rendez-vous, « Mon dossier » et pages légales. Contrôler ordinateur, tablette et mobile, puis les versions EN/AR conservées. Les tests automatiques ne remplacent pas cette observation visuelle.

Les FAQ importées utilisent `details`/`summary`. La copie et le partage renseignent le lien Felexia courant. La candidature propose un formulaire local et l’envoi du CV par e-mail, sans prétendre disposer d’un téléversement. « Mon dossier » permet de contacter le cabinet, sans simuler une connexion privée.

Aucun score Lighthouse, audit WCAG exhaustif, test de charge ou recette de navigateur cloud n’est revendiqué.

## Vérifications extérieures restantes

- **GitHub** : dépôt local `main` et origine configurés ; publication à confirmer avec un compte autorisé à pousser vers `360mouqsete-art/felexiaconseils`.
- **Supabase** : schéma et adaptateur préparés, mais migration non appliquée au projet `yxdmkqdnesemaqzagatm`. RLS, advisors et enregistrement réel à vérifier après accès.
- **Vercel** : configuration et adaptateur testés localement ; aucun déploiement confirmé dans l’espace `360mouqsete-art`.
- **Réception réelle** : vérifier une demande de contrôle et sa reprise sur le backend configuré, puis confirmer sa présence sans doublon.
- **Domaine et HTTPS** : aucune bascule DNS ni substitution du site public réalisée.
- **Docker** : fichier fourni, construction et lancement non exécutés.
- **Cabinet** : identité légale officielle, hébergeur et modalités de conservation à renseigner/valider.

Procédures : [déploiement](DEPLOIEMENT.md) et [Supabase](SUPABASE.md).

## Recette finale du 20 septembre 2026

- Build : 122 entrées HTML, 121 pages linguistiques dont 3 erreurs 404, 118 URL dans le sitemap.
- 37 tests Node réussis, dont API contact, origines Vercel, stockage Supabase simulé et conservation des demandes.
- Contrôle statique : 6 392 liens/ressources locaux, 618 images, titres uniques, hreflang valides et RTL.
- Navigation réelle : accueil 390 px et logo, menu mobile, guides pages 1 et 2, wizard 4 étapes jusqu’au récapitulatif puis réponse 503 honnête avec e-mail/WhatsApp corrects, FAQ domiciliation 820 px, offres et cabinet 1440 px, contact arabe RTL. Aucun débordement horizontal sur les vues inspectées.
- Les flux réels GitHub/Supabase/Vercel restent bloqués par les accès des comptes connectés. Aucun déploiement, SQL cloud ni envoi d’e-mail réel revendiqué.

Le menu Tarifs a aussi été vérifié au clic et au clavier (Échap), et le bouton de copie d’un guide confirme la copie de son URL Felexia. Aucun avertissement ni erreur de script dans le dernier contrôle navigateur.
