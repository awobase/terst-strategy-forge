import { useState, useEffect } from "react";
import logo from "@/assets/logo-cayribe-partners.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Expertises", href: "#expertises" },
  { label: "Méthodologie", href: "#methodologie" },
  { label: "Études de cas", href: "#etudes" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <a href="#accueil" className="relative z-10">
          <img src={logo} alt="CAYRIBE Partners" className={`transition-all duration-300 ${scrolled ? "h-9" : "h-11 md:h-12"}`} />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-300 hover:text-secondary relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-secondary/25 transition-all duration-300"
          >
            Prendre rendez-vous
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden relative z-10 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="container mx-auto py-6 px-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground text-base font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-secondary text-secondary-foreground px-5 py-3 rounded-xl text-sm font-semibold text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Prendre rendez-vous
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
