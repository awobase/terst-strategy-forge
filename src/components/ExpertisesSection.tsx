import { Lightbulb, TrendingUp, Globe, BarChart3, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const expertises = [
  {
    icon: Lightbulb,
    title: "Conseil en stratégie",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    color: "from-primary to-primary/80",
  },
  {
    icon: TrendingUp,
    title: "Transformation et innovation",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    color: "from-secondary to-secondary/80",
  },
  {
    icon: Globe,
    title: "Développement et expansion",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    color: "from-primary to-primary/80",
  },
  {
    icon: BarChart3,
    title: "Performance et optimisation",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    color: "from-secondary to-secondary/80",
  },
];

const ExpertisesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="expertises" className="py-28 bg-surface relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/[0.04] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Nos expertises</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Des solutions adaptées à <span className="text-gradient-accent">vos enjeux</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {expertises.map((item, i) => (
            <div
              key={item.title}
              className={`group bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                <item.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertisesSection;
