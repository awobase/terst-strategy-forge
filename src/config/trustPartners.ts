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
  onLight?: boolean;
};

/** Logos « Ils nous font confiance » — ~30 références institutionnelles et partenaires */
export const TRUST_PARTNER_LOGOS: TrustPartnerLogo[] = [
  { src: regionGuadeloupe, alt: "Région Guadeloupe", onLight: true },
  { src: ctmMartinique, alt: "Collectivité Territoriale de Martinique", onLight: true },
  { src: ademeRepublique, alt: "ADEME — Agence de la transition écologique", onLight: true },
  { src: bpifrance, alt: "Bpifrance", onLight: true },
  { src: cangt, alt: "CANGT — Communauté d'agglomération du Nord Grande-Terre", onLight: true },
  { src: capNordMartinique, alt: "CAP Nord Martinique", onLight: true },
  { src: cciGuadeloupe, alt: "CCI des Îles de Guadeloupe", onLight: true },
  { src: cmarGuadeloupe, alt: "Chambre de Métiers et de l'Artisanat de Guadeloupe", onLight: true },
  { src: chuMartinique, alt: "CHU de Martinique", onLight: true },
  { src: universiteAntilles, alt: "Université des Antilles", onLight: true },
  { src: inovaTechnopole, alt: "I-Nova Technopole Guadeloupe", onLight: true },
  { src: technopoleMartinique, alt: "Technopole Martinique", onLight: true },
  { src: martiniqueDev, alt: "Martinique Développement", onLight: true },
  { src: prefetMartinique, alt: "Préfet de la Martinique", onLight: true },
  { src: drfipMartinique, alt: "DRFIP Martinique", onLight: true },
  { src: deetsGuadeloupe, alt: "DEETS Guadeloupe", onLight: true },
  { src: villeFortDeFrance, alt: "Ville de Fort-de-France", onLight: true },
  { src: villeBaieMahault, alt: "Ville de Baie-Mahault", onLight: true },
  { src: villeLamentin, alt: "Ville du Lamentin", onLight: true },
  { src: mpiGuadeloupe, alt: "MPI Guadeloupe — Association des Moyennes et Petites Industries", onLight: true },
  { src: capExcellence, alt: "CAP Excellence", onLight: true },
  { src: afdas, alt: "AFDAS", onLight: true },
  { src: agepta, alt: "AGEPTA", onLight: true },
  { src: cacem, alt: "CACEM", onLight: true },
  { src: carl, alt: "CARL", onLight: true },
  { src: ftpg, alt: "FTPG", onLight: true },
  { src: exportTt, alt: "Export TT", onLight: true },
  { src: ligueVoileMartinique, alt: "Ligue de voile de Martinique", onLight: true },
  { src: parm, alt: "PARM", onLight: true },
  { src: opiiec, alt: "OPIIEC", onLight: true },
];
