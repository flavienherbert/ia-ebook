"use client";

import { motion } from "framer-motion";
import RotatingSeal from "@/components/RotatingSeal";
import { site } from "@/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FinalCTA() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-[clamp(5rem,12vh,9rem)] text-center md:px-12">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="cine-shadow font-display text-hero font-semibold"
      >
        Commence <span className="text-gold">ce soir</span>
      </motion.h2>

      <motion.a
        href={site.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
        className="label flex min-h-[44px] items-center rounded-full bg-gold px-10 py-5 text-background transition-transform duration-300 hover:scale-[1.03]"
      >
        Voir les guides →
      </motion.a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.9, delay: 0.16 }}
      >
        <RotatingSeal size={120} />
      </motion.div>
    </section>
  );
}
