"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/config";

// Fond fixe, monté une seule fois tout en haut du layout, sous tout le
// contenu (z-index 0). Couches : image (ou halos si `backgroundImage` est
// vide) avec zoom lent + parallaxe au scroll, vignette + voile sombre
// pour la lisibilité, grain pellicule en overlay.
export default function Background() {
  const [reduced, setReduced] = useState(false);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, (v) => v * -0.08);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const hasImage = Boolean(site.backgroundImage);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
      aria-hidden
    >
      {/* Couche image / halos, avec zoom lent + parallaxe de scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ y: reduced ? 0 : parallaxY }}
        animate={
          reduced
            ? undefined
            : { scale: [1, 1.06, 1] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      >
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
                    }
              }
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </motion.div>

      {/* Vignette sur les bords */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Voile sombre, plus dense en bas pour ancrer le texte */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* Grain pellicule */}
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
