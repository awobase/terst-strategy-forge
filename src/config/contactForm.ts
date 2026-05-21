/** Valeurs du champ « Votre demande » (URL : ?objet=…) */

export const CONTACT_OBJET_VALUES = [
  "projet-structure",
  "etude-marche",
  "business-model",
  "financement",
  "evolution-activite",
  "premier-echange",
  "stage-cv",
  "autre",
] as const;

export type ContactObjetValue = (typeof CONTACT_OBJET_VALUES)[number];

export const CONTACT_OBJET_OPTIONS: { value: "" | ContactObjetValue; label: string }[] = [
  { value: "", label: "Sélectionnez votre demande…" },
  {
    value: "projet-structure",
    label: "J’ai une idée de projet et je souhaite être accompagné(e) pour la structurer",
  },
  { value: "etude-marche", label: "Je souhaite réaliser une étude de marché" },
  {
    value: "business-model",
    label: "J’ai besoin d’aide pour construire ou revoir mon business model",
  },
  {
    value: "financement",
    label: "Je recherche des financements et j’ai besoin d’accompagnement pour monter un dossier",
  },
  {
    value: "evolution-activite",
    label: "Je souhaite développer ou faire évoluer mon activité existante",
  },
  {
    value: "premier-echange",
    label: "Je souhaite un premier échange / diagnostic de mon projet",
  },
  { value: "stage-cv", label: "Je souhaite déposer un CV pour un stage" },
  { value: "autre", label: "Autre demande" },
];

/** Anciennes valeurs d’URL (?objet=candidature, etc.) */
const LEGACY_CONTACT_OBJET: Record<string, ContactObjetValue> = {
  mission: "premier-echange",
  candidature: "stage-cv",
  partenariat: "autre",
};

export function isContactObjetParam(value: string | null): value is ContactObjetValue {
  return value !== null && (CONTACT_OBJET_VALUES as readonly string[]).includes(value);
}

export function resolveContactObjetParam(value: string | null): ContactObjetValue | null {
  if (value === null) return null;
  if (isContactObjetParam(value)) return value;
  return LEGACY_CONTACT_OBJET[value] ?? null;
}
