# Klarim

Site vitrine de **Klarim**, agence digitale : création de sites web et e-commerce, SEO, publicité
Meta & Google Ads, branding, automatisation & IA, création de contenu, community management,
maintenance et audit digital.

Construit avec **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**
et **next-themes**. Le contenu métier (services, portfolio, blog, équipe) est centralisé dans
`src/data/`, entièrement typé, et prêt à être personnalisé avec vos propres informations.

📘 **Avant de personnaliser ou déployer ce site, consultez ces deux guides :**

- [`GUIDE-PERSONNALISATION.md`](./GUIDE-PERSONNALISATION.md) — check-list de lancement, comment
  modifier les textes/images/couleurs/tarifs, ajouter un service, publier un article, déployer et
  maintenir le site, et faire évoluer son architecture (espace client, paiement, chatbot...).
- [`BRAND.md`](./BRAND.md) — charte de marque (logo, palette, typographie, ton de communication).

## Sommaire

- [Installation](#installation)
- [Développement](#développement)
- [Architecture du projet](#architecture-du-projet)
- [Déploiement rapide](#déploiement-rapide)

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
    a-propos/               À propos (mission, vision, valeurs, positionnement, équipe, historique)
    services/                Liste des 12 services
      [slug]/               Page détaillée par service (généré depuis src/data/services.ts)
    portfolio/              Liste des réalisations
      [slug]/               Étude de cas par projet
    blog/                   Liste des articles (recherche, catégories, pagination)
      [slug]/               Article complet
    contact/                Formulaire + calendrier de RDV + coordonnées + FAQ
    mentions-legales/, politique-de-confidentialite/, conditions-generales/
    api/contact/route.ts    Endpoint de traitement du formulaire (validation + honeypot)
    sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
    not-found.tsx, error.tsx, loading.tsx
  components/
    ui/                     Primitives (Button, Badge, Container, Section, Reveal, ThemeToggle…)
    layout/                 Header, Footer, ScrollProgress, BackToTop, CookieBanner
    sections/               Blocs de page (Hero, ServiceCard, Testimonials, Guarantees, BookingCta…)
    forms/                  ContactForm, NewsletterForm
    seo/JsonLd.tsx          Injection de données structurées Schema.org
  data/                     Tout le contenu du site (services, portfolio, blog, équipe, avis…)
  lib/                      Utilitaires (validation, SEO, cn(), mapping d'icônes)
  hooks/                    Hooks partagés (useMounted)
```

Le contenu (`src/data/*.ts`) est entièrement typé (`src/lib/types.ts`) et séparé de
l'affichage : les pages de services, portfolio et blog sont générées à partir de ces données via
`generateStaticParams`, ce qui évite de dupliquer la mise en page pour chaque élément. Voir
[`GUIDE-PERSONNALISATION.md`](./GUIDE-PERSONNALISATION.md) pour le détail de chaque fichier.

Les visuels (photos d'équipe, captures de projets, illustrations d'articles) sont des
**placeholders génératifs** (`PlaceholderArt`, dégradés de marque + initiales) plutôt que des
images stock, pour rester 100% autonome sans dépendance réseau. Le guide de personnalisation
explique comment les remplacer par vos propres visuels.

## Déploiement rapide

Le projet est prêt pour **Vercel** :

1. Poussez le dépôt sur GitHub
2. Importez-le sur [vercel.com/new](https://vercel.com/new) (indiquez le sous-dossier du projet
   comme **Root Directory** si le site ne se trouve pas à la racine du dépôt)
3. Renseignez les variables d'environnement (`NEXT_PUBLIC_SITE_URL`, `CONTACT_WEBHOOK_URL`)
4. Déployez

Le projet fonctionne aussi sur toute plateforme supportant Next.js (Node.js 20+) : Netlify, un
serveur Node avec `npm run build && npm run start`, ou un conteneur Docker standard.

**Avant toute mise en ligne commerciale**, suivez la check-list de lancement dans
[`GUIDE-PERSONNALISATION.md`](./GUIDE-PERSONNALISATION.md#1-avant-de-lancer--la-check-list-de-personnalisation)
(mentions légales, coordonnées, tarifs, équipe, témoignages).
