"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/config";

// Fond fixe plein écran, sous tout le contenu. Soit une image 4K (si
// `site.backgroundImage` est renseignée), soit un dégradé façon aurore
// avec des halos qui dérivent lentement. Un voile sombre + le grain
// (ajouté séparément dans le layout) garantissent la lisibilité du texte.
export default function CinematicBackground() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const hasImage = Boolean(site.backgroundImage);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background" aria-hidden>
      {hasImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${site.backgroundImage})` }}
        />
      ) : (
        <>
          <motion.div
            className="absolute -left-1/4 -top-1/3 h-[70vw] w-[70vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(30,41,59,0.55) 0%, rgba(10,10,10,0) 70%)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    x: ["0%", "18%", "-8%", "0%"],
                    y: ["0%", "12%", "18%", "0%"],
                    opacity: [0.6, 0.85, 0.6, 0.6],
                  }
            }
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-1/4 top-1/4 h-[60vw] w-[60vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(200,161,90,0.12) 0%, rgba(10,10,10,0) 70%)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    x: ["0%", "-14%", "10%", "0%"],
                    y: ["0%", "14%", "-8%", "0%"],
                    opacity: [0.5, 0.7, 0.5, 0.5],
                  }
            }
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-1/4 left-1/4 h-[55vw] w-[55vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(23,37,64,0.5) 0%, rgba(10,10,10,0) 70%)",
            }}
            animate={
              reduced
                ? undefined
                : {
                    x: ["0%", "12%", "-16%", "0%"],
                    y: ["0%", "-10%", "6%", "0%"],
                    opacity: [0.55, 0.8, 0.55, 0.55],
                  }
            }
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Voile sombre pour préserver la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/65" />
    </div>
  );
}
