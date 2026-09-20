# Felexia Conseils

Site Felexia développé dans ce projet, avec reprise page par page de la structure publique du site MyLegal fourni par son propriétaire. Le véritable logo Felexia, le bleu royal `#2446D8` et les coordonnées du cabinet sont conservés. Aucun lien publié ne dirige vers `mylegal.ma` ou `app.mylegal.ma`.

Le build génère **118 pages publiques**, trois pages 404 linguistiques et la redirection racine, soit 122 entrées HTML, auxquelles s’ajoute la 404 générique de l’hébergement. Les pages Felexia existantes restent disponibles en français, anglais et arabe avec RTL. Les nouveaux guides sont en français ; les hreflang ne désignent que des traductions réellement disponibles.

**La publication GitHub, Supabase et Vercel reste à effectuer avec les bons accès.** La version actuelle est développée et vérifiée localement. Le site public existant et son DNS n’ont pas été remplacés.

## Prévisualiser

Prérequis : Node.js 22 ou supérieur et npm. Depuis le dossier du projet :

```powershell
npm ci
npm run build
npm start
```

Ouvrir [l’aperçu français](http://localhost:4173/fr/). Versions anglaise et arabe : `/en/` et `/ar/`.

`npm ci` installe notamment **Cheerio, utilisé uniquement pour construire et vérifier les pages**. Le serveur n’a pas de dépendance d’exécution supplémentaire. Ne pas omettre les dépendances de développement avant le build.

Après modification des contenus, styles ou interactions, relancer `npm run build`, puis actualiser le navigateur. Après modification du serveur, le redémarrer. `npm run dev` effectue un build puis surveille le serveur ; il ne reconstruit pas automatiquement tous les contenus statiques.

Pour utiliser un autre port en PowerShell :

```powershell
$env:PORT = '4175'
npm start
```

## Pages et parcours

- Accueil, création d’entreprise, domiciliation, offres de création et domiciliation sur devis, contact, recrutement et pages légales repris dans le système visuel de la référence.
- Bibliothèque de guides avec pagination réelle et 16 articles importés, sommaires, FAQ natives, copie et partage des liens Felexia.
- Pages du cabinet, expertises, conseil fiscal, conseil en gestion, formalités, investisseurs, formes juridiques et ressources Felexia préexistantes conservées.
- Questionnaire de projet en quatre étapes : validation, retour, récapitulatif et envoi à `/api/contact`.
- Contact, candidature et demande de rendez-vous. Le cabinet confirme le créneau ; aucun calendrier externe n’est simulé. Le CV est envoyé par le candidat à l’adresse e-mail indiquée, sans faux téléversement.
- Page « Mon dossier » pour contacter le cabinet : aucun portail authentifié, paiement ou accès à des documents privés n’est revendiqué.
- Menus ordinateur/mobile, onglets de services, navigation clavier, retour en haut et respect des préférences de mouvement réduit.
- Téléphone du bureau, mobile, WhatsApp, e-mail et carte du cabinet ; activité présentée à l’échelle du Maroc.
- Métadonnées propres aux pages, canonicals, hreflang réels, sitemap de 118 URL publiques, fichiers locaux et anciennes URL conservées.

Les prix, témoignages, certifications, garanties, délais et fonctionnalités du site source ne sont pas présentés automatiquement comme ceux de Felexia. Les textes commerciaux ont été adaptés aux informations disponibles et aux demandes de devis. Les scripts de suivi et le serveur applicatif distant de la référence ne sont pas utilisés.

## Réception des demandes

Le serveur valide les champs, le consentement, l’origine et la taille de la demande. Il possède un champ antipourriel, une limitation des tentatives et des protections contre les doublons. Sans service configuré, il ne prétend jamais avoir transmis la demande : les coordonnées et messages préparés par e-mail ou WhatsApp restent disponibles.

Copier `.env.example` en `.env` pour un serveur local, ou renseigner les variables privées de l’hébergeur. Aucun secret ne doit être versionné ni placé dans `public/` ou `dist/`.

Priorité des modes de réception :

1. **Supabase** : `SUPABASE_URL` et `SUPABASE_SECRET_KEY`, après migration et vérification des droits dans le projet `yxdmkqdnesemaqzagatm`. La confirmation indique un enregistrement en base, pas un e-mail envoyé. Voir [SUPABASE.md](docs/SUPABASE.md).
2. **Webhook du cabinet** : `CONTACT_WEBHOOK_URL` HTTPS et éventuellement `CONTACT_WEBHOOK_TOKEN`. Le service doit enregistrer la demande avant de répondre 2xx et gérer `Idempotency-Key`.
3. **Resend** : `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` sur un domaine vérifié et `CONTACT_TO_EMAIL`.

Pour choisir le webhook ou Resend, laisser vides `SUPABASE_URL`, `SUPABASE_SECRET_KEY` et `SUPABASE_SERVICE_ROLE_KEY`. Une configuration Supabase incomplète est refusée ; elle ne déclenche pas silencieusement une autre destination.

La déduplication Supabase est persistante et n’écrase jamais une demande existante. La limitation des tentatives reste en mémoire par instance : prévoir une protection commune à l’hébergement pour plusieurs instances. N’activer `TRUST_PROXY=1` que derrière un proxy de confiance réécrivant `X-Forwarded-For`.

`SITE_URL` définit l’origine canonique. Les origines Vercel connues de l’environnement sont acceptées ; d’autres origines HTTPS peuvent être déclarées explicitement dans `CONTACT_ALLOWED_ORIGINS`, sans joker.

## Vérifier

```powershell
npm run build
npm run check
npm test
```

Les contrôles couvrent routes, liens, assets, traductions disponibles, logo, absence de destinations MyLegal, formulaires, erreurs, adaptateur Vercel et déduplication Supabase. Les prestataires sont simulés dans les tests : aucune réception cloud réelle n’est ainsi prouvée. Voir [la recette](docs/RECETTE.md).

## Publier

Destinations demandées :

- [GitHub : 360mouqsete-art/felexiaconseils](https://github.com/360mouqsete-art/felexiaconseils).
- [Vercel : espace 360mouqsete-art](https://vercel.com/360mouqsete-art).
- [Supabase : projet yxdmkqdnesemaqzagatm](https://supabase.com/dashboard/project/yxdmkqdnesemaqzagatm).

Le dépôt local est initialisé sur `main` avec l’origine GitHub demandée. Les connexions disponibles n’autorisent pas actuellement la publication : accès GitHub en lecture seule et accès refusé aux cibles Supabase/Vercel. Aucun déploiement cloud réussi n’est revendiqué.

`vercel.json`, `api/contact.js` et le build statique sont préparés. Suivre [la procédure de déploiement](docs/DEPLOIEMENT.md), puis [la migration et la vérification Supabase](docs/SUPABASE.md). La publication sur une URL Vercel et le raccordement DNS du domaine sont deux opérations distinctes.

Un serveur Node reste possible : installer avec `npm ci`, construire, exécuter les contrôles puis `npm start`, avec les variables privées configurées et un proxy HTTPS. Le proxy doit acheminer aussi `/api/contact`. L’hébergement de `dist/` seul ne fournit pas le traitement du formulaire.

Le Dockerfile est fourni, mais aucune construction Docker ni recette du conteneur n’a été effectuée dans cette session.

## Informations extérieures à compléter

- Raison sociale officielle, RC, ICE, IF, directeur de publication et hébergeur : champs isolés dans `src/business-details.mjs`, sans valeur inventée.
- Droits réels des comptes GitHub, Supabase et Vercel ; clés conservées côté serveur.
- Réception d’une demande de contrôle sur le backend déployé, après migration/configuration.
- Modalités de conservation et de traitement des données à valider par le cabinet.

## Modifier le site

| Fichier ou dossier | Rôle |
| --- | --- |
| `src/mylegal-site.mjs` | Import complet, liens locaux, logo et formulaires Felexia |
| `src/reference-content.mjs` | Adaptations commerciales et éditoriales |
| `reference/mylegal/pages-manifest.json` | Inventaire des 27 pages sources |
| `reference/mylegal/pages/` | Sources figées, dont la seconde page des guides |
| `public/mylegal/` | Styles, photos locales et interactions de la refonte |
| `src/content.mjs` | Coordonnées, interface et expertises dans les trois langues |
| `src/editorial.mjs`, `src/pages.mjs`, `src/templates.mjs` | Contenus conservés et génération |
| `src/forms.mjs`, `public/app.js` | Formulaires, traductions, validation et envoi |
| `src/business-details.mjs` | Informations légales officielles à renseigner |
| `src/contact-api.mjs`, `src/supabase-contact.mjs` | Validation et réception serveur |
| `api/contact.js`, `src/vercel-contact.mjs`, `vercel.json` | Fonction et hébergement Vercel |
| `supabase/migrations/` | Schéma privé de réception des demandes |
| `server.mjs` | Prévisualisation et hébergement Node natif |

`dist/` est généré : modifier les sources puis reconstruire. Le détail de la reprise est consigné dans [ACCUEIL-MYLEGAL.md](docs/ACCUEIL-MYLEGAL.md).
