"use client";

import { site } from "@/config";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-white/10 px-6 py-10 text-center md:flex-row md:px-12 md:text-left">
      <p className="label">@nextech</p>
      <a href="#livres" className="label transition-colors hover:text-gold">
        Boutique
      </a>
      <p className="label">Mentions légales</p>
      <a
        href="#hero"
        className="label transition-colors hover:text-gold"
      >
        ↑ Haut de page
      </a>
    </footer>
  );
}
