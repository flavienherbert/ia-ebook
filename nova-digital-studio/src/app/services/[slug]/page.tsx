import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, Clock, PackageCheck, Plus } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, getServiceBySlug } from "@/data/services";
import { portfolioProjects } from "@/data/portfolio";
import { ServiceIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";
import { buildMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.name,
    description: service.heroDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = portfolioProjects.filter((project) =>
    service.relatedProjectSlugs.includes(project.slug)
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.heroDescription,
    provider: { "@type": "Organization", name: "Klarim" },
    areaServed: "FR",
    url: `${siteUrl}/services/${service.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${siteUrl}/services/${service.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Section className="pb-16 pt-16 sm:pt-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-violet text-white">
            <ServiceIcon name={service.icon} className="size-7" />
          </div>
          <Eyebrow>{service.category}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{service.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{service.heroDescription}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Button href="/contact" size="lg">
              Démarrer un projet
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Tous les services
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Avantages */}
      <Section className="bg-surface" ariaLabelledBy="benefits-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Avantages</Eyebrow>
          <h2 id="benefits-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Pourquoi ce service change la donne.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {service.benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.08} className="rounded-2xl border border-border bg-background p-6">
              <h3 className="text-base font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Méthodologie */}
      <Section ariaLabelledBy="methodology-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Notre méthodologie</Eyebrow>
          <h2 id="methodology-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Les principes qui guident notre travail.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {service.methodology.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.08}
              className="flex gap-4 rounded-2xl border border-border bg-surface p-6"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric/15 to-violet/15 text-sm font-semibold text-electric">
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Processus */}
      <Section className="bg-surface" ariaLabelledBy="process-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Notre processus</Eyebrow>
          <h2 id="process-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Étape par étape, jusqu&apos;au résultat.
          </h2>
        </Reveal>
        <div className="mt-14">
          <ProcessSteps steps={service.process} />
        </div>
      </Section>

      {/* Livrables & délais */}
      <Section ariaLabelledBy="deliverables-heading">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-center gap-2">
              <PackageCheck className="size-5 text-electric" aria-hidden="true" />
              <Eyebrow>Livrables</Eyebrow>
            </div>
            <h2 id="deliverables-heading" className="mt-4 text-2xl font-semibold tracking-tight">
              Ce que vous recevez concrètement.
            </h2>
            <ul className="mt-6 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-electric" aria-hidden="true" />
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-border bg-surface p-8">
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-electric" aria-hidden="true" />
              <Eyebrow>Délai indicatif</Eyebrow>
            </div>
            <p className="mt-4 text-lg font-medium text-foreground">{service.timeline}</p>
            <p className="mt-3 text-sm text-muted">
              Le délai final dépend du périmètre exact de votre projet et de la réactivité des
              validations à chaque étape.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Tarifs indicatifs */}
      <Section className="bg-surface" ariaLabelledBy="pricing-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Tarifs indicatifs</Eyebrow>
          <h2 id="pricing-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Des formules claires, adaptées à votre besoin.
          </h2>
          <p className="mt-4 text-sm text-muted">
            Tarifs indicatifs hors taxes, ajustés selon le périmètre exact de votre projet.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {service.pricing.map((tier, index) => (
            <Reveal
              key={tier.name}
              delay={index * 0.08}
              className={cn(
                "flex flex-col rounded-2xl border p-7",
                tier.highlighted
                  ? "border-electric bg-surface shadow-lifted lg:-translate-y-3"
                  : "border-border bg-surface"
              )}
            >
              {tier.highlighted && <Badge className="mb-4 w-fit border-electric/40 text-electric">Le plus populaire</Badge>}
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{tier.price}</p>
              <p className="mt-2 text-sm text-muted">{tier.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-electric" aria-hidden="true" />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="/contact"
                variant={tier.highlighted ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Demander un devis
              </Button>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Options complémentaires */}
      <Section ariaLabelledBy="addons-heading">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2">
            <Plus className="size-5 text-electric" aria-hidden="true" />
            <Eyebrow>Options complémentaires</Eyebrow>
          </div>
          <h2 id="addons-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Complétez votre offre selon vos besoins.
          </h2>
        </Reveal>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {service.addOns.map((addOn) => (
            <li
              key={addOn}
              className="flex items-start gap-2 rounded-xl border border-border bg-surface p-4 text-sm"
            >
              <Plus className="mt-0.5 size-4 shrink-0 text-electric" aria-hidden="true" />
              <span className="text-muted">{addOn}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Réalisations liées */}
      {relatedProjects.length > 0 && (
        <Section className="bg-surface" ariaLabelledBy="related-heading">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Ils l&apos;ont fait</Eyebrow>
            <h2 id="related-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Des résultats concrets sur ce service.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section ariaLabelledBy="service-faq-heading">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 id="service-faq-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Vos questions sur ce service.
            </h2>
          </Reveal>
          <div className="mt-14">
            <FaqAccordion items={service.faq} idPrefix={`service-${service.slug}-faq`} />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-surface">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric to-violet px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Parlons de votre projet {service.name.toLowerCase()}.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Un premier échange gratuit pour comprendre vos objectifs et vous proposer la meilleure
            approche.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="secondary" size="lg" className="border-white/40 bg-white text-electric hover:bg-white/90">
              Démarrer un projet
            </Button>
            <Link
              href="/services"
              className="inline-flex h-[3.25rem] items-center rounded-full border border-white/30 px-8 text-base font-medium text-white transition-colors hover:bg-white/10"
            >
              Explorer les autres services
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
