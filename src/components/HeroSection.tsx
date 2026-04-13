import { useState } from "react";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroPoster from "@/assets/hero-meeting.jpg";
import logo from "@/assets/logo-cayribe-partners.png";

function resolveHeroVideoUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${import.meta.env.BASE_URL}${url.replace(/^\//, "")}`;
}

const HeroSection = () => {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoSrc = resolveHeroVideoUrl(heroVideo.url);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background video (fallback image if file missing or error) */}
      {!videoFailed ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <img src={heroPoster} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--hero-overlay)/0.92)] via-[hsl(var(--hero-overlay)/0.75)] to-[hsl(var(--hero-overlay)/0.5)]" />

      {/* Decorative geometric accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[hsl(var(--secondary)/0.08)] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      {/* Watermark logo */}
      <img
        src={logo}
        alt=""
        className="absolute right-10 bottom-20 w-72 opacity-[0.06] pointer-events-none hidden lg:block"
      />

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">Cabinet de conseil en stratégie</span>
          </div>

          <h1 className="animate-fade-up animation-delay-200 font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-8">
            Accélérateur de
            <span className="block text-secondary">performance</span>
          </h1>

          <p className="animate-fade-up animation-delay-400 text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.
          </p>

          <div className="animate-fade-up animation-delay-600 flex flex-col sm:flex-row gap-4">
            <a
              href="#expertises"
              className="group bg-secondary text-secondary-foreground px-8 py-4 rounded-xl font-semibold text-center hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Découvrir nos expertises
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
            <a
              href="#contact"
              className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-center hover:bg-primary-foreground/10 transition-all duration-300"
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
