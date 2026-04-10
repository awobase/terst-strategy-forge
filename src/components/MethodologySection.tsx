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
    <section id="methodologie" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Méthodologie</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Notre approche</h2>
        </div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={methodImg}
              alt="Consultants autour d'un tableau stratégique"
              className="w-full object-cover"
              loading="lazy"
              width={1280}
              height={854}
            />
          </div>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex gap-6 transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">{step.num}</span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{step.title}</h3>
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
