# Reprise du site public MyLegal dans Felexia

Le propriétaire a demandé d’abord une reprise de l’accueil, puis une reprise **page par page**, avec son ancien logo Felexia et aucun lien dirigeant vers MyLegal. Cette seconde demande remplace le périmètre limité à l’accueil décrit dans la première version de ce document.

## Périmètre actuel

- 27 pages sources publiques inventoriées dans `reference/mylegal/pages-manifest.json`, auxquelles s’ajoute la seconde page de la bibliothèque de guides.
- Accueil, création d’entreprise, domiciliation, tarifs création/domiciliation, bibliothèque, 16 articles, contact, recrutement et pages légales accessibles localement sous `/fr/`.
- Pages de services, cabinet, formes juridiques, FAQ, projet et rendez-vous Felexia préexistantes conservées. Les pages françaises complémentaires utilisent la navigation et l’identité de la refonte.
- Versions anglaise et arabe existantes maintenues, avec RTL réel en arabe. Les nouveaux articles sont français ; les hreflang reflètent les seules traductions présentes.
- Accès « Mon dossier » menant à une page locale de contact et d’information, sans faux espace client authentifié.

Les chemins publics de la référence sont mappés vers leur équivalent français local, y compris `/fr/guides/page/2/`. Les demandes de création vont à `/fr/create/`. Les anciens liens de connexion sont remplacés par « Mon dossier ». Les réseaux sociaux du site source ne sont pas attribués à Felexia.

## Identité et coordonnées

Le véritable fichier `public/assets/logo-original.png` est utilisé, sans emblème MyLegal substitué. Le bleu ciel de la référence est remplacé par le bleu royal `#2446D8`, avec ses déclinaisons pâles et les contrastes adaptés.

Coordonnées confirmées par le propriétaire :

- Résidence Al Ihssane, Immeuble 3, Appartement 4, Mabrouka, Marrakech, Maroc.
- Bureau : +212 520 825 825.
- Mobile : +212 661 080 862.
- WhatsApp : +212 661 400 352.
- E-mail : hadigui.aziz@gmail.com.

L’adresse désigne le cabinet ; l’accompagnement est présenté pour tout le Maroc. Les cartes externes utilisent cette adresse.

## Contenus adaptés

Structure, hiérarchie visuelle et richesse des pages publiques servent de référence. Les textes sont adaptés au cabinet réel : tarifs sur devis lorsque les prix Felexia ne sont pas confirmés, suppression des preuves sociales non justifiées, des garanties et délais non vérifiés, et des promesses de fonctionnalités logicielles inexistantes.

Aucun paiement, signature électronique, portail de documents privés ou suivi automatisé n’est simulé. Les pages légales utilisent les contenus Felexia et les champs d’identité officielle à compléter. Le recrutement n’invente pas de poste ouvert ; il permet de présenter un profil et d’envoyer le CV par e-mail.

## Implémentation

- Sources HTML figées : `reference/mylegal/pages/` ; inventaires d’assets : `reference/mylegal/assets.json` et `reference/mylegal/pages-assets.json`.
- Import complet utilisé au build : `src/mylegal-site.mjs`, avec Cheerio en dépendance de développement.
- Adaptations éditoriales : `src/reference-content.mjs`.
- Photos, polices et styles locaux dans `public/mylegal/`. La photo du bureau a été adaptée pour remplacer l’enseigne et son reflet par Felexia ; sa provenance est consignée dans le manifeste d’assets.
- `public/mylegal/home.js` : menus, trois panneaux de services, clavier, en-tête flottant et retour en haut.
- `public/mylegal/pages.js` : copie et partage des guides avec l’URL Felexia courante.
- FAQ en accordéons natifs ; pagination par véritables pages locales.
- Formulaires issus de `src/forms.mjs`, styles isolés dans `public/mylegal/forms.css`, interactions et validation dans `public/app.js`.
- Réception partagée par le serveur Node et la fonction Vercel. Adaptateur Supabase serveur intégré, activable après configuration et migration.

Les scripts de suivi et le moteur Next.js distant ne sont pas exécutés. Les fichiers de l’ancienne importation limitée à l’accueil sont conservés comme historique ; `src/mylegal-site.mjs` assure désormais la reprise complète lors du build.

## Vérification et prévisualisation

Les tests locaux vérifient chaque page importée, le logo, les destinations des liens, les ancres, la pagination, les formulaires et les métadonnées. Le sitemap contient 118 pages publiques ; voir [RECETTE.md](RECETTE.md) pour le détail et les limites des vérifications.

```powershell
npm ci
npm run build
npm run check
npm test
npm start
```

Ouvrir [l’aperçu Felexia](http://localhost:4173/fr/).

La préparation GitHub/Supabase/Vercel est documentée dans [DEPLOIEMENT.md](DEPLOIEMENT.md) et [SUPABASE.md](SUPABASE.md). Aucun déploiement cloud ni changement du domaine public n’est confirmé à ce stade : les accès disponibles n’autorisent pas les destinations fournies par le propriétaire.
