import case1 from "@/assets/case-study-1.jpg";
import case2 from "@/assets/case-study-2.jpg";
import case3 from "@/assets/case-study-3.jpg";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    img: case1,
    title: "Transformation organisationnelle",
    tag: "Stratégie",
    desc: "Redéfinition du modèle opérationnel, clarification des rôles et plan de conduite du changement pour sécuriser la montée en charge.",
  },
  {
    img: case2,
    title: "Développement international",
    tag: "Expansion",
    desc: "Étude de marché, scénarios d'implantation et partenariats : feuille de route priorisée et indicateurs de succès à 24 mois.",
  },
  {
    img: case3,
    title: "Optimisation opérationnelle",
    tag: "Performance",
    desc: "Cartographie des processus, levier de marge et rituels de pilotage : gains de productivité suivis trimestriellement avec la direction.",
  },
];

const CaseStudiesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="etudes" className="py-24 md:py-32 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 max-w-2xl mx-auto">
          <p className="eyebrow">Études de cas</p>
          <h2 className="section-title mb-4">Des missions à fort impact</h2>
          <p className="section-lead mx-auto">
            Exemples représentatifs de problématiques traitées — chaque mission fait l&apos;objet d&apos;un cadrage confidentiel adapté à votre contexte.
          </p>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <a
              key={c.title}
              href="#contact"
              className={`group block overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="overflow-hidden h-56 relative">
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.08] group-hover:brightness-105"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {c.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 tracking-tight">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
