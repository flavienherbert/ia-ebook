import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/data/nav";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Klarim.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <Section className="pb-24 pt-16 sm:pt-20">
      <div className="mx-auto max-w-3xl space-y-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Mentions légales</h1>
          <p className="mt-4 text-sm text-muted">Dernière mise à jour : 15 juillet 2026</p>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Éditeur du site</h2>
            <p className="mt-3">
              Le présent site est édité par <strong>{siteConfig.name}</strong>, [forme juridique,
              ex. SAS / EI / SARL] au capital social de [montant]€, immatriculée au Registre du
              Commerce et des Sociétés de [ville] sous le numéro [SIREN/SIRET].
            </p>
            <p className="mt-3">
              Siège social : {siteConfig.address}.
              <br />
              Numéro de TVA intracommunautaire : [numéro de TVA].
              <br />
              Directeur de la publication : [nom du responsable de publication].
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Hébergement</h2>
            <p className="mt-3">
              Le site est hébergé par [nom de l&apos;hébergeur], [adresse de l&apos;hébergeur]. Ces
              informations doivent correspondre à votre hébergeur effectif (par exemple Vercel Inc.,
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis, si le site est déployé sur
              Vercel).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Propriété intellectuelle</h2>
            <p className="mt-3">
              L&apos;ensemble des éléments présents sur ce site (textes, visuels, logos, structure)
              constitue une œuvre protégée par le droit de la propriété intellectuelle. Toute
              reproduction, représentation ou exploitation, totale ou partielle, sans autorisation
              préalable, est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Données personnelles</h2>
            <p className="mt-3">
              Le traitement des données personnelles collectées via ce site (notamment via le
              formulaire de contact) est détaillé dans notre{" "}
              <a href="/politique-de-confidentialite" className="text-foreground underline underline-offset-4">
                politique de confidentialité
              </a>
              , conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Cookies</h2>
            <p className="mt-3">
              Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et mesurer
              l&apos;audience. Vous pouvez à tout moment gérer vos préférences via le bandeau prévu
              à cet effet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Limitation de responsabilité</h2>
            <p className="mt-3">
              Les informations diffusées sur ce site le sont à titre indicatif. L&apos;éditeur
              s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées mais ne
              saurait être tenu responsable des erreurs, omissions ou de l&apos;indisponibilité
              temporaire du service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Droit applicable</h2>
            <p className="mt-3">
              Les présentes mentions légales sont soumises au droit français. Tout litige relatif à
              l&apos;utilisation de ce site relève de la compétence exclusive des tribunaux
              français.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
