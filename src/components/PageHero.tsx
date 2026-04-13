import Breadcrumb, { type BreadcrumbItem } from "@/components/Breadcrumb";
import { cn } from "@/lib/utils";

export type PageHeroHighlight = { k: string; v: string };

type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  /** Bandeau plus éditorial (pages intérieures) */
  variant?: "default" | "editorial";
  /** Sous le titre : pastilles clé / valeur (uniquement si variant = editorial) */
  highlights?: PageHeroHighlight[];
};

const PageHero = ({
  title,
  description,
  eyebrow,
  breadcrumbs,
  className,
  variant = "default",
  highlights,
}: PageHeroProps) => {
  const isEditorial = variant === "editorial";

  return (
    <section
      className={cn(
        !isEditorial && "border-b border-border/40 bg-gradient-to-b from-surface to-background py-10 md:py-14",
        isEditorial &&
          "relative overflow-hidden border-b border-primary/10 bg-[hsl(222,42%,97%)] py-14 md:py-20 lg:py-24",
        className,
      )}
    >
      {isEditorial ? (
        <>
          <div
            className="pointer-events-none absolute -right-24 top-1/2 h-[min(520px,70vw)] w-[min(520px,70vw)] -translate-y-1/2 rounded-full bg-primary/[0.06] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
            aria-hidden
          />
        </>
      ) : null}
      <div
        className={cn(
          "container relative mx-auto px-4 sm:px-6 lg:px-8",
          isEditorial ? "max-w-4xl" : "max-w-3xl lg:max-w-none",
        )}
      >
        {breadcrumbs?.length ? <Breadcrumb items={breadcrumbs} className={isEditorial ? "opacity-80" : undefined} /> : null}
        {eyebrow ? (
          <p className={cn("eyebrow mb-4", isEditorial && "text-primary/90")}>{eyebrow}</p>
        ) : null}
        <h1
          className={cn(
            "font-heading font-bold tracking-tight text-foreground",
            isEditorial
              ? "mb-5 max-w-[18ch] text-4xl leading-[1.08] md:text-5xl lg:text-[3.25rem]"
              : "mb-3 text-3xl md:text-4xl lg:text-5xl",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "leading-relaxed text-muted-foreground",
              isEditorial ? "max-w-2xl text-lg md:text-xl md:leading-relaxed" : "max-w-2xl text-base md:text-lg",
            )}
          >
            {description}
          </p>
        ) : null}
        {isEditorial && highlights?.length ? (
          <div className="mt-10 flex flex-wrap gap-3 border-t border-border/50 pt-8 md:mt-12 md:gap-4 md:pt-10">
            {highlights.map((item) => (
              <div
                key={item.k}
                className="min-w-[140px] rounded-lg border border-border/60 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/80">{item.k}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{item.v}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;
