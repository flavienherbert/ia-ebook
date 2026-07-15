import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { StatsGrid } from "@/components/sections/StatsGrid";
import { WhyUs } from "@/components/sections/WhyUs";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { services } from "@/data/services";
import { portfolioProjects } from "@/data/portfolio";
import { testimonials } from "@/data/testimonials";
import { companyStats } from "@/data/stats";
import { collaborationSteps } from "@/data/process-steps";
import { generalFaq } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nova Digital Studio — Agence digitale premium à Paris",
  description:
    "Sites web, branding, SEO, publicité Meta & Google Ads, marketing digital, automatisation et IA : Nova Digital Studio transforme votre présence en ligne en croissance mesurable.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Présentation de l'agence */}
      <Section ariaLabelledBy="presentation-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow>Notre agence</Eyebrow>
            <h2 id="presentation-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Une agence à taille humaine, une exigence de grand groupe.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4 text-muted">
            <p>
              Depuis 8 ans, Nova Digital Studio accompagne des entreprises ambitieuses dans la
              construction de leur présence en ligne. Notre équipe pluridisciplinaire réunit
              designers, développeurs, experts SEO, traffic managers et spécialistes IA autour
              d&apos;un objectif commun : transformer votre digital en véritable moteur de croissance.
            </p>
            <p>
              Nous ne livrons pas de simples prestations isolées : nous construisons des systèmes
              digitaux cohérents, mesurés et pensés pour durer, en gardant toujours une obsession
              commune — votre retour sur investissement.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Pourquoi nous choisir */}
      <Section className="bg-surface" ariaLabelledBy="why-us-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Pourquoi nous choisir</Eyebrow>
          <h2 id="why-us-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Une méthode éprouvée, des résultats mesurables.
          </h2>
        </Reveal>
        <div className="mt-14">
          <WhyUs />
        </div>
      </Section>

      {/* Nos chiffres */}
      <Section ariaLabelledBy="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Nos chiffres clés
        </h2>
        <StatsGrid stats={companyStats} />
      </Section>

      {/* Nos services */}
      <Section className="bg-surface" ariaLabelledBy="services-heading">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>Nos services</Eyebrow>
            <h2 id="services-heading" className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Tout ce dont votre marque a besoin pour grandir en ligne.
            </h2>
          </Reveal>
          <Button href="/services" variant="secondary">
            Voir tous les services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.06}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Nos réalisations */}
      <Section ariaLabelledBy="portfolio-heading">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <Eyebrow>Nos réalisations</Eyebrow>
            <h2 id="portfolio-heading" className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Des résultats concrets pour des marques ambitieuses.
            </h2>
          </Reveal>
          <Button href="/portfolio" variant="secondary">
            Voir le portfolio complet
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.slice(0, 3).map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Avis clients */}
      <Section className="bg-surface" ariaLabelledBy="testimonials-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Avis clients</Eyebrow>
          <h2 id="testimonials-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ils nous ont fait confiance.
          </h2>
        </Reveal>
        <div className="mt-14">
          <Testimonials testimonials={testimonials} />
        </div>
      </Section>

      {/* Étapes de collaboration */}
      <Section ariaLabelledBy="process-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Notre méthode</Eyebrow>
          <h2 id="process-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Comment se déroule notre collaboration ?
          </h2>
        </Reveal>
        <div className="mt-14">
          <ProcessSteps steps={collaborationSteps} />
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface" ariaLabelledBy="faq-heading">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 id="faq-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Vous avez des questions ? Nous avons les réponses.
            </h2>
          </Reveal>
          <div className="mt-14">
            <FaqAccordion items={generalFaq} idPrefix="home-faq" />
          </div>
        </div>
      </Section>

      {/* CTA final */}
      <Section>
        <Reveal
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric to-violet px-8 py-16 text-center sm:px-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] [background-size:20px_20px]" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Prêt à transformer votre présence en ligne ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Réservez un appel découverte gratuit et recevez une proposition personnalisée sous
              48h ouvrées.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="secondary" size="lg" className="border-white/40 bg-white text-electric hover:bg-white/90">
                Démarrer un projet
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
