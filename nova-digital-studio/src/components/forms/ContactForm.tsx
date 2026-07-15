"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { services } from "@/data/services";
import {
  validateContactForm,
  hasErrors,
  type ContactFormValues,
  type ContactFormErrors,
} from "@/lib/validation";
import { Button } from "@/components/ui/Button";

const budgets = ["Moins de 2 000€", "2 000€ – 5 000€", "5 000€ – 15 000€", "Plus de 15 000€", "À définir ensemble"];

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const setField = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(values);
    setErrors(validation);
    if (hasErrors(validation)) return;

    setStatus("loading");
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Une erreur est survenue. Merci de réessayer.");
      }

      setStatus("success");
      setValues(initialValues);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-10 text-center"
      >
        <CheckCircle2 className="size-12 text-electric" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Message envoyé avec succès !</h3>
        <p className="max-w-sm text-sm text-muted">
          Merci pour votre message. Notre équipe vous recontactera sous 48h ouvrées pour échanger sur
          votre projet.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from real users, catches basic bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setField("website", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field label="Adresse email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Entreprise" htmlFor="company" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            className={inputClass(false)}
          />
        </Field>

        <Field label="Budget indicatif" htmlFor="budget" error={errors.budget}>
          <select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(e) => setField("budget", e.target.value)}
            className={inputClass(false)}
          >
            <option value="">Sélectionnez un budget</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Service qui vous intéresse" htmlFor="service" error={errors.service} required>
        <select
          id="service"
          name="service"
          required
          value={values.service}
          onChange={(e) => setField("service", e.target.value)}
          className={inputClass(!!errors.service)}
        >
          <option value="">Sélectionnez un service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Autre">Autre / je ne sais pas encore</option>
        </select>
      </Field>

      <Field label="Décrivez votre projet" htmlFor="message" error={errors.message} required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder="Parlez-nous de votre entreprise, de vos objectifs et de vos délais…"
          className={inputClass(!!errors.message)}
        />
      </Field>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(e) => setField("consent", e.target.checked)}
          aria-describedby={errors.consent ? "consent-error" : undefined}
          className="mt-1 size-4 shrink-0 rounded border-border text-electric focus-visible:outline-electric"
        />
        <label htmlFor="consent" className="text-sm text-muted">
          J&apos;accepte que mes données soient utilisées pour être recontacté(e), conformément à la{" "}
          <a href="/politique-de-confidentialite" className="underline underline-offset-4 hover:text-foreground">
            politique de confidentialité
          </a>
          .
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" role="alert" className="-mt-3 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="size-3.5" aria-hidden="true" />
          {errors.consent}
        </p>
      )}

      {status === "error" && serverError && (
        <p role="alert" className="flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </Button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors",
    "focus-visible:border-electric",
    hasError ? "border-red-500" : "border-border",
  ].join(" ");
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-electric">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle className="size-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
