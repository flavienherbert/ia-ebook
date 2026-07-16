# Guide de personnalisation — Klarim

Ce guide explique comment adapter le site à votre entreprise réelle avant sa mise en ligne, puis
comment le faire vivre au quotidien. Aucune compétence en développement n'est requise pour la
plupart des opérations décrites ici — un éditeur de texte suffit.

## Sommaire

1. [Avant de lancer : la check-list de personnalisation](#1-avant-de-lancer--la-check-list-de-personnalisation)
2. [Modifier les textes](#2-modifier-les-textes)
3. [Remplacer les images](#3-remplacer-les-images)
4. [Changer les couleurs](#4-changer-les-couleurs)
5. [Ajouter ou modifier un service](#5-ajouter-ou-modifier-un-service)
6. [Publier un article de blog](#6-publier-un-article-de-blog)
7. [Déployer le site](#7-déployer-le-site)
8. [Assurer la maintenance](#8-assurer-la-maintenance)
9. [Faire évoluer le site (roadmap technique)](#9-faire-évoluer-le-site-roadmap-technique)

---

## 1. Avant de lancer : la check-list de personnalisation

Ces éléments doivent être mis à jour avec vos vraies informations avant toute mise en ligne
commerciale :

- [ ] **Coordonnées** (`src/data/nav.ts`, objet `siteConfig`) : email, téléphone, adresse, horaires,
      liens réseaux sociaux
- [ ] **Mentions légales** (`src/app/mentions-legales/page.tsx`) : forme juridique, capital social,
      numéro SIRET/RCS, TVA intracommunautaire, hébergeur réel — tous les champs entre crochets
      `[...]`
- [ ] **Conditions générales** (`src/app/conditions-generales/page.tsx`) : à faire valider par un
      professionnel du droit si vous vendez des prestations à distance
- [ ] **Équipe** (`src/data/team.ts`) : remplacez les membres d'exemple par votre véritable équipe
- [ ] **Témoignages** (`src/data/testimonials.ts`) : remplacez par les avis de vos vrais clients
      dès que vous en disposez (ne publiez jamais un témoignage attribué à une personne réelle sans
      son accord explicite)
- [ ] **Portfolio** (`src/data/portfolio.ts`) : remplacez les études de cas modèles par vos
      véritables projets au fur et à mesure
- [ ] **Tarifs** (`src/data/services.ts`, champ `pricing` de chaque service) : ajustez les
      fourchettes à votre marché, vos coûts réels et votre positionnement
- [ ] **Nom de domaine et email** : `NEXT_PUBLIC_SITE_URL` (fichier `.env.local`) et `siteConfig.url`
      / `siteConfig.email`

## 2. Modifier les textes

Tout le contenu textuel du site est centralisé dans le dossier `src/data/` — vous n'avez presque
jamais besoin de toucher aux fichiers de mise en page (`src/app/`, `src/components/`).

| Fichier | Contenu |
| --- | --- |
| `src/data/nav.ts` | Coordonnées, navigation, réseaux sociaux (`siteConfig`) |
| `src/data/services.ts` | Les 12 services : description, avantages, méthodologie, processus, livrables, délais, tarifs, options, FAQ |
| `src/data/portfolio.ts` | Les études de cas |
| `src/data/blog.ts` | Les articles de blog et leurs catégories |
| `src/data/team.ts` | Les membres de l'équipe |
| `src/data/testimonials.ts` | Les avis clients |
| `src/data/faq.ts` | La FAQ générale (accueil, services, contact) |
| `src/data/stats.ts` | Les chiffres clés et les points « pourquoi nous choisir » |
| `src/data/process-steps.ts` | Les étapes de collaboration |

Chaque fichier exporte des tableaux d'objets simples (`{ title: "...", description: "..." }`) :
ouvrez le fichier, repérez le texte à changer entre guillemets, modifiez-le, enregistrez. Les pages
concernées se mettent à jour automatiquement au prochain build.

Le contenu spécifique à une page (titres de héros, textes de mission/vision, mentions légales...)
se modifie directement dans le fichier de la page correspondante, sous `src/app/`.

## 3. Remplacer les images

Le site utilise des **visuels générés** (blocs à dégradé de marque avec initiales ou icône) via le
composant `PlaceholderArt`, plutôt que des photos stock, pour rester autonome sans dépendance
réseau. Pour les remplacer par de vraies photos :

1. Déposez vos images dans `public/images/` (créez le dossier si besoin).
2. Remplacez l'appel à `<PlaceholderArt label="..." ... />` par :
   ```tsx
   import Image from "next/image";

   <Image
     src="/images/votre-photo.jpg"
     alt="Description précise pour l'accessibilité"
     fill
     className="object-cover"
   />
   ```
   en conservant le conteneur parent (souvent une `div` avec `className="relative aspect-[...]"`)
   pour garder les proportions.
3. `next/image` optimise automatiquement le poids et le format de vos images au build.

Le favicon (`public/favicon.svg`) et l'image de partage réseaux sociaux
(`src/app/opengraph-image.tsx`, générée par code) peuvent être remplacés par vos propres fichiers
si vous faites créer un logo définitif.

## 4. Changer les couleurs

Toutes les couleurs de marque sont définies comme variables CSS dans `src/app/globals.css` :

```css
--electric: #2e6bff;   /* couleur primaire (mode clair) */
--violet: #7c3aed;     /* couleur secondaire (mode clair) */
```

Chaque variable a son équivalent sous `.dark { ... }` pour le mode sombre. Changez les valeurs
hexadécimales : le dégradé de marque, les boutons, les liens et les icônes actives se mettent à
jour partout automatiquement, sans avoir à modifier chaque composant individuellement.

## 5. Ajouter ou modifier un service

Ouvrez `src/data/services.ts` et dupliquez un objet existant dans le tableau `services`, puis
adaptez ses champs (`slug`, `name`, `benefits`, `pricing`, `deliverables`, `timeline`, `addOns`,
`faq`...). La page dédiée (`/services/votre-slug`) est générée automatiquement au prochain build,
tout comme son entrée dans le plan de site (`sitemap.xml`) et sa fiche dans le menu du footer si
vous l'ajoutez à `footerServiceLinks` (`src/data/nav.ts`).

Pour retirer un service, supprimez simplement son objet du tableau — la page correspondante
disparaît automatiquement.

## 6. Publier un article de blog

Ajoutez un objet au tableau `blogPosts` dans `src/data/blog.ts` :

```ts
{
  slug: "titre-de-votre-article",
  title: "Titre affiché",
  excerpt: "Résumé affiché dans la liste des articles",
  category: "SEO", // doit correspondre à une entrée de blogCategories
  tags: ["mot-clé-1", "mot-clé-2"],
  date: "2026-08-01",
  readingTime: "6 min",
  author: { name: "...", role: "...", initials: ".." },
  cover: { from: "#2e6bff", to: "#7c3aed" }, // dégradé de la vignette
  content: [
    { heading: "Premier titre de section", body: ["Paragraphe 1.", "Paragraphe 2."] },
  ],
}
```

L'article apparaît automatiquement dans la liste, la recherche, le filtre par catégorie et la
pagination du blog. Pour créer une nouvelle catégorie, ajoutez-la simplement au tableau
`blogCategories` en haut du fichier.

## 7. Déployer le site

Le projet est prêt pour **Vercel** (recommandé) :

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt et indiquez le sous-dossier du
   projet comme **Root Directory** si le site ne se trouve pas à la racine du dépôt.
3. Renseignez les variables d'environnement (voir `.env.example`) : `NEXT_PUBLIC_SITE_URL` et,
   si vous en utilisez un, `CONTACT_WEBHOOK_URL`.
4. Déployez.

Le projet fonctionne aussi sur toute plateforme supportant Next.js 16 (Node.js 20+) : Netlify, un
serveur Node avec `npm run build && npm run start`, ou un conteneur Docker standard.

## 8. Assurer la maintenance

- **Dépendances** : lancez `npm outdated` puis `npm update` régulièrement ; relancez `npm run
  build` après toute montée de version de Next.js pour vérifier l'absence de régression.
- **Sauvegardes** : votre hébergeur (Vercel ou autre) conserve l'historique des déploiements ;
  votre code source reste versionné dans Git, qui constitue votre sauvegarde de référence.
- **SEO** : `src/app/sitemap.ts` et les métadonnées de chaque page se régénèrent automatiquement à
  partir des données ; soumettez le sitemap dans Google Search Console après le premier
  déploiement et surveillez les positions mensuellement.
- **Sécurité** : le formulaire de contact intègre déjà une validation serveur, un piège à robots
  (honeypot) et une limite de fréquence par IP (`src/app/api/contact/route.ts`) ; gardez les
  dépendances à jour pour bénéficier des correctifs de sécurité.
- **Contenu** : révisez la FAQ, les tarifs et les études de cas au moins une fois par trimestre
  pour qu'ils reflètent toujours votre activité réelle.
- **Accessibilité et performance** : `npm run build` puis testez avec Lighthouse (intégré à Chrome
  DevTools) après toute modification importante de mise en page.

## 9. Faire évoluer le site (roadmap technique)

Le site est volontairement construit avec une architecture simple et modulaire (données
TypeScript typées + composants réutilisables) pour que les évolutions suivantes puissent
s'ajouter sans tout reconstruire :

| Évolution envisagée | Point d'ancrage dans l'architecture actuelle |
| --- | --- |
| **Espace client** | Ajouter un groupe de routes `src/app/(client)/espace-client/` protégé par une solution d'authentification (NextAuth.js, Clerk...) ; le design system (`Button`, `Section`, `Card`) est déjà réutilisable pour ce nouvel espace |
| **Prise de rendez-vous en ligne** | Le composant `BookingCta` (`src/components/sections/BookingCta.tsx`) est déjà en place sur la page Contact : renseignez `siteConfig.bookingUrl` (`src/data/nav.ts`) avec votre lien Calendly/Cal.com pour l'activer immédiatement, sans code supplémentaire |
| **Système de paiement** | Le projet `api/` à la racine du dépôt montre déjà un exemple d'intégration Stripe (session de paiement + vérification) réutilisable comme base pour un paiement d'acompte en ligne |
| **Boutique en ligne** | Le service « Création de site e-commerce » documente déjà l'architecture recommandée (Shopify ou headless) ; le design system du site (cartes produits, grilles) peut habiller le futur catalogue |
| **Plateforme de formation** | Ajouter un groupe de routes `src/app/formations/` avec un modèle de données `Course`/`Lesson` sur le même principe que `BlogPost`, réutilisant `BlogExplorer` comme base pour la liste et le filtrage |
| **Newsletter** | Le composant `NewsletterForm` existe déjà (`src/components/forms/NewsletterForm.tsx`) ; il suffit de connecter son `onSubmit` à votre fournisseur d'emailing (Brevo, Mailchimp...) via une route API dédiée, sur le modèle de `api/contact/route.ts` |
| **Base de connaissances** | Réutiliser le modèle `BlogPost` et le composant `BlogExplorer` en les déclinant pour une catégorisation par produit/fonctionnalité plutôt que par date de publication |
| **Chatbot IA** | Ajouter un composant client flottant (ex. `src/components/ui/ChatWidget.tsx`) qui appelle une route `api/chat/route.ts` connectée à l'API du modèle de langage de votre choix ; le service « Automatisation & IA » du site documente déjà cette approche pour vos propres clients |

Cette approche évite d'ajouter dès aujourd'hui du code ou des dépendances pour des fonctionnalités
non encore nécessaires, tout en gardant un chemin clair pour les activer au moment voulu.
