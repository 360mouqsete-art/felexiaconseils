# Réception des demandes avec Supabase

Projet demandé par le propriétaire : `yxdmkqdnesemaqzagatm`.

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
