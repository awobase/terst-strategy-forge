import { Instagram, Linkedin, Mail } from "lucide-react";
import type { TeamMember } from "@/config/team";
import { cn } from "@/lib/utils";

const themeStyles = {
  blue: {
    face: "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30",
    ring: "ring-white/40",
    title: "text-primary-foreground",
    expertise: "text-primary-foreground/85",
    iconBtn:
      "border-white/30 bg-white/10 text-primary-foreground hover:border-white/50 hover:bg-white/20",
    back: "border-white/20 bg-primary text-primary-foreground",
    backLabel: "text-primary-foreground/75",
    hint: "text-primary-foreground/55",
    focusRing: "focus-visible:ring-primary focus-visible:ring-offset-background",
  },
  orange: {
    face: "border-secondary bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30",
    ring: "ring-white/40",
    title: "text-secondary-foreground",
    expertise: "text-secondary-foreground/85",
    iconBtn:
      "border-white/30 bg-white/10 text-secondary-foreground hover:border-white/50 hover:bg-white/20",
    back: "border-white/20 bg-secondary text-secondary-foreground",
    backLabel: "text-secondary-foreground/75",
    hint: "text-secondary-foreground/55",
    focusRing: "focus-visible:ring-secondary focus-visible:ring-offset-background",
  },
} as const;

type TeamFlipCardProps = {
  member: TeamMember;
  className?: string;
};

function MemberContactLinks({
  member,
  displayName,
  iconBtnClass,
}: {
  member: TeamMember;
  displayName: string;
  iconBtnClass: string;
}) {
  return (
    <div className="flex gap-3">
      {member.email ? (
        <a
          href={`mailto:${member.email}`}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition",
            iconBtnClass,
          )}
          aria-label={`Envoyer un e-mail à ${displayName}`}
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
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition",
            iconBtnClass,
          )}
          aria-label={`Profil LinkedIn de ${displayName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Linkedin className="h-4 w-4" aria-hidden />
        </a>
      ) : null}
      {member.instagram ? (
        <a
          href={member.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border transition",
            iconBtnClass,
          )}
          aria-label={`Profil Instagram de ${displayName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Instagram className="h-4 w-4" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}

const TeamFlipCard = ({ member, className }: TeamFlipCardProps) => {
  const t = themeStyles[member.theme];
  const displayName = `${member.firstName} ${member.lastName}`;

  return (
    <article
      tabIndex={0}
      className={cn(
        "group mx-auto w-full max-w-[280px] rounded-3xl outline-none",
        t.focusRing,
        "focus-visible:ring-2 focus-visible:ring-offset-4",
        className,
      )}
      aria-label={`${displayName} — ${member.title}. Survoler ou activer pour la présentation.`}
    >
      <div className="relative h-[400px] w-full [perspective:1000px]">
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-500 ease-in-out",
            "[transform-style:preserve-3d]",
            "group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]",
          )}
        >
          <div
            className={cn(
              "absolute inset-0 flex flex-col items-center rounded-3xl border-2 px-6 pb-6 pt-8",
              t.face,
              "[backface-visibility:hidden]",
            )}
          >
            <div className={cn("relative h-36 w-36 shrink-0 overflow-hidden rounded-full ring-4", t.ring)}>
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={displayName}
                  className="h-full w-full object-cover object-top"
                  width={144}
                  height={144}
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-white/15 font-heading text-4xl font-bold text-inherit"
                  aria-hidden
                >
                  {member.initials}
                </div>
              )}
            </div>
            <h3 className="mt-6 text-center font-heading text-xl font-bold leading-tight">
              {member.firstName}{" "}
              <span className="uppercase tracking-wide">{member.lastName}</span>
            </h3>
            <p className={cn("mt-2 text-center text-sm font-semibold", t.title)}>{member.title}</p>
            <p className={cn("mt-3 text-center text-sm leading-relaxed", t.expertise)}>{member.expertise}</p>
            <div className="mt-auto flex gap-3 pt-6">
              <MemberContactLinks member={member} displayName={displayName} iconBtnClass={t.iconBtn} />
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 flex flex-col rounded-3xl border-2 px-6 py-8",
              t.back,
              "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            )}
          >
            <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", t.backLabel)}>Présentation</p>
            <p className="mt-4 flex-1 overflow-y-auto text-sm leading-relaxed">{member.bio}</p>
            <div className="mt-4 flex flex-col items-center gap-4">
              <MemberContactLinks member={member} displayName={displayName} iconBtnClass={t.iconBtn} />
              <p className={cn("text-center text-xs", t.hint)}>Survoler pour revenir au profil</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TeamFlipCard;
