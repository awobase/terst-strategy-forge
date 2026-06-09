import aboutImg from "@/assets/about-dashboard.jpg";
import SiteLayout from "@/components/SiteLayout";
import PageMeta from "@/components/PageMeta";
import { BRAND_NAME } from "@/config/brand";
import TeamSection from "@/components/TeamSection";
import SectorReferencesSection from "@/components/SectorReferencesSection";
import PartnersSection from "@/components/PartnersSection";
import { SHOW_TESTIMONIALS } from "@/config/features";
import TestimonialsSection from "@/components/TestimonialsSection";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const storyHighlights = [
  "Vision locale et standards internationaux",
  "Méthodes éprouvées, livrables actionnables",
  "Indicateurs de suivi et gouvernance de projet",
];

const metrics = [
  { label: "Indépendant", value: "Cabinet à taille humaine" },
  { label: "Zone", value: "Guadeloupe & Martinique" },
  { label: "Focus", value: "Stratégie & accompagnement" },
];

const QuiSommesNousPage = () => {
  const story = useInView();

  return (
    <SiteLayout>
      <PageMeta
        title="Qui sommes-nous"
        description="Des entrepreneurs au service des entrepreneurs : accompagnement pour transformer une ambition en projet solide, structuré et finançable."
      />

      <section
        id="presentation"
        className="scroll-mt-28 relative overflow-hidden bg-[hsl(222,42%,12%)] text-primary-foreground"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, hsl(32 88% 52% / 0.12) 0%, transparent 45%),
              radial-gradient(circle at 85% 60%, hsl(222 58% 45% / 0.2) 0%, transparent 40%),
              linear-gradient(180deg, transparent 0%, hsl(222 42% 8% / 0.9) 100%)`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 100% / 0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="container relative z-10 mx-auto px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-28 lg:px-8">
          <p className="eyebrow mb-4 text-secondary">Qui sommes-nous</p>
          <h1 className="font-heading text-4xl font-bold leading-[1.12] tracking-tight md:text-5xl lg:max-w-[22ch] lg:text-[3.25rem]">
            Des entrepreneurs au service des{" "}
            <span className="bg-gradient-to-r from-secondary to-amber-300/90 bg-clip-text text-transparent">
              entrepreneurs…
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
            Nous accompagnons celles et ceux qui veulent transformer une ambition en un projet solide, structuré et
            finançable. Une approche qui fait toute la différence.
          </p>
          <div className="mt-10">
            <a
              href="#equipe"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Rencontrez notre équipe
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-12 md:-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border/60 bg-card/95 p-6 shadow-lg shadow-primary/5 backdrop-blur-md md:p-7"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/80">{m.label}</p>
                <p className="mt-2 font-heading text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="border-b border-border/40 bg-background py-16 md:py-24">
        <div
          ref={story.ref}
          className={cn(
            "container mx-auto px-4 transition-all duration-700 sm:px-6 lg:px-8",
            story.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative lg:sticky lg:top-28">
              <div className="group relative overflow-hidden rounded-3xl ring-1 ring-border/50 shadow-xl">
                <img
                  src={aboutImg}
                  alt="Tableaux de bord stratégiques et pilotage de la performance"
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  width={1280}
                  height={854}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(222,42%,12%)/0.35] to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-2 rounded-2xl border border-border/60 bg-card p-5 shadow-lg md:-left-5">
                <p className="font-heading text-3xl font-bold text-foreground">+15</p>
                <p className="mt-1 text-sm text-muted-foreground">années d&apos;expérience</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="eyebrow text-primary">Expertise aux Antilles</p>
                <h2 className="mt-2 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                  Une approche <span className="text-gradient-primary">terrain</span>, exigeante sur les résultats
                </h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {BRAND_NAME} est un cabinet indépendant : nous travaillons aux côtés des équipes dirigeantes pour
                structurer les choix stratégiques, aligner les organisations et accélérer la mise en œuvre.
              </p>
              <div className="grid gap-3 sm:grid-cols-1">
                {storyHighlights.map((line) => (
                  <div
                    key={line}
                    className="flex gap-3 rounded-xl border border-border/50 bg-card/80 px-4 py-3.5 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span className="text-sm font-medium leading-snug text-foreground">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:mt-20 md:grid-cols-2">
            <article className="rounded-2xl border border-border/55 bg-[hsl(220,22%,97%)] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Notre histoire</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Le cabinet <strong className="font-semibold text-foreground">{BRAND_NAME}</strong> est le fruit
                d&apos;une réflexion menée depuis plus de 15 ans par des consultants indépendants, associés ou salariés,
                issus de divers domaines en lien avec le développement d&apos;entreprises aux Antilles — une marque de
                conseil caribéenne, totalement indépendante.
              </p>
            </article>
            <article className="rounded-2xl border border-border/55 bg-card p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Notre vocation</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Nous aidons entreprises, associations et collectivités des Antilles et de la Caraïbe à surmonter leurs
                défis en matière de ressources, de financement et de compétences, en alliant standards internationaux et
                compréhension des réalités locales.
              </p>
            </article>
          </div>
        </div>
      </section>

      <SectorReferencesSection />

      <TeamSection />

      {SHOW_TESTIMONIALS ? <TestimonialsSection /> : null}

      <PartnersSection />
    </SiteLayout>
  );
};

export default QuiSommesNousPage;
