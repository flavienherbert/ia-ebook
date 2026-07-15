import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { LegalDisclaimer } from "@/components/sections/LegalDisclaimer";
import { siteConfig } from "@/data/nav";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales",
  description:
    "Conditions générales de vente et d'utilisation fictives du site Nova Digital Studio, à titre d'exemple.",
  path: "/conditions-generales",
});

export default function TermsPage() {
  return (
    <Section className="pb-24 pt-16 sm:pt-20">
      <div className="mx-auto max-w-3xl space-y-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Conditions générales</h1>
          <p className="mt-4 text-sm text-muted">Dernière mise à jour : 15 juillet 2026</p>
        </div>

        <LegalDisclaimer />

        <div className="space-y-8 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Objet</h2>
            <p className="mt-3">
              Les présentes conditions générales de vente et d&apos;utilisation (« CGV/CGU »)
              régissent, à titre d&apos;exemple, la relation entre {siteConfig.name} et toute
              personne (« le Client ») souhaitant faire appel à ses services de création de site
              web, branding, SEO, publicité digitale, marketing digital, automatisation,
              intelligence artificielle, création de contenu ou community management.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Devis et commande</h2>
            <p className="mt-3">
              Toute prestation fait l&apos;objet d&apos;un devis préalable détaillant le périmètre,
              le planning et le tarif. La commande est considérée comme ferme à réception d&apos;un
              devis signé et, le cas échéant, du versement d&apos;un acompte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Tarifs et modalités de paiement</h2>
            <p className="mt-3">
              Les tarifs indiqués sur le site sont donnés à titre indicatif et hors taxes. Un devis
              personnalisé est systématiquement établi avant le démarrage de toute prestation. Sauf
              accord contraire, un acompte de 30% est demandé à la signature, le solde étant dû à la
              livraison.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Délais d&apos;exécution</h2>
            <p className="mt-3">
              Les délais de livraison communiqués sont donnés à titre indicatif et courent à
              compter de la réception de l&apos;ensemble des éléments nécessaires au démarrage de la
              prestation (contenus, accès, validations).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Obligations du Client</h2>
            <p className="mt-3">
              Le Client s&apos;engage à fournir dans les délais convenus l&apos;ensemble des
              éléments, informations et validations nécessaires à la bonne exécution de la
              prestation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Propriété intellectuelle</h2>
            <p className="mt-3">
              Les livrables (design, code, contenus) sont cédés au Client à compter du paiement
              intégral des sommes dues, sauf éléments tiers sous licence (polices, images, plugins)
              qui demeurent soumis à leurs licences respectives.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Rétractation et annulation</h2>
            <p className="mt-3">
              Conformément à la législation en vigueur pour les prestations de service aux
              professionnels et particuliers, les conditions de rétractation applicables sont
              précisées dans chaque devis contractuel.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Responsabilité</h2>
            <p className="mt-3">
              {siteConfig.name} met en œuvre tous les moyens nécessaires à la bonne exécution des
              prestations. Sa responsabilité ne saurait être engagée en cas de force majeure ou de
              manquement du Client à ses propres obligations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Droit applicable et litiges</h2>
            <p className="mt-3">
              Les présentes CGV/CGU sont soumises au droit français. En cas de litige, une solution
              amiable sera recherchée avant toute action judiciaire devant les tribunaux compétents.
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
