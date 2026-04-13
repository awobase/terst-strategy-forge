import { Link } from "react-router-dom";
import logo from "@/assets/logo-cayribe-partners.png";
import { Linkedin, Instagram, ArrowUp } from "lucide-react";
import { ROUTES } from "@/config/navigation";

const Footer = () => {
  return (
    <footer className="bg-[hsl(222,32%,11%)] pt-20 pb-10 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <img src={logo} alt="CAYRIBE Partners" className="h-10 mb-5 brightness-0 invert" />
            </Link>
            <p className="text-[hsl(220,18%,68%)] text-sm leading-relaxed">
              Cabinet indépendant de conseil en stratégie et performance. Nous accompagnons les dirigeants qui veulent décider vite, bien et durablement.
            </p>
          </div>

          <div>
            <h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">Plan du site</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors">
                  Accueil
                </Link>
              </li>
              <li className="text-[hsl(220,24%,55%)] text-xs font-semibold uppercase tracking-wider pt-2">Qui sommes-nous</li>
              <li>
                <Link
                  to={ROUTES.quiSommesNous.presentation}
                  className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2"
                >
                  Présentation du cabinet
                </Link>
              </li>
              <li>
                <Link to={ROUTES.quiSommesNous.equipe} className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2">
                  Équipe
                </Link>
              </li>
              <li>
                <Link to={ROUTES.quiSommesNous.partenaires} className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2">
                  Partenaires
                </Link>
              </li>
              <li className="text-[hsl(220,24%,55%)] text-xs font-semibold uppercase tracking-wider pt-2">Offres</li>
              <li>
                <Link to={ROUTES.offres.start} className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2">
                  Start
                </Link>
              </li>
              <li>
                <Link to={ROUTES.offres.rise} className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2">
                  Rise
                </Link>
              </li>
              <li>
                <Link to={ROUTES.offres.jeunes} className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2">
                  Offres jeunes
                </Link>
              </li>
              <li>
                <Link to={ROUTES.offres.personnalise} className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2">
                  Offre personnalisée
                </Link>
              </li>
              <li className="text-[hsl(220,24%,55%)] text-xs font-semibold uppercase tracking-wider pt-2">Contact</li>
              <li>
                <Link to={ROUTES.contact} className="text-[hsl(220,20%,65%)] hover:text-secondary transition-colors pl-2">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">Coordonnées</h4>
            <ul className="space-y-3 text-[hsl(220,18%,65%)] text-sm">
              <li>
                <a href="mailto:contact@cayribepartners.com" className="hover:text-secondary transition-colors">
                  contact@cayribepartners.com
                </a>
              </li>
              <li>
                <a href="tel:+596696000000" className="hover:text-secondary transition-colors">
                  +596 696 00 00 00
                </a>
              </li>
              <li>Fort-de-France, Martinique</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">Réseaux sociaux</h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(220,18%,18%)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-secondary active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-[hsl(220,18%,78%)]" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(220,18%,18%)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-secondary active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-[hsl(220,18%,78%)]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[hsl(220,20%,20%)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[hsl(220,16%,48%)] text-sm">© 2026 CAYRIBE Partners. Tous droits réservés.</p>
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(220,18%,26%)] transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary hover:text-secondary hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label="Retour à l’accueil"
          >
            <ArrowUp className="w-4 h-4 text-[hsl(220,18%,58%)]" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
