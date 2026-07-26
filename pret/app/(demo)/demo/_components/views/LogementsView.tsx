"use client";

import { useDemo } from "../DemoContext";
import { LogementStatusChip } from "../badges";

export default function LogementsView({
  onSelectLogement,
}: {
  onSelectLogement: (id: number) => void;
}) {
  const { logements } = useDemo();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Logements</h2>
      <div className="mt-5 overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-alt text-left">
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
                Logement
              </th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
                Adresse
              </th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
                Statut
              </th>
              <th className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
                Photos
              </th>
            </tr>
          </thead>
          <tbody>
            {logements.map((logement) => (
              <tr
                key={logement.id}
                onClick={() => onSelectLogement(logement.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSelectLogement(logement.id);
                }}
                tabIndex={0}
                role="button"
                aria-label={`Voir le détail de ${logement.nom}`}
                className="cursor-pointer border-b border-line last:border-b-0 hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <td className="px-4 py-3 font-medium text-ink">{logement.nom}</td>
                <td className="px-4 py-3 text-ink-soft">{logement.adresse}</td>
                <td className="px-4 py-3">
                  <LogementStatusChip statut={logement.statut} label={logement.label} />
                </td>
                <td className="px-4 py-3 font-mono text-ink-soft">{logement.photos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
