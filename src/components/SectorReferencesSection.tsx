import { useEffect, useState } from "react";
import {
  getReferencesForSector,
  SECTOR_CAROUSEL_STYLES,
  SECTOR_CATEGORIES_WITH_REFERENCES,
  type SectorCategory,
} from "@/config/sectorReferences";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 4500;
const AUTOPLAY_MS_REDUCED = 6500;

function wrapIndex(index: number, total: number) {
  return ((index % total) + total) % total;
}

function SectorPreviewCard({
  sector,
  onSelect,
  side,
}: {
  sector: SectorCategory;
  onSelect: () => void;
  side: "left" | "right";
}) {
  const style = SECTOR_CAROUSEL_STYLES[sector.color];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Afficher le secteur ${sector.label}`}
      className={cn(
        "group relative hidden h-56 w-[7.75rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 px-3 transition-all duration-500 sm:flex md:h-64 md:w-[8.75rem]",
        "scale-[0.88] opacity-60 hover:scale-[0.92] hover:opacity-100",
        side === "left" ? "-rotate-2 hover:rotate-0" : "rotate-2 hover:rotate-0",
        style.border,
        style.header,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10"
        aria-hidden
      />
      <span
        className={cn(
          "relative z-10 text-center text-sm font-semibold leading-snug transition-colors md:text-[0.95rem]",
          style.title,
          "group-hover:text-white",
        )}
      >
        {sector.label}
      </span>
      <span className="relative z-10 mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
        Voir
      </span>
    </button>
  );
}

function SectorActiveCard({
  sector,
  onMouseEnter,
  onMouseLeave,
}: {
  sector: SectorCategory;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const style = SECTOR_CAROUSEL_STYLES[sector.color];
  const references = getReferencesForSector(sector.id);

  return (
    <div
      key={sector.id}
      className={cn(
        "relative z-10 flex min-h-[22rem] w-full max-w-xl flex-col overflow-hidden rounded-3xl border-2 bg-card md:min-h-[26rem]",
        style.border,
        style.shadow,
      )}
      aria-live="polite"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={cn("relative overflow-hidden px-6 py-6 text-center md:px-8 md:py-7", style.header)}>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-md"
          aria-hidden
        />
        <p className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Secteur</p>
        <h3 className={cn("relative mt-2 font-heading text-xl font-bold leading-snug md:text-2xl", style.title)}>
          {sector.label}
        </h3>
      </div>

      <div className="relative flex-1 bg-muted/15 px-5 py-5 md:px-7 md:py-6">
        <div className="sector-refs-scroll max-h-[17rem] space-y-4 overflow-y-auto pr-1 md:max-h-[19rem] md:space-y-4">
          {references.length > 0 ? (
            references.map((ref, index) => (
              <article
                key={`${sector.id}-${index}-${ref.text.slice(0, 32)}`}
                className="animate-fade-in rounded-xl border border-border/60 bg-card px-4 py-3.5 shadow-sm transition-shadow hover:shadow-md md:px-5 md:py-4"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <p className="text-sm leading-relaxed text-foreground/90 md:text-[0.95rem]">{ref.text}</p>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 px-5 py-12 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Références sectorielles en cours de publication pour ce secteur.
              </p>
            </div>
          )}
        </div>
        {references.length > 3 ? (
          <div
            className="pointer-events-none absolute inset-x-5 bottom-5 h-10 bg-gradient-to-t from-card to-transparent md:inset-x-7 md:bottom-6"
            aria-hidden
          />
        ) : null}
      </div>
    </div>
  );
}

const SectorReferencesSection = () => {
  const block = useInView();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressEpoch, setProgressEpoch] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = SECTOR_CATEGORIES_WITH_REFERENCES.length;

  const autoplayMs = prefersReducedMotion ? AUTOPLAY_MS_REDUCED : AUTOPLAY_MS;

  const prevSector = SECTOR_CATEGORIES_WITH_REFERENCES[wrapIndex(current - 1, total)];
  const activeSector = SECTOR_CATEGORIES_WITH_REFERENCES[current];
  const nextSector = SECTOR_CATEGORIES_WITH_REFERENCES[wrapIndex(current + 1, total)];
  const activeStyle = SECTOR_CAROUSEL_STYLES[activeSector.color];

  const bumpProgress = () => setProgressEpoch((epoch) => epoch + 1);

  const goPrev = () => {
    bumpProgress();
    setCurrent((index) => wrapIndex(index - 1, total));
  };

  const goNext = () => {
    bumpProgress();
    setCurrent((index) => wrapIndex(index + 1, total));
  };

  const resumeAutoplay = () => {
    setPaused(false);
    bumpProgress();
  };

  useEffect(() => {
    if (paused || total <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((index) => wrapIndex(index + 1, total));
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [autoplayMs, paused, total, current, progressEpoch]);

  return (
    <section
      id="references-sectorielles"
      className="relative scroll-mt-28 overflow-hidden border-b border-border/40 bg-gradient-to-b from-background via-[hsl(220,22%,97%)] to-background py-16 md:py-24"
    >
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/[0.04] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-secondary/[0.06] blur-3xl"
        aria-hidden
      />

      <div
        ref={block.ref}
        className={cn(
          "container relative z-10 mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 lg:px-8",
          block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-primary">Références</p>
          <h2 className="section-title mt-2">Nos références sectorielles</h2>
        </div>

        <div className="mx-auto mt-12 max-w-5xl md:mt-14">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Secteur précédent"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex min-w-0 flex-1 items-center justify-center gap-2 md:gap-5">
              <SectorPreviewCard sector={prevSector} onSelect={goPrev} side="left" />
              <SectorActiveCard
                sector={activeSector}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={resumeAutoplay}
              />
              <SectorPreviewCard sector={nextSector} onSelect={goNext} side="right" />
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Secteur suivant"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            {total > 1 && (
              <div className="h-1 w-full max-w-md overflow-hidden rounded-full bg-border/50" aria-hidden>
                <div
                  key={`${current}-${progressEpoch}`}
                  className={cn("testimonial-progress h-full rounded-full", activeStyle.dot)}
                  style={{
                    animationDuration: `${autoplayMs}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{activeSector.label}</span>
              <span className="mx-2 text-border">·</span>
              {current + 1} sur {total}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorReferencesSection;
