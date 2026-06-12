import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type MarqueeLogo = {
  src: string;
  alt: string;
  onLight?: boolean;
  scale?: number;
};

type LogoMarqueeProps = {
  logos: readonly MarqueeLogo[];
  className?: string;
  /** Classe Tailwind pour le dégradé latéral (ex. from-background) */
  fadeFromClass?: string;
  size?: "default" | "large";
  /** plain = logos nus, sans carte/bouton */
  variant?: "default" | "plain";
  /** static = tous les logos visibles en grille, sans défilement */
  layout?: "marquee" | "static";
  /** Fond blanc derrière chaque logo — utile pour les PNG à zones transparentes */
  logoTile?: boolean;
  /** Logo affiché en premier au chargement du défilement (alt exact) */
  startAtAlt?: string;
};

const sizeStyles = {
  default: {
    slot: "h-14 w-[8.5rem] px-3 sm:h-16 sm:w-40",
    img: "max-h-10 sm:max-h-11",
    gap: "mx-5 sm:mx-8",
    fade: "w-12 sm:w-16",
    py: "py-1",
  },
  large: {
    slot: "h-20 w-44 px-4 sm:h-24 sm:w-52 md:h-28 md:w-64",
    img: "max-h-14 sm:max-h-[4.5rem] md:max-h-20",
    gap: "mx-6 sm:mx-10 md:mx-12",
    fade: "w-16 sm:w-24",
    py: "py-3 md:py-4",
  },
} as const;

const plainSizeStyles = {
  default: {
    img: "h-12 w-auto max-w-[7.5rem] sm:h-14 sm:max-w-[8.75rem] md:h-16 md:max-w-[10rem]",
    tile: "h-11 min-w-[5.25rem] px-2.5 sm:h-12 sm:min-w-[5.75rem] sm:px-3 md:h-[3.25rem] md:min-w-[6.25rem]",
    gap: "mx-4 sm:mx-6 md:mx-8",
    fade: "w-10 sm:w-12",
    py: "py-1",
  },
  large: {
    img: "h-10 w-auto max-w-[6.5rem] sm:h-11 sm:max-w-[7.5rem] md:h-12 md:max-w-[8.5rem]",
    tile: "h-14 min-w-[6.75rem] px-3 sm:h-16 sm:min-w-[7.5rem] md:h-[4.25rem] md:min-w-[8.5rem]",
    gap: "mx-5 sm:mx-7 md:mx-9",
    fade: "w-12 sm:w-16",
    py: "py-3 md:py-4",
  },
} as const;

const staticSizeStyles = {
  img: "h-9 w-auto max-w-[3.25rem] sm:h-14 sm:max-w-[6.5rem] md:h-20 md:max-w-[9.5rem]",
  py: "py-4 sm:py-5 md:py-6",
} as const;

function LogoTile({
  logo,
  size,
  variant,
  decorative,
  logoTile = false,
}: {
  logo: MarqueeLogo;
  size: keyof typeof sizeStyles;
  variant: "default" | "plain";
  decorative?: boolean;
  logoTile?: boolean;
}) {
  if (variant === "plain") {
    const s = plainSizeStyles[size];
    const scale = logo.scale ?? 1;
    const image = (
      <img
        src={logo.src}
        alt={decorative ? "" : logo.alt}
        className={cn("object-contain object-center opacity-100", logoTile ? "max-h-full max-w-full" : "", s.img)}
        style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    );

    return (
      <div className={cn("flex shrink-0 items-center justify-center", s.gap)}>
        {logoTile ? (
          <div
            className={cn(
              "flex items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-border/25",
              s.tile,
            )}
          >
            {image}
          </div>
        ) : (
          image
        )}
      </div>
    );
  }

  const s = sizeStyles[size];
  return (
    <div className={cn("flex shrink-0 items-center justify-center", s.gap)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl",
          s.slot,
          logo.onLight && "bg-white shadow-md ring-1 ring-border/40",
        )}
      >
        <img
          src={logo.src}
          alt={decorative ? "" : logo.alt}
          className={cn("w-auto max-w-full object-contain object-center opacity-95", s.img)}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
    </div>
  );
}

const LogoMarquee = ({
  logos,
  className,
  fadeFromClass = "from-background",
  size = "default",
  variant = "default",
  layout = "marquee",
  logoTile = false,
  startAtAlt,
}: LogoMarqueeProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const orderedLogos = (() => {
    if (!startAtAlt) return logos;
    const startIndex = logos.findIndex((logo) => logo.alt === startAtAlt);
    if (startIndex <= 0) return logos;
    return [...logos.slice(startIndex), ...logos.slice(0, startIndex)];
  })();

  if (orderedLogos.length === 0) return null;

  if (layout === "static") {
    return (
      <div
        className={cn(className)}
        aria-label="Partenaires et dispositifs de financement"
        role="region"
      >
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-x-3 gap-y-4 overflow-x-hidden sm:flex-nowrap sm:gap-x-6 md:gap-x-8 lg:gap-x-10",
            staticSizeStyles.py,
          )}
        >
          {orderedLogos.map((logo) => (
            <img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className={cn("shrink-0 object-contain object-center", staticSizeStyles.img)}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
      </div>
    );
  }

  const s = variant === "plain" ? plainSizeStyles[size] : sizeStyles[size];
  const durationSec = Math.max(48, orderedLogos.length * 2.8);
  const strip = prefersReducedMotion ? orderedLogos : [...orderedLogos, ...orderedLogos];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label="Partenaires et dispositifs de financement"
      role="region"
    >
      {!prefersReducedMotion && variant !== "plain" ? (
        <>
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r to-transparent",
              s.fade,
              fadeFromClass,
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l to-transparent",
              s.fade,
              fadeFromClass,
            )}
            aria-hidden
          />
        </>
      ) : null}

      <div
        className={cn(
          prefersReducedMotion ? "flex flex-wrap justify-center gap-y-6" : "flex w-max max-w-none flex-nowrap scroll-marquee",
          s.py,
        )}
        style={prefersReducedMotion ? undefined : { animationDuration: `${durationSec}s` }}
      >
        {strip.map((logo, i) => (
          <LogoTile
            key={`${logo.alt}-${i}`}
            logo={logo}
            size={size}
            variant={variant}
            logoTile={logoTile}
            decorative={!prefersReducedMotion && i >= orderedLogos.length}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
