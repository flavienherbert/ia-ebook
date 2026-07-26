"use client";

import { useState } from "react";
import type { Vue } from "./types";
import TodayView from "./views/TodayView";
import LogementsView from "./views/LogementsView";
import IntervenantsView from "./views/IntervenantsView";
import AnomaliesView from "./views/AnomaliesView";
import ParametresView from "./views/ParametresView";
import LogementPanel from "./LogementPanel";
import AnomaliePanel from "./AnomaliePanel";

const NAV_ITEMS: { id: Vue; label: string }[] = [
  { id: "aujourdhui", label: "Aujourd'hui" },
  { id: "logements", label: "Logements" },
  { id: "intervenants", label: "Intervenants" },
  { id: "anomalies", label: "Anomalies" },
  { id: "parametres", label: "Paramètres" },
];

export default function ConciergerieView({
  onSwitchMode,
}: {
  onSwitchMode: () => void;
}) {
  const [activeView, setActiveView] = useState<Vue>("aujourdhui");
  const [selectedLogementId, setSelectedLogementId] = useState<number | null>(null);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-ink">Prêt.</span>
            <span className="hidden text-sm text-ink-soft sm:inline">
              Conciergerie Bellevue
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-ink-soft sm:inline">
              Admin — Camille
            </span>
            <button
              type="button"
              onClick={onSwitchMode}
              className="rounded-md border border-line px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Voir en mode intervenant
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col min-[780px]:flex-row">
        <nav
          aria-label="Navigation principale"
          className="flex gap-2 overflow-x-auto border-b border-line px-4 py-3 min-[780px]:w-56 min-[780px]:shrink-0 min-[780px]:flex-col min-[780px]:gap-1 min-[780px]:border-b-0 min-[780px]:border-r min-[780px]:px-3 min-[780px]:py-6"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
              className={`shrink-0 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                activeView === item.id
                  ? "bg-ink text-paper"
                  : "text-ink-soft hover:bg-paper-alt hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {activeView === "aujourdhui" && (
            <TodayView onSelectLogement={setSelectedLogementId} />
          )}
          {activeView === "logements" && (
            <LogementsView onSelectLogement={setSelectedLogementId} />
          )}
          {activeView === "intervenants" && <IntervenantsView />}
          {activeView === "anomalies" && (
            <AnomaliesView onSelectAnomalie={setSelectedAnomalyId} />
          )}
          {activeView === "parametres" && <ParametresView />}
        </main>
      </div>

      <LogementPanel
        logementId={selectedLogementId}
        onClose={() => setSelectedLogementId(null)}
      />
      <AnomaliePanel
        anomalyId={selectedAnomalyId}
        onClose={() => setSelectedAnomalyId(null)}
      />
    </div>
  );
}
