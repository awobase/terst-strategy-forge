import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/config/navigation";
import { cn } from "@/lib/utils";

type NextStepCTAProps = {
  className?: string;
  /** Lien cible */
  to?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
};

const NextStepCTA = ({
  className,
  to = ROUTES.contact,
  title = "Prochaine étape",
  description = "Un échange court pour cadrer votre besoin, vérifier l’adéquation avec nos expertises et vous proposer une suite (cadrage, proposition ou orientation).",
  buttonLabel = "Prendre contact",
}: NextStepCTAProps) => {
  const headingId = "prochaine-etape-titre";

  return (
    <aside
      className={cn(
        "rounded-xl border border-border/70 bg-card p-6 shadow-sm md:p-8",
        className,
      )}
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">{description}</p>
      <Link
        to={to}
        className="group mt-5 inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-secondary/25 hover:brightness-[1.02] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
      >
        {buttonLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </aside>
  );
};

export default NextStepCTA;
