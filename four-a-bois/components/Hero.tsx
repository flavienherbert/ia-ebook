import OvenArch from "@/components/OvenArch";
import OpenStatus from "@/components/OpenStatus";
import { SITE, itineraireUrl } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ash px-6 pb-16 pt-10 text-cream sm:pb-24 sm:pt-14">
      <OvenArch />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <OpenStatus />

        <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
          Le Four à Bois
        </h1>

        <p className="max-w-md text-balance text-lg text-cream/85 sm:text-xl">
          Pizzeria italienne cuite au feu de bois, à {SITE.ville}. Tout est fait maison,
          avec des produits locaux.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={SITE.telephoneHref}
            className="rounded-full bg-ember px-7 py-3.5 text-base font-semibold text-cream shadow-lg shadow-ember/20 transition hover:bg-ember-dark"
          >
            Appeler — {SITE.telephone}
          </a>
          <a
            href={itineraireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-cream/30 px-7 py-3.5 text-base font-semibold text-cream transition hover:border-cream/60"
          >
            Itinéraire
          </a>
        </div>

        <p className="pt-1 text-sm text-cream/60">
          {SITE.adresse.rue}, {SITE.adresse.codePostal} {SITE.adresse.ville} · note {SITE.note}/5
        </p>
      </div>
    </section>
  );
}
