import appelProjets from "@/assets/funding-partners/appel-projets.png";
import bpifrance from "@/assets/funding-partners/bpifrance.png";
import feder from "@/assets/funding-partners/feder.png";
import financementImmobilier from "@/assets/funding-partners/financement-immobilier.png";
import leader from "@/assets/funding-partners/leader.png";
import regionGuadeloupe from "@/assets/funding-partners/region-guadeloupe.png";

export type FundingPartnerLogo = {
  src: string;
  alt: string;
  /** Fond clair derrière le logo (fichiers sur fond noir) */
  onLight?: boolean;
};

export const FUNDING_PARTNER_LOGOS: FundingPartnerLogo[] = [
  { src: financementImmobilier, alt: "Dispositif de financement immobilier", onLight: true },
  { src: regionGuadeloupe, alt: "Région Guadeloupe", onLight: true },
  { src: leader, alt: "Programme LEADER", onLight: true },
  { src: appelProjets, alt: "Appel à projets", onLight: true },
  { src: feder, alt: "Fonds européen de développement régional", onLight: true },
  { src: bpifrance, alt: "Bpifrance", onLight: true },
];
