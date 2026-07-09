import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { initSchema, uploadsDir, query, queryOne, execute, pingDb, driver } from "./db.js";
import { ensureDefaultAdmin, loginAdmin, requireAdmin } from "./auth.js";
import { seedIfEmpty } from "./seed.js";

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
  res.json({ ok: dbOk, driver, db: dbOk ? "connected" : "error" });
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
    console.log(`[api] http://localhost:${PORT} (${driver})`);
  });
}

bootstrap().catch((err) => {
  console.error("[api] Échec du démarrage :", err);
  process.exit(1);
});
