import { Howl, Howler } from "howler";

/*
 * Drop blip files into /public/sfx/ (wav or ogg). Until they exist these Howls
 * just fail to load silently — calls to playSfx are no-ops, nothing crashes.
 * Howler auto-unlocks the audio context on the first user gesture by default.
 */

export type SfxName = "move" | "select" | "cancel" | "squeak";

const SOURCES: Record<SfxName, string> = {
  move: "/sfx/move.wav",
  select: "/sfx/select.wav",
  cancel: "/sfx/cancel.wav",
  squeak: "/sfx/squeak.wav",
};

let sounds: Partial<Record<SfxName, Howl>> | null = null;

function ensureLoaded() {
  if (sounds) return sounds;
  sounds = {};
  (Object.keys(SOURCES) as SfxName[]).forEach((name) => {
    sounds![name] = new Howl({
      src: [SOURCES[name]],
      volume: 0.5,
      preload: true,
    });
  });
  return sounds;
}

/** Call once on mount to warm up the Howl instances. */
export function preloadSfx() {
  ensureLoaded();
}

export function playSfx(name: SfxName) {
  try {
    const s = ensureLoaded()[name];
    s?.play();
  } catch {
    // audio unavailable — ignore
  }
}

/** Master mute toggle (e.g. for a sound button later). */
export function setMuted(muted: boolean) {
  Howler.mute(muted);
}
