import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <Reveal
          key={testimonial.author}
          delay={index * 0.08}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-7"
        >
          <Quote className="size-6 text-electric/60" aria-hidden="true" />
          <div className="flex gap-0.5" aria-label={`Note de ${testimonial.rating} sur 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${i < testimonial.rating ? "fill-electric text-electric" : "text-border"}`}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="flex-1 text-sm leading-relaxed text-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
          <div className="flex items-center gap-3 pt-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-electric to-violet text-xs font-semibold text-white">
              {testimonial.initials}
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
              <p className="text-xs text-muted">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
