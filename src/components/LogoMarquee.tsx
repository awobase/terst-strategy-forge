import { cn } from "@/lib/utils";

export type MarqueeLogo = {
  src: string;
  alt: string;
  onLight?: boolean;
};

type LogoMarqueeProps = {
  logos: readonly MarqueeLogo[];
  className?: string;
  /** Classe Tailwind pour le dégradé latéral (ex. from-background) */
  fadeFromClass?: string;
  size?: "default" | "large";
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

const LogoMarquee = ({
  logos,
  className,
  fadeFromClass = "from-background",
  size = "default",
}: LogoMarqueeProps) => {
  if (logos.length === 0) return null;

  const strip = [...logos, ...logos];
  const s = sizeStyles[size];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      aria-label="Partenaires et dispositifs de financement"
      role="region"
    >
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

      <div className={cn("flex scroll-marquee", s.py)}>
        {strip.map((logo, i) => (
          <div key={`${logo.alt}-${i}`} className={cn("flex shrink-0 items-center justify-center", s.gap)}>
            <div
              className={cn(
                "flex items-center justify-center rounded-xl",
                s.slot,
                logo.onLight && "bg-white shadow-md ring-1 ring-border/40",
              )}
            >
              <img
                src={logo.src}
                alt={i < logos.length ? logo.alt : ""}
                className={cn(
                  "w-auto max-w-full object-contain object-center opacity-95",
                  s.img,
                )}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
