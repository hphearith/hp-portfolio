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
};

/** Reveals text one character at a time, or instantly if reduced motion. */
export default function Typewriter({
  text,
  speed = 28,
  onChar,
  onComplete,
}: Props) {
  const [count, setCount] = useState(0);
  const reduced = usePrefersReducedMotion();
  const completed = useRef(false);

  // restart whenever the text changes
  useEffect(() => {
    setCount(reduced ? text.length : 0);
    completed.current = false;
  }, [text, reduced]);

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
