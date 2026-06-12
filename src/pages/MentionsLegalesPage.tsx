import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import { BRAND_NAME } from "@/config/brand";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from "@/config/contact";
import { SITE_ORIGIN } from "@/config/site";

const legalSections = [
  {
    title: "Éditeur du site",
    content: [
      `${BRAND_NAME}`,
      "Cabinet indépendant de conseil en stratégie et performance.",
      `Site internet : ${SITE_ORIGIN}`,
      `E-mail : ${CONTACT_EMAIL}`,
      `Téléphone : ${CONTACT_PHONE_DISPLAY}`,
    ],
  },
  {
    title: "Directeur de la publication",
    content: [`${BRAND_NAME}, représenté par sa direction.`],
  },
  {
    title: "Hébergement",
    content: [
      "Les informations relatives à l'hébergeur du site seront précisées dans la version définitive des mentions légales.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      `L'ensemble des contenus présents sur ce site, notamment les textes, visuels, logos, éléments graphiques et structure générale, est protégé par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable de ${BRAND_NAME}, est interdite.`,
    ],
  },
  {
    title: "Données personnelles",
    content: [
      "Les informations transmises via les formulaires de contact sont utilisées uniquement pour répondre aux demandes adressées au cabinet. Conformément à la réglementation applicable, vous pouvez exercer vos droits d'accès, de rectification et de suppression en écrivant à l'adresse e-mail de contact du cabinet.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Le site peut utiliser des cookies strictement nécessaires à son fonctionnement et, le cas échéant, des outils de mesure d'audience. Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies.",
    ],
  },
  {
    title: "Responsabilité",
    content: [
      `${BRAND_NAME} s'efforce de fournir des informations exactes et mises à jour. Le cabinet ne saurait toutefois garantir l'exhaustivité des informations publiées ni être tenu responsable de l'utilisation qui en serait faite.`,
    ],
  },
];

const MentionsLegalesPage = () => {
  return (
    <SiteLayout>
      <PageMeta
        title="Mentions légales"
        description={`Mentions légales du site ${BRAND_NAME}.`}
        canonicalPath="/mentions-legales"
      />
      <PageHero
        variant="editorial"
        title="Mentions légales"
        description="Informations légales relatives au site et à son éditeur."
      />

      <section className="border-b border-border/40 bg-background py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {legalSections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8">
                <h2 className="font-heading text-xl font-bold text-foreground md:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {section.content.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default MentionsLegalesPage;
