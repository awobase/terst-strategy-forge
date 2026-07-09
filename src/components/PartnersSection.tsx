import LogoMarquee from "@/components/LogoMarquee";
import { TRUST_PARTNER_LOGOS } from "@/config/trustPartners";
import { useInView } from "@/hooks/useInView";
import type { MarqueeLogo } from "@/components/LogoMarquee";

function buildHomePartnerLogos(logos: MarqueeLogo[]) {
  return [
    ...logos.filter((logo) => logo.alt === "CACEM"),
    ...logos.filter((logo) => logo.alt === "Région Guadeloupe"),
    ...logos.filter((logo) => logo.alt === "Collectivité Territoriale de Martinique"),
    ...logos.filter(
      (logo) =>
        !["CACEM", "Région Guadeloupe", "Collectivité Territoriale de Martinique"].includes(logo.alt),
    ),
  ];
}

type PartnersSectionProps = {
  /** Masque le bloc titre si la page affiche déjà l'introduction */
  omitHeading?: boolean;
};

const PartnersSection = ({ omitHeading = false }: PartnersSectionProps) => {
  const { ref, inView } = useInView();
  const logos = buildHomePartnerLogos(TRUST_PARTNER_LOGOS);

  return (
    <section className="border-b border-border/40 bg-background py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!omitHeading ? (
          <div
            className={`mb-14 text-center transition-all duration-700 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="section-title">Ils nous font confiance</h2>
          </div>
        ) : null}

        <LogoMarquee
          logos={logos}
          fadeFromClass="from-background"
          size="default"
          variant="plain"
        />
      </div>
    </section>
  );
};

export default PartnersSection;
