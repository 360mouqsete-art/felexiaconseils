# Persistance et retour arrière — FELEXIA Intelligence

La migration `20261012075219_felexia_intelligence_state.sql` a été appliquée au projet Supabase existant le 12 octobre 2026, après sauvegarde et préflight transactionnel. Elle ajoute uniquement `public.felexia_intelligence_state` et la fonction `public.felexia_intelligence_cas`; elle ne modifie pas les demandes de contact ni les guides historiques. La migration de planification et son retour arrière sont documentés dans [INTELLIGENCE-SCHEDULER.md](INTELLIGENCE-SCHEDULER.md).

## Contrat des stores

`createState()` retourne les collections version 1. `createFileStore({path})` convient à un serveur Node avec disque persistant; son fichier enveloppe contient `{revision,state}`. Le fichier temporaire est synchronisé puis renommé dans le même dossier. Un verrou interprocessus protège les transactions; un propriétaire local encore vivant n'est jamais évincé. Un verrou d'un processus mort peut être récupéré après le délai de péremption. Sa petite trace `.lock.reaped-[jeton]` est conservée: elle empêche deux récupérateurs concurrents de déplacer le nouveau verrou vivant. Les candidats abandonnés avant acquisition et ces traces peuvent être nettoyés lorsque tous les processus utilisant le store sont arrêtés. Une erreur de lecture ne réinitialise jamais silencieusement un fichier corrompu. Ce stockage ne convient pas au disque éphémère de Vercel.

`createSupabaseStore({env,fetcher})` utilise `SUPABASE_URL` et `SUPABASE_SECRET_KEY` (ou la clé JWT historique `SUPABASE_SERVICE_ROLE_KEY`). Une clé moderne est envoyée uniquement dans `apikey`. Lecture serveur et mise à jour atomique par RPC; RLS/FORCE RLS, aucun droit `anon`/`authenticated`, aucun policy public. Les échecs du fournisseur ne reproduisent pas son message, ses données ou ses clés.

`transaction(fn)` exige un callback synchrone: appels réseau, génération et stockage des images se font hors de celui-ci. Le callback peut être rejoué après un conflit CAS, donc ne doit pas produire d'effets externes. Le résultat du callback est retourné uniquement après le commit. Le groupe des trois langues et le rapport journalier doivent être écrits dans la même transaction. La taille maximale de l'état est de 16 Mio; l'archivage ou la normalisation des contenus devient nécessaire avant cette limite.

`lease(name, asyncFn, {ttlMs})` réserve un jeton persistant et le renouvelle pendant le travail. Une deuxième réservation active lève `LEASE_BUSY`. Les transactions de la portée asynchrone contrôlent le jeton et sa date d'expiration; un worker ayant perdu sa réservation ne peut plus committer. Un travail interrompu devient récupérable après expiration. Une réservation ne rend pas idempotent un appel externe: les identifiants des jobs et publications restent nécessaires.

## Vérifications cloud effectuées le 12 octobre 2026

Lors de l'audit initial, la CLI Supabase 2.117.0 listait le projet `yxdmkqdnesemaqzagatm`, nommé « felexia conseils », région `eu-central-1`, Postgres 17, comme **INACTIVE**; la connexion SQL disponible échouait sur le réseau IPv6. Une vérification ultérieure a confirmé **ACTIVE_HEALTHY**. La CLI 2.120.0 a ensuite permis les lectures SQL via Management API, le préflight avec `ROLLBACK`, puis l'application additive des deux migrations. Le connecteur MCP Supabase correspond à un autre compte et ne doit pas servir pour ce projet.

La CLI Vercel peut inspecter `360mouqsete-art/felexiaconseils` (`prj_qQ8sjEdwRkPkNm3CV9rxxbyrj1ts`), Node 24.x, plan **Hobby**. L'audit initial trouvait `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `TRUST_PROXY`, `SITE_URL`, en Production et Preview. Les flags éditoriaux et les secrets serveur admin/cron ont ensuite été installés dans l'environnement Production, en préservant la configuration contact. La génération payante reste désactivée et ses budgets n'autorisent aucun appel. La clé admin a été renouvelée par canal privé avant le déploiement final; l'ancienne est refusée HTTP 401. Aucune valeur de secret n'est incluse dans ce document ou le dépôt. Le MCP Vercel n'a pas accès à cet espace; la CLI existante possède les bons droits.

Les inspections SQL après migration confirment RLS et FORCE RLS sur l'état éditorial et les contacts, sans policy publique. `anon` et `authenticated` n'ont aucun droit de lecture/écriture sur l'état ni d'exécution de CAS. `service_role` a `SELECT`, `UPDATE` et `EXECUTE` CAS; il n'a ni `INSERT` ni `DELETE` sur l'état. CAS reste `SECURITY INVOKER`, avec `search_path` vide et timeout de cinq secondes. Quatre commits REST concurrents réels ont conservé les quatre modifications. La réserve initiale importée contenait trente sujets dont quatorze prêts. Un complément importé ensuite porte l'état à trente et un sujets, quinze complets/prêts et seize idées avant publication; le re-seed réel ajoute zéro sujet. Aucun appel payant n'a été effectué.

Le déploiement final `dpl_DmfgyPJqeVkqnKhS4DwUv7xg7qcf` a été promu à 09:24 UTC; sa recette de production a réussi 24/24. Après la première publication trilingue de recette, les trois cycles pg_cron réels de 09:27, 09:28 et 09:30 UTC ont préservé un groupe publié, quatorze prêts et un seul rapport quotidien vérifié 9/9, sans réservation payante. Le job est actif et son calendrier quinze minutes est restauré; le cycle 09:30 a réellement eu lieu sous ce calendrier, vérification finale à 09:31:52 UTC et état CAS à 09:32:11 UTC. La recette navigateur de production confirme trois versions, recherches/FAQ, RTL mobile et ancien guide stylé; le scan final des 4 527 fichiers de déploiement ne trouve aucune valeur de secret configurée. [Preuves de livraison](INTELLIGENCE-LIVRAISON.md), [ordonnanceur](INTELLIGENCE-SCHEDULER.md).

La comparaison des métadonnées de contact avant/après est identique pour colonnes, index, contraintes et RLS/FORCE RLS; les policies restent absentes. Les droits effectifs de contact sont toujours `SELECT`/`INSERT` pour `service_role`, aucun droit `anon`/`authenticated`, et aucun `UPDATE`/`DELETE` pour `service_role`. Les exports avant et après import sont conservés hors Git dans `.sites-runtime/`.

Le plan Hobby accepte un cron quotidien avec une précision à l'heure; un échec de cron n'est pas relancé automatiquement. Les limites Fluid Compute courantes sont de 300 secondes par fonction Hobby, à vérifier sur la configuration réellement activée. Conserver des étapes bornées, des checkpoints, des budgets et une réserve contrôlée. [Limites des crons](https://vercel.com/docs/cron-jobs/usage-and-pricing), [gestion des crons](https://vercel.com/docs/cron-jobs/manage-cron-jobs), [limites des fonctions](https://vercel.com/docs/functions/limitations).

## Avant activation autorisée

1. Vérifier l'état du projet et l'accès SQL dans le bon compte; ne pas créer un autre projet pour contourner cette indisponibilité.
2. Exporter une sauvegarde autorisée de la base existante et enregistrer sa référence sans données personnelles dans le dépôt.
3. Lire et tester la migration sur une base de préproduction; vérifier que la table de contact et ses privilèges sont identiques avant/après.
4. Vérifier RLS, droits serveur, refus `anon`/`authenticated`, CAS simultanés, perte de bail et publication trilingue atomique. Exécuter les advisors.
5. Installer les secrets directement dans Vercel, puis déployer la version approuvée. Prévoir un rollback Vercel vers la version précédente avant d'activer la planification.

## Retour arrière

Commencer par désactiver la planification et les publications; attendre la fin des workers et exporter l'état éditorial via l'administration autorisée. Revenir au déploiement précédent. Les articles historiques et la réception des contacts sont indépendants de cette migration.

La suppression des objets éditoriaux est facultative et destructive: ne l'exécuter qu'après sauvegarde et autorisation explicite. SQL limité aux deux nouveaux objets:

```sql
begin;
drop function public.felexia_intelligence_cas(bigint, jsonb);
drop table public.felexia_intelligence_state;
commit;
```

Conserver la migration et l'export de l'état pour restaurer ensuite les objets et les données. Ne pas utiliser `drop schema ... cascade`, ne pas supprimer la table `felexia_contact_requests`, ne pas vider une base pour effectuer ce rollback.
