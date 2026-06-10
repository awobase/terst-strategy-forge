/** Arborescence site — alignée sur le plan 2026 */

export const ROUTES = {
  home: "/",
  offresRoot: "/offres",
  offres: {
    start: "/offres#start",
    rise: "/offres#rise",
    etudesPersonnalisees: "/offres#etudes-personnalisees",
    rechercheFinancements: "/offres#recherche-financements",
    formationCabinet: "/offres#formation-cabinet",
    temoignages: "/offres#temoignages",
  },
  quiSommesNousRoot: "/qui-sommes-nous",
  quiSommesNous: {
    presentation: "/qui-sommes-nous#presentation",
    equipe: "/qui-sommes-nous#equipe",
    referencesSectorielles: "/qui-sommes-nous#references-sectorielles",
    partenaires: "/qui-sommes-nous#partenaires",
  },
  /** Formulaire unique (objet au choix dans le formulaire) */
  contact: "/contact",
} as const;
