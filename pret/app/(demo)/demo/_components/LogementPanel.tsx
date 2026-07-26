"use client";

import { useDemo } from "./DemoContext";
import { LogementStatusChip, StatutAnomalieBadge, UrgenceBadge } from "./badges";

export default function LogementPanel({
  logementId,
  onClose,
}: {
  logementId: number | null;
  onClose: () => void;
}) {
  const { logements, anomalies } = useDemo();
  const logement = logements.find((l) => l.id === logementId) ?? null;
  const anomalie =
    logement?.anomalyId != null
      ? anomalies.find((a) => a.id === logement.anomalyId) ?? null
      : null;

  if (!logement) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={`Détail — ${logement.nom}`}
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
              {logement.nom}
            </h2>
            <p className="mt-0.5 text-xs text-ink-soft">{logement.adresse}</p>
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
          <LogementStatusChip statut={logement.statut} label={logement.label} />
          <p className="mt-2 font-mono text-xs text-ink-soft">
            Dernière mise à jour {logement.heure}
          </p>

          <h3 className="mt-6 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
            Checklist
          </h3>
          <ul className="mt-3 flex flex-col gap-2.5">
            {logement.checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-2.5 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    item.fait
                      ? "border-green bg-green-bg text-green"
                      : "border-line text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 10l4 4 8-8" />
                  </svg>
                </span>
                <span className={item.fait ? "text-ink-soft line-through" : "text-ink"}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
            Photos ({logement.photos})
          </h3>
          {logement.photos > 0 ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {Array.from({ length: logement.photos }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-md border border-dashed border-line bg-paper-alt text-ink-soft"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="9" cy="11" r="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l-5-5-4 4-3-3-5 5" />
                  </svg>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">Aucune photo pour le moment.</p>
          )}

          {anomalie && (
            <div className="mt-6 rounded-xl border border-line bg-paper-alt p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-sm font-semibold text-ink">
                  {anomalie.titre}
                </h3>
                <UrgenceBadge urgence={anomalie.urgence} />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs text-ink-soft">
                  Assignée à {anomalie.assignee}
                </span>
                <StatutAnomalieBadge statut={anomalie.statut} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
