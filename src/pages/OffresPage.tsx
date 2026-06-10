import { Link } from "react-router-dom";
import offresEtudePerso from "@/assets/offres-etude-perso.png";
import offresFormation from "@/assets/offres-formation.png";
import offresRechFinancements from "@/assets/offres-rech-financements.png";
import SiteLayout from "@/components/SiteLayout";
import PageMeta from "@/components/PageMeta";
import TestimonialsSection from "@/components/TestimonialsSection";
import { SHOW_TESTIMONIALS } from "@/config/features";
import { ROUTES } from "@/config/navigation";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import StandardOffersSection from "@/components/StandardOffersSection";
import LogoMarquee from "@/components/LogoMarquee";
import OffresStickyNav from "@/components/OffresStickyNav";
import { FUNDING_PARTNER_LOGOS, type FundingPartnerLogo } from "@/config/fundingPartners";
import {
  ArrowRight,
  CheckCircle2,
  Landmark,
  Presentation,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

function MarketStudyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L20 20" />
      <path d="M7.5 12.5L9.5 9.5L11.5 11L14.5 7.5" />
    </svg>
  );
}

type ServiceOfferChapterProps = {
  id: string;
  index: number;
  title: string;
  tags: readonly string[];
  lead: string;
  detail: string;
  listTitle: string;
  listItems: string[];
  footer?: string;
  icon: LucideIcon | typeof MarketStudyIcon;
  ctaInHeader?: boolean;
  partnerLogos?: readonly FundingPartnerLogo[];
  photo?: {
    src: string;
    alt: string;
    /** Cadre ajusté au format naturel de l'image, sans recadrage */
    contain?: boolean;
  };
  /** Photo à droite à la place de la liste ; la liste passe en dessous */
  photoBesideList?: boolean;
};

const quickLinks = [
  { href: "#offres-standard", name: "Start & Rise" },
  { href: "#etudes-personnalisees", name: "Études" },
  { href: "#recherche-financements", name: "Financements" },
  { href: "#formation-cabinet", name: "Formations" },
];

const offresNavItems = [
  { id: "offres-standard", label: "Start & Rise" },
  { id: "etudes-personnalisees", label: "Études" },
  { id: "recherche-financements", label: "Financements" },
  { id: "formation-cabinet", label: "Formations" },
  ...(SHOW_TESTIMONIALS ? [{ id: "temoignages" as const, label: "Témoignages" as const }] : []),
] as const;

function ServiceOfferChapter({
  id,
  index,
  title,
  tags,
  lead,
  detail,
  listTitle,
  listItems,
  footer,
  icon: Icon,
  ctaInHeader = false,
  partnerLogos,
  photo,
  photoBesideList = false,
}: ServiceOfferChapterProps) {
  const block = useInView();
  const bgMuted = index % 2 === 1;

  const ctaLink = (
    <Link
      to={ROUTES.contact}
      className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      Discuter de cette offre
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );

  const listBlock = (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm md:p-8">
      <h3 className="font-heading text-lg font-bold text-foreground md:text-xl">{listTitle}</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {listItems.map((line, i) => (
          <li
            key={line}
            className={cn(
              "flex gap-3 rounded-xl border border-border/40 bg-background/80 px-4 py-3.5",
              (line.length > 100 || (i === 0 && listItems.length % 2 === 1)) && "sm:col-span-2",
            )}
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden />
            <span className="text-sm leading-relaxed text-foreground/85">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const photoBlock = photo ? (
    <div className="group overflow-hidden rounded-3xl shadow-xl ring-1 ring-border/50">
      <img
        src={photo.src}
        alt={photo.alt}
        className={cn(
          "w-full origin-center transition duration-700",
          photo.contain
            ? "block h-auto w-full"
            : "aspect-[16/10] min-h-[220px] object-cover object-center group-hover:scale-[1.02] sm:min-h-[280px] md:min-h-[360px] lg:min-h-[420px]",
        )}
        loading="lazy"
        decoding="async"
      />
    </div>
  ) : null;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-b border-border/40 py-20 md:py-28",
        bgMuted ? "bg-[hsl(220,22%,97%)]" : "bg-background",
      )}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={block.ref}
          className={cn(
            "transition-all duration-700",
            block.inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
          )}
        >
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-14 lg:gap-y-12">
            {/* Intro */}
            <header className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary md:h-14 md:w-14">
                  <Icon className="h-6 w-6 md:h-7 md:w-7" strokeWidth={1.6} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap gap-x-2.5 gap-y-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold uppercase tracking-[0.1em] text-primary/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-1 font-heading text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl lg:text-[2.125rem]">
                    {title}
                  </h2>
                </div>
              </div>

              <blockquote className="mt-8 border-l-4 border-secondary bg-card/60 py-4 pl-5 pr-4 shadow-sm md:mt-10 md:py-5 md:pl-6">
                <p className="text-base font-medium leading-relaxed text-foreground md:text-lg md:leading-relaxed">
                  {lead}
                </p>
              </blockquote>

              <p className="mt-6 text-[0.98rem] leading-[1.75] text-muted-foreground md:text-base md:leading-[1.8]">
                {detail}
              </p>

              {ctaInHeader ? <div className="mt-6 hidden lg:block">{ctaLink}</div> : null}
            </header>

            {/* Liste ou photo (colonne droite) */}
            <div className="mt-12 lg:col-span-7 lg:mt-0">
              {photoBesideList && photoBlock ? photoBlock : listBlock}
            </div>
          </div>

          {photoBesideList && photo ? (
            <div className="mx-auto mt-10 w-full max-w-5xl md:mt-14">{listBlock}</div>
          ) : photo ? (
            <div className="mx-auto mt-10 w-full max-w-5xl md:mt-14">{photoBlock}</div>
          ) : null}

          {footer ? (
            <aside className="mx-auto mt-12 max-w-4xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card to-transparent px-6 py-6 md:mt-14 md:px-10 md:py-8">
              <p className="text-center text-[0.98rem] leading-[1.75] text-muted-foreground md:text-base md:leading-relaxed">
                {footer}
              </p>
            </aside>
          ) : null}

          {partnerLogos ? (
            <LogoMarquee logos={partnerLogos} layout="static" className="mt-10 md:mt-12" />
          ) : null}

          <div className={cn("flex justify-center", partnerLogos ? "mt-8 md:mt-10" : "mt-10 md:mt-12")}>
            {ctaLink}
          </div>
        </div>
      </div>
    </section>
  );
}

const OffresPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Offres"
        description="Start, Rise, études personnalisées et recherche de financements : accompagnement concret et orienté résultats — CAYRIBE PARTNERS."
        canonicalPath="/offres"
      />

      <section className="relative overflow-hidden bg-[hsl(222,42%,12%)] text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 30%, hsl(32 88% 52% / 0.14) 0%, transparent 42%),
              radial-gradient(circle at 90% 50%, hsl(222 58% 48% / 0.18) 0%, transparent 38%),
              linear-gradient(180deg, transparent 0%, hsl(222 42% 8% / 0.92) 100%)`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 100% / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 100% / 0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="container relative z-10 mx-auto px-4 pb-24 pt-24 sm:px-6 md:pb-28 md:pt-28 lg:px-8">
          <p className="eyebrow mb-4 text-secondary">Offres</p>
          <h1 className="max-w-[20ch] font-heading text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.35rem]">
            Nos offres d&apos;accompagnement
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl">
            Nous accompagnons les porteurs de projets et les entreprises à chaque étape de leur développement, de la
            structuration initiale à l&apos;accélération stratégique. Nos offres reposent sur un principe simple : un
            accompagnement concret, personnalisé et orienté résultats.
          </p>
        </div>
      </section>

      <div className="relative z-20 -mt-14 md:-mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((q) => (
              <a
                key={q.href}
                href={q.href}
                className="group flex flex-col rounded-2xl border border-border/60 bg-card/95 p-5 shadow-lg shadow-primary/5 backdrop-blur-md transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <span className="font-heading text-xl font-bold text-foreground">{q.name}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Détails
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <OffresStickyNav items={offresNavItems} />

      <StandardOffersSection />

      <ServiceOfferChapter
        id="etudes-personnalisees"
        index={2}
        tags={["#MARCHE", "#FAISABILITE", "#VIABILITE"]}
        title="Études personnalisées"
        lead="Certaines étapes clés nécessitent des analyses approfondies avant toute prise de décision."
        detail="Nos études personnalisées répondent à des besoins spécifiques, ponctuels ou stratégiques, grâce à une approche rigoureuse mêlant analyses économiques, marketing et financières."
        listTitle="Domaines d’intervention possibles"
        listItems={[
          "Étude de marché et analyse sectorielle",
          "Étude de faisabilité économique et financière",
          "Diagnostic d’activité ou d’entreprise",
          "Analyse d’opportunité d’investissement",
          "Étude de positionnement stratégique",
          "Analyse de rentabilité ou modèle économique",
          "Études territoriales ou sectorielles pour acteurs publics",
        ]}
        footer="Chaque mission fait l’objet d’un forfait adapté à votre besoin, défini après un échange préalable permettant de bien comprendre vos enjeux."
        icon={MarketStudyIcon}
        ctaInHeader
        photo={{
          src: offresEtudePerso,
          alt: "Échange professionnel autour d'un bureau lors d'une étude personnalisée",
          contain: true,
        }}
        photoBesideList
      />

      <ServiceOfferChapter
        id="recherche-financements"
        index={3}
        tags={["#Prêts", "#Subventions", "#Levéedefonds"]}
        title="Recherche de financements"
        lead="L’accès au financement constitue souvent une étape déterminante dans la réussite d’un projet ou le développement d’une entreprise ou association."
        detail="Nous vous accompagnons dans l’identification, la structuration et la mobilisation des financements les plus adaptés à votre situation. Notre approche combine expertise financière, connaissance des dispositifs publics et compréhension des attentes des financeurs."
        listTitle="Notre accompagnement comprend"
        listItems={[
          "Identification des dispositifs de financement pertinents (subventions, crédit d’impôt, aides régionales et européennes, appels à projets publics, levées de fonds)",
          "Structuration de la stratégie de financement",
          "Montage des dossiers de financement",
          "Élaboration ou optimisation du prévisionnel financier",
          "Préparation aux échanges avec les financeurs",
          "Appui lors des phases d’instruction",
        ]}
        icon={Landmark}
        ctaInHeader
        partnerLogos={FUNDING_PARTNER_LOGOS}
        photo={{
          src: offresRechFinancements,
          alt: "Accompagnement CAYRIBE PARTNERS en recherche et montage de financements",
        }}
        photoBesideList
      />

      <ServiceOfferChapter
        id="formation-cabinet"
        index={4}
        tags={["#Ateliers", "#Webinaire", "#Conférences"]}
        title="Formations"
        lead="Le développement d’un projet repose aussi sur l’accès à une information claire, à des outils adaptés et à une vision stratégique permettant de prendre les bonnes décisions."
        detail="À travers nos ateliers, webinaires et conférences, nous transmettons des outils, des méthodes et des clés de compréhension autour de la stratégie, du financement et du développement de projet. Chaque intervention est pensée pour apporter des conseils concrets, applicables et adaptés aux réalités du terrain."
        listTitle="Nos interventions comprennent"
        listItems={[
          "Conception et animation d’ateliers",
          "Organisation de webinaires thématiques interactifs",
          "Interventions lors de conférences, événements et programmes d’accompagnement",
          "Apport d’outils concrets pour structurer et développer un projet",
          "Décryptage des enjeux liés à l’entrepreneuriat, au financement et au pilotage d’activité",
          "Partage de méthodologies applicables et retours d’expérience",
          "Adaptation des contenus aux problématiques et objectifs des participants",
        ]}
        icon={Presentation}
        ctaInHeader
        photo={{
          src: offresFormation,
          alt: "Atelier de formation animé par CAYRIBE PARTNERS",
        }}
        photoBesideList
      />

      {SHOW_TESTIMONIALS ? <TestimonialsSection /> : null}
    </SiteLayout>
  );
};

export default OffresPage;
