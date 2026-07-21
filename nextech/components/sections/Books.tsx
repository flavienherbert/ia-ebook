"use client";

import { motion } from "framer-motion";
import { livres } from "@/config";

const EASE = [0.16, 1, 0.3, 1] as const;

// Décalage éditorial en desktop : les cartes alternent gauche/droite sur
// une grille 12 colonnes. En mobile, tout repasse en pile pleine largeur.
const OFFSET = [
  "md:col-start-1 md:col-span-9 lg:col-span-8",
  "md:col-start-4 md:col-span-9 lg:col-start-5 lg:col-span-8",
  "md:col-start-1 md:col-span-9 lg:col-span-8",
];

function BookCard({
  livre,
  index,
}: {
  livre: (typeof livres)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
      className={`group relative overflow-hidden rounded-2xl border border-hairline bg-white/[0.03] p-6 transition-transform duration-300 hover:-translate-y-1 md:p-10 ${OFFSET[index % OFFSET.length]}`}
    >
      {/* Numéro fantôme */}
      <span className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-[6rem] font-black leading-none text-foreground/[0.04] md:text-[8rem]">
        {livre.num}
      </span>

      {/* Filet gauche : s'anime en or au hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] bg-hairline transition-colors duration-300 group-hover:bg-gold"
      />

      <div className="relative flex flex-col gap-6">
        <p className="label text-gold">
          {livre.num} · {livre.cat}
        </p>

        <div className="max-w-2xl">
          <h3 className="font-display text-book-h3 font-semibold">
            {livre.title}
          </h3>
          <p className="mt-3 text-base leading-[1.65] text-muted">
            {livre.desc}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {livre.tags.map((tag) => (
              <span
                key={tag}
                className="label rounded-full border border-hairline px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-6 pt-2 md:flex-col md:items-end">
          <span className="font-display text-lg text-foreground">
            {livre.price}
          </span>
          <a
            href={livre.link}
            target="_blank"
            rel="noopener noreferrer"
            className="label flex min-h-[44px] items-center gap-2 rounded-full border border-gold/50 px-5 text-gold transition-colors duration-300 hover:bg-gold hover:text-background"
          >
            Obtenir <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Books() {
  return (
    <section
      id="livres"
      className="px-6 py-[clamp(5rem,12vh,9rem)] md:px-12"
    >
      <motion.p
        className="label mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Les guides — 03
      </motion.p>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-12">
        {livres.map((livre, i) => (
          <BookCard key={livre.num} livre={livre} index={i} />
        ))}
      </div>
    </section>
  );
}
