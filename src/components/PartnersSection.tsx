import LogoMarquee from "@/components/LogoMarquee";
import { TRUST_PARTNER_LOGOS } from "@/config/trustPartners";
import { useInView } from "@/hooks/useInView";

type PartnersSectionProps = {
  /** Masque le bloc titre si la page affiche déjà l'introduction */
  omitHeading?: boolean;
};

const PartnersSection = ({ omitHeading = false }: PartnersSectionProps) => {
  const { ref, inView } = useInView();

  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-background to-surface/25 py-16 md:py-24">
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

        <LogoMarquee logos={TRUST_PARTNER_LOGOS} fadeFromClass="from-background" size="large" />
      </div>
    </section>
  );
};

export default PartnersSection;
