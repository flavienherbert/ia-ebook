# Charte de marque — Klarim

Cette charte documente l'identité visuelle et verbale de Klarim telle qu'implémentée dans le
site. Elle sert de référence rapide pour rester cohérent sur tous vos futurs supports
(présentations commerciales, réseaux sociaux, signature email, supports imprimés).

## 1. Concept de logo

Le logo est un monogramme : la lettre **K** en blanc, en gras, centrée dans un carré à coins
arrondis (`border-radius` généreux) rempli d'un dégradé bleu électrique → violet, à 135°.

- **Pourquoi un monogramme plutôt qu'un logotype complet ?** Il reste lisible à toute petite
  taille (favicon, avatar réseaux sociaux, app mobile) tout en étant décliné aux côtés du nom
  complet « Klarim » en toutes lettres dans le header et le footer.
- **Fichiers sources** : `public/favicon.svg` (le monogramme seul, format vectoriel) ;
  `src/app/opengraph-image.tsx` génère automatiquement la version utilisée pour les partages sur
  les réseaux sociaux.
- **Évolution recommandée** : si vous faites concevoir un logo définitif par un designer, gardez
  le même principe (monogramme + dégradé de marque) pour ne pas avoir à retravailler toutes les
  déclinaisons déjà en place dans le code.

## 2. Palette de couleurs

| Rôle | Nom de variable | Mode clair | Mode sombre |
| --- | --- | --- | --- |
| Bleu électrique (primaire) | `--electric` | `#2e6bff` | `#4d8bff` |
| Violet (secondaire) | `--violet` | `#7c3aed` | `#9a63ff` |
| Fond | `--background` | `#ffffff` | `#06060a` |
| Texte principal | `--foreground` | `#0a0a0f` | `#f3f4f9` |
| Texte atténué | `--muted` | `#5b5f70` | `#9497aa` |
| Surface (cartes, sections) | `--surface` | `#f6f7fb` | `#0c0d14` |
| Bordures | `--border-color` | `#e5e7f0` | `#1f2130` |

Le dégradé de marque (`--gradient-brand`, utilisé sur les boutons principaux, le logo et les
titres accentués) va du bleu électrique au violet à 120°. Toutes les variables sont définies dans
`src/app/globals.css` et automatiquement adaptées entre mode clair et mode sombre.

**Usage recommandé** : le bleu électrique porte l'action (boutons, liens, icônes actives) ; le
violet renforce les moments premium (dégradés, éléments mis en avant) ; noir/blanc structurent le
reste — jamais plus de ces deux couleurs d'accent simultanément sur un même écran pour garder un
rendu haut de gamme.

## 3. Typographie

- **Police** : [Geist Sans](https://vercel.com/font) pour tous les textes, **Geist Mono** pour les
  éventuels extraits de code. Chargées via `next/font` dans `src/app/layout.tsx` — aucune requête
  externe, performance optimale.
- **Hiérarchie** : titres en `font-semibold`, tracking resserré (`tracking-tight`) ; corps de texte
  en régulier avec un `line-height` généreux (`leading-relaxed`) pour la lisibilité.
- **Pourquoi Geist ?** Une police neutre, très lisible, au rendu "tech premium" cohérent avec le
  positionnement de Klarim (clarté, précision). Pour changer de police, remplacez l'import dans
  `layout.tsx` par une autre police Google Fonts via `next/font/google`.

## 4. Style graphique

- **Formes** : coins arrondis généreux (`rounded-2xl`/`rounded-3xl`), jamais d'angles vifs — évoque
  l'accessibilité et la modernité.
- **Fond quadrillé** (`bg-grid`) et halos radiaux dégradés en arrière-plan des sections clés (hero,
  CTA) pour une profondeur subtile sans surcharger.
- **Cartes et sections** alternent fond blanc/noir et fond « surface » légèrement teinté pour rythmer
  la lecture verticale de chaque page.
- **Animations** : apparitions douces au scroll (`Reveal`, via Framer Motion), transitions de
  300ms, jamais d'animation agressive — cohérent avec la promesse de clarté et de sérénité.
- **Visuels** : en l'absence de photographies réelles, les visuels (équipe, projets, articles)
  sont des blocs à dégradé de marque avec initiales (`PlaceholderArt`). Dès que vous disposez de
  vraies photos, remplacez ces blocs par de vraies images (voir `GUIDE-PERSONNALISATION.md`).

## 5. Ton de communication

- **Direct et sans jargon** : on explique ce qu'on fait et pourquoi ça compte pour le client, pas
  pour impressionner.
- **Vouvoiement systématique**, ton professionnel mais chaleureux — jamais froid ni robotique.
- **Orienté résultat** : chaque phrase de vente renvoie à un bénéfice concret (temps gagné, trafic,
  conversions), pas seulement à une fonctionnalité.
- **Assertif sans arrogance** : Klarim recommande, argumente, mais reste pédagogue — jamais
  condescendant envers un client qui ne serait pas expert du digital.

## 6. Charte graphique simplifiée — check-list rapide

- [ ] Logo : monogramme K, dégradé bleu → violet à 135°, jamais recoloré autrement
- [ ] Couleurs : bleu électrique + violet en accents uniquement, noir/blanc en base
- [ ] Typographie : Geist Sans partout, pas de mélange avec une autre police sans raison
- [ ] Coins arrondis généreux sur tous les éléments d'interface
- [ ] Ton : direct, sans jargon, orienté bénéfice client
- [ ] Un seul CTA principal par écran, toujours dans le dégradé de marque
