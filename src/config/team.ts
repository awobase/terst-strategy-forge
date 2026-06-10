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
    expertise: "Stratégie, Pilotage de Projets, Management de l'innovation",
    bio: "Ingénieur des Mines de Paris, 26 ans d’expérience dans le conseil en stratégie et le management de projet, j’ai créé le cabinet CAYRIBE PARTNERS avec l'ambition de mettre les meilleures compétences, au service du développement de projets innovants ou à fort potentiel, en Guadeloupe et en Martinique.",
    theme: "blue",
    email: "contact@cayribepartners.com",
    linkedin: "https://www.linkedin.com/company/cayribepartners",
    photo: youriPhoto,
    initials: "Y",
  },
  {
    id: "melody",
    firstName: "Mélody",
    lastName: "GUERANDE",
    title: "Consultante confirmée",
    expertise: "Analyses & Développement de projets",
    bio: "Diplômée d’un master en management de projet et forte d’une expérience dans le secteur de la fusion-acquisition à Paris, j’ai choisi de revenir en Guadeloupe afin d’apporter mon savoir-faire et ma compréhension des dynamiques économiques antillaises, au service des futurs dirigeants qui contribueront au rayonnement de nos îles.",
    theme: "orange",
    email: "contact@cayribepartners.com",
    linkedin: "https://www.linkedin.com",
    photo: melodyPhoto,
    initials: "M",
  },
];
