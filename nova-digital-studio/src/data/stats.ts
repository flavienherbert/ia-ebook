import type { Stat } from "@/lib/types";

export const companyStats: Stat[] = [
  { value: "120+", label: "Projets livrés" },
  { value: "94%", label: "Clients satisfaits" },
  { value: "8", label: "Ans d'expertise" },
  { value: "3,4x", label: "ROI moyen généré" },
];

export const whyUsPoints = [
  {
    title: "Une équipe pluridisciplinaire",
    description:
      "Design, développement, SEO, publicité et IA réunis sous un même toit pour une stratégie cohérente, sans intermédiaires.",
    icon: "layers" as const,
  },
  {
    title: "Des résultats mesurables",
    description:
      "Chaque action est suivie par des indicateurs concrets : trafic, leads, ventes. Nous parlons chiffres, pas promesses vagues.",
    icon: "bar-chart" as const,
  },
  {
    title: "Un accompagnement humain",
    description:
      "Un interlocuteur dédié à chaque étape de votre projet, disponible et transparent sur l'avancement et les résultats.",
    icon: "heart-handshake" as const,
  },
  {
    title: "Une exécution rapide",
    description:
      "Des méthodes de travail rodées qui garantissent des livraisons dans les délais annoncés, sans compromis sur la qualité.",
    icon: "zap" as const,
  },
];
