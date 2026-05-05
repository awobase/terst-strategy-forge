import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import PartnersSection from "@/components/PartnersSection";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { ROUTES } from "@/config/navigation";
import { crumbsQuiSommesNous } from "@/config/breadcrumbs";

const PartenairesPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Partenaires"
        description="Ils nous font confiance : références CAYRIBE Partners. Logos et témoignages actualisés au fil des missions, dans le respect de la confidentialité."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsQuiSommesNous("Partenaires")}
        title="Partenaires"
        description="Des organisations publiques et privées nous confient des sujets sensibles : nous remercions chaque client pour la qualité des échanges et la confiance accordée."
        highlights={[
          { k: "Clients", v: "Public & privé" },
          { k: "Expertise", v: "Stratégie & performance" },
          { k: "Engagement", v: "Confiance durable" },
        ]}
      />
      <PartnersSection />
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages
            links={[
              { label: "Équipe", to: ROUTES.quiSommesNous.equipe },
              { label: "Présentation du cabinet", to: ROUTES.quiSommesNous.presentation },
              { label: "Prendre contact", to: ROUTES.contact },
            ]}
          />
        </div>
      </section>
    </SiteLayout>
  );
};

export default PartenairesPage;
