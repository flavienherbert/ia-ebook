"use client";

import { motion } from "framer-motion";
import { construction } from "@/config";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhatYouBuild() {
  return (
    <section className="px-6 py-24 md:px-12">
      <p className="label mb-14">Ce que tu construis</p>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {construction.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0.25 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            className="flex items-baseline gap-6 py-8 md:gap-10 md:py-12"
          >
            <span className="font-display text-2xl text-gold md:text-4xl">
              {item.num}
            </span>
            <span className="font-display text-2xl leading-tight md:text-5xl">
              {item.title}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
