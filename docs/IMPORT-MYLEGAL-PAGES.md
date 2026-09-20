# Capture des pages publiques MyLegal

Capture du 20 septembre 2026, pour la reprise demandée par le propriétaire des deux sites. Les captures sont des sources de référence : elles ne doivent pas être publiées directement, car elles contiennent les coordonnées, scripts, liens externes et informations commerciales du site d'origine.

## Périmètre capturé

Le sitemap annonce 24 URL. Le parcours des liens publics ajoute les trois pages légales. Les 27 pages ont répondu HTTP 200 :

- `/`
- `/creation-entreprise`
- `/domiciliation`
- `/tarif/creation`
- `/tarif/domiciliation`
- `/guides`
- `/contact`
- `/rejoignez-nous`
- `/mentions-legales`
- `/politique-confidentialite`
- `/cgu`
- `/guides/facturation-electronique-maroc`
- `/guides/creation-entreprise-rabat`
- `/guides/cabinet-comptable-casablanca`
- `/guides/registre-de-commerce-maroc`
- `/guides/certificat-negatif-maroc`
- `/guides/creer-une-sarl-maroc`
- `/guides/ice-identifiant-commun-entreprise-maroc`
- `/guides/filiale-ou-succursale-maroc`
- `/guides/creation-societe-casablanca`
- `/guides/creation-entreprise`
- `/guides/nom-commercial-enseigne-et-marque`
- `/guides/fiduciaire-maroc`
- `/guides/sarl-sarl-au`
- `/guides/auto-entrepreneur-vs-sarlau`
- `/guides/mre-etranger`
- `/guides/creation-entreprise-en-ligne`

Les espaces privés sur `app.mylegal.ma`, les API, l'administration et les sites tiers ne sont pas parcourus. Les liens observés vers ces destinations sont consignés dans le manifeste pour être remplacés lors de l'intégration Felexia.

## Fichiers et reproduction

Depuis la racine du projet :

```sh
node scripts/fetch-mylegal-pages.mjs
node scripts/optimize-mylegal-assets.mjs
```

Le premier script capture uniquement HTML, images, CSS et polices, avec au plus quatre pages ou six ressources téléchargées simultanément. Aucun JavaScript distant n'est exécuté. Le second script utilise Sharp, disponible dans l'environnement de développement Codex, pour réduire les nouvelles grandes images à 1280 pixels maximum en WebP qualité 86. Sharp n'est requis ni par le site ni par son build de production.

- `reference/mylegal/pages/` : 27 captures HTML.
- `reference/mylegal/pages-manifest.json` : routes, fichiers, états HTTP, titres, liens, niveaux de titres, boutons et champs de formulaires.
- `reference/mylegal/pages-assets.json` : ressources et correspondances URL distante → fichier local. Sa propriété `urlMap` inclut aussi les correspondances de l'ancienne capture de l'accueil.
- `reference/mylegal/assets.json` : ancien manifeste conservé intact.
- `reference/mylegal/original-assets/` : originaux des images compressées, hors dossier public.
- `public/mylegal/` : ressources locales destinées au générateur.

Résultat initial : 447 références de ressources, 27 fichiers additionnels, aucun téléchargement échoué. Dix-neuf grandes images ont été compressées, économisant 36 049 671 octets. Toutes les nouvelles images compatibles ont leurs dimensions consignées.

## Points d'intégration

- Les FAQ utilisent les éléments HTML natifs `details` / `summary` : six questions sur la création, cinq sur la domiciliation et quatre à treize par guide.
- Le contact repose dans la source sur une action Next.js privée. Son formulaire doit être relié au traitement Felexia : nom, courriel, téléphone, sujet, message et consentement.
- Le bouton « Envoyer mon profil » de la page recrutement dépend d'un dialogue JavaScript : il doit être remplacé par un parcours Felexia utilisable.
- Les cartes de contact et domiciliation pointent sur les anciens bureaux de Casablanca ; elles doivent recevoir l'adresse Felexia confirmée par l'utilisateur.
- Les deux nouvelles photographies de domiciliation `2026-02-Artboarxd-1-scaled.webp` et `2026-02-Artboarxd-1-copy-5-scaled.webp` montrent une enseigne MyLegal. Utiliser à leur place une photographie Felexia appropriée ou une adaptation validée.
- Les favicons, logos, téléphones, WhatsApp, adresses électroniques, liens sociaux, avis et liens applicatifs du site source doivent être adaptés, et aucune revendication commerciale non vérifiée ne doit être attribuée à Felexia.
- Les scripts de suivi, hydratation Next.js, actions serveur et données d'application de la capture ne doivent pas être exécutés dans Felexia.
