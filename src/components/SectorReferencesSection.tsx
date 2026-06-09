import { useState } from "react";
import {
  getReferencesForSector,
  SECTOR_CATEGORIES,
  SECTOR_GRID_LAST,
  SECTOR_GRID_MAIN,
  SECTOR_STYLES,
  type SectorCategory,
} from "@/config/sectorReferences";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

function SectorTile({ sector, onSelect }: { sector: SectorCategory; onSelect: () => void }) {
  const style = SECTOR_STYLES[sector.color];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex min-h-[5.25rem] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br px-4 py-5 text-center transition-all duration-300",
        "hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]",
        style.card,
        style.glow,
        "sm:min-h-[5.75rem]",
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 opacity-80"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 rounded-full bg-white/10 blur-sm transition-transform duration-300 group-hover:scale-125"
        aria-hidden
      />
      <span className="relative z-10 max-w-[11rem] text-sm font-semibold leading-snug tracking-tight text-white sm:text-[0.95rem]">
        {sector.label}
      </span>
      <span className="relative z-10 mt-2 flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Voir
        <ArrowUpRight className="h-3 w-3" aria-hidden />
      </span>
    </button>
  );
}

const SectorReferencesSection = () => {
  const block = useInView();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeSector = SECTOR_CATEGORIES.find((s) => s.id === activeId);
  const references = activeId ? getReferencesForSector(activeId) : [];
  const activeStyle = activeSector ? SECTOR_STYLES[activeSector.color] : null;

  return (
    <section
      id="references-sectorielles"
      className="scroll-mt-28 border-b border-border/40 bg-gradient-to-b from-background via-[hsl(220,22%,97%)] to-background py-16 md:py-24"
    >
      <div
        ref={block.ref}
        className={cn(
          "container mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 lg:px-8",
          block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-primary">Références</p>
          <h2 className="section-title mt-2">Nos références sectorielles</h2>
          <p className="section-lead mx-auto mt-4">
            Cliquez sur un secteur pour découvrir des références de missions anonymisées.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-3xl border border-border/50 bg-card/60 p-4 shadow-sm backdrop-blur-sm sm:p-6 md:mt-14 md:p-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {SECTOR_GRID_MAIN.map((sector) => (
              <SectorTile key={sector.id} sector={sector} onSelect={() => setActiveId(sector.id)} />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-3 md:mt-4 md:gap-4">
            {SECTOR_GRID_LAST.map((sector) => (
              <div key={sector.id} className="w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)]">
                <SectorTile sector={sector} onSelect={() => setActiveId(sector.id)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={activeId !== null} onOpenChange={(open) => !open && setActiveId(null)}>
        <DialogContent className="max-h-[min(90vh,720px)] gap-0 overflow-hidden border-0 p-0 sm:max-w-2xl sm:rounded-2xl">
          {activeSector && activeStyle ? (
            <>
              <div className={cn("relative overflow-hidden px-6 py-7 text-white sm:px-8", activeStyle.accent)}>
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"
                  aria-hidden
                />
                <DialogHeader className="relative text-left">
                  <DialogTitle className="font-heading text-xl leading-snug text-white md:text-2xl">
                    {activeSector.label}
                  </DialogTitle>
                </DialogHeader>
              </div>

              <div className="max-h-[min(60vh,480px)] space-y-4 overflow-y-auto bg-background px-6 py-6 sm:px-8">
                {references.length > 0 ? (
                  references.map((ref, index) => (
                    <article
                      key={`${activeId}-${index}-${ref.text.slice(0, 32)}`}
                      className="rounded-2xl border border-border/50 border-l-4 border-l-secondary/70 bg-muted/20 px-5 py-5 md:px-6 md:py-6"
                    >
                      <p className="text-sm leading-relaxed text-foreground/90 md:text-[0.95rem] md:leading-relaxed">
                        {ref.text}
                      </p>
                    </article>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-muted/10 px-6 py-10 text-center">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Références sectorielles en cours de publication pour ce secteur.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SectorReferencesSection;
