import { cn } from "@/lib/utils";

type InteriorArticleProps = {
  children: React.ReactNode;
  /** fond alternatif pour varier avec le hero (ignoré si tone = editorial) */
  variant?: "background" | "surface";
  /** aligné sur les pages type Présentation : rythme vertical et typo un peu plus ample */
  tone?: "default" | "editorial";
  /** longues pages « one page » : chapeau, listes en cartes, citations mises en avant */
  spotlight?: boolean;
  className?: string;
};

/**
 * Bloc de contenu intérieur : largeur max, typo lisible, espacements homogènes.
 */
const InteriorArticle = ({
  children,
  variant = "background",
  tone = "default",
  spotlight = false,
  className,
}: InteriorArticleProps) => {
  const isEditorial = tone === "editorial";
  const isSpotlight = isEditorial && spotlight;

  return (
    <section
      className={cn(
        isEditorial
          ? cn(
              "border-b border-border/40 py-12 md:py-20",
              isSpotlight ? "bg-transparent" : "bg-background",
            )
          : cn("py-10 md:py-14", variant === "surface" ? "bg-surface" : "bg-background"),
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto prose prose-neutral prose-headings:font-heading prose-headings:tracking-tight",
            "prose-ol:my-4 prose-strong:text-foreground",
            "prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
            "dark:prose-invert",
            isSpotlight &&
              cn(
                "max-w-3xl",
                "prose-p:text-[1.05rem] prose-p:leading-[1.75] md:prose-p:text-[1.125rem]",
                "[&>p:first-of-type]:text-[1.2rem] [&>p:first-of-type]:font-medium [&>p:first-of-type]:leading-snug [&>p:first-of-type]:text-foreground md:[&>p:first-of-type]:text-[1.35rem]",
                "prose-h2:mt-14 prose-h2:mb-5 prose-h2:border-l-[3px] prose-h2:border-primary/35 prose-h2:pl-5 prose-h2:text-foreground prose-h2:text-xl prose-h2:font-semibold md:prose-h2:mt-16 md:prose-h2:text-2xl",
                "prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-lg prose-h3:font-semibold",
                "prose-ul:my-6 prose-ul:list-none prose-ul:space-y-3 prose-ul:pl-0",
                "prose-li:relative prose-li:my-0 prose-li:rounded-xl prose-li:border prose-li:border-border/55 prose-li:bg-card/70 prose-li:py-4 prose-li:pl-8 prose-li:pr-5 prose-li:shadow-sm prose-li:leading-relaxed",
                "prose-li:before:absolute prose-li:before:left-[1.15rem] prose-li:before:top-[1.05rem] prose-li:before:h-1.5 prose-li:before:w-1.5 prose-li:before:rounded-full prose-li:before:bg-primary/70 prose-li:before:content-['']",
                "prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 prose-ol:marker:text-primary/80",
                "prose-blockquote:my-10 prose-blockquote:border-l-[3px] prose-blockquote:border-primary/40 prose-blockquote:bg-primary/[0.06] prose-blockquote:py-5 prose-blockquote:pl-6 prose-blockquote:pr-5 prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:rounded-r-xl",
              ),
            isEditorial &&
              !isSpotlight &&
              cn(
                "max-w-2xl",
                "prose-p:text-[1.02rem] prose-p:leading-relaxed md:prose-p:text-[1.05rem]",
                "prose-ul:my-4 prose-li:my-0.5",
                "prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-3 md:prose-h2:text-2xl prose-h2:text-foreground",
                "prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-9 prose-h3:mb-2",
              ),
            !isEditorial &&
              cn(
                "max-w-3xl",
                "prose-p:text-[0.98rem] prose-p:leading-relaxed",
                "prose-ul:my-4 prose-li:my-0.5",
                "prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-foreground",
                "prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-2",
              ),
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default InteriorArticle;
