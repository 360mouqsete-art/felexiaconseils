# Planification serveur indépendante — installation et preuves Supabase

La migration `20261012082004_felexia_intelligence_scheduler.sql` prépare un job PostgreSQL nommé `felexia-intelligence-tick`, exécuté toutes les quinze minutes et **inactif après installation**. Elle ajoute un journal privé de transport dans `felexia_intelligence_ops.scheduler_runs`. Elle ne crée aucun abonnement, ne déclenche aucun appel payant et ne modifie pas les contacts ou les guides historiques. Après déploiement et recette, trois réveils autonomes ont été observés, dont un après restauration du calendrier permanent; le job est **actif toutes les quinze minutes**. Les preuves et leurs limites figurent ci-dessous.

## Horaires et reprise

Le job appelle uniquement `POST https://www.felexiaconseils.com/api/intelligence-cron`, avec `{}`. Le moteur applique `Africa/Casablanca`, `FELEXIA_PUBLICATION_HOUR=09:00`, la fenêtre de publication et l'idempotence par journée locale. Le cron de réveil ne fixe pas lui-même un décalage UTC marocain: les évolutions du fuseau sont évaluées par la base IANA du runtime. Un réveil à l'heure visée permet de publier après son déclenchement; aucun ordonnanceur ne garantit une publication à la seconde exacte. Les réveils suivants permettent les reprises et le traitement borné des jobs.

Diagnostic du 12 octobre 2026: Vercel Node 24.21.0 / ICU 78.3 / tzdata 2026c renvoie 08:49 local à 08:49 UTC, donc `before_window` avant 09:00 est attendu. La base IANA 2026c modélise `Africa/Casablanca` en UTC permanent à partir du 20 septembre 2026; le Node 26.1 Windows / tzdata 2026b utilisait encore +01 en octobre. Vérifier la version `process.versions.tz` du runtime serveur lorsqu'une simulation locale diverge; ne pas ajouter un offset fixe au moteur. La suite 106/106 passe sous les deux runtimes avec des fixtures tenant compte de cette évolution. [Notes IANA 2026c](https://data.iana.org/time-zones/tzdb-2026c/NEWS).

Le timeout réseau est de 240 secondes. La durée maximale de la fonction et les checkpoints doivent rester cohérents avec cette borne. La file `pg_net` est non journalisée et une requête en attente peut disparaître lors d'un redémarrage brutal: la reprise repose sur l'état éditorial durable, les prochains réveils et les clés d'idempotence. [Documentation pg_net](https://supabase.com/docs/guides/database/extensions/pg_net).

## Signature et confidentialité

Les tables de file et les fonctions `net` appartiennent à `supabase_admin`. Les changements de droits sur ces objets ne sont pas supportés par Supabase, et un `REVOKE` exécuté par `postgres` peut ne rien retirer. Ne pas présenter ce type de commande comme une protection de la file. [Notice sur les droits pg_net](https://supabase.com/docs/guides/troubleshooting/revoking-access-to-pg_net-objects-has-no-effect-0bbc16).

Un secret déchiffré depuis Vault puis placé dans `Authorization` serait lisible dans la file par les rôles qui peuvent se connecter à la base. La migration utilise donc une signature HMAC-SHA256, jamais le secret lui-même dans la requête. [Notice sur les en-têtes en file](https://supabase.com/docs/guides/troubleshooting/database-roles-can-read-request-headers-queued-by-pg_net-ad6357), [HMAC PostgreSQL](https://www.postgresql.org/docs/17/pgcrypto.html).

Le secret Vault `felexia_intelligence_cron_secret` doit correspondre à `CRON_SECRET` sur Vercel. Il est créé séparément, via le canal sécurisé d'administration, sans texte de secret dans la migration ni dans Git. Les privilèges réels observés interdisent à `anon` et `authenticated` l'usage du schéma Vault et la lecture de `vault.decrypted_secrets`; `postgres` et le rôle serveur privilégié `service_role` ont ces droits. Ne pas prétendre que seul `postgres` peut lire Vault. La clé serveur doit rester privée. Les objets Vault appartenant à `supabase_admin` ne reçoivent aucun changement global de droits dans cette migration.

Protocole exact:

```text
X-Felexia-Cron-Timestamp: secondes Unix sous forme de texte
X-Felexia-Cron-Nonce: UUID
X-Felexia-Cron-Signature: HMAC-SHA256 hexadécimal
Message signé: ${timestamp}.${nonce}.POST./api/intelligence-cron
```

Le serveur vérifie la signature en temps constant, l'âge maximal de 120 secondes et l'unicité du nonce dans `state.settings.cronNonces`. La signature n'autorise que le cycle normal; le body n'autorise aucune publication forcée. Le jeton reste utilisable une fois dans cette courte fenêtre: un lecteur de la file pourrait tenter de rejouer la requête autorisée avant son envoi. La consommation atomique du nonce limite ce risque à la concurrence pour le même cycle, sans capacité de modifier un sujet ou de publier un doublon. Le secret statique reste utilisé uniquement pour les invocations manuelles de confiance ou un cron Vercel directement authentifié.

## Préparation, recette et activation

1. Appliquer et vérifier d'abord la migration de persistance éditoriale et sauvegarder son état.
2. Vérifier les fonctions `extensions.hmac(bytea,bytea,text)`, Vault, l'absence d'exposition API du schéma `net`, et le rôle administrateur `postgres`.
3. Tester la migration dans une transaction avec `ROLLBACK`, puis vérifier les objets et le job inactif lors de son installation autorisée. Ne pas passer `username` à `cron.alter_job`: modifier ce paramètre exige un superutilisateur, même pour conserver `postgres`; le job créé avec le rôle courant conserve déjà cette identité. Les seules inspections doivent éviter `headers`, `decrypted_secret`, les corps des réponses et tout dump de Vault.
4. Installer le secret Vault et `CRON_SECRET` en mémoire par le canal sécurisé; déployer le vérificateur HMAC avant activation.
5. Vérifier un cycle autorisé, son refus en cas de replay et un appel non autorisé; vérifier l'état éditorial et les neuf contrôles publics: trois articles complets, deux images, les trois catalogues contenant chacun leur carte exacte et le sitemap contenant les trois URL. Un HTTP 200 seul ne prouve pas l'intégration dans la rubrique Guides.
6. Activer uniquement le job exact après recette réussie:

```sql
select cron.alter_job(jobid, active := true)
from cron.job
where jobname = 'felexia-intelligence-tick'
  and username = 'postgres' and database = current_database();
```

Le journal privé associe le nonce et l'identifiant réseau à la journée locale. Le réveil suivant réconcilie les statuts HTTP encore disponibles. Une ligne `http_success` prouve le succès HTTP, pas la publication d'un guide. Les rapports éditoriaux et la vérification des URL restent la preuve de publication. Les réponses HTTP ne sont pas recopiées dans ce journal.

La recette du déclenchement autonome utilise trois scripts privés ignorés par Git:

- `.sites-runtime/intelligence-cron-test-activate.sql`: après recette du déploiement public, passe uniquement le job Felexia au rythme temporaire d'une minute et l'active. Le rôle courant, l'unicité du nom, le propriétaire et la base sont vérifiés avant mutation; un verrou advisory de transaction sérialise les opérations Felexia.
- `.sites-runtime/intelligence-cron-test-observe.sql`: transaction de lecture seule sur les métadonnées du job, le journal Felexia, les statuts HTTP pg_net et les dates/statuts de `cron.job_run_details`, bornée aux douze entrées récentes de chaque journal. Ni commande, ni en-tête, ni body, ni valeur de Vault ne sont sélectionnés; seuls des indicateurs de présence d'erreur/message sont retournés.
- `.sites-runtime/intelligence-cron-test-restore.sql`: conserve l'activation et rétablit uniquement le calendrier permanent `*/15 * * * *`, avec les mêmes contrôles et le même verrou advisory.

La preuve associe une exécution initiée par pg_cron, son identifiant de requête, une réponse HTTP, puis les rapports durables et URL publiques. Ces scripts ne déclenchent pas manuellement le contenu de `cron.job.command`. Une réussite SQL de pg_cron peut précéder le résultat HTTP asynchrone; observer les deux, puis restaurer le calendrier normal. La seule préparation ou activation de ces fichiers ne prouve pas un succès autonome.

## Vérifications effectives du 12 octobre 2026

Le premier préflight cloud a été annulé: passer `username := 'postgres'` à `cron.alter_job` exigeait un superutilisateur. Le paramètre a été retiré, avec conservation du contrôle préalable du propriétaire et de la base. Le préflight corrigé a réussi, puis la CLI Supabase 2.120.0 a appliqué les deux migrations additives.

L'inspection SQL en lecture seule de **08:37 UTC** confirme un seul job `felexia-intelligence-tick`, identifiant `1`, rôle `postgres`, base `postgres`, calendrier `*/15 * * * *`, **inactif après installation**. Elle confirme `pg_cron` 1.6.4, `pg_net` 0.20.4, Vault 0.3.1 et pgcrypto 1.3. Le secret nommé existe; sa valeur n'a pas été lue pour cet audit. Le journal privé a RLS/FORCE RLS et aucun droit de schéma ou de lecture pour `anon`, `authenticated` ou `service_role`.

Le candidat final Vercel Dmf a été promu à **09:24 UTC** après une recette de préproduction **24/24**; sa recette publique **24/24** et le rapport éditorial **9/9** ont ensuite réussi. L'opérateur a activé le job temporairement chaque minute vers **09:26 UTC**. Le premier essai utilisant `FOR UPDATE` sur la table Supabase `cron.job` a été refusé et annulé sans commit; le script privé utilise maintenant `pg_advisory_xact_lock` sur une clé propre à Felexia, sans modification globale de privilèges.

Les captures de **09:27:19** puis **09:31:52 UTC** constatent les exécutions pg_cron **1, 2 et 3** démarrées à **09:27:00, 09:28:00 et 09:30:00**, toutes `succeeded`. Les deux premières suivent le calendrier temporaire de recette; la troisième survient après retour au calendrier permanent. Les requêtes réseau **1, 2 et 3** ont reçu HTTP **200**, sans timeout ni erreur. Les deux premiers transports sont réconciliés en `http_success` lors des réveils suivants. L'état CAS consulté à **09:27:57**, puis **09:32:11 UTC**, confirme les nonces contrôlés consommés, un seul groupe publié, quatorze prêts, un seul rapport quotidien, neuf contrôles publics réussis et zéro réservation d'API payante. Le premier groupe avait été publié pendant la recette manuelle: ces trois cycles autonomes sont des reprises idempotentes, pas trois nouvelles publications.

La restauration a réussi. La dernière capture confirme le job **1 actif**, rôle/base **postgres**, calendrier **`*/15 * * * *`**, et le cycle **09:30** effectivement exécuté sous ce calendrier. Les preuves privées ignorées par Git sont `.sites-runtime/intelligence-cron-observation-first.json`, `intelligence-cron-state-evidence.json`, `intelligence-cron-restoration-evidence.json`, `intelligence-cron-final-evidence.json` et `intelligence-cron-final-state-evidence.json`. Elles ne sélectionnent aucun secret, header, body ni commande cron. Les scripts n'ont pas exécuté manuellement la commande du job. Cette observation établit trois réveils serveur indépendants; elle ne démontre pas encore plusieurs journées de publication autonome.

Une requête REST avec la vraie clé serveur, `Accept-Profile: net` et `select=id&limit=0`, a renvoyé HTTP **406**, code **PGRST106**: ce profil est refusé par l'API. Aucune ligne de file, aucun header et aucune valeur de Vault n'a été inspecté. Cette vérification n'annule pas la visibilité de la file pour les rôles PostgreSQL capables de se connecter. Les paramètres SQL `pgrst.db_schemas` non renseignés ne suffisaient pas à établir cette preuve; le refus REST réel la complète.

Le bucket optionnel `intelligence-media` n'existe pas à ce stade. Les quinze sujets complets utilisent quatorze illustrations originales locales servies par Vercel, dont une réutilisée avec des ALT propres au quinzième sujet, sans besoin de bucket ni d'appel IA. Un bucket public limité aux images devrait être provisionné et testé séparément avant d'activer le générateur média payant. Le renouvellement automatique de la réserve n'est pas établi par la preuve du scheduler.

Pour répéter l'inspection des privilèges sans lire de contenu ou de secret:

```sql
begin transaction read only;
select rolname,
       has_table_privilege(rolname, 'public.felexia_intelligence_state', 'SELECT') as state_read,
       has_table_privilege(rolname, 'public.felexia_intelligence_state', 'UPDATE') as state_update,
       has_function_privilege(rolname, 'public.felexia_intelligence_cas(bigint,jsonb)', 'EXECUTE') as cas_execute,
       has_schema_privilege(rolname, 'vault', 'USAGE') as vault_usage,
       has_table_privilege(rolname, 'vault.decrypted_secrets', 'SELECT') as vault_read
from pg_roles where rolname in ('anon','authenticated','service_role','postgres');
select jobid, jobname, schedule, active, username, database
from cron.job where jobname='felexia-intelligence-tick';
commit;
```

Les vérifications de la ligne d'état, de ses policies et du journal utilisent uniquement `pg_class`, `pg_policies` et `has_*_privilege`. Ne pas inclure `cron.job.command`, `net.http_request_queue.headers`, les corps de réponse ou `vault.decrypted_secrets.decrypted_secret` dans un rapport.

## Arrêt et retour arrière

Désactivation immédiate, limitée au job Felexia:

```sql
select cron.alter_job(jobid, active := false)
from cron.job
where jobname = 'felexia-intelligence-tick'
  and username = 'postgres' and database = current_database();
```

Après sauvegarde et arrêt des workers, suppression de la planification uniquement:

```sql
select cron.unschedule(jobid)
from cron.job
where jobname = 'felexia-intelligence-tick'
  and username = 'postgres' and database = current_database();
```

Conserver les journaux pour l'audit. Ne pas supprimer `pg_cron`, `pg_net` ou Vault: ces extensions peuvent servir à d'autres tâches. Ne pas supprimer les secrets d'autres services, ne pas modifier leurs jobs, ne pas effacer de guides historiques. La suppression facultative du journal Felexia est destructive et nécessite une sauvegarde et une autorisation spécifique. [Installation Supabase Cron](https://supabase.com/docs/guides/cron/install), [gestion des jobs pg_cron](https://github.com/citusdata/pg_cron).

## Limite de l'état et politique d'archivage

Le store refuse un état supérieur à 16 Mio. Cette borne ne garantit pas qu'une année complète de guides longs, traductions, images et historiques tienne dans la ligne JSONB. Surveiller la taille réelle; à l'approche de la borne, bloquer les écritures susceptibles de la dépasser et préparer un stockage normalisé des versions éditoriales avec migration vérifiée.

Les images persistantes doivent vivre dans le stockage média; supprimer de l'état les buffers temporaires après confirmation du stockage. Les événements anciens et les jobs terminés peuvent être exportés vers un journal privé durable selon une politique documentée, puis retirés de l'état actif seulement après vérification de l'export. Préserver les rapports et preuves nécessaires. Les guides publiés doivent continuer d'être servis depuis leur stockage éditorial; aucune purge des articles ou des URL publiques ne doit servir à contourner cette limite. Les archives nécessitent leurs propres sauvegardes et contrôles d'accès.
