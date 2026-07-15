import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/types";
import { ServiceIcon } from "@/lib/icon-map";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-electric/50 hover:shadow-lifted"
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric/15 to-violet/15 text-electric transition-colors group-hover:from-electric group-hover:to-violet group-hover:text-white">
        <ServiceIcon name={service.icon} className="size-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.shortDescription}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-electric">
        Découvrir le service
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
