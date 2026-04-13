import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import ContactSection from "@/components/ContactSection";
import RelatedPages from "@/components/RelatedPages";
import { ROUTES } from "@/config/navigation";
import { crumbsContact } from "@/config/breadcrumbs";

const ContactPage = () => {
  return (
    <SiteLayout>
      <PageMeta title="Contactez-nous" description="CAYRIBE Partners — prise de contact." />
      <PageHero variant="editorial" breadcrumbs={crumbsContact} title="Contactez-nous" />
      <ContactSection
        hideIntro
        syncObjetFromSearchParams
        sectionId="contact-formulaire"
        className="border-b border-border/40 bg-background py-12 md:py-20"
      />
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RelatedPages
            title="Liens utiles"
            links={[
              { label: "Offre Start", to: ROUTES.offres.start },
              { label: "Présentation du cabinet", to: ROUTES.quiSommesNous.presentation },
              { label: "Équipe", to: ROUTES.quiSommesNous.equipe },
            ]}
          />
        </div>
      </section>
    </SiteLayout>
  );
};

export default ContactPage;
