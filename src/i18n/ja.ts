/**
 * Japanese strings. Dialogue uses the full-width asterisk ＊ (U+FF0A) —
 * the mark Deltarune's official JP localization uses — instead of "* ".
 * Rouxls' fake-archaic English maps to pompous archaic Japanese
 * (〜なり／〜でござる).
 *
 * Line breaks: only strings rendered with white-space: pre-line (greeting,
 * blurbs, confirm prompt) use \n. Dialogue text is NOT pre-line — \n would
 * collapse to a visible space between CJK glyphs — so those are continuous
 * strings and the browser wraps them (CJK breaks anywhere).
 */
export const ja = {
  translation: {
    greeting:
      "＊よう、ミミズよ。\nわがみごとなるショッペへ\nようこそなり。\n何がのぞみだ？",

    commands: {
      buy: "かう",
      talk: "はなす",
      exit: "でる",
    },

    confirm: {
      prompt: "{{price}}$で\n買うでござるか？",
      yes: "はい",
      no: "いいえ",
    },

    info: {
      exitTitle: "でる",
      exitBlurb: "このリストから\n去るのだ、ミミズよ。",
    },

    footer: {
      space: "スペース: 12",
    },

    closed: {
      line: "おぬしはわが店を去ったのだ。",
      reopen: "再入店いたせ",
    },

    loading: {
      enter: "はいる",
    },

    talk: {
      topics: [
        {
          label: "あなたについて",
          text: "＊われはルールス・カード、パズル公爵なり。おぬしのごときミミズのために、この店をいとなんでおるのだ。",
        },
        {
          label: "経験について",
          text: "＊スペードの王のために、数々のパズルを作りしなり。解けるミミズはおらぬ——われ以外はな。",
        },
        {
          label: "学歴について",
          text: "＊パズルの技はカーデ学院にて学びしなり。最優等の成績で卒業したのでござるよ。",
        },
        {
          label: "野望について",
          text: "＊われはいずれ、国いちばんのパズル名人となるなり。さすればミミズどもも、われを敬うはずだ！",
        },
      ],
    },

    projects: {
      "rouxls-roux": {
        name: "ルールスルー",
        blurb: "やくたたずの\nがらくたなり。\n何もせぬ。買え。",
        buyLine: "＊よい選択だ、ミミズよ！おぬし、センスがあるな。",
      },
      "brave-ax": {
        name: "ゆうしゃのオノ",
        blurb: "こうげき +10。\n出荷する者のために\n鍛えられし一品。",
        buyLine: "＊バグに振り下ろすがよい、下等なミミズよ！",
      },
      "dainty-scarf": {
        name: "おじょうマフラー",
        blurb: "ぼうぎょ +6。\n最高におしゃれ。\nとても暖かし。",
        buyLine: "＊おぬしに似合うぞ……かろうじてな。",
      },
      "amber-card": {
        name: "コハクのカード",
        blurb: "なぞめいたカード。\n持ち主に連絡\nできるなり。",
        buyLine: "＊これでわれに連絡するがよい、ミミズよ。せぬでもよいがな。",
      },
    },

    aria: {
      shopItems: "商品リスト",
      talkTopics: "会話の話題",
      shopActions: "ショップ操作",
      shopkeeper: "店主",
      mute: "ミュート",
      unmute: "ミュート解除",
      switchLang: "英語に切り替え",
      portfolio: "ポートフォリオ作品",
    },

    seo: {
      title: "Hearith — 開発者ポートフォリオ",
      tagline:
        "デルタルーン風のポートフォリオショップ。各商品が実際のプロジェクトにつながっています。",
    },
  },
};
