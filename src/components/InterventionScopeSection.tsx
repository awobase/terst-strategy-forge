import InterventionTimeline from "@/components/InterventionTimeline";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Handshake, Target } from "lucide-react";

const InterventionScopeSection = () => {
  const block = useInView();

  return (
    <section id="perimetre" className="scroll-mt-28 border-y border-border/40 bg-[hsl(220,22%,97%)] py-16 md:py-24">
      <div
        ref={block.ref}
        className={cn(
          "container mx-auto max-w-5xl px-4 transition-all duration-700 sm:px-6 lg:px-8",
          block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-primary">Périmètre d&apos;intervention</p>
          <h2 className="section-title mt-2">De l&apos;idée à la mise en œuvre d&apos;un projet</h2>
          <p className="section-lead mx-auto mt-4">
            Une approche structurante, fondée sur des analyses pragmatiques
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-border/40 bg-card/50 p-4 shadow-sm sm:p-6 md:mt-12 md:p-8">
          <InterventionTimeline />
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:mt-14 md:grid-cols-2">
          <div className="flex gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Le cabinet intervient sur <strong className="text-foreground">toutes les étapes</strong> du montage de
              projet et s&apos;adresse aux dirigeants comme aux porteurs de projet.
            </p>
          </div>
          <div className="flex gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Handshake className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              En pratique, nous mobilisons si nécessaire un réseau de partenaires spécialisés (avocats, consultants,
              experts techniques) pour faciliter et accélérer la mise en œuvre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterventionScopeSection;
