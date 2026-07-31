"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreerSoireeForm() {
  const router = useRouter();
  const [libelle, setLibelle] = useState("");
  const [date, setDate] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnCours(true);
    setErreur(null);
    try {
      const res = await fetch("/api/admin/soirees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ libelle, date_soiree: date }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErreur(body?.error ?? "Création impossible.");
        return;
      }
      setLibelle("");
      setDate("");
      router.refresh();
    } finally {
      setEnCours(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mb-8 flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">Libellé</span>
        <input
          value={libelle}
          onChange={(e) => setLibelle(e.target.value)}
          required
          placeholder="Samedi 26 juillet"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none"
        />
      </label>
      <button
        type="submit"
        disabled={enCours}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 font-medium disabled:opacity-50"
      >
        {enCours ? "..." : "Créer la soirée"}
      </button>
      {erreur && <p className="text-sm text-red-400">{erreur}</p>}
    </form>
  );
}
