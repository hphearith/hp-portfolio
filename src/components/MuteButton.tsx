import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isMuted, toggleMute } from "../audio/sfx";
import muteSprite from "../assets/sprites/mute.png";
import unmuteSprite from "../assets/sprites/unmute.png";

/** Fixed top-right mute toggle. Swaps mute/unmute sprite on click. Ctrl+M also toggles. */
export default function MuteButton() {
  const { t } = useTranslation();
  const [muted, setMuted] = useState(isMuted());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setMuted(toggleMute());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <button
      className="mute-btn"
      type="button"
      aria-label={muted ? t("aria.unmute") : t("aria.mute")}
      onClick={() => setMuted(toggleMute())}
    >
      <img
        src={muted ? unmuteSprite : muteSprite}
        alt=""
        draggable={false}
      />
    </button>
  );
}
