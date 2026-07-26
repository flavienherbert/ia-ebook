"use client";

import { useEffect, useState } from "react";

type Statut = "pas commencé" | "en cours" | "prêt";

type Logement = {
  nom: string;
  heure: string;
  statut: Statut;
};

const logementsInitial: Logement[] = [
  { nom: "12 rue de la Paix", statut: "prêt", heure: "09:12" },
  { nom: "3 rue Victor Hugo", statut: "pas commencé", heure: "10:40" },
  { nom: "8 avenue Foch", statut: "en cours", heure: "10:52" },
  { nom: "21 quai des Chartrons", statut: "prêt", heure: "08:47" },
  { nom: "5 rue des Lilas", statut: "prêt", heure: "09:30" },
];

const styles: Record<Statut, { dot: string; badge: string; label: string }> = {
  "pas commencé": {
    dot: "bg-red",
    badge: "bg-red-bg text-red",
    label: "PAS COMMENCÉ",
  },
  "en cours": {
    dot: "bg-amber",
    badge: "bg-amber-bg text-amber",
    label: "EN COURS",
  },
  prêt: {
    dot: "bg-green",
    badge: "bg-green-bg text-green",
    label: "PRÊT",
  },
};

const ANIMATED_INDEX = 1;

export default function TableauDuJour() {
  const [logements, setLogements] = useState(logementsInitial);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setLogements((prev) =>
        prev.map((l, i) => (i === ANIMATED_INDEX ? { ...l, statut: "prêt", heure: "11:05" } : l))
      );
      return;
    }

    const toEnCours = setTimeout(() => {
      setLogements((prev) =>
        prev.map((l, i) =>
          i === ANIMATED_INDEX ? { ...l, statut: "en cours", heure: "10:58" } : l
        )
      );
    }, 1800);

    const toPret = setTimeout(() => {
      setLogements((prev) =>
        prev.map((l, i) =>
          i === ANIMATED_INDEX ? { ...l, statut: "prêt", heure: "11:05" } : l
        )
      );
    }, 4200);

    return () => {
      clearTimeout(toEnCours);
      clearTimeout(toPret);
    };
  }, []);

  return (
    <div className="w-full rounded-xl border border-line bg-paper shadow-sm">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <span className="font-display text-base font-semibold text-ink">
          Tableau du jour
        </span>
        <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
          26/07
        </span>
      </div>
      <ul className="divide-y divide-line">
        {logements.map((logement, index) => {
          const style = styles[logement.statut];
          return (
            <li
              key={logement.nom}
              className="flex items-center justify-between gap-3 px-5 py-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-500 ${style.dot}`}
                  aria-hidden="true"
                />
                <span className="truncate text-sm text-ink">
                  {logement.nom}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide transition-colors duration-500 ${style.badge}`}
                >
                  {style.label}
                </span>
                <span className="w-12 shrink-0 text-right font-mono text-xs text-ink-soft">
                  {logement.heure}
                </span>
              </div>
              {index === ANIMATED_INDEX && (
                <span className="sr-only" role="status" aria-live="polite">
                  {logement.nom} : {style.label.toLowerCase()}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
