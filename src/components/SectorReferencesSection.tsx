import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import {
  getReferencesForSector,
  SECTOR_CAROUSEL_STYLES,
  SECTOR_CATEGORIES_WITH_REFERENCES,
  type SectorCategory,
} from "@/config/sectorReferences";
import type { SectorReference } from "@/config/sectorReferencesData";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 4000;
const AUTOPLAY_MS_REDUCED = 6000;

function SectorGalleryCard({
  sector,
  referenceCount,
  isSelected,
  onSelect,
}: {
  sector: SectorCategory;
  referenceCount: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const style = SECTOR_CAROUSEL_STYLES[sector.color];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-label={`Secteur ${sector.label} — ${referenceCount} référence${referenceCount > 1 ? "s" : ""}`}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 px-4 text-center shadow-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        isSelected ? cn(style.border, style.header, "shadow-md ring-2 ring-primary/30 ring-offset-2") : "border-border/60 bg-card",
      )}
    >
      {!isSelected ? (
        <>
          <div className={cn("mb-3 h-1.5 w-10 rounded-full", style.dot)} aria-hidden />
          <p className="font-heading text-sm font-bold leading-snug text-foreground md:text-base">{sector.label}</p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {referenceCount} référence{referenceCount > 1 ? "s" : ""}
          </p>
        </>
      ) : (
        <>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75">Secteur</p>
          <p className={cn("mt-1 font-heading text-sm font-bold leading-snug md:text-base", style.title)}>
            {sector.label}
          </p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70">
            {referenceCount} référence{referenceCount > 1 ? "s" : ""}
          </p>
        </>
      )}
    </button>
  );
}

function SectorReferenceText({ reference }: { reference: SectorReference }) {
  if (!reference.highlight) {
    return (
      <p className="text-sm leading-relaxed text-foreground/90 md:text-[0.95rem]">{reference.text}</p>
    );
  }

  return (
    <p className="text-sm leading-relaxed text-foreground/90 md:text-[0.95rem]">
      <span className="font-semibold text-foreground">{reference.highlight}</span>
      {reference.text ? <> : {reference.text}</> : null}
    </p>
  );
}

function SectorReferencesPanel({ sector }: { sector: SectorCategory }) {
  const style = SECTOR_CAROUSEL_STYLES[sector.color];
  const references = getReferencesForSector(sector.id);

  return (
    <article
      key={sector.id}
      className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md"
      aria-live="polite"
    >
      <div className={cn("px-5 py-4 text-center md:px-6 md:py-5", style.header)}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">Secteur</p>
        <h3 className={cn("mt-1 font-heading text-lg font-bold md:text-xl", style.title)}>{sector.label}</h3>
      </div>

      <div className="space-y-3 border-t border-border/40 bg-muted/10 p-5 md:space-y-4 md:p-6">
        {references.map((ref, index) => (
          <div
            key={`${sector.id}-${index}`}
            className="rounded-xl border border-border/60 bg-card px-4 py-3.5 shadow-sm md:px-5 md:py-4"
          >
            <SectorReferenceText reference={ref} />
          </div>
        ))}
      </div>
    </article>
  );
}

const SectorReferencesSection = () => {
  const block = useInView();
  const sectors = SECTOR_CATEGORIES_WITH_REFERENCES;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = sectors.length;

  const autoplayMs = prefersReducedMotion ? AUTOPLAY_MS_REDUCED : AUTOPLAY_MS;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: total > 1,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
    duration: prefersReducedMotion ? 0 : 26,
  });

  const activeSector = activeIndex !== null ? sectors[activeIndex] ?? null : null;

  const scrollPrev = useCallback(() => {
    setActiveIndex(null);
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    setActiveIndex(null);
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const selectSector = useCallback(
    (index: number) => {
      setActiveIndex(index);
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (paused || activeIndex !== null || total <= 1 || !emblaApi) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), autoplayMs);
    return () => window.clearInterval(timer);
  }, [activeIndex, autoplayMs, emblaApi, paused, total]);

  if (total === 0) return null;

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
          "container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
          "transition-all duration-700",
          block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-primary">Références</p>
          <h2 className="section-title mt-2">Nos références sectorielles</h2>
        </div>

        <div
          className="mx-auto mt-12 max-w-5xl md:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Secteur précédent"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/80 shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
              <div className="-ml-3 flex touch-pan-y sm:-ml-4 md:-ml-5">
                {sectors.map((sector, index) => {
                  const referenceCount = getReferencesForSector(sector.id).length;

                  return (
                    <div
                      key={sector.id}
                      className="min-w-0 shrink-0 grow-0 basis-[58%] pl-3 sm:basis-[38%] sm:pl-4 md:basis-[26%] md:pl-5 lg:basis-[22%]"
                    >
                      <div className="h-[7.5rem] md:h-[8.5rem]">
                        <SectorGalleryCard
                          sector={sector}
                          referenceCount={referenceCount}
                          isSelected={activeIndex === index}
                          onSelect={() => selectSector(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Secteur suivant"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/80 shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 md:mt-10">
            {activeSector ? <SectorReferencesPanel sector={activeSector} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectorReferencesSection;
