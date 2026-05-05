import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { Send, Phone, Mail } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { CONTACT_OBJET_OPTIONS, isContactObjetParam, type ContactObjetValue } from "@/config/contactForm";

type ContactSectionProps = {
  /** Sur les pages contact dédiées : masque le bloc titre / accroche (déjà dans le PageHero) */
  hideIntro?: boolean;
  sectionId?: string;
  className?: string;
  /** Préremplit l’objet depuis l’URL (?objet=candidature, etc.) */
  syncObjetFromSearchParams?: boolean;
};

const emptyForm = {
  nom: "",
  email: "",
  entreprise: "",
  objet: "" as "" | ContactObjetValue,
  message: "",
};

const ContactSection = ({
  hideIntro = false,
  sectionId = "contact",
  className,
  syncObjetFromSearchParams = true,
}: ContactSectionProps) => {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!syncObjetFromSearchParams) return;
    const raw = searchParams.get("objet");
    if (isContactObjetParam(raw)) {
      setForm((prev) => ({ ...prev, objet: raw }));
    }
  }, [searchParams, syncObjetFromSearchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nom = form.nom.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (nom.length < 2) {
      toast.error("Merci d’indiquer votre nom (au moins 2 caractères).");
      return;
    }
    if (!emailOk) {
      toast.error("Merci d’indiquer une adresse e-mail valide.");
      return;
    }
    if (!form.objet) {
      toast.error("Merci de sélectionner un objet pour votre message.");
      return;
    }
    if (message.length < 15) {
      toast.error("Votre message est trop court. Précisez votre contexte ou votre demande (15 caractères minimum).");
      return;
    }

    toast.success("Message bien reçu. Nous vous recontactons sous 2 jours ouvrés.");
    const fromUrl = searchParams.get("objet");
    setForm({
      ...emptyForm,
      ...(isContactObjetParam(fromUrl) ? { objet: fromUrl } : {}),
    });
  };

  return (
    <section
      id={sectionId}
      className={cn("relative overflow-hidden bg-surface py-16 md:py-24", hideIntro && "py-12 md:py-16", className)}
    >
      <div className="absolute right-0 top-0 h-80 w-80 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03]" />

      <div
        ref={ref}
        className={cn(
          "container mx-auto px-4 transition-all duration-700 sm:px-6",
          inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        )}
      >
        {!hideIntro ? (
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title mb-4">Parlons de votre projet</h2>
            <p className="section-lead mx-auto">
              Décrivez votre contexte et vos objectifs : nous revenons vers vous sous 2 jours ouvrés avec une proposition de
              cadrage ou un premier échange.
            </p>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-5 lg:space-y-6">
            {[
              { icon: Mail, label: "Email", value: "contact@cayribepartners.com" },
              { icon: Phone, label: "Téléphone", value: "+596 696 00 00 00" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                  {item.label === "Email" ? (
                    <a
                      href="mailto:contact@cayribepartners.com"
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : item.label === "Téléphone" ? (
                    <a href="tel:+596696000000" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2 lg:space-y-5">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {(
                [
                  { name: "nom" as const, label: "Nom", type: "text" as const },
                  { name: "email" as const, label: "Email", type: "email" as const },
                ] as const
              ).map((field) => (
                <div key={field.name}>
                  <label htmlFor={`contact-${field.name}`} className="mb-1.5 block text-sm font-medium text-foreground">
                    {field.label}
                  </label>
                  <input
                    id={`contact-${field.name}`}
                    type={field.type}
                    name={field.name}
                    autoComplete={field.name === "email" ? "email" : "name"}
                    placeholder={field.name === "nom" ? "Nom et prénom" : "vous@entreprise.com"}
                    value={form[field.name]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
                    required
                  />
                </div>
              ))}
            </div>
            <div>
              <label htmlFor="contact-entreprise" className="mb-1.5 block text-sm font-medium text-foreground">
                Entreprise
              </label>
              <input
                id="contact-entreprise"
                type="text"
                name="entreprise"
                autoComplete="organization"
                placeholder="Raison sociale (facultatif)"
                value={form.entreprise}
                onChange={(e) => setForm({ ...form, entreprise: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <div>
              <label htmlFor="contact-objet" className="mb-1.5 block text-sm font-medium text-foreground">
                Objet du message
              </label>
              <select
                id="contact-objet"
                name="objet"
                value={form.objet}
                onChange={(e) =>
                  setForm({
                    ...form,
                    objet: e.target.value === "" ? "" : (e.target.value as ContactObjetValue),
                  })
                }
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
                required
              >
                {CONTACT_OBJET_OPTIONS.map((opt) => (
                  <option key={opt.value || "placeholder"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Contexte, enjeux, délais souhaités…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
                required
                minLength={15}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              En envoyant ce formulaire, vous acceptez d&apos;être recontacté dans le cadre de votre demande. Données traitées
              de manière confidentielle.
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/25 hover:brightness-[1.05] active:translate-y-0 active:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Send className="h-4 w-4" aria-hidden />
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
