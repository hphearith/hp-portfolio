/**
 * Structural shop data only. All display text lives in src/i18n/{en,ja}.ts,
 * keyed by project id (projects.<id>.name / .blurb / .buyLine) and by
 * talk-topic index (talk.topics.<n>.label / .text).
 */
export type Project = {
  id: string;
  /** flavour price in $ (not real money) */
  price: number;
  /** real URL opened on purchase */
  link: string;
  /** optional thumbnail in /sprites/ */
  thumb?: string;
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

/** Number of talk topics (labels/texts live in the i18n files). */
export const TALK_TOPIC_COUNT = 4;

export const TALK_EXIT_INDEX = TALK_TOPIC_COUNT;
export const TALK_ROWS = TALK_TOPIC_COUNT + 1;

/** Index of the "Tell me about yourself" topic. */
export const TALK_ABOUT_INDEX = 0;

/**
 * Page count per talk topic. Topics with 1 page use a single `text` i18n
 * key; topics with >1 use `pages.<n>` keys instead (see en/ja.ts).
 */
export const TALK_TOPIC_PAGE_COUNT = [8, 1, 1, 1];

/** Face sprite key shown on each page of the "about yourself" topic. */
export const TALK_ABOUT_FACES = [
  "base",
  "happy",
  "base",
  "sweat",
  "sweat",
  "neutral",
  "mlem",
  "base",
] as const;

/**
 * Shop wares = portfolio projects. Edit these with your real work.
 * Names/blurbs are in the i18n files under projects.<id>.
 */
export const PROJECTS: Project[] = [
  {
    id: "rouxls-roux",
    price: 50,
    link: "https://github.com/hphearith",
  },
  {
    id: "brave-ax",
    price: 150,
    link: "https://github.com/hphearith",
  },
  {
    id: "dainty-scarf",
    price: 200,
    link: "https://github.com/hphearith",
  },
  {
    id: "amber-card",
    price: 100,
    link: "mailto:garnish_kelvin53@icloud.com",
  },
];

/** Starting gold shown bottom-right (flavour only). */
export const STARTING_GOLD = 945;
