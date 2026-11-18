# Indexation Google — contrôle du 13 octobre 2026

Les trois exports du 12 octobre contiennent 42 URL : 30 « Détectée, actuellement non indexée », 6 « Exclue par la balise noindex » et 6 « Page avec redirection ». Les fichiers Excel originaux restent intacts.

## Diagnostic

| Catégorie Search Console | URL | Contrôle du site | Traitement |
| --- | ---: | --- | --- |
| Détectée, actuellement non indexée | 30 | HTTP 200, canonical propre, aucune directive noindex, toutes présentes dans le sitemap dynamique | Corriger le maillage interne, puis demander une exploration depuis le compte propriétaire |
| Exclue par noindex | 6 | Formulaires create et espace-client dans les trois langues ; absents du sitemap | Exclusion volontaire conservée |
| Page avec redirection | 6 | Variantes HTTP, www/apex, racine et /fr sans barre finale ; cible finale /fr/ en HTTP 200 | Conserver la normalisation ; rendre la redirection racine permanente |

Le contrôle initial du 13 octobre à 07:09 UTC trouve un sitemap HTTP 200 de 444 URL sans doublon. Robots.txt autorise les pages publiques. Les valeurs « 1970-01-01 » de l’export ne sont pas des dates d’exploration exploitables : Search Console affiche réellement « Sans objet » pour ces URL. Aucun résultat d’indexation actuel n’est déduit des seuls tests HTTP.

## Corrections

- Relier dans le HTML les branches Offres, Services, Formalités administratives, Modification de société et Accompagnement dans les trois langues. L’audit initial excluant les liens hreflang trouve 3 pages orphelines et 8 pages inaccessibles depuis les accueils parmi les 30 URL.
- Passer la racine `/` de HTTP 302 à HTTP 308 vers `/fr/`, en conservant les paramètres de campagne.
- Rediriger les anciens catalogues `/<lang>/guides/?page=…` en HTTP 308 vers `/<lang>/guides/` avant toute lecture de données. Le comportement s’applique également à la route réécrite sur Vercel et aux requêtes HEAD.
- Pointer les consentements des formulaires directement vers `/<lang>/politique-confidentialite/`.

Ces modifications améliorent la découverte et la cohérence des URL. Elles ne démontrent pas que Google a déjà exploré ou indexé les pages.

## Publication et vérification

Version publiée sur [www.felexiaconseils.com](https://www.felexiaconseils.com/fr/) après validation du déploiement de préparation. Déploiement Vercel `dpl_HJQndwpeesqPTkMwXGzmGueywFQM`, cible production, état READY, promu le 13 octobre vers 07:29 UTC. Le code provient du dossier local avec ses modifications ; aucun nouveau commit Git n’a été créé.

| Contrôle | Résultat |
| --- | --- |
| Tests Node 24.21.0 | 112 réussis, 0 échec |
| Syntaxe | 73 fichiers JavaScript, 0 erreur |
| Données Guides | 300 guides importés/enrichis, 313 couvertures et 301 associations sources valides |
| Construction et contrôles HTTP locaux | 462 pages localisées servies, 33 URL historiques conservées, Brotli/gzip valides |
| Audit des liens avant/après | 3 → 0 orphelines ; 8 → 0 pages inaccessibles ; 30/30 accessibles en 3 clics maximum |
| Déploiement de préparation puis domaine public | 19 contrôles réussis sur chacun : liens, redirections, consentements, catalogues, article publié, sitemap et administration protégée |
| URL issues des exports, après publication | 42/42 conformes : 30 pages directes HTTP 200, 6 noindex voulus, 6 chaînes permanentes vers l’accueil canonique, aucune boucle |
| Navigation publique FR/EN/AR | 15/15 liens directs présents dans les pieds de page des trois accueils |

Les 8 branches reconnectées sont `/fr/offres/`, `/en/offres/`, `/ar/offres/`, `/ar/formalites-administratives/`, `/ar/modify-company/`, `/ar/support/`, `/en/modify-company/` et `/en/support/`. Elles se trouvent désormais à un clic d’un accueil. Aucun appel IA payant n’a été effectué.

## Actions dans Search Console

L’utilisateur a ouvert le compte propriétaire dans Chrome. Les actions suivantes ont été effectuées après publication et vérification du domaine public :

- Sitemap renvoyé : Google confirme « Sitemap envoyé » et affiche une date d’envoi au 13 octobre 2026. La dernière lecture reste le 8 octobre et le compteur Google reste 441 tant que Google n’a pas retraité le sitemap public actuel de 444 URL.
- Validation du groupe « Détectée, actuellement non indexée » lancée pour les 30 URL. Google confirme « État de la validation : commencé — Début : 13/10/2026 ».
- Les exclusions légitimes noindex et redirections ont été conservées. Aucune demande de suppression d’URL ni modification d’accès n’a été effectuée.

Le rapport global consulté indique encore 416 pages indexées et 42 non indexées, avec une dernière mise à jour au 9 octobre. Ces chiffres précèdent les corrections et ne constituent pas leur résultat. Aucune indexation immédiate des 30 URL n’est annoncée.

Preuves : [sitemap envoyé](C:/Users/XXX/Desktop/felexia/.sites-runtime/search-console-20261013/sitemap-envoye.png), [validation commencée](C:/Users/XXX/Desktop/felexia/.sites-runtime/search-console-20261013/validation-google.png). Les contrôles HTTP et les audits avant/après sont conservés dans `C:/Users/XXX/Desktop/felexia/.sites-runtime/search-console-20261013/`.

Le contrôle des journaux Vercel de ce déploiement, filtré sur les erreurs des 15 dernières minutes, ne retourne aucun journal correspondant. Ce contrôle ponctuel ne remplace pas le suivi de la validation Google.

Pour la suite du traitement Google :

1. Consulter les détails de la validation lancée pour les 30 URL et attendre le résultat Google.
2. Vérifier la prochaine date de lecture du sitemap dans Sitemaps. Il a été envoyé, mais cette action n’est pas une confirmation de lecture ni d’indexation.
3. Les exclusions légitimes noindex et les anciennes URL redirigées peuvent rester affichées : la cible canonique publique doit être indexée. Des inspections individuelles restent possibles pour les pages prioritaires, dans la limite du quota disponible.

Google précise que « Détectée, actuellement non indexée » signifie une page connue mais pas encore explorée. Une demande peut prendre plusieurs jours ou semaines et ne garantit pas l’indexation. Répéter les demandes pour une URL ne les accélère pas.

Sources : [Rapport sur l’indexation](https://support.google.com/webmasters/answer/7440203?hl=fr), [redirections](https://developers.google.com/search/docs/crawling-indexing/301-redirects?hl=fr), [demander une exploration](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=fr).
