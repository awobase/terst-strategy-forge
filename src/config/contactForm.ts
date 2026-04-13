/** Valeurs du champ « Objet » du formulaire de contact (URL : ?objet=…) */

export const CONTACT_OBJET_VALUES = ["mission", "candidature", "partenariat", "autre"] as const;

export type ContactObjetValue = (typeof CONTACT_OBJET_VALUES)[number];

export const CONTACT_OBJET_OPTIONS: { value: "" | ContactObjetValue; label: string }[] = [
  { value: "", label: "Sélectionnez un objet…" },
  { value: "mission", label: "Mission, projet ou demande d’information" },
  { value: "candidature", label: "Candidature ou stage" },
  { value: "partenariat", label: "Partenariat, presse ou média" },
  { value: "autre", label: "Autre sujet" },
];

export function isContactObjetParam(value: string | null): value is ContactObjetValue {
  return value !== null && (CONTACT_OBJET_VALUES as readonly string[]).includes(value);
}
