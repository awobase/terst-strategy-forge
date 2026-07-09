import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { initSchema, uploadsDir, query, queryOne, execute, pingDb, getDriver } from "./db.js";
import { ensureDefaultAdmin, loginAdmin, requireAdmin } from "./auth.js";
import { seedIfEmpty, DEFAULT_SITE_SETTINGS } from "./seed.js";
import { sendContactEmail, isMailConfigured } from "./mail.js";
import { getSiteSettings, upsertSiteSettings } from "./site-settings.js";
import { CONTACT_OBJET_OPTIONS, isContactObjetParam } from "../src/config/contactForm.ts";

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

const allowedOrigins = process.env.ALLOW_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins?.length
      ? (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
          }
          callback(new Error("Origine non autorisée"));
        }
      : true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (_req, file, cb) => {
      const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
      cb(null, `${Date.now()}-${safe}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Image uniquement"));
      return;
    }
    cb(null, true);
  },
});

app.use("/uploads", express.static(path.join(process.cwd(), "data/uploads")));

// ——— Public ———
app.get("/api/health", async (_req, res) => {
  const dbOk = await pingDb();
  res.json({ ok: dbOk, driver: getDriver(), db: dbOk ? "connected" : "error" });
});

app.get("/api/trust-partners", async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, alt, image_url as imageUrl, scale, sort_order as sortOrder
       FROM trust_partners WHERE active = 1 ORDER BY sort_order ASC, id ASC`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/api/sector-references", async (_req, res) => {
  try {
    const categories = await query<{ id: string; label: string; color: string; sortOrder: number }>(
      `SELECT id, label, color, sort_order as sortOrder FROM sector_categories ORDER BY sort_order ASC, label ASC`,
    );

    const refs = await query<{ id: number; sectorId: string; highlight: string | null; text: string; sortOrder: number }>(
      `SELECT id, sector_id as sectorId, highlight, text, sort_order as sortOrder
       FROM sector_references ORDER BY sort_order ASC, id ASC`,
    );

    const bySector: Record<string, typeof refs> = {};
    for (const ref of refs) {
      if (!bySector[ref.sectorId]) bySector[ref.sectorId] = [];
      bySector[ref.sectorId].push(ref);
    }

    res.json(
      categories
        .map((cat) => ({
          ...cat,
          references: (bySector[cat.id] ?? []).map(({ highlight, text }) => ({
            highlight: highlight ?? undefined,
            text,
          })),
        }))
        .filter((cat) => cat.references.length > 0),
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { nom, email, entreprise, telephone, objet, message } = req.body ?? {};

  const nomStr = String(nom ?? "").trim();
  const emailStr = String(email ?? "").trim();
  const messageStr = String(message ?? "").trim();
  const objetStr = String(objet ?? "").trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);

  if (nomStr.length < 2) {
    res.status(400).json({ error: "Nom et prénom requis (2 caractères minimum)." });
    return;
  }
  if (!emailOk) {
    res.status(400).json({ error: "Adresse e-mail invalide." });
    return;
  }
  if (!isContactObjetParam(objetStr)) {
    res.status(400).json({ error: "Veuillez sélectionner une demande valide." });
    return;
  }
  if (messageStr.length < 15) {
    res.status(400).json({ error: "Message trop court (15 caractères minimum)." });
    return;
  }
  if (!isMailConfigured()) {
    console.error("[contact] SMTP ou RESEND_API_KEY non configuré");
    res.status(503).json({ error: "Envoi temporairement indisponible. Contactez-nous par téléphone ou e-mail." });
    return;
  }

  const objetLabel = CONTACT_OBJET_OPTIONS.find((opt) => opt.value === objetStr)?.label ?? objetStr;

  try {
    await sendContactEmail({
      nom: nomStr,
      email: emailStr,
      entreprise: String(entreprise ?? "").trim() || undefined,
      telephone: String(telephone ?? "").trim() || undefined,
      objet: objetStr,
      objetLabel,
      message: messageStr,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    res.status(500).json({ error: "Impossible d'envoyer le message. Réessayez plus tard." });
  }
});

app.get("/api/site-settings", async (_req, res) => {
  try {
    const settings = await getSiteSettings(DEFAULT_SITE_SETTINGS);
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/api/team", async (_req, res) => {
  try {
    const settings = await getSiteSettings(DEFAULT_SITE_SETTINGS);
    const members = await query(
      `SELECT id, first_name as firstName, last_name as lastName, title, expertise, bio,
              email, linkedin, instagram, sort_order as sortOrder
       FROM team_members WHERE active = 1 ORDER BY sort_order ASC, id ASC`,
    );
    res.json({ intro: settings.teamIntro, members });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/api/testimonials", async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, first_name as firstName, last_initial as lastInitial, role, sector, text, sort_order as sortOrder
       FROM testimonials WHERE active = 1 ORDER BY sort_order ASC, id ASC`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ——— Auth ———
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    res.status(400).json({ error: "Identifiants requis" });
    return;
  }
  try {
    const token = await loginAdmin(String(username), String(password));
    if (!token) {
      res.status(401).json({ error: "Identifiants incorrects" });
      return;
    }
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ——— Admin: trust partners ———
app.get("/api/admin/trust-partners", requireAdmin, async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, alt, image_url as imageUrl, scale, sort_order as sortOrder, active
       FROM trust_partners ORDER BY sort_order ASC, id ASC`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/admin/trust-partners", requireAdmin, upload.single("image"), async (req, res) => {
  const { alt, scale } = req.body;
  if (!alt || !req.file) {
    res.status(400).json({ error: "alt et image requis" });
    return;
  }
  try {
    const maxOrder = await queryOne<{ m: number }>("SELECT COALESCE(MAX(sort_order), -1) as m FROM trust_partners");
    const imageUrl = `/uploads/trust-partners/${req.file.filename}`;
    const result = await execute("INSERT INTO trust_partners (alt, image_url, scale, sort_order) VALUES (?, ?, ?, ?)", [
      String(alt),
      imageUrl,
      Number(scale) || 1,
      (maxOrder?.m ?? -1) + 1,
    ]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/admin/trust-partners/:id", requireAdmin, upload.single("image"), async (req, res) => {
  const id = Number(req.params.id);
  try {
    const existing = await queryOne<{
      alt: string;
      image_url: string;
      scale: number;
      sort_order: number;
      active: number;
    }>("SELECT * FROM trust_partners WHERE id = ?", [id]);
    if (!existing) {
      res.status(404).json({ error: "Introuvable" });
      return;
    }
    const { alt, scale, sortOrder, active } = req.body;
    const imageUrl = req.file ? `/uploads/trust-partners/${req.file.filename}` : existing.image_url;
    await execute(
      `UPDATE trust_partners SET alt = ?, image_url = ?, scale = ?, sort_order = ?, active = ? WHERE id = ?`,
      [
        alt ?? existing.alt,
        imageUrl,
        scale !== undefined ? Number(scale) : existing.scale,
        sortOrder !== undefined ? Number(sortOrder) : existing.sort_order,
        active !== undefined
          ? active === "true" || active === true || active === "1" || active === 1
            ? 1
            : 0
          : existing.active,
        id,
      ],
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/api/admin/trust-partners/:id", requireAdmin, async (req, res) => {
  try {
    await execute("DELETE FROM trust_partners WHERE id = ?", [Number(req.params.id)]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ——— Admin: sectors ———
app.get("/api/admin/sectors", requireAdmin, async (_req, res) => {
  try {
    const categories = await query(
      `SELECT id, label, color, sort_order as sortOrder FROM sector_categories ORDER BY sort_order ASC`,
    );
    const references = await query(
      `SELECT id, sector_id as sectorId, highlight, text, sort_order as sortOrder FROM sector_references ORDER BY sort_order ASC`,
    );
    res.json({ categories, references });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/admin/sectors", requireAdmin, async (req, res) => {
  const { id, label, color, sortOrder } = req.body;
  if (!id || !label || !color) {
    res.status(400).json({ error: "id, label et color requis" });
    return;
  }
  try {
    await execute("INSERT INTO sector_categories (id, label, color, sort_order) VALUES (?, ?, ?, ?)", [
      String(id),
      String(label),
      String(color),
      Number(sortOrder) || 0,
    ]);
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/admin/sectors/:id", requireAdmin, async (req, res) => {
  const { label, color, sortOrder } = req.body;
  try {
    await execute("UPDATE sector_categories SET label = ?, color = ?, sort_order = ? WHERE id = ?", [
      label,
      color,
      Number(sortOrder) || 0,
      req.params.id,
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/api/admin/sectors/:id", requireAdmin, async (req, res) => {
  try {
    await execute("DELETE FROM sector_references WHERE sector_id = ?", [req.params.id]);
    await execute("DELETE FROM sector_categories WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/admin/sector-references", requireAdmin, async (req, res) => {
  const { sectorId, highlight, text, sortOrder } = req.body;
  if (!sectorId || !text) {
    res.status(400).json({ error: "sectorId et text requis" });
    return;
  }
  try {
    const result = await execute(
      "INSERT INTO sector_references (sector_id, highlight, text, sort_order) VALUES (?, ?, ?, ?)",
      [sectorId, highlight ?? null, text, Number(sortOrder) || 0],
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/admin/sector-references/:id", requireAdmin, async (req, res) => {
  const { highlight, text, sortOrder, sectorId } = req.body;
  try {
    await execute("UPDATE sector_references SET sector_id = ?, highlight = ?, text = ?, sort_order = ? WHERE id = ?", [
      sectorId,
      highlight ?? null,
      text,
      Number(sortOrder) || 0,
      Number(req.params.id),
    ]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/api/admin/sector-references/:id", requireAdmin, async (req, res) => {
  try {
    await execute("DELETE FROM sector_references WHERE id = ?", [Number(req.params.id)]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ——— Admin: site settings ———
app.get("/api/admin/site-settings", requireAdmin, async (_req, res) => {
  try {
    const settings = await getSiteSettings(DEFAULT_SITE_SETTINGS);
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/admin/site-settings", requireAdmin, async (req, res) => {
  try {
    const settings = await upsertSiteSettings(req.body ?? {}, DEFAULT_SITE_SETTINGS);
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ——— Admin: team ———
app.get("/api/admin/team", requireAdmin, async (_req, res) => {
  try {
    const settings = await getSiteSettings(DEFAULT_SITE_SETTINGS);
    const members = await query(
      `SELECT id, first_name as firstName, last_name as lastName, title, expertise, bio,
              email, linkedin, instagram, sort_order as sortOrder, active
       FROM team_members ORDER BY sort_order ASC, id ASC`,
    );
    res.json({ intro: settings.teamIntro, members });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/admin/team-members", requireAdmin, async (req, res) => {
  const { id, firstName, lastName, title, expertise, bio, email, linkedin, instagram, sortOrder } = req.body ?? {};
  if (!id || !firstName || !lastName || !title || !expertise || !bio) {
    res.status(400).json({ error: "id, prénom, nom, titre, expertise et bio requis" });
    return;
  }
  try {
    const slug = String(id).trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    await execute(
      `INSERT INTO team_members (id, first_name, last_name, title, expertise, bio, email, linkedin, instagram, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        slug,
        String(firstName).trim(),
        String(lastName).trim(),
        String(title).trim(),
        String(expertise).trim(),
        String(bio).trim(),
        email ? String(email).trim() : null,
        linkedin ? String(linkedin).trim() : null,
        instagram ? String(instagram).trim() : null,
        Number(sortOrder) || 0,
      ],
    );
    res.status(201).json({ id: slug });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/admin/team-members/:id", requireAdmin, async (req, res) => {
  const memberId = req.params.id;
  const { firstName, lastName, title, expertise, bio, email, linkedin, instagram, sortOrder, active } = req.body ?? {};
  try {
    const existing = await queryOne<{
      first_name: string;
      last_name: string;
      title: string;
      expertise: string;
      bio: string;
      email: string | null;
      linkedin: string | null;
      instagram: string | null;
      sort_order: number;
      active: number;
    }>("SELECT * FROM team_members WHERE id = ?", [memberId]);
    if (!existing) {
      res.status(404).json({ error: "Introuvable" });
      return;
    }
    await execute(
      `UPDATE team_members SET first_name = ?, last_name = ?, title = ?, expertise = ?, bio = ?,
       email = ?, linkedin = ?, instagram = ?, sort_order = ?, active = ? WHERE id = ?`,
      [
        firstName !== undefined ? String(firstName).trim() : existing.first_name,
        lastName !== undefined ? String(lastName).trim() : existing.last_name,
        title !== undefined ? String(title).trim() : existing.title,
        expertise !== undefined ? String(expertise).trim() : existing.expertise,
        bio !== undefined ? String(bio).trim() : existing.bio,
        email !== undefined ? (email ? String(email).trim() : null) : existing.email,
        linkedin !== undefined ? (linkedin ? String(linkedin).trim() : null) : existing.linkedin,
        instagram !== undefined ? (instagram ? String(instagram).trim() : null) : existing.instagram,
        sortOrder !== undefined ? Number(sortOrder) || 0 : existing.sort_order,
        active !== undefined
          ? active === false || active === "false" || active === 0 || active === "0"
            ? 0
            : 1
          : existing.active,
        memberId,
      ],
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/api/admin/team-members/:id", requireAdmin, async (req, res) => {
  try {
    await execute("DELETE FROM team_members WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/admin/team-intro", requireAdmin, async (req, res) => {
  const { intro } = req.body ?? {};
  if (!intro || String(intro).trim().length < 10) {
    res.status(400).json({ error: "Introduction requise (10 caractères minimum)" });
    return;
  }
  try {
    await upsertSiteSettings({ teamIntro: String(intro).trim() }, DEFAULT_SITE_SETTINGS);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ——— Admin: testimonials ———
app.get("/api/admin/testimonials", requireAdmin, async (_req, res) => {
  try {
    const rows = await query(
      `SELECT id, first_name as firstName, last_initial as lastInitial, role, sector, text,
              sort_order as sortOrder, active
       FROM testimonials ORDER BY sort_order ASC, id ASC`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.post("/api/admin/testimonials", requireAdmin, async (req, res) => {
  const { firstName, lastInitial, role, sector, text, sortOrder } = req.body ?? {};
  if (!firstName || !lastInitial || !role || !sector || !text) {
    res.status(400).json({ error: "Tous les champs sont requis" });
    return;
  }
  try {
    const result = await execute(
      `INSERT INTO testimonials (first_name, last_initial, role, sector, text, sort_order, active)
       VALUES (?, ?, ?, ?, ?, ?, 1)`,
      [
        String(firstName).trim(),
        String(lastInitial).trim(),
        String(role).trim(),
        String(sector).trim(),
        String(text).trim(),
        Number(sortOrder) || 0,
      ],
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.put("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
  const { firstName, lastInitial, role, sector, text, sortOrder, active } = req.body ?? {};
  const testimonialId = Number(req.params.id);
  try {
    const existing = await queryOne<{
      first_name: string;
      last_initial: string;
      role: string;
      sector: string;
      text: string;
      sort_order: number;
      active: number;
    }>("SELECT * FROM testimonials WHERE id = ?", [testimonialId]);
    if (!existing) {
      res.status(404).json({ error: "Introuvable" });
      return;
    }
    await execute(
      `UPDATE testimonials SET first_name = ?, last_initial = ?, role = ?, sector = ?, text = ?,
       sort_order = ?, active = ? WHERE id = ?`,
      [
        firstName !== undefined ? String(firstName).trim() : existing.first_name,
        lastInitial !== undefined ? String(lastInitial).trim() : existing.last_initial,
        role !== undefined ? String(role).trim() : existing.role,
        sector !== undefined ? String(sector).trim() : existing.sector,
        text !== undefined ? String(text).trim() : existing.text,
        sortOrder !== undefined ? Number(sortOrder) || 0 : existing.sort_order,
        active !== undefined
          ? active === false || active === "false" || active === 0 || active === "0"
            ? 0
            : 1
          : existing.active,
        testimonialId,
      ],
    );
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.delete("/api/admin/testimonials/:id", requireAdmin, async (req, res) => {
  try {
    await execute("DELETE FROM testimonials WHERE id = ?", [Number(req.params.id)]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ——— Production: serve SPA ———
const distPath = path.join(process.cwd(), "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/uploads")) {
      next();
      return;
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

async function bootstrap() {
  await initSchema();
  await ensureDefaultAdmin();
  await seedIfEmpty();

  app.listen(PORT, () => {
    console.log(`[api] http://localhost:${PORT} (${getDriver()})`);
  });
}

bootstrap().catch((err) => {
  console.error("[api] Échec du démarrage :", err);
  process.exit(1);
});
