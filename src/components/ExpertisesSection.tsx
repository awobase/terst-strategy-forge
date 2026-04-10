import { Lightbulb, TrendingUp, Globe, BarChart3 } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const expertises = [
  {
    icon: Lightbulb,
    title: "Conseil en stratégie",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: TrendingUp,
    title: "Transformation et innovation",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: Globe,
    title: "Développement et expansion",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: BarChart3,
    title: "Performance et optimisation",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
  },
];

const ExpertisesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="expertises" className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Nos expertises</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Des solutions adaptées à vos enjeux
          </h2>
        </div>
        <div
          ref={ref}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {expertises.map((item, i) => (
            <div
              key={item.title}
              className={`bg-card rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 group ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertisesSection;
