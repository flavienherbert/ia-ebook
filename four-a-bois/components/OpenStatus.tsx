"use client";

import { useEffect, useState } from "react";
import { computeOpenStatus, type StatutOuverture } from "@/lib/hours";

export default function OpenStatus() {
  const [statut, setStatut] = useState<StatutOuverture | null>(null);

  useEffect(() => {
    setStatut(computeOpenStatus());
    const interval = setInterval(() => setStatut(computeOpenStatus()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!statut) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-ash-light px-4 py-2 text-sm text-cream/70">
        <span className="h-2.5 w-2.5 rounded-full bg-cream/30" aria-hidden="true" />
        Horaires…
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full bg-ash-light px-4 py-2 text-sm font-medium text-cream"
      role="status"
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          statut.ouvert ? "bg-ember animate-ember" : "bg-cream/30"
        }`}
        aria-hidden="true"
      />
      {statut.message}
    </span>
  );
}
