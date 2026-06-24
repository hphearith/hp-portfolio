# Drop your pixel-art assets here

These paths are referenced by the code. Everything works without them (placeholders
/ fallbacks kick in), but add the real art to get the authentic Deltarune look.

## /fonts
- `pixelmono.woff2` — main shop text. Use "Determination Mono" or "8bitoperator".
- `fancyolden.woff2` — Rouxls' "Buyeth" flavour text. A blackletter/serif.

## /sprites
- `frame.png` — 9-slice window border with decorative corners (then add the
  `frame--sprite` class via the `sprite` prop on `<Frame>`). Tune the slice/width
  in `src/styles/frame.css` to your corner size.
- `rouxls.png` — shopkeeper portrait (or your own avatar).
- `heart.png` — red SOUL cursor (then pass `sprite` to `<Heart>`).
- project thumbnails (optional, referenced by `Project.thumb`).

## /sfx
- `move.wav` — menu cursor blip.
- `select.wav` — confirm.
- `cancel.wav` — back.
- `squeak.wav` — Rouxls talk blip.

### Licensing note
Deltarune/Undertale fonts, sprites and SFX are Toby Fox's work. Fine for a personal,
non-commercial portfolio with credit; for safety prefer original or freely-licensed art.
