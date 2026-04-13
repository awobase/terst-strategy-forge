import methodImg from "@/assets/methodology-board.jpg";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    num: "01",
    title: "Diagnostic stratégique",
    desc: "Immersion, entretiens et données : nous cadrons la problématique, cartographions les forces / fragilités et isolons les causes racines.",
  },
  {
    num: "02",
    title: "Construction de la stratégie",
    desc: "Scénarios, arbitrages et design d'options : recommandations chiffrées quand c'est pertinent, avec risques, conditions de succès et planning.",
  },
  {
    num: "03",
    title: "Mise en œuvre opérationnelle",
    desc: "Roadmap priorisée, rôles RACI, rituels de pilotage et accompagnement des équipes pour transformer la feuille de route en actions.",
  },
  {
    num: "04",
    title: "Suivi de performance",
    desc: "Tableaux de bord, revues de gestion et ajustements : nous sécurisons l'adhésion et mesurons l'impact dans le temps.",
  },
];

const MethodologySection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="methodologie" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <p className="eyebrow">Méthodologie</p>
          <h2 className="section-title mb-4">Une approche structurante et pragmatique</h2>
          <p className="section-lead mx-auto">
            Une progression claire du diagnostic au suivi : transparence sur les livrables, décisions documentées et transfert de méthode vers vos équipes.
          </p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="group overflow-hidden rounded-2xl shadow-xl ring-1 ring-border/40">
              <img
                src={methodImg}
                alt="Consultants autour d'un tableau stratégique"
                className="w-full object-cover transition-[transform,filter] duration-700 ease-out will-change-transform group-hover:scale-[1.04] group-hover:brightness-[1.03]"
                loading="lazy"
                width={1280}
                height={854}
              />
            </div>
          </div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex gap-6 transition-all duration-700 relative ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-full bg-border" />
                )}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md shadow-primary/15 relative z-10">
                  <span className="text-primary-foreground font-bold text-sm">{step.num}</span>
                </div>
                <div className="pb-10">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
