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
  /** Ajustement fin optionnel pour les logos très compacts (défaut : 1) */
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
  { src: cciGuadeloupe, alt: "CCI des Îles de Guadeloupe" },
  { src: cmarGuadeloupe, alt: "Chambre de Métiers et de l'Artisanat de Guadeloupe" },
  { src: chuMartinique, alt: "CHU de Martinique" },
  { src: universiteAntilles, alt: "Université des Antilles" },
  { src: inovaTechnopole, alt: "I-Nova Technopole Guadeloupe" },
  { src: technopoleMartinique, alt: "Technopole Martinique" },
  { src: martiniqueDev, alt: "Martinique Développement" },
  { src: prefetMartinique, alt: "Préfet de la Martinique" },
  { src: drfipMartinique, alt: "DRFIP Martinique" },
  { src: deetsGuadeloupe, alt: "DEETS Guadeloupe" },
  { src: villeFortDeFrance, alt: "Ville de Fort-de-France" },
  { src: villeBaieMahault, alt: "Ville de Baie-Mahault" },
  { src: villeLamentin, alt: "Ville du Lamentin" },
  { src: mpiGuadeloupe, alt: "MPI Guadeloupe — Association des Moyennes et Petites Industries" },
  { src: capExcellence, alt: "CAP Excellence" },
  { src: afdas, alt: "AFDAS" },
  { src: agepta, alt: "AGEPTA" },
  { src: cacem, alt: "CACEM" },
  { src: carl, alt: "CARL" },
  { src: ftpg, alt: "FTPG" },
  { src: exportTt, alt: "Export TT" },
  { src: ligueVoileMartinique, alt: "Ligue de voile de Martinique" },
  { src: parm, alt: "PARM" },
  { src: opiiec, alt: "OPIIEC" },
];
