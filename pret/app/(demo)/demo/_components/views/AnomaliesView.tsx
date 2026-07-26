"use client";

import { useDemo } from "../DemoContext";
import { StatutAnomalieBadge, UrgenceBadge } from "../badges";

export default function AnomaliesView({
  onSelectAnomalie,
}: {
  onSelectAnomalie: (id: number) => void;
}) {
  const { anomalies } = useDemo();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ink">Anomalies</h2>
      <ul className="mt-5 flex flex-col gap-2">
        {anomalies.map((anomalie) => (
          <li key={anomalie.id}>
            <button
              type="button"
              onClick={() => onSelectAnomalie(anomalie.id)}
              className="flex w-full flex-col gap-3 rounded-xl border border-line bg-paper p-4 text-left transition-shadow hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  {anomalie.titre}
                </p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  {anomalie.logement} · Assignée à {anomalie.assignee}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <UrgenceBadge urgence={anomalie.urgence} />
                <StatutAnomalieBadge statut={anomalie.statut} />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
