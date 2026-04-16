import { Link } from "react-router-dom";
import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import AboutSection from "@/components/AboutSection";
import InteriorArticle from "@/components/InteriorArticle";
import PartnersSection from "@/components/PartnersSection";
import { ROUTES } from "@/config/navigation";

const QuiSommesNousPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Qui sommes-nous"
        description="Présentation, équipe et partenaires CAYRIBE Partners : cabinet de conseil en stratégie et performance en Martinique et dans la Caraïbe."
      />

      <section id="presentation" className="scroll-mt-32">
        <PageHero
          variant="editorial"
          title="Présentation du cabinet"
          description="Clarifier les enjeux, cadrer les décisions utiles et donner aux équipes les moyens d'exécuter - avec la proximité d'un cabinet indépendant et l'exigence d'un conseil de direction."
          highlights={[
            { k: "Indépendant", v: "Cabinet à taille humaine" },
            { k: "Zone", v: "Martinique & Caraïbe" },
            { k: "Focus", v: "Stratégie & exécution" },
          ]}
        />
        <AboutSection variant="presentation" />
      </section>

      <section id="equipe" className="scroll-mt-32">
        <PageHero
          variant="editorial"
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
            Nous privilégions la <strong>proximité</strong> et la <strong>responsabilité</strong> : vos interlocuteurs restent les
            mêmes tout au long de la mission, avec un pilotage transparent des livrables et des arbitrages.
          </p>
          <h2>Profils</h2>
          <ul>
            <li>Associés et consultants seniors : stratégie, organisation, performance financière.</li>
            <li>Experts associés : international, digital, conduite du changement, secteurs réglementés.</li>
          </ul>
          <h2>Façon de travailler</h2>
          <p>
            Réunions courtes, comptes rendus actionnables, outils partagés (tableaux de bord, RACI, plans de communication).
            Nous formons vos équipes pour que la dynamique se poursuive après notre intervention.
          </p>
          <h2>Rejoindre le cabinet</h2>
          <p>
            Les candidatures spontanées sont les bienvenues : consultez la page{" "}
            <Link to={`${ROUTES.contact}?objet=candidature`}>Contacts</Link> et sélectionnez l'objet "Candidature ou stage".
          </p>
        </InteriorArticle>
      </section>

      <section id="partenaires" className="scroll-mt-32">
        <PageHero
          variant="editorial"
          title="Partenaires"
          description="Des organisations publiques et privées nous confient des sujets sensibles : nous remercions chaque client pour la qualité des échanges et la confiance accordée."
          highlights={[
            { k: "Clients", v: "Public & privé" },
            { k: "Zone", v: "Martinique & Caraïbe" },
            { k: "Engagement", v: "Confiance durable" },
          ]}
        />
        <PartnersSection />
      </section>
    </SiteLayout>
  );
};

export default QuiSommesNousPage;
