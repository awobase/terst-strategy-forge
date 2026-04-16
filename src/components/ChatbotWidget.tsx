import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappUrlWithText } from "@/config/whatsapp";
import { CONTACT_OBJET_OPTIONS, type ContactObjetValue } from "@/config/contactForm";

const botGreeting = "Bonjour ! Je suis l’assistant virtuel CAYRIBE Partners. En quoi puis-je vous aider aujourd’hui ?";

const INITIAL_TYPING_MS = 1400;
const BETWEEN_MESSAGE_TYPING_MS = 380;
const STREAM_CHAR_MS = 12;

let lineId = 0;
const nextLineId = () => {
	lineId += 1;
	return `chat-line-${lineId}`;
};

type BotLine = { id: string; role: "bot"; text: string; revealed: number };
type UserLine = { id: string; role: "user"; text: string };
type ChatLine = BotLine | UserLine;

type ChatAnswers = { nom: string; email: string; entreprise: string; objet: ContactObjetValue; message: string };

const objetChoices = CONTACT_OBJET_OPTIONS.filter((opt): opt is { value: ContactObjetValue; label: string } =>
	Boolean(opt.value),
);

const questionOrder = ["nom", "email", "entreprise", "objet", "message"] as const;
type QuestionKey = (typeof questionOrder)[number];

const questions: Record<QuestionKey, string> = {
	nom: "Quel est votre nom ?",
	email: "Quelle est votre adresse e-mail ?",
	entreprise: 'Quel est le nom de votre entreprise ? (optionnel, vous pouvez écrire "aucune")',
	objet: "Quel est l'objet de votre message ?",
	message: "Pouvez-vous décrire votre besoin ? (15 caractères minimum)",
};

const emptyAnswers: ChatAnswers = {
	nom: "",
	email: "",
	entreprise: "",
	objet: "autre",
	message: "",
};

const buildWhatsappSummary = (answers: ChatAnswers): string => {
	const objetLabel = objetChoices.find((o) => o.value === answers.objet)?.label ?? answers.objet;
	return [
		"Bonjour,",
		"",
		"Nouvelle demande via le chatbot :",
		`- Nom : ${answers.nom}`,
		`- Email : ${answers.email}`,
		`- Entreprise : ${answers.entreprise || "Non renseignée"}`,
		`- Objet : ${objetLabel}`,
		`- Message : ${answers.message}`,
	].join("\n");
};

const TypingDots = () => (
	<div
		className="flex items-center gap-1 px-3 py-2.5"
		aria-hidden
	>
		<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/45 [animation-delay:0ms]" />
		<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/45 [animation-delay:150ms]" />
		<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/45 [animation-delay:300ms]" />
	</div>
);

const ChatbotWidget = () => {
	const [open, setOpen] = useState(false);
	const [teaser, setTeaser] = useState(false);
	const [lines, setLines] = useState<ChatLine[]>([]);
	const [typing, setTyping] = useState(false);
	const [betweenTyping, setBetweenTyping] = useState(false);
	const [draft, setDraft] = useState("");
	const [answers, setAnswers] = useState<ChatAnswers>(emptyAnswers);
	const [stepIndex, setStepIndex] = useState(0);
	const listRef = useRef<HTMLDivElement>(null);
	const betweenTypingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pendingAfterStreamRef = useRef<(() => void) | null>(null);

	const clearBetweenTypingTimeout = useCallback(() => {
		if (betweenTypingTimeoutRef.current) {
			window.clearTimeout(betweenTypingTimeoutRef.current);
			betweenTypingTimeoutRef.current = null;
		}
	}, []);

	const appendStreamingBot = useCallback(
		(text: string, afterComplete?: () => void) => {
			pendingAfterStreamRef.current = afterComplete ?? null;
			clearBetweenTypingTimeout();
			setBetweenTyping(true);
			betweenTypingTimeoutRef.current = window.setTimeout(() => {
				betweenTypingTimeoutRef.current = null;
				setBetweenTyping(false);
				setLines((prev) => [...prev, { id: nextLineId(), role: "bot", text, revealed: 0 }]);
			}, BETWEEN_MESSAGE_TYPING_MS);
		},
		[clearBetweenTypingTimeout],
	);

	/** Bulle d’accroche au-dessus du bouton */
	useEffect(() => {
		const id = window.setTimeout(() => setTeaser(true), 5500);
		return () => window.clearTimeout(id);
	}, []);

	/**
	 * Ouverture : délai initial puis enchaînement accueil (stream) → question nom (stream).
	 */
	useEffect(() => {
		if (!open) {
			clearBetweenTypingTimeout();
			pendingAfterStreamRef.current = null;
			setLines([]);
			setDraft("");
			setTyping(false);
			setBetweenTyping(false);
			setAnswers(emptyAnswers);
			setStepIndex(0);
			return undefined;
		}

		setTyping(true);
		const t = window.setTimeout(() => {
			setTyping(false);
			appendStreamingBot(botGreeting, () => {
				appendStreamingBot(questions.nom);
			});
		}, INITIAL_TYPING_MS);

		return () => {
			window.clearTimeout(t);
			clearBetweenTypingTimeout();
			setTyping(false);
		};
	}, [open, appendStreamingBot, clearBetweenTypingTimeout]);

	/** Machine à écrire : révèle les caractères des bulles bot une par une */
	useEffect(() => {
		const target = lines.find((l) => l.role === "bot" && l.revealed < l.text.length);
		if (!target) return undefined;
		const id = window.setInterval(() => {
			setLines((prev) =>
				prev.map((l) =>
					l.id === target.id && l.role === "bot"
						? { ...l, revealed: Math.min(l.text.length, l.revealed + 1) }
						: l,
				),
			);
		}, STREAM_CHAR_MS);
		return () => window.clearInterval(id);
	}, [lines]);

	/** Après une bulle bot entièrement affichée : enchaînement éventuel (accueil → question, etc.) */
	useEffect(() => {
		const cb = pendingAfterStreamRef.current;
		if (!cb || betweenTyping || typing) return;
		const incomplete = lines.some((l) => l.role === "bot" && l.revealed < l.text.length);
		if (incomplete) return;
		pendingAfterStreamRef.current = null;
		cb();
	}, [lines, betweenTyping, typing]);

	useEffect(() => {
		const el = listRef.current;
		if (!el) return;
		el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
	}, [lines, typing, betweenTyping, open]);

	const openPanel = () => {
		setOpen(true);
		setTeaser(false);
	};

	const togglePanel = () => {
		setTeaser(false);
		setOpen((o) => !o);
	};

	const botStreaming = lines.some((l) => l.role === "bot" && l.revealed < l.text.length);
	const chatReady = open && !typing && !betweenTyping && !botStreaming;

	const currentQuestion = questionOrder[stepIndex];
	const isObjetStep = currentQuestion === "objet";
	const objetQuestionFullyShown = lines.some(
		(l) => l.role === "bot" && l.text === questions.objet && l.revealed >= l.text.length,
	);

	const addUserLine = (text: string) => setLines((prev) => [...prev, { id: nextLineId(), role: "user", text }]);

	const selectObjet = (choice: { value: ContactObjetValue; label: string }) => {
		addUserLine(choice.label);
		setAnswers((prev) => ({ ...prev, objet: choice.value }));
		setStepIndex(4);
		appendStreamingBot(questions.message);
		setDraft("");
	};

	const sendToWhatsapp = (e: React.FormEvent) => {
		e.preventDefault();
		if (!chatReady) return;

		const value = draft.trim();
		if (!value) return;

		if (currentQuestion === "nom") {
			if (value.length < 2) {
				appendStreamingBot("Merci d'indiquer votre nom (au moins 2 caractères).");
				return;
			}
			addUserLine(value);
			setAnswers((prev) => ({ ...prev, nom: value }));
			setStepIndex(1);
			appendStreamingBot(questions.email);
			setDraft("");
			return;
		}

		if (currentQuestion === "email") {
			const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			if (!emailOk) {
				appendStreamingBot("Merci d'indiquer une adresse e-mail valide.");
				return;
			}
			addUserLine(value);
			setAnswers((prev) => ({ ...prev, email: value }));
			setStepIndex(2);
			appendStreamingBot(questions.entreprise);
			setDraft("");
			return;
		}

		if (currentQuestion === "entreprise") {
			const cleaned = /^(aucune|non|n\/a|na)$/i.test(value) ? "" : value;
			addUserLine(cleaned || "Aucune");
			setAnswers((prev) => ({ ...prev, entreprise: cleaned }));
			setStepIndex(3);
			appendStreamingBot(questions.objet);
			setDraft("");
			return;
		}

		if (currentQuestion === "objet") {
			return;
		}

		if (currentQuestion === "message") {
			if (value.length < 15) {
				appendStreamingBot("Votre message est trop court. Précisez votre contexte (15 caractères minimum).");
				return;
			}
			addUserLine(value);
			const summaryAnswers: ChatAnswers = { ...answers, message: value };
			setAnswers(summaryAnswers);
			setDraft("");
			window.setTimeout(() => {
				window.location.assign(whatsappUrlWithText(buildWhatsappSummary(summaryAnswers)));
			}, 120);
			return;
		}

		setDraft("");
	};

	const showTypingIndicator = typing || betweenTyping;

	return (
		<div
			className={cn(
				"fixed bottom-4 right-4 z-[100] flex flex-col items-end gap-2",
				"max-sm:bottom-[max(1rem,env(safe-area-inset-bottom))] max-sm:right-3",
			)}
		>
			{teaser && !open ? (
				<div
					role="dialog"
					aria-label="Message de l’assistant"
					className="relative max-w-[min(100vw-5rem,17rem)] animate-in fade-in slide-in-from-bottom-2 duration-300"
				>
					<button
						type="button"
						onClick={() => setTeaser(false)}
						className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm hover:bg-muted"
						aria-label="Fermer l’aperçu"
					>
						<X className="h-3.5 w-3.5" />
					</button>
					<button
						type="button"
						onClick={openPanel}
						className="rounded-2xl rounded-br-md border border-border/80 bg-card px-4 py-3 text-left text-sm leading-snug text-foreground shadow-lg transition-shadow hover:shadow-xl"
					>
						<span className="font-medium text-primary">Assistant CAYRIBE</span>
						<span className="mt-1 block text-muted-foreground">En quoi puis-je vous aider ?</span>
					</button>
				</div>
			) : null}

			{open ? (
				<div
					id="chatbot-panel"
					className={cn(
						"flex h-[min(72vh,28rem)] w-[min(100vw-1.5rem,22rem)] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl",
						"animate-in fade-in zoom-in-95 duration-200",
					)}
					role="dialog"
					aria-labelledby="chatbot-widget-title"
				>
					<header className="flex items-center gap-3 border-b border-border/60 bg-primary px-3 py-3 text-primary-foreground">
						<div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15 ring-2 ring-primary-foreground/25">
							<MessageCircle
								className="h-5 w-5"
								aria-hidden
							/>
							<span
								className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-emerald-400"
								title="En ligne"
							/>
						</div>
						<div className="min-w-0 flex-1">
							<p
								id="chatbot-widget-title"
								className="truncate text-sm font-semibold tracking-tight"
							>
								Assistant CAYRIBE
							</p>
							<p className="text-[11px] font-medium text-primary-foreground/80">En ligne</p>
						</div>
						<button
							type="button"
							onClick={() => setOpen(false)}
							className="rounded-lg p-2 text-primary-foreground/90 hover:bg-primary-foreground/10"
							aria-label="Fermer le tchat"
						>
							<X className="h-4 w-4" />
						</button>
					</header>

					<div
						ref={listRef}
						className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] bg-muted/30 px-3 py-3"
						aria-live="polite"
					>
						{lines.map((line) => (
							<div
								key={line.id}
								className={cn("flex", line.role === "user" ? "justify-end" : "justify-start")}
							>
								<div
									className={cn(
										"max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
										line.role === "bot"
											? "rounded-tl-sm border border-border/60 bg-background text-foreground"
											: "rounded-tr-sm bg-primary text-primary-foreground",
									)}
								>
									{line.role === "bot" ? line.text.slice(0, line.revealed) : line.text}
								</div>
							</div>
						))}
						{showTypingIndicator ? (
							<div className="flex justify-start">
								<div className="rounded-2xl rounded-tl-sm border border-border/60 bg-background shadow-sm">
									<TypingDots />
								</div>
							</div>
						) : null}
					</div>

					<form
						onSubmit={sendToWhatsapp}
						className="border-t border-border/60 bg-background p-3"
					>
						{isObjetStep ? (
							objetQuestionFullyShown ? (
								<div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-bottom-1 duration-200">
									{objetChoices.map((choice) => (
										<button
											key={choice.value}
											type="button"
											onClick={() => selectObjet(choice)}
											disabled={!chatReady}
											className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-left text-sm text-foreground transition-all hover:border-primary/35 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
										>
											{choice.label}
										</button>
									))}
								</div>
							) : (
								<div
									className="min-h-12"
									aria-hidden
								/>
							)
						) : (
							<div className="flex gap-2">
								<label
									htmlFor="chatbot-input"
									className="sr-only"
								>
									Votre message
								</label>
								<input
									id="chatbot-input"
									type="text"
									value={draft}
									onChange={(e) => setDraft(e.target.value)}
									placeholder="Votre réponse..."
									className="min-w-0 flex-1 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
									autoComplete="off"
									autoFocus
								/>
								<button
									type="submit"
									disabled={open && (!chatReady || draft.trim().length === 0)}
									className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-md enabled:active:translate-y-0 enabled:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									aria-label="Valider la réponse"
								>
									<Send className="h-4 w-4" />
								</button>
							</div>
						)}
					</form>
				</div>
			) : null}

			<button
				type="button"
				onClick={togglePanel}
				className={cn(
					"flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
					"bg-primary text-primary-foreground hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
					open && "ring-2 ring-secondary ring-offset-2 ring-offset-background",
				)}
				aria-expanded={open}
				aria-controls={open ? "chatbot-panel" : undefined}
				aria-label={open ? "Fermer l’assistant" : "Ouvrir l’assistant de chat"}
			>
				{open ? (
					<X className="h-6 w-6" />
				) : (
					<MessageCircle
						className="h-6 w-6"
						strokeWidth={2}
					/>
				)}
			</button>
		</div>
	);
};

export default ChatbotWidget;
