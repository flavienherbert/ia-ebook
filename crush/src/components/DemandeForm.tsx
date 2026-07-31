"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DemandeForm({
  photoId,
  soireeId,
}: {
  photoId: string;
  soireeId: string;
}) {
  const router = useRouter();
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErreur(null);

    const formData = new FormData(e.currentTarget);
    const consentement = formData.get("consentement");
    if (!consentement) {
      setErreur("Merci de cocher la case de consentement pour continuer.");
      return;
    }

    setEnvoi(true);
    try {
      const res = await fetch("/api/demandes", {
        method: "POST",
        body: formData,
      });

      if (res.status === 429) {
        setErreur(
          "Tu as déjà envoyé plusieurs demandes récemment. Réessaie dans 24h."
        );
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErreur(body?.error ?? "Une erreur est survenue, réessaie plus tard.");
        return;
      }

      router.push("/demande/envoyee");
    } catch {
      setErreur("Une erreur réseau est survenue, réessaie.");
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="photo_id" value={photoId} />
      <input type="hidden" name="soiree_id" value={soireeId} />

      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">
          Décris la personne (position sur la photo, tenue...)
        </span>
        <input
          name="description"
          required
          maxLength={200}
          placeholder="ex. la fille de gauche, robe bleue"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-[var(--accent)]"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">
          Ton message (affiché publiquement dans le post)
        </span>
        <textarea
          name="message_utilisateur"
          required
          maxLength={280}
          rows={4}
          placeholder="ex. On a discuté vers minuit près du bar, j'aurais aimé continuer la conversation !"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-[var(--accent)]"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm text-white/70">
          Ton contact (optionnel, jamais affiché publiquement)
        </span>
        <input
          name="contact_demandeur"
          maxLength={120}
          placeholder="email ou @instagram"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-[var(--accent)]"
        />
      </label>

      <label className="flex items-start gap-2 text-sm text-white/70">
        <input type="checkbox" name="consentement" className="mt-1" required />
        <span>
          Je confirme que ma démarche n&apos;a pas pour but de nuire à cette
          personne, que je ne pense pas qu&apos;elle soit mineure, et j&apos;accepte les
          CGU du site.
        </span>
      </label>

      {erreur && <p className="text-sm text-red-400">{erreur}</p>}

      <button
        type="submit"
        disabled={envoi}
        className="rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-white disabled:opacity-50"
      >
        {envoi ? "Envoi..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
