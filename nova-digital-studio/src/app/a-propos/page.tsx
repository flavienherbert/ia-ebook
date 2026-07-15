import type { Metadata } from "next";
import { Target, Eye, ShieldCheck, Sparkles, HeartHandshake, Zap } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { StatsGrid } from "@/components/sections/StatsGrid";
import { teamMembers } from "@/data/team";
import { companyStats } from "@/data/stats";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "À propos",
  description:
    "Découvrez la mission, la vision, les valeurs et l'équipe de Nova Digital Studio, l'agence digitale qui transforme la présence en ligne des entreprises ambitieuses.",
  path: "/a-propos",
});

const values = [
  {
    icon: ShieldCheck,
    title: "Transparence",
    description: "Des reportings clairs et des résultats mesurés, sans jargon ni promesses vagues.",
  },
  {
    icon: Sparkles,
    title: "Exigence créative",
    description: "Nous ne livrons jamais un travail générique : chaque projet mérite une attention sur mesure.",
  },
  {
    icon: HeartHandshake,
    title: "Partenariat",
    description: "Nous nous impliquons dans votre réussite comme si votre entreprise était la nôtre.",
  },
  {
    icon: Zap,
    title: "Impact mesurable",
    description: "Chaque action que nous menons est reliée à un objectif business concret.",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Naissance de l'agence",
    description:
      "Alexandre Moreau fonde Nova Digital Studio à Paris avec une mission claire : rendre le design digital premium accessible aux PME ambitieuses.",
  },
  {
    year: "2020",
    title: "Élargissement de l'offre",
    description:
      "L'agence intègre le SEO et la publicité digitale à son offre pour proposer un accompagnement complet, du design à l'acquisition.",
  },
  {
    year: "2022",
    title: "Cap des 100 projets",
    description:
      "Nova Digital Studio franchit les 100 projets livrés et constitue une équipe pluridisciplinaire de 12 experts.",
  },
  {
    year: "2024",
    title: "Intégration de l'intelligence artificielle",
    description:
      "L'agence lance son pôle IA pour accompagner ses clients dans l'automatisation et la personnalisation de leur relation client.",
  },
  {
    year: "2026",
    title: "Aujourd'hui",
    description:
      "Plus de 120 marques accompagnées, une équipe de 15 experts et une conviction intacte : le digital doit servir une croissance mesurable.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-16 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow>À propos de nous</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Une agence digitale née d&apos;une conviction simple.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Nova Digital Studio a été fondée avec l&apos;idée que chaque entreprise, quelle que
              soit sa taille, mérite une présence en ligne à la hauteur de son savoir-faire. Depuis
              2018, nous accompagnons des marques ambitieuses dans la construction d&apos;un
              écosystème digital cohérent, performant et durable.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <PlaceholderArt
              label="Équipe de Nova Digital Studio au travail dans ses locaux parisiens"
              className="aspect-[4/3] w-full shadow-lifted"
            />
          </Reveal>
        </div>
      </Section>

      <Section className="bg-surface">
        <StatsGrid stats={companyStats} />
      </Section>

      {/* Mission & Vision */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-surface p-8">
            <Target className="size-8 text-electric" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Notre mission</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Donner à chaque entreprise les outils digitaux et la stratégie nécessaires pour
              convertir sa visibilité en ligne en croissance réelle et mesurable, sans jargon ni
              complexité inutile.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl border border-border bg-surface p-8">
            <Eye className="size-8 text-violet" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Notre vision</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Devenir le partenaire digital de référence des entreprises qui refusent la médiocrité
              et veulent bâtir une marque forte, soutenue par une exécution technique irréprochable.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Valeurs */}
      <Section className="bg-surface" ariaLabelledBy="values-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Nos valeurs</Eyebrow>
          <h2 id="values-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ce qui guide chacune de nos décisions.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal
              key={value.title}
              delay={index * 0.08}
              className="rounded-2xl border border-border bg-background p-6 text-center"
            >
              <value.icon className="mx-auto size-8 text-electric" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Historique */}
      <Section ariaLabelledBy="history-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Notre histoire</Eyebrow>
          <h2 id="history-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Huit ans de croissance, un cap inchangé.
          </h2>
        </Reveal>
        <ol className="mx-auto mt-14 max-w-3xl space-y-8 border-l border-border pl-8">
          {timeline.map((item, index) => (
            <Reveal as="li" key={item.year} delay={index * 0.08} className="relative">
              <span className="absolute -left-[2.35rem] flex size-4 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet ring-4 ring-background" />
              <span className="text-sm font-semibold text-electric">{item.year}</span>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Équipe */}
      <Section className="bg-surface" ariaLabelledBy="team-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Notre équipe</Eyebrow>
          <h2 id="team-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Les personnes derrière vos projets.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Reveal
              key={member.name}
              delay={index * 0.08}
              className="overflow-hidden rounded-2xl border border-border bg-background"
            >
              <PlaceholderArt
                label={`Portrait de ${member.name}, ${member.role}`}
                from={member.gradient.from}
                to={member.gradient.to}
                initials={member.initials}
                className="aspect-[4/3] w-full rounded-none"
              />
              <div className="p-6">
                <h3 className="text-base font-semibold">{member.name}</h3>
                <p className="mt-0.5 text-sm text-electric">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
