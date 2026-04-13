import { cn } from "@/lib/utils";

type InteriorArticleProps = {
  children: React.ReactNode;
  /** fond alternatif pour varier avec le hero (ignoré si tone = editorial) */
  variant?: "background" | "surface";
  /** aligné sur les pages type Présentation : rythme vertical et typo un peu plus ample */
  tone?: "default" | "editorial";
  className?: string;
};

/**
 * Zone de contenu intérieur : largeur max, typo lisible, espacements homogènes.
 */
const InteriorArticle = ({ children, variant = "background", tone = "default", className }: InteriorArticleProps) => {
  const isEditorial = tone === "editorial";

  return (
    <section
      className={cn(
        isEditorial
          ? "border-b border-border/40 bg-background py-12 md:py-20"
          : cn("py-10 md:py-14", variant === "surface" ? "bg-surface" : "bg-background"),
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "mx-auto prose prose-neutral prose-headings:font-heading prose-headings:tracking-tight",
            "prose-ul:my-4 prose-ol:my-4 prose-li:my-0.5 prose-strong:text-foreground",
            "prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline",
            "dark:prose-invert",
            isEditorial
              ? cn(
                  "max-w-2xl",
                  "prose-p:text-[1.02rem] prose-p:leading-relaxed md:prose-p:text-[1.05rem]",
                  "prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-3 md:prose-h2:text-2xl prose-h2:text-foreground",
                  "prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-9 prose-h3:mb-2",
                )
              : cn(
                  "max-w-3xl",
                  "prose-p:text-[0.98rem] prose-p:leading-relaxed",
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
