import { SECTOR_REFERENCES, type SectorReference } from "@/config/sectorReferencesData";

export type SectorColor = "red" | "green" | "purple" | "blue" | "orange";

export type SectorCategory = {
  id: string;
  label: string;
  color: SectorColor;
  keywords: string[];
};

export const SECTOR_CATEGORIES: SectorCategory[] = [
  { id: "numerique", label: "Numérique", color: "red", keywords: ["numérique", "numerique", "digital"] },
  { id: "tourisme", label: "Tourisme", color: "green", keywords: ["tourisme"] },
  { id: "agro", label: "Agro-transformation", color: "purple", keywords: ["agro"] },
  { id: "energie", label: "Energie", color: "blue", keywords: ["energie", "énergie"] },
  {
    id: "services-personne",
    label: "Services à la personne",
    color: "orange",
    keywords: ["personne", "silver"],
  },
  { id: "medico-social", label: "Médico-social", color: "red", keywords: ["médico", "medico", "social", "public"] },
  {
    id: "commerce",
    label: "Commerce & Distribution",
    color: "green",
    keywords: ["commerce", "distribution"],
  },
  {
    id: "services-entreprises",
    label: "Services aux entreprises",
    color: "purple",
    keywords: ["services", "sécurité", "securite"],
  },
  {
    id: "environnement",
    label: "Environnement",
    color: "blue",
    keywords: ["environnement", "circulaire", "écologie"],
  },
  { id: "sante", label: "Santé", color: "orange", keywords: ["santé", "sante"] },
  { id: "silver", label: "Silver Economie", color: "red", keywords: ["silver"] },
  {
    id: "edition",
    label: "Edition (livres), Production (films)",
    color: "green",
    keywords: ["edition", "édition", "culture", "film", "production"],
  },
  {
    id: "rd",
    label: "Recherche & Développement",
    color: "purple",
    keywords: ["recherche", "développement", "developpement", "université", "universite"],
  },
  { id: "artisanat", label: "Artisanat", color: "blue", keywords: ["artisanat"] },
  {
    id: "petites-industries",
    label: "Petites Industries",
    color: "orange",
    keywords: ["industrie", "transport", "industries"],
  },
];

export function getReferencesForSector(sectorId: string): SectorReference[] {
  return SECTOR_REFERENCES[sectorId] ?? [];
}

export type SectorStyle = {
  card: string;
  accent: string;
  glow: string;
};

export const SECTOR_STYLES: Record<SectorColor, SectorStyle> = {
  red: {
    card: "from-[hsl(0,72%,58%)] to-[hsl(0,68%,48%)] shadow-[0_8px_24px_-6px_hsl(0,72%,40%/0.45)]",
    accent: "bg-[hsl(0,72%,52%)]",
    glow: "group-hover:shadow-[0_12px_32px_-8px_hsl(0,72%,40%/0.55)]",
  },
  green: {
    card: "from-[hsl(142,45%,50%)] to-[hsl(142,40%,42%)] shadow-[0_8px_24px_-6px_hsl(142,45%,30%/0.45)]",
    accent: "bg-[hsl(142,45%,44%)]",
    glow: "group-hover:shadow-[0_12px_32px_-8px_hsl(142,45%,30%/0.55)]",
  },
  purple: {
    card: "from-[hsl(262,52%,54%)] to-[hsl(262,48%,44%)] shadow-[0_8px_24px_-6px_hsl(262,52%,35%/0.45)]",
    accent: "bg-[hsl(262,52%,48%)]",
    glow: "group-hover:shadow-[0_12px_32px_-8px_hsl(262,52%,35%/0.55)]",
  },
  blue: {
    card: "from-[hsl(205,58%,54%)] to-[hsl(205,55%,44%)] shadow-[0_8px_24px_-6px_hsl(205,58%,35%/0.45)]",
    accent: "bg-[hsl(205,58%,48%)]",
    glow: "group-hover:shadow-[0_12px_32px_-8px_hsl(205,58%,35%/0.55)]",
  },
  orange: {
    card: "from-secondary to-[hsl(28,82%,44%)] shadow-[0_8px_24px_-6px_hsl(32,88%,40%/0.45)]",
    accent: "bg-secondary",
    glow: "group-hover:shadow-[0_12px_32px_-8px_hsl(32,88%,40%/0.55)]",
  },
};

/** Première rangée de 12 secteurs + dernière rangée de 3 centrés */
export const SECTOR_GRID_MAIN = SECTOR_CATEGORIES.slice(0, 12);
export const SECTOR_GRID_LAST = SECTOR_CATEGORIES.slice(12);
