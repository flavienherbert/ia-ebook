"use client";

import { motion } from "framer-motion";
import RotatingSeal from "@/components/RotatingSeal";
import { site } from "@/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FinalCTA() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-24 text-center md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, ease: EASE }}
        className="font-display text-hero font-black leading-[0.95]"
      >
        Commence <span className="text-gold">ce soir</span>
      </motion.h2>

      <motion.a
        href={site.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className="label rounded-full border border-gold px-10 py-5 text-gold transition-colors hover:bg-gold hover:text-background"
      >
        Voir les guides →
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <RotatingSeal size={120} />
      </motion.div>
    </section>
  );
}
