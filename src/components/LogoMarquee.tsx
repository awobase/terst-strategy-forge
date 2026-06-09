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
    img: "h-12 w-auto max-w-[9rem] sm:h-14 sm:max-w-[10rem]",
    gap: "mx-6 sm:mx-8",
    fade: "w-12 sm:w-16",
    py: "py-2",
  },
  large: {
    img: "h-28 w-auto max-w-[18rem] sm:h-32 sm:max-w-[20rem] md:h-36 md:max-w-[22rem]",
    gap: "mx-10 sm:mx-14 md:mx-20",
    fade: "w-20 sm:w-28",
    py: "py-6 md:py-8",
  },
} as const;

const staticSizeStyles = {
  img: "h-16 w-auto max-w-[7rem] sm:h-[4.5rem] sm:max-w-[8.5rem] md:h-20 md:max-w-[9.5rem]",
  py: "py-5 md:py-6",
} as const;

function LogoTile({
  logo,
  size,
  variant,
  decorative,
}: {
  logo: MarqueeLogo;
  size: keyof typeof sizeStyles;
  variant: "default" | "plain";
  decorative?: boolean;
}) {
  if (variant === "plain") {
    const s = plainSizeStyles[size];
    const scale = logo.scale ?? 1;
    return (
      <div className={cn("flex shrink-0 items-center justify-center", s.gap)}>
        <img
          src={logo.src}
          alt={decorative ? "" : logo.alt}
          className={cn("origin-center object-contain object-center", s.img)}
          style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
          loading="eager"
          decoding="async"
          draggable={false}
        />
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
}: LogoMarqueeProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (logos.length === 0) return null;

  if (layout === "static") {
    return (
      <div
        className={cn(className)}
        aria-label="Partenaires et dispositifs de financement"
        role="region"
      >
        <div
          className={cn(
            "flex flex-nowrap items-center justify-center gap-x-5 overflow-x-auto sm:gap-x-6 md:gap-x-8 lg:gap-x-10",
            staticSizeStyles.py,
          )}
        >
          {logos.map((logo) => (
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
  const durationSec = Math.max(48, logos.length * 2.8);
  const strip = prefersReducedMotion ? logos : [...logos, ...logos];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label="Partenaires et dispositifs de financement"
      role="region"
    >
      {!prefersReducedMotion ? (
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
            decorative={!prefersReducedMotion && i >= logos.length}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
