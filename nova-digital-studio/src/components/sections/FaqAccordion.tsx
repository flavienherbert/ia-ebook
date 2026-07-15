"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${idPrefix}-button-${index}`;
        const panelId = `${idPrefix}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-sm font-medium text-foreground sm:text-base"
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-electric"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0">
                <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
