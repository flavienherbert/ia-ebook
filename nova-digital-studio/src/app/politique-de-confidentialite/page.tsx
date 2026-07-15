import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { LegalDisclaimer } from "@/components/sections/LegalDisclaimer";
import { siteConfig } from "@/data/nav";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité fictive du site Nova Digital Studio, à titre d'exemple, conforme aux principes du RGPD.",
  path: "/politique-de-confidentialite",
});

export default function PrivacyPolicyPage() {
  return (
    <Section className="pb-24 pt-16 sm:pt-20">
      <div className="mx-auto max-w-3xl space-y-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Politique de confidentialité</h1>
          <p className="mt-4 text-sm text-muted">Dernière mise à jour : 15 juillet 2026</p>
        </div>

        <LegalDisclaimer />

        <div className="space-y-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Données collectées</h2>
            <p className="mt-3">
              Dans le cadre de l&apos;utilisation de ce site, nous collectons les données que vous
              nous transmettez volontairement via nos formulaires : nom, adresse email, entreprise,
              message et, le cas échéant, budget indicatif. Ce site étant une démonstration, aucune
              donnée réelle n&apos;est traitée à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Finalités du traitement</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Répondre à vos demandes de contact et de devis.</li>
              <li>Vous adresser notre newsletter, si vous y avez consenti explicitement.</li>
              <li>Améliorer la qualité de nos services et de notre site.</li>
              <li>Respecter nos obligations légales et réglementaires.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Base légale</h2>
            <p className="mt-3">
              Le traitement de vos données repose sur votre consentement explicite (formulaire de
              contact et newsletter) ainsi que sur l&apos;intérêt légitime de{" "}
              {siteConfig.name} à répondre à vos demandes commerciales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Durée de conservation</h2>
            <p className="mt-3">
              Vos données sont conservées pendant une durée de 3 ans à compter de notre dernier
              contact, sauf obligation légale de conservation plus longue ou demande de suppression
              anticipée de votre part.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Destinataires des données</h2>
            <p className="mt-3">
              Vos données sont destinées exclusivement à nos équipes internes et, le cas échéant, à
              nos sous-traitants techniques (hébergement, emailing), dans la stricte limite
              nécessaire à l&apos;exécution de leurs prestations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Vos droits</h2>
            <p className="mt-3">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
              d&apos;effacement, de limitation, d&apos;opposition et de portabilité de vos données.
              Pour exercer ces droits, contactez-nous à l&apos;adresse{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-foreground underline underline-offset-4">
                {siteConfig.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Sécurité</h2>
            <p className="mt-3">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès, modification, divulgation ou destruction non
              autorisés (chiffrement des échanges, accès restreints, validation des formulaires).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Cookies</h2>
            <p className="mt-3">
              Nous utilisons des cookies essentiels au fonctionnement du site ainsi que des cookies
              de mesure d&apos;audience, soumis à votre consentement via le bandeau dédié.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Contact</h2>
            <p className="mt-3">
              Pour toute question relative à cette politique de confidentialité, vous pouvez nous
              contacter à l&apos;adresse {siteConfig.email} ou à l&apos;adresse postale{" "}
              {siteConfig.address}.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
