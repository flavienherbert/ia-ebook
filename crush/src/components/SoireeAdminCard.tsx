"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Soiree } from "@/lib/types";

export default function SoireeAdminCard({ soiree }: { soiree: Soiree }) {
  const router = useRouter();
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function changerStatut(statut: Soiree["statut"]) {
    setEnCours(true);
    setErreur(null);
    try {
      const res = await fetch(`/api/admin/soirees/${soiree.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErreur(body?.error ?? "Mise à jour impossible.");
        return;
      }
      router.refresh();
    } finally {
      setEnCours(false);
    }
  }

  async function uploaderPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    const fichiers = e.target.files;
    if (!fichiers || fichiers.length === 0) return;

    setEnCours(true);
    setErreur(null);
    try {
      const formData = new FormData();
      formData.set("soiree_id", soiree.id);
      Array.from(fichiers).forEach((f) => formData.append("fichiers", f));

      const res = await fetch("/api/admin/photos", { method: "POST", body: formData });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErreur(body?.error ?? "Upload impossible.");
        return;
      }
      router.refresh();
    } finally {
      setEnCours(false);
      e.target.value = "";
    }
  }

  return (
    <div className="rounded-lg border border-white/10 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{soiree.libelle}</p>
          <p className="text-sm text-white/50">
            {new Date(soiree.date_soiree).toLocaleDateString("fr-FR")} · {soiree.statut}
          </p>
        </div>
        <div className="flex gap-2">
          {soiree.statut !== "publiee" && (
            <button
              onClick={() => changerStatut("publiee")}
              disabled={enCours}
              className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
            >
              Publier
            </button>
          )}
          {soiree.statut !== "archivee" && (
            <button
              onClick={() => changerStatut("archivee")}
              disabled={enCours}
              className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium disabled:opacity-50"
            >
              Archiver
            </button>
          )}
        </div>
      </div>

      <label className="mt-3 inline-block cursor-pointer text-sm underline text-white/60">
        Ajouter des photos
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={uploaderPhotos}
          className="hidden"
          disabled={enCours}
        />
      </label>
      {erreur && <p className="mt-1 text-sm text-red-400">{erreur}</p>}
    </div>
  );
}
