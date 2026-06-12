import SiteLayout from "@/components/SiteLayout";
import PageMeta from "@/components/PageMeta";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InterventionScopeSection from "@/components/InterventionScopeSection";
import MethodologySection from "@/components/MethodologySection";
import StatsSection from "@/components/StatsSection";
import PartnersSection from "@/components/PartnersSection";

const Index = () => {
  return (
    <SiteLayout isHome>
      <PageMeta
        title="Accueil"
        description="CAYRIBE PARTNERS : conseil en stratégie et performance — diagnostic, feuille de route et accompagnement des dirigeants."
      />
      <HeroSection />
      <AboutSection />
      <InterventionScopeSection />
      <MethodologySection />
      <StatsSection />
      <PartnersSection />
    </SiteLayout>
  );
};

export default Index;
