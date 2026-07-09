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

/** Reveals text one character at a time, or instantly if reduced motion. */
export default function Typewriter({
  text,
  speed = 28,
  onChar,
  onComplete,
  skip = false,
}: Props) {
  const [count, setCount] = useState(0);
  // tracks which `text` the current `count` belongs to
  const [seenText, setSeenText] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const completed = useRef(false);

  // Reset synchronously during render (not in an effect) whenever the text
  // changes. Doing this in an effect left a one-commit window where the
  // completion-check effect below could still read the OLD count against
  // the NEW (often shorter) text, decide it was already "done", and skip
  // the animation + skip the per-char SFX entirely.
  if (text !== seenText) {
    setSeenText(text);
    setCount(reduced ? text.length : 0);
    completed.current = false;
  }

  // reduced-motion can toggle mid-line without text changing
  useEffect(() => {
    if (reduced) {
      setCount(text.length);
    }
  }, [reduced, text]);

  // instantly reveal all text when skip prop becomes true
  useEffect(() => {
    if (skip) {
      setCount(text.length);
    }
  }, [skip, text.length]);

  useEffect(() => {
    if (count >= text.length) {
      if (!completed.current) {
        completed.current = true;
        onComplete?.();
      }
      return;
    }
    const id = window.setTimeout(() => {
      setCount((c) => c + 1);
      onChar?.();
    }, speed);
    return () => window.clearTimeout(id);
  }, [count, text, speed, onChar, onComplete]);

  return <span>{text.slice(0, count)}</span>;
}
