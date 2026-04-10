import case1 from "@/assets/case-study-1.jpg";
import case2 from "@/assets/case-study-2.jpg";
import case3 from "@/assets/case-study-3.jpg";
import { useInView } from "@/hooks/useInView";
import { ArrowUpRight } from "lucide-react";

const cases = [
  { img: case1, title: "Transformation organisationnelle", tag: "Stratégie", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
  { img: case2, title: "Développement international", tag: "Expansion", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
  { img: case3, title: "Optimisation opérationnelle", tag: "Performance", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
];

const CaseStudiesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="etudes" className="py-28 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Études de cas</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Nos réalisations</h2>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className={`group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="overflow-hidden h-56 relative">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {c.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
