import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import AboutSection from "@/components/AboutSection";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { ROUTES } from "@/config/navigation";
import { crumbsQuiSommesNous } from "@/config/breadcrumbs";

const PresentationPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Présentation du cabinet"
        description="CAYRIBE Partners : cabinet de conseil en stratégie et performance. Méthodes, valeurs et accompagnement des dirigeants."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsQuiSommesNous("Présentation du cabinet")}
        title="Présentation du cabinet"
        description="Clarifier les enjeux, cadrer les décisions utiles et donner aux équipes les moyens d’exécuter — avec la proximité d’un cabinet indépendant et l’exigence d’un conseil de direction."
        highlights={[
          { k: "Indépendant", v: "Cabinet à taille humaine" },
          { k: "Méthode", v: "Cadrage & livrables" },
          { k: "Focus", v: "Stratégie & exécution" },
        ]}
      />
      <AboutSection variant="presentation" />
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages
            links={[
              { label: "Découvrir l’offre Start", to: ROUTES.offres.start },
              { label: "Notre équipe", to: ROUTES.quiSommesNous.equipe },
              { label: "Nous écrire", to: ROUTES.contact },
            ]}
          />
        </div>
      </section>
    </SiteLayout>
  );
};

export default PresentationPage;
