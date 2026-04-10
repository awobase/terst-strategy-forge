import heroImg from "@/assets/hero-meeting.jpg";
import logo from "@/assets/logo-cayribe-partners.png";

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Réunion stratégique d'équipe dirigeante"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-overlay)/0.9)] to-[hsl(var(--hero-overlay)/0.5)]" />

      {/* Watermark logo */}
      <img
        src={logo}
        alt=""
        className="absolute right-10 bottom-10 w-64 opacity-10 pointer-events-none hidden md:block"
      />

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Construire des stratégies durables pour accélérer la performance des entreprises
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#expertises"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Découvrir nos expertises
            </a>
            <a
              href="#contact"
              className="bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
