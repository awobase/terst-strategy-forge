import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useInView } from "@/hooks/useInView";
import { Send, Phone, Mail } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF } from "@/config/contact";
import { CONTACT_OBJET_OPTIONS, resolveContactObjetParam, type ContactObjetValue } from "@/config/contactForm";

type ContactSectionProps = {
  /** Sur les pages contact dédiées : masque le bloc titre / accroche (déjà dans le PageHero) */
  hideIntro?: boolean;
  /** Masque la colonne e-mail / téléphone (déjà affichée ailleurs sur la page) */
  hideContactInfo?: boolean;
  sectionId?: string;
  className?: string;
  /** Préremplit la demande depuis l’URL (?objet=stage-cv, etc.) */
  syncObjetFromSearchParams?: boolean;
};

const emptyForm = {
  nom: "",
  email: "",
  telephone: "",
  objet: "" as "" | ContactObjetValue,
  message: "",
};

const ContactSection = ({
  hideIntro = false,
  hideContactInfo = false,
  sectionId = "contact",
  className,
  syncObjetFromSearchParams = true,
}: ContactSectionProps) => {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (!syncObjetFromSearchParams) return;
    const resolved = resolveContactObjetParam(searchParams.get("objet"));
    if (resolved) {
      setForm((prev) => ({ ...prev, objet: resolved }));
    }
  }, [searchParams, syncObjetFromSearchParams]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nom = form.nom.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (nom.length < 2) {
      toast.error("Merci d’indiquer votre nom et prénom (au moins 2 caractères).");
      return;
    }
    if (!emailOk) {
      toast.error("Merci d’indiquer une adresse e-mail valide.");
      return;
    }
    if (!form.objet) {
      toast.error("Merci de sélectionner votre demande dans la liste.");
      return;
    }
    if (message.length < 15) {
      toast.error("Votre message est trop court. Précisez votre contexte ou votre demande (15 caractères minimum).");
      return;
    }

    toast.success("Message bien reçu. Nous vous recontactons sous 2 jours ouvrés.");
    const fromUrl = resolveContactObjetParam(searchParams.get("objet"));
    setForm({
      ...emptyForm,
      ...(fromUrl ? { objet: fromUrl } : {}),
    });
  };

  const formColSpan = hideContactInfo ? "lg:col-span-3" : "lg:col-span-2";

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
          {!hideContactInfo ? (
            <div className="space-y-5 lg:space-y-6">
              {[
                { icon: Mail, label: "E-mail", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                { icon: Phone, label: "Téléphone", value: CONTACT_PHONE_DISPLAY, href: CONTACT_PHONE_HREF },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden />
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    <a
                      href={item.href}
                      className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className={cn("space-y-4 lg:space-y-5", formColSpan)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <div>
                <label htmlFor="contact-nom" className="mb-1.5 block text-sm font-medium text-foreground">
                  Nom &amp; prénom <span className="text-primary">*</span>
                </label>
                <input
                  id="contact-nom"
                  type="text"
                  name="nom"
                  autoComplete="name"
                  placeholder="Nom et prénom"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="vous@entreprise.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-telephone" className="mb-1.5 block text-sm font-medium text-foreground">
                N° de téléphone
              </label>
              <input
                id="contact-telephone"
                type="tel"
                name="telephone"
                autoComplete="tel"
                placeholder="0690 00 00 00"
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </div>
            <div>
              <label htmlFor="contact-objet" className="mb-1.5 block text-sm font-medium text-foreground">
                Votre demande
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
