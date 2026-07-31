"use client";

import { useState } from "react";

export default function SignalementPage() {
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoi, setEnvoi] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur(null);
    setEnvoi(true);

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/signalements", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErreur(body?.error ?? "Une erreur est survenue, réessaie plus tard.");
        return;
      }
      setEnvoye(true);
    } catch {
      setErreur("Une erreur réseau est survenue, réessaie.");
    } finally {
      setEnvoi(false);
    }
  }

  if (envoye) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold">Signalement envoyé</h1>
        <p className="text-white/60">
          Merci, il sera traité rapidement par un modérateur.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Signaler / demander un retrait</h1>
      <p className="mb-6 text-white/60">
        Une photo ou un post te concerne et tu veux qu&apos;il soit retiré ? Ou tu
        veux signaler un contenu problématique ? Utilise ce formulaire.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-white/70">Lien du post ou de la demande (si tu l&apos;as)</span>
          <input
            name="reference"
            placeholder="URL Instagram ou lien de la page"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-white/70">Motif</span>
          <select
            name="motif"
            required
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-[var(--accent)]"
          >
            <option value="">Choisis un motif</option>
            <option value="demande_de_retrait">Je demande le retrait de ma photo</option>
            <option value="mineur">La personne pourrait être mineure</option>
            <option value="harcelement">Harcèlement / contenu malveillant</option>
            <option value="autre">Autre</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-white/70">Détails</span>
          <textarea
            name="details"
            rows={4}
            maxLength={500}
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-[var(--accent)]"
          />
        </label>

        {erreur && <p className="text-sm text-red-400">{erreur}</p>}

        <button
          type="submit"
          disabled={envoi}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {envoi ? "Envoi..." : "Envoyer le signalement"}
        </button>
      </form>
    </div>
  );
}
