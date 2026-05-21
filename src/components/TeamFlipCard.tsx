import { Linkedin, Mail } from "lucide-react";
import type { TeamMember } from "@/config/team";
import { cn } from "@/lib/utils";

type TeamFlipCardProps = {
  member: TeamMember;
  className?: string;
};

const TeamFlipCard = ({ member, className }: TeamFlipCardProps) => {
  return (
    <article
      tabIndex={0}
      className={cn(
        "group mx-auto w-full max-w-[280px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 rounded-3xl",
        className,
      )}
      aria-label={`${member.name} — ${member.role}. Survoler ou activer pour la présentation.`}
    >
      <div className="relative h-[380px] w-full [perspective:1000px]">
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-500 ease-in-out",
            "[transform-style:preserve-3d]",
            "group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]",
          )}
        >
          {/* Face avant */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center rounded-3xl border border-border/60 bg-card px-6 pb-6 pt-8 shadow-md",
              "[backface-visibility:hidden]",
            )}
          >
            <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full ring-4 ring-primary/10">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover object-top"
                  width={144}
                  height={144}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 font-heading text-4xl font-bold text-primary"
                  aria-hidden
                >
                  {member.initials}
                </div>
              )}
            </div>
            <h3 className="mt-6 font-heading text-xl font-bold text-primary">{member.name}</h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">{member.role}</p>
            <div className="mt-auto flex gap-3 pt-8">
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40 text-primary transition hover:border-primary/30 hover:bg-primary/10"
                  aria-label={`Envoyer un e-mail à ${member.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail className="h-4 w-4" aria-hidden />
                </a>
              ) : null}
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted/40 text-primary transition hover:border-primary/30 hover:bg-primary/10"
                  aria-label={`Profil LinkedIn de ${member.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                </a>
              ) : null}
            </div>
          </div>

          {/* Face arrière */}
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-center rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-card px-6 py-8 shadow-md",
              "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Présentation</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">{member.bio}</p>
            <p className="mt-6 text-center text-xs text-muted-foreground">Survoler pour revenir au profil</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TeamFlipCard;
