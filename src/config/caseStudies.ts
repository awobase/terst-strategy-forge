/** Cas anonymisés — illustrer l’impact concret des missions */

export type CaseStudy = {
  id: string;
  sector: string;
  missionType: string;
  before: string;
  after: string;
  result: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "agro-transformation",
    sector: "Agro-transformation",
    missionType: "Structuration & financement",
    before:
      "Projet de transformation semi-industrielle avec une filière prometteuse, mais sans modèle économique consolidé ni stratégie de financement claire.",
    after:
      "Modélisation économique, plan de développement, montage d’un dossier LEADER et articulation d’un projet de R&D avec les partenaires techniques.",
    result:
      "Projet structuré, dossiers de financement déposés et feuille de route opérationnelle pour lancer la montée en charge industrielle.",
  },
  {
    id: "energie-innovation",
    sector: "Energie",
    missionType: "Étude de faisabilité & montage de projet",
    before:
      "Initiative innovante autour de la géothermie portée par plusieurs acteurs, sans modèle économique partagé ni cadre de gouvernance stabilisé.",
    after:
      "Analyse prospective, construction du modèle économique, étude de préfiguration et coordination du montage projet (partenariat public-privé, financement INTERREG).",
    result:
      "Projet cadré, parties prenantes alignées et perspectives de déploiement sécurisées pour convaincre financeurs et institutions.",
  },
];
