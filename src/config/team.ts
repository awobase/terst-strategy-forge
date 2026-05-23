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
    lastName: "AUGIAC",
    title: "Consultant senior",
    expertise: "Stratégie & pilotage de projet",
    bio: "Stratégie & pilotage de projet : accompagnement des porteurs de projets et des dirigeants sur la structuration, l’étude de faisabilité et le montage financier, avec une connaissance fine des réalités entrepreneuriales aux Antilles.",
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
    bio: "Analyses et développement de projet : organisation des missions, analyse marketing et suivi opérationnel pour des livrables actionnables et un accompagnement exigeant jusqu’aux premiers résultats.",
    theme: "orange",
    email: "contact@cayribepartners.com",
    linkedin: "https://www.linkedin.com",
    photo: melodyPhoto,
    initials: "M",
  },
];
