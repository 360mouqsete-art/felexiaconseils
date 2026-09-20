# Corrections d’affichage du 20 septembre 2026

## Réalisé

- Domiciliation FR : photographies au ratio naturel, collage sur des colonnes explicites, bloc création avec image entière et légende séparée.
- Logo simplifié en SVG, wordmark Sora, sans cartouche ; version originale conservée dans les ressources.
- Commandes FR / EN / العربية visibles hors du menu mobile sur toutes les pages. Pages Domiciliation anglaise et arabe réellement traduites ; arabe RTL. Les articles disponibles seulement en français renvoient explicitement à la rubrique de guides dans une autre langue.
- Thème clair par défaut, sombre au choix, préférence mémorisée. Libellés accessibles et traduits ; photos conservées sans filtre.

## Vérifications effectuées

- Construction de 124 entrées HTML, dont 120 URL publiques dans le sitemap.
- `npm test` : 40 tests réussis.
- `npm run check` : 123 routes linguistiques, 7 112 liens/ressources, 514 images, métadonnées, polices locales, RTL, 33 URL historiques et compression validés.
- Navigateur : Domiciliation FR à 1440, 820 et 390 pixels, sans débordement horizontal. Photos avec `object-fit: contain`, proportions naturelles ; logo et personnes restent visibles.
- Navigation FR → EN → AR → FR sur Domiciliation, maintien de la page et du thème ; arabe avec `dir=rtl`.
- Menu anglais mobile sous la barre langues/thème, logo compact ; thème persistant au rechargement et sur Contact. Formulaire sombre avec champs et texte contrastés. Aucune erreur console relevée pendant cette vérification.
- Correction d’un décor de menu flottant qui masquait le logo et les boutons en mode sombre.

La réception réelle d’un formulaire dans Supabase et le nettoyage de la demande technique sont documentés dans `SUPABASE.md`. Ces modifications d’affichage ne changent pas le traitement des demandes.

## Publication vérifiée

Le commit `c7e237d` a été poussé sur `main` et a déclenché automatiquement Vercel. Déploiement `dpl_7tX6nBFZzGKeQcvEKGtLW42ZThG2` READY après 12 secondes. Sur l’alias public, le navigateur confirme les quatre photos au ratio naturel, le nouveau logo, les trois liens linguistiques et le changement FR → AR RTL → FR avec maintien du thème.

Contrôle HTTP de ce déploiement : sitemap 200, **120/120 URL publiques en 200**, un H1 par page, langues et RTL corrects. Huit ressources de thème, logo et Domiciliation répondent 200 avec leur type MIME attendu. Aucun domaine MyLegal dans les HTML contrôlés.
