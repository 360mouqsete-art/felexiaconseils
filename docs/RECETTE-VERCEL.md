# Recette HTTP Vercel — 20 septembre 2026

Déploiement contrôlé : [felexiaconseils.vercel.app](https://felexiaconseils.vercel.app/fr/), version issue du commit `aeb5a8c` communiqué au moment de la publication. Ces contrôles ont été exécutés contre le site cloud avec des requêtes HTTP GET natives, sans navigateur et sans envoi de formulaire.

## Résultats cloud réussis

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

## Portée et limites

Cette vérification complète la [recette locale](RECETTE.md), sans assimiler les tests simulés à une réception réelle. Aucun POST, e-mail ou enregistrement Supabase n'a été créé pendant cette recette. La réponse 405 de l'API confirme son routage, pas la configuration de son stockage.

La connexion autorisée au projet Supabase, l'application de la migration et la validation d'une demande réelle restent à confirmer séparément. Les interactions visuelles, le responsive et le rendu navigateur ne sont pas couverts par ces requêtes HTTP.
# Vérification complémentaire de la fonction publiée

Après installation de SITE_URL et TRUST_PROXY et redéploiement `dpl_EEaeptzmCPo3x9ptMyBJ4DtQEW8Q` : POST vide rejeté avec HTTP 400 / required ; demande technique fictive `qa@example.test` refusée honnêtement avec HTTP 503 / not_configured. Aucun fournisseur de réception n’est installé, aucun message n’a été envoyé ni enregistré. La consultation des logs d’erreur Vercel sur 30 minutes n’a renvoyé aucun journal ; cela ne constitue pas une surveillance continue.
