import { AlertTriangle } from "lucide-react";

export function LegalDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-600 dark:text-amber-400">
      <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p>
        <strong>Contenu fictif à titre d&apos;exemple.</strong> Nova Digital Studio est une agence
        fictive créée pour la démonstration de ce site. Les informations légales ci-dessous sont
        données à titre d&apos;illustration et doivent être remplacées par les mentions réelles de
        votre entreprise avant toute mise en production.
      </p>
    </div>
  );
}
