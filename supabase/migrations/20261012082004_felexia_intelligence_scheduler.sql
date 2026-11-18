-- Additive independent scheduler. The job is created INACTIVE.
-- Created with Supabase CLI: migration new felexia_intelligence_scheduler.
-- Never send CRON_SECRET itself through pg_net: its request queue is readable
-- by database login roles, and Supabase does not support changing its grants.
begin;

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

create schema if not exists felexia_intelligence_ops authorization postgres;
revoke all on schema felexia_intelligence_ops from public, anon, authenticated, service_role;

create table if not exists felexia_intelligence_ops.scheduler_runs (
  request_id bigint primary key,
  invocation_nonce uuid not null unique,
  queued_at timestamptz not null default now(),
  local_day date not null,
  outcome text not null default 'queued'
    constraint felexia_scheduler_outcome check (outcome in ('queued','http_success','http_failure','transport_failure')),
  http_status integer,
  checked_at timestamptz
);
alter table felexia_intelligence_ops.scheduler_runs enable row level security;
alter table felexia_intelligence_ops.scheduler_runs force row level security;
revoke all on felexia_intelligence_ops.scheduler_runs from public, anon, authenticated, service_role;

comment on table felexia_intelligence_ops.scheduler_runs is
  'Private scheduler transport evidence. Contains nonce, request ID and status only, never CRON_SECRET, signatures, response body or customer data. HTTP success does not prove an article was published; consult editorial reports.';

do $migration$
declare
  existing_id bigint;
  named_jobs integer;
  job_command text := $command$
    with reconciled as (
      update felexia_intelligence_ops.scheduler_runs as run
      set outcome = case
            when response.timed_out or response.error_msg is not null then 'transport_failure'
            when response.status_code between 200 and 299 then 'http_success'
            else 'http_failure' end,
          http_status = response.status_code,
          checked_at = clock_timestamp()
      from net._http_response as response
      where run.request_id = response.id and run.outcome = 'queued'
      returning run.request_id
    ),
    input as materialized (
      select floor(extract(epoch from clock_timestamp()))::bigint::text as timestamp,
             gen_random_uuid() as nonce,
             (select decrypted_secret from vault.decrypted_secrets
              where name = 'felexia_intelligence_cron_secret') as signing_secret
    ),
    queued as (
      select net.http_post(
          url := 'https://www.felexiaconseils.com/api/intelligence-cron',
          body := '{}'::jsonb,
          headers := jsonb_build_object(
            'Content-Type', 'application/json',
            'X-Felexia-Cron-Timestamp', input.timestamp,
            'X-Felexia-Cron-Nonce', input.nonce::text,
            'X-Felexia-Cron-Signature', encode(extensions.hmac(
              convert_to(input.timestamp || '.' || input.nonce::text || '.POST./api/intelligence-cron', 'UTF8'),
              convert_to(input.signing_secret, 'UTF8'), 'sha256'), 'hex')
          ),
          timeout_milliseconds := 240000
        ) as request_id, input.nonce
      from input
      where input.signing_secret is not null and length(input.signing_secret) >= 24
    ),
    recorded as (
      insert into felexia_intelligence_ops.scheduler_runs (request_id, invocation_nonce, local_day)
      select request_id, nonce, (clock_timestamp() at time zone 'Africa/Casablanca')::date from queued
      returning request_id
    )
    select request_id from recorded;
  $command$;
begin
  if current_user <> 'postgres' then
    raise exception 'The scheduler must be installed as postgres';
  end if;
  if to_regprocedure('extensions.hmac(bytea,bytea,text)') is null then
    raise exception 'The existing pgcrypto hmac function must be available in extensions';
  end if;
  if to_regclass('vault.decrypted_secrets') is null then
    raise exception 'Supabase Vault must be installed before the scheduler';
  end if;
  if to_regclass('public.felexia_intelligence_state') is null then
    raise exception 'Apply and verify editorial state persistence before the scheduler';
  end if;

  select count(*) into named_jobs from cron.job where jobname = 'felexia-intelligence-tick';
  if named_jobs > 1 then raise exception 'Multiple scheduler jobs already use the Felexia name'; end if;
  select jobid into existing_id from cron.job
  where jobname = 'felexia-intelligence-tick' and username = 'postgres' and database = current_database();
  if named_jobs = 1 and existing_id is null then
    raise exception 'The Felexia scheduler name belongs to another database or role';
  end if;

  if existing_id is null then
    existing_id := cron.schedule('felexia-intelligence-tick', '*/15 * * * *', job_command);
  end if;
  -- Do not pass username/database: altering them requires superuser privileges
  -- even when the requested username is already postgres. Ownership was
  -- verified above, and a newly created job already uses the current role/db.
  perform cron.alter_job(existing_id, schedule := '*/15 * * * *', command := job_command, active := false);
end;
$migration$;

commit;
