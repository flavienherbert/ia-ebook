import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { services } from "@/data/services";
import { generalFaq } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nos services",
  description:
    "Création de sites web, branding, SEO, publicité Meta & Google Ads, marketing digital, automatisation, intelligence artificielle, contenu et community management.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-16 pt-16 sm:pt-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Nos services</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Un accompagnement digital complet, sous un même toit.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            De la création de votre site à l&apos;acquisition de nouveaux clients, chaque service
            est pensé pour s&apos;intégrer à une stratégie globale et produire des résultats
            mesurables.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface" ariaLabelledBy="faq-heading">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 id="faq-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tout ce que vous devez savoir avant de commencer.
            </h2>
          </Reveal>
          <div className="mt-14">
            <FaqAccordion items={generalFaq} idPrefix="services-faq" />
          </div>
        </div>
      </Section>

      <Section>
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric to-violet px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Un projet en tête ? Parlons-en.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Chaque entreprise est différente : discutons de vos objectifs pour construire la
            solution la plus adaptée.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="secondary" size="lg" className="border-white/40 bg-white text-electric hover:bg-white/90">
              Prendre rendez-vous
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
