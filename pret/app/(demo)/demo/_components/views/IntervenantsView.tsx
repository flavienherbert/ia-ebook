"use client";

import { useDemo } from "../DemoContext";

export default function IntervenantsView() {
  const { intervenants, showToast } = useDemo();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-ink">Intervenants</h2>
        <button
          type="button"
          onClick={() => showToast("Formulaire d'ajout — à développer")}
          className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          + Ajouter un intervenant
        </button>
      </div>

      <ul className="mt-5 flex flex-col gap-2">
        {intervenants.map((intervenant) => (
          <li
            key={intervenant.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-paper p-4"
          >
            <div>
              <p className="font-display text-base font-semibold text-ink">
                {intervenant.nom}
              </p>
              <p className="mt-0.5 font-mono text-xs text-ink-soft">
                {intervenant.telephone}
              </p>
            </div>
            <span className="text-sm text-ink-soft">
              {intervenant.missions} missions ce mois
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
