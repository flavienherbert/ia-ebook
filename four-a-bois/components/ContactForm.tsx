"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sujet = encodeURIComponent(`Message depuis le site — ${nom || "Un client"}`);
    const corps = encodeURIComponent(
      `${message}\n\n— ${nom}${telephone ? ` · ${telephone}` : ""}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${sujet}&body=${corps}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-cream/80">
          Nom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          value={nom}
          onChange={(event) => setNom(event.target.value)}
          className="mt-1 w-full rounded-lg border border-cream/20 bg-ash-light px-3 py-2 text-cream placeholder:text-cream/40"
        />
      </div>
      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-cream/80">
          Téléphone (optionnel)
        </label>
        <input
          id="telephone"
          name="telephone"
          type="tel"
          value={telephone}
          onChange={(event) => setTelephone(event.target.value)}
          className="mt-1 w-full rounded-lg border border-cream/20 bg-ash-light px-3 py-2 text-cream placeholder:text-cream/40"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-cream/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1 w-full rounded-lg border border-cream/20 bg-ash-light px-3 py-2 text-cream placeholder:text-cream/40"
        />
      </div>
      <button
        type="submit"
        className="rounded-full border border-cream/30 px-6 py-2.5 text-sm font-semibold text-cream transition hover:border-cream/60"
      >
        Envoyer par e-mail
      </button>
      <p className="text-xs text-cream/50">
        Ouvre votre messagerie avec le message pré-rempli. Pour une réponse rapide, appelez
        plutôt le {SITE.telephone}.
      </p>
    </form>
  );
}
