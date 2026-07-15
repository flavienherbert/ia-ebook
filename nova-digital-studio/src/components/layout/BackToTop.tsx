"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut de la page"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-surface-2",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
