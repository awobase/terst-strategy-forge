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

export type ApiSiteSettings = {
  contactEmail: string;
  contactPhoneDisplay: string;
  contactPhoneTel: string;
  socialLinkedin: string;
  socialInstagram: string;
  showTestimonials: boolean;
  teamIntro: string;
};

export type ApiTeamMember = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  expertise: string;
  bio: string;
  email: string | null;
  linkedin: string | null;
  instagram: string | null;
  sortOrder: number;
  active?: number;
};

export type ApiTestimonialSector = {
  id: number;
  label: string;
  sortOrder: number;
  active?: number;
};

export type ApiTestimonial = {
  id: number;
  firstName: string;
  lastInitial: string;
  role: string;
  sector: string;
  text: string;
  sortOrder: number;
  active?: number;
};

export type ApiSectorCategoryAdmin = {
  id: string;
  label: string;
  color: string;
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

export async function fetchSiteSettings() {
  return request<ApiSiteSettings>("/api/site-settings");
}

export async function fetchAdminSiteSettings() {
  return request<ApiSiteSettings>("/api/admin/site-settings", { headers: adminHeaders() });
}

export async function updateSiteSettings(data: Partial<ApiSiteSettings>) {
  return request<ApiSiteSettings>("/api/admin/site-settings", {
    method: "PUT",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function fetchTeam() {
  return request<{ intro: string; members: ApiTeamMember[] }>("/api/team");
}

export async function fetchAdminTeam() {
  return request<{ intro: string; members: ApiTeamMember[] }>("/api/admin/team", { headers: adminHeaders() });
}

export async function updateTeamIntro(intro: string) {
  return request<{ ok: boolean }>("/api/admin/team-intro", {
    method: "PUT",
    headers: adminHeaders(true),
    body: JSON.stringify({ intro }),
  });
}

export async function createTeamMember(data: Omit<ApiTeamMember, "active">) {
  return request<{ id: string }>("/api/admin/team-members", {
    method: "POST",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function updateTeamMember(id: string, data: Partial<ApiTeamMember>) {
  return request<{ ok: boolean }>(`/api/admin/team-members/${id}`, {
    method: "PUT",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function deleteTeamMember(id: string) {
  return request<{ ok: boolean }>(`/api/admin/team-members/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
}

export async function fetchTestimonials() {
  return request<ApiTestimonial[]>("/api/testimonials");
}

export async function fetchAdminTestimonials() {
  return request<ApiTestimonial[]>("/api/admin/testimonials", { headers: adminHeaders() });
}

export async function createTestimonial(data: Omit<ApiTestimonial, "id" | "active">) {
  return request<{ id: number }>("/api/admin/testimonials", {
    method: "POST",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function updateTestimonial(id: number, data: Partial<ApiTestimonial>) {
  return request<{ ok: boolean }>(`/api/admin/testimonials/${id}`, {
    method: "PUT",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function deleteTestimonial(id: number) {
  return request<{ ok: boolean }>(`/api/admin/testimonials/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
}

export async function fetchTestimonialSectors() {
  return request<ApiTestimonialSector[]>("/api/testimonial-sectors");
}

export async function fetchAdminTestimonialSectors() {
  return request<ApiTestimonialSector[]>("/api/admin/testimonial-sectors", { headers: adminHeaders() });
}

export async function createTestimonialSector(data: { label: string; sortOrder?: number }) {
  return request<{ id: number }>("/api/admin/testimonial-sectors", {
    method: "POST",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function updateTestimonialSector(id: number, data: Partial<ApiTestimonialSector>) {
  return request<{ ok: boolean }>(`/api/admin/testimonial-sectors/${id}`, {
    method: "PUT",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function deleteTestimonialSector(id: number) {
  return request<{ ok: boolean }>(`/api/admin/testimonial-sectors/${id}`, {
    method: "DELETE",
    headers: adminHeaders(),
  });
}

export async function createSectorCategory(data: { id: string; label: string; color: string; sortOrder?: number }) {
  return request<{ ok: boolean }>("/api/admin/sectors", {
    method: "POST",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function updateSectorCategory(id: string, data: { label: string; color: string; sortOrder?: number }) {
  return request<{ ok: boolean }>(`/api/admin/sectors/${id}`, {
    method: "PUT",
    headers: adminHeaders(true),
    body: JSON.stringify(data),
  });
}

export async function deleteSectorCategory(id: string) {
  return request<{ ok: boolean }>(`/api/admin/sectors/${id}`, {
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
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(800) });
    return res.ok;
  } catch {
    return false;
  }
}
