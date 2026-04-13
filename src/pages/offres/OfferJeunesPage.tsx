import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import NextStepCTA from "@/components/NextStepCTA";
import RelatedPages from "@/components/RelatedPages";
import { crumbsOffres, relatedOffres } from "@/config/breadcrumbs";

const OfferJeunesPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offres jeunes"
        description="Programmes jeunes : mentorat stratégie & entrepreneuriat, ateliers et parcours d’accompagnement avec CAYRIBE Partners en Martinique et Caraïbe."
      />
      <PageHero
        variant="editorial"
        breadcrumbs={crumbsOffres("Offres jeunes")}
        title="Offres jeunes"
        description="Des formats courts et accessibles pour structurer un projet, préparer un pitch ou franchir un cap professionnel — pensés pour les talents en démarrage ou en reconversion."
        highlights={[
          { k: "Formats", v: "Ateliers & mentorat" },
          { k: "Public", v: "Jeunes & structures" },
          { k: "Rythme", v: "Sessions courtes" },
        ]}
      />
      <InteriorArticle tone="editorial">
        <p>
          Nous croyons au transfert de méthode : <strong>offres jeunes</strong> reprend les fondamentaux du conseil
          (cadrage, priorisation, communication de projet) dans des formats adaptés aux contraintes de temps et de budget.
        </p>
        <h2>Publics concernés</h2>
        <ul>
          <li>Jeunes entrepreneurs, porteurs de projet ou associatifs.</li>
          <li>Étudiants en dernière année et jeunes diplômés en phase d’insertion.</li>
          <li>Structures qui accompagnent l’emploi des jeunes (incubateurs, programmes régionaux).</li>
        </ul>
        <h2>Formats possibles</h2>
        <ul>
          <li>Bootcamps 1–2 jours (stratégie, pitch, plan d’actions 90 jours).</li>
          <li>Mentorat individuel sur 6 à 12 séances.</li>
          <li>Ateliers collectifs avec études de cas locales.</li>
        </ul>
        <h2>Modalités</h2>
        <p>
          Les programmes peuvent être co-financés avec nos partenaires institutionnels ou entreprises mécènes. Contactez-nous
          pour une proposition adaptée à votre promotion ou votre territoire.
        </p>
      </InteriorArticle>
      <section className="border-t border-border/50 bg-surface/40 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <NextStepCTA />
          <RelatedPages links={[...relatedOffres.jeunes]} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default OfferJeunesPage;
