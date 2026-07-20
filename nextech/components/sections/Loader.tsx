"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Écran d'intro : "nextech" apparaît lettre par lettre, puis un rideau
// se lève pour révéler le hero. Durée totale ≤ 2s (moins si mouvement réduit).
export default function Loader() {
  const [phase, setPhase] = useState<"letters" | "rise" | "done">("letters");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);

    const riseDelay = mql.matches ? 150 : 900;
    const riseDuration = mql.matches ? 200 : 800;
    const t1 = setTimeout(() => setPhase("rise"), riseDelay);
    const t2 = setTimeout(() => setPhase("done"), riseDelay + riseDuration);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  const letters = "nextech".split("");

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background"
      initial={{ y: 0 }}
      animate={{ y: phase === "rise" ? "-100%" : 0 }}
      transition={{ duration: reduced ? 0.2 : 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex overflow-hidden font-display text-4xl text-foreground md:text-6xl">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: reduced ? 0 : i * 0.07,
              duration: reduced ? 0.2 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
