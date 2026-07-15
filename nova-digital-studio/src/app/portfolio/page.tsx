import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { portfolioProjects } from "@/data/portfolio";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Découvrez les projets réalisés par Nova Digital Studio : sites web, branding, SEO, publicité et intelligence artificielle, avec des résultats mesurables à l'appui.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <Section className="pb-16 pt-16 sm:pt-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Des projets, des objectifs, des résultats.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Chaque projet que nous menons répond à un objectif business précis. Découvrez comment
            nous avons accompagné ces marques vers des résultats concrets et mesurables.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-surface">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric to-violet px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Votre projet pourrait être le prochain.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Parlons de vos objectifs et construisons ensemble une stratégie digitale qui produit
            des résultats mesurables.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="secondary" size="lg" className="border-white/40 bg-white text-electric hover:bg-white/90">
              Démarrer un projet
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
