import aboutImg from "@/assets/about-dashboard.jpg";
import SiteLayout from "@/components/SiteLayout";
import PageMeta from "@/components/PageMeta";
import PartnersSection from "@/components/PartnersSection";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { ArrowRight, Compass, Handshake, Sparkles, Target } from "lucide-react";

const metrics = [
  { label: "Expérience collective", value: "15+", detail: "années sur des sujets stratégiques & de performance" },
  { label: "Livrables", value: "Actionnables", detail: "comptes rendus, outils partagés et transmission aux équipes" },
  { label: "Secteurs", value: "Public", detail: "& privé, sujets sensibles et transverses" },
];

const values = [
  {
    icon: Compass,
    title: "Clarté avant tout",
    text: "Arbitrages documentés, options nommées, risques assumés : vous décidez en connaissance de cause.",
  },
  {
    icon: Handshake,
    title: "Proximité assumée",
    text: "Un interlocuteur senior qui porte la mission du premier atelier au dernier livrable — pas de relais flous.",
  },
  {
    icon: Target,
    title: "Exigence terrain",
    text: "Méthodes solides, mais toujours calibrées sur votre capacité d'exécution et vos délais réels.",
  },
  {
    icon: Sparkles,
    title: "Transmission",
    text: "Livrables réutilisables et montée en compétence des équipes pour que l'élan survive à la mission.",
  },
];

const workingSteps = [
  {
    step: "01",
    title: "Cadrage transparent",
    text: "Cadre, parties prenantes, données disponibles et hypothèses : tout est posé noir sur blanc avant d'accélérer.",
  },
  {
    step: "02",
    title: "Allers-retours courts",
    text: "Ateliers ciblés, comptes rendus actionnables, outils partagés — pour garder le rythme sans noyer les agendas.",
  },
  {
    step: "03",
    title: "Pilotage des décisions",
    text: "RACI, indicateurs utiles et rituels de comité : on sécurise qui décide quoi, avec quels critères.",
  },
  {
    step: "04",
    title: "Effets durables",
    text: "Documentation, formation des managers clés et jalons post-mission : l'organisation reste autonome.",
  },
];

const QuiSommesNousPage = () => {
  const story = useInView();
  const valuesBlock = useInView();
  const process = useInView();

  return (
    <SiteLayout>
      <PageMeta
        title="Qui sommes-nous"
        description="CAYRIBE Partners : cabinet indépendant de conseil en stratégie et performance — équipe, valeurs et partenaires."
      />

      {/* ——— Hero ——— */}
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
          <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:max-w-[14ch] lg:text-[3.25rem]">
            Un cabinet{" "}
            <span className="bg-gradient-to-r from-secondary to-amber-300/90 bg-clip-text text-transparent">
              indépendant
            </span>
            , exigeant sur le fond
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
            Nous accompagnons dirigeants et équipes pour clarifier les enjeux, cadrer les décisions utiles et donner les
            moyens d&apos;exécuter — avec la réactivité d&apos;une structure à taille humaine et le sérieux d&apos;un
            conseil de direction.
          </p>
          <div className="mt-10">
            <a
              href="#equipe"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              L&apos;équipe &amp; la méthode
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* ——— Métriques (chevauchement) ——— */}
      <div className="relative z-20 -mt-12 md:-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border/60 bg-card/95 p-6 shadow-lg shadow-primary/5 backdrop-blur-md md:p-7"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/80">{m.label}</p>
                <p className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground md:text-[2rem]">
                  {m.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ——— Récit + image ——— */}
      <section className="border-b border-border/40 bg-background py-20 md:py-28">
        <div
          ref={story.ref}
          className={cn(
            "container mx-auto grid items-center gap-12 px-4 transition-all duration-700 lg:grid-cols-2 lg:gap-16 lg:px-8",
            story.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="relative order-2 lg:order-1">
            <div className="absolute -left-4 top-8 hidden h-32 w-32 rounded-full bg-primary/[0.07] blur-2xl lg:block" aria-hidden />
            <div className="group relative overflow-hidden rounded-3xl ring-1 ring-border/50 shadow-xl">
              <img
                src={aboutImg}
                alt="Consultant analysant un tableau de bord stratégique avec une équipe"
                className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.03] lg:aspect-auto lg:min-h-[380px]"
                width={1280}
                height={854}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(222,42%,12%)/0.35] to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-2 max-w-[220px] rounded-2xl border border-border/60 bg-card p-5 shadow-lg md:-right-5">
              <p className="font-heading text-2xl font-bold text-foreground">Indépendant</p>
              <p className="mt-1 text-sm text-muted-foreground">Conseil sans conflit d&apos;intérêts ni produit à vendre.</p>
            </div>
          </div>
          <div className="order-1 space-y-8 lg:order-2 lg:max-w-xl lg:justify-self-end">
            <div>
              <p className="eyebrow text-primary">Notre ADN</p>
              <h2 className="mt-2 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                Stratégie utile, <span className="text-gradient-primary">exécution</span> possible
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              CAYRIBE Partners est né d&apos;une conviction simple : les dirigeants n&apos;ont pas besoin de plus de
              slides — ils ont besoin d&apos;une lecture partagée de la réalité, d&apos;options réalistes et d&apos;un
              plan qu&apos;ils peuvent piloter avec leurs équipes.
            </p>
            <blockquote className="relative rounded-2xl border-l-[3px] border-secondary bg-secondary/10 py-5 pl-6 pr-5 text-base font-medium leading-relaxed text-foreground">
              Chaque mission est taillée au contexte : cadrage net, analyses solides, recommandations assumées — avec une
              visibilité continue sur les arbitrages jusqu&apos;aux premiers effets mesurables.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ——— Valeurs ——— */}
      <section className="bg-[hsl(220,22%,97%)] py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={valuesBlock.ref}
            className={cn(
              "mx-auto max-w-3xl text-center transition-all duration-700",
              valuesBlock.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <p className="eyebrow text-primary">Ce qui nous guide</p>
            <h2 className="section-title mt-2">Quatre principes, appliqués au quotidien</h2>
            <p className="section-lead mx-auto mt-4">
              Pas de manifeste creux : des engagements visibles dans les livrables, la gouvernance des missions et la
              façon dont nous parlons à vos équipes.
            </p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-md md:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Parcours de travail ——— */}
      <section id="equipe" className="scroll-mt-28 border-b border-border/40 bg-background py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Équipe &amp; méthode</p>
            <h2 className="section-title mt-2">Une équipe compacte, une exigence de bout en bout</h2>
            <p className="section-lead mx-auto mt-4">
              Profils seniors sur les sujets stratégiques et financiers, complétés par un réseau d&apos;experts associés
              mobilisé quand le dossier l&apos;exige — digital, conduite du changement, secteurs réglementés, enjeux
              multi-sites.
            </p>
          </div>

          <div
            ref={process.ref}
            className={cn(
              "relative mx-auto mt-16 max-w-3xl pl-8 transition-all duration-700 md:pl-14",
              process.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <div
              className="absolute bottom-3 left-[11px] top-3 w-px bg-gradient-to-b from-primary/45 via-border to-transparent md:left-[19px]"
              aria-hidden
            />
            <ul className="relative space-y-10 md:space-y-12">
              {workingSteps.map((s) => (
                <li key={s.step} className="relative">
                  <span
                    className="absolute -left-[18px] top-2 flex h-3.5 w-3.5 rounded-full border-2 border-primary bg-background shadow-sm md:-left-[26px]"
                    aria-hidden
                  />
                  <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-7">
                    <span className="font-heading text-3xl font-bold text-primary/20">{s.step}</span>
                    <h3 className="mt-1 font-heading text-xl font-bold text-foreground">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Partenaires ——— */}
      <section id="partenaires" className="scroll-mt-28 overflow-hidden bg-[hsl(222,42%,97%)]">
        <div className="container mx-auto px-4 pb-6 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Écosystème</p>
            <h2 className="section-title mt-2">Ils nous font confiance</h2>
            <p className="section-lead mx-auto mt-4">
              Organisations publiques et entreprises privées nous confient des sujets sensibles. La confidentialité de
              nos clients reste prioritaire ; les références détaillées sont partagées lors d&apos;un échange direct.
            </p>
          </div>
        </div>
        <div className="bg-background">
          <PartnersSection omitHeading />
        </div>
      </section>
    </SiteLayout>
  );
};

export default QuiSommesNousPage;
