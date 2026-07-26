import Container from "./Container";

const steps = [
  {
    number: "01",
    title: "Importez votre calendrier",
    text: "Collez l'URL iCal Airbnb ou Booking de chaque logement, une seule fois.",
  },
  {
    number: "02",
    title: "La mission se crée seule",
    text: "Chaque départ génère automatiquement une mission de ménage, assignée à votre intervenant.",
  },
  {
    number: "03",
    title: "Il reçoit un lien",
    text: "Par SMS ou email. Aucun compte, aucun mot de passe, aucune appli à installer.",
  },
  {
    number: "04",
    title: "Vous voyez l'état en direct",
    text: "Checklist cochée, photos rangées, anomalie remontée : tout apparaît sur votre tableau du jour.",
  },
];

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 sm:py-28">
      <Container>
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          Comment ça marche
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-line pt-5">
              <span className="font-mono text-sm text-ink-soft">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
