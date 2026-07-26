"use client";

import { useState } from "react";
import Container from "./Container";

const items = [
  {
    question: "C'est un PMS ?",
    answer:
      "Non. On ne touche ni à vos réservations, ni à vos prix, ni aux messages voyageurs. Une seule question : le logement est prêt ou non.",
  },
  {
    question: "Mes intervenants doivent installer une appli ?",
    answer:
      "Non. Un lien reçu par SMS ou email suffit, il s'ouvre directement dans le navigateur du téléphone.",
  },
  {
    question: "Comment ça se connecte à Airbnb ou Booking ?",
    answer:
      "Par le lien iCal que ces plateformes fournissent déjà pour chaque logement. Vous le collez une fois, la synchronisation est automatique.",
  },
  {
    question: "Et si je gère 80 logements ?",
    answer:
      "Le prix ne change pas : 79 €/mois, logements et intervenants illimités.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          FAQ
        </h2>

        <div className="mt-10 flex flex-col divide-y divide-line border-t border-line">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className="shrink-0 text-xl leading-none text-ink-soft"
                      aria-hidden="true"
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {isOpen && (
                  <p
                    id={`faq-panel-${index}`}
                    className="pb-5 text-sm leading-relaxed text-ink-soft sm:text-base"
                  >
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
