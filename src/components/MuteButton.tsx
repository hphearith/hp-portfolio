import { useState } from "react";
import { isMuted, toggleMute } from "../audio/sfx";

/** Fixed top-right mute toggle. Swaps mute/unmute sprite on click. */
export default function MuteButton() {
  const [muted, setMuted] = useState(isMuted());

  return (
    <button
      className="mute-btn"
      type="button"
      aria-label={muted ? "Unmute" : "Mute"}
      onClick={() => setMuted(toggleMute())}
    >
      <img
        src={muted ? "/sprites/unmute.png" : "/sprites/mute.png"}
        alt=""
        draggable={false}
      />
    </button>
  );
}
