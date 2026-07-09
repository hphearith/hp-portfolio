import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

type Props = {
  text: string;
  /** ms per character */
  speed?: number;
  /** fired once per revealed character (for blip SFX) */
  onChar?: () => void;
  /** fired once when the full text is shown */
  onComplete?: () => void;
  /** when true, instantly reveal all text */
  skip?: boolean;
};

/**
 * Reveals text one character at a time, or instantly if reduced motion.
 *
 * The reveal progress lives in a SINGLE {text, count} state object — never
 * split it into two useState hooks. With separate hooks, the render-phase
 * reset on text change could tear under StrictMode's double-invoked render
 * (the text hook updated, the count reset bailed out), committing a stale
 * count against the new text. Any page shorter than its predecessor then
 * counted as already complete: it appeared fully formed with no per-char
 * reveal, no squeak SFX, and an instant onComplete. One object updates
 * atomically, so every committed render is internally consistent.
 */
export default function Typewriter({
  text,
  speed = 28,
  onChar,
  onComplete,
  skip = false,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(() => ({
    text,
    count: reduced ? text.length : 0,
  }));
  const completed = useRef(false);

  // restart atomically when a new text arrives (render-phase reset)
  if (typed.text !== text) {
    setTyped({ text, count: reduced ? text.length : 0 });
    completed.current = false;
  }

  // instantly reveal all text on skip (or reduced-motion flipping on mid-line)
  useEffect(() => {
    if (skip || reduced) {
      setTyped((t) =>
        t.count >= t.text.length ? t : { ...t, count: t.text.length }
      );
    }
  }, [skip, reduced, text]);

  // Completion + per-char ticking read only the atomic pair (not the text
  // prop), so they can never judge an old count against a new text.
  useEffect(() => {
    if (typed.count >= typed.text.length) {
      if (!completed.current) {
        completed.current = true;
        onComplete?.();
      }
      return;
    }
    const id = window.setTimeout(() => {
      setTyped((t) =>
        t.count >= t.text.length ? t : { ...t, count: t.count + 1 }
      );
      onChar?.();
    }, speed);
    return () => window.clearTimeout(id);
  }, [typed, speed, onChar, onComplete]);

  return <span>{typed.text.slice(0, typed.count)}</span>;
}
