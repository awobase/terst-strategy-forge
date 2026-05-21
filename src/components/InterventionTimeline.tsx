import { cn } from "@/lib/utils";

const STEPS = [
  { label: "Initialisation / Idéation", fill: "hsl(262, 52%, 42%)" },
  { label: "Étude de la faisabilité", fill: "hsl(235, 52%, 40%)" },
  { label: "Conception du modèle économique", fill: "hsl(215, 55%, 44%)" },
  { label: "Financement du projet", fill: "hsl(205, 58%, 48%)" },
  { label: "Portage du projet", fill: "hsl(195, 55%, 55%)" },
  { label: "Suivi du projet", fill: "hsl(185, 50%, 58%)" },
] as const;

const VB_W = 120;
const VB_H = 56;
const ARROW = 14;

function chevronPath(index: number, total: number): string {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const w = VB_W;
  const h = VB_H;
  const a = ARROW;

  if (isFirst) {
    return `M0,0 H${w - a} L${w},${h / 2} L${w - a},${h} H0 Z`;
  }
  if (isLast) {
    return `M${a},0 H${w} V${h} H${a} L0,${h / 2} Z`;
  }
  return `M${a},0 H${w - a} L${w},${h / 2} L${w - a},${h} H${a} L0,${h / 2} Z`;
}

type ChevronStepProps = {
  label: string;
  fill: string;
  index: number;
  overlap: string;
};

const ChevronStep = ({ label, fill, index, overlap }: ChevronStepProps) => {
  const isFirst = index === 0;
  const stepNum = String(index + 1).padStart(2, "0");

  return (
    <li
      className={cn("relative min-w-0 flex-1", !isFirst && overlap)}
      style={{ zIndex: STEPS.length - index }}
    >
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        className="block h-[4.25rem] w-full drop-shadow-md sm:h-[4.75rem] md:h-[5.25rem]"
        aria-hidden
      >
        <path d={chevronPath(index, STEPS.length)} fill={fill} />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-5 py-2 text-center sm:px-6">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/75 sm:text-[10px]">
          {stepNum}
        </span>
        <span className="max-w-[11rem] text-[10px] font-semibold leading-tight text-white sm:text-[11px] md:text-xs lg:max-w-none">
          {label}
        </span>
      </div>
    </li>
  );
};

const InterventionTimeline = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Frise chevron — desktop & tablette large */}
      <ol
        className="hidden min-[900px]:flex"
        aria-label="Périmètre d’intervention du cabinet, de l’idéation au suivi du projet"
      >
        {STEPS.map((step, index) => (
          <ChevronStep
            key={step.label}
            label={step.label}
            fill={step.fill}
            index={index}
            overlap="-ml-[11px] first:ml-0"
          />
        ))}
      </ol>

      {/* Tablette étroite : grille 3×2 reliée */}
      <ol
        className="hidden grid-cols-2 gap-3 min-[640px]:grid min-[900px]:hidden sm:grid-cols-3"
        aria-label="Périmètre d’intervention du cabinet, de l’idéation au suivi du projet"
      >
        {STEPS.map((step, index) => (
          <li key={step.label}>
            <div
              className="flex h-full min-h-[5.25rem] flex-col justify-between rounded-xl border border-white/10 p-4 shadow-md"
              style={{ backgroundColor: step.fill }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                Étape {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 text-xs font-semibold leading-snug text-white sm:text-sm">{step.label}</span>
            </div>
          </li>
        ))}
      </ol>

      {/* Mobile : frise verticale */}
      <ol
        className="relative space-y-0 min-[640px]:hidden"
        aria-label="Périmètre d’intervention du cabinet, de l’idéation au suivi du projet"
      >
        <div
          className="absolute bottom-4 left-[1.15rem] top-4 w-0.5 rounded-full bg-gradient-to-b from-[hsl(262,52%,42%)] via-[hsl(215,55%,44%)] to-[hsl(185,50%,58%)]"
          aria-hidden
        />
        {STEPS.map((step, index) => (
          <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
            <div
              className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-md ring-4 ring-[hsl(220,22%,97%)]"
              style={{ backgroundColor: step.fill }}
            >
              {index + 1}
            </div>
            <div
              className="flex flex-1 items-center rounded-xl px-4 py-3.5 shadow-sm"
              style={{ backgroundColor: step.fill }}
            >
              <span className="text-sm font-semibold leading-snug text-white">{step.label}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InterventionTimeline;
