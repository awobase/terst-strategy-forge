import { useQuery } from "@tanstack/react-query";
import { TESTIMONIALS, type Testimonial } from "@/config/testimonials";
import { fetchTestimonials, isApiAvailable } from "@/lib/cms-api";

export function useTestimonialsCms() {
  return useQuery({
    queryKey: ["testimonials"],
    placeholderData: TESTIMONIALS,
    queryFn: async (): Promise<Testimonial[]> => {
      const available = await isApiAvailable();
      if (!available) return TESTIMONIALS;
      try {
        const rows = await fetchTestimonials();
        if (rows.length === 0) return TESTIMONIALS;
        return rows.map((row) => ({
          firstName: row.firstName,
          lastInitial: row.lastInitial,
          role: row.role,
          sector: row.sector,
          text: row.text,
        }));
      } catch {
        return TESTIMONIALS;
      }
    },
    staleTime: 60_000,
  });
}
