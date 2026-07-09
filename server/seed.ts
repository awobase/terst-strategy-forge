import { queryOne, execute } from "./db.js";
import { SECTOR_CATEGORIES } from "../src/config/sectorReferences.ts";
import { SECTOR_REFERENCES } from "../src/config/sectorReferencesData.ts";

export async function seedIfEmpty() {
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
