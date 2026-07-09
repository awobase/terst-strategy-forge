/** Profils affichés sur Qui sommes-nous — photos dans src/assets/team/ */

import melodyPhoto from "@/assets/team/melody-guerande.png";
import youriPhoto from "@/assets/team/youri.png";
import { TEAM_INTRO, TEAM_MEMBERS_TEXT, type TeamMemberText } from "@/config/teamTexts";

export type TeamMemberTheme = TeamMemberText["theme"];

export type TeamMember = TeamMemberText & {
  photo?: string;
};

export { TEAM_INTRO };

export const TEAM_PHOTO_ASSETS: Record<string, { photo?: string; theme: TeamMemberTheme }> = {
  youri: { photo: youriPhoto, theme: "blue" },
  melody: { photo: melodyPhoto, theme: "orange" },
};

export const TEAM_MEMBERS: TeamMember[] = TEAM_MEMBERS_TEXT.map((member) => ({
  ...member,
  photo: TEAM_PHOTO_ASSETS[member.id]?.photo,
}));
