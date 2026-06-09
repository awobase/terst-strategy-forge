import afdas from "@/assets/trust-partners/afdas.png";
import agepta from "@/assets/trust-partners/agepta.png";
import ademeRepublique from "@/assets/trust-partners/ademe-republique-francaise.png";
import bpifrance from "@/assets/trust-partners/bpifrance.png";
import cacem from "@/assets/trust-partners/cacem.png";
import cangt from "@/assets/trust-partners/cangt.png";
import capExcellence from "@/assets/trust-partners/cap-excellence.png";
import capNordMartinique from "@/assets/trust-partners/cap-nord-martinique.png";
import carl from "@/assets/trust-partners/carl.png";
import cciGuadeloupe from "@/assets/trust-partners/cci-guadeloupe.png";
import chuMartinique from "@/assets/trust-partners/chu-martinique.png";
import cmarGuadeloupe from "@/assets/trust-partners/cmar-guadeloupe.png";
import ctmMartinique from "@/assets/trust-partners/ctm-martinique.png";
import deetsGuadeloupe from "@/assets/trust-partners/deets-guadeloupe.png";
import drfipMartinique from "@/assets/trust-partners/drfip-martinique.png";
import exportTt from "@/assets/trust-partners/export-tt.png";
import ftpg from "@/assets/trust-partners/ftpg.png";
import inovaTechnopole from "@/assets/trust-partners/inova-technopole.png";
import ligueVoileMartinique from "@/assets/trust-partners/ligue-voile-martinique.png";
import martiniqueDev from "@/assets/trust-partners/martinique-dev.png";
import mpiGuadeloupe from "@/assets/trust-partners/mpi-guadeloupe.png";
import opiiec from "@/assets/trust-partners/opiiec.png";
import parm from "@/assets/trust-partners/parm.png";
import prefetMartinique from "@/assets/trust-partners/prefet-martinique.png";
import regionGuadeloupe from "@/assets/trust-partners/region-guadeloupe.png";
import technopoleMartinique from "@/assets/trust-partners/technopole-martinique.png";
import universiteAntilles from "@/assets/trust-partners/universite-antilles.png";
import villeBaieMahault from "@/assets/trust-partners/ville-baie-mahault.png";
import villeFortDeFrance from "@/assets/trust-partners/ville-fort-de-france.png";
import villeLamentin from "@/assets/trust-partners/ville-lamentin.png";

export type TrustPartnerLogo = {
  src: string;
  alt: string;
  /** Agrandissement visuel pour les logos plus compacts (défaut : 1) */
  scale?: number;
};

/** Logos « Ils nous font confiance » — références institutionnelles et partenaires */
export const TRUST_PARTNER_LOGOS: TrustPartnerLogo[] = [
  { src: regionGuadeloupe, alt: "Région Guadeloupe" },
  { src: ctmMartinique, alt: "Collectivité Territoriale de Martinique" },
  { src: ademeRepublique, alt: "ADEME — Agence de la transition écologique" },
  { src: bpifrance, alt: "Bpifrance" },
  { src: cangt, alt: "CANGT — Communauté d'agglomération du Nord Grande-Terre" },
  { src: capNordMartinique, alt: "CAP Nord Martinique" },
  { src: cciGuadeloupe, alt: "CCI des Îles de Guadeloupe", scale: 1.2 },
  { src: cmarGuadeloupe, alt: "Chambre de Métiers et de l'Artisanat de Guadeloupe" },
  { src: chuMartinique, alt: "CHU de Martinique", scale: 1.5 },
  { src: universiteAntilles, alt: "Université des Antilles" },
  { src: inovaTechnopole, alt: "I-Nova Technopole Guadeloupe" },
  { src: technopoleMartinique, alt: "Technopole Martinique" },
  { src: martiniqueDev, alt: "Martinique Développement", scale: 1.75 },
  { src: prefetMartinique, alt: "Préfet de la Martinique" },
  { src: drfipMartinique, alt: "DRFIP Martinique", scale: 1.5 },
  { src: deetsGuadeloupe, alt: "DEETS Guadeloupe", scale: 1.3 },
  { src: villeFortDeFrance, alt: "Ville de Fort-de-France" },
  { src: villeBaieMahault, alt: "Ville de Baie-Mahault" },
  { src: villeLamentin, alt: "Ville du Lamentin", scale: 1.15 },
  { src: mpiGuadeloupe, alt: "MPI Guadeloupe — Association des Moyennes et Petites Industries" },
  { src: capExcellence, alt: "CAP Excellence" },
  { src: afdas, alt: "AFDAS", scale: 1.75 },
  { src: agepta, alt: "AGEPTA", scale: 1.3 },
  { src: cacem, alt: "CACEM", scale: 1.5 },
  { src: carl, alt: "CARL", scale: 1.3 },
  { src: ftpg, alt: "FTPG", scale: 1.2 },
  { src: exportTt, alt: "Export TT", scale: 1.3 },
  { src: ligueVoileMartinique, alt: "Ligue de voile de Martinique" },
  { src: parm, alt: "PARM", scale: 1.25 },
  { src: opiiec, alt: "OPIIEC" },
];
