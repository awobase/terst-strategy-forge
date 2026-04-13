import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { crumbsOffres, relatedOffres } from "@/config/breadcrumbs";

const OfferRisePage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offre Rise"
        description="Rise : accélération stratégique, mise à l’échelle et pilotage de la performance. CAYRIBE Partners accompagne l’exécution et les équipes dirigeantes."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsOffres("Rise")}
        title="Rise"
        description="Passer de la stratégie papier aux résultats : priorisation des leviers, rituels de pilotage et accompagnement des équipes jusqu’aux premiers gains mesurables."
        highlights={[
          { k: "Objectif", v: "Exécution & premiers gains" },
          { k: "Durée", v: "3 à 9 mois" },
          { k: "Focus", v: "Rituels & indicateurs" },
        ]}
      />
      <InteriorArticle tone="editorial">
        <p>
          <strong>Rise</strong> prolonge le diagnostic : nous co-construisons le plan d’actions, clarifions les rôles (RACI),
          installons les indicateurs utiles et sécurisons la cadence de décision.
        </p>
        <h2>Quand choisir Rise ?</h2>
        <ul>
          <li>La direction est fixée, mais l’exécution patine ou se dispersent les efforts.</li>
          <li>Vous devez industrialiser une offre, un canal ou une organisation après un proof of concept.</li>
          <li>Vous préparez une intégration post-fusion ou une montée en charge internationale.</li>
        </ul>
        <h2>Livrables types</h2>
        <ul>
          <li>Roadmap priorisée (quick wins / structurants) et budget d’effort.</li>
          <li>Tableaux de bord et règles de gouvernance (qui décide quoi, quand).</li>
          <li>Plans de communication interne et accompagnement des managers clés.</li>
        </ul>
        <h2>Cadence</h2>
        <p>
          Missions de 3 à 9 mois en moyenne, avec points de contrôle mensuels et ajustements documentés. Nous restons
          pragmatiques : peu de slides, beaucoup d’arbitrages et de suivi terrain.
        </p>
      </InteriorArticle>
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages links={[...relatedOffres.rise]} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default OfferRisePage;
