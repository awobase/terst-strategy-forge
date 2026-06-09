import appelProjets from "@/assets/funding-partners/appel-projets.png";
import bpifrance from "@/assets/funding-partners/bpifrance.png";
import feder from "@/assets/funding-partners/feder.png";
import leader from "@/assets/funding-partners/leader.png";
import regionGuadeloupe from "@/assets/funding-partners/region-guadeloupe.png";
import reseauEntreprendre from "@/assets/funding-partners/reseau-entreprendre-guadeloupe.png";
import reseauInitiative from "@/assets/funding-partners/reseau-initiative-guadeloupe.png";

export type FundingPartnerLogo = {
  src: string;
  alt: string;
};

export const FUNDING_PARTNER_LOGOS: FundingPartnerLogo[] = [
  { src: regionGuadeloupe, alt: "Région Guadeloupe" },
  { src: leader, alt: "Programme LEADER" },
  { src: appelProjets, alt: "Appel à projets" },
  { src: feder, alt: "Fonds européen de développement régional" },
  { src: bpifrance, alt: "Bpifrance" },
  { src: reseauEntreprendre, alt: "Réseau Entreprendre Guadeloupe" },
  { src: reseauInitiative, alt: "Réseau Initiative Guadeloupe" },
];
