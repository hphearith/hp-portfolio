# Product

## Register

brand

## Users

Tech recruiters and hiring managers landing on Hearith's developer portfolio, usually
from a résumé link or social post, often skimming many candidates in one sitting. Their
job: judge skill and fit fast, and find a way to reach out. Secondary visitors are dev
peers and Deltarune fans who arrive to enjoy the bit and may share it.

The site reframes the portfolio as **Rouxls Kaard's shop from Deltarune**: each project is
a shop "ware" browsed with a SOUL-heart cursor. The experience itself is the showcase — the
craft of nailing the homage is the proof of skill. Every ware must still link to real work,
and contact must stay one obvious step away, because a memorable bit that strands a recruiter
fails its one job.

## Product Purpose

A single-screen, keyboard-and-pointer driven "shop" that presents Hearith's projects as
items for sale. It exists to be **memorable enough to earn an interview** — to stand out in a
stack of identical template portfolios by demonstrating front-end taste, attention to detail,
and game-feel through a faithful Deltarune shop recreation. Success = a recruiter remembers
it, reaches the real projects/contact, and the homage reads as deliberate craft, not a gimmick.

## Brand Personality

Playful, irreverent, retro-game. Voice is **Rouxls Kaard**: pompous mock-medieval flourish
("Buyeth", "worm", "fine shoppe") that's funny because it's confidently overwrought. Three
words: **cheeky, crafted, nostalgic**. Emotionally it should spark recognition and a grin in
those who know Deltarune, and intrigue (not confusion) in those who don't. The humor never
costs clarity — the joke lands *and* you can still find the door.

## Anti-references

- **Generic SaaS / template portfolio** — cream/sand backgrounds, identical card grids,
  tiny tracked-uppercase eyebrows, hero-metric blocks. The default AI-portfolio look this
  project exists to reject.
- **Breaking the bit** — modern UI chrome (rounded cards, soft gradients, drop shadows,
  glassmorphism) bolted onto the pixel world. Anything that isn't crisp, flat, and
  pixel-native fractures the illusion.
- **Illegible retro** — style over readability: low-contrast pixel text, decorative fonts
  pushed past legibility, navigation a visitor can't figure out.
- **Overstuffed** — extra menus, effects, or wares crammed in until the clean four-panel
  shop focus is lost. The reference is spare; stay spare.

## Design Principles

- **Honor the source.** Match Deltarune's shop grammar exactly — black field, white
  double-line frames, SOUL cursor, blip SFX, the 2×2 panel layout. Fidelity to the homage
  IS the portfolio's argument for craft.
- **The joke never blocks the job.** A recruiter must always reach real projects and contact
  in one obvious move. Flavor text decorates the path; it never hides it.
- **Crisp over smooth.** Pixel-native rendering, flat fills, hard edges, integer-scaled
  stage. No anti-aliased modern softness anywhere it would show.
- **Spare, like the reference.** Four panels, a short ware list, one cursor. Resist adding
  surfaces; every addition must earn its place against the clean shop focus.
- **Show, don't tell.** Pulling off convincing game-feel proves front-end skill more than any
  "skills" list could. Let the execution be the credential.

## Accessibility & Inclusion

Target **WCAG 2.1 AA** plus full keyboard operability:
- Contrast AA for all functional text (the white-on-black core already clears it; watch the
  yellow/cyan accents and any reduced-opacity flavor text against black).
- Complete keyboard navigation of the ware list, confirm, and dialog (arrow/Z/X already
  scaffolded) — pointer/tap is an addition, never the only path.
- Respect `prefers-reduced-motion` (typewriter, cursor, transitions get a calm fallback).
- Maintain the visually-hidden, no-JS `sr-only` content so crawlers and screen readers get
  real project names and links regardless of the canvas experience.
