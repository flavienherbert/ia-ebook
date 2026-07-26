"use client";

import { useDemo } from "../DemoContext";
import { LogementStatusChip } from "../badges";

export default function TodayView({
  onSelectLogement,
}: {
  onSelectLogement: (id: number) => void;
}) {
  const { logements } = useDemo();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Aujourd&apos;hui</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {logements.map((logement) => (
          <button
            key={logement.id}
            type="button"
            onClick={() => onSelectLogement(logement.id)}
            className="flex flex-col items-start gap-3 rounded-xl border border-line bg-paper p-4 text-left transition-shadow hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <span className="font-display text-base font-semibold text-ink">
              {logement.nom}
            </span>
            <LogementStatusChip statut={logement.statut} label={logement.label} />
            <span className="font-mono text-xs text-ink-soft">{logement.heure}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
