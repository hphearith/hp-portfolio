/**
 * Persisted read-state for talk topics. Stores a JSON array of topic
 * indices into TALK_TOPICS / i18n talk.topics (append-only indices),
 * e.g. "[0,5]". Locale-independent: reading a topic in English also
 * unlocks in Japanese — same content.
 */
const STORAGE_KEY = "talkRead";

export function loadReadTopics(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((n): n is number => typeof n === "number")
      : [];
  } catch {
    // blocked storage / corrupt JSON — start locked, non-fatal
    return [];
  }
}

export function saveReadTopics(readTopics: readonly number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readTopics));
  } catch {
    // private mode / quota — read-state just won't persist
  }
}
