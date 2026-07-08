import heartSprite from "../assets/sprites/heart.png";

/**
 * The red SOUL cursor. It does not animate between positions — it is rendered
 * directly in front of whichever row/option is active, so it "snaps" instantly
 * (authentic Deltarune feel).
 */
export default function Heart({ sprite = true }: { sprite?: boolean }) {
  if (sprite) {
    return (
      <img
        src={heartSprite}
        alt=""
        aria-hidden="true"
        className="heart-sprite"
      />
    );
  }
  return (
    <span aria-hidden="true" className="heart-glyph">
      ♥
    </span>
  );
}
