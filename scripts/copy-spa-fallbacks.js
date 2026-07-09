/**
 * Copie index.html dans chaque route SPA pour hébergement statique (IONOS/Apache)
 * sans mod_rewrite — ex. /admin/login/index.html
 */
import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("[spa-fallbacks] dist/index.html introuvable — lancez vite build d'abord.");
  process.exit(1);
}

const routes = [
  "admin",
  "admin/login",
  "admin/sector-references",
  "admin/team",
  "admin/testimonials",
  "admin/site-settings",
  "contact",
  "offres",
  "qui-sommes-nous",
  "mentions-legales",
];

for (const route of routes) {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(indexPath, path.join(targetDir, "index.html"));
}

console.log(`[spa-fallbacks] ${routes.length} routes SPA prêtes pour hébergement statique.`);
