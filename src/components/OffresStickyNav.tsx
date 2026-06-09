import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type OffresNavItem = {
  id: string;
  label: string;
  tag?: string;
};

type OffresStickyNavProps = {
  items: readonly OffresNavItem[];
};

const OffresStickyNav = ({ items }: OffresStickyNavProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sommaire des offres"
      className={cn(
        "sticky top-[4.25rem] z-40 border-b border-border/60 bg-background/95 shadow-sm backdrop-blur-md transition-all duration-300 md:top-20",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const active = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  "shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
                aria-current={active ? "location" : undefined}
              >
                {item.label}
                {item.tag ? (
                  <span className={cn("ml-1.5 text-[10px] font-bold uppercase", active ? "text-primary-foreground/80" : "text-muted-foreground/70")}>
                    · {item.tag}
                  </span>
                ) : null}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default OffresStickyNav;
