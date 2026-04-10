import logo from "@/assets/logo-cayribe-partners.png";
import { Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img src={logo} alt="CAYRIBE Partners" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-background/60 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-background font-heading font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Accueil", "Expertises", "Méthodologie", "Études de cas", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s/g, "").replace("é", "e")}`}
                    className="text-background/60 text-sm hover:text-background transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-heading font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-background/60 text-sm">
              <li>contact@cayribepartners.com</li>
              <li>+596 696 00 00 00</li>
              <li>Fort-de-France, Martinique</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-background font-heading font-semibold mb-4">Réseaux sociaux</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Linkedin className="w-5 h-5 text-background" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                <Instagram className="w-5 h-5 text-background" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-background/40 text-sm">© 2025 CAYRIBE Partners. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
