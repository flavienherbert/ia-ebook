# Nova Digital Studio

Site vitrine premium pour **Nova Digital Studio**, agence digitale fictive (sites web, branding,
SEO, publicité Meta & Google Ads, marketing digital, automatisation, intelligence artificielle,
création de contenu, community management).

Construit avec **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**
et **next-themes**. Toutes les données (services, portfolio, blog, équipe, avis clients) sont
fictives et centralisées dans `src/data/` — remplacez-les par votre contenu réel avant mise en
production.

## Sommaire

- [Installation](#installation)
- [Développement](#développement)
- [Architecture du projet](#architecture-du-projet)
- [Personnalisation](#personnalisation)
- [Déploiement](#déploiement)
- [Maintenance](#maintenance)

## Installation

Prérequis : Node.js 20+ et npm.

```bash
npm install
cp .env.example .env.local
```

Renseignez `.env.local` :

| Variable | Description | Requis |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (canonical, sitemap, OG) | Recommandé |
| `CONTACT_WEBHOOK_URL` | Webhook (Zapier, Make, Slack, CRM…) qui reçoit les soumissions du formulaire de contact en JSON | Optionnel — sans elle, les soumissions sont simplement journalisées côté serveur |

## Développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Le mode sombre/clair, les animations et le
formulaire de contact fonctionnent immédiatement en local (les emails ne sont réellement envoyés
que si `CONTACT_WEBHOOK_URL` est configurée).

```bash
npm run lint    # ESLint (Next.js + TypeScript + règles React Hooks)
npm run build   # build de production + vérification TypeScript
npm run start   # sert le build de production en local
```

## Architecture du projet

```
src/
  app/                      Routes (App Router)
    page.tsx                Accueil
    a-propos/               À propos (mission, valeurs, équipe, historique)
    services/                Liste des services
      [slug]/               Page détaillée par service (généré depuis src/data/services.ts)
    portfolio/              Liste des réalisations
      [slug]/               Étude de cas par projet
    blog/                   Liste des articles (recherche, catégories, pagination)
      [slug]/               Article complet
    contact/                Formulaire de contact + coordonnées + FAQ
    mentions-legales/        Contenu légal fictif
    politique-de-confidentialite/
    conditions-generales/
    api/contact/route.ts    Endpoint de traitement du formulaire (validation + honeypot)
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
    not-found.tsx, error.tsx, loading.tsx
  components/
    ui/                     Primitives (Button, Badge, Container, Section, Reveal, ThemeToggle…)
    layout/                 Header, Footer, ScrollProgress, BackToTop, CookieBanner
    sections/               Blocs de page (Hero, ServiceCard, Testimonials, FaqAccordion…)
    forms/                  ContactForm, NewsletterForm
    seo/JsonLd.tsx          Injection de données structurées Schema.org
  data/                     Tout le contenu du site (services, portfolio, blog, équipe, avis…)
  lib/                      Utilitaires (validation, SEO, cn(), mapping d'icônes)
  hooks/                    Hooks partagés (useMounted)
```

Le contenu (`src/data/*.ts`) est entièrement typé (`src/lib/types.ts`) et séparé de
l'affichage : les pages de services, portfolio et blog sont générées à partir de ces données via
`generateStaticParams`, ce qui évite de dupliquer la mise en page pour chaque élément.

Les visuels (photos d'équipe, captures de projets, illustrations d'articles) sont des
**placeholders génératifs** (`PlaceholderArt`, dégradés + initiales) plutôt que des images
stock, pour rester 100% autonome sans dépendance réseau. Remplacez-les par vos propres visuels
(voir ci-dessous).

## Personnalisation

### Contenu textuel et données métier

Tout se modifie dans `src/data/` :

- `services.ts` — les 9 services, chacun avec avantages, méthodologie, processus, tarifs, FAQ
- `portfolio.ts` — les études de cas
- `blog.ts` — les articles (catégories dans `blogCategories`)
- `team.ts`, `testimonials.ts`, `faq.ts`, `stats.ts`, `process-steps.ts`
- `nav.ts` — coordonnées, réseaux sociaux, liens de navigation (`siteConfig`)

### Identité visuelle

- Couleurs, dégradés et tokens de thème : `src/app/globals.css` (variables `--electric`,
  `--violet`, etc., dupliquées pour le mode sombre sous `.dark`)
- Police : `Geist` via `next/font` dans `src/app/layout.tsx` — changez l'import pour une autre
  police Google Fonts
- Logo : le bloc `N` dégradé dans `Header.tsx`/`Footer.tsx` + `public/favicon.svg`

### Remplacer les visuels génératifs par de vraies images

Remplacez `<PlaceholderArt ... />` par `<Image src="..." alt="..." fill />` (composant
`next/image`) une fois vos visuels réels disponibles, et déposez les fichiers dans `public/`.

### Formulaire de contact

`src/components/forms/ContactForm.tsx` (validation client) et `src/app/api/contact/route.ts`
(validation serveur + honeypot anti-bot + limite de fréquence par IP) partagent les mêmes règles
définies dans `src/lib/validation.ts`. Pour brancher un vrai envoi d'email, configurez
`CONTACT_WEBHOOK_URL` vers votre automatisation (Zapier/Make) ou adaptez la route pour appeler
votre fournisseur d'emailing.

## Déploiement

Le projet est prêt pour **Vercel** (recommandé, zéro configuration) :

1. Poussez le dépôt sur GitHub
2. Importez-le sur [vercel.com/new](https://vercel.com/new)
3. Renseignez les variables d'environnement (`NEXT_PUBLIC_SITE_URL`, `CONTACT_WEBHOOK_URL`)
4. Déployez

Le projet fonctionne aussi sur toute plateforme supportant Next.js (Node.js 20+) : Netlify, un
serveur Node avec `npm run build && npm run start`, ou un conteneur Docker standard.

Avant la mise en ligne réelle :

- Remplacez les mentions légales fictives (`mentions-legales`, `conditions-generales`) par vos
  informations d'entreprise réelles
- Mettez à jour `siteConfig` (`src/data/nav.ts`) avec vos vraies coordonnées
- Générez/déposez un vrai favicon et vos visuels de marque

## Maintenance

- **Dépendances** : `npm outdated` puis `npm update` régulièrement ; testez `npm run build` après
  toute montée de version de Next.js
- **Contenu du blog** : ajoutez un objet à `blogPosts` dans `src/data/blog.ts` — la page liste, la
  recherche, le filtre par catégorie, la pagination et la page article se génèrent automatiquement
- **Nouveau service** : ajoutez un objet à `services` dans `src/data/services.ts` — la page dédiée
  est générée automatiquement via `generateStaticParams`
- **SEO** : `src/app/sitemap.ts` et les métadonnées par page (`buildMetadata` dans
  `src/lib/seo.ts`) se mettent à jour automatiquement à partir des données ; pensez à soumettre le
  sitemap dans Google Search Console après le premier déploiement
- **Accessibilité/Performance** : `npm run build` puis testez avec Lighthouse ou
  `npx @next/bundle-analyzer` si le bundle grossit significativement
