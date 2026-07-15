import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/lib/types";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { Badge } from "@/components/ui/Badge";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const cover = project.gallery[0];

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-electric/50 hover:shadow-lifted"
    >
      <PlaceholderArt
        label={cover?.alt ?? project.name}
        from={cover?.from}
        to={cover?.to}
        className="aspect-[4/3] w-full rounded-none"
        initials={project.name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <Badge>{project.sector}</Badge>
          <span className="text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{project.description}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-electric">
          Voir l&apos;étude de cas
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
