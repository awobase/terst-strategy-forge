/** Arborescence site — alignée sur le plan 2026 */

export const ROUTES = {
  home: "/",
  offresRoot: "/offres",
  offres: {
    start: "/offres#start",
    rise: "/offres#rise",
    jeunes: "/offres#offres-jeunes",
    personnalise: "/offres#offre-personnalisee",
  },
  quiSommesNousRoot: "/qui-sommes-nous",
  quiSommesNous: {
    presentation: "/qui-sommes-nous#presentation",
    equipe: "/qui-sommes-nous#equipe",
    partenaires: "/qui-sommes-nous#partenaires",
  },
  /** Formulaire unique (objet au choix dans le formulaire) */
  contact: "/contact",
} as const;
