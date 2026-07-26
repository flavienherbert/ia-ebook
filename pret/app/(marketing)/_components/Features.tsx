import Container from "./Container";

const features = [
  {
    label: "Logements",
    title: "Checklist par logement",
    text: "Chaque logement a sa propre check-list de ménage, modifiable à tout moment.",
  },
  {
    label: "Historique",
    title: "Photos rangées, pas perdues",
    text: "Chaque mission garde ses photos, classées par logement et par date.",
  },
  {
    label: "Anomalies",
    title: "De vraies tâches",
    text: "Statut, urgence, assigné — une anomalie se suit jusqu'à sa résolution.",
  },
  {
    label: "Synchronisation",
    title: "Import iCal automatique",
    text: "Compatible Airbnb et Booking. Une mission par départ, sans y penser.",
  },
  {
    label: "Intervenants",
    title: "Zéro friction",
    text: "Un lien, un navigateur mobile. Pas de compte à créer pour votre équipe.",
  },
  {
    label: "Équipe",
    title: "Multi-utilisateur",
    text: "Rôles admin et coordinateur pour gérer logements et abonnement.",
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="bg-paper-alt py-20 sm:py-28">
      <Container>
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          Fonctionnalités
        </h2>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="rounded-xl border border-line bg-paper p-6"
            >
              <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                {feature.label}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
