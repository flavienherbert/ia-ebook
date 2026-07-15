import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { siteConfig } from "@/data/nav";
import { generalFaq } from "@/data/faq";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contactez Nova Digital Studio pour discuter de votre projet digital : site web, branding, SEO, publicité, marketing digital ou intelligence artificielle.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section className="pb-16 pt-16 sm:pt-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Discutons de votre prochain projet.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Remplissez le formulaire ci-dessous ou contactez-nous directement. Nous vous répondons
            sous 48h ouvrées avec une proposition adaptée à votre besoin.
          </p>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-8">
              <h2 className="text-lg font-semibold">Nos coordonnées</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-electric" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="text-muted transition-colors hover:text-foreground">
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-electric" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-electric" aria-hidden="true" />
                  <span className="text-muted">{siteConfig.address}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="size-4 text-electric" aria-hidden="true" />
                Horaires d&apos;ouverture
              </h2>
              <ul className="mt-5 space-y-2 text-sm">
                {siteConfig.hours.map((slot) => (
                  <li key={slot.day} className="flex items-center justify-between text-muted">
                    <span>{slot.day}</span>
                    <span className="font-medium text-foreground">{slot.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Carte stylisée (illustration, adresse fictive) */}
            <div
              role="img"
              aria-label={`Localisation illustrative de nos bureaux : ${siteConfig.address}`}
              className="relative h-56 overflow-hidden rounded-2xl border border-border bg-surface bg-grid"
            >
              <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-radial)" }} />
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet text-white shadow-lifted">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <span className="mt-3 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted">
                  {siteConfig.address}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-surface" ariaLabelledBy="contact-faq-heading">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 id="contact-faq-heading" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Avant de nous écrire.
            </h2>
          </Reveal>
          <div className="mt-14">
            <FaqAccordion items={generalFaq} idPrefix="contact-faq" />
          </div>
        </div>
      </Section>
    </>
  );
}
