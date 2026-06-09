import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export type PhotoSlide = {
  src: string;
  alt: string;
};

const AUTOPLAY_MS = 4500;
const AUTOPLAY_MS_REDUCED = 7000;

type AutoPhotoCarouselProps = {
  slides: PhotoSlide[];
  ariaLabel: string;
  className?: string;
  imageClassName?: string;
  aspectClassName?: string;
};

const AutoPhotoCarousel = ({
  slides,
  ariaLabel,
  className,
  imageClassName,
  aspectClassName = "aspect-[4/3]",
}: AutoPhotoCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const autoplayMs = prefersReducedMotion ? AUTOPLAY_MS_REDUCED : AUTOPLAY_MS;

  useEffect(() => {
    if (paused || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % slides.length);
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [autoplayMs, paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className={cn("group relative overflow-hidden", aspectClassName, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out will-change-transform",
            index === current ? "opacity-100" : "opacity-0",
            index === current ? "group-hover:scale-[1.04] group-hover:brightness-[1.03]" : "scale-100",
            imageClassName,
          )}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          aria-hidden={index !== current}
        />
      ))}

      <p className="sr-only" aria-live="polite">
        Photo {current + 1} sur {slides.length}
      </p>
    </div>
  );
};

export default AutoPhotoCarousel;
