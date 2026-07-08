import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./loading.css";

const LOAD_DURATION_MS = 1800;

/** Pixelated loading bar, then an "Enter" button. Audio (BGM) can't autoplay
 * with sound in most browsers until a user gesture — the button click is
 * that gesture, so BGM only starts once the player presses it. */
export default function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);

  return (
    <div className="loading-overlay">
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ animationDuration: `${LOAD_DURATION_MS}ms` }}
          onAnimationEnd={() => setReady(true)}
        />
      </div>
      {ready && (
        <button type="button" className="enter-btn" onClick={onEnter}>
          {t("loading.enter")}
        </button>
      )}
    </div>
  );
}
