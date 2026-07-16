import { ShieldCheck, Receipt, CalendarCheck, FileCode2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Satisfaction garantie",
    description: "Un cycle de révisions inclus dans chaque formule pour affiner le résultat jusqu'à votre validation.",
  },
  {
    icon: Receipt,
    title: "Transparence tarifaire",
    description: "Un devis détaillé avant le démarrage, sans coûts cachés ni surprise en cours de projet.",
  },
  {
    icon: CalendarCheck,
    title: "Délais respectés",
    description: "Un planning communiqué dès le départ et suivi de près, avec des points d'étape réguliers.",
  },
  {
    icon: FileCode2,
    title: "Propriété intégrale",
    description: "Le code source et l'ensemble des livrables vous appartiennent, sans restriction d'usage.",
  },
];

export function Guarantees() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {guarantees.map((guarantee, index) => (
        <Reveal
          key={guarantee.title}
          delay={index * 0.08}
          className="rounded-2xl border border-border bg-surface p-6 text-center"
        >
          <guarantee.icon className="mx-auto size-8 text-electric" aria-hidden="true" />
          <h3 className="mt-4 text-base font-semibold">{guarantee.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{guarantee.description}</p>
        </Reveal>
      ))}
    </div>
  );
}
