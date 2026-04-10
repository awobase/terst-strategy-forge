import { useInView } from "@/hooks/useInView";

const stats = [
  { value: "120+", label: "entreprises accompagnées" },
  { value: "15", label: "ans d'expérience cumulée" },
  { value: "8", label: "pays d'intervention" },
  { value: "95%", label: "de satisfaction client" },
];

const StatsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-24 bg-primary">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p className="font-heading text-5xl md:text-6xl font-bold text-primary-foreground mb-2">{stat.value}</p>
              <p className="text-primary-foreground/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-primary-foreground/60 text-center max-w-2xl mx-auto text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
};

export default StatsSection;
