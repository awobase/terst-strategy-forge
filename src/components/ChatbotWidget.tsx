import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappUrlWithText } from "@/config/whatsapp";

const botGreeting =
  "Bonjour ! Je suis l’assistant virtuel CAYRIBE Partners. En quoi puis-je vous aider aujourd’hui ?";

let lineId = 0;
const nextLineId = () => {
  lineId += 1;
  return `chat-line-${lineId}`;
};

type ChatLine = { id: string; role: "bot" | "user"; text: string };

const TypingDots = () => (
  <div className="flex items-center gap-1 px-3 py-2.5" aria-hidden>
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
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  /** Bulle d’accroche au-dessus du bouton */
  useEffect(() => {
    const id = window.setTimeout(() => setTeaser(true), 5500);
    return () => clearTimeout(id);
  }, []);

  /**
   * Un seul effet sur `open` : fermeture = tout vider ; ouverture = animation « écriture » puis message d’accueil.
   * (Évite les courses entre deux effets et les re-rendus en boucle sur `lines`.)
   */
  useEffect(() => {
    if (!open) {
      setLines([]);
      setDraft("");
      setTyping(false);
      return undefined;
    }

    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setLines([{ id: nextLineId(), role: "bot", text: botGreeting }]);
    }, 1400);

    return () => {
      window.clearTimeout(t);
      setTyping(false);
    };
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lines, typing, open]);

  const openPanel = () => {
    setOpen(true);
    setTeaser(false);
  };

  const togglePanel = () => {
    setTeaser(false);
    setOpen((o) => !o);
  };

  const hasGreetingBubble = lines.some((l) => l.role === "bot" && l.text === botGreeting);
  const chatReady = hasGreetingBubble && !typing;

  const sendToWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatReady) return;
    const url = whatsappUrlWithText(draft);
    setDraft("");
    window.location.assign(url);
  };

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
              <MessageCircle className="h-5 w-5" aria-hidden />
              <span
                className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-emerald-400"
                title="En ligne"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p id="chatbot-widget-title" className="truncate text-sm font-semibold tracking-tight">
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
            className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-muted/30 px-3 py-3"
            aria-live="polite"
          >
            {lines.map((line) => (
              <div key={line.id} className={cn("flex", line.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
                    line.role === "bot"
                      ? "rounded-tl-sm border border-border/60 bg-background text-foreground"
                      : "rounded-tr-sm bg-primary text-primary-foreground",
                  )}
                >
                  {line.text}
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm border border-border/60 bg-background shadow-sm">
                  <TypingDots />
                </div>
              </div>
            ) : null}
          </div>

          <form onSubmit={sendToWhatsapp} className="border-t border-border/60 bg-background p-3">
            <div className="flex gap-2">
              <label htmlFor="chatbot-input" className="sr-only">
                Votre message
              </label>
              <input
                id="chatbot-input"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Votre message…"
                className="min-w-0 flex-1 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoComplete="off"
                autoFocus
              />
              <button
                type="submit"
                disabled={open && !chatReady}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.05] hover:shadow-md enabled:active:translate-y-0 enabled:active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Envoyer"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
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
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" strokeWidth={2} />}
      </button>
    </div>
  );
};

export default ChatbotWidget;
