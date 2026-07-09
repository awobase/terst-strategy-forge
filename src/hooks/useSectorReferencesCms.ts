import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
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

function buildStaticSectors(): SectorWithReferences[] {
  return SECTOR_CATEGORIES_WITH_REFERENCES.map((sector) => ({
    ...sector,
    references: getReferencesForSector(sector.id),
  }));
}

const STATIC_SECTORS = buildStaticSectors();

export function useSectorReferencesCms() {
  return useQuery({
    queryKey: ["sector-references"],
    placeholderData: { source: "static" as const, sectors: STATIC_SECTORS },
    queryFn: async () => {
      const available = await isApiAvailable();
      if (!available) {
        return { source: "static" as const, sectors: STATIC_SECTORS };
      }

      try {
        const sectors = await fetchSectorReferences();
        if (sectors.length === 0) {
          return { source: "static" as const, sectors: STATIC_SECTORS };
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
        return { source: "static" as const, sectors: STATIC_SECTORS };
      }
    },
    staleTime: 60_000,
  });
}

export function useStaticSectorReferences() {
  return useMemo(() => STATIC_SECTORS, []);
}

export { SECTOR_CAROUSEL_STYLES };
