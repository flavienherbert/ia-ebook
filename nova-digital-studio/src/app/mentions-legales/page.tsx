import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { LegalDisclaimer } from "@/components/sections/LegalDisclaimer";
import { siteConfig } from "@/data/nav";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales fictives du site Nova Digital Studio, à titre d'exemple.",
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

        <LegalDisclaimer />

        <div className="space-y-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Éditeur du site</h2>
            <p className="mt-3">
              Le présent site est édité par la société fictive <strong>{siteConfig.name} SAS</strong>,
              société par actions simplifiée au capital social de 10 000€, immatriculée au Registre
              du Commerce et des Sociétés de Paris sous le numéro fictif 123 456 789 R.C.S. Paris.
            </p>
            <p className="mt-3">
              Siège social : {siteConfig.address} (adresse fictive).
              <br />
              Numéro de TVA intracommunautaire fictif : FR12 123456789.
              <br />
              Directeur de la publication : Alexandre Moreau, en sa qualité de Fondateur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Hébergement</h2>
            <p className="mt-3">
              Le site est hébergé, à titre d&apos;exemple, par un prestataire d&apos;hébergement
              cloud. Dans un déploiement réel, indiquez ici le nom, l&apos;adresse et les
              coordonnées de votre hébergeur effectif (ex. Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Propriété intellectuelle</h2>
            <p className="mt-3">
              L&apos;ensemble des éléments présents sur ce site (textes, visuels, logos, structure)
              constitue, dans le cadre d&apos;un déploiement réel, une œuvre protégée par le droit
              de la propriété intellectuelle. Toute reproduction, représentation ou exploitation,
              totale ou partielle, sans autorisation préalable, est interdite.
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
