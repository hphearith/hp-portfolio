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
      items: "どうぐ",
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

    items: {
      soldOut: "（うりきれ）",
      empty: "まだ何も\n買っておらぬな、ミミズよ。",
      openPrompt: "あけるでござるか、\nミミズよ？",
    },

    loading: {
      enter: "はいる",
    },

    talk: {
      topics: [
        {
          label: "あなたについて",
          pages: [
            "＊私の名前はヘン・ピアリット。AUPPでコンピュータサイエンスを学ぶ3年生です。",
            "＊AUPPの日本ITパスウェイプログラムの学生でもあり、将来日本で働くエリートITエンジニアを目指して育成を受けています。",
            "＊趣味は漫画を読んだりYouTubeを見たりすることです。",
            "＊まあ……時間があればの話ですが。",
            "＊最近は、プロジェクトを作ることと日本語の勉強がほぼ趣味になっています。",
            "＊考えてみると、なかなか厳しい話です……",
            "＊でも、楽しんでやっているので大丈夫です。",
            "＊はじめまして。",
          ],
        },
        {
          label: "経験について",
          pages: [
            "＊今まで手がけたプロジェクトの多くはWeb開発関連のものです。",
            "＊今あなたが見ているこのカッコいいポートフォリオも、その一つです。",
            "＊仕事としては、現在NextMakeという日本のITソリューション企業でインターンをしており、主にCRUD管理システムを担当しています。",
            "＊ただ、その詳細についてはお話しできません。すみません。",
            "＊個人的には、チームでクイズゲームやミニSNSも制作しました。",
            "＊そちらは実際に見ることができますよ。",
            "＊ここで販売しているので、ぜひ買ってくださいね！",
          ],
        },
        {
          label: "学歴について",
          pages: [
            "＊現在、アメリカン大学プノンペン、通称AUPPにて、コンピュータサイエンスを学ぶ3年生です。",
            "＊AUPPでは、日本ITパスウェイプログラムにも参加しています。",
            "＊このプログラムでは、将来日本で働くエリートITエンジニアを目指して育成を受けています！",
            "＊それとは別に、日本語も4年ほど勉強しています。",
            "＊これまでの努力の甲斐あって、JLPT N2を取得しました！",
            "＊ビジネスの場でも日本語でコミュニケーションが取れます。",
            "＊さあ、ビジネスの話を始めましょうか？",
          ],
        },
        {
          label: "野望について",
          pages: [
            "＊今は、大学卒業後に日本でフルスタックWeb開発者として働くことを目指しています。",
            "＊今の私にとって、それが一番自然な次のステップです。",
            "＊ただ、もっと先の将来を考えると、自分のITの分野を教育とつなげられたら素敵だなと思っています。",
            "＊ここカンボジアでは、教育は最大の課題の一つです。",
            "＊本来受けられるはずの教育を受けられていない子どもたちが数え切れないほどいます。",
            "＊私はそれに対して何かしたいと思っています。",
            "＊日本で働きながら得る経験やスキルを通して、本当の意味で力になれる機会があるかもしれません。",
            "＊その機会が訪れたときには、迷わず飛び込むつもりです。",
          ],
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
      itemsList: "購入したどうぐ",
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
