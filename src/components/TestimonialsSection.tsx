import { useState } from "react";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    img: t1,
    text: "Une équipe exigeante sur le fond et agréable à piloter. Le diagnostic était limpide, les arbitrages bien documentés, et nous avons gagné plusieurs mois sur notre plan de transformation.",
    name: "Jean-Pierre Martin",
    role: "Directeur général — industrie",
  },
  {
    img: t2,
    text: "Enfin un cabinet qui parle le langage des opérationnels : livrables concrets, indicateurs suivis en comité, et une vraie capacité d'écoute des équipes terrain.",
    name: "Sophie Duval",
    role: "Directrice générale déléguée — services",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      id="temoignages"
      className="scroll-mt-28 border-t border-border/40 py-24 md:py-32 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="eyebrow">Témoignages</p>
          <h2 className="section-title">La voix de nos clients</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-surface rounded-2xl p-10 md:p-14 relative border border-border/50 shadow-sm">
            <Quote className="w-14 h-14 text-primary/[0.08] absolute top-6 left-6" aria-hidden />

            <div className="text-center relative z-10">
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-10 font-medium">
                <span className="text-primary/80">&ldquo;</span>
                {t.text}
                <span className="text-primary/80">&rdquo;</span>
              </blockquote>
              <img
                src={t.img}
                alt={t.name}
                className="mx-auto mb-4 h-16 w-16 rounded-full border-4 border-background object-cover shadow-lg ring-4 ring-transparent transition-[transform,box-shadow,ring-color] duration-300 hover:scale-105 hover:ring-primary/15"
                loading="lazy"
                width={512}
                height={512}
              />
              <p className="font-heading font-semibold text-foreground">{t.name}</p>
              <p className="text-muted-foreground text-sm">{t.role}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prev}
              aria-label="Témoignage précédent"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Afficher le témoignage ${i + 1}`}
                  {...(i === current ? { "aria-current": "true" as const } : {})}
                  className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    i === current ? "bg-primary w-8" : "bg-border hover:bg-muted-foreground w-2.5"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Témoignage suivant"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
