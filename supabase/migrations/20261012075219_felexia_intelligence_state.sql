-- Additive editorial state only; no contact data, existing guides or roles changed.
-- Created through Supabase CLI 2.117.0 migration new felexia_intelligence_state.
begin;

create table public.felexia_intelligence_state (
  id smallint primary key constraint felexia_intelligence_singleton check (id = 1),
  revision bigint not null default 0 constraint felexia_intelligence_revision check (revision >= 0),
  state jsonb not null
    constraint felexia_intelligence_state_object check (jsonb_typeof(state) = 'object')
    constraint felexia_intelligence_state_version check (state @> '{"version":1}'::jsonb)
    constraint felexia_intelligence_state_size check (octet_length(state::text) <= 16777216),
  updated_at timestamptz not null default now()
);

alter table public.felexia_intelligence_state enable row level security;
alter table public.felexia_intelligence_state force row level security;
revoke all on public.felexia_intelligence_state from public, anon, authenticated, service_role;
grant select, update on public.felexia_intelligence_state to service_role;

insert into public.felexia_intelligence_state (id, state) values (1,
  '{"version":1,"topics":[],"sources":[],"jobs":[],"events":[],"reports":[],"metrics":[],"settings":{}}'::jsonb);

-- Optimistic locking: a stale snapshot cannot overwrite a newer publication,
-- report, budget reservation or worker lease. No network call occurs in SQL.
create function public.felexia_intelligence_cas(expected_revision bigint, next_state jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = ''
set statement_timeout = '5s'
as $$
declare
  committed_revision bigint;
begin
  if expected_revision < 0 or expected_revision is null or next_state is null
     or jsonb_typeof(next_state) <> 'object'
     or not (next_state @> '{"version":1}'::jsonb)
     or octet_length(next_state::text) > 16777216 then
    raise exception 'Invalid editorial state' using errcode = '22023';
  end if;
  update public.felexia_intelligence_state
  set state = next_state, revision = revision + 1, updated_at = now()
  where id = 1 and revision = expected_revision
  returning revision into committed_revision;
  return jsonb_build_object('committed', committed_revision is not null, 'revision', committed_revision);
end;
$$;

revoke all on function public.felexia_intelligence_cas(bigint, jsonb) from public, anon, authenticated;
grant execute on function public.felexia_intelligence_cas(bigint, jsonb) to service_role;

comment on table public.felexia_intelligence_state is
  'Server-only editorial state. Publication groups FR/AR/EN and daily reports in one atomic revision. No public policies. Export state before rollback.';
comment on function public.felexia_intelligence_cas(bigint, jsonb) is
  'Service-role-only SECURITY INVOKER compare-and-swap; false means reread and retry a synchronous pure state update.';

commit;
