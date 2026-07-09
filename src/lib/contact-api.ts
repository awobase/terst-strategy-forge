import type { ContactObjetValue } from "@/config/contactForm";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export type ContactFormPayload = {
  nom: string;
  email: string;
  entreprise?: string;
  telephone?: string;
  objet: ContactObjetValue;
  message: string;
};

export async function submitContactForm(payload: ContactFormPayload) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.error ?? "Impossible d'envoyer le message");
  }
  return body as { ok: boolean };
}
