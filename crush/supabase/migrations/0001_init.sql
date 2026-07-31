-- Crush — schéma initial (soumission -> modération -> post auto)
-- À exécuter sur un projet Supabase dédié (SQL editor, ou `supabase db push`).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists boites (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  slug text not null unique,
  instagram_handle text,
  created_at timestamptz not null default now()
);

create table if not exists soirees (
  id uuid primary key default gen_random_uuid(),
  boite_id uuid not null references boites(id) on delete cascade,
  date_soiree date not null,
  libelle text not null,
  statut text not null default 'brouillon'
    check (statut in ('brouillon', 'publiee', 'archivee')),
  created_at timestamptz not null default now()
);

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  soiree_id uuid not null references soirees(id) on delete cascade,
  storage_path text not null,
  largeur int,
  hauteur int,
  ordre int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists demandes (
  id uuid primary key default gen_random_uuid(),
  photo_id uuid references photos(id) on delete set null,
  upload_path text,
  soiree_id uuid not null references soirees(id) on delete cascade,
  description text,
  message_utilisateur text not null,
  contact_demandeur text,
  statut text not null default 'en_attente'
    check (statut in ('en_attente', 'approuvee', 'rejetee', 'publiee')),
  motif_rejet text,
  ip_hash text,
  moderateur_id uuid references auth.users(id),
  created_at timestamptz not null default now(),
  moderated_at timestamptz,
  constraint demande_a_une_photo check (photo_id is not null or upload_path is not null)
);

create index if not exists demandes_statut_idx on demandes(statut);
create index if not exists demandes_ip_hash_created_idx on demandes(ip_hash, created_at);

create table if not exists posts_generes (
  id uuid primary key default gen_random_uuid(),
  demande_id uuid not null unique references demandes(id) on delete cascade,
  image_path text not null,
  image_url_publique text,
  publie_le timestamptz,
  instagram_media_id text,
  created_at timestamptz not null default now()
);

create table if not exists signalements (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts_generes(id) on delete cascade,
  demande_id uuid references demandes(id) on delete cascade,
  -- lien/texte collé par le signaleur quand il ne connaît pas l'id interne
  -- du post ou de la demande (cas du formulaire public générique)
  reference text,
  motif text not null,
  details text,
  statut text not null default 'ouvert' check (statut in ('ouvert', 'traite')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Storage
-- ---------------------------------------------------------------------------
-- crush-photos : photos brutes des soirées + uploads utilisateurs (privé,
--   servi uniquement via URL signée par le serveur).
-- crush-posts  : PNG générés prêts à publier (public, requis par l'API
--   Instagram Graph qui a besoin d'une URL publique).

insert into storage.buckets (id, name, public)
values ('crush-photos', 'crush-photos', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('crush-posts', 'crush-posts', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
-- Le formulaire public n'écrit jamais directement dans ces tables : toutes
-- les écritures publiques passent par des routes serveur utilisant la clé
-- service_role (qui contourne RLS). Les policies ci-dessous couvrent :
--   - la lecture publique des soirées publiées / leurs photos,
--   - l'accès complet pour les modérateurs authentifiés (back-office).

alter table boites enable row level security;
alter table soirees enable row level security;
alter table photos enable row level security;
alter table demandes enable row level security;
alter table posts_generes enable row level security;
alter table signalements enable row level security;

create policy "lecture_publique_boites" on boites
  for select using (true);

create policy "lecture_publique_soirees_publiees" on soirees
  for select using (statut = 'publiee');

create policy "lecture_publique_photos" on photos
  for select using (
    exists (
      select 1 from soirees s
      where s.id = photos.soiree_id and s.statut = 'publiee'
    )
  );

create policy "moderateurs_all_boites" on boites
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "moderateurs_all_soirees" on soirees
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "moderateurs_all_photos" on photos
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "moderateurs_all_demandes" on demandes
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "moderateurs_all_posts_generes" on posts_generes
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "moderateurs_all_signalements" on signalements
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
