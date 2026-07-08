/**
 * English strings. Rouxls' fake-archaic voice ("Buyeth", "worm") lives here.
 * Dialogue lines start with "* " (Deltarune narration style); the Japanese
 * file uses the full-width asterisk ＊ instead.
 */
export const en = {
  translation: {
    greeting:
      "* Sup, worm.\nWelcometh to mine\nfine SHOPPE.\nWhat wouldst thou?",

    commands: {
      buy: "Buy",
      talk: "Talk",
      exit: "Exit",
    },

    confirm: {
      prompt: "Buyeth for\n{{price}}$ ?",
      yes: "Yes",
      no: "No",
    },

    info: {
      exitTitle: "Exit",
      exitBlurb: "Leaveth this liste,\nworm.",
    },

    footer: {
      space: "Space: 12",
    },

    closed: {
      line: "Thou hast left mine shoppe.",
      reopen: "Re-entereth",
    },

    loading: {
      enter: "Enter",
    },

    talk: {
      topics: [
        {
          label: "About yourself",
          text: "* I am Rouxls Kaard,\nDuke of Puzzleth.\nI keepeth this fine\nshoppe for worms\nlike thee.",
        },
        {
          label: "About your experience",
          text: "* I hath crafted manye\npuzzles for the King\nof Spades himself.\nNo worm canst solve\nthem — except me.",
        },
        {
          label: "About your education",
          text: "* I learnedst the art\nof puzzles at the\nCarde Academie.\nGraduated with\nhighest honours.",
        },
        {
          label: "About your ambitions",
          text: "* I shalt becometh the\ngreatest puzzle-master\nin all the land.\nThen every worm\nwilst respect me!",
        },
      ],
    },

    projects: {
      "rouxls-roux": {
        name: "RouxlsRoux",
        blurb: "A worthelesse trinket.\nDoeth nothing. Buyeth anyway.",
        buyLine: "* A fine choice, worm! Thou hast TASTE.",
      },
      "brave-ax": {
        name: "Brave Ax",
        blurb: "ATK +10.\nForged for ye who shippeth.",
        buyLine: "* Swing it at thy bugs, lesser worm!",
      },
      "dainty-scarf": {
        name: "DaintyScarf",
        blurb: "DEF +6.\nMost fashionable. Verye warm.",
        buyLine: "* It suiteth thee. Barely.",
      },
      "amber-card": {
        name: "Amber Card",
        blurb: "A mysteryous carde.\nContacteth its owner.",
        buyLine: "* Useth it to reach me, worm. Or don't.",
      },
    },

    aria: {
      shopItems: "Shop items",
      talkTopics: "Talk topics",
      shopActions: "Shop actions",
      shopkeeper: "The shopkeeper",
      mute: "Mute",
      unmute: "Unmute",
      switchLang: "Switch language to Japanese",
      portfolio: "Portfolio projects",
    },

    seo: {
      title: "Hearith — Developer Portfolio",
      tagline:
        "A Deltarune-style portfolio shop. Each shop ware links to a real project.",
    },
  },
};
