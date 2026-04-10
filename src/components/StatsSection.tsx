import { useInView } from "@/hooks/useInView";
import { Building2, Clock, MapPin, ThumbsUp } from "lucide-react";

const stats = [
  { value: "120+", label: "entreprises accompagnées", icon: Building2 },
  { value: "15", label: "ans d'expérience cumulée", icon: Clock },
  { value: "8", label: "pays d'intervention", icon: MapPin },
  { value: "95%", label: "de satisfaction client", icon: ThumbsUp },
];

const StatsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-28 bg-gradient-to-br from-primary via-primary to-[hsl(222,65%,30%)] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Chiffres clés</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
            Notre impact en chiffres
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <stat.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
              <p className="text-primary-foreground/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-primary-foreground/50 text-center max-w-2xl mx-auto text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
