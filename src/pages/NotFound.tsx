import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PageMeta from "@/components/PageMeta";
import ChatbotWidget from "@/components/ChatbotWidget";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[hsl(222,42%,97%)] px-4">
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-[min(420px,65vw)] w-[min(420px,65vw)] rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden
      />
      <PageMeta
        title="Page introuvable"
        description="La page demandée n’existe pas sur le site CAYRIBE Partners. Retournez à l’accueil ou utilisez le menu."
      />
      <div className="relative max-w-md rounded-2xl border border-border/60 bg-background/90 px-8 py-10 text-center shadow-sm backdrop-blur-sm md:px-10 md:py-12">
        <p className="eyebrow mb-2 text-primary/90">Erreur</p>
        <h1 className="mb-3 font-heading text-5xl font-bold tracking-tight text-foreground">404</h1>
        <p className="mb-8 text-base leading-relaxed text-muted-foreground">Cette page n&apos;existe pas ou a été déplacée.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default NotFound;
