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
      className="flex min-h-screen flex-col items-center justify-center px-6 py-[clamp(5rem,12vh,9rem)] text-center md:px-12"
    >
      <p className="label mb-10">Le manifeste</p>
      <div className="cine-shadow max-w-3xl space-y-3 font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight">
        {lines.map((line, i) => (
          <div key={i} className="reveal-mask">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            >
              {line}
            </motion.p>
          </div>
        ))}
      </div>
    </section>
  );
}
