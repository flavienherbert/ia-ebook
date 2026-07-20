"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingSeal from "@/components/RotatingSeal";

const EASE = [0.16, 1, 0.3, 1] as const;

const lines: { words: string[]; gold?: boolean }[] = [
  { words: ["Construis"] },
  { words: ["avec", "l'IA."] },
  { words: ["Ce", "soir."], gold: true },
];

function AnimatedLine({
  words,
  gold,
  lineIndex,
}: {
  words: string[];
  gold?: boolean;
  lineIndex: number;
}) {
  return (
    <div className="flex flex-wrap gap-x-[0.25em] overflow-hidden">
      {words.map((word, i) => (
        <motion.span
          key={word}
          className={gold ? "text-gold" : "text-foreground"}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.3 + lineIndex * 0.15 + i * 0.1,
            duration: 1,
            ease: EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-8 pt-8 md:px-12"
    >
      {/* En-tête : label + menu minimal */}
      <div className="flex items-start justify-between">
        <motion.p
          className="label"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
        >
          NEXTECH
          <br className="hidden md:block" /> — GUIDES CLAUDE
        </motion.p>
        <motion.nav
          className="label flex gap-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: EASE }}
        >
          <a href="#livres" className="transition-colors hover:text-foreground">
            Livres
          </a>
          <a
            href="#manifeste"
            className="transition-colors hover:text-foreground"
          >
            Manifeste
          </a>
        </motion.nav>
      </div>

      {/* Titre géant */}
      <motion.h1
        style={{ y: titleY, opacity }}
        className="font-display text-hero font-black leading-[0.95] tracking-tight"
      >
        {lines.map((line, i) => (
          <AnimatedLine
            key={i}
            words={line.words}
            gold={line.gold}
            lineIndex={i}
          />
        ))}
      </motion.h1>

      {/* Sceau + indicateur de scroll */}
      <div className="flex items-end justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <RotatingSeal size={110} />
        </motion.div>

        <motion.div
          className="label flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <span>Scroll</span>
          <motion.span
            className="h-10 w-px bg-muted"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
