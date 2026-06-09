import { CASE_STUDIES } from "@/config/caseStudies";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { ArrowRight, Target } from "lucide-react";

const CaseStudiesSection = () => {
  const block = useInView();

  return (
    <section
      id="cas-clients"
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
          <p className="eyebrow text-primary">Cas concrets</p>
          <h2 className="section-title mt-2">De l&apos;ambition au projet abouti</h2>
          <p className="section-lead mx-auto mt-4">
            Deux exemples anonymisés pour illustrer notre façon d&apos;accompagner : cadrer les enjeux, structurer
            l&apos;action et sécuriser les résultats.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.id}
              className="flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm md:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  <Target className="h-3.5 w-3.5" aria-hidden />
                  {study.sector}
                </span>
                <span className="text-xs font-medium text-muted-foreground">{study.missionType}</span>
              </div>

              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">Avant</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.before}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Accompagnement</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-foreground/90">{study.after}</dd>
                </div>
                <div className="rounded-xl border border-secondary/25 bg-secondary/[0.06] px-4 py-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-secondary">Résultat</dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-foreground">{study.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground md:mt-10">
          <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" aria-hidden />
          Cas anonymisés, présentés à titre illustratif — chaque mission est adaptée au contexte du client.
        </p>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
