import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { ROUTES } from "@/config/navigation";
import { crumbsQuiSommesNous } from "@/config/breadcrumbs";

const EquipePage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Équipe"
        description="L’équipe CAYRIBE PARTNERS : consultants en stratégie et performance, engagés aux côtés des dirigeants."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsQuiSommesNous("Équipe")}
        title="Équipe"
        description="Une équipe compacte, senior sur les sujets stratégiques, complétée par un réseau de spécialistes mobilisés selon vos besoins."
        highlights={[
          { k: "Mode", v: "Équipe compacte" },
          { k: "Expertise", v: "Stratégie & performance" },
          { k: "Mobilisation", v: "Spécialistes au besoin" },
        ]}
      />
      <InteriorArticle tone="editorial">
        <p>
          Nous privilégions la <strong>proximité</strong> et la <strong>responsabilité</strong> : vos interlocuteurs restent
          les mêmes tout au long de la mission, avec un pilotage transparent des livrables et des arbitrages.
        </p>
        <h2>Profils</h2>
        <ul>
          <li>Associés et consultants seniors : stratégie, organisation, performance financière.</li>
          <li>Experts associés : digital, conduite du changement, secteurs réglementés, enjeux multi-sites.</li>
        </ul>
        <h2>Façon de travailler</h2>
        <p>
          Réunions courtes, comptes rendus actionnables, outils partagés (tableaux de bord, RACI, plans de communication).
          Nous formons vos équipes pour que la dynamique se poursuive après notre intervention.
        </p>
        <h2>Rejoindre le cabinet</h2>
        <p>
          Consultants indépendants et candidatures spontanées pour les stages sont les bienvenues. Pour nous
          présenter votre profil, votre candidature de stage ou échanger sur une collaboration, consultez la page{" "}
          <Link to={ROUTES.contact}>Contact</Link>.
        </p>
      </InteriorArticle>
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages
            links={[
              { label: "Qui sommes-nous", to: ROUTES.quiSommesNousRoot },
              { label: "Présentation du cabinet", to: ROUTES.quiSommesNous.presentation },
              { label: "Nous écrire", to: ROUTES.contact },
            ]}
          />
        </div>
      </section>
    </SiteLayout>
  );
};

export default EquipePage;
