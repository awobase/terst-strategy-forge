import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { queryOne, execute } from "./db.js";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET ?? "cayrib-dev-secret-change-me";

export type AuthPayload = { userId: number; username: string };

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function signToken(payload: AuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).json({ error: "Session expirée" });
    return;
  }
  (req as Request & { admin?: AuthPayload }).admin = payload;
  next();
}

export async function ensureDefaultAdmin() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin";
  const existing = await queryOne<{ id: number }>("SELECT id FROM admin_users WHERE username = ?", [username]);
  if (existing) return;
  const hash = hashPassword(password);
  await execute("INSERT INTO admin_users (username, password_hash) VALUES (?, ?)", [username, hash]);
}

export async function loginAdmin(username: string, password: string) {
  const row = await queryOne<{ id: number; username: string; password_hash: string }>(
    "SELECT id, username, password_hash FROM admin_users WHERE username = ?",
    [username],
  );
  if (!row || !verifyPassword(password, row.password_hash)) return null;
  return signToken({ userId: row.id, username: row.username });
}
