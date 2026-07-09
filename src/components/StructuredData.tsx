import { useEffect, useMemo } from "react";
import { BRAND_NAME } from "@/config/brand";
import { OG_IMAGE_URL, SITE_DEFAULT_DESCRIPTION, SITE_ORIGIN } from "@/config/site";
import { STATIC_SITE_SETTINGS, useSiteSettingsCms } from "@/hooks/useSiteSettingsCms";

const SCRIPT_ID = "cayribe-structured-data";

const StructuredData = () => {
  const { data: settings = STATIC_SITE_SETTINGS } = useSiteSettingsCms();

  const organizationSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfessionalService",
          "@id": `${SITE_ORIGIN}/#organization`,
          name: BRAND_NAME,
          url: SITE_ORIGIN,
          image: OG_IMAGE_URL,
          description: SITE_DEFAULT_DESCRIPTION,
          email: settings.contactEmail,
          telephone: settings.contactPhoneTel,
          areaServed: [
            { "@type": "AdministrativeArea", name: "Guadeloupe" },
            { "@type": "AdministrativeArea", name: "Martinique" },
          ],
          serviceType: [
            "Conseil en stratégie",
            "Accompagnement de projets",
            "Recherche de financements",
            "Études de faisabilité",
          ],
        },
        {
          "@type": "LocalBusiness",
          "@id": `${SITE_ORIGIN}/#localbusiness`,
          name: BRAND_NAME,
          url: SITE_ORIGIN,
          image: OG_IMAGE_URL,
          description: SITE_DEFAULT_DESCRIPTION,
          email: settings.contactEmail,
          telephone: settings.contactPhoneTel,
          priceRange: "$$",
          areaServed: ["Guadeloupe", "Martinique", "Antilles", "Caraïbe"],
          parentOrganization: { "@id": `${SITE_ORIGIN}/#organization` },
        },
      ],
    }),
    [settings.contactEmail, settings.contactPhoneTel],
  );

  useEffect(() => {
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(organizationSchema);

    return () => {
      script?.remove();
    };
  }, [organizationSchema]);

  return null;
};

export default StructuredData;
