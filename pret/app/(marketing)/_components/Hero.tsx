import Container from "./Container";
import TableauDuJour from "./TableauDuJour";

export default function Hero() {
  return (
    <section id="top" className="pb-16 pt-14 sm:pb-24 sm:pt-20">
      <Container className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
            Pour conciergeries de location courte durée
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
            Le logement est-il prêt&nbsp;?
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Une seule question, une réponse par logement, en direct. Fini les
            photos de ménage qui dorment dans un groupe WhatsApp — chaque
            compte-rendu est rangé par logement et par date, et une anomalie
            devient une tâche assignée, pas un message qu&apos;on ne relit
            jamais.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a
              href="#tarif"
              className="rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Démarrer l&apos;essai gratuit
            </a>
            <span className="font-mono text-xs text-ink-soft">
              14 jours · sans carte bancaire
            </span>
          </div>
        </div>

        <div>
          <TableauDuJour />
        </div>
      </Container>
    </section>
  );
}
