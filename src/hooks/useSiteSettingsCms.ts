import { useQuery } from "@tanstack/react-query";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  SOCIAL_LINKS,
} from "@/config/contact";
import { SHOW_TESTIMONIALS } from "@/config/features";
import { TEAM_INTRO } from "@/config/team";
import { fetchSiteSettings, isApiAvailable, type ApiSiteSettings } from "@/lib/cms-api";

export const STATIC_SITE_SETTINGS: ApiSiteSettings = {
  contactEmail: CONTACT_EMAIL,
  contactPhoneDisplay: CONTACT_PHONE_DISPLAY,
  contactPhoneTel: CONTACT_PHONE_TEL,
  socialLinkedin: SOCIAL_LINKS.linkedin,
  socialInstagram: SOCIAL_LINKS.instagram,
  showTestimonials: SHOW_TESTIMONIALS,
  teamIntro: TEAM_INTRO,
};

export function useSiteSettingsCms() {
  return useQuery({
    queryKey: ["site-settings"],
    placeholderData: STATIC_SITE_SETTINGS,
    queryFn: async () => {
      const available = await isApiAvailable();
      if (!available) return STATIC_SITE_SETTINGS;
      try {
        return await fetchSiteSettings();
      } catch {
        return STATIC_SITE_SETTINGS;
      }
    },
    staleTime: 60_000,
  });
}

export function contactPhoneHref(phoneTel: string) {
  return `tel:${phoneTel}`;
}
