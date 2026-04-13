import { Link } from "react-router-dom";
import logo from "@/assets/logo-cayribe-partners.png";
import { ROUTES } from "@/config/navigation";

/** Vue aérienne urbaine (Pexels) — ton corporate / conseil */
const HERO_YOUTUBE_VIDEO_ID = "OeS2otgJyFA";

const heroYoutubeEmbedSrc = `https://www.youtube-nocookie.com/embed/${HERO_YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_YOUTUBE_VIDEO_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&disablekb=1`;

const HeroSection = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fond vidéo YouTube (couvre tout l’écran,16:9) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <iframe
          title="Arrière-plan : vue aérienne sur un quartier d'affaires"
          src={heroYoutubeEmbedSrc}
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-full min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 border-0 scale-[1.01]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--hero-overlay)/0.75)] to-[hsl(var(--hero-overlay)/0.5)]" />

      {/* Decorative geometric accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[hsl(var(--secondary)/0.08)] to-transparent pointer-events-none" />

      {/* Watermark logo */}
      <img
        src={logo}
        alt=""
        className="absolute right-10 bottom-20 w-72 opacity-[0.06] pointer-events-none hidden lg:block"
      />

      <div className="container mx-auto px-4 relative z-10 py-28 md:py-36 lg:py-40">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2.5 bg-primary-foreground/[0.07] backdrop-blur-md border border-primary-foreground/15 rounded-full px-4 py-2 mb-8 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_12px_hsl(var(--secondary)/0.7)]" aria-hidden />
            <span className="text-primary-foreground/90 text-xs sm:text-sm font-semibold tracking-wide">
              Conseil en stratégie &amp; performance
            </span>
          </div>

          <h1 className="animate-fade-up animation-delay-200 font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-[1.05] mb-8 tracking-tight">
            Accélérateur de
            <span className="block text-secondary mt-1">performance</span>
          </h1>

          <p className="animate-fade-up animation-delay-400 text-primary-foreground/75 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl font-light md:font-normal">
            Nous aidons les dirigeants et leurs équipes à clarifier leur trajectoire, prioriser les leviers à fort impact
            et sécuriser l&apos;exécution — en Martinique, dans la Caraïbe et au-delà.
          </p>
          <p className="animate-fade-up animation-delay-400 text-primary-foreground/55 text-sm md:text-base max-w-xl mb-12 font-medium tracking-wide uppercase">
            Clarté décisionnelle · Cadre rigoureux · Suivi des résultats
          </p>

          <div className="animate-fade-up animation-delay-600 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#expertises"
              className="group flex items-center justify-center gap-2 rounded-lg bg-secondary px-8 py-4 text-center font-semibold text-secondary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary/30 active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--hero-overlay))]"
            >
              Découvrir nos expertises
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <Link
              to={ROUTES.contact}
              className="rounded-lg border border-primary-foreground/35 bg-primary-foreground/[0.04] px-8 py-4 text-center font-semibold text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground/15 hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--hero-overlay))]"
            >
              Échanger avec un consultant
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
