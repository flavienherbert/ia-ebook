"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PublierButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);
  const [resultat, setResultat] = useState<string | null>(null);

  async function onClick() {
    setEnCours(true);
    setResultat(null);
    try {
      const res = await fetch(`/api/posts/${postId}/publier`, { method: "POST" });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        setResultat(body?.error ?? "Échec de la publication.");
        return;
      }
      if (body?.manuel) {
        setResultat("Publication auto non configurée : télécharge l'image et poste-la toi-même.");
      } else {
        setResultat("Publié sur Instagram ✅");
        router.refresh();
      }
    } finally {
      setEnCours(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={onClick}
        disabled={enCours}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 font-medium disabled:opacity-50"
      >
        {enCours ? "..." : "Publier"}
      </button>
      {resultat && <p className="text-sm text-white/70">{resultat}</p>}
    </div>
  );
}
