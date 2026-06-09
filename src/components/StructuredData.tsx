import { useEffect } from "react";
import { BRAND_NAME } from "@/config/brand";
import { CONTACT_EMAIL, CONTACT_PHONE_TEL } from "@/config/contact";
import { OG_IMAGE_URL, SITE_DEFAULT_DESCRIPTION, SITE_ORIGIN } from "@/config/site";

const SCRIPT_ID = "cayribe-structured-data";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: BRAND_NAME,
      url: SITE_ORIGIN,
      image: OG_IMAGE_URL,
      description: SITE_DEFAULT_DESCRIPTION,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_TEL,
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
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_TEL,
      priceRange: "$$",
      areaServed: ["Guadeloupe", "Martinique", "Antilles", "Caraïbe"],
      parentOrganization: { "@id": `${SITE_ORIGIN}/#organization` },
    },
  ],
};

const StructuredData = () => {
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
  }, []);

  return null;
};

export default StructuredData;
