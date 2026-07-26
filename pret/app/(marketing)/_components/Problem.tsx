import Container from "./Container";

const messages = [
  { from: "Sophie", text: "voila photo1094.jpg", mine: false },
  { from: "Sophie", text: "12 rue de la paix fait", mine: false },
  { from: "Marc", text: "ok reçu 👍", mine: true },
  { from: "Karim", text: "et le 8 avenue foch ? c bon aussi ?", mine: false },
  { from: "Sophie", text: "ns g pas fait celui la aujourd'hui", mine: false },
  { from: "Marc", text: "attends c'est qui qui devait y aller", mine: true },
  { from: "Karim", text: "chauffe eau HS chez victor hugo au fait", mine: false },
  { from: "Karim", text: "photo1095.jpg", mine: false },
  { from: "Sophie", text: "on regarde qd on peut", mine: false },
];

export default function Problem() {
  return (
    <section id="probleme" className="bg-paper-alt py-20 sm:py-28">
      <Container>
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          Le problème
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          Aujourd&apos;hui, tout ça vit dans un groupe WhatsApp
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          La femme de ménage termine, prend une photo, l&apos;envoie dans le
          groupe. Trois jours plus tard, personne ne sait si le 12 rue de la
          Paix a été fait mardi ou mercredi. Une anomalie signalée devient un
          message noyé sous les autres — jamais traitée, jamais fermée.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper p-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Groupe WhatsApp — Ménage
            </p>
            <div className="flex flex-col gap-2">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${m.mine ? "items-end" : "items-start"}`}
                >
                  {!m.mine && (
                    <span className="px-1 font-mono text-[10px] text-ink-soft">
                      {m.from}
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      m.mine
                        ? "bg-green-bg text-ink"
                        : "border border-line bg-paper-alt text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-paper p-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-wide text-ink-soft">
              Historique — 3 rue Victor Hugo
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-ink">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green" />
                Ménage terminé
                <span className="ml-auto font-mono text-xs text-ink-soft">
                  26/07 11:05
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-ink">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red" />
                Anomalie : chauffe-eau HS
                <span className="ml-auto rounded-full bg-red-bg px-2 py-0.5 font-mono text-[11px] font-medium text-red">
                  Bloquant
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-ink">
                <span className="h-2 w-2 shrink-0 rounded-full bg-line" />
                Assignée à Julie
              </li>
              <li className="flex items-center gap-2 text-sm text-ink">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber" />
                Statut
                <span className="ml-auto font-mono text-xs uppercase tracking-wide text-amber">
                  Ouverte
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
