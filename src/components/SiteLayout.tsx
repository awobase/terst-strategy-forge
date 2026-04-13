import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

type SiteLayoutProps = {
  children: React.ReactNode;
  /** Page d&apos;accueil : pas de padding haut sur le main (hero plein écran) */
  isHome?: boolean;
};

const SiteLayout = ({ children, isHome = false }: SiteLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
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
