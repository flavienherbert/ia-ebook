"use client";

import { useDemo } from "../DemoContext";

export default function ParametresView() {
  const { showToast } = useDemo();

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display text-xl font-semibold text-ink">Paramètres</h2>

      <section className="rounded-xl border border-line bg-paper p-5">
        <h3 className="font-display text-base font-semibold text-ink">Organisation</h3>
        <div className="mt-4 flex flex-col gap-4 sm:max-w-md">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Nom de l&apos;organisation
            </span>
            <input
              defaultValue="Conciergerie Bellevue"
              className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Email de contact
            </span>
            <input
              defaultValue="contact@conciergerie-bellevue.fr"
              className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-mono text-xs uppercase tracking-wide text-ink-soft">
              Téléphone
            </span>
            <input
              defaultValue="01 42 00 00 00"
              className="rounded-md border border-line bg-paper px-3 py-2 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            />
          </label>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-paper p-5">
        <h3 className="font-display text-base font-semibold text-ink">Abonnement</h3>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink">
              Essai gratuit — 9 jours restants
            </p>
            <p className="mt-1 font-mono text-xs text-ink-soft">
              79 €/mois après l&apos;essai
            </p>
          </div>
          <button
            type="button"
            onClick={() => showToast("Redirige vers le portail client Stripe (aperçu)")}
            className="rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Gérer
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-paper p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-base font-semibold text-ink">Équipe</h3>
          <button
            type="button"
            onClick={() => showToast("Formulaire d'invitation — à développer")}
            className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            + Inviter un membre
          </button>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          <li className="flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3">
            <span className="text-sm text-ink">Camille Roussel</span>
            <span className="rounded-full bg-paper-alt px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-soft">
              Admin
            </span>
          </li>
          <li className="flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3">
            <span className="text-sm text-ink">Théo Lambert</span>
            <span className="rounded-full bg-paper-alt px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-soft">
              Coordinateur
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
