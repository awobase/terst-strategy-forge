import { useState } from "react";
import {
  formatTestimonialAuthor,
  formatTestimonialCaption,
  formatTestimonialText,
  TESTIMONIALS,
} from "@/config/testimonials";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const total = TESTIMONIALS.length;

  if (total === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  const t = TESTIMONIALS[current];

  return (
    <section
      id="temoignages"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow">Témoignages</p>
          <h2 className="section-title">La voix de nos clients</h2>
        </div>

        <div className="mx-auto flex max-w-4xl items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Témoignage précédent"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="relative rounded-2xl border border-border/50 bg-surface p-8 shadow-sm md:p-14">
              <Quote className="absolute left-6 top-6 h-14 w-14 text-primary/[0.08]" aria-hidden />

              <div className="relative z-10 text-center">
                <blockquote className="mb-8 text-lg font-medium leading-relaxed text-foreground md:text-xl">
                  <span className="text-primary/80">&ldquo;</span>
                  {formatTestimonialText(t.text)}
                  <span className="text-primary/80">&rdquo;</span>
                </blockquote>

                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 font-heading text-xl font-bold text-primary"
                  aria-hidden
                >
                  {t.firstName.charAt(0)}
                  {t.lastInitial}
                </div>
                <p className="font-heading font-semibold text-foreground">{formatTestimonialAuthor(t)}</p>
                <p className="text-sm text-muted-foreground">{formatTestimonialCaption(t)}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Témoignage suivant"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
