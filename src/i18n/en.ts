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

    items: {
      soldOut: "(SOLD OUT)",
      empty: "Thou hast bought\nnaught yet, worm.",
      openPrompt: "Openeth it,\nworm?",
    },

    loading: {
      enter: "Enter",
    },

    talk: {
      more: "More...",
      back: "Back",
      newHint: "new topic",
      topics: [
        {
          label: "Tell me about yourself",
          pages: [
            "* My name is Heng Phearith.\nI'm a third-year Computer\nScience student studying\nat AUPP.",
            "* I also study Japanese with the plan of working in Japan soon.",
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
            "* Right now, I'm aiming\nto work in Japan as\na Full-Stack Web Developer\nafter graduating from University.",
            "* It is currently the\nmost natural next step\nfor me.",
            "* If we're talking about\nthe far future though,\nI'm thinking that it would\nbe great if I could\nconnect my field of IT\nto education.",
            "* Here in Cambodia,\neducation is one of\nthe biggest challenges.",
            "* There are countless of\nchildren out there who\nare just not getting the\neducation that they deserve.",
            "* I want to do\nsomething about it.",
            "* Perhaps through the\nexperience and skills I'll\nbe obtaining while working\nin Japan, I might have\na chance to make a\nreal difference.",
            "* I'm willing to plunge\nhead-first into it when\nthe opportunity arises.",
          ],
        },
        {
          label: "About this portfolio",
          pages: [
            "* Oh, you're curious\nabout this place?",
            "* This portfolio is\nmodeled after a shop\nfrom DELTARUNE, one of\nmy favorite games.",
            "* I figured a portfolio\nshould *show* what I can\nbuild, not just list it.",
            "* Under the hood, it's\nbuilt with React and\nTypeScript, plus i18next\nfor the Japanese you can\nswitch to up there.",
            "* The fonts, sprites and\nsounds are Toby Fox's\nwork. Full credit to him.",
            "* The dialogue system\ntyping this out, though?\nBuilt it myself.\nIt fought back.",
            "* Kinda proud of\nthis one, honestly.",
            "* Take your time\nlooking around.",
          ],
        },
        {
          label: "More about yourself",
          pages: [
            "* Huh? You want to\nknow *more* about me?",
            "* I'm flattered.\nLet's see...",
            "* Between university,\nthe internship, and\nJapanese study, my\ndays are pretty packed.",
            "* But seeing a project\ncome together at the end\nmakes it all worth it.",
            "* Even this shop was\none of those projects\nonce. Now it's talking\nto you.",
            "* If you've read this\nfar, we're practically\nfriends already.",
            "* So, friend...\ncare to browse my\nwares one more time?",
          ],
        },
      ],
    },

    projects: {
      resume: {
        name: "Résumé",
        blurb: "The full scroll of\nmy deeds and skills.",
        buyLine: "* A fine choice, worm! Thou hast TASTE.",
      },
      "social-media-app": {
        name: "Social Media App",
        blurb: "A tiny realme where\nworms mingle and post.",
        buyLine: "* A bold pick, worm! Go forth and mingle.",
      },
      "quiz-game": {
        name: "Quiz Game",
        blurb: "Trivia to test\nthy wit, worm.",
        buyLine: "* Test thy wits, worm!",
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
