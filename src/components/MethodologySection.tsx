import methodImg from "@/assets/methodology-board.jpg";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    num: "01",
    title: "Diagnostic 360",
    desc: "Analyse globale de votre projet ou de votre organisation à un instant T : marché, modèle économique, positionnement, ressources et enjeux de développement afin d'identifier clairement les priorités.",
  },
  {
    num: "02",
    title: "Construction de la feuille de route",
    desc: "Définition d'un plan d'actions structuré en fonction des objectifs, réaliste et priorisé pour sécuriser vos décisions et orienter votre développement.",
  },
  {
    num: "03",
    title: "Réalisation de la mission",
    desc: "Mise en œuvre opérationnelle des actions définies : études, ingénierie financière, structuration de projet et accompagnement stratégique selon vos besoins.",
  },
  {
    num: "04",
    title: "Suivi et assistance",
    desc: "Accompagnement dans la durée pour ajuster la stratégie, sécuriser les étapes clés et faciliter la concrétisation des résultats.",
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
            Étapes clés afin de garantir un accompagnement à la hauteur de vos attentes
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
