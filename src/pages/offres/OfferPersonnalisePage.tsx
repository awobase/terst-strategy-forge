import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { crumbsOffres, relatedOffres } from "@/config/breadcrumbs";

/** Ancienne route /offres/personnalise — redirigée vers /offres#recherche-financements ; page conservée pour cohérence du code. */
const OfferPersonnalisePage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Recherche de financements"
        description="Recherche et montage de financements : cartographie des leviers, structuration de dossier et préparation des échanges avec CAYRIBE PARTNERS."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsOffres("Recherche de financements")}
        title="Recherche de financements"
        description="Identification des leviers adaptés à votre projet, structuration du dossier et préparation des échanges avec les financeurs."
        highlights={[
          { k: "Objectif", v: "Financement aligné" },
          { k: "Couverture", v: "Cartographie & priorisation" },
          { k: "Livrable", v: "Dossier & pitch" },
        ]}
      />
      <InteriorArticle tone="editorial">
        <p>
          Après cadrage du besoin et du modèle économique, nous vous aidons à prioriser les pistes crédibles et à
          assembler les éléments attendus pour présenter un récit cohérent aux décideurs financiers.
        </p>
        <h2>Publics concernés</h2>
        <ul>
          <li>Dirigeants et directions financières préparant une levée, un refinancement ou un investissement lourd.</li>
          <li>Structures porteuses de projets d&apos;investissement ou d&apos;intérêt général.</li>
          <li>
            Projets cumulant plusieurs sources (subventions, crédit d&apos;impôt, aides régionales et européennes,
            appels à projets publics, levées de fonds, prêts, fonds propres, garanties).
          </li>
        </ul>
        <h2>Ce que vous obtenez</h2>
        <ul>
          <li>Cartographie des financements possibles avec conditions et maturité requise.</li>
          <li>Plan de dossier et indicateurs selon le canal visé.</li>
          <li>Préparation aux rendez-vous : argumentaire et alignement sponsor / COMEX.</li>
        </ul>
      </InteriorArticle>
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages links={[...relatedOffres.rechercheFinancements]} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default OfferPersonnalisePage;
