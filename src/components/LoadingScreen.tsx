import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./loading.css";

const LOAD_DURATION_MS = 1800;

/** Pixelated loading bar, then an "Enter" button. Audio (BGM) can't autoplay
 * with sound in most browsers until a user gesture — the button click is
 * that gesture, so BGM only starts once the player presses it. */
export default function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the Enter button so a plain Enter/Space press (no mouse)
  // activates it via the browser's native button behavior.
  useEffect(() => {
    if (ready) btnRef.current?.focus();
  }, [ready]);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), LOAD_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ animationDuration: `${LOAD_DURATION_MS}ms` }}
        />
      </div>
      {ready && (
        <button
          ref={btnRef}
          type="button"
          className="enter-btn"
          onClick={onEnter}
        >
          {t("loading.enter")}
        </button>
      )}
    </div>
  );
}
