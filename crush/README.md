# Crush

App de soumission → modération → post auto pour les photos de soirée d'une
boîte de nuit. Remplace le travail manuel (capture, retouche, montage) sans
retirer la modération humaine : rien n'est publié sans qu'un modérateur ait
cliqué "Approuver".

Stack : Next.js (App Router, TypeScript) + Supabase (Postgres, Auth, Storage)
+ Vercel.

## Fonctionnement

1. Un modérateur crée une soirée et uploade les photos depuis `/admin/soirees`.
2. Un visiteur parcourt `/soiree/[id]`, clique sur la photo où il/elle
   apparaît, et envoie une demande (`/demande/[photoId]`) avec un message et
   un consentement obligatoire.
3. La demande arrive dans la file `/admin` : le modérateur l'approuve ou la
   rejette.
4. Une approbation déclenche automatiquement la génération du visuel du post
   (`/api/og/post/[demandeId]`, via `next/og`) : photo + bulle de message +
   call-to-action, au format 1080×1350.
5. Le modérateur prévisualise le post sur `/admin/demande/[id]` et le publie :
   - sans configuration Instagram, il télécharge/partage l'image lui-même
     (MVP, recommandé pour démarrer) ;
   - avec `IG_ACCESS_TOKEN` + `IG_BUSINESS_ACCOUNT_ID` configurés, la
     publication se fait automatiquement via l'API Instagram Graph.
6. Un formulaire public `/signalement` permet à quiconque de demander un
   retrait ou de signaler un contenu ; les signalements ouverts sont traités
   depuis `/admin/signalements`.

## Mise en place

### 1. Projet Supabase

- Crée un projet sur [supabase.com](https://supabase.com).
- Dans l'éditeur SQL, exécute `supabase/migrations/0001_init.sql` : il crée
  les tables (`boites`, `soirees`, `photos`, `demandes`, `posts_generes`,
  `signalements`), active la RLS, et crée les buckets Storage
  (`crush-photos` privé, `crush-posts` public).
- Active la connexion par e-mail (Magic Link) dans Authentication → Providers.
- Crée un compte modérateur (Authentication → Users → Invite) : c'est le
  compte utilisé pour se connecter sur `/admin`.

### 2. Variables d'environnement

Copie `.env.example` en `.env.local` et renseigne :

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # serveur uniquement, jamais exposée au client
RATE_LIMIT_SALT=                # chaîne aléatoire, anti-spam
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Les variables `IG_ACCESS_TOKEN` / `IG_BUSINESS_ACCOUNT_ID` sont optionnelles
(étape 2, publication auto).

### 3. Développement local

```bash
npm install
npm run dev
```

- Site public : http://localhost:3000
- Back-office : http://localhost:3000/admin (connexion par lien magique)

### 4. Déploiement (Vercel)

- Importe le dépôt sur [vercel.com](https://vercel.com), en pointant le
  **Root Directory** sur `crush/`.
- Ajoute les mêmes variables d'environnement que ci-dessus dans les
  Settings du projet Vercel.
- Déploie.

## Sécurité & RGPD

- Le formulaire public n'écrit jamais directement dans Supabase : toutes les
  écritures passent par des routes serveur utilisant la clé `service_role`.
- Rate limit : 3 demandes / 24h par IP hachée (`src/lib/rate-limit.ts`).
- Aucune publication sans clic humain (le statut `approuvee` n'est jamais
  posé automatiquement).
- Case de consentement obligatoire sur le formulaire de demande.
- Bouton de retrait/signalement accessible en pied de page sur tout le site.

## Ce qui manque encore pour une V1 complète

- Job cron de purge (demandes rejetées après 30 jours, photos après X mois).
- Rafraîchissement automatique du token Instagram longue durée (~60 jours).
- Extraction automatique des dimensions des photos uploadées.
