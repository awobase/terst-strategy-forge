import { Target, CircleDollarSign, Lightbulb, Network } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const expertises = [
  {
    icon: Target,
    title: "Accompagnement à la stratégie de développement",
    desc: "Idéation, étude de marché, positionnement stratégique, stratégie commerciale… Définir une vision claire, identifier les opportunités de croissance et construire une feuille de route adaptée à votre organisation.",
    color: "from-primary to-primary/80",
  },
  {
    icon: CircleDollarSign,
    title: "Ingénierie financière et recherche de financements",
    desc: "Prévisionnels financiers, prêts bancaires, subventions, crédit d'impôt, aides régionales et européennes, appels à projets publics, levées de fonds… Structurer votre modèle économique et mobiliser les financements publics et privés nécessaires à la réussite de votre projet.",
    color: "from-secondary to-secondary/80",
  },
  {
    icon: Lightbulb,
    title: "Management et structuration de projets innovants",
    desc: "Cadrage de projet, structuration du modèle économique, coordination des partenaires, accompagnement aux démarches d'innovation… Transformer une innovation en projet entrepreneurial structuré, piloté et opérationnel.",
    color: "from-primary to-primary/80",
  },
  {
    icon: Network,
    title: "Structuration de filières",
    desc: "Diagnostic sectoriel, mobilisation d'acteurs, réseaux, stratégies collectives, projets collaboratifs territoriaux… Fédérer les acteurs d'un secteur pour renforcer la coopération, créer de la valeur et développer durablement une filière économique.",
    color: "from-secondary to-secondary/80",
  },
];

const ExpertisesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="expertises" className="py-24 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/[0.04] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4">
        <div className="mb-16 md:mb-20 mx-auto max-w-3xl text-center">
          <p className="eyebrow">Nos expertises</p>
          <p className="mt-5 text-lg font-medium leading-relaxed text-foreground md:text-xl md:leading-relaxed">
            Afin de répondre aux enjeux rencontrés par les entreprises et projets aux Antilles&nbsp;: stratégie de
            développement, ingénierie financière, structuration de projets innovants, structuration de filières.
          </p>
        </div>
        <div ref={ref} className="grid sm:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {expertises.map((item, i) => (
            <article
              key={item.title}
              className={`rounded-2xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md`}
              >
                <item.icon className="h-7 w-7 text-primary-foreground" aria-hidden />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3 tracking-tight leading-snug">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertisesSection;
