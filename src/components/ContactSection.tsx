import { useState } from "react";
import { useInView } from "@/hooks/useInView";

const ContactSection = () => {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ nom: "", email: "", entreprise: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
  };

  return (
    <section id="contact" className="py-24 bg-surface">
      <div
        ref={ref}
        className={`container mx-auto px-4 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Contact</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Discutons de votre stratégie
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
          {[
            { name: "nom" as const, label: "Nom", type: "text" },
            { name: "email" as const, label: "Email", type: "email" },
            { name: "entreprise" as const, label: "Entreprise", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={form[field.name]}
                onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Envoyer le message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
