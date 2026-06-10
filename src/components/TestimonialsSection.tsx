import { useEffect, useState } from "react";
import {
  formatTestimonialAuthor,
  formatTestimonialCaption,
  formatTestimonialText,
  TESTIMONIALS,
} from "@/config/testimonials";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const AUTOPLAY_MS = 3500;
const AUTOPLAY_MS_REDUCED = 5500;

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressEpoch, setProgressEpoch] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = TESTIMONIALS.length;

  const next = () => setCurrent((c) => (c + 1) % total);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  const autoplayMs = prefersReducedMotion ? AUTOPLAY_MS_REDUCED : AUTOPLAY_MS;

  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [autoplayMs, paused, total, current, progressEpoch]);

  const resumeAutoplay = () => {
    setPaused(false);
    setProgressEpoch((epoch) => epoch + 1);
  };

  if (total === 0) return null;

  const t = TESTIMONIALS[current];

  return (
    <section
      id="temoignages"
      className="scroll-mt-28 border-t border-border/40 bg-background py-24 md:py-32 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="eyebrow">Témoignages</p>
          <h2 className="section-title">La voix de nos clients</h2>
        </div>

        <div
          className="mx-auto max-w-4xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={resumeAutoplay}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <button
            type="button"
              onClick={prev}
              aria-label="Témoignage précédent"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <div
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-sm md:p-12 md:px-14"
                aria-live="polite"
              >
                <Quote
                  className="pointer-events-none absolute left-5 top-5 h-9 w-9 text-secondary/25 sm:left-6 sm:top-6 sm:h-10 sm:w-10 md:left-10 md:top-10 md:h-[3.75rem] md:w-[3.75rem]"
                  fill="currentColor"
                  stroke="none"
                  aria-hidden
                />

                <div key={current} className="relative z-10 animate-fade-in text-center">
                  <blockquote className="mb-6 mt-0 px-2 pt-11 sm:px-4 sm:pt-12 md:mb-8 md:mt-4 md:px-8 md:pt-6">
                    <p className="text-base font-medium leading-relaxed text-foreground md:text-lg md:leading-relaxed">
                      {formatTestimonialText(t.text)}
                    </p>
                  </blockquote>

                  <p className="font-heading text-lg font-semibold text-foreground md:text-xl">
                    {formatTestimonialAuthor(t)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground md:mt-1.5 md:text-base">
                    {formatTestimonialCaption(t)}
                  </p>
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

          {total > 1 && (
            <div
              className="relative mt-8 h-1 overflow-hidden rounded-full bg-secondary/10"
              aria-hidden
            >
              <div
                key={`${current}-${progressEpoch}`}
                className="testimonial-progress h-full rounded-full bg-secondary/25"
                style={{
                  animationDuration: `${autoplayMs}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
