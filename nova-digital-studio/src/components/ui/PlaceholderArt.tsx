import { cn } from "@/lib/utils";

interface PlaceholderArtProps {
  label: string;
  from?: string;
  to?: string;
  className?: string;
  initials?: string;
  icon?: React.ReactNode;
}

/**
 * Fictional-content placeholder for the imagery the brief calls for (team photos,
 * project screenshots) without depending on external stock-photo requests.
 * role="img" + aria-label keep it equivalent to a real <img alt="..."> for a11y.
 */
export function PlaceholderArt({
  label,
  from = "var(--electric)",
  to = "var(--violet)",
  className,
  initials,
  icon,
}: PlaceholderArtProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        className
      )}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 15% 15%, ${from} 0%, transparent 55%), linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:18px_18px] opacity-40" />
      {initials ? (
        <span className="relative text-2xl font-semibold tracking-wide text-white/90">
          {initials}
        </span>
      ) : icon ? (
        <span className="relative text-white/90">{icon}</span>
      ) : null}
    </div>
  );
}
