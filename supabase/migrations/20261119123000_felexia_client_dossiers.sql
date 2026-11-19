-- Client file follow-up. Do not apply this from the application.
-- Run it once in the Supabase SQL editor of the existing Felexia project.
begin;

create schema if not exists felexia_private;
revoke all on schema felexia_private from public, anon, authenticated;
grant usage on schema felexia_private to authenticated, service_role;

create table public.felexia_dossier_staff (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique
    constraint felexia_staff_email check (email = lower(email) and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  created_at timestamptz not null default now()
);

create table public.felexia_dossiers (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique
    constraint felexia_dossier_reference check (reference ~ '^[A-Z0-9][A-Z0-9-]{2,31}$'),
  client_email text not null
    constraint felexia_dossier_email check (client_email = lower(client_email) and client_email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  client_user_id uuid references auth.users (id) on delete set null,
  type text not null
    constraint felexia_dossier_type check (type in ('creation','domiciliation','modification')),
  state text not null default 'open'
    constraint felexia_dossier_state check (state in ('open','closed')),
  created_at timestamptz not null default now()
);

create table public.felexia_dossier_steps (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.felexia_dossiers (id) on delete cascade,
  position integer not null check (position >= 0 and position < 20),
  step_key text not null check (char_length(step_key) between 2 and 40),
  label_fr text not null,
  label_en text not null,
  label_ar text not null,
  status text not null default 'pending'
    constraint felexia_step_status check (status in ('pending','current','done')),
  completed_on date,
  unique (dossier_id, position)
);

create table public.felexia_dossier_documents (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.felexia_dossiers (id) on delete cascade,
  kind text not null check (kind in ('request','delivery')),
  label text not null check (char_length(label) between 2 and 160),
  status text not null default 'to_provide'
    constraint felexia_document_status check (status in ('to_provide','received','validated','correction')),
  storage_path text,
  filename text,
  mime text check (mime is null or mime in ('application/pdf','image/jpeg','image/png')),
  size_bytes integer check (size_bytes is null or (size_bytes > 0 and size_bytes <= 10485760)),
  created_at timestamptz not null default now()
);

create table public.felexia_dossier_notes (
  id uuid primary key default gen_random_uuid(),
  dossier_id uuid not null references public.felexia_dossiers (id) on delete cascade,
  body text not null check (char_length(body) between 2 and 2000),
  created_at timestamptz not null default now()
);

create or replace function felexia_private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.felexia_dossier_staff where user_id = auth.uid());
$$;

create or replace function felexia_private.owns_dossier(target uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.felexia_dossiers
    where id = target
      and (
        client_user_id = auth.uid()
        or lower(client_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
  );
$$;

revoke all on function felexia_private.is_staff() from public, anon;
revoke all on function felexia_private.owns_dossier(uuid) from public, anon;
grant execute on function felexia_private.is_staff() to authenticated, service_role;
grant execute on function felexia_private.owns_dossier(uuid) to authenticated, service_role;

alter table public.felexia_dossier_staff enable row level security;
alter table public.felexia_dossiers enable row level security;
alter table public.felexia_dossier_steps enable row level security;
alter table public.felexia_dossier_documents enable row level security;
alter table public.felexia_dossier_notes enable row level security;
alter table public.felexia_dossier_staff force row level security;
alter table public.felexia_dossiers force row level security;
alter table public.felexia_dossier_steps force row level security;
alter table public.felexia_dossier_documents force row level security;
alter table public.felexia_dossier_notes force row level security;

revoke all on table public.felexia_dossier_staff from public, anon, authenticated, service_role;
revoke all on table public.felexia_dossiers from public, anon, authenticated, service_role;
revoke all on table public.felexia_dossier_steps from public, anon, authenticated, service_role;
revoke all on table public.felexia_dossier_documents from public, anon, authenticated, service_role;
revoke all on table public.felexia_dossier_notes from public, anon, authenticated, service_role;

grant select, insert, update, delete on table public.felexia_dossier_staff to service_role;
grant select, insert, update, delete on table public.felexia_dossiers to service_role;
grant select, insert, update, delete on table public.felexia_dossier_steps to service_role;
grant select, insert, update, delete on table public.felexia_dossier_documents to service_role;
grant select, insert, update, delete on table public.felexia_dossier_notes to service_role;
grant select on table public.felexia_dossier_staff to authenticated;
grant select on table public.felexia_dossiers to authenticated;
grant select on table public.felexia_dossier_steps to authenticated;
grant select on table public.felexia_dossier_documents to authenticated;
grant select on table public.felexia_dossier_notes to authenticated;

create policy felexia_staff_read_self on public.felexia_dossier_staff
  for select to authenticated using (user_id = auth.uid() or felexia_private.is_staff());
create policy felexia_dossier_read on public.felexia_dossiers
  for select to authenticated using (felexia_private.is_staff() or felexia_private.owns_dossier(id));
create policy felexia_step_read on public.felexia_dossier_steps
  for select to authenticated using (felexia_private.is_staff() or felexia_private.owns_dossier(dossier_id));
create policy felexia_document_read on public.felexia_dossier_documents
  for select to authenticated using (felexia_private.is_staff() or felexia_private.owns_dossier(dossier_id));
create policy felexia_note_read on public.felexia_dossier_notes
  for select to authenticated using (felexia_private.is_staff() or felexia_private.owns_dossier(dossier_id));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('felexia-dossiers', 'felexia-dossiers', false, 10485760, array['application/pdf','image/jpeg','image/png'])
on conflict (id) do update set public = false, file_size_limit = 10485760, allowed_mime_types = array['application/pdf','image/jpeg','image/png'];

create policy felexia_storage_staff on storage.objects
  for all to authenticated
  using (bucket_id = 'felexia-dossiers' and felexia_private.is_staff())
  with check (bucket_id = 'felexia-dossiers' and felexia_private.is_staff());
create policy felexia_storage_client_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'felexia-dossiers'
    and felexia_private.owns_dossier(((storage.foldername(name))[1])::uuid)
  );

comment on table public.felexia_dossiers is
  'Client files. RLS: a client reads only their rows; staff reads all. The server secret key bypasses RLS and must apply the same rule.';

commit;

-- After the first staff member has opened the magic link once, run this
-- separately with their real email. Do not invent a user id.
-- insert into public.felexia_dossier_staff (user_id, email)
-- select id, lower(email) from auth.users where lower(email) = lower('hadigui.aziz@gmail.com');
