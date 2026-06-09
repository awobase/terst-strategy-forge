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
  {
    id: "edition",
    label: "Edition (livres), Production (films)",
    color: "green",
    keywords: ["edition", "édition", "culture", "film", "production"],
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

/** Secteurs affichés dans le carrousel (au moins une référence validée) */
export const SECTOR_CATEGORIES_WITH_REFERENCES = SECTOR_CATEGORIES.filter(
  (sector) => getReferencesForSector(sector.id).length > 0,
);

export type SectorStyle = {
  card: string;
  accent: string;
  glow: string;
};

export type SectorCarouselStyle = {
  border: string;
  title: string;
  header: string;
  shadow: string;
  preview: string;
  dot: string;
};

export const SECTOR_CAROUSEL_STYLES: Record<SectorColor, SectorCarouselStyle> = {
  red: {
    border: "border-[hsl(0,68%,52%)]",
    title: "text-white",
    header: "bg-gradient-to-br from-[hsl(0,68%,52%)] to-[hsl(0,62%,42%)]",
    shadow: "shadow-[0_20px_40px_-14px_hsl(0_68%_42%/0.32)]",
    preview: "bg-gradient-to-br from-[hsl(0,68%,52%)/10] to-[hsl(0,62%,42%)/5]",
    dot: "bg-[hsl(0,68%,52%)]",
  },
  green: {
    border: "border-[hsl(152,42%,42%)]",
    title: "text-white",
    header: "bg-gradient-to-br from-[hsl(152,42%,42%)] to-[hsl(152,38%,34%)]",
    shadow: "shadow-[0_20px_40px_-14px_hsl(152_42%_30%/0.32)]",
    preview: "bg-gradient-to-br from-[hsl(152,42%,42%)/10] to-[hsl(152,38%,34%)/5]",
    dot: "bg-[hsl(152,42%,42%)]",
  },
  purple: {
    border: "border-[hsl(262,48%,50%)]",
    title: "text-white",
    header: "bg-gradient-to-br from-[hsl(262,48%,50%)] to-[hsl(262,44%,40%)]",
    shadow: "shadow-[0_20px_40px_-14px_hsl(262_48%_38%/0.32)]",
    preview: "bg-gradient-to-br from-[hsl(262,48%,50%)/10] to-[hsl(262,44%,40%)/5]",
    dot: "bg-[hsl(262,48%,50%)]",
  },
  blue: {
    border: "border-primary",
    title: "text-white",
    header: "bg-gradient-to-br from-primary to-[hsl(222,58%,28%)]",
    shadow: "shadow-[0_20px_40px_-14px_hsl(222_58%_36%/0.32)]",
    preview: "bg-gradient-to-br from-primary/10 to-primary/5",
    dot: "bg-primary",
  },
  orange: {
    border: "border-secondary",
    title: "text-white",
    header: "bg-gradient-to-br from-secondary to-[hsl(28,82%,44%)]",
    shadow: "shadow-[0_20px_40px_-14px_hsl(32_88%_40%/0.32)]",
    preview: "bg-gradient-to-br from-secondary/10 to-[hsl(28,82%,44%)/5]",
    dot: "bg-secondary",
  },
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
