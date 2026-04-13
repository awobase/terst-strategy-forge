import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = { label: string; to?: string };

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <nav aria-label="Fil d'Ariane" className={cn("mb-4", className)}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1">
            {i > 0 ? (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-45" aria-hidden />
            ) : null}
            {item.to ? (
              <Link
                to={item.to}
                className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  i === items.length - 1
                    ? "font-medium text-foreground/90"
                    : "text-muted-foreground/90"
                }
                aria-current={i === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
