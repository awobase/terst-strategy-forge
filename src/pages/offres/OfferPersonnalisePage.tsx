import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { crumbsOffres, relatedOffres } from "@/config/breadcrumbs";

const OfferPersonnalisePage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offre personnalisée"
        description="Mission sur-mesure : conseil en stratégie et performance à la carte. Cadrage, équipe projet et calendrier adaptés à votre contexte avec CAYRIBE Partners."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsOffres("Offre personnalisée")}
        title="Offre personnalisée"
        description="Lorsque votre enjeu ne rentre pas dans un standard — alliance, crise, sujet transverse ou haute confidentialité — nous assemblons une équipe et une méthode sur mesure."
        highlights={[
          { k: "Périmètre", v: "Mission à la carte" },
          { k: "Cadre", v: "Confidentialité renforcée" },
          { k: "Suite", v: "Proposition après cadrage" },
        ]}
      />
      <InteriorArticle tone="editorial">
        <p>
          Après un <strong>entretien de cadrage</strong> (offert ou forfaitaire selon le contexte), nous vous remettons une
          proposition détaillée : périmètre, livrables, profils, planning et budget transparent.
        </p>
        <h2>Exemples de missions</h2>
        <ul>
          <li>Conseil au comité de direction sur une décision majeure (M&amp;A, arbitrage, sortie de crise).</li>
          <li>Accompagnement d’un sponsor interne sur un programme multi-années.</li>
          <li>Due diligence stratégique ou organisationnelle ciblée.</li>
        </ul>
        <h2>Engagements</h2>
        <ul>
          <li>Confidentialité renforcée et clauses adaptées à votre juridique.</li>
          <li>Facturation au temps passé, au forfait ou hybride — validée en amont.</li>
          <li>Revue à mi-parcours avec ajustement documenté des priorités.</li>
        </ul>
      </InteriorArticle>
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages links={[...relatedOffres.personnalise]} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default OfferPersonnalisePage;
