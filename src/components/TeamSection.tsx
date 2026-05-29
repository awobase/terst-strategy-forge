import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import TeamFlipCard from "@/components/TeamFlipCard";
import { BRAND_NAME } from "@/config/brand";
import { ROUTES } from "@/config/navigation";
import { TEAM_INTRO, TEAM_MEMBERS } from "@/config/team";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const TeamSection = () => {
  const block = useInView();

  return (
    <section id="equipe" className="scroll-mt-28 border-b border-border/40 bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={block.ref}
          className={cn(
            "transition-all duration-700",
            block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-primary">Équipe</p>
            <h2 className="section-title mt-2">Des profils complémentaires au service de vos projets</h2>
            <p className="section-lead mx-auto mt-4">{TEAM_INTRO}</p>
          </div>

          <h3 className="mx-auto mt-14 max-w-2xl text-center font-heading text-xl font-semibold text-foreground md:mt-16 md:text-2xl">
            Rencontrez notre équipe
          </h3>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-12 sm:flex-row sm:items-stretch sm:gap-10 md:mt-12 md:max-w-3xl md:gap-16">
            {TEAM_MEMBERS.map((member) => (
              <TeamFlipCard key={member.id} member={member} />
            ))}
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:mt-20 md:grid-cols-2">
            <div className="rounded-2xl border border-border/55 bg-card p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-5 w-5" aria-hidden />
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                Lorsque la mission le nécessite, nous mobilisons un réseau caribéen de consultants indépendants et
                d&apos;expertises complémentaires&nbsp;: avocats, agences de communication, experts-comptables, etc.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-transparent p-6 md:p-8">
              <p className="text-base leading-relaxed text-foreground">
                La signature <strong className="font-semibold">{BRAND_NAME}</strong> est la garantie d&apos;un
                travail de qualité, conduit avec objectivité et professionnalisme. C&apos;est aussi la garantie d&apos;un
                engagement sans faille — l&apos;aboutissement d&apos;une mission conduite par des consultants et experts
                reconnus dans leur domaine.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border/60 bg-[hsl(220,22%,97%)] px-6 py-8 text-center md:mt-12 md:px-10 md:py-10">
            <h3 className="font-heading text-xl font-bold text-foreground">Rejoindre le cabinet</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Consultants indépendants et candidatures spontanées pour les stages sont les bienvenues. Pour nous
              présenter votre profil, votre candidature de stage ou échanger sur une collaboration, rendez-vous sur
              la page{" "}
              <Link to={ROUTES.contact} className="font-semibold text-primary hover:underline">
                Contact
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
