import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-cayribe-partners.png";
import { Menu, X } from "lucide-react";
import { BRAND_NAME } from "@/config/brand";
import { SHOW_TESTIMONIALS } from "@/config/features";
import { ROUTES } from "@/config/navigation";
import NavHoverDropdown from "@/components/NavHoverDropdown";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const offresItems = [
	{ label: "Start", to: ROUTES.offres.start },
	{ label: "Rise", to: ROUTES.offres.rise },
	{ label: "Études personnalisées", to: ROUTES.offres.etudesPersonnalisees },
	{ label: "Recherche de financements", to: ROUTES.offres.rechercheFinancements },
	{ label: "Formations", to: ROUTES.offres.formationCabinet },
	...(SHOW_TESTIMONIALS ? [{ label: "Témoignages" as const, to: ROUTES.offres.temoignages }] : []),
] as const;

const quiSommesNousItems = [
	{ label: "Présentation du cabinet", to: ROUTES.quiSommesNous.presentation },
	{ label: "Équipe", to: ROUTES.quiSommesNous.equipe },
	{ label: "Nos expertises", to: ROUTES.quiSommesNous.expertises },
	{ label: "Références sectorielles", to: ROUTES.quiSommesNous.referencesSectorielles },
];

const mobileLink =
	"block rounded-lg px-3 py-2.5 text-[15px] font-medium text-foreground/95 transition-colors hover:bg-muted/80 active:bg-muted";

const MobileSectionLabel = ({ children }: { children: ReactNode }) => (
	<p className="px-3 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
		{children}
	</p>
);

const Navbar = () => {
	const location = useLocation();
	const isHome = location.pathname === "/";
	const [scrolled, setScrolled] = useState(!isHome);
	const [mobileOpen, setMobileOpen] = useState(false);
	const navRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const el = navRef.current;
		if (!el) return;

		const syncHeaderHeight = () => {
			document.documentElement.style.setProperty("--site-header-height", `${el.offsetHeight}px`);
		};

		syncHeaderHeight();
		const observer = new ResizeObserver(syncHeaderHeight);
		observer.observe(el);
		window.addEventListener("resize", syncHeaderHeight);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", syncHeaderHeight);
		};
	}, [scrolled, mobileOpen, isHome]);

	useEffect(() => {
		if (!isHome) {
			setScrolled(true);
			return;
		}
		const onScroll = () => setScrolled(window.scrollY > 50);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [isHome]);

	useEffect(() => {
		setMobileOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		if (!mobileOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [mobileOpen]);

	const closeMobile = useCallback(() => setMobileOpen(false), []);

	useEffect(() => {
		if (!mobileOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMobileOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [mobileOpen]);

	const linkClass = (active?: boolean) =>
		cn(
			"text-sm font-medium tracking-wide transition-all duration-300",
			scrolled ? "text-foreground/90 hover:text-secondary" : "text-primary-foreground/95 hover:text-secondary",
			active && scrolled && "text-secondary",
		);

	const pathContact = location.pathname.startsWith("/contact");
	const pathQuiSommesNous = location.pathname.startsWith(ROUTES.quiSommesNousRoot);

	const triggerClass = cn(
		"inline-flex items-center gap-0.5 text-sm font-medium tracking-wide transition-colors rounded-md px-1 py-1 -mx-1",
		"outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
		scrolled
			? "text-foreground/90 hover:text-secondary data-[state=open]:text-secondary"
			: "text-primary-foreground/95 hover:text-secondary data-[state=open]:text-secondary",
	);

	return (
		<nav
			ref={navRef}
			aria-label="Navigation principale"
			className={cn(
				"fixed left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,padding,border-color] duration-300",
				// Mobile : colonne = barre + (si ouvert) panneau qui remplit le reste de l’écran — un seul scroll naturel
				"max-lg:flex max-lg:max-h-[100dvh] max-lg:min-h-0 max-lg:flex-col",
				// Mobile / tablette : barre toujours lisible sur le hero
				"max-lg:border-b max-lg:border-border/50 max-lg:bg-background/95 max-lg:backdrop-blur-md max-lg:py-2.5 max-lg:shadow-sm",
				// Bureau : transparence sur l’accueil en haut de page
				isHome &&
					!scrolled &&
					"lg:border-transparent lg:bg-transparent lg:shadow-none lg:backdrop-blur-none lg:py-4 xl:py-5",
				(!isHome || scrolled) &&
					"lg:border-b lg:border-border/60 lg:bg-background/90 lg:py-2 lg:shadow-sm lg:backdrop-blur-xl",
			)}
		>
			<div className="container mx-auto flex shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
				<Link
					to="/"
					onClick={closeMobile}
					className="relative z-10 shrink-0 rounded-md transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
				>
					<img
						src={logo}
						alt={BRAND_NAME}
						className={cn(
							"h-11 w-auto transition-all duration-300 sm:h-14",
							"max-lg:opacity-100",
							scrolled ? "lg:h-18" : "lg:h-20 xl:h-24",
						)}
					/>
				</Link>

				<div className="hidden items-center gap-5 xl:gap-8 lg:flex">
					<Link
						to="/"
						className={linkClass(location.pathname === "/")}
					>
						Accueil
					</Link>

					<NavHoverDropdown
						label="Qui sommes-nous"
						triggerTo={ROUTES.quiSommesNousRoot}
						triggerClassName={cn(triggerClass, pathQuiSommesNous && scrolled && "text-secondary")}
						items={quiSommesNousItems}
						contentClassName="min-w-[15rem]"
					/>

					<NavHoverDropdown
						label="Offres"
						triggerTo={ROUTES.offresRoot}
						triggerClassName={triggerClass}
						items={offresItems}
						contentClassName="min-w-[16rem]"
					/>

					<Link
						to={ROUTES.contact}
						className={linkClass(pathContact)}
					>
						Contact
					</Link>
				</div>

				<button
					type="button"
					aria-expanded={mobileOpen}
					aria-controls="nav-mobile-menu"
					aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
					className={cn(
						"lg:hidden flex h-11 min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background text-foreground shadow-sm transition-colors",
						"hover:bg-muted/70 active:bg-muted",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
					)}
					onClick={() => setMobileOpen((o) => !o)}
				>
					{mobileOpen ? (
						<X
							className="h-5 w-5"
							strokeWidth={2}
						/>
					) : (
						<Menu
							className="h-5 w-5"
							strokeWidth={2}
						/>
					)}
				</button>
			</div>

			{mobileOpen && (
				<div
					id="nav-mobile-menu"
					className="flex min-h-0 flex-1 flex-col overflow-hidden border-t border-border/60 bg-background lg:hidden"
				>
					<div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]">
						<div className="container mx-auto px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 sm:px-6">
							<ul className="flex flex-col gap-0.5">
								<li>
									<Link
										to="/"
										className={mobileLink}
										onClick={closeMobile}
									>
										Accueil
									</Link>
								</li>
							</ul>

							<Separator className="my-1.5 bg-border/70" />

							<MobileSectionLabel>Qui sommes-nous</MobileSectionLabel>
							<ul className="flex flex-col gap-0.5">
								{quiSommesNousItems.map((item) => (
									<li key={item.to}>
										<Link
											to={item.to}
											className={mobileLink}
											onClick={closeMobile}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>

							<Separator className="my-1.5 bg-border/70" />

							<MobileSectionLabel>Offres</MobileSectionLabel>
							<ul className="flex flex-col gap-0.5">
								{offresItems.map((item) => (
									<li key={item.to}>
										<Link
											to={item.to}
											className={mobileLink}
											onClick={closeMobile}
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>

							<Separator className="my-1.5 bg-border/70" />

							<Link
								to={ROUTES.contact}
								className={mobileLink}
								onClick={closeMobile}
							>
								Contact
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
