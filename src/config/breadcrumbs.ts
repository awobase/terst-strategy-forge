import { ROUTES } from "@/config/navigation";
import type { BreadcrumbItem } from "@/components/Breadcrumb";

export const crumbsOffres = (current: string): BreadcrumbItem[] => [
  { label: "Accueil", to: "/" },
  { label: "Offres" },
  { label: current },
];

export const crumbsQuiSommesNous = (current: string): BreadcrumbItem[] => [
  { label: "Accueil", to: "/" },
  { label: "Qui sommes-nous" },
  { label: current },
];

export const crumbsContact: BreadcrumbItem[] = [{ label: "Accueil", to: "/" }, { label: "Contactez-nous" }];

export const relatedOffres = {
  start: [
    { label: "Rise — accélération & mise à l’échelle", to: ROUTES.offres.rise },
    { label: "Recherche de financements", to: ROUTES.offres.rechercheFinancements },
    { label: "Études personnalisées", to: ROUTES.offres.etudesPersonnalisees },
  ],
  rise: [
    { label: "Start — cadrage & diagnostic", to: ROUTES.offres.start },
    { label: "Recherche de financements", to: ROUTES.offres.rechercheFinancements },
    { label: "Présentation du cabinet", to: ROUTES.quiSommesNous.presentation },
  ],
  etudesPersonnalisees: [
    { label: "Start", to: ROUTES.offres.start },
    { label: "Rise", to: ROUTES.offres.rise },
    { label: "Nous écrire", to: ROUTES.contact },
  ],
  rechercheFinancements: [
    { label: "Start", to: ROUTES.offres.start },
    { label: "Rise", to: ROUTES.offres.rise },
    { label: "Contact", to: ROUTES.contact },
  ],
} as const;
