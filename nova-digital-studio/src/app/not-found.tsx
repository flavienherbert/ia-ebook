import { Compass } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] items-center justify-center py-24 text-center">
      <div className="mx-auto max-w-lg">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-violet text-white">
          <Compass className="size-8" aria-hidden="true" />
        </div>
        <p className="mt-6 text-sm font-medium uppercase tracking-wider text-electric">Erreur 404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Cette page a pris un autre chemin.
        </h1>
        <p className="mt-4 text-muted">
          La page que vous recherchez n&apos;existe pas ou a été déplacée. Revenez à
          l&apos;accueil ou explorez nos services.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href="/services" variant="secondary">
            Voir nos services
          </Button>
        </div>
      </div>
    </Section>
  );
}
