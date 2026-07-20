"use client";

import { motion } from "framer-motion";
import { livres } from "@/config";

const EASE = [0.16, 1, 0.3, 1] as const;

function BookCard({
  livre,
  index,
}: {
  livre: (typeof livres)[number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1, delay: index * 0.1, ease: EASE }}
      className="group relative overflow-hidden border-b border-white/10 py-14 md:py-20"
    >
      {/* Numéro fantôme */}
      <span className="pointer-events-none absolute -right-4 top-0 select-none font-display text-[9rem] font-black leading-none text-white/[0.03] md:text-[14rem]">
        {livre.num}
      </span>

      {/* Filet or animé */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-gold/40"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.1 + 0.2, ease: EASE }}
        style={{ transformOrigin: "top" }}
      />

      <div className="relative grid gap-6 pl-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12">
        <p className="label text-gold">
          {livre.num} · {livre.cat}
        </p>

        <div className="max-w-2xl transition-transform duration-500 ease-out group-hover:translate-x-2">
          <h3 className="font-display text-2xl leading-snug md:text-4xl">
            {livre.title}
          </h3>
          <p className="mt-4 text-muted">{livre.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {livre.tags.map((tag) => (
              <span
                key={tag}
                className="label rounded-full border border-white/10 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-6 md:flex-col md:items-end">
          <span className="font-display text-2xl text-foreground">
            {livre.price}
          </span>
          <a
            href={livre.link}
            target="_blank"
            rel="noopener noreferrer"
            className="label flex items-center gap-2 border border-gold/50 px-5 py-3 text-gold transition-colors hover:bg-gold hover:text-background"
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
    <section id="livres" className="px-6 py-24 md:px-12">
      <motion.p
        className="label mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Les guides — 03
      </motion.p>
      <div>
        {livres.map((livre, i) => (
          <BookCard key={livre.num} livre={livre} index={i} />
        ))}
      </div>
    </section>
  );
}
