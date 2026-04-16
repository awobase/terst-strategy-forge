import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import InteriorArticle from "@/components/InteriorArticle";
import TestimonialsSection from "@/components/TestimonialsSection";

const OffresPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offres"
        description="Découvrez les offres Start, Rise, Offres jeunes et Offre personnalisée de CAYRIBE Partners."
      />

      <section id="start" className="scroll-mt-32">
        <PageHero
          variant="editorial"
          title="Start"
          description="Poser un diagnostic partagé, cadrer la problématique et sortir avec une feuille de route réaliste - idéal pour lancer une transformation ou préparer une levée de fonds."
          highlights={[
            { k: "Objectif", v: "Diagnostic & feuille de route" },
            { k: "Durée", v: "4 à 8 semaines" },
            { k: "Idéal", v: "Avant investissement majeur" },
          ]}
        />
        <InteriorArticle tone="editorial">
          <p>
            <strong>Start</strong> est conçu pour les organisations qui ont besoin de clarté avant d'engager des moyens
            importants : cadrage des enjeux, lecture des données existantes, entretiens ciblés et restitution synthétique.
          </p>
          <h2>A qui s'adresse cette offre ?</h2>
          <ul>
            <li>Dirigeants et COMEX qui veulent valider une direction avant d'investir.</li>
            <li>Directions générales en phase de restructuration ou de croissance hétérogène.</li>
            <li>Projets transverses (SI, organisation, offre) nécessitant un alignement initial.</li>
          </ul>
          <h2>Ce que vous obtenez</h2>
          <ul>
            <li>Un diagnostic structuré (forces, fragilités, priorités).</li>
            <li>Une cartographie des options et des risques associés.</li>
            <li>Une recommandation de suite : missions, budget d'effort, jalons à 90 jours.</li>
          </ul>
          <h2>Format indicatif</h2>
          <p>
            4 à 8 semaines selon la taille de l'entreprise et la disponibilité des parties prenantes. Ateliers courts,
            livrables lisibles par le CODIR, pas de "boîte noire".
          </p>
        </InteriorArticle>
      </section>

      <section id="rise" className="scroll-mt-32">
        <PageHero
          variant="editorial"
          title="Rise"
          description="Passer de la stratégie papier aux résultats : priorisation des leviers, rituels de pilotage et accompagnement des équipes jusqu'aux premiers gains mesurables."
          highlights={[
            { k: "Objectif", v: "Exécution & premiers gains" },
            { k: "Durée", v: "3 à 9 mois" },
            { k: "Focus", v: "Rituels & indicateurs" },
          ]}
        />
        <InteriorArticle tone="editorial">
          <p>
            <strong>Rise</strong> prolonge le diagnostic : nous co-construisons le plan d'actions, clarifions les rôles (RACI),
            installons les indicateurs utiles et sécurisons la cadence de décision.
          </p>
          <h2>Quand choisir Rise ?</h2>
          <ul>
            <li>La direction est fixée, mais l'exécution patine ou se dispersent les efforts.</li>
            <li>Vous devez industrialiser une offre, un canal ou une organisation après un proof of concept.</li>
            <li>Vous préparez une intégration post-fusion ou une montée en charge internationale.</li>
          </ul>
          <h2>Livrables types</h2>
          <ul>
            <li>Roadmap priorisée (quick wins / structurants) et budget d'effort.</li>
            <li>Tableaux de bord et règles de gouvernance (qui décide quoi, quand).</li>
            <li>Plans de communication interne et accompagnement des managers clés.</li>
          </ul>
          <h2>Cadence</h2>
          <p>
            Missions de 3 à 9 mois en moyenne, avec points de contrôle mensuels et ajustements documentés. Nous restons
            pragmatiques : peu de slides, beaucoup d'arbitrages et de suivi terrain.
          </p>
        </InteriorArticle>
      </section>

      <section id="offres-jeunes" className="scroll-mt-32">
        <PageHero
          variant="editorial"
          title="Offres jeunes"
          description="Des formats courts et accessibles pour structurer un projet, préparer un pitch ou franchir un cap professionnel - pensés pour les talents en démarrage ou en reconversion."
          highlights={[
            { k: "Formats", v: "Ateliers & mentorat" },
            { k: "Public", v: "Jeunes & structures" },
            { k: "Rythme", v: "Sessions courtes" },
          ]}
        />
        <InteriorArticle tone="editorial">
          <p>
            Nous croyons au transfert de méthode : <strong>offres jeunes</strong> reprend les fondamentaux du conseil dans des
            formats adaptés aux contraintes de temps et de budget.
          </p>
          <h2>Publics concernés</h2>
          <ul>
            <li>Jeunes entrepreneurs, porteurs de projet ou associatifs.</li>
            <li>Etudiants en dernière année et jeunes diplômés en phase d'insertion.</li>
            <li>Structures qui accompagnent l'emploi des jeunes (incubateurs, programmes régionaux).</li>
          </ul>
          <h2>Formats possibles</h2>
          <ul>
            <li>Bootcamps 1-2 jours (stratégie, pitch, plan d'actions 90 jours).</li>
            <li>Mentorat individuel sur 6 à 12 séances.</li>
            <li>Ateliers collectifs avec études de cas locales.</li>
          </ul>
          <h2>Modalités</h2>
          <p>
            Les programmes peuvent être co-financés avec nos partenaires institutionnels ou entreprises mécènes. Contactez-nous
            pour une proposition adaptée à votre promotion ou votre territoire.
          </p>
        </InteriorArticle>
      </section>

      <section id="offre-personnalisee" className="scroll-mt-32">
        <PageHero
          variant="editorial"
          title="Offre personnalisée"
          description="Lorsque votre enjeu ne rentre pas dans un standard - alliance, crise, sujet transverse ou haute confidentialité - nous assemblons une équipe et une méthode sur mesure."
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
            <li>Accompagnement d'un sponsor interne sur un programme multi-années.</li>
            <li>Due diligence stratégique ou organisationnelle ciblée.</li>
          </ul>
          <h2>Engagements</h2>
          <ul>
            <li>Confidentialité renforcée et clauses adaptées à votre juridique.</li>
            <li>Facturation au temps passé, au forfait ou hybride - validée en amont.</li>
            <li>Revue à mi-parcours avec ajustement documenté des priorités.</li>
          </ul>
        </InteriorArticle>
      </section>

      <TestimonialsSection />
    </SiteLayout>
  );
};

export default OffresPage;
