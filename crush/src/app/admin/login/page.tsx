"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnvoi(true);
    setErreur(null);

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });

    setEnvoi(false);
    if (error) {
      setErreur(error.message);
      return;
    }
    setEnvoye(true);
  }

  if (envoye) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold">Vérifie ta boîte mail</h1>
        <p className="text-white/60">
          Un lien de connexion vient de t&apos;être envoyé à {email}.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm py-12">
      <h1 className="mb-6 text-2xl font-bold">Connexion modérateur</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-[var(--accent)]"
        />
        {erreur && <p className="text-sm text-red-400">{erreur}</p>}
        <button
          type="submit"
          disabled={envoi}
          className="rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-white disabled:opacity-50"
        >
          {envoi ? "Envoi..." : "Recevoir un lien de connexion"}
        </button>
      </form>
    </div>
  );
}
