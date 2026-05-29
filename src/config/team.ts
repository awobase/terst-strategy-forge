/** Profils affichés sur Qui sommes-nous — photos optionnelles dans src/assets/team/ */

import melodyPhoto from "@/assets/team/melody-guerande.png";
import youriPhoto from "@/assets/team/youri.png";

export type TeamMemberTheme = "blue" | "orange";

export type TeamMember = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  expertise: string;
  bio: string;
  theme: TeamMemberTheme;
  email?: string;
  linkedin?: string;
  photo?: string;
  initials: string;
};

export const TEAM_INTRO =
  "Au fil des années, le cabinet a su constituer une équipe avec des profils variés et complémentaires, afin d'offrir les meilleurs accompagnements à nos clients.";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "youri",
    firstName: "Youri",
    lastName: "AUGUIAC",
    title: "Consultant senior",
    expertise: "Stratégie & pilotage de projet",
    bio: "Ingénieur des Mines de Paris de formation, et 20 ans d’expérience en tant que XX au sein du groupe ALTRAN, j’ai créé le cabinet CAYRIBE PARTNERS avec la vision de devenir un réel catalyseur pour favoriser le développement de projet à fort potentiel sur le territoire de la Guadeloupe.",
    theme: "blue",
    email: "contact@cayribepartners.com",
    linkedin: "https://www.linkedin.com",
    photo: youriPhoto,
    initials: "Y",
  },
  {
    id: "melody",
    firstName: "Mélody",
    lastName: "GUERANDE",
    title: "Consultante confirmée",
    expertise: "Analyses et Dev de Projet",
    bio: "Diplômée d’un master en management de projet et forte d’une expérience dans le secteur de la fusion-acquisition à Paris, j’ai choisi de revenir en Guadeloupe afin d’apporter mon savoir-faire tout en appréhendant mieux les dynamiques de notre territoire et de son économie, dans le but d’accompagner les futurs dirigeants qui contribueront au rayonnement de notre île.",
    theme: "orange",
    email: "contact@cayribepartners.com",
    linkedin: "https://www.linkedin.com",
    photo: melodyPhoto,
    initials: "M",
  },
];
