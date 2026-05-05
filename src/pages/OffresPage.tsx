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

type Kpi = { label: string; value: string; hint?: string };

type OfferChapterProps = {
  id: string;
  index: number;
  /** Surtitre au-dessus du titre ; omis si vide */
  eyebrow?: string;
  title: string;
  titleAccent: string;
  lead: string;
  kpis: Kpi[];
  intro: string;
  audiences: string[];
  outcomes: string[];
  quote?: string;
  footer: string;
  icon: LucideIcon;
};

const quickLinks = [
  { href: "#start", name: "Start", tag: "Diagnostic" },
  { href: "#rise", name: "Rise", tag: "Exécution" },
  { href: "#etudes-personnalisees", name: "Études", tag: "Personnalisées" },
  { href: "#recherche-financements", name: "Financements", tag: "Recherche" },
];

function OfferChapter({
  id,
  index,
  eyebrow,
  title,
  titleAccent,
  lead,
  kpis,
  intro,
  audiences,
  outcomes,
  quote,
  footer,
  icon: Icon,
}: OfferChapterProps) {
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
            <div className="max-w-2xl">
              {eyebrow ? <p className="eyebrow text-primary">{eyebrow}</p> : null}
              <h2
                className={cn(
                  "font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]",
                  eyebrow ? "mt-2" : "",
                )}
              >
                {title}{" "}
                <span className="bg-gradient-to-r from-primary to-[hsl(222,50%,48%)] bg-clip-text text-transparent">
                  {titleAccent}
                </span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:mt-10">
              <Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-2xl border border-border/55 bg-card/90 p-6 shadow-sm backdrop-blur-sm md:p-7"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/85">{k.label}</p>
                <p className="mt-2 font-heading text-2xl font-bold text-foreground md:text-[1.75rem]">{k.value}</p>
                {k.hint ? <p className="mt-2 text-sm text-muted-foreground">{k.hint}</p> : null}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-3xl text-center text-lg font-medium leading-relaxed text-foreground/95 md:text-xl">
            {intro}
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
                Pour qui ?
              </h3>
              <ul className="mt-5 space-y-3">
                {audiences.map((line) => (
                  <li
                    key={line}
                    className="rounded-xl border border-border/50 bg-card/80 px-5 py-4 text-sm leading-relaxed text-muted-foreground shadow-sm"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-bold text-foreground">
                <CheckCircle2 className="h-5 w-5 text-secondary" aria-hidden />
                Ce que vous obtenez
              </h3>
              <ul className="mt-5 space-y-3">
                {outcomes.map((line) => (
                  <li
                    key={line}
                    className="rounded-xl border border-border/50 bg-card/80 px-5 py-4 text-sm leading-relaxed text-muted-foreground shadow-sm"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {quote ? (
            <blockquote className="mx-auto mt-14 max-w-3xl rounded-2xl border-l-[3px] border-secondary bg-secondary/10 px-6 py-6 text-center text-base font-medium leading-relaxed text-foreground md:text-lg">
              {quote}
            </blockquote>
          ) : null}

          <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.07] to-transparent px-6 py-6 md:px-10 md:py-8">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-primary/90">Format &amp; cadence</p>
            <p className="mt-3 text-center text-base leading-relaxed text-muted-foreground md:text-lg">{footer}</p>
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

const OffresPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offres"
        description="Start, Rise, études personnalisées et recherche de financements : parcours de conseil en stratégie et performance — CAYRIBE Partners."
      />

      {/* Hero */}
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
          <h1 className="max-w-[16ch] font-heading text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.35rem]">
            Des parcours{" "}
            <span className="bg-gradient-to-r from-secondary to-amber-300/90 bg-clip-text text-transparent">
              clairs
            </span>
            , du diagnostic à l&apos;exécution
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
            Chaque offre répond à un moment différent : cadrer avant d&apos;investir, accélérer l&apos;exécution,
            produire des études et analyses sur mesure, ou structurer la recherche de financements lorsque le projet
            doit être rendu financeable.
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

      {/* Cartes d'accès rapide */}
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

      <OfferChapter
        id="start"
        index={0}
        title="Start —"
        titleAccent="clarté avant l'investissement"
        lead="Arrêter de tâtonner avant un gros engagement : diagnostic partagé, problématique cadrée, feuille de route réaliste — idéal pour lancer une transformation ou préparer une levée de fonds."
        icon={Rocket}
        kpis={[
          { label: "Objectif", value: "Diagnostic & feuille de route" },
          { label: "Durée indicative", value: "4 à 8 semaines", hint: "selon taille et disponibilité des parties prenantes" },
          { label: "Idéal", value: "Avant investissement majeur" },
        ]}
        intro="Start sert quand la direction sent le décalage entre la vision et le terrain, mais n'a pas encore assez de matière commune pour trancher. Nous structurons les entretiens, croisons les données existantes et rendons une lecture partagée : forces, fragilités, priorités et suites possibles."
        audiences={[
          "Dirigeants et COMEX qui veulent valider une direction avant d'engager budget et FTE.",
          "Directions générales en restructuration, croissance hétérogène ou bascule de modèle.",
          "Projets transverses (SI, organisation, offre) qui bloquent faute d'alignement initial.",
        ]}
        outcomes={[
          "Un diagnostic structuré : forces, fragilités, priorités, implications pour la suite.",
          "Une cartographie des options avec risques et conditions de succès pour chaque voie.",
          "Une recommandation de suite : missions, budget d'effort, jalons à 90 jours — sans jargon inutile.",
        ]}
        footer="Ateliers courts, livrables lisibles par le CODIR, transparence totale sur les hypothèses et les limites de l'analyse. Nous tenons le rythme pour que le comité reste mobilisé jusqu'à la décision."
      />

      <OfferChapter
        id="rise"
        index={1}
        title="Rise —"
        titleAccent="du plan aux premiers gains"
        lead="Transformer la stratégie en rythme : priorisation des leviers, rituels de pilotage et accompagnement des équipes jusqu'aux premiers gains mesurables — sans noyer l'organisation dans des slides."
        icon={TrendingUp}
        kpis={[
          { label: "Objectif", value: "Exécution & premiers gains" },
          { label: "Durée indicative", value: "3 à 9 mois", hint: "points de contrôle mensuels et ajustements documentés" },
          { label: "Focus", value: "Rituels & indicateurs" },
        ]}
        intro="Rise prolonge le diagnostic quand la direction est posée mais que l'exécution patine : nous co-construisons le plan d'actions, clarifions les rôles (RACI), posons les indicateurs utiles et sécurisons la cadence de décision, comité après comité."
        audiences={[
          "La feuille de route existe, mais les efforts se dispersent ou les quick wins n'émergent pas.",
          "Vous devez industrialiser une offre, un canal ou une organisation après un proof of concept.",
          "Vous préparez une intégration post-fusion, une montée en charge sur de nouveaux marchés ou un chantier multi-sites.",
        ]}
        outcomes={[
          "Roadmap priorisée (quick wins / structurants) et budget d'effort consolidé.",
          "Tableaux de bord et règles de gouvernance : qui décide quoi, quand, avec quels critères.",
          "Plans de communication interne et accompagnement des managers clés sur le terrain.",
        ]}
        quote="L'objectif n'est pas d'être présents pour toujours : c'est de rendre les arbitrages reproductibles par vos équipes."
        footer="Peu de présentations, beaucoup d'arbitrages et de suivi opérationnel. La mission s'arrête quand vos rituels et vos indicateurs tiennent sans nous."
      />

      <OfferChapter
        id="etudes-personnalisees"
        index={2}
        title="Études personnalisées —"
        titleAccent="livrables actionnables"
        lead="Études, benchmarks, notes de cadrage et synthèses décisionnelles construits sur votre problématique : méthode rigoureuse, sources explicitées et restitutions utilisables en comité."
        icon={FileSearch}
        kpis={[
          { label: "Objectif", value: "Clarté & arbitrage" },
          { label: "Formats", value: "Note, flash ou dossier", hint: "selon la profondeur et l'échéance" },
          { label: "Livrable", value: "Orienté décision" },
        ]}
        intro="Nous structurons la question, collectons et croisons les éléments utiles, puis rendons une lecture partagée : options, implications, risques et suites possibles — sans surproduction de slides."
        audiences={[
          "Directions qui doivent trancher sur un investissement, un partenariat ou une réorganisation sans disposer encore d'une vision consolidée.",
          "Projets transverses (offre, organisation, SI) nécessitant une base factuelle commune avant d'engager les équipes.",
          "Instances de gouvernance qui exigent un dossier solide pour valider une orientation ou informer des financeurs.",
        ]}
        outcomes={[
          "Cadrage de la problématique, périmètre d'analyse et hypothèses de travail documentés.",
          "Synthèse des enseignements, scénarios ou comparatifs avec critères de choix et niveau de confiance.",
          "Recommandations de suite : décisions à prendre, jalons et indicateurs de suivi suggérés.",
        ]}
        footer="Durée et moyens adaptés à l'urgence et à la sensibilité du sujet. Nous privilégions les allers-retours courts avec vos experts métiers pour éviter les analyses déconnectées du terrain."
      />

      <OfferChapter
        id="recherche-financements"
        index={3}
        title="Recherche de financements —"
        titleAccent="dossiers & montage"
        lead="Identification des leviers adaptés à votre projet (public, privé, dette, subvention, accompagnement bancaire), structuration du dossier et préparation des échanges avec les financeurs."
        icon={Landmark}
        kpis={[
          { label: "Objectif", value: "Financement aligné" },
          { label: "Couverture", value: "Cartographie & priorisation", hint: "des financeurs et canaux pertinents" },
          { label: "Livrable", value: "Dossier & pitch" },
        ]}
        intro="Après cadrage du besoin et du modèle économique, nous vous aidons à prioriser les pistes crédibles, à assembler les éléments attendus et à présenter un récit cohérent pour les décideurs financiers."
        audiences={[
          "Dirigeants et directions financières qui préparent une levée, un refinancement ou un investissement lourd.",
          "Structures porteuses de projets d'investissement public ou d'intérêt général (équipements, transformation, innovation).",
          "Projets nécessitant le cumul de plusieurs sources (subvention, prêt, fonds propres, garanties).",
        ]}
        outcomes={[
          "Cartographie des financements possibles avec conditions, échéancier indicatif et niveau de maturité requis.",
          "Plan de dossier : annexes, indicateurs, business plan ou note d'investissement selon le canal visé.",
          "Préparation aux rendez-vous : argumentaire, Q&A probables et alignement COMEX / sponsor.",
        ]}
        quote="Un dossier de financement, ce n'est pas remplir des formulaires : c'est raconter un projet de façon crédible, vérifiable et cohérent avec vos engagements."
        footer="Nous ne substituons pas aux décisions des financeurs ; nous réduisons le flou, le délai de préparation et le risque d'aller voir le mauvais interlocuteur avec un dossier incomplet."
      />

      <TestimonialsSection />
    </SiteLayout>
  );
};

export default OffresPage;
