# Recette Vercel — 20 septembre 2026

Site publié : [felexiaconseils.vercel.app](https://felexiaconseils.vercel.app/fr/). Les étapes ci-dessous distinguent la première recette HTTP, l’activation du stockage et le test de réception réel.

## Première recette HTTP réussie

Cette première série concerne la version issue du commit `aeb5a8c` communiqué au moment de la publication. Elle a utilisé uniquement des requêtes HTTP GET natives, sans navigateur et sans envoi de formulaire.

- Sitemap accessible et **118 pages sur 118 en HTTP 200**, y compris accueils FR/EN/AR, contact dans les trois langues, création, domiciliation, offres, bibliothèque et guides détaillés.
- Langue HTML conforme à chaque URL, un H1 par page et `dir="rtl"` présent sur toutes les pages arabes.
- **16 ressources publiées en HTTP 200** : scripts et feuilles de style effectivement référencés, logo original, photo de bureau et nouvelle façade sans enseigne (`felexia-exterior-sans-enseigne.webp`).
- Aucune URL vers les domaines `mylegal.ma` ou `app.mylegal.ma` dans les HTML contrôlés et les scripts/styles chargés. Le nom du répertoire local `/mylegal/` est conservé pour les ressources hébergées par Felexia.
- **33 anciennes URL FR/EN/AR** aboutissent à une page valide après redirection.
- **10 redirections contrôlées explicitement** : racine vers `/fr/` en 302, langues et chemins sans slash en 308, anciens chemins contact/création/tarifs en 308, pagination historique `?page=2` vers `/fr/guides/page/2/` en 308.
- Une URL inexistante répond **404** avec une page HTML Felexia.
- `GET /api/contact` répond **405**, annonce `Allow: POST` et `Cache-Control: no-store` : la fonction existe et refuse la méthode de lecture.
- `robots.txt` accessible, en-têtes de sécurité présents et accueil servi avec compression Brotli.

Les métadonnées canoniques et le sitemap ciblent le domaine final `https://felexiaconseils.com`. Cette recette ne confirme pas une modification DNS de ce domaine.

## Activation et réception réelle

- Le commit `4f0f234` a ensuite été poussé sur la branche GitHub `main` du dépôt `360mouqsete-art/felexiaconseils`.
- Le déploiement d’activation Supabase `dpl_59rMNGeJCMQNiqmGkMVwBrP8zzrp` a atteint **READY**. Cette référence reste historique ; les modifications suivantes sont en cours de publication.
- `SUPABASE_URL` et la clé serveur existante ont été configurées sur Vercel **Production et Preview**, sans affichage ni fichier contenant la clé dans le projet.
- La migration `20260920162424` est appliquée au projet Supabase demandé. RLS/FORCE RLS, privilèges privés et advisors sont vérifiés ; les visiteurs n’ont aucun accès direct à la table.
- Le formulaire de contact ouvert dans le navigateur sur le site de production a confirmé la référence technique **`FLX-E441274B`**. SQL a confirmé la ligne correspondante.
- Une reprise HTTP du même contenu avec le même identifiant a répondu **200** avec la même référence. Une reprise avec message modifié a répondu **409 `idempotency_conflict`**.
- SQL a confirmé **une seule ligne et le contenu original inchangé**. Cette unique demande de contrôle a ensuite été supprimée par filtre exact ; la vérification finale indique **zéro ligne restante pour son identifiant**.
- Après installation de l’application Vercel par le propriétaire, la CLI `vercel git connect` a confirmé **Connected**. La liaison GitHub–Vercel est active.

Le build local constaté après ces étapes contient **124 entrées HTML et 120 pages publiques**. Ce décompte local ne signifie pas que la première recette HTTP portait sur 120 pages : elle en a contrôlé 118. La publication et la recette des nouvelles modifications sont distinctes.

## Vérification initiale de la fonction, avant Supabase

Sur le déploiement antérieur `dpl_EEaeptzmCPo3x9ptMyBJ4DtQEW8Q`, après installation de `SITE_URL` et `TRUST_PROXY`, un POST vide avait été rejeté avec HTTP 400 / `required`. Une demande technique fictive avait reçu HTTP 503 / `not_configured`, car le fournisseur n’était pas encore installé. Ce résultat historique est remplacé, pour la réception, par le test réussi après activation Supabase. La consultation initiale des logs d’erreur sur 30 minutes ne révélait aucun journal ; elle ne constitue pas une surveillance continue.

## Portée et limites

Cette recette complète la [recette locale](RECETTE.md) et la [vérification Supabase](SUPABASE.md). Les tests simulés restent distincts du test réel de production. Aucun e-mail n’a été envoyé par l’adaptateur Supabase et aucune autre demande n’a été modifiée pendant le nettoyage. La réception en base ne constitue pas une notification par courriel.

Le routage HTTP seul ne valide pas le rendu visuel ni l’intégralité des interactions. Le formulaire navigateur a été vérifié séparément lors de l’activation. La réception sur un déploiement Preview, les tests de charge, toutes les instances serverless et une bascule DNS ne sont pas revendiqués.
