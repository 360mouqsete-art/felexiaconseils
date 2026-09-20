-- Felexia contact storage only. No change to other project tables or roles.
-- Created with Supabase CLI 2.117.0: migration new felexia_contact_requests.
begin;

create table public.felexia_contact_requests (
  request_id text primary key
    constraint felexia_request_id_format check (request_id ~ '^[A-Za-z0-9-]{8,60}$'),
  reference text not null
    constraint felexia_reference_format check (reference ~ '^FLX-[A-F0-9]{8}$'),
  payload_hash text not null
    constraint felexia_payload_hash_format check (payload_hash ~ '^[a-f0-9]{64}$'),
  payload jsonb not null
    constraint felexia_payload_object check (jsonb_typeof(payload) = 'object')
    constraint felexia_payload_consent check (payload @> '{"consent":true}'::jsonb)
    constraint felexia_payload_size check (octet_length(payload::text) <= 20000),
  received_at timestamptz not null default now(),
  status text not null default 'new'
    constraint felexia_contact_status check (status in ('new','in_progress','closed'))
);

create index felexia_contact_received_at_idx
  on public.felexia_contact_requests (received_at desc);

alter table public.felexia_contact_requests enable row level security;
alter table public.felexia_contact_requests force row level security;

-- Explicit privileges also work with Supabase's new opt-in Data API defaults.
-- No browser, anonymous visitor, or signed-in Supabase user may read/write leads.
revoke all on table public.felexia_contact_requests from public, anon, authenticated, service_role;
grant select, insert on table public.felexia_contact_requests to service_role;

comment on table public.felexia_contact_requests is
  'Private Felexia inquiries. Server secret key only; no public RLS policies. Review retention and remove completed records through authorized administration.';
comment on column public.felexia_contact_requests.request_id is
  'Durable idempotency key. Repeated submissions never update an existing payload.';

commit;
