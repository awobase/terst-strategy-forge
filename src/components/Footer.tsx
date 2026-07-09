import { Link } from "react-router-dom";
import logo from "@/assets/logo-cayribe-partners.png";
import awobaseLogo from "@/assets/logo-awobase.png";
import europeSengageLogo from "@/assets/logo-europe-sengage-guadeloupe.png";
import { Linkedin, Instagram } from "lucide-react";
import { BRAND_NAME } from "@/config/brand";
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, SOCIAL_LINKS } from "@/config/contact";

const Footer = () => {
	return (
		<footer className="bg-[hsl(222,32%,11%)] pt-20 pb-10 relative">
			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

			<div className="container mx-auto px-4">
				<div className="grid gap-12 mb-16 md:grid-cols-3">
					<div>
						<Link
							to="/"
							className="inline-block"
						>
							<img
								src={logo}
								alt={BRAND_NAME}
								className="h-16 mb-5 brightness-0 invert"
							/>
						</Link>
						<p className="text-[hsl(220,18%,68%)] text-sm leading-relaxed">
							Cabinet indépendant de conseil en stratégie et performance. Nous accompagnons les dirigeants
							qui veulent décider vite, bien et durablement.
						</p>
					</div>

					<div>
						<h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
							Coordonnées
						</h4>
						<ul className="space-y-3 text-[hsl(220,18%,65%)] text-sm">
							<li>
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className="hover:text-secondary transition-colors"
								>
									{CONTACT_EMAIL}
								</a>
							</li>
							<li>
								<a
									href={CONTACT_PHONE_HREF}
									className="hover:text-secondary transition-colors"
								>
									{CONTACT_PHONE_DISPLAY}
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-[hsl(0,0%,95%)] font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
							Réseaux sociaux
						</h4>
						<div className="flex gap-3">
							<a
								href={SOCIAL_LINKS.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(220,18%,18%)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-secondary active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
								aria-label="LinkedIn"
							>
								<Linkedin className="w-5 h-5 text-[hsl(220,18%,78%)]" />
							</a>
							<a
								href={SOCIAL_LINKS.instagram}
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

				<div className="border-t border-[hsl(220,20%,20%)] pt-8 flex flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-[hsl(220,16%,48%)] text-sm text-center sm:text-left">
						© 2026 {BRAND_NAME}. Tous droits réservés.
						<Link
							to="/mentions-legales"
							className="ml-3 underline-offset-4 transition-colors hover:text-secondary hover:underline"
						>
							Mentions légales
						</Link>
					</p>
					<div className="flex flex-wrap items-center justify-center gap-5 sm:justify-end">
						<img
							src={europeSengageLogo}
							alt="Logo L'Europe s'engage en Guadeloupe"
							className="h-11 w-auto max-w-[210px] object-contain object-left opacity-95 sm:h-12 sm:max-w-[240px]"
							width={240}
							height={240}
							loading="lazy"
						/>
						<a
							href="https://awobase.fr"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex shrink-0 origin-center rounded-md p-0.5 outline-none transition-[transform,filter,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:opacity-100 hover:drop-shadow-[0_0_12px_hsl(32_88%_52%_/_0.35)] active:translate-y-0 active:scale-[0.94] active:duration-150 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(222,32%,11%)] opacity-90"
							aria-label="Awobase — visiter awobase.fr"
						>
							<img
								src={awobaseLogo}
								alt="Awobase"
								className="h-5 w-auto max-h-6 object-contain sm:h-6"
								width={96}
								height={24}
							/>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
