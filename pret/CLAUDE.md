# Prêt. — CLAUDE.md

Micro-SaaS B2B pour conciergeries de location courte durée. Une question
par logement : « est-il prêt ? ». Stack : Next.js 14 (App Router),
TypeScript, Tailwind, Supabase (Postgres + Auth), déploiement Vercel.

> Statut : brouillon soumis à validation. Rien de la Phase 1 n'a été
> exécuté — ni migration Supabase, ni écriture de code d'auth/CRUD. Ce
> fichier décrit le plan proposé.

## Déjà en place (hors périmètre de ce document)

- `app/(marketing)/` — landing page marketing, contenu figé, ne pas
  modifier sans demande explicite.
- `app/(demo)/demo/` — prototype jetable 100% client (données fictives en
  `useState`, aucun appel réseau). Sert uniquement à visualiser le produit ;
  n'est pas réutilisé tel quel par la Phase 1, mais ses types
  (`_components/types.ts`) et son découpage de vues (Aujourd'hui / Logements
  / Intervenants / Anomalies / Paramètres) servent de référence de forme.

## Périmètre Phase 1

Un utilisateur peut créer un compte, obtenir automatiquement une
organisation, se connecter, et gérer une liste de logements avec
checklist. **Explicitement hors périmètre** : import iCal, Stripe,
dashboard temps réel, gestion des intervenants/anomalies (ça viendra en
Phase 2+).

## Modèle de données (Postgres / Supabase)

```sql
-- organizations : une conciergerie
organizations (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  created_at    timestamptz not null default now()
)

-- profiles : un utilisateur applicatif, rattaché à une organisation
profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references organizations(id) on delete cascade,
  full_name       text,
  role            text not null default 'admin', -- 'admin' | 'coordinateur'
  created_at      timestamptz not null default now()
)

-- properties : un logement
properties (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  nom             text not null,
  adresse         text not null,
  checklist       jsonb not null default '[]', -- [{ "label": string, "position": number }]
  created_at      timestamptz not null default now()
)
```

Décisions prises faute de spec plus détaillée (à confirmer) :

- **`checklist` en `jsonb`** sur `properties` plutôt qu'une table séparée
  `checklist_items` : en Phase 1 la checklist n'est qu'un gabarit texte
  (pas encore de suivi fait/pas fait par mission), donc pas besoin d'une
  table relationnelle tant que les missions n'existent pas (Phase 2).
- **`role` en `text` avec check applicatif**, pas un `enum` Postgres, pour
  rester simple à faire évoluer.
- **Une organisation par utilisateur** à la création de compte (pas
  d'invitation multi-membres en Phase 1 — le bloc « Équipe » du prototype
  démo reste un mock jusqu'à Phase 2+).
- RLS activée sur les 3 tables, scoping strict par `organization_id` via
  `profiles.organization_id = auth.uid()`'s profile lookup.

## Détail étape 1 (9 étapes)

1. **Setup Supabase + client Next.js** — `lib/supabase/client.ts` (browser)
   et `lib/supabase/server.ts` (server components / route handlers), lecture
   des variables d'env `NEXT_PUBLIC_SUPABASE_URL` /
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`.
2. **Migration SQL — `organizations` + `profiles`**, avec RLS : un profil
   ne peut lire/écrire que sa propre ligne et celles de sa propre
   organisation.
3. **Migration SQL — `properties`**, RLS scopée par `organization_id` du
   profil connecté (select/insert/update/delete).
4. **Trigger `handle_new_user`** — fonction Postgres + trigger sur
   `auth.users` (`after insert`) qui crée atomiquement une `organization`
   (nom par défaut depuis les métadonnées du signup ou "Mon organisation")
   puis un `profile` (`role = 'admin'`) pointant dessus. Doit être
   transactionnel : jamais l'un sans l'autre.
5. **Page `/signup`** — formulaire email + mot de passe + nom
   d'organisation, appelle `supabase.auth.signUp` avec le nom d'org dans
   `options.data` (consommé par le trigger), redirige vers `/properties`
   une fois la session active.
6. **Page `/login` + `/logout` + middleware** — middleware Next
   (`middleware.ts`) qui protège `/properties*` et redirige vers `/login`
   si pas de session ; `/logout` détruit la session côté serveur.
7. **`/properties` (liste)** — server component, lit les logements de
   l'organisation du profil connecté, affiche nom/adresse/nombre d'items
   de checklist.
8. **`/properties/new` (création)** — formulaire nom + adresse + checklist
   (lignes texte ajoutables), insert scopé à `organization_id` du profil
   connecté ; redirige vers `/properties` après création.
9. **Layout applicatif** — shell commun aux pages protégées (topbar avec
   nom d'organisation + bouton déconnexion), cohérent visuellement avec les
   tokens déjà définis dans `tailwind.config.ts` (ink/paper/line/etc.) et
   les polices `next/font/google` du layout racine.

## Ce qu'il me manque pour exécuter

- `.env.local` avec les 3 variables Supabase ci-dessus (projet Supabase à
  créer si pas déjà existant).
- Confirmation que le repo GitHub est déjà créé et que `gh` est authentifié
  côté environnement, pour le push + déploiement Vercel en fin de Phase 1.
