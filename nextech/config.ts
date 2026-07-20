// Contenu centralisé du site nextech — textes, livres, chiffres.

export const site = {
  name: "nextech",
  title: "nextech — Guides Claude",
  description:
    "Guides pratiques pour créer, lancer et vendre avec l'IA, sans savoir coder.",
  baseline: "Construis avec l'IA. Ce soir.",
  shopUrl: "https://ebookclaude.vercel.app",
};

export type Livre = {
  num: string;
  cat: string;
  title: string;
  desc: string;
  tags: string[];
  price: string;
  link: string;
};

export const livres: Livre[] = [
  {
    num: "01",
    cat: "WEB",
    title: "Créer un site internet professionnel avec Claude Code",
    desc: "De la page blanche au site en ligne en 14 jours. Sans savoir coder.",
    tags: ["128 pages", "60 prompts", "PDF"],
    price: "19,99 €",
    link: "https://buy.stripe.com/28EcN6g0R2cednK1BE6Ri0f",
  },
  {
    num: "02",
    cat: "PRODUIT",
    title: "Créer et lancer son SaaS de A à Z",
    desc: "De l'idée validée au premier client payant. Pour quelqu'un qui n'a jamais créé de logiciel.",
    tags: ["PDF", "Modèles", "Prompts"],
    price: "19,99 €",
    link: "https://buy.stripe.com/28E3cwcOF8AC5Vi4NQ6Ri0e",
  },
  {
    num: "03",
    cat: "AUDIENCE",
    title: "Réussir sur TikTok et développer son activité",
    desc: "L'algorithme, la niche, les hooks, le montage. 100 idées de vidéos incluses.",
    tags: ["PDF", "100 idées", "50 hooks"],
    price: "15,99 €",
    link: "https://buy.stripe.com/7sY6oIaGxbMOaby0xA6Ri0g",
  },
];

export const manifesteLignes = [
  "Pas de formation interminable.",
  "Pas d'abonnement.",
  "Un livre, tu le lis ce soir, tu construis demain.",
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  isText?: boolean;
};

export const stats: Stat[] = [
  { value: 3, suffix: "", label: "Guides" },
  { value: 300, suffix: "+", label: "Pages" },
  { value: 120, suffix: "+", label: "Prompts" },
  { value: 0, suffix: "", label: "Livraison immédiate", isText: true },
];

export const construction = [
  {
    num: "01",
    title: "Un site pro qui te représente",
  },
  {
    num: "02",
    title: "Un SaaS qui encaisse",
  },
  {
    num: "03",
    title: "Une audience qui achète",
  },
];

export const marqueeItems = ["CRÉER", "LANCER", "VENDRE", "SANS CODER"];

export const sealText = "NEXTECH • GUIDES CLAUDE • IA • ";
