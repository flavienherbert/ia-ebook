# nextech — site vitrine (3 ebooks)

Site vitrine one-page, ambiance cinématographique, pour la boutique de guides
nextech (Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis).

## Développement local

```bash
npm install
npm run dev
```

Puis ouvre http://localhost:3000

## Build de production

```bash
npm run build
npm run start
```

## Déploiement sur Vercel

1. Pousse le dépôt sur GitHub (déjà fait si tu lis ceci depuis le repo).
2. Sur [vercel.com](https://vercel.com) → **Add New → Project** → importe le dépôt.
3. Renseigne le **Root Directory** sur `nextech` (le projet Next.js vit dans ce sous-dossier).
4. Clique **Deploy** — aucune variable d'environnement n'est nécessaire.

## Structure

- `config.ts` — contenu centralisé (livres, textes, chiffres, liens Stripe)
- `components/` — `SmoothScroll` (Lenis), `Grain`, `RotatingSeal`, `Marquee`
- `components/sections/` — une section par fichier (Loader, Hero, Manifesto, Books, Stats, WhatYouBuild, FinalCTA, Footer)
