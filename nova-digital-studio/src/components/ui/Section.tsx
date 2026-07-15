import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  className,
  containerClassName,
  children,
  id,
  ariaLabelledBy,
}: {
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
  ariaLabelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("py-20 sm:py-28", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted">
      <span className="size-1.5 rounded-full bg-gradient-to-r from-electric to-violet" />
      {children}
    </span>
  );
}
