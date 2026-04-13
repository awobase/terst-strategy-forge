import { Lightbulb, TrendingUp, Globe, BarChart3, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const expertises = [
  {
    icon: Lightbulb,
    title: "Conseil en stratégie",
    desc: "Positionnement, choix de croissance, arbitrages et feuille de route : nous structurons la décision et clarifions les priorités à 6–36 mois.",
    color: "from-primary to-primary/80",
  },
  {
    icon: TrendingUp,
    title: "Transformation & innovation",
    desc: "Modèles d'affaires, offres, organisation et culture : nous concevons des trajectoires réalistes et un plan de déploiement mesurable.",
    color: "from-secondary to-secondary/80",
  },
  {
    icon: Globe,
    title: "Développement & expansion",
    desc: "Nouveaux marchés, partenariats et montées en charge : cadrage commercial, scénarios et mise en conformité opérationnelle.",
    color: "from-primary to-primary/80",
  },
  {
    icon: BarChart3,
    title: "Performance & optimisation",
    desc: "Pilotage, indicateurs, productivité et marges : identification des leviers, quick wins et système de suivi pour l'équipe dirigeante.",
    color: "from-secondary to-secondary/80",
  },
];

const ExpertisesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="expertises" className="py-24 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/[0.04] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <p className="eyebrow">Nos expertises</p>
          <h2 className="section-title mb-4">
            Des solutions alignées sur <span className="text-gradient-accent">vos enjeux</span>
          </h2>
          <p className="section-lead mx-auto">
            Quatre domaines d&apos;intervention pour couvrir le cycle stratégique : diagnostic, design, déploiement et pilotage de la performance.
          </p>
        </div>
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {expertises.map((item, i) => (
            <a
              key={item.title}
              href="#contact"
              className={`group block rounded-2xl border border-border/50 bg-card p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} shadow-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-lg`}
              >
                <item.icon className="h-7 w-7 text-primary-foreground" aria-hidden />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3 tracking-tight">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.desc}</p>
              <div className="flex items-center gap-1.5 text-primary text-sm font-semibold">
                Échanger sur ce besoin{" "}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertisesSection;
