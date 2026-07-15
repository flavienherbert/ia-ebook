import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";
import { JsonLd } from "@/components/seo/JsonLd";
import { portfolioProjects, getProjectBySlug } from "@/data/portfolio";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.name} — Étude de cas`,
    description: project.description,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedService = getServiceBySlug(project.serviceSlug);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    creator: { "@type": "Organization", name: "Nova Digital Studio" },
    url: `${siteUrl}/portfolio/${project.slug}`,
    dateCreated: project.year,
  };

  return (
    <>
      <JsonLd data={projectSchema} />

      <Section className="pb-12 pt-16 sm:pt-20">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour au portfolio
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              <Badge>{project.sector}</Badge>
              <Badge>{project.year}</Badge>
              {relatedService && <Badge>{relatedService.name}</Badge>}
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{project.description}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <PlaceholderArt
              label={project.gallery[0]?.alt ?? project.name}
              from={project.gallery[0]?.from}
              to={project.gallery[0]?.to}
              className="aspect-[4/3] w-full shadow-lifted"
            />
          </Reveal>
        </div>
      </Section>

      {/* Objectifs & Technologies */}
      <Section className="bg-surface">
        <div className="grid gap-10 sm:grid-cols-2">
          <Reveal>
            <h2 className="text-xl font-semibold">Objectifs du projet</h2>
            <ul className="mt-5 space-y-3">
              {project.objectives.map((objective) => (
                <li key={objective} className="flex items-start gap-2 text-sm text-muted">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-electric" aria-hidden="true" />
                  {objective}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-xl font-semibold">Technologies utilisées</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge className="bg-background">{tech}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Résultats */}
      <Section ariaLabelledBy="results-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Résultats obtenus</Eyebrow>
          <h2 id="results-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Un impact mesurable dès les premiers mois.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {project.results.map((result, index) => (
            <Reveal
              key={result.label}
              delay={index * 0.1}
              className="rounded-2xl border border-border bg-surface p-8 text-center"
            >
              <p className="text-4xl font-semibold text-gradient">{result.value}</p>
              <p className="mt-2 text-sm text-muted">{result.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Galerie */}
      <Section className="bg-surface" ariaLabelledBy="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          Galerie du projet {project.name}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {project.gallery.map((image, index) => (
            <Reveal key={image.alt} delay={index * 0.08}>
              <PlaceholderArt label={image.alt} from={image.from} to={image.to} className="aspect-square w-full" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Témoignage */}
      {project.testimonial && (
        <Section>
          <Reveal className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-10 text-center">
            <Quote className="mx-auto size-8 text-electric/60" aria-hidden="true" />
            <p className="mt-5 text-xl leading-relaxed">&ldquo;{project.testimonial.quote}&rdquo;</p>
            <p className="mt-6 text-sm font-medium">{project.testimonial.author}</p>
            <p className="text-sm text-muted">{project.testimonial.role}</p>
          </Reveal>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-surface">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric to-violet px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Envie d&apos;un résultat similaire ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Discutons de votre projet et de la façon dont nous pouvons vous aider à obtenir des
            résultats mesurables.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="secondary" size="lg" className="border-white/40 bg-white text-electric hover:bg-white/90">
              Démarrer un projet
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Link
              href="/portfolio"
              className="inline-flex h-[3.25rem] items-center rounded-full border border-white/30 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Voir d&apos;autres projets
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
