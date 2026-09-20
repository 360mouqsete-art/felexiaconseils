# Réception des demandes avec Supabase

Projet demandé par le propriétaire : `yxdmkqdnesemaqzagatm`.

## Activation cloud vérifiée le 20 septembre 2026

Après connexion autorisée de la CLI Supabase 2.117.0 au compte du propriétaire, le projet demandé était accessible. L'inspection préalable a confirmé l'absence de table publique et d'historique de migrations. Le connecteur MCP précédemment relié à un autre compte n'a pas été utilisé pour cette activation.

L'unique migration `20260920162424_felexia_contact_requests.sql` a été appliquée avec succès après simulation. La commande n'incluait ni seeds ni rôles globaux et utilisait `--skip-vault`. L'historique distant confirme désormais la version `20260920162424`, nom `felexia_contact_requests`.

Vérifications effectuées sur le projet cloud :

- `relrowsecurity = true` et `relforcerowsecurity = true`.
- Aucune politique RLS publique et aucun privilège de table pour `anon`, `authenticated` ou `PUBLIC`.
- `service_role` possède uniquement `SELECT` et `INSERT` ; le propriétaire administratif `postgres` conserve ses droits.
- Table vide au moment de l'activation, avant tout test applicatif.
- Advisors Supabase, sécurité et performances : **aucun problème signalé**.
- Lecture REST avec la clé serveur moderne existante : **HTTP 200** et liste vide. Lecture avec la clé publique : **HTTP 401, accès à la table refusé**.

Aucune clé n'a été affichée, enregistrée dans le projet ou ajoutée à Git. Sa récupération pour la configuration serveur se fait en mémoire.

## Réception réelle et nettoyage vérifiés

La configuration serveur Vercel a ensuite permis une demande de contrôle depuis le formulaire public, sous le nom explicite `TEST TECHNIQUE FELEXIA 20260920` et l'adresse fictive `qa@example.test`. Le navigateur a confirmé la référence `FLX-E441274B`, puis une lecture SQL a confirmé l'enregistrement correspondant dans Supabase.

La recette HTTP complémentaire a repris uniquement cette demande technique :

- Même contenu et même identifiant : **HTTP 200**, même référence `FLX-E441274B`.
- Même identifiant avec message modifié : **HTTP 409 `idempotency_conflict`**.
- Contrôle SQL après ces deux appels : **une seule ligne**, empreinte du contenu original inchangée.
- Nettoyage administratif strictement limité à cette ligne, filtrée par identifiant, référence, adresse, nom technique et empreinte : **une ligne supprimée**, puis **zéro ligne restante pour cet identifiant**.

Ce contrôle confirme la réception Vercel → Supabase et l'absence de doublon ou d'écrasement pour ces reprises. Il ne constitue pas un test de charge, de toutes les instances serverless ou d'envoi d'e-mail. Aucun e-mail n'a été envoyé par cet adaptateur et aucune autre demande n'a été modifiée.

## Ce qui est préparé

- Adaptateur serveur sans dépendance : `src/supabase-contact.mjs`.
- Table dédiée `public.felexia_contact_requests`, créée par la migration du dossier `supabase/migrations`.
- Données personnelles inaccessibles à `anon` et `authenticated` : RLS activée, aucune politique publique, privilèges explicites `SELECT` et `INSERT` uniquement pour `service_role`.
- Identifiant de demande unique et déduplication durable. Une répétition du même envoi renvoie sa référence initiale ; réutiliser cet identifiant avec un autre contenu est refusé et n'écrase jamais la demande d'origine.
- Aucun stockage de pièce jointe, aucun compte client et aucun envoi d'e-mail ne sont impliqués par cet adaptateur.

## Configuration serveur

Configurer uniquement sur le serveur/Vercel, jamais dans les fichiers `public`, le build statique ou Git :

```dotenv
SUPABASE_URL=https://yxdmkqdnesemaqzagatm.supabase.co
SUPABASE_SECRET_KEY=
```

Utiliser une clé `sb_secret_…` obtenue dans les paramètres du **projet indiqué**. Une clé publique/publishable ne convient pas. `SUPABASE_SERVICE_ROLE_KEY` reste supportée pour une ancienne clé JWT portant le rôle `service_role`, si aucune clé secrète moderne n'est configurée.

La clé moderne est envoyée dans l'en-tête `apikey`, sans `Authorization: Bearer` : elle n'est pas un JWT. La variante JWT historique utilise les deux en-têtes.

## Contrat d'intégration

```js
import {persistContactToSupabase} from './supabase-contact.mjs';

// payload a déjà été validé par validateContact et consent vaut true.
// Fournir le requestId calculé par le serveur lorsqu'il manque dans la requête.
return persistContactToSupabase({...payload, requestId}, {env, fetcher});
```

Retours :

| HTTP | body | Sens |
| --- | --- | --- |
| 200 | `{ok:true, reference:"FLX-…"}` | Demande enregistrée ou répétition identique déjà enregistrée. |
| 400 | `{ok:false, code:"invalid_payload"}` | Contrat de données invalide ; rien envoyé. |
| 409 | `{ok:false, code:"idempotency_conflict"}` | Identifiant déjà utilisé avec un contenu différent ; ancien contenu préservé. |
| 503 | `{ok:false, code:"not_configured"}` | Aucune configuration Supabase. |
| 503 | `{ok:false, code:"configuration"}` | Configuration incomplète, clé publique, URL invalide ou refus d'accès/table absente. |
| 502 | `{ok:false, code:"delivery_failed"}` | Réponse non confirmée ; retry avec le même identifiant sans risque d'écrasement. |

Une confirmation 200 signifie **enregistrement en base**, pas notification par e-mail. Éviter d'enchaîner un e-mail dont l'échec ferait prétendre que la demande enregistrée n'a pas été reçue. Le rate limit du handler HTTP existant reste en mémoire par instance : cet adaptateur ne fournit pas de protection distribuée contre les abus.

## Migration et vérification avant activation

La migration a été créée avec `npx --yes supabase@2.117.0 migration new felexia_contact_requests`. Elle ne modifie aucun autre objet du projet. Elle échoue si la table existe déjà, afin de ne pas modifier silencieusement une table homonyme.

Après authentification dans le bon projet, appliquer cette migration une seule fois, puis vérifier :

```sql
select relrowsecurity, relforcerowsecurity
from pg_class
where oid = 'public.felexia_contact_requests'::regclass;

select grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public' and table_name = 'felexia_contact_requests';

select count(*) from pg_policies
where schemaname = 'public' and tablename = 'felexia_contact_requests';
```

Résultats attendus : RLS et FORCE RLS à `true`, aucun privilège `anon`/`authenticated`/`PUBLIC`, aucun policy donnant accès aux visiteurs. `service_role` possède `SELECT` et `INSERT`. Exécuter ensuite les advisors Supabase et un envoi de test clairement identifié via l'API, vérifier son enregistrement puis son retry identique. Nettoyer uniquement cette demande de test par l'administration autorisée. Les tests Node simulent les réponses REST ; ils ne prouvent pas que le projet cloud a reçu la migration.

Le cabinet doit définir sa durée de conservation des demandes et organiser la suppression des dossiers clos via son administration autorisée. La clé utilisée par le site n'a aucun droit de suppression ni de mise à jour de la table.

Documentation vérifiée le 20 septembre 2026 : [clés API](https://supabase.com/docs/guides/api/api-keys), [sécuriser l'API](https://supabase.com/docs/guides/api/securing-your-api), [nouveaux privilèges explicites pour les tables](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically).
