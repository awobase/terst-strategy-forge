import { queryOne, execute } from "./db.js";
import { SECTOR_CATEGORIES } from "../src/config/sectorReferences.ts";
import { SECTOR_REFERENCES } from "../src/config/sectorReferencesData.ts";
import { TEAM_INTRO, TEAM_MEMBERS_TEXT } from "../src/config/teamTexts.ts";
import { TESTIMONIALS } from "../src/config/testimonials.ts";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  SOCIAL_LINKS,
} from "../src/config/contact.ts";
import { SHOW_TESTIMONIALS } from "../src/config/features.ts";
import { upsertSiteSettings } from "./site-settings.js";

export const DEFAULT_SITE_SETTINGS = {
  contactEmail: CONTACT_EMAIL,
  contactPhoneDisplay: CONTACT_PHONE_DISPLAY,
  contactPhoneTel: CONTACT_PHONE_TEL,
  socialLinkedin: SOCIAL_LINKS.linkedin,
  socialInstagram: SOCIAL_LINKS.instagram,
  showTestimonials: SHOW_TESTIMONIALS,
  teamIntro: TEAM_INTRO,
};

async function seedSectorsIfEmpty() {
  const sectorCount = await queryOne<{ c: number }>("SELECT COUNT(*) as c FROM sector_categories");
  if (sectorCount && sectorCount.c > 0) return;

  for (const [index, sector] of SECTOR_CATEGORIES.entries()) {
    await execute("INSERT INTO sector_categories (id, label, color, sort_order) VALUES (?, ?, ?, ?)", [
      sector.id,
      sector.label,
      sector.color,
      index,
    ]);
    const refs = SECTOR_REFERENCES[sector.id] ?? [];
    for (const [refIndex, ref] of refs.entries()) {
      await execute("INSERT INTO sector_references (sector_id, highlight, text, sort_order) VALUES (?, ?, ?, ?)", [
        sector.id,
        ref.highlight ?? null,
        ref.text,
        refIndex,
      ]);
    }
  }

  console.log("[seed] Références sectorielles initialisées.");
}

async function seedTeamIfEmpty() {
  const teamCount = await queryOne<{ c: number }>("SELECT COUNT(*) as c FROM team_members");
  if (teamCount && teamCount.c > 0) return;

  for (const [index, member] of TEAM_MEMBERS_TEXT.entries()) {
    await execute(
      `INSERT INTO team_members (id, first_name, last_name, title, expertise, bio, email, linkedin, instagram, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        member.id,
        member.firstName,
        member.lastName,
        member.title,
        member.expertise,
        member.bio,
        member.email ?? null,
        member.linkedin ?? null,
        member.instagram ?? null,
        index,
      ],
    );
  }

  console.log("[seed] Équipe initialisée.");
}

async function seedTestimonialsIfEmpty() {
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) as c FROM testimonials");
  if (count && count.c > 0) return;

  for (const [index, t] of TESTIMONIALS.entries()) {
    await execute(
      `INSERT INTO testimonials (first_name, last_initial, role, sector, text, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [t.firstName, t.lastInitial, t.role, t.sector, t.text, index],
    );
  }

  console.log("[seed] Témoignages initialisés.");
}

async function seedSiteSettingsIfEmpty() {
  const count = await queryOne<{ c: number }>("SELECT COUNT(*) as c FROM site_settings");
  if (count && count.c > 0) return;

  await upsertSiteSettings(DEFAULT_SITE_SETTINGS, DEFAULT_SITE_SETTINGS);
  console.log("[seed] Paramètres du site initialisés.");
}

export async function seedIfEmpty() {
  await seedSectorsIfEmpty();
  await seedTeamIfEmpty();
  await seedTestimonialsIfEmpty();
  await seedSiteSettingsIfEmpty();
}
