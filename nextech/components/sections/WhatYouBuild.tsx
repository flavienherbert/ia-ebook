"use client";

import { motion } from "framer-motion";
import { construction } from "@/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhatYouBuild() {
  return (
    <section className="px-6 py-[clamp(5rem,12vh,9rem)] md:px-12">
      <p className="label mb-14">Ce que tu construis</p>
      <div className="divide-y divide-hairline border-y border-hairline">
        {construction.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0.25, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            className="flex items-baseline gap-6 py-8 md:gap-10 md:py-12"
          >
            <span className="font-display text-book-h3 text-gold">
              {item.num}
            </span>
            <span className="cine-shadow font-display text-section-h2 font-semibold leading-tight">
              {item.title}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
