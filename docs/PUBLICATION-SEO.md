# Publication et vérification — nuit du 22 au 23 septembre 2026

## Site et dépôt

Site canonique : https://www.felexiaconseils.com/fr/.
Commits applicatifs : `63de37c` (SEO), `e2a3257` (mesure consentie et contraste), envoyés normalement sur main. Le commit README distant de l’utilisateur a été conservé, sans push forcé. Déploiement applicatif Vercel READY : https://felexiaconseils-106pgrrwq-360mouqsete-art.vercel.app.

Les 150 URLs du sitemap répondent 200 avec canonical cohérent, un seul H1 et sans noindex. robots.txt et fichier de vérification Google répondent 200. Une URL inexistante renvoie 404 ; GET /api/contact renvoie 405. Aucun changement DNS ni migration Supabase lors de cette publication.

## Google Search Console

Propriété préfixe URL https://www.felexiaconseils.com/ validée par le fichier public google686e2b14c4678c24.html, à conserver. Sitemap traité avec succès, 150 pages découvertes.

Test en direct de /fr/creation-entreprise/ réussi : Google peut accéder à la page, elle peut être indexée et un fil d’Ariane valide est détecté. La demande d’indexation manuelle a retourné une erreur Google à deux reprises. Le succès du sitemap et du test ne signifie pas que les pages sont déjà indexées.

La propriété Domaine reste non validée par DNS ; la propriété préfixe validée couvre le site canonique.

## Analytics et confidentialité

Propriété GA4 555480986, flux 15827411869, ID public G-5CTT86CCQ2. Compte créé après autorisation des conditions, fuseau Maroc, devise MAD, partages facultatifs et mesures améliorées désactivés.

Vérifications réelles sur le domaine de production :

- Sans accord : aucun script googletagmanager dans le document.
- Acceptation : chargement du script Google ; page_view, first_visit et session_start apparaissent dans le rapport temps réel avec le titre de la page création.
- Retrait via « Confidentialité : mes choix » : rechargement, disparition du script Google ; console sans erreur observée.
- FR/EN/AR, RTL, persistance entre pages, refus et réouverture vérifiés localement ; bannière mobile à 375 px sans débordement.

generate_lead enregistré comme événement clé, sans valeur monétaire par défaut, une fois par événement. Le site l’émet uniquement après confirmation serveur. Les tests couvrent absence de consentement, dédoublonnage, exclusions et absence de contenu de formulaire dans les événements. Aucun faux prospect créé pour tester le rapport : la réception d’un lead réel dans GA n’a donc pas été vérifiée. La visite de recette initiale figure dans les statistiques.

## PageSpeed mobile

[Rapport public du 23 septembre à 00:03, heure du Maroc](https://pagespeed.web.dev/analysis/https-www-felexiaconseils-com-fr-creation-entreprise/7ip4m9j07a?form_factor=mobile).

| Mesure | Résultat |
|---|---|
| Performance | 100 |
| Accessibilité automatique | 100 |
| Bonnes pratiques | 100 |
| SEO technique Lighthouse | 100 |
| FCP / LCP | 1,1 s / 1,5 s |
| TBT / CLS | 0 ms / 0 |
| Speed Index | 1,1 s |

Moto G Power émulé, connexion 4G lente, Lighthouse 13.5.0. Résultat ponctuel sur la page création : pas une garantie sur toutes les pages ni sur le classement Google. Aucune donnée terrain CrUX disponible. Le premier contrôle avant correction du contraste était à 96 performance / 96 accessibilité / 100 bonnes pratiques / 100 SEO.

## Google Business Profile

Après correction du propriétaire, la fiche proposée par Google est identifiée comme appartenant à une autre entreprise. La reprise a été interrompue. Aucune suppression ni validation vidéo exécutée ; nom public constaté inchangé. Une demande autorisée a été envoyée à l’assistance Google pour annuler uniquement l’association non validée, sans modifier ni supprimer la fiche publique. Confirmation d’envoi reçue ; résolution encore attendue. Le numéro de dossier a été communiqué au propriétaire dans la conversation, sans publication dans le dépôt.

La fiche propre à Felexia reste à finaliser après résolution et avec la validation physique demandée par Google. Les informations légales manquantes et les réserves fiscales de l’audit nécessitent toujours une validation du cabinet.

## Prévisualiser et publier

Depuis le dossier du projet, Node.js 22 minimum : `npm ci`, `npm run build`, puis `npm start`. Ouvrir http://localhost:4173/fr/. L’aperçu ne collecte pas de visites Analytics. Pour une prochaine version, exécuter `npm test` et `npm run check`, puis commit et push normal sur main ; l’intégration GitHub déclenche Vercel. Vérifier l’état READY et le domaine canonique après chaque déploiement. Ne pas versionner les fichiers secrets.
