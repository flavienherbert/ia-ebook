import Link from "next/link";
import { Mail, Phone, MapPin, Link2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { mainNav, footerServiceLinks, footerLegalLinks, siteConfig } from "@/data/nav";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-violet text-sm font-bold text-white">
              N
            </span>
            {siteConfig.name}
          </Link>
          <p className="max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          <ul className="flex gap-3 pt-2">
            {siteConfig.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-electric/60 hover:text-foreground"
                >
                  <Link2 className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Plan du site">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Navigation</h2>
          <ul className="space-y-3 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Nos services">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Services</h2>
          <ul className="space-y-3 text-sm">
            {footerServiceLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-foreground">Restons en contact</h2>
          <ul className="mb-6 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-foreground">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
          <NewsletterForm compact />
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted sm:flex-row">
          <p>© {year} {siteConfig.name}. Tous droits réservés.</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLegalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
