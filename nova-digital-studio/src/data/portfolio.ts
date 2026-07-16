import type { PortfolioProject } from "@/lib/types";

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "atelier-orea",
    name: "Atelier Oréa",
    client: "Atelier Oréa",
    sector: "Artisanat & décoration",
    year: "2025",
    serviceSlug: "site-vitrine",
    description:
      "Refonte complète du site vitrine et de l'identité visuelle d'un atelier de céramique haut de gamme, avec pour objectif de valoriser le savoir-faire artisanal et de développer les ventes en ligne.",
    objectives: [
      "Refléter le savoir-faire artisanal à travers un design premium",
      "Développer les ventes directes via une boutique en ligne",
      "Améliorer le référencement local pour attirer une clientèle régionale",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Stripe", "Sanity CMS"],
    results: [
      { label: "Trafic organique", value: "+165%" },
      { label: "Ventes en ligne", value: "+92%" },
      { label: "Temps de chargement", value: "0,8s" },
    ],
    gallery: [
      { alt: "Page d'accueil du site Atelier Oréa", from: "#2e6bff", to: "#7c3aed" },
      { alt: "Page boutique en ligne Atelier Oréa", from: "#7c3aed", to: "#2e6bff" },
      { alt: "Fiche produit céramique Atelier Oréa", from: "#4d8bff", to: "#9a63ff" },
    ],
    testimonial: {
      quote:
        "Klarim a su traduire notre univers artisanal en une expérience digitale à la hauteur de nos pièces. Le site a transformé notre activité en ligne.",
      author: "Camille Rousseau",
      role: "Fondatrice, Atelier Oréa",
    },
  },
  {
    slug: "vertego-immobilier",
    name: "Vertego Immobilier",
    client: "Vertego Immobilier",
    sector: "Immobilier",
    year: "2025",
    serviceSlug: "seo",
    description:
      "Stratégie SEO et refonte technique pour une agence immobilière régionale souhaitant devenir la référence locale sur les recherches d'achat et de location.",
    objectives: [
      "Se positionner en première page sur les requêtes locales clés",
      "Augmenter le nombre de demandes de visite qualifiées",
      "Structurer un contenu de blog immobilier expert",
    ],
    technologies: ["Next.js", "Schema.org", "Google Search Console", "Ahrefs"],
    results: [
      { label: "Mots-clés en top 3", value: "47" },
      { label: "Leads qualifiés", value: "+210%" },
      { label: "Trafic organique", value: "+180%" },
    ],
    gallery: [
      { alt: "Page de recherche de biens Vertego Immobilier", from: "#2e6bff", to: "#5b8bff" },
      { alt: "Fiche bien immobilier Vertego", from: "#7c3aed", to: "#a878f5" },
      { alt: "Blog immobilier Vertego", from: "#2e6bff", to: "#7c3aed" },
    ],
    testimonial: {
      quote:
        "En moins d'un an, nous sommes devenus l'agence la plus visible de notre région sur Google. Le nombre de demandes entrantes a complètement changé notre activité.",
      author: "Julien Fabre",
      role: "Directeur, Vertego Immobilier",
    },
  },
  {
    slug: "lumina-cosmetics",
    name: "Lumina Cosmetics",
    client: "Lumina Cosmetics",
    sector: "Beauté & cosmétique",
    year: "2024",
    serviceSlug: "publicite-meta",
    description:
      "Lancement d'une marque de cosmétiques bio avec une stratégie de branding complète et des campagnes publicitaires Meta orientées acquisition et fidélisation.",
    objectives: [
      "Construire une identité de marque premium et différenciante",
      "Générer des ventes rentables dès le lancement",
      "Fidéliser une communauté engagée sur les réseaux sociaux",
    ],
    technologies: ["Meta Ads Manager", "Klaviyo", "Shopify", "Figma"],
    results: [
      { label: "ROAS moyen", value: "5,2x" },
      { label: "Coût par acquisition", value: "-38%" },
      { label: "Communauté Instagram", value: "+24 000" },
    ],
    gallery: [
      { alt: "Identité de marque Lumina Cosmetics", from: "#7c3aed", to: "#a878f5" },
      { alt: "Publicité Meta Lumina Cosmetics", from: "#2e6bff", to: "#7c3aed" },
      { alt: "Packaging Lumina Cosmetics", from: "#4d8bff", to: "#9a63ff" },
    ],
    testimonial: {
      quote:
        "L'équipe a compris notre vision dès le premier échange. Le branding et les campagnes publicitaires ont dépassé toutes nos attentes de lancement.",
      author: "Sarah Nguyen",
      role: "Fondatrice, Lumina Cosmetics",
    },
  },
  {
    slug: "greenfields-bio",
    name: "Greenfields Bio",
    client: "Greenfields Bio",
    sector: "Agroalimentaire",
    year: "2024",
    serviceSlug: "audit-digital",
    description:
      "Accompagnement marketing digital global pour un producteur bio souhaitant développer ses ventes directes et sa notoriété auprès d'une audience soucieuse d'alimentation responsable.",
    objectives: [
      "Développer un écosystème digital cohérent (site, SEO, réseaux, emailing)",
      "Augmenter les ventes directes en circuit court",
      "Renforcer la crédibilité de la marque sur les sujets bio et durables",
    ],
    technologies: ["Next.js", "Mailchimp", "Google Analytics 4", "Notion"],
    results: [
      { label: "Ventes directes", value: "+140%" },
      { label: "Liste email", value: "+8 500 contacts" },
      { label: "Trafic organique", value: "+95%" },
    ],
    gallery: [
      { alt: "Site web Greenfields Bio", from: "#2e6bff", to: "#7c3aed" },
      { alt: "Newsletter Greenfields Bio", from: "#7c3aed", to: "#4d8bff" },
      { alt: "Campagne réseaux sociaux Greenfields Bio", from: "#9a63ff", to: "#2e6bff" },
    ],
    testimonial: {
      quote:
        "Klarim nous a donné une vraie stratégie, pas juste des prestations isolées. Chaque canal travaille désormais dans la même direction.",
      author: "Marc Delattre",
      role: "Cofondateur, Greenfields Bio",
    },
  },
  {
    slug: "fitcoach-app",
    name: "FitCoach",
    client: "FitCoach",
    sector: "Sport & bien-être",
    year: "2024",
    serviceSlug: "automatisation-ia",
    description:
      "Développement d'un assistant IA de coaching sportif personnalisé, intégré à l'application mobile FitCoach pour recommander des programmes adaptés à chaque utilisateur.",
    objectives: [
      "Personnaliser l'expérience utilisateur grâce à l'IA",
      "Automatiser la génération de programmes d'entraînement",
      "Améliorer la rétention des utilisateurs sur l'application",
    ],
    technologies: ["Python", "OpenAI API", "React Native", "PostgreSQL"],
    results: [
      { label: "Rétention à 30 jours", value: "+52%" },
      { label: "Programmes générés", value: "12 000+" },
      { label: "Satisfaction utilisateurs", value: "4,8/5" },
    ],
    gallery: [
      { alt: "Interface assistant IA FitCoach", from: "#2e6bff", to: "#9a63ff" },
      { alt: "Programme personnalisé FitCoach", from: "#7c3aed", to: "#5b8bff" },
      { alt: "Tableau de bord FitCoach", from: "#4d8bff", to: "#7c3aed" },
    ],
    testimonial: {
      quote:
        "L'assistant IA a transformé l'expérience de nos utilisateurs. La personnalisation a directement impacté notre taux de rétention.",
      author: "Antoine Berger",
      role: "CEO, FitCoach",
    },
  },
  {
    slug: "maison-verrier",
    name: "Maison Verrier",
    client: "Maison Verrier",
    sector: "Restauration",
    year: "2023",
    serviceSlug: "community-management",
    description:
      "Gestion complète des réseaux sociaux et création de contenu pour un restaurant gastronomique cherchant à renforcer sa notoriété locale et à remplir ses réservations en semaine.",
    objectives: [
      "Développer une communauté engagée sur Instagram",
      "Augmenter les réservations en semaine",
      "Créer une identité de contenu distinctive et gourmande",
    ],
    technologies: ["Instagram", "Later", "Canva", "TheFork"],
    results: [
      { label: "Communauté Instagram", value: "+15 200" },
      { label: "Réservations en semaine", value: "+64%" },
      { label: "Taux d'engagement", value: "8,3%" },
    ],
    gallery: [
      { alt: "Feed Instagram Maison Verrier", from: "#7c3aed", to: "#2e6bff" },
      { alt: "Story mise en avant Maison Verrier", from: "#9a63ff", to: "#4d8bff" },
      { alt: "Publication plat signature Maison Verrier", from: "#2e6bff", to: "#a878f5" },
    ],
    testimonial: {
      quote:
        "Nos réseaux sociaux sont devenus un vrai levier de réservation. Le contenu produit reflète parfaitement l'esprit de notre maison.",
      author: "Élodie Marchand",
      role: "Directrice, Maison Verrier",
    },
  },
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}
