"use client";

import { useState } from "react";
import { useDemo } from "./DemoContext";
import { MISSION_LOGEMENT_ID } from "./data";
import type { Anomalie, Urgence } from "./types";

const URGENCES: Urgence[] = ["Faible", "Moyenne", "Haute", "Bloquant"];

function heureActuelle() {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function IntervenantView({
  onSwitchMode,
}: {
  onSwitchMode: () => void;
}) {
  const { logements, setLogements, anomalies, setAnomalies, showToast } = useDemo();
  const logement = logements.find((l) => l.id === MISSION_LOGEMENT_ID)!;

  const [formOpen, setFormOpen] = useState(false);
  const [titre, setTitre] = useState("");
  const [urgence, setUrgence] = useState<Urgence>("Faible");
  const [reported, setReported] = useState<Anomalie[]>([]);

  const checklistComplete = logement.checklist.every((item) => item.fait);

  function toggleItem(label: string) {
    setLogements((prev) =>
      prev.map((l) =>
        l.id !== MISSION_LOGEMENT_ID
          ? l
          : {
              ...l,
              checklist: l.checklist.map((item) =>
                item.label === label ? { ...item, fait: !item.fait } : item
              ),
            }
      )
    );
  }

  function ajouterPhoto() {
    setLogements((prev) =>
      prev.map((l) =>
        l.id === MISSION_LOGEMENT_ID ? { ...l, photos: l.photos + 1 } : l
      )
    );
    showToast("Photo ajoutée (compressée côté client)");
  }

  function envoyerAnomalie() {
    if (!titre.trim()) return;
    const nouvelle: Anomalie = {
      id: Math.max(0, ...anomalies.map((a) => a.id)) + 1,
      titre: titre.trim(),
      logement: logement.nom,
      urgence,
      statut: "Ouverte",
      assignee: "Non assignée",
      heure: heureActuelle(),
    };
    setAnomalies((prev) => [...prev, nouvelle]);
    setReported((prev) => [...prev, nouvelle]);
    setTitre("");
    setUrgence("Faible");
    setFormOpen(false);
    showToast("Anomalie signalée à la conciergerie");
  }

  function marquerPret() {
    setLogements((prev) =>
      prev.map((l) =>
        l.id === MISSION_LOGEMENT_ID
          ? { ...l, statut: "vert", label: "Prêt", heure: heureActuelle() }
          : l
      )
    );
  }

  return (
    <div className="min-h-screen bg-paper-alt">
      <div className="mx-auto flex min-h-screen max-w-[420px] flex-col px-4 py-6">
        <button
          type="button"
          onClick={onSwitchMode}
          className="mb-6 self-start rounded-sm text-sm font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          ← Retour à la vue conciergerie
        </button>

        <div className="rounded-xl border border-line bg-paper p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
            Mission du 26/07
          </p>
          <h1 className="mt-2 font-display text-xl font-bold text-ink">
            {logement.nom}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">{logement.adresse}</p>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper p-5">
          <h2 className="font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
            Checklist
          </h2>
          <ul className="mt-3 flex flex-col gap-1">
            {logement.checklist.map((item) => (
              <li key={item.label}>
                <label className="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm hover:bg-paper-alt">
                  <input
                    type="checkbox"
                    checked={item.fait}
                    onChange={() => toggleItem(item.label)}
                    className="h-5 w-5 shrink-0 accent-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  />
                  <span className={item.fait ? "text-ink-soft line-through" : "text-ink"}>
                    {item.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper p-5">
          <h2 className="font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
            Photos ({logement.photos})
          </h2>
          {logement.photos > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Array.from({ length: logement.photos }).map((_, i) => (
                <div
                  key={i}
                  className="flex aspect-square items-center justify-center rounded-md border border-dashed border-line bg-paper-alt text-ink-soft"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <circle cx="9" cy="11" r="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 16l-5-5-4 4-3-3-5 5" />
                  </svg>
                </div>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={ajouterPhoto}
            className="mt-4 w-full rounded-md border border-line px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Ajouter une photo
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-paper p-5">
          <h2 className="font-mono text-xs font-medium uppercase tracking-wide text-ink-soft">
            Anomalie
          </h2>

          {!formOpen ? (
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="mt-4 w-full rounded-md border border-red bg-red-bg px-4 py-3 text-sm font-medium text-red transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Signaler une anomalie
            </button>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                  Titre
                </span>
                <input
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Ex. : chauffe-eau HS"
                  className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                  Urgence
                </span>
                <select
                  value={urgence}
                  onChange={(e) => setUrgence(e.target.value as Urgence)}
                  className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {URGENCES.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={envoyerAnomalie}
                  disabled={!titre.trim()}
                  className="flex-1 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Envoyer
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-md border border-line px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {reported.length > 0 && (
            <ul className="mt-4 flex flex-col gap-2">
              {reported.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-2 rounded-md border border-line bg-paper-alt px-3 py-2 text-sm"
                >
                  <span className="text-ink">{a.titre}</span>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    {a.urgence}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          onClick={marquerPret}
          disabled={!checklistComplete}
          className="mt-6 w-full rounded-md bg-green px-4 py-3.5 text-sm font-semibold text-paper transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Logement prêt
        </button>
        {!checklistComplete && (
          <p className="mt-2 text-center text-xs text-ink-soft">
            Terminez la checklist pour marquer le logement prêt.
          </p>
        )}
      </div>
    </div>
  );
}
