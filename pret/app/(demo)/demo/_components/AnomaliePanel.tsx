"use client";

import { useDemo } from "./DemoContext";
import { StatutAnomalieBadge, UrgenceBadge } from "./badges";
import type { StatutAnomalie } from "./types";

export default function AnomaliePanel({
  anomalyId,
  onClose,
}: {
  anomalyId: number | null;
  onClose: () => void;
}) {
  const { anomalies, setAnomalies } = useDemo();
  const anomalie = anomalies.find((a) => a.id === anomalyId) ?? null;

  if (!anomalie) return null;

  function updateStatut(next: StatutAnomalie) {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === anomalie!.id ? { ...a, statut: next } : a))
    );
  }

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`Anomalie — ${anomalie.titre}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30"
        aria-label="Fermer le panneau"
      />
      <div className="relative flex h-full w-full flex-col overflow-y-auto bg-paper shadow-xl min-[640px]:w-[420px] min-[640px]:border-l min-[640px]:border-line">
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">
              {anomalie.titre}
            </h2>
            <p className="mt-0.5 text-xs text-ink-soft">{anomalie.logement}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le panneau"
            className="shrink-0 rounded-md p-2 text-ink-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 px-5 py-5">
          <div className="flex items-center gap-2">
            <UrgenceBadge urgence={anomalie.urgence} />
            <StatutAnomalieBadge statut={anomalie.statut} />
          </div>

          <dl className="mt-5 flex flex-col gap-2 text-sm text-ink-soft">
            <div className="flex justify-between gap-4">
              <dt>Signalée</dt>
              <dd className="font-mono text-xs">{anomalie.heure}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Assignée à</dt>
              <dd className="text-ink">{anomalie.assignee}</dd>
            </div>
          </dl>

          <h3 className="mt-6 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
            Actions
          </h3>
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => updateStatut("En cours")}
              className="rounded-md border border-line px-4 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Marquer en cours
            </button>
            <button
              type="button"
              onClick={() => updateStatut("Résolue")}
              className="rounded-md border border-line px-4 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Marquer résolue
            </button>
            <button
              type="button"
              onClick={() => updateStatut("Ouverte")}
              className="rounded-md border border-line px-4 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Rouvrir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
