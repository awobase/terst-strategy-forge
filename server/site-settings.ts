import { query, queryOne, execute } from "./db.js";

export const SITE_SETTING_KEYS = [
  "contact_email",
  "contact_phone_display",
  "contact_phone_tel",
  "social_linkedin",
  "social_instagram",
  "show_testimonials",
  "team_intro",
] as const;

export type SiteSettingKey = (typeof SITE_SETTING_KEYS)[number];

export type SiteSettings = {
  contactEmail: string;
  contactPhoneDisplay: string;
  contactPhoneTel: string;
  socialLinkedin: string;
  socialInstagram: string;
  showTestimonials: boolean;
  teamIntro: string;
};

const KEY_MAP: Record<SiteSettingKey, keyof SiteSettings> = {
  contact_email: "contactEmail",
  contact_phone_display: "contactPhoneDisplay",
  contact_phone_tel: "contactPhoneTel",
  social_linkedin: "socialLinkedin",
  social_instagram: "socialInstagram",
  show_testimonials: "showTestimonials",
  team_intro: "teamIntro",
};

export function siteSettingsToDb(settings: Partial<SiteSettings>): Partial<Record<SiteSettingKey, string>> {
  const out: Partial<Record<SiteSettingKey, string>> = {};
  if (settings.contactEmail !== undefined) out.contact_email = settings.contactEmail;
  if (settings.contactPhoneDisplay !== undefined) out.contact_phone_display = settings.contactPhoneDisplay;
  if (settings.contactPhoneTel !== undefined) out.contact_phone_tel = settings.contactPhoneTel;
  if (settings.socialLinkedin !== undefined) out.social_linkedin = settings.socialLinkedin;
  if (settings.socialInstagram !== undefined) out.social_instagram = settings.socialInstagram;
  if (settings.showTestimonials !== undefined) out.show_testimonials = settings.showTestimonials ? "true" : "false";
  if (settings.teamIntro !== undefined) out.team_intro = settings.teamIntro;
  return out;
}

export async function getSiteSettings(defaults: SiteSettings): Promise<SiteSettings> {
  const rows = await query<{ setting_key: string; setting_value: string }>(
    "SELECT setting_key, setting_value FROM site_settings",
  );
  const merged = { ...defaults };
  for (const row of rows) {
    const key = row.setting_key as SiteSettingKey;
    const field = KEY_MAP[key];
    if (!field) continue;
    if (field === "showTestimonials") {
      merged.showTestimonials = row.setting_value === "true" || row.setting_value === "1";
    } else {
      merged[field] = row.setting_value;
    }
  }
  return merged;
}

export async function upsertSiteSettings(settings: Partial<SiteSettings>, defaults: SiteSettings) {
  const entries = Object.entries(siteSettingsToDb(settings)) as [SiteSettingKey, string][];
  for (const [key, value] of entries) {
    const existing = await queryOne("SELECT setting_key FROM site_settings WHERE setting_key = ?", [key]);
    if (existing) {
      await execute("UPDATE site_settings SET setting_value = ? WHERE setting_key = ?", [value, key]);
    } else {
      await execute("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)", [key, value]);
    }
  }
  return getSiteSettings(defaults);
}
