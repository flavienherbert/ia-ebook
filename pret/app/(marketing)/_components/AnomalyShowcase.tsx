import Container from "./Container";

export default function AnomalyShowcase() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
            Le cœur du produit
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            Une anomalie n&apos;est plus un message qu&apos;on perd
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Chauffe-eau en panne, clé manquante, dégât signalé par
            l&apos;intervenant : ça devient une tâche avec un statut et un
            responsable — pas un commentaire perdu dans le fil.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-paper p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-ink">
              Chauffe-eau HS
            </h3>
            <span className="shrink-0 rounded-full bg-red-bg px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-red">
              Bloquant
            </span>
          </div>
          <p className="mt-2 font-mono text-xs text-ink-soft">
            3 rue Victor Hugo · Signalée 11:05
          </p>

          <div
            className="mt-4 flex h-36 items-center justify-center rounded-lg border border-dashed border-line bg-paper-alt text-ink-soft"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-8 w-8"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="11" r="2" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l-5-5-4 4-3-3-5 5" />
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-red">
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              Ouverte
            </span>
            <span className="text-sm text-ink-soft">Assignée à Julie</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
