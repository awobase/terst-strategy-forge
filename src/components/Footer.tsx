import logo from "@/assets/logo-cayribe-partners.png";
import { Linkedin, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,30%,12%)] pt-20 pb-8 relative">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logo} alt="CAYRIBE Partners" className="h-10 mb-5 brightness-0 invert" />
            <p className="text-[hsl(220,20%,70%)] text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Accueil", href: "#accueil" },
                { label: "Expertises", href: "#expertises" },
                { label: "Méthodologie", href: "#methodologie" },
                { label: "Études de cas", href: "#etudes" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[hsl(220,20%,65%)] text-sm hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-[hsl(220,20%,65%)] text-sm">
              <li>contact@cayribepartners.com</li>
              <li>+596 696 00 00 00</li>
              <li>Fort-de-France, Martinique</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">Réseaux sociaux</h4>
            <div className="flex gap-3">
              <a href="#" className="w-11 h-11 rounded-xl bg-[hsl(220,20%,20%)] flex items-center justify-center hover:bg-secondary transition-colors duration-300">
                <Linkedin className="w-5 h-5 text-[hsl(220,20%,80%)]" />
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-[hsl(220,20%,20%)] flex items-center justify-center hover:bg-secondary transition-colors duration-300">
                <Instagram className="w-5 h-5 text-[hsl(220,20%,80%)]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(220,20%,20%)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[hsl(220,20%,45%)] text-sm">© 2025 CAYRIBE Partners. Tous droits réservés.</p>
          <a
            href="#accueil"
            className="w-10 h-10 rounded-full border border-[hsl(220,20%,25%)] flex items-center justify-center hover:border-secondary hover:text-secondary transition-colors"
          >
            <ArrowUp className="w-4 h-4 text-[hsl(220,20%,55%)]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
