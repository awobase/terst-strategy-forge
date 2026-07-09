const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type ApiTrustPartner = {
  id: number;
  alt: string;
  imageUrl: string;
  scale: number;
  sortOrder: number;
  active?: number;
};

export type ApiSectorCategory = {
  id: string;
  label: string;
  color: string;
  sortOrder: number;
  references: { highlight?: string; text: string }[];
};

export type ApiSectorReference = {
  id: number;
  sectorId: string;
  highlight: string | null;
  text: string;
  sortOrder: number;
};

const TOKEN_KEY = "cayrib_admin_token";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Erreur ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function adminHeaders(json = false): HeadersInit {
  const token = getAdminToken();
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (json) headers["Content-Type"] = "application/json";
  return headers;
}

export async function adminLogin(username: string, password: string) {
  const { token } = await request<{ token: string }>("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  setAdminToken(token);
  return token;
}

export function adminLogout() {
  setAdminToken(null);
}

export async function fetchTrustPartners() {
  return request<ApiTrustPartner[]>("/api/trust-partners");
}

export async function fetchAdminTrustPartners() {
  return request<ApiTrustPartner[]>("/api/admin/trust-partners", { headers: adminHeaders() });
}

export async function createTrustPartner(form: FormData) {
  return request<{ id: number }>("/api/admin/trust-partners", {
    method: "POST",
    headers: adminHeaders(),
    body: form,
  });
}

export async function updateTrustPartner(id: number, form: FormData) {
  return request<{ ok: boolean }>(`/api/admin/trust-partners/${id}`, {
    method: "PUT",
    headers: adminHeaders(),
    body: form,
  });
}

export async function deleteTrustPartner(id: number) {
  return request<{ ok: boolean }>(`/api/admin/trust-partners/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
}

export async function fetchSectorReferences() {
  return request<ApiSectorCategory[]>("/api/sector-references");
}

export async function fetchAdminSectors() {
  return request<{ categories: ApiSectorCategory[]; references: ApiSectorReference[] }>("/api/admin/sectors", {
    headers: adminHeaders(),
  });
}

export async function createSectorReference(data: {
  sectorId: string;
  highlight?: string;
  text: string;
  sortOrder?: number;
}) {
  return request<{ id: number }>("/api/admin/sector-references", {
    method: "POST",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function updateSectorReference(
  id: number,
  data: { sectorId: string; highlight?: string; text: string; sortOrder?: number },
) {
  return request<{ ok: boolean }>(`/api/admin/sector-references/${id}`, {
    method: "PUT",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function deleteSectorReference(id: number) {
  return request<{ ok: boolean }>(`/api/admin/sector-references/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
}

export function resolveCmsImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_BASE}${imageUrl}`;
}

export async function isApiAvailable() {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}
