import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ash-dark px-6 py-10 text-cream/60">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          {SITE.mentionsLegales.raisonSociale} — Responsable : {SITE.mentionsLegales.responsable}{" "}
          — SIREN {SITE.mentionsLegales.siren} — Capital social{" "}
          {SITE.mentionsLegales.capital} — Greffe de {SITE.mentionsLegales.greffe}
        </p>
        <a
          href={SITE.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-cream/80 underline underline-offset-2 hover:text-cream"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
}
