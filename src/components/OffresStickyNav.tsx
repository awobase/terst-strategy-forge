import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type OffresNavItem = {
  id: string;
  label: string;
};

type OffresStickyNavProps = {
  items: readonly OffresNavItem[];
};

function getScrollOffset(): number {
  const headerHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--site-header-height") || "72",
  );
  return headerHeight + 56;
}

const OffresStickyNav = ({ items }: OffresStickyNavProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);

      const offset = getScrollOffset();
      let current = items[0]?.id ?? "";

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = item.id;
        }
      }

      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav
      aria-label="Sommaire des offres"
      aria-hidden={!visible}
      className={cn(
        "fixed left-0 right-0 z-40 -mt-px hidden border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md transition-[transform,opacity] duration-300 md:block top-[var(--site-header-height,4.5rem)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "shrink-0 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
                aria-current={active ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default OffresStickyNav;
