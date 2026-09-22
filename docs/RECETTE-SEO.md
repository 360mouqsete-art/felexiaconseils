# Recette SEO locale — 22 septembre 2026

## Résultats effectivement obtenus

- `npm run build` : succès, 172 entrées générées.
- `npm test` : 45 tests réussis. Les nouveaux tests vérifient metadata uniques, canonical et hreflang réciproques, sitemap indexable, dates stables, correspondance Schema/breadcrumb visible et liens de conversion.
- `npm run check` : 171 pages linguistiques, 12 498 liens/ressources internes et 894 occurrences d’images contrôlés ; 171 routes servies, 33 anciennes URLs, 150 URLs sitemap ; Brotli et gzip valides.
- Syntaxe de 32 fichiers JavaScript/MJS vérifiée avec `node --check`. Pas de tâche lint ou de typecheck TypeScript existante dans ce projet ; aucun résultat fictif pour ces outils.
- `git diff --check` : aucune erreur de whitespace.
- Formulaires/API : tests avec stockage simulé, validation, consentement, idempotence, erreur fournisseur, UTF-8 arabe, origine www et rejet d’origines non autorisées. Aucun faux prospect créé en production pour cette recette.

## Navigateur

Contrôle sur localhost via le navigateur intégré, aux largeurs 375, 820 et 1440 px : accueil, création, tarifs, guide SARL, Contact. Sur les 15 combinaisons : pas de débordement horizontal, un H1, aucune image visible cassée. Console sans erreur observée.

Contrôles interactifs : menu mobile ouverture/fermeture, thème sombre persistant entre langues, page création arabe à 375 px, guide MRE arabe à 820 px, guide en ligne anglais à 1440 px, menu Tarifs, liens de sommaire sous le header fixe, FAQ ouverte et réponse lisible. Contact vide correctement bloqué par validation ; questionnaire de création parcouru jusqu’au récapitulatif avec données synthétiques locales, sans envoi externe.

Les photos de Domiciliation et le logo simplifié sont conservés ; le test de parité FR/EN/AR des modèles, photos et navigation passe sur toutes les pages.

## Performance : preuves et limites

23 dérivés WebP préparés, 3 485 620 octets économisés au total par rapport aux originaux correspondants ; ce chiffre n’est pas un gain de chargement par page. Les originaux restent dans le dépôt. Dimensions réelles explicites et images secondaires lazy.

Le JavaScript chargé sur les pages principales représente environ 11,5 Ko Brotli (cinq fichiers), sans hydratation React. Compression locale testée. Aucun score Lighthouse, LCP, INP ou CLS terrain n’est revendiqué ; ces indicateurs nécessitent une mesure sur le déploiement et dans Search Console.

## Publication

Cette révision n’a pas été poussée ni déployée. Le contrôle du domaine existant a été réalisé en lecture seule. Après revue, le workflow existant est : commit des fichiers nécessaires, push normal vers `main`, build automatique Vercel, contrôle READY, puis vérification des URLs publiques et des formulaires. Ne jamais ajouter `.env`, `.vercel` ou un secret au commit.

`SITE_URL=https://www.felexiaconseils.com` est la valeur recommandée. Le code normalise aussi l’ancienne valeur HTTPS sans www pour rester compatible avec la variable déjà configurée. Le serveur accepte le domaine canonique exact ; aucun élargissement à des sous-domaines arbitraires.

L’aperçu se lance avec `npm run build` puis `npm start`, à [localhost:4173/fr/creation-entreprise/](http://localhost:4173/fr/creation-entreprise/).
