import { whyUsPoints } from "@/data/stats";
import { ServiceIcon } from "@/lib/icon-map";
import { Reveal } from "@/components/ui/Reveal";

export function WhyUs() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {whyUsPoints.map((point, index) => (
        <Reveal
          key={point.title}
          delay={index * 0.08}
          className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
        >
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-electric/15 to-violet/15 text-electric">
            <ServiceIcon name={point.icon} className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">{point.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.description}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
