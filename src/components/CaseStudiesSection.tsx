import case1 from "@/assets/case-study-1.jpg";
import case2 from "@/assets/case-study-2.jpg";
import case3 from "@/assets/case-study-3.jpg";
import { useInView } from "@/hooks/useInView";

const cases = [
  { img: case1, title: "Transformation organisationnelle", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
  { img: case2, title: "Développement international", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
  { img: case3, title: "Optimisation opérationnelle", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
];

const CaseStudiesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="etudes" className="py-24 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Études de cas</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Nos réalisations</h2>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className={`bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="overflow-hidden h-56">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={800}
                  height={600}
                />
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
