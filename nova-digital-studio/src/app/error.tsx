"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[70vh] items-center justify-center py-24 text-center">
      <div className="mx-auto max-w-lg">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-violet text-white">
          <AlertTriangle className="size-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">Une erreur est survenue.</h1>
        <p className="mt-4 text-muted">
          Quelque chose s&apos;est mal passé de notre côté. Merci de réessayer dans quelques
          instants.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={() => reset()}>Réessayer</Button>
          <Button href="/" variant="secondary">
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </Section>
  );
}
