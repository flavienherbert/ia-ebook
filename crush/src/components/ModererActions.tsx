"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ModererActions({ demandeId }: { demandeId: string }) {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);
  const [motifRejet, setMotifRejet] = useState("");
  const [afficherRejet, setAfficherRejet] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function moderer(action: "approuver" | "rejeter") {
    setEnCours(true);
    setErreur(null);
    try {
      const res = await fetch(`/api/demandes/${demandeId}/moderer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, motif_rejet: motifRejet || undefined }),
      });
      if (!res.ok && res.status !== 207) {
        const body = await res.json().catch(() => null);
        setErreur(body?.error ?? "Erreur pendant la modération.");
        return;
      }
      router.refresh();
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={() => moderer("approuver")}
          disabled={enCours}
          className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
        >
          Approuver
        </button>
        <button
          onClick={() => setAfficherRejet((v) => !v)}
          disabled={enCours}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
        >
          Rejeter
        </button>
      </div>
      {afficherRejet && (
        <div className="flex gap-2">
          <input
            value={motifRejet}
            onChange={(e) => setMotifRejet(e.target.value)}
            placeholder="Motif du rejet (optionnel)"
            className="flex-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-sm outline-none"
          />
          <button
            onClick={() => moderer("rejeter")}
            disabled={enCours}
            className="rounded-lg bg-red-700 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
          >
            Confirmer
          </button>
        </div>
      )}
      {erreur && <p className="text-sm text-red-400">{erreur}</p>}
    </div>
  );
}
