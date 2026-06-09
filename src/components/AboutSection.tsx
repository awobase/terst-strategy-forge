import aboutImg from "@/assets/about-dashboard.jpg";
import AboutPhotoCarousel from "@/components/AboutPhotoCarousel";
import { useInView } from "@/hooks/useInView";
import { CheckCircle } from "lucide-react";
import { BRAND_NAME } from "@/config/brand";
import { cn } from "@/lib/utils";

const highlights = [
  "Vision claire et aide à la décision",
  "Solutions concrètes adaptées à la réalité terrain",
  "Accompagnement opérationnel jusqu'aux premières avancées",
];

type AboutSectionProps = {
  /** Page Présentation : mise en page plus éditoriale, sans eyebrow « À propos » */
  variant?: "default" | "presentation";
  /** Dans une page longue : fond aligné sur le chapitre, sans bande blanche */
  seamless?: boolean;
};

const AboutSection = ({ variant = "default", seamless = false }: AboutSectionProps) => {
  const { ref, inView } = useInView();
  const isPresentation = variant === "presentation";
  const isSeamless = isPresentation && seamless;

  return (
    <section
      id={isPresentation ? "cabinet-contenu" : "apropos"}
      className={cn(
        "relative overflow-hidden",
        isSeamless
          ? "bg-transparent py-14 md:py-20"
          : isPresentation
            ? "border-y border-border/40 bg-background py-16 md:py-24"
            : "bg-background py-24 md:py-32",
      )}
    >
      {!isPresentation ? (
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03]" />
      ) : (
        <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent md:left-[min(8vw,4rem)]" aria-hidden />
      )}

      <div
        ref={ref}
        className={cn(
          "container mx-auto grid items-center px-4 transition-all duration-700 md:grid-cols-2",
          isPresentation ? "gap-12 lg:gap-20" : "gap-16",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className={cn("relative", isPresentation && "md:order-2")}>
          <div
            className={cn(
              "group overflow-hidden rounded-2xl ring-1 ring-border/50",
              isPresentation ? "shadow-md md:rounded-3xl md:shadow-lg" : "shadow-xl ring-border/40",
            )}
          >
            {isPresentation ? (
              <img
                src={aboutImg}
                alt="Consultant analysant un dashboard stratégique"
                className={cn(
                  "h-full w-full object-cover transition-[transform,filter] duration-700 ease-out will-change-transform group-hover:scale-[1.045] group-hover:brightness-[1.03]",
                  "aspect-[4/3] md:aspect-auto md:min-h-[320px]",
                )}
                loading="lazy"
                width={1280}
                height={854}
              />
            ) : (
              <AboutPhotoCarousel />
            )}
          </div>
          <div
            className={cn(
              "absolute hidden border md:block",
              isPresentation
                ? "-bottom-5 -left-5 rounded-2xl border-border/60 bg-card p-5 shadow-md"
                : "-bottom-6 -right-6 rounded-xl border-secondary/20 bg-secondary p-5 text-secondary-foreground shadow-lg",
            )}
          >
            <p className="font-heading text-3xl font-bold tracking-tight text-foreground">+15</p>
            <p className={cn("text-sm font-medium", isPresentation ? "text-muted-foreground" : "opacity-95")}>
              années d&apos;expérience
            </p>
          </div>
        </div>

        <div className={cn(isPresentation && "md:order-1 md:max-w-xl md:pr-4")}>
          {!isPresentation ? <p className="eyebrow">À propos</p> : null}
          <h2
            className={cn(
              "mb-6 font-heading font-bold tracking-tight text-foreground",
              isPresentation ? "text-2xl leading-snug md:text-3xl lg:text-[2.125rem]" : "section-title",
            )}
          >
            {isPresentation ? (
              <>
                Une approche <span className="text-gradient-primary">terrain</span>, sans compromis sur la clarté et
                l&apos;impact
              </>
            ) : (
              <>
                Un partenaire stratégique pour{" "}
                <span className="text-gradient-primary">une croissance durable</span>
              </>
            )}
          </h2>
          <div
            className={cn(
              "mb-8 space-y-4 leading-relaxed text-muted-foreground",
              isPresentation ? "text-[1.05rem] md:text-[1.1rem] md:leading-relaxed" : "text-[0.98rem]",
            )}
          >
            <p className={cn(isSeamless && "text-foreground/95")}>
              {BRAND_NAME} est un cabinet indépendant basé en Guadeloupe, qui accompagne les porteurs de projets,
              dirigeants de TPE, PME et associations dans leurs décisions stratégiques, la structuration de leur
              activité et le développement de leurs projets.
            </p>
            <p>
              Nous intervenons comme un partenaire de confiance des dirigeants : clarifier les priorités,
              sécuriser les choix et transformer les ambitions en actions concrètes et réalisables.
            </p>
            <p>
              Chaque mission est conçue sur mesure : diagnostic précis, analyses pragmatiques et feuille de route
              opérationnelle, avec un accompagnement jusqu&apos;à la mise en œuvre.
            </p>
          </div>
          <ul className={cn("space-y-3", isPresentation && "space-y-0 divide-y divide-border/60 rounded-xl border border-border/50 bg-card/40 p-1")}>
            {highlights.map((h) => (
              <li
                key={h}
                className={cn(
                  "flex items-center gap-3",
                  isPresentation && "px-4 py-3.5 first:rounded-t-lg last:rounded-b-lg",
                )}
              >
                <CheckCircle className={cn("h-5 w-5 shrink-0", isPresentation ? "text-primary" : "text-secondary")} />
                <span className="text-sm font-medium text-foreground md:text-[0.95rem]">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
