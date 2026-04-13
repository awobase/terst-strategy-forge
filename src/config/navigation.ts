/** Arborescence site — alignée sur le plan 2026 */

export const ROUTES = {
  home: "/",
  offres: {
    start: "/offres/start",
    rise: "/offres/rise",
    jeunes: "/offres/jeunes",
    personnalise: "/offres/personnalise",
  },
  quiSommesNous: {
    presentation: "/qui-sommes-nous/presentation",
    equipe: "/qui-sommes-nous/equipe",
    partenaires: "/qui-sommes-nous/partenaires",
  },
  /** Formulaire unique (objet au choix dans le formulaire) */
  contact: "/contact",
} as const;
