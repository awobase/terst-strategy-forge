import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageMeta from "@/components/PageMeta";
import TestimonialsSection from "@/components/TestimonialsSection";
import { ROUTES } from "@/config/navigation";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Landmark,
  Rocket,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StandardOfferChapterProps = {
  id: string;
  index: number;
  eyebrow?: string;
  title: string;
  lead: string;
  keyPoints: string[];
  interventions: string[];
  outcomeStatement: string;
  icon: LucideIcon;
};

type ServiceOfferChapterProps = {
  id: string;
  index: number;
  title: string;
  lead: string;
  detail: string;
  listTitle: string;
  listItems: string[];
  footer?: string;
  icon: LucideIcon;
};

const quickLinks = [
  { href: "#start", name: "Start", tag: "Standard" },
  { href: "#rise", name: "Rise", tag: "Standard" },
  { href: "#etudes-personnalisees", name: "Études", tag: "Personnalisées" },
  { href: "#recherche-financements", name: "Financements", tag: "Recherche" },
];

function StandardOfferChapter({
  id,
  index,
  eyebrow,
  title,
  lead,
  keyPoints,
  interventions,
  outcomeStatement,
  icon: Icon,
}: StandardOfferChapterProps) {
  const block = useInView();
  const bgMuted = index % 2 === 1;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-b border-border/40 py-20 md:py-28",
        bgMuted ? "bg-[hsl(220,22%,97%)]" : "bg-background",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={block.ref}
          className={cn(
            "transition-all duration-700",
            block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-3xl">
              {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
              <h2
                className={cn(
                  "font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]",
                  eyebrow ? "mt-2" : "",
                )}
              >
                {title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:mt-10">
              <Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-xl font-bold text-foreground">Points clés</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {keyPoints.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-xl border border-border/50 bg-card/80 px-5 py-4 text-sm leading-relaxed text-muted-foreground shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <h3 className="font-heading text-xl font-bold text-foreground">Intervention sur</h3>
            <ul className="mt-5 space-y-3">
              {interventions.map((line) => (
                <li
                  key={line}
                  className="rounded-xl border border-border/50 bg-card/80 px-5 py-4 text-sm leading-relaxed text-muted-foreground shadow-sm"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border-l-[3px] border-secondary bg-secondary/10 px-6 py-6 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">Ce que vous obtenez</p>
            <p className="mt-3 text-base font-medium leading-relaxed text-foreground md:text-lg">{outcomeStatement}</p>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to={ROUTES.contact}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Discuter de cette offre
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceOfferChapter({
  id,
  index,
  title,
  lead,
  detail,
  listTitle,
  listItems,
  footer,
  icon: Icon,
}: ServiceOfferChapterProps) {
  const block = useInView();
  const bgMuted = index % 2 === 1;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-b border-border/40 py-20 md:py-28",
        bgMuted ? "bg-[hsl(220,22%,97%)]" : "bg-background",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={block.ref}
          className={cn(
            "transition-all duration-700",
            block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{detail}</p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:mt-10">
              <Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
            </div>
          </div>

          <div className="mt-14">
            <h3 className="font-heading text-xl font-bold text-foreground">{listTitle}</h3>
            <ul className="mt-5 space-y-3">
              {listItems.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-xl border border-border/50 bg-card/80 px-5 py-4 text-sm leading-relaxed text-muted-foreground shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {footer ? (
            <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.07] to-transparent px-6 py-6 md:px-10 md:py-8">
              <p className="text-center text-base leading-relaxed text-muted-foreground md:text-lg">{footer}</p>
            </div>
          ) : null}

          <div className="mt-10 flex justify-center">
            <Link
              to={ROUTES.contact}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Discuter de cette offre
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const OffresPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offres"
        description="Start, Rise, études personnalisées et recherche de financements : accompagnement concret et orienté résultats — CAYRIBE Partners."
      />

      <section className="relative overflow-hidden bg-[hsl(222,42%,12%)] text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 30%, hsl(32 88% 52% / 0.14) 0%, transparent 42%),
              radial-gradient(circle at 90% 50%, hsl(222 58% 48% / 0.18) 0%, transparent 38%),
              linear-gradient(180deg, transparent 0%, hsl(222 42% 8% / 0.92) 100%)`,
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
        <div className="container relative z-10 mx-auto px-4 pb-24 pt-24 sm:px-6 md:pb-28 md:pt-28 lg:px-8">
          <p className="eyebrow mb-4 text-secondary">Offres</p>
          <h1 className="max-w-[20ch] font-heading text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.35rem]">
            Nos offres d&apos;accompagnement
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
            Nous accompagnons les porteurs de projets et les entreprises à chaque étape de leur développement, de la
            structuration initiale à l&apos;accélération stratégique. Nos offres reposent sur un principe simple : un
            accompagnement concret, personnalisé et orienté résultats.
          </p>
          <div className="mt-10">
            <Link
              to={ROUTES.contact}
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-lg shadow-secondary/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Parler à un consultant
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-14 md:-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((q) => (
              <a
                key={q.href}
                href={q.href}
                className="group flex flex-col rounded-2xl border border-border/60 bg-card/95 p-5 shadow-lg shadow-primary/5 backdrop-blur-md transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {q.tag}
                </span>
                <span className="mt-2 font-heading text-xl font-bold text-foreground">{q.name}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Détails
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="border-b border-border/40 bg-background py-14 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="eyebrow text-primary">Offres standard</p>
          <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Start &amp; Rise
          </h2>
        </div>
      </section>

      <StandardOfferChapter
        id="start"
        index={0}
        eyebrow="Offre standard"
        title="Start"
        lead="L’offre START s’adresse aux porteurs de projets souhaitant transformer une idée en projet viable, structuré et prêt à être lancé. Pensée comme un véritable parcours d’amorçage, elle permet de poser des bases solides avant la création ou le démarrage d’activité."
        icon={Rocket}
        keyPoints={[
          "15 crédits d’accompagnement",
          "Engagement sur une période de 6 mois",
          "Accompagnement dédié aux projets en phase de création ou de structuration",
          "150 € TTC / mois",
        ]}
        interventions={[
          "Structuration du projet",
          "Analyse de marché et étude de faisabilité",
          "Élaboration du business plan",
          "Préparation à la déclaration et au lancement du projet",
        ]}
        outcomeStatement="Un projet clair, structuré et financièrement crédible, prêt à être lancé et à convaincre partenaires et financeurs."
      />

      <StandardOfferChapter
        id="rise"
        index={1}
        eyebrow="Offre standard"
        title="Rise"
        lead="L’offre RISE est destinée aux entreprises et associations souhaitant franchir un cap : croissance, innovation, optimisation ou repositionnement stratégique. Cet accompagnement s’inscrit dans une logique de développement durable et maîtrisé de l’activité."
        icon={TrendingUp}
        keyPoints={[
          "40 crédits d’accompagnement",
          "Abonnement sur une période de 12 mois",
          "Accompagnement dédié aux entreprises et associations en développement",
          "190 € TTC / mois",
        ]}
        interventions={[
          "Business development et stratégie de croissance",
          "Management de projet et innovation",
          "Analyse marketing et positionnement stratégique",
          "Optimisation opérationnelle et financière",
          "Relations public-privé et développement partenarial",
        ]}
        outcomeStatement="Une entreprise mieux organisée, stratégiquement positionnée et dotée d’outils concrets pour accélérer durablement sa croissance."
      />

      <ServiceOfferChapter
        id="etudes-personnalisees"
        index={2}
        title="Études personnalisées"
        lead="Certaines étapes clés nécessitent une analyse approfondie avant toute prise de décision."
        detail="Nos études personnalisées répondent à des besoins spécifiques, ponctuels ou stratégiques, grâce à une approche rigoureuse mêlant analyse économique, marketing et financière."
        listTitle="Domaines d’intervention possibles"
        listItems={[
          "Étude de marché et analyse sectorielle",
          "Étude de faisabilité économique et financière",
          "Diagnostic d’activité ou d’entreprise",
          "Analyse d’opportunité d’investissement",
          "Étude de positionnement stratégique",
          "Analyse de rentabilité ou modèle économique",
          "Études territoriales ou sectorielles pour acteurs publics",
        ]}
        footer="Chaque mission fait l’objet d’un forfait adapté à votre besoin, défini après un échange préalable permettant de bien comprendre vos enjeux."
        icon={FileSearch}
      />

      <ServiceOfferChapter
        id="recherche-financements"
        index={3}
        title="Recherche de financements"
        lead="L’accès au financement constitue souvent une étape déterminante dans la réussite d’un projet ou le développement d’une entreprise ou association."
        detail="Nous vous accompagnons dans l’identification, la structuration et la mobilisation des financements les plus adaptés à votre situation. Notre approche combine expertise financière, connaissance des dispositifs publics et compréhension des attentes des financeurs."
        listTitle="Notre accompagnement comprend"
        listItems={[
          "Identification des dispositifs de financement pertinents",
          "Structuration de la stratégie de financement",
          "Montage des dossiers de financement",
          "Élaboration ou optimisation du prévisionnel financier",
          "Préparation aux échanges avec les financeurs",
          "Appui lors des phases d’instruction",
        ]}
        icon={Landmark}
      />

      <TestimonialsSection />
    </SiteLayout>
  );
};

export default OffresPage;
