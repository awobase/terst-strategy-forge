import { useQuery } from "@tanstack/react-query";
import { TRUST_PARTNER_LOGOS } from "@/config/trustPartners";
import { fetchTrustPartners, isApiAvailable, resolveCmsImageUrl, type ApiTrustPartner } from "@/lib/cms-api";
import type { MarqueeLogo } from "@/components/LogoMarquee";

function toMarqueeLogo(partner: ApiTrustPartner): MarqueeLogo {
  return {
    src: resolveCmsImageUrl(partner.imageUrl),
    alt: partner.alt,
    scale: partner.scale !== 1 ? partner.scale : undefined,
  };
}

export function useTrustPartnersCms() {
  return useQuery({
    queryKey: ["trust-partners"],
    queryFn: async () => {
      const available = await isApiAvailable();
      if (!available) return { source: "static" as const, logos: TRUST_PARTNER_LOGOS };
      try {
        const partners = await fetchTrustPartners();
        if (partners.length === 0) return { source: "static" as const, logos: TRUST_PARTNER_LOGOS };
        return {
          source: "api" as const,
          logos: partners.map(toMarqueeLogo),
        };
      } catch {
        return { source: "static" as const, logos: TRUST_PARTNER_LOGOS };
      }
    },
    staleTime: 60_000,
  });
}
