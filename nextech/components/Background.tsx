"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/config";

// Fond fixe, monté une seule fois tout en haut du layout, sous tout le
// contenu (z-index 0). Quatre couches : base, halos qui dérivent (ou image
// 4K si `site.backgroundImage` est renseignée), vignette + voile sombre
// pour la lisibilité, grain pellicule en overlay.
export default function Background() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const hasImage = Boolean(site.backgroundImage);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
      aria-hidden
    >
      {/* Couche 2 : halos / image */}
      {hasImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${site.backgroundImage})` }}
        />
      ) : (
        <>
          <motion.div
            className="absolute left-[-10%] top-[-15%] h-[65vw] w-[65vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(14,26,43,0.40) 0%, rgba(10,10,10,0) 70%)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    x: ["0%", "16%", "-8%", "0%"],
                    y: ["0%", "10%", "16%", "0%"],
                    scale: [1, 1.08, 0.96, 1],
                  }
            }
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-15%] top-[20%] h-[55vw] w-[55vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(200,161,90,0.10) 0%, rgba(10,10,10,0) 70%)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    x: ["0%", "-12%", "9%", "0%"],
                    y: ["0%", "12%", "-8%", "0%"],
                    scale: [1, 0.94, 1.06, 1],
                  }
            }
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] left-[20%] h-[55vw] w-[55vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(16,21,31,0.30) 0%, rgba(10,10,10,0) 70%)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    x: ["0%", "10%", "-14%", "0%"],
                    y: ["0%", "-8%", "6%", "0%"],
                    scale: [1, 1.05, 0.97, 1],
                  }
            }
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Couche 3 : vignette + voile sombre (lisibilité) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/55" />

      {/* Couche 4 : grain pellicule */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.06] mix-blend-overlay">
        <filter id="bg-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-grain)" />
      </svg>
    </div>
  );
}
