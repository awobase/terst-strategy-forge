import { useInView } from "@/hooks/useInView";
import logoCayribe from "@/assets/logo-cayribe-partners.png";

/** Logos « Ils nous font confiance » — ajouter des `{ src, alt }` ici */
const partnerLogos: { src: string; alt: string }[] = [
  { src: logoCayribe, alt: "CAYRIBE Partners" },
];

/** Répète la liste jusqu’à au moins `min` cartes (pour un défilement lisible avec peu de marques) */
const expandLogosForMarquee = (logos: typeof partnerLogos, min: number) => {
  if (logos.length === 0) return [];
  const out: typeof partnerLogos = [];
  for (let i = 0; i < min; i++) out.push(logos[i % logos.length]);
  return out;
};

const MARQUEE_MIN_ITEMS = 8;
const marqueeStrip = expandLogosForMarquee(partnerLogos, MARQUEE_MIN_ITEMS);

const PartnersSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="border-b border-border/40 bg-gradient-to-b from-background to-surface/25 py-16 md:py-24">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="eyebrow">Références</p>
          <h2 className="section-title mb-4">Ils nous font confiance</h2>
          <p className="section-lead mx-auto text-sm md:text-base">
            Logos et références ajoutés au fil des missions — la confidentialité de nos clients reste prioritaire.
          </p>
        </div>

        {/* Scrolling logos marquee */}
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex scroll-marquee">
            {[...marqueeStrip, ...marqueeStrip].map((partner, i) => (
              <div
                key={`marquee-logo-${i}`}
                className="flex-shrink-0 mx-10 md:mx-14 flex items-center justify-center py-2"
              >
                <img
                  src={partner.src}
                  alt={i === 0 ? partner.alt : ""}
                  className="h-11 w-auto max-w-[200px] object-contain object-center opacity-85 transition-all duration-300 ease-out hover:scale-105 hover:opacity-100 md:h-14"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
