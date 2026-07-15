"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNav, siteConfig } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on navigation. Derived during render (rather than in an
  // effect) so the panel never flashes open on the destination page first.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glass border-b border-border" : "border-b border-transparent"
      )}
    >
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight"
          aria-label={`${siteConfig.name} — retour à l'accueil`}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-violet text-sm font-bold text-white">
            N
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden md:block">
            <Button href="/contact">Démarrer un projet</Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface text-foreground lg:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-[4.5rem] z-40 origin-top border-b border-border bg-background/98 backdrop-blur-md transition-all duration-300 lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"
        )}
      >
        <nav aria-label="Navigation mobile" className="flex flex-col gap-1 px-5 py-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                isActive(item.href) ? "bg-surface text-foreground" : "text-muted hover:bg-surface hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex items-center gap-3 px-4">
            <ThemeToggle />
            <Button href="/contact" className="flex-1">
              Démarrer un projet
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
