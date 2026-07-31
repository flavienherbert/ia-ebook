"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignalementActions({ signalementId }: { signalementId: string }) {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);

  async function traiter(supprimerCible: boolean) {
    setEnCours(true);
    try {
      await fetch(`/api/admin/signalements/${signalementId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supprimer_cible: supprimerCible }),
      });
      router.refresh();
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => traiter(false)}
        disabled={enCours}
        className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
      >
        Marquer traité
      </button>
      <button
        onClick={() => traiter(true)}
        disabled={enCours}
        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
      >
        Supprimer le contenu
      </button>
    </div>
  );
}
