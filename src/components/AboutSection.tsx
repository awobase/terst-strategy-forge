import aboutImg from "@/assets/about-dashboard.jpg";
import { useInView } from "@/hooks/useInView";

const AboutSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="apropos" className="py-24 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={aboutImg}
            alt="Consultant analysant un dashboard stratégique"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1280}
            height={854}
          />
        </div>
        <div>
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">À propos</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Un partenaire stratégique pour accompagner votre croissance
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
