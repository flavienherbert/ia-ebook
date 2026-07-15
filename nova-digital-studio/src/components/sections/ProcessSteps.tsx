import type { ProcessStep } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, index) => (
        <Reveal as="li" key={step.step} delay={index * 0.1} className="relative rounded-2xl border border-border bg-surface p-6">
          <span className="text-3xl font-semibold text-gradient">{step.step}</span>
          <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}
