import { DatabaseSync } from "node:sqlite";
import mysql from "mysql2/promise";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
export const uploadsDir = path.join(dataDir, "uploads", "trust-partners");
export const dbPath = path.join(dataDir, "cayrib.db");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

type Driver = "sqlite" | "mysql";

function mysqlEnv(primary: string, legacy: string): string | undefined {
  return process.env[primary] ?? process.env[legacy];
}

function resolveDriver(): Driver {
  const explicit = process.env.DB_DRIVER;
  if (explicit === "mysql" || explicit === "sqlite") return explicit;
  if (mysqlEnv("DATABASE_HOST", "DB_HOST")) return "mysql";
  if (process.env.NODE_ENV === "production") return "mysql";
  return "sqlite";
}

let activeDriver: Driver = resolveDriver();

export function getDriver() {
  return activeDriver;
}

let sqliteDb: DatabaseSync | null = null;
let mysqlPool: mysql.Pool | null = null;

function getSqlite() {
  if (!sqliteDb) sqliteDb = new DatabaseSync(dbPath);
  return sqliteDb;
}

function getMysqlPool() {
  if (!mysqlPool) {
    const host = mysqlEnv("DATABASE_HOST", "DB_HOST");
    const user = mysqlEnv("DATABASE_USER", "DB_USER");
    const password = mysqlEnv("DATABASE_PASSWORD", "DB_PASSWORD");
    const database = mysqlEnv("DATABASE_NAME", "DB_NAME");
    const port = Number(mysqlEnv("DATABASE_PORT", "DB_PORT") ?? 3306);
    if (!host || !user || !password || !database) {
      throw new Error(
        "MySQL : DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD et DATABASE_NAME sont requis (ou DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)",
      );
    }
    mysqlPool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return mysqlPool;
}

export type ExecuteResult = { insertId: number; affectedRows: number };

export async function query<T extends RowDataPacket[]>(sql: string, params: unknown[] = []): Promise<T> {
  if (activeDriver === "sqlite") {
    return getSqlite().prepare(sql).all(...params) as T;
  }
  const [rows] = await getMysqlPool().query(sql, params);
  return rows as T;
}

export async function queryOne<T extends RowDataPacket>(sql: string, params: unknown[] = []): Promise<T | undefined> {
  if (activeDriver === "sqlite") {
    return getSqlite().prepare(sql).get(...params) as T | undefined;
  }
  const rows = await query<T[]>(sql, params);
  return rows[0];
}

export async function execute(sql: string, params: unknown[] = []): Promise<ExecuteResult> {
  if (activeDriver === "sqlite") {
    const result = getSqlite().prepare(sql).run(...params);
    return { insertId: Number(result.lastInsertRowid), affectedRows: result.changes };
  }
  const [result] = await getMysqlPool().query(sql, params);
  const header = result as ResultSetHeader;
  return { insertId: header.insertId, affectedRows: header.affectedRows };
}

async function initSqliteSchema() {
  getSqlite().exec(`
    CREATE TABLE IF NOT EXISTS trust_partners (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      alt TEXT NOT NULL,
      image_url TEXT NOT NULL,
      scale REAL NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sector_categories (
      id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      color TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sector_references (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sector_id TEXT NOT NULL,
      highlight TEXT,
      text TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (sector_id) REFERENCES sector_categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      title TEXT NOT NULL,
      expertise TEXT NOT NULL,
      bio TEXT NOT NULL,
      email TEXT,
      linkedin TEXT,
      instagram TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_initial TEXT NOT NULL,
      role TEXT NOT NULL,
      sector TEXT NOT NULL,
      text TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      setting_key TEXT PRIMARY KEY,
      setting_value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS testimonial_sectors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL UNIQUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );
  `);
}

async function initMysqlSchema() {
  await execute(`
    CREATE TABLE IF NOT EXISTS trust_partners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alt VARCHAR(500) NOT NULL,
      image_url VARCHAR(1000) NOT NULL,
      scale DOUBLE NOT NULL DEFAULT 1,
      sort_order INT NOT NULL DEFAULT 0,
      active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await execute(`
    CREATE TABLE IF NOT EXISTS sector_categories (
      id VARCHAR(100) PRIMARY KEY,
      label VARCHAR(255) NOT NULL,
      color VARCHAR(50) NOT NULL,
      sort_order INT NOT NULL DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await execute(`
    CREATE TABLE IF NOT EXISTS sector_references (
      id INT AUTO_INCREMENT PRIMARY KEY,
      sector_id VARCHAR(100) NOT NULL,
      highlight VARCHAR(500) NULL,
      text TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      FOREIGN KEY (sector_id) REFERENCES sector_categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await execute(`
    CREATE TABLE IF NOT EXISTS team_members (
      id VARCHAR(50) PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      expertise TEXT NOT NULL,
      bio TEXT NOT NULL,
      email VARCHAR(255) NULL,
      linkedin VARCHAR(500) NULL,
      instagram VARCHAR(500) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      active TINYINT(1) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await execute(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_initial VARCHAR(10) NOT NULL,
      role VARCHAR(255) NOT NULL,
      sector VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      active TINYINT(1) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      setting_key VARCHAR(100) PRIMARY KEY,
      setting_value TEXT NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await execute(`
    CREATE TABLE IF NOT EXISTS testimonial_sectors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      label VARCHAR(255) NOT NULL UNIQUE,
      sort_order INT NOT NULL DEFAULT 0,
      active TINYINT(1) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function initSchema() {
  if (activeDriver === "mysql") {
    try {
      await getMysqlPool().query("SELECT 1");
      await initMysqlSchema();
      return;
    } catch (err) {
      if (process.env.NODE_ENV === "production") throw err;
      console.warn("[db] MySQL inaccessible, bascule SQLite en local :", (err as Error).message);
      activeDriver = "sqlite";
      mysqlPool = null;
    }
  }
  await initSqliteSchema();
}

export async function pingDb(): Promise<boolean> {
  try {
    if (activeDriver === "sqlite") {
      getSqlite().prepare("SELECT 1").get();
      return true;
    }
    await getMysqlPool().query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}
