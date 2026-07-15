"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { PlaceholderArt } from "@/components/ui/PlaceholderArt";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-grid">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "var(--gradient-radial)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 pb-20 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-2 lg:items-center lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>Agence digitale nouvelle génération</Eyebrow>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Votre croissance digitale,{" "}
            <span className="text-gradient">pilotée par la donnée.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Nova Digital Studio conçoit des sites web, des identités de marque et des stratégies
            marketing qui transforment vos visiteurs en clients. Design premium, exécution rapide,
            résultats mesurables.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              Démarrer un projet
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg">
              <Play className="size-4" aria-hidden="true" />
              Voir nos réalisations
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="flex -space-x-2">
                {["AM", "CR", "LF", "HS"].map((initials) => (
                  <span
                    key={initials}
                    className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-electric to-violet text-[10px] font-semibold text-white"
                  >
                    {initials}
                  </span>
                ))}
              </span>
              120+ projets livrés
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <PlaceholderArt
            label="Aperçu d'une interface web moderne conçue par Nova Digital Studio"
            className="aspect-[4/3] w-full shadow-lifted"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-surface/95 p-4 shadow-soft backdrop-blur sm:block">
            <p className="text-2xl font-semibold text-gradient">+180%</p>
            <p className="text-xs text-muted">de trafic organique en moyenne</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
