import aboutImg from "@/assets/about-dashboard.jpg";
import { useInView } from "@/hooks/useInView";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Expertise sectorielle approfondie",
  "Approche sur-mesure",
  "Résultats mesurables",
];

const AboutSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="apropos" className="py-28 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />

      <div
        ref={ref}
        className={`container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={aboutImg}
              alt="Consultant analysant un dashboard stratégique"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1280}
              height={854}
            />
          </div>
          {/* Floating accent card */}
          <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground rounded-2xl p-5 shadow-xl hidden md:block">
            <p className="font-heading text-3xl font-bold">15+</p>
            <p className="text-sm opacity-90">ans d'expertise</p>
          </div>
        </div>
        <div>
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">À propos</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Un partenaire stratégique pour accompagner votre <span className="text-gradient-primary">croissance</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <ul className="space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-foreground font-medium text-sm">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
