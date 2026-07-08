import { Howl } from "howler";
import squeakSfx from "../assets/sfx/squeak.ogg";
import selectSfx from "../assets/sfx/select.ogg";
import bgmSfx from "../assets/sfx/bgm.ogg";

/*
 * Howler auto-unlocks the audio context on the first user gesture by default.
 */

export type SfxName = "move" | "select" | "cancel" | "squeak";

const SOURCES: Record<SfxName, string> = {
  move: squeakSfx,
  select: selectSfx,
  cancel: squeakSfx,
  squeak: squeakSfx,
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

// ---- Background music ----
// Long file: html5:true streams it instead of decoding the whole buffer.
let bgm: Howl | null = null;

function ensureBgm() {
  if (bgm) return bgm;
  bgm = new Howl({
    src: [bgmSfx],
    loop: true,
    volume: 0.35,
    html5: true,
    preload: true,
    mute: muted,
  });
  return bgm;
}

/**
 * Start the looping BGM. Must be called from a user gesture (browser autoplay
 * policy). No-op if already playing.
 */
export function startBgm() {
  const b = ensureBgm();
  if (!b.playing()) b.play();
}

export function playSfx(name: SfxName) {
  try {
    const s = ensureLoaded()[name];
    s?.play();
  } catch {
    // audio unavailable — ignore
  }
}

// ---- BGM mute ----
// Only mutes the music; sound effects keep playing.
let muted = false;

/** Mute/unmute the background music (SFX unaffected). */
export function setMuted(value: boolean) {
  muted = value;
  bgm?.mute(value);
}

export function isMuted() {
  return muted;
}

/** Flip mute and return the new state. */
export function toggleMute() {
  setMuted(!muted);
  return muted;
}
