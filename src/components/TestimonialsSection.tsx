import { useState } from "react";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    img: t1,
    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Jean-Pierre Martin",
    role: "CEO – Groupe industriel",
  },
  {
    img: t2,
    text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Sophie Duval",
    role: "Directeur – Entreprise commerciale",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Témoignages</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Ce que disent nos clients</h2>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
            "{t.text}"
          </p>
          <img
            src={t.img}
            alt={t.name}
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
            loading="lazy"
            width={512}
            height={512}
          />
          <p className="font-heading font-semibold text-foreground">{t.name}</p>
          <p className="text-muted-foreground text-sm">{t.role}</p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
