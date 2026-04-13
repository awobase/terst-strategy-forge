/** Numéro WhatsApp sans + ni espaces — +590 690 41-5159 */
export const WHATSAPP_PHONE_DIGITS = "590690415159";

/** Lien wa.me avec texte prérempli (UTF-8 encodé). */
export function whatsappUrlWithText(message: string): string {
  const text = message.trim().length > 0 ? message.trim() : "Bonjour,";
  return `https://wa.me/${WHATSAPP_PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}

/** Prise de rendez-vous depuis la navigation */
export const WHATSAPP_RENDEZ_VOUS_URL = whatsappUrlWithText(
  "Bonjour, je souhaite prendre rendez-vous avec CAYRIBE Partners.",
);
