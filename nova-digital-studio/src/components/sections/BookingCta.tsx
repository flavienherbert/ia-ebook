import { CalendarClock } from "lucide-react";
import { siteConfig } from "@/data/nav";
import { Button } from "@/components/ui/Button";

/**
 * Booking slot: set `siteConfig.bookingUrl` (src/data/nav.ts) to your Calendly/Cal.com link and
 * this renders a real embed automatically. Until then it falls back to a standard contact CTA so
 * the page never looks broken.
 */
export function BookingCta() {
  if (siteConfig.bookingUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <iframe
          src={siteConfig.bookingUrl}
          title="Prendre rendez-vous"
          className="h-[700px] w-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
      <CalendarClock className="size-8 text-electric" aria-hidden="true" />
      <div>
        <h3 className="text-base font-semibold text-foreground">Réservez un appel découverte</h3>
        <p className="mt-1.5 max-w-sm text-sm text-muted">
          Un échange de 30 minutes, sans engagement, pour parler de votre projet. Le calendrier de
          réservation en ligne sera bientôt disponible ici — en attendant, contactez-nous via le
          formulaire pour convenir d&apos;un créneau.
        </p>
      </div>
      <Button href="/contact">Contacter Klarim</Button>
    </div>
  );
}
