"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Bande de texte défilante en boucle, légèrement liée à la vitesse de scroll.
export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const content = items.join(" • ") + " • ";

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        style={{ x }}
        className="flex w-max animate-marquee motion-reduce:animate-none"
      >
        <span className="cine-shadow pr-8 font-display text-[clamp(1.75rem,5vw,3.25rem)] font-medium leading-none text-foreground">
          {content}
        </span>
        <span
          className="cine-shadow pr-8 font-display text-[clamp(1.75rem,5vw,3.25rem)] font-medium leading-none text-foreground"
          aria-hidden
        >
          {content}
        </span>
      </motion.div>
    </div>
  );
}
