/**
 * Structural shop data only. All display text lives in src/i18n/{en,ja}.ts,
 * keyed by project id (projects.<id>.name / .blurb / .buyLine) and by
 * talk-topic index (talk.topics.<n>.label / .pages.<n>).
 */
export type Project = {
  id: string;
  /** flavour price in $ (not real money) */
  price: number;
  /** real URL opened on purchase */
  link: string;
  /** optional thumbnail in /sprites/ */
  thumb?: string;
  /** on Open, always opens link in a new tab (bypasses LINKS_ENABLED) */
  openDirect?: boolean;
};

/** Root command menu (right panel) shown on landing — i18n keys. */
export const ROOT_COMMANDS = [
  "commands.buy",
  "commands.talk",
  "commands.items",
] as const;
export const CMD_BUY = 0;
export const CMD_TALK = 1;
export const CMD_ITEMS = 2;

/** Face sprite keys available to talk-topic scripts (sprites in ShopScreen). */
export type FaceKey = "base" | "happy" | "mlem" | "neutral" | "pout" | "sweat";

export type TalkTopicDef = {
  /**
   * One face key per dialog page — its length IS the topic's page count.
   * Must match talk.topics.<n>.pages length in BOTH en.ts and ja.ts.
   */
  faces: readonly FaceKey[];
  /** Topic index that must be fully read before this topic appears. */
  unlockedBy?: number;
};

// Indices into TALK_TOPICS and i18n talk.topics — APPEND-ONLY, never
// reorder: readTopics persists these indices in localStorage ("talkRead").

/** Index of the "Tell me about yourself" topic. */
export const TALK_ABOUT_INDEX = 0;

/** Index of the "About your experience" topic. */
export const TALK_EXPERIENCE_INDEX = 1;

/** Index of the "About your education" topic. */
export const TALK_EDUCATION_INDEX = 2;

/** Index of the "About your ambitions" topic. */
export const TALK_AMBITIONS_INDEX = 3;

/** Index of the "About this portfolio" topic. */
export const TALK_PORTFOLIO_INDEX = 4;

/** Index of the "More about yourself" topic (unlocked by reading topic 0). */
export const TALK_MORE_ABOUT_INDEX = 5;

export const TALK_TOPICS: readonly TalkTopicDef[] = [
  // 0: Tell me about yourself (8 pages)
  { faces: ["base", "happy", "base", "sweat", "sweat", "neutral", "mlem", "base"] },
  // 1: About your experience (7 pages)
  { faces: ["base", "mlem", "base", "sweat", "base", "happy", "mlem"] },
  // 2: About your education (7 pages)
  { faces: ["base", "base", "happy", "base", "mlem", "base", "mlem"] },
  // 3: About your ambitions (8 pages)
  { faces: ["base", "base", "happy", "neutral", "neutral", "neutral", "neutral", "happy"] },
  // 4: About this portfolio (7 pages)
  { faces: ["happy", "base", "base", "base", "mlem", "happy", "base"] },
  // 5: More about yourself (10 pages)
  {
    faces: [
      "happy",
      "mlem",
      "happy",
      "base",
      "happy",
      "neutral",
      "pout",
      "happy",
      "happy",
      "base",
    ],
    unlockedBy: TALK_ABOUT_INDEX,
  },
];

/** Pages in a topic's dialogue = one face per page. */
export function talkPageCount(topic: number): number {
  return TALK_TOPICS[topic]?.faces.length ?? 1;
}

/** Topic indices shown on each talk-menu page (page 0 topics are never hidden). */
const TALK_PAGE_TOPICS: readonly (readonly number[])[] = [
  [TALK_ABOUT_INDEX, TALK_EXPERIENCE_INDEX, TALK_EDUCATION_INDEX],
  [TALK_AMBITIONS_INDEX, TALK_PORTFOLIO_INDEX, TALK_MORE_ABOUT_INDEX],
];

/** Row index of the More... row on page 0 (cursor-restore target for Back/Esc). */
export const TALK_MORE_ROW_INDEX = TALK_PAGE_TOPICS[0].length;

/** A selectable row of the talk menu. */
export type TalkRow =
  | { kind: "topic"; topic: number }
  | { kind: "more" }
  | { kind: "back" }
  | { kind: "exit" };

/** Whether a topic's row is shown at all (locked topics are hidden). */
export function isTopicVisible(
  topic: number,
  readTopics: readonly number[]
): boolean {
  const def = TALK_TOPICS[topic];
  return def?.unlockedBy === undefined || readTopics.includes(def.unlockedBy);
}

/** Unlocked-but-unread — rendered yellow (var(--col-yellow)). */
export function isTopicNew(
  topic: number,
  readTopics: readonly number[]
): boolean {
  const def = TALK_TOPICS[topic];
  return (
    def?.unlockedBy !== undefined &&
    isTopicVisible(topic, readTopics) &&
    !readTopics.includes(topic)
  );
}

/** More... turns yellow while the next menu page holds a new topic. */
export function talkPageHasNew(
  page: 0 | 1,
  readTopics: readonly number[]
): boolean {
  return TALK_PAGE_TOPICS[page].some((t) => isTopicNew(t, readTopics));
}

/**
 * The selectable rows of a talk-menu page — single source of truth for
 * reducer navigation AND ShopScreen rendering. Page 0 ends with More...
 * and Exit; page 1 ends with Back.
 */
export function talkRowsFor(
  page: 0 | 1,
  readTopics: readonly number[]
): TalkRow[] {
  const topics: TalkRow[] = TALK_PAGE_TOPICS[page]
    .filter((t) => isTopicVisible(t, readTopics))
    .map((topic) => ({ kind: "topic", topic }));
  return page === 0
    ? [...topics, { kind: "more" }, { kind: "exit" }]
    : [...topics, { kind: "back" }];
}

/**
 * Shop wares = portfolio projects. Edit these with your real work.
 * Names/blurbs are in the i18n files under projects.<id>.
 */
export const PROJECTS: Project[] = [
  {
    id: "resume",
    price: 200,
    link: `${import.meta.env.BASE_URL}resume.pdf`,
    openDirect: true,
  },
  {
    id: "social-media-app",
    price: 100,
    link: "https://space-and-time-social-media.vercel.app",
    openDirect: true,
  },
  {
    id: "quiz-game",
    price: 50,
    link: "https://quiz-game-group2.netlify.app/",
    openDirect: true,
  },
];

/** Starting gold shown bottom-right (flavour only). */
export const STARTING_GOLD = 945;
