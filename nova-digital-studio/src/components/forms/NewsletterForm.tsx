"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Merci de saisir une adresse email valide.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 text-sm text-foreground">
        <CheckCircle2 className="size-4 text-electric" aria-hidden="true" />
        Merci ! Vérifiez votre boîte mail pour confirmer votre inscription.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn(compact ? "max-w-xs" : "max-w-md")}>
      <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-foreground">
        Recevez nos conseils marketing par email
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@entreprise.com"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className="h-11 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted focus-visible:border-electric"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="S'inscrire à la newsletter"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-electric to-violet text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          <Send className="size-4" aria-hidden="true" />
        </button>
      </div>
      {status === "error" && (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}
