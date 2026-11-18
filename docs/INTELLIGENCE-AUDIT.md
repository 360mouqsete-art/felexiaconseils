# Audit initial — FELEXIA Intelligence 360°

Audit du 12 octobre 2026, avant implementation applicative.

## Architecture et etat reel

Site Node.js ESM >=22, generateur HTML maison; Cheerio 1.2.x est la seule dependance declaree. Aucune application React/Next/eve a remplacer. src/templates.mjs assemble les pages; src/guides-site.mjs conserve/enrichit les articles historiques et importe src/guides-imported.json en francais. public contient les ressources, dist le rendu genere. Les routes finissent par /: /fr/guides/[slug]/, /en/guides/[slug]/, /ar/guides/[slug]/. Le rendu historique est statique; server.mjs assure les fichiers et /api/contact. Vercel deploie dist et api/contact.js. Le contact utilise le projet Supabase yxdmkqdnesemaqzagatm via REST serveur.

Le depot contient des modifications locales preexistantes: guides, migration, build, serveur, tests et configuration. Elles doivent etre conservees. Aucun secret n'a ete reproduit dans ce rapport.

## Inventaire editorial

313 sujets FR, 19 EN et 19 AR, soit 351 pages Guides. 300 entrees d'import dont 6 enrichissent des URL deja presentes. 294 sujets francais sans EN/AR. Dates importees provenant des sources historiques, absence de registre persistant de verification, de matrice d'affirmations, d'approbation et de jobs. Les dates historiques ne doivent pas etre reattribuees a une publication Felexia nouvelle. Inventaire detaille dans INTELLIGENCE-INVENTAIRE-GUIDES.json.

## SEO

Canonicals et hreflang existants; le moteur actuel presume des slugs communs entre langues. Les nouveaux sujets auront des slugs localises et des correspondances explicites. Sitemap statique: 441 URL indexables. Les 294 guides FR seuls ont besoin d'un programme de traduction, sans creation d'un nouveau sujet. Les sources fiscales historiques ne constituent pas une verification juridique recente.

## Verification initiale executee

npm test: 48/48. npm run lint: 46 fichiers, aucune erreur. npm run typecheck: 300 guides et 313 couvertures valides. npm run check: 462 routes, 39 913 liens/ressources, 3 877 images, 33 anciennes URL. Ces controles ne prouvent aucun moteur editorial, appel IA ou cron.

## Plan retenu

1. Ajouter des modules serveur a l'architecture Node existante, sans migration des guides historiques.
2. Persistance Supabase avec revision atomique et verrou a expiration; stockage fichier pour serveur Node/local, jamais comme persistance Vercel.
3. Pipeline en etapes bornees, file prioritaire nouveaux sujets, file backfill et corrections; journaux, budgets, reprise.
4. Collecte institutionnelle limitee et protegee contre SSRF, detection d'empreintes et changements.
5. Generation configurable et desactivee faute d'autorisation de frais. Reserve originale possible sans API payante.
6. Quality gate documentaire/trilingue/SEO, publication groupee et idempotence journaliere Casablanca.
7. Rendu serveur dans les rubriques Guides, catalogue et sitemap fusionnes aux historiques, sans rebuild quotidien.
8. Administration protegee et recette locale significative, puis preparation du deploiement et rollback.

## Acces et autorisations

Le connecteur MCP Supabase presente un autre compte; le MCP Vercel ne presente aucune equipe. Ne pas les utiliser pour modifier des projets homonymes. Verifier la liaison CLI existante et ses droits. Utilisateur: aucun appel payant pour le moment; publication sans validation humaine demandee. Les faits non confirmes restent bloquants; aucune relecture humaine ne sera inventee. Toute activation en production sera proposee avec un resultat concret et un plan de retour arriere, conformement au prompt utilisateur.
