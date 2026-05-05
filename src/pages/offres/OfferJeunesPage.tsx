import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { crumbsOffres, relatedOffres } from "@/config/breadcrumbs";

/** Ancienne route /offres/jeunes — redirigée vers /offres#etudes-personnalisees ; page conservée pour cohérence du code. */
const OfferJeunesPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Études personnalisées"
        description="Études et analyses sur mesure : notes de cadrage, benchmarks et synthèses décisionnelles avec CAYRIBE Partners."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsOffres("Études personnalisées")}
        title="Études personnalisées"
        description="Études, benchmarks et livrables orientés décision : méthode rigoureuse, sources explicitées et restitutions utilisables en comité."
        highlights={[
          { k: "Objectif", v: "Clarté & arbitrage" },
          { k: "Formats", v: "Note, flash ou dossier" },
          { k: "Livrable", v: "Orienté décision" },
        ]}
      />
      <InteriorArticle tone="editorial">
        <p>
          Nous structurons votre problématique, croisons les éléments utiles et rendons une lecture partagée : options,
          implications et suites possibles — sans surproduction de slides.
        </p>
        <h2>À qui s&apos;adresse cette offre ?</h2>
        <ul>
          <li>Directions qui doivent trancher sans vision consolidée (investissement, partenariat, réorganisation).</li>
          <li>Projets transverses nécessitant une base factuelle commune avant d&apos;engager les équipes.</li>
          <li>Instances de gouvernance qui exigent un dossier solide pour informer ou convaincre.</li>
        </ul>
        <h2>Ce que vous obtenez</h2>
        <ul>
          <li>Cadrage documenté, hypothèses de travail et périmètre d&apos;analyse.</li>
          <li>Synthèse, scénarios ou comparatifs avec critères de choix.</li>
          <li>Recommandations de suite : décisions, jalons et indicateurs suggérés.</li>
        </ul>
      </InteriorArticle>
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages links={[...relatedOffres.etudesPersonnalisees]} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default OfferJeunesPage;
