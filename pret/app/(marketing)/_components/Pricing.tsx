import Container from "./Container";

const items = [
  "Logements illimités (15 à 80+)",
  "Intervenants illimités, sans compte",
  "Import iCal Airbnb / Booking",
  "Anomalies et historique photo",
  "Rôles admin et coordinateur",
];

export default function Pricing() {
  return (
    <section id="tarif" className="bg-paper-alt py-20 sm:py-28">
      <Container className="flex flex-col items-center text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          Tarif
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          Un seul prix, tout compris
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          Pas de version gratuite, pas de palier caché. Ce prix couvre un vrai
          support, pas un modèle publicitaire.
        </p>

        <div className="mt-12 w-full max-w-sm rounded-xl border border-line bg-paper p-8 text-left shadow-sm">
          <div className="text-center">
            <span className="font-display text-4xl font-bold text-ink">
              79 €
            </span>
            <p className="mt-1 font-mono text-xs text-ink-soft">
              / mois · par conciergerie
            </p>
          </div>

          <ul className="mt-8 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="mt-0.5 h-4 w-4 shrink-0 text-green"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#essai"
            className="mt-8 block w-full rounded-md bg-ink px-4 py-3 text-center text-sm font-medium text-paper transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Démarrer l&apos;essai gratuit
          </a>
          <p className="mt-3 text-center font-mono text-xs text-ink-soft">
            14 jours, sans carte bancaire
          </p>
        </div>
      </Container>
    </section>
  );
}
