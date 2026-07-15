import type { Stat } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((stat, index) => (
        <Reveal
          key={stat.label}
          delay={index * 0.08}
          className="flex flex-col text-center sm:text-left"
        >
          <dt className="order-2 mt-1 text-sm text-muted">{stat.label}</dt>
          <dd className="order-1 text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
            {stat.value}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
