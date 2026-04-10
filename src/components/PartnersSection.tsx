import { useInView } from "@/hooks/useInView";

const partners = [
  "Groupe Antilles", "CaribTech Solutions", "Océan Invest", "Tropical Finance",
  "Meridian Group", "Island Capital", "ArcBlue Conseil", "Solaris Corp",
];

const PartnersSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 bg-background border-y border-border/50">
      <div ref={ref} className="container mx-auto px-4">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Nos partenaires</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Ils nous font confiance
          </h2>
        </div>

        {/* Scrolling logos marquee */}
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex scroll-marquee">
            {[...partners, ...partners].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center h-20"
              >
                <div className="bg-surface border border-border/50 rounded-xl px-8 py-4 hover:shadow-md hover:border-primary/20 transition-all duration-300">
                  <span className="font-display text-lg font-semibold text-muted-foreground whitespace-nowrap">
                    {name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
