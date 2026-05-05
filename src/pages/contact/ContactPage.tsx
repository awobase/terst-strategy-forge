import SiteLayout from "@/components/SiteLayout";
import PageHero from "@/components/PageHero";
import PageMeta from "@/components/PageMeta";
import RelatedPages from "@/components/RelatedPages";
import { ROUTES } from "@/config/navigation";
import { crumbsContact } from "@/config/breadcrumbs";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

const SOCIAL_LINKS = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com",
		icon: Linkedin,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com",
		icon: Instagram,
	},
] as const;

const ContactPage = () => {
	return (
		<SiteLayout>
			<PageMeta
				title="Contactez-nous"
				description="Coordonnées et réseaux sociaux CAYRIBE Partners — cabinet de conseil en stratégie et performance."
			/>
			<PageHero
				variant="editorial"
				breadcrumbs={crumbsContact}
				title="Contactez-nous"
				description="Retrouvez nos coordonnées et nos canaux officiels. Nous revenons vers vous dans les meilleurs délais."
			/>

			<section
				id="contact-coordonnees"
				className="relative overflow-hidden border-b border-border/40 bg-background py-12 md:py-20"
				aria-labelledby="contact-coordonnees-title"
			>
				<div
					className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-2xl"
					aria-hidden
				/>
				<div className="container relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
					<h2
						id="contact-coordonnees-title"
						className="sr-only"
					>
						Coordonnées et réseaux sociaux
					</h2>
					<div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-stretch">
						<div className="flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
							<p className="eyebrow mb-3 text-primary">Coordonnées</p>
							<h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
								Écrivez-nous ou appelez-nous
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								Précisez votre contexte par e-mail ou par téléphone pour un premier échange ciblé.
							</p>
							<ul className="mt-8 flex flex-col gap-6">
								<li className="flex gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
										<Mail
											className="h-5 w-5 text-primary"
											aria-hidden
										/>
									</div>
									<div>
										<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											E-mail
										</p>
										<a
											href="mailto:contact@cayribepartners.com"
											className="mt-1 inline-block text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
										>
											contact@cayribepartners.com
										</a>
									</div>
								</li>
								<li className="flex gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
										<Phone
											className="h-5 w-5 text-primary"
											aria-hidden
										/>
									</div>
									<div>
										<p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
											Téléphone
										</p>
										<a
											href="tel:+596696000000"
											className="mt-1 inline-block text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
										>
											+596 696 00 00 00
										</a>
									</div>
								</li>
							</ul>
						</div>

						<div className="flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
							<p className="eyebrow mb-3 text-primary">Réseaux sociaux</p>
							<h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
								Suivez l’actualité du cabinet
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								Retrouvez-nous sur les plateformes où nous partageons nos interventions, nos lectures et
								l’écosystème entrepreneurial.
							</p>
							<ul className="mt-8 flex flex-col gap-4">
								{SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
									<li key={label}>
										<a
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className="group flex items-center gap-4 rounded-xl border border-border/80 bg-muted/30 p-4 transition-all hover:border-primary/30 hover:bg-primary/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
										>
											<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary shadow-sm transition-colors group-hover:border-primary/25 group-hover:bg-primary/5">
												<Icon
													className="h-5 w-5"
													aria-hidden
												/>
											</span>
											<span className="text-sm font-semibold text-foreground">{label}</span>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</SiteLayout>
	);
};

export default ContactPage;
