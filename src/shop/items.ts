export type Project = {
  id: string;
  /** shop-item display name */
  name: string;
  /** flavour price in $ (not real money) */
  price: number;
  /** short text shown in the top-right info panel */
  blurb: string;
  /** Rouxls dialog line shown when you "Buyeth" it */
  buyLine: string;
  /** real URL opened on purchase */
  link: string;
  /** optional thumbnail in /sprites/ */
  thumb?: string;
};

/** Special non-project row that closes the shop. */
export const EXIT_ID = "exit";

/**
 * Shop wares = portfolio projects. Edit these with your real work.
 * Keep names short so they fit the menu column like the reference.
 */
export const PROJECTS: Project[] = [
  {
    id: "rouxls-roux",
    name: "RouxlsRoux",
    price: 50,
    blurb: "A worthelesse trinket.\nDoeth nothing. Buyeth anyway.",
    buyLine: "A fine choice, worm! Thou hast TASTE.",
    link: "https://github.com/hphearith",
  },
  {
    id: "brave-ax",
    name: "Brave Ax",
    price: 150,
    blurb: "ATK +10.\nForged for ye who shippeth.",
    buyLine: "Swing it at thy bugs, lesser worm!",
    link: "https://github.com/hphearith",
  },
  {
    id: "dainty-scarf",
    name: "DaintyScarf",
    price: 200,
    blurb: "DEF +6.\nMost fashionable. Verye warm.",
    buyLine: "It suiteth thee. Barely.",
    link: "https://github.com/hphearith",
  },
  {
    id: "amber-card",
    name: "Amber Card",
    price: 100,
    blurb: "A mysteryous carde.\nContacteth its owner.",
    buyLine: "Useth it to reach me, worm. Or don't.",
    link: "mailto:garnish_kelvin53@icloud.com",
  },
];

/** Starting gold shown bottom-right (flavour only). */
export const STARTING_GOLD = 945;
