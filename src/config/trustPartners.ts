import ademe from "@/assets/trust-partners/ademe.png";
import cangt from "@/assets/trust-partners/cangt.png";
import inovaTechnopole from "@/assets/trust-partners/inova-technopole.png";
import regionGuadeloupe from "@/assets/trust-partners/region-guadeloupe.png";
import rivieraDuLevant from "@/assets/trust-partners/riviera-du-levant.png";

export type TrustPartnerLogo = {
  src: string;
  alt: string;
  onLight?: boolean;
};

export const TRUST_PARTNER_LOGOS: TrustPartnerLogo[] = [
  { src: regionGuadeloupe, alt: "Région Guadeloupe", onLight: true },
  { src: cangt, alt: "CANGT — Communauté d'agglomération du Nord Grande-Terre", onLight: true },
  { src: inovaTechnopole, alt: "I-Nova Technopole Guadeloupe", onLight: true },
  { src: ademe, alt: "ADEME — Agence de la transition écologique", onLight: true },
  { src: rivieraDuLevant, alt: "La Riviera du Levant — Communauté d'agglomération", onLight: true },
];
