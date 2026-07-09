/**
 * English strings. Rouxls' fake-archaic voice ("Buyeth", "worm") lives here.
 * Dialogue lines start with "* " (Deltarune narration style); the Japanese
 * file uses the full-width asterisk ＊ instead.
 */
export const en = {
  translation: {
    greeting:
      "* Hello! \nWelcome to my portfolio. \nHave a look around.",

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
            "* My name is Heng Phearith.\nI'm a third-year Computer\nScience student studying\nat AUPP.",
            "* I also study Japanese with the plan of working in Japan someday.",
            "* I like to read manga\nand watch Youtube videos\nin my spare time.",
            "* Well... *if* I have\nspare time.",
            "* Recently, doing projects\nand studying Japanese has\nbasically become my hobby.",
            "* Kinda sad if you\nthink about it...",
            "* But, I'm having fun\nso it's alright.",
            "* Nice to meet you.",
          ],
        },
        {
          label: "About your experience",
          pages: [
            "* Most of the projects\nI've done so far are\nWeb Development projects.",
            "* This nice and cool\nportfolio that you're in\nright now being one of them.",
            "* Professionally, I'm currently\nan intern at a Japanese\nIT solutions company called\nNextMake, mainly working on\nCRUD management systems.",
            "* Details about that\ncan't be shared, though.\nSorry.",
            "* Personally, I've\nworked in a team to\ncreate a quiz game as\nwell as a mini social\nmedia platform.",
            "* Those ones you\ncan actually view.",
            "* I've put them up\nfor sale here.\nBe sure to buy them!",
          ],
        },
        {
          label: "About your education",
          pages: [
            "* Currently, I'm in my\nthird-year studying Computer\nScience at the American\nUniversity of Phnom Penh,\nor AUPP as its called.",
            "* Within AUPP, I am\nalso a participant of\na program called the\nJapanese IT Pathway Program.",
            "* Where I'm being trained\nto be an elite IT\nprofessional, set to work\nin Japan!",
            "* Aside from that, I've\nalso been studying Japanese\nfor about four years.",
            "* My years of efforts\nhave thus far earned\nme N2 of the JLPT!",
            "* I am able to\ncommunicate in Japanese in\na business setting.",
            "* Want to start\ntalking business?",
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
