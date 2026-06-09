import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-cayribe-partners.png";
import { ROUTES } from "@/config/navigation";
import { OG_IMAGE_PATH } from "@/config/site";

const HERO_VIDEO_SRC = "/videos/rendu-header.mp4";
const HERO_VIDEO_POSTER = OG_IMAGE_PATH;

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      void video.play().catch(() => {
        /* autoplay bloqué par le navigateur — fond statique via overlay */
      });
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  return (
    <section id="accueil" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_VIDEO_POSTER}
          src={HERO_VIDEO_SRC}
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--hero-overlay)/0.75)] to-[hsl(var(--hero-overlay)/0.5)]" />

      {/* Decorative geometric accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[hsl(var(--secondary)/0.08)] to-transparent" />

      {/* Watermark logo */}
      <img
        src={logo}
        alt=""
        className="pointer-events-none absolute bottom-20 right-10 hidden w-72 opacity-[0.06] lg:block"
      />

      <div className="container relative z-10 mx-auto px-4 py-28 md:py-36 lg:py-40">
        <div className="max-w-3xl">
          <div className="animate-fade-up mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.07] px-4 py-2 shadow-sm backdrop-blur-md">
            <div
              className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_12px_hsl(var(--secondary)/0.7)]"
              aria-hidden
            />
            <span className="text-xs font-semibold tracking-wide text-primary-foreground/90 sm:text-sm">
              Conseil en stratégie marketing &amp; financière
            </span>
          </div>

          <h1 className="animate-fade-up animation-delay-200 mb-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-primary-foreground md:text-5xl lg:text-6xl xl:text-7xl">
            Partenaire de structuration et de
            <span className="mt-1 block text-secondary">développement</span>
          </h1>

          <p className="animate-fade-up animation-delay-300 mb-6 max-w-2xl text-base font-medium tracking-wide text-primary-foreground/85 md:text-lg">
            Décider mieux. Structurer. Accélérer.
          </p>

          <p className="animate-fade-up animation-delay-400 mb-12 max-w-2xl text-lg font-light leading-relaxed text-primary-foreground/75 md:text-xl md:font-normal">
            De l&apos;idée au changement d&apos;échelle, nous accompagnons les porteurs de projets, dirigeants
            d&apos;entreprises et d&apos;associations en Guadeloupe et en Martinique.
          </p>

          <div className="animate-fade-up animation-delay-600 flex flex-col gap-3 sm:flex-row sm:gap-4">
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
