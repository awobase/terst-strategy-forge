import { useQuery } from "@tanstack/react-query";
import {
  SECTOR_CAROUSEL_STYLES,
  SECTOR_CATEGORIES_WITH_REFERENCES,
  getReferencesForSector,
  type SectorCategory,
  type SectorColor,
} from "@/config/sectorReferences";
import { fetchSectorReferences, isApiAvailable } from "@/lib/cms-api";

export type SectorWithReferences = SectorCategory & {
  references: { highlight?: string; text: string }[];
};

export function useSectorReferencesCms() {
  return useQuery({
    queryKey: ["sector-references"],
    queryFn: async () => {
      const staticSectors = SECTOR_CATEGORIES_WITH_REFERENCES.map((sector) => ({
        ...sector,
        references: getReferencesForSector(sector.id),
      }));

      const available = await isApiAvailable();
      if (!available) {
        return { source: "static" as const, sectors: staticSectors };
      }

      try {
        const sectors = await fetchSectorReferences();
        if (sectors.length === 0) {
          return { source: "static" as const, sectors: staticSectors };
        }
        return {
          source: "api" as const,
          sectors: sectors.map((s) => ({
            id: s.id,
            label: s.label,
            color: s.color as SectorColor,
            references: s.references,
          })),
        };
      } catch {
        return { source: "static" as const, sectors: staticSectors };
      }
    },
    staleTime: 60_000,
  });
}

export { SECTOR_CAROUSEL_STYLES };
