/** Profils affichés sur Qui sommes-nous — photos optionnelles dans src/assets/team/ */

import melodyPhoto from "@/assets/team/melody-guerande.png";
import youriPhoto from "@/assets/team/youri.png";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  linkedin?: string;
  /** Import statique, ex. import photo from "@/assets/team/youri.jpg" */
  photo?: string;
  initials: string;
};

export const TEAM_INTRO =
  "Au fil des années, le cabinet a su constituer une équipe avec des profils variés et complémentaires, afin d'offrir les meilleurs accompagnements à nos clients.";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "youri",
    name: "Youri",
    role: "Associé — stratégie & développement de projets",
    bio: "Youri accompagne les porteurs de projets et les dirigeants sur la structuration, l'étude de faisabilité et le montage financier, avec une connaissance fine des réalités entrepreneuriales aux Antilles.",
    email: "contact@cayribepartners.com",
    linkedin: "https://www.linkedin.com",
    photo: youriPhoto,
    initials: "Y",
  },
  {
    id: "melody",
    name: "Mélody Guérande",
    role: "Associée — conseil & pilotage de missions",
    bio: "Mélody intervient sur l'organisation des missions, l'analyse marketing et le suivi opérationnel, pour garantir des livrables actionnables et un accompagnement exigeant jusqu'aux premiers résultats.",
    email: "contact@cayribepartners.com",
    linkedin: "https://www.linkedin.com",
    photo: melodyPhoto,
    initials: "M",
  },
];
