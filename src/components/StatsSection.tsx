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
    <section className="py-24 md:py-32 bg-gradient-to-br from-primary via-primary to-[hsl(222,58%,26%)] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
          <p className="text-secondary font-semibold text-[0.7rem] sm:text-xs uppercase tracking-[0.2em] mb-3">Chiffres clés</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground tracking-tight">
            Notre impact en chiffres
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group text-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.06] p-8 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:border-primary-foreground/25 hover:bg-primary-foreground/[0.1] hover:shadow-lg ${
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <stat.icon className="mx-auto mb-4 h-8 w-8 text-secondary transition-transform duration-300 ease-out group-hover:scale-110" />
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
              <p className="text-primary-foreground/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-primary-foreground/55 text-center max-w-2xl mx-auto text-sm leading-relaxed">
          Des équipes engagées, des missions cadrées et des résultats suivis dans la durée — la confiance se construit sur la qualité d&apos;exécution.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
