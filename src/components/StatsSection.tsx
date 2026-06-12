import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { Briefcase, Clock, Landmark, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatConfig = {
  /** Compteur animé ; ignoré si `displayText` ou `displayLines` est défini */
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  /** Affichage fixe à la place du nombre (ex. territoires) */
  displayText?: string;
  /** Plusieurs lignes (meilleure lisibilité sur mobile) */
  displayLines?: string[];
};

const stats: StatConfig[] = [
  {
    target: 500,
    prefix: "+ de ",
    suffix: "",
    label: "projets accompagnés en Guadeloupe et en Martinique",
    icon: Briefcase,
  },
  {
    target: 0,
    displayText: "+15",
    label: "années d'expérience",
    icon: Clock,
  },
  { target: 20, prefix: "+ ", suffix: "", label: "collectivités publiques accompagnées", icon: Landmark },
  { target: 10, prefix: "+ ", suffix: "", label: "Partners", icon: Users },
];

function StatCard({ stat, index, active }: { stat: StatConfig; index: number; active: boolean }) {
  const count = useCountUp(
    stat.displayText || (stat.displayLines && stat.displayLines.length > 0) ? 0 : stat.target,
    active,
    {
      durationMs: 1800,
      delayMs: index * 140,
    },
  );

  const main = stat.displayText ?? `${stat.prefix ?? ""}${count}${stat.suffix}`;

  return (
    <div
      className={`group text-center rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.06] p-6 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:border-primary-foreground/25 hover:bg-primary-foreground/[0.1] hover:shadow-lg sm:p-8 ${
        active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <stat.icon className="mx-auto mb-3 h-8 w-8 text-secondary transition-transform duration-300 ease-out group-hover:scale-110 sm:mb-4" />
      {stat.displayLines ? (
        <p className="mb-2 font-heading font-bold text-primary-foreground text-[1.05rem] leading-snug tracking-tight text-balance sm:text-lg md:text-xl lg:text-2xl">
          {stat.displayLines.map((line, i) => (
            <span key={`${i}-${line}`} className={i > 0 ? "mt-1.5 block text-primary-foreground/95" : "block"}>
              {line}
            </span>
          ))}
        </p>
      ) : (
        <p className="mb-2 font-heading text-4xl font-bold tabular-nums text-primary-foreground md:text-5xl">
          {main}
        </p>
      )}
      {stat.label ? <p className="text-sm text-primary-foreground/60">{stat.label}</p> : null}
    </div>
  );
}

const StatsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[hsl(222,58%,26%)] py-24 md:py-32">
      {/* Decorative */}
      <div className="absolute top-0 right-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-secondary/10" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-foreground/5" />

      <div ref={ref} className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-secondary sm:text-xs">Chiffres clés</p>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Notre impact en chiffres
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.displayLines?.join("|") ?? stat.displayText ?? `${i}-${stat.label}`}
              stat={stat}
              index={i}
              active={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
