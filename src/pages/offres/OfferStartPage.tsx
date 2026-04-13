import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { crumbsOffres, relatedOffres } from "@/config/breadcrumbs";

const OfferStartPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offre Start"
        description="Start : diagnostic stratégique et cadrage pour PME et directions projet. Livrables, durée indicative et premier plan d’actions avec CAYRIBE Partners."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsOffres("Start")}
        title="Start"
        description="Poser un diagnostic partagé, cadrer la problématique et sortir avec une feuille de route réaliste — idéal pour lancer une transformation ou préparer une levée de fonds."
        highlights={[
          { k: "Objectif", v: "Diagnostic & feuille de route" },
          { k: "Durée", v: "4 à 8 semaines" },
          { k: "Idéal", v: "Avant investissement majeur" },
        ]}
      />
      <InteriorArticle tone="editorial">
        <p>
          <strong>Start</strong> est conçu pour les organisations qui ont besoin de clarté avant d’engager des moyens importants
          : cadrage des enjeux, lecture des données existantes, entretiens ciblés et restitution synthétique.
        </p>
        <h2>À qui s’adresse cette offre ?</h2>
        <ul>
          <li>Dirigeants et COMEX qui veulent valider une direction avant d’investir.</li>
          <li>Directions générales en phase de restructuration ou de croissance hétérogène.</li>
          <li>Projets transverses (SI, organisation, offre) nécessitant un alignement initial.</li>
        </ul>
        <h2>Ce que vous obtenez</h2>
        <ul>
          <li>Un diagnostic structuré (forces, fragilités, priorités).</li>
          <li>Une cartographie des options et des risques associés.</li>
          <li>Une recommandation de suite : missions, budget d’effort, jalons à 90 jours.</li>
        </ul>
        <h2>Format indicatif</h2>
        <p>
          4 à 8 semaines selon la taille de l’entreprise et la disponibilité des parties prenantes. Ateliers courts, livrables
          lisibles par le CODIR, pas de « boîte noire ».
        </p>
      </InteriorArticle>
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages links={[...relatedOffres.start]} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default OfferStartPage;
