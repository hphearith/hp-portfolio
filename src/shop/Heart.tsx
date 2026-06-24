/**
 * The red SOUL cursor. It does not animate between positions — it is rendered
 * directly in front of whichever row/option is active, so it "snaps" instantly
 * (authentic Deltarune feel). Drop /sprites/heart.png to use real art.
 */
export default function Heart({ sprite = false }: { sprite?: boolean }) {
  if (sprite) {
    return (
      <img
        src="/sprites/heart.png"
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
