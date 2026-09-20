# Déploiement Felexia Conseils

## Destinations demandées

- Dépôt : `https://github.com/360mouqsete-art/felexiaconseils.git`
- Espace Vercel : `360mouqsete-art`
- Projet Supabase existant : `yxdmkqdnesemaqzagatm`
- Compte de connexion indiqué : `360mouqsete@gmail.com`

## État réel au 20 septembre 2026

- Vercel connecté au compte `360mouqsete-art`, projet `felexiaconseils` créé et publié en production : https://felexiaconseils.vercel.app.
- Dernier déploiement vérifié : `dpl_EEaeptzmCPo3x9ptMyBJ4DtQEW8Q`, état `READY`, source `aeb5a8c`, construction distante réussie en 6 secondes avec Node 24.x.
- Variables `SITE_URL=https://felexiaconseils.com` et `TRUST_PROXY=1` configurées sur Production et Preview. Les domaines système Vercel sont autorisés par le gestionnaire de formulaire.
- GitHub : dépôt configuré mais push refusé avec les identifiants précédents ; connexion au compte `360mouqsete-art` en attente. La connexion Git automatique Vercel a également été refusée. Aucun push confirmé.
- Supabase : connecteur sans accès au projet demandé ; connexion au compte propriétaire en attente. Aucune migration cloud appliquée et aucune clé Supabase installée sur Vercel.
- DNS du domaine `felexiaconseils.com` inchangé. L’adresse Vercel est opérationnelle ; aucun basculement du domaine principal n’est annoncé.
- Contrôles cloud détaillés dans `docs/RECETTE-VERCEL.md`. Le formulaire valide les données et répond `503 not_configured` pour une demande valide tant que Supabase ou un autre fournisseur n’est pas installé ; aucun succès de livraison n’est simulé.

La construction locale Vercel échoue sous cet environnement Windows (`spawn cmd.exe ENOENT`). La construction distante Vercel est l’alternative effectivement validée. Après authentification et configuration : `npx vercel deploy --prod --yes --scope 360mouqsete-art`.

## Architecture Vercel

`vercel.json` utilise le preset **Other**, construit les pages avec `npm run build` et publie uniquement `dist/` comme contenu statique. `api/contact.js` est une fonction Node distincte, qui partage la validation et la livraison du serveur local. Aucune dépendance d’exécution supplémentaire n’est nécessaire.

L’adaptateur `src/vercel-contact.mjs` prend en charge le flux Node brut et le `request.body` déjà interprété par Vercel. Il garde la limite de 16 Ko, les caractères arabes, les réponses d’erreur et la déduplication du gestionnaire existant. Les contrôles sont couverts par `node --test tests/vercel.test.mjs` ; les fournisseurs de livraison sont simulés et aucun message n’est envoyé pendant ces tests.

La racine redirige en 302 vers `/fr/`. Les routes FR/EN/AR sans barre finale redirigent en 308 vers leur version canonique. Les 33 anciennes URL restent servies. Les 27 chemins de la référence importée sont accessibles sans préfixe linguistique et redirigent vers les pages françaises correspondantes : `/creation-entreprise`, `/tarif/creation`, `/guides/:slug`, etc. Les variantes avec barre finale sont également couvertes, sans boucle.

`/api/contact` ne reçoit aucune redirection. `/api/contact/` est une réécriture interne vers la même fonction. Les erreurs statiques utilisent `dist/404.html` sur Vercel ; le serveur local fournit aussi des erreurs localisées.

## Vérification locale

```powershell
npm ci
npm run build
npm test
npm run check
npm start
```

Aperçu : `http://localhost:4173/fr/`.

## Connexion et publication

Depuis la racine du projet, utiliser la CLI Vercel après vérification de sa version et de l’aide disponible :

```powershell
npx vercel --version
npx vercel login
npx vercel whoami
npx vercel link --scope 360mouqsete-art
npx vercel pull --environment=preview --scope 360mouqsete-art
npx vercel build
npx vercel deploy --prebuilt --scope 360mouqsete-art
```

Choisir le projet Felexia correspondant au dépôt indiqué, puis vérifier `.vercel/project.json`. Conserver `.vercel/`, `.env`, les variantes locales des fichiers d’environnement et les clés hors du dépôt Git. Ne jamais mettre un secret dans `public/`, `dist/`, une commande enregistrée ou un message de discussion.

Après recette de l’aperçu, la publication de production utilise :

```powershell
npx vercel pull --environment=production --scope 360mouqsete-art
npx vercel build --prod
npx vercel deploy --prebuilt --prod --scope 360mouqsete-art
```

Vérifier ensuite les pages, les anciennes URL, les fichiers statiques, la 404 et le formulaire sur l’URL réellement publiée. Utiliser `vercel curl` pour un aperçu protégé au lieu de désactiver sa protection. Le raccordement DNS de `felexiaconseils.com` reste distinct du premier déploiement `vercel.app`.

## Configuration du formulaire

Dans les variables d’environnement Vercel, choisir les environnements Preview et Production concernés :

- `SITE_URL` : origine HTTPS canonique. Sous Vercel, les domaines exacts des variables système `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL` et `VERCEL_BRANCH_URL` sont aussi autorisés. Pour d’autres domaines, `CONTACT_ALLOWED_ORIGINS` accepte une liste HTTPS explicite, sans joker.
- `NODE_ENV=production` et `TRUST_PROXY=1` sur Vercel.
- Stockage Supabase prioritaire : `SUPABASE_URL=https://yxdmkqdnesemaqzagatm.supabase.co` et `SUPABASE_SECRET_KEY`, après application de la migration documentée dans `docs/SUPABASE.md`. La clé reste exclusivement côté serveur. La réception est enregistrée en base ; aucun e-mail de notification n’est simulé.
- Alternatives : vider les variables Supabase puis utiliser soit `CONTACT_WEBHOOK_URL` HTTPS et éventuellement `CONTACT_WEBHOOK_TOKEN`, soit `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` et `CONTACT_TO_EMAIL=hadigui.aziz@gmail.com`.

Sans fournisseur configuré, le formulaire répond honnêtement `503 not_configured` et propose les coordonnées directes. Le connecteur Supabase est implémenté et testé avec un fournisseur simulé ; la migration et la réception réelle restent à vérifier dans le projet existant après connexion au compte autorisé.

La déduplication Supabase est persistante et conserve le premier contenu reçu pour chaque identifiant de demande. La limitation de débit reste en mémoire d’instance ; configurer une protection globale au niveau de Vercel pour une limite partagée entre instances.

## Références techniques vérifiées

- [Fonctions Node Vercel, requête brute et `request.body`](https://vercel.com/docs/functions/runtimes/node-js).
- [Configuration statique `vercel.json`](https://vercel.com/docs/project-configuration/vercel-json).
- [Configuration avancée Node et désactivation facultative des helpers](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration).
