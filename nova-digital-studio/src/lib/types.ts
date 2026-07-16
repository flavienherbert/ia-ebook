export type IconName =
  | "globe"
  | "palette"
  | "search"
  | "megaphone"
  | "trending-up"
  | "workflow"
  | "brain"
  | "pen-line"
  | "users"
  | "rocket"
  | "target"
  | "shield-check"
  | "sparkles"
  | "bar-chart"
  | "clock"
  | "heart-handshake"
  | "layers"
  | "zap";

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  icon: IconName;
  name: string;
  shortDescription: string;
  heroDescription: string;
  category: string;
  benefits: { title: string; description: string }[];
  methodology: { title: string; description: string }[];
  process: ProcessStep[];
  /** Ce que le client reçoit concrètement à l'issue de la prestation. */
  deliverables: string[];
  /** Délai indicatif de réalisation, ex. "3 à 5 semaines" ou "en continu, dès le 1er mois". */
  timeline: string;
  pricing: PricingTier[];
  /** Options et services complémentaires proposés en plus de l'offre de base. */
  addOns: string[];
  faq: FaqItem[];
  relatedProjectSlugs: string[];
}

export interface PortfolioProject {
  slug: string;
  name: string;
  client: string;
  sector: string;
  description: string;
  objectives: string[];
  technologies: string[];
  results: { label: string; value: string }[];
  gallery: { alt: string; from: string; to: string }[];
  serviceSlug: string;
  year: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface BlogAuthor {
  name: string;
  role: string;
  initials: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readingTime: string;
  author: BlogAuthor;
  cover: { from: string; to: string };
  content: { heading: string; body: string[] }[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  gradient: { from: string; to: string };
}

export interface Stat {
  value: string;
  label: string;
}
