import { SITE, itineraireUrl } from "@/lib/site";

export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex border-t border-ash/10 bg-ash text-cream shadow-[0_-4px_16px_rgba(0,0,0,0.25)] sm:hidden">
      <a
        href={SITE.telephoneHref}
        className="flex flex-1 items-center justify-center gap-2 bg-ember py-3.5 text-sm font-semibold"
      >
        Appeler
      </a>
      <a
        href={itineraireUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold"
      >
        Itinéraire
      </a>
    </div>
  );
}
