import { useEffect, useState } from "react";

type UseCountUpOptions = {
  /** Durée totale du comptage (ms) */
  durationMs?: number;
  /** Attente avant de démarrer (ms), ex. pour décaler chaque carte */
  delayMs?: number;
};

/**
 * Anime un entier de 0 à `target` quand `active` devient true (easing sortie quartique).
 */
export function useCountUp(target: number, active: boolean, options: UseCountUpOptions = {}) {
  const { durationMs = 1700, delayMs = 0 } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    let raf = 0;
    const easeOutQuart = (t: number) => 1 - (1 - t) ** 4;

    const timeout = window.setTimeout(() => {
      let start: number | null = null;
      const tick = (now: number) => {
        if (start === null) start = now;
        const t = Math.min(1, (now - start) / durationMs);
        setValue(Math.round(easeOutQuart(t) * target));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [active, target, durationMs, delayMs]);

  return value;
}
