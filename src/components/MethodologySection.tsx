import methodImg from "@/assets/methodology-board.jpg";
import { useInView } from "@/hooks/useInView";

const steps = [
  { num: "01", title: "Diagnostic stratégique", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
  { num: "02", title: "Construction de la stratégie", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
  { num: "03", title: "Mise en œuvre opérationnelle", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
  { num: "04", title: "Suivi de performance", desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt." },
];

const MethodologySection = () => {
  const { ref, inView } = useInView();

  return (
    <section id="methodologie" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Méthodologie</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Notre approche</h2>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={methodImg}
                alt="Consultants autour d'un tableau stratégique"
                className="w-full object-cover"
                loading="lazy"
                width={1280}
                height={854}
              />
            </div>
          </div>

          <div className="space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex gap-6 transition-all duration-700 relative ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-full bg-border" />
                )}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 relative z-10">
                  <span className="text-primary-foreground font-bold text-sm">{step.num}</span>
                </div>
                <div className="pb-10">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
