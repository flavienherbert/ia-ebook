"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const lines: React.ReactNode[] = [
  "Pas de formation interminable.",
  "Pas d'abonnement.",
  <>
    Un livre, tu le lis <span className="text-gold">ce soir</span>, tu
    construis demain.
  </>,
];

export default function Manifesto() {
  return (
    <section
      id="manifeste"
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center md:px-12"
    >
      <p className="label mb-10">Le manifeste</p>
      <div className="max-w-4xl space-y-3 font-display text-3xl leading-tight md:text-6xl">
        {lines.map((line, i) => (
          <div key={i} className="reveal-mask">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
            >
              {line}
            </motion.p>
          </div>
        ))}
      </div>
    </section>
  );
}
