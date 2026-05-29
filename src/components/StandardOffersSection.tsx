import { Link } from "react-router-dom";
import { ArrowRight, Rocket, TrendingUp, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/config/navigation";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

type StandardOffer = {
  id: string;
  title: string;
  lead: string;
  keyPoints: string[];
  price: string;
  interventions: string[];
  outcomeStatement: string;
  theme: "orange" | "blue";
  icon: LucideIcon;
};

const OFFERS: StandardOffer[] = [
  {
    id: "start",
    title: "Start",
    lead: "L’offre START s’adresse aux porteurs de projets souhaitant transformer une idée en projet viable, structuré et prêt à être lancé. Pensée comme un véritable parcours d’amorçage, elle permet de poser des bases solides avant la création ou le démarrage d’activité.",
    keyPoints: [
      "15 crédits*",
      "Engagement sur 6 mois",
      "Dédié aux projets en phase de création ou de structuration",
    ],
    price: "150 € TTC / mois",
    interventions: [
      "Sessions de brainstorming (intelligence collective)",
      "Structuration du projet",
      "Analyse de marché et étude de faisabilité",
      "Élaboration du business plan",
      "Préparation à la déclaration et au lancement du projet",
    ],
    outcomeStatement:
      "Un projet clair, structuré et financièrement crédible, prêt à être lancé et à convaincre partenaires et financeurs.",
    theme: "orange",
    icon: Rocket,
  },
  {
    id: "rise",
    title: "Rise",
    lead: "L’offre RISE est destinée aux entreprises et associations souhaitant franchir un cap : croissance, innovation, optimisation ou repositionnement stratégique. Cet accompagnement s’inscrit dans une logique de développement durable et maîtrisé de l’activité.",
    keyPoints: [
      "40 crédits*",
      "Engagement sur 12 mois",
      "Dédié aux entreprises et associations en développement",
    ],
    price: "190 € TTC / mois",
    interventions: [
      "Business development et stratégie de croissance",
      "Management de projet et innovation",
      "Analyse marketing et positionnement stratégique",
      "Optimisation opérationnelle et financière",
      "Relations public-privé et développement partenarial",
    ],
    outcomeStatement:
      "Une entreprise mieux organisée et un projet disposant d’outils concrets afin de soutenir durablement sa croissance.",
    theme: "blue",
    icon: TrendingUp,
  },
];

const cardTheme = {
  orange: {
    shell: "bg-secondary text-secondary-foreground border-secondary shadow-lg shadow-secondary/25",
    interventionBorder: "border-secondary/50",
    outcome: "border-white/25 bg-white/10",
    bullet: "bg-secondary",
    price: "text-black",
  },
  blue: {
    shell: "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25",
    interventionBorder: "border-white/30",
    outcome: "border-white/25 bg-white/10",
    bullet: "bg-primary",
    price: "text-white",
  },
} as const;

function OfferCard({ offer }: { offer: StandardOffer }) {
  const t = cardTheme[offer.theme];
  const Icon = offer.icon;

  return (
    <article
      id={offer.id}
      className={cn("scroll-mt-28 flex flex-col rounded-3xl border-2 p-6 md:p-8", t.shell)}
    >
      <div className="flex flex-col items-center text-center">
        <Icon className="h-12 w-12 md:h-14 md:w-14" strokeWidth={1.5} aria-hidden />
        <h3 className="mt-4 font-heading text-3xl font-bold uppercase tracking-wide md:text-4xl">{offer.title}</h3>
      </div>

      <p className="mt-6 text-center text-sm leading-relaxed opacity-95 md:text-base">{offer.lead}</p>

      <div className="mt-6 rounded-xl bg-white p-5 text-foreground shadow-inner md:p-6">
        <ul className="mx-auto max-w-xs space-y-4 text-sm leading-relaxed md:max-w-sm md:text-[0.95rem]">
          {offer.keyPoints.map((line) => (
            <li key={line} className="flex flex-col items-center gap-2 text-center">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", t.bullet)} aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn("mt-8 rounded-xl border-2 bg-white/95 p-5 text-foreground md:p-6", t.interventionBorder)}>
        <h4 className="text-center font-heading text-base font-bold md:text-lg">
          Exemple de thématiques abordées
        </h4>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed md:text-[0.95rem]">
          {offer.interventions.map((line) => (
            <li key={line} className="flex gap-2">
              <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", t.bullet)} aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <p
        className={cn(
          "mt-6 text-center font-heading text-2xl font-medium italic md:mt-8 md:text-[1.75rem] lg:text-3xl",
          t.price,
        )}
      >
        {offer.price}
      </p>

      <div className={cn("mt-6 rounded-xl border px-5 py-5 md:px-6", t.outcome)}>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">Ce que vous obtenez</p>
        <p className="mt-3 text-sm leading-relaxed md:text-base">{offer.outcomeStatement}</p>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to={ROUTES.contact}
          className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/25"
        >
          Discuter de cette offre
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

const StandardOffersSection = () => {
  const block = useInView();

  return (
    <section className="border-b border-border/40 bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-primary">Offres standard</p>
          <h2 className="section-title mt-2">Start &amp; Rise</h2>
        </div>

        <div
          ref={block.ref}
          className={cn(
            "mx-auto mt-12 grid max-w-6xl gap-8 transition-all duration-700 lg:mt-14 lg:grid-cols-2 lg:gap-10",
            block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-[10px] leading-relaxed text-muted-foreground sm:text-[11px]">
          * 1 crédit correspond à 1 heure d&apos;accompagnement par un consultant confirmé
        </p>
      </div>
    </section>
  );
};

export default StandardOffersSection;
