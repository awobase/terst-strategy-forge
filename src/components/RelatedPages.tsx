import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export type RelatedLink = { label: string; to: string };

type RelatedPagesProps = {
  links: RelatedLink[];
  title?: string;
  className?: string;
};

const RelatedPages = ({ links, title = "Voir aussi", className }: RelatedPagesProps) => {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title} className={cn("mt-10 border-t border-border/60 pt-8", className)}>
      <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</h2>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="text-sm font-medium text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RelatedPages;
