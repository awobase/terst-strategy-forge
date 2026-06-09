import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import StructuredData from "@/components/StructuredData";

type SiteLayoutProps = {
  children: React.ReactNode;
  /** Page d&apos;accueil : pas de padding haut sur le main (hero plein écran) */
  isHome?: boolean;
};

const SiteLayout = ({ children, isHome = false }: SiteLayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <Navbar />
      <main
        id="contenu-principal"
        className={cn("flex-1 flex flex-col", !isHome && "pt-[4.25rem] md:pt-20")}
      >
        {children}
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default SiteLayout;
