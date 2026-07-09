/**
 * English strings. Rouxls' fake-archaic voice ("Buyeth", "worm") lives here.
 * Dialogue lines start with "* " (Deltarune narration style); the Japanese
 * file uses the full-width asterisk ＊ instead.
 */
export const en = {
  translation: {
    greeting:
      "* Greetings! \nWelcome to my portfolio. \nHave a look around.",

    commands: {
      buy: "Buy",
      talk: "Talk",
      exit: "Exit",
      items: "Items",
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

    items: {
      soldOut: "(SOLD OUT)",
      empty: "Thou hast bought\nnaught yet, worm.",
      openPrompt: "Openeth it,\nworm?",
    },

    loading: {
      enter: "Enter",
    },

    talk: {
      topics: [
        {
          label: "Tell me about yourself",
          pages: [
            "* My name is Heng Phearith.\nI am a 3rd year computer\nscience student studying\nat AUPP.",
            "* I am also a student of\nthe Japanese IT Pathway\nProgram at AUPP, where I'm\nbeing trained to be an elite\nIT professional, with the\nprospects of working in Japan.",
            "* I like to watch manga\nand watch Youtube videos\nin my spare time.",
            "* Well... *if* I have\nspare time.",
            "* Recently, doing projects\nand learning Japanese has\nbasically become my hobby.",
            "* Kinda grim if you\nthink about it...",
            "* But, I am having fun\nso it's alright.",
            "* Nice to meet you.",
          ],
        },
        {
          label: "About your experience",
          pages: [
            "* I hath crafted manye\npuzzles for the King\nof Spades himself.\nNo worm canst solve\nthem — except me.",
          ],
        },
        {
          label: "About your education",
          pages: [
            "* I learnedst the art\nof puzzles at the\nCarde Academie.\nGraduated with\nhighest honours.",
          ],
        },
        {
          label: "About your ambitions",
          pages: [
            "* I shalt becometh the\ngreatest puzzle-master\nin all the land.\nThen every worm\nwilst respect me!",
          ],
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
      itemsList: "Purchased items",
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
