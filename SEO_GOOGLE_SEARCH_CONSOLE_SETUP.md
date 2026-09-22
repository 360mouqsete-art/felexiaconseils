# Configurer Google Search Console

1. Avec le compte propriétaire, ouvrir [Search Console](https://search.google.com/search-console/) et ajouter une **propriété Domaine** : `felexiaconseils.com` (sans protocole ni www).
2. Choisir la vérification DNS. Copier exactement le TXT fourni par Google ; aucun token n’est inventé dans le dépôt.
3. Ajouter ce TXT chez le **gestionnaire DNS actuellement actif**. Le 22 septembre 2026, Vercel observe `pdns1.registrar-servers.com` et `pdns2.registrar-servers.com`, cohérents avec Namecheap. Revérifier les NS au moment de l’opération. Dans Namecheap : Domain List → Manage → Advanced DNS → Add New Record → TXT, Host `@`, valeur Google, TTL automatique. Ne pas remplacer les enregistrements existants ni changer les nameservers.
4. Attendre la propagation puis cliquer Vérifier. Conserver le TXT après validation.
5. Après publication de cette révision, soumettre `https://www.felexiaconseils.com/sitemap.xml` dans Sitemaps. La révision locale contient 150 URLs indexables ; ne pas attendre ce nombre avant qu’elle soit déployée.
6. Inspecter la page création, les tarifs, l’accueil, Contact et les quatre guides prioritaires. Utiliser « Tester l’URL publiée » ; vérifier accès, rendu mobile et canonical déclaré. Le canonical sélectionné par Google peut prendre du temps à évoluer.
7. Demander l’indexation des quelques pages réellement modifiées si utile. Il ne faut pas envoyer la même demande chaque jour ; une demande n’est pas une garantie d’indexation.
8. Dans Pages / Indexation, examiner erreurs, soft 404, explorées non indexées, duplications et URLs exclues. Les formulaires `create`, `rendez-vous`, `espace-client` et les 404 sont volontairement noindex ; les aliases légaux ont un canonical vers la page principale.
9. Dans Performance / Résultats de recherche, suivre clics, impressions, CTR et position moyenne. Filtrer par page et par requête, pays Maroc/France selon l’objectif et appareil mobile.
10. Comparer **28 jours aux 28 jours précédents**, et à l’année précédente si les données existent. Isoler les requêtes non brandées, puis identifier les pages à fortes impressions et CTR faible. Réviser title/description seulement lorsque le contenu correspond à la requête.

## Contrôles de domaine

Production observée : HTTPS sans www → 308 vers HTTPS www, puis 200. Les balises de cette révision utilisent HTTPS www. La propriété Domaine couvre les deux variantes et HTTP/HTTPS. Aucun changement DNS n’a été réalisé pendant ce travail.

## Accès requis

Accès propriétaire Search Console et gestion DNS actif. Accorder à un intervenant le niveau minimal nécessaire ; ne pas partager de mot de passe ou de token dans Git.

Sources : [Propriétés Search Console](https://support.google.com/webmasters/answer/34592?hl=fr), [Vérification de propriété](https://support.google.com/webmasters/answer/9008080?hl=fr).
