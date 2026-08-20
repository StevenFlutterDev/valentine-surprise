/**
 * ─────────────────────────────────────────────────────────────
 *  All the words live here — English and 中文 side by side.
 *
 *  Edit anything below and the whole site updates. Both languages
 *  have exactly the same shape, so whatever you add to one, add
 *  to the other.
 * ─────────────────────────────────────────────────────────────
 */

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

/** Which language Angel sees when she first opens the site. */
export const DEFAULT_LOCALE: Locale = "en";

/**
 * A counter.
 * Give it either a fixed `value`, or a `since` date and a `unit` —
 * dated ones work themselves out, so the numbers are never stale.
 */
export type Stat = {
  label: string;
  value?: number;
  since?: string; // YYYY-MM-DD
  unit?: "years" | "days";
};

export type Copy = {
  /** Shown in the browser tab. */
  documentTitle: string;
  her: {
    fullName: string;
    firstName: string;
    introEyebrow: string;
    introSubtitle: string;
    enterLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    scrollCue: string;
  };
  stats: Stat[];
  sections: { id: string; kicker: string; heading: string; body: string[] }[];
  timeline: { kicker: string; headingLead: string; headingAccent: string };
  milestones: { when: string; title: string; text: string }[];
  letter: {
    kicker: string;
    headingLead: string;
    headingAccent: string;
    hint: string;
    salutation: string;
    lines: string[];
    signOff: string;
    signature: string;
    close: string;
  };
  finale: {
    small: string;
    big: string;
    sub: string;
    footer: string;
    tapHint: string;
  };
  ui: {
    /**
     * What to put between a heading's two halves. A space in English,
     * nothing in Chinese — Han text doesn't take Latin word-spaces.
     */
    wordJoin: string;
    /** Label on the language button — the language it switches TO. */
    switchLabel: string;
    switchAria: string;
    musicPlay: string;
    musicPause: string;
    openLetter: string;
  };
};

/* ══════════════════════════════════════════════════════════════
   ENGLISH
   ══════════════════════════════════════════════════════════════ */

const en: Copy = {
  documentTitle: "For Angel 💗 Happy Valentine's Day",

  her: {
    fullName: "Angel Tan Lee Ying",
    firstName: "Angel",
    introEyebrow: "For my wife,",
    introSubtitle: "fifteen years, and I would choose you again tomorrow.",
    enterLabel: "Open my heart",
  },

  hero: {
    eyebrow: "Happy Valentine's Day",
    title: "Angel Tan Lee Ying",
    subtitle:
      "I was fourteen. You were thirteen. Fifteen years, two little girls, and one quiet, stubborn, extraordinary woman later — I'm still that boy counting days to the weekend.",
    scrollCue: "scroll, my love",
  },

  stats: [
    { since: "2010-12-24", unit: "years", label: "years by your side" },
    { since: "2021-11-04", unit: "days", label: "days as my wife" },
    { value: 2, label: "little girls with your eyes" },
  ],

  sections: [
    {
      id: "not-that-wife",
      kicker: "01 — Who you are",
      heading: "You were never the wife in the picture book.",
      body: [
        "You don't get up at six to cook breakfast. You don't fold the laundry into neat little squares. There is a version of a wife the world likes to draw, and you were never her — and thank goodness for that.",
        "Because what you actually give this family has never fitted on anybody's checklist. It never did. It never will.",
      ],
    },
    {
      id: "what-you-carry",
      kicker: "02 — What you carry",
      heading: "You work two jobs so that we never go without.",
      body: [
        "Days spent teaching other people's children — patient with them hour after hour, long after your own energy has run out. Then the insurance work on top of that, because the numbers had to add up and you refused to let them not add up.",
        "Nobody asked you to carry that much. You simply picked it up and started walking, and you have not put it down since.",
      ],
    },
    {
      id: "what-you-fought",
      kicker: "03 — What you fought",
      heading: "And you did it while fighting something nobody could see.",
      body: [
        "There were years when the light went out of you. You carried something heavy — something you could not put down and could not explain, something that made ordinary days cost you far more than anyone around you understood.",
        "You kept going anyway. Not perfectly, not easily, but you kept going. And when our first girl came, I watched some of that weight lift, and I watched you fight for every inch of ground you took back.",
        "It still comes and goes. I know it does. And every single time it comes, you stand up and face it again. That is the bravest thing I have ever watched anyone do.",
      ],
    },
  ],

  timeline: {
    kicker: "04 — Us, so far",
    headingLead: "Every date that",
    headingAccent: "changed my life",
  },

  milestones: [
    {
      when: "24 December 2010",
      title: "Where it started",
      text: "A Christmas Eve. I was fourteen, you were thirteen — two kids who had no idea they had just met the rest of their lives. Fifteen years later, you still haven't run.",
    },
    {
      when: "The years between",
      title: "Loving you from far away",
      text: "Our houses were far apart, so we only had the weekends. I counted the days to every meeting, and every goodbye left a hole that lasted until the next one. I learned to miss you before I ever learned to live with you.",
    },
    {
      when: "4 November 2021",
      title: "You said yes",
      text: "Eleven years of us, and then a promise made out loud in front of everyone. The easiest yes I have ever given, and the luckiest one I will ever receive.",
    },
    {
      when: "30 May 2022",
      title: "Our first girl",
      text: "I watched you become a mother in the space of a single afternoon — and I watched something inside you come back to life at exactly the same time.",
    },
    {
      when: "29 July 2025",
      title: "And then there were two",
      text: "A second little girl, a second heart to carry. Twice the work, twice the worry, and somehow twice the love — all from the same tired, extraordinary woman.",
    },
  ],

  letter: {
    kicker: "05 — A letter",
    headingLead: "I wrote this down,",
    headingAccent: "so you can keep it",
    hint: "tap the envelope",
    salutation: "My dearest Angel,",
    lines: [
      "Fifteen years ago, on a Christmas Eve, you let me into your life. We were only children — I was fourteen, you were thirteen — and I don't think either of us had the faintest idea what we were signing up for.",
      "Do you remember the weekend years? Our houses so far apart that all we had was Saturdays — and I lived the whole week just to get to one. Every hello felt like a festival. Every goodbye followed me home. Loving you has felt like that ever since: always worth the wait, always too short.",
      "You are not the wife anyone would draw in a storybook — and I have never once wanted that wife. I wanted the one who teaches all day and then works again at night so that our girls never go without. The one who has fought a war inside her own head for years, and still gets up the next morning and goes.",
      "I have seen you on the days when it was heavy. I have seen you keep going. There is nothing in this world braver than that, and most people will never even know you did it.",
      "I know we are not rich. I know there are months when the money is short and I wish I could put more than this in your hands. But everything I have is yours, and everything I am able to give you, I will — for as long as I am here.",
      "Thank you for the two little girls asleep down the hall. Thank you for staying, on the days when it would have been so much easier not to.",
      "I love you. Not for the things you do for us. For who you are.",
    ],
    signOff: "Always yours,",
    signature: "Your husband",
    close: "fold it back up",
  },

  finale: {
    small: "and so —",
    big: "Thank you, Angel.",
    sub: "For every long day, every second shift, and every quiet battle you won without telling a soul.",
    footer: "Not rich. But yours, always. 💗",
    tapHint: "tap anywhere — the hearts are for you",
  },

  ui: {
    wordJoin: " ",
    switchLabel: "中文",
    switchAria: "切换到中文 — switch to Chinese",
    musicPlay: "Play some music",
    musicPause: "Pause the music",
    openLetter: "Open the love letter",
  },
};

/* ══════════════════════════════════════════════════════════════
   中文（简体）
   ══════════════════════════════════════════════════════════════ */

const zh: Copy = {
  documentTitle: "给莉莹 💗 情人节快乐",

  her: {
    fullName: "陈莉莹",
    firstName: "莉莹",
    introEyebrow: "致我的太太，",
    introSubtitle: "十五年了，如果能重来一次，我还是会选你。",
    enterLabel: "打开我的心",
  },

  hero: {
    eyebrow: "情人节快乐",
    title: "陈莉莹",
    subtitle:
      "那年我十四，你十三。十五年、两个女儿、一个安静又倔强的了不起的女人之后——我还是那个数着日子等周末的男孩。",
    scrollCue: "往下滑，我的爱",
  },

  stats: [
    { since: "2010-12-24", unit: "years", label: "年，你一直在我身边" },
    { since: "2021-11-04", unit: "days", label: "天，你是我的太太" },
    { value: 2, label: "个女儿，眼睛都像你" },
  ],

  sections: [
    {
      id: "not-that-wife",
      kicker: "01 — 你是谁",
      heading: "你从来就不是童话书里的那种太太。",
      body: [
        "你不会六点起床做早餐，也不会把衣服叠成整整齐齐的方块。这个世界喜欢画一种太太的样子，而你从来都不是她——幸好你不是。",
        "因为你真正给这个家的东西，从来就不在任何人的清单上。以前不在，以后也不会在。",
      ],
    },
    {
      id: "what-you-carry",
      kicker: "02 — 你扛起的",
      heading: "你打两份工，只为了让我们什么都不缺。",
      body: [
        "白天教别人的孩子，一个小时又一个小时地耐心，在自己的力气早就用完之后还在继续。晚上再接保险的工作，因为帐要算得过来，而你不肯让它算不过来。",
        "没有人要求你扛这么多。你只是自己把它扛了起来，然后一路走到今天，从来没有放下过。",
      ],
    },
    {
      id: "what-you-fought",
      kicker: "03 — 你对抗的",
      heading: "而这一切，你都是带着没人看得见的伤在做的。",
      body: [
        "有那么几年，你身上的光是灭掉的。你扛着一个放不下、也说不清楚的东西，它让最平常的一天，对你来说都比谁都要费力。",
        "你还是撑下来了。不完美，也不轻松，但你撑下来了。第一个女儿来的时候，我看见那份重量轻了一些，也看见你一寸一寸地把自己抢了回来。",
        "它到现在还是会来来去去。我知道。而它每一次来，你都站起来再面对一次。那是我这辈子见过最勇敢的事。",
      ],
    },
  ],

  timeline: {
    kicker: "04 — 我们，到目前为止",
    headingLead: "每一个",
    headingAccent: "改变我一生的日子",
  },

  milestones: [
    {
      when: "2010年12月24日",
      title: "一切开始的地方",
      text: "一个平安夜。我十四岁，你十三岁——两个小孩，完全不知道自己刚刚遇见了往后的一生。十五年过去了，你还没有跑掉。",
    },
    {
      when: "中间那些年",
      title: "隔着距离爱你",
      text: "我们两家住得很远，一个星期只换得到一个周末。我数着日子等每一次见面，而每一次道别都留下一个洞，一直到下次见面才补得回来。我是先学会想你，才学会跟你一起生活的。",
    },
    {
      when: "2021年11月4日",
      title: "你说了我愿意",
      text: "在一起十一年之后，我们终于把那句承诺当着所有人的面说出口。那是我说过最容易的一句「我愿意」，也是我这辈子最幸运的一次被答应。",
    },
    {
      when: "2022年5月30日",
      title: "我们的第一个女儿",
      text: "一个下午的时间，我看着你变成了母亲——同时也看着你身体里有什么东西，重新活了过来。",
    },
    {
      when: "2025年7月29日",
      title: "然后我们有了两个",
      text: "第二个小女孩，第二颗要照顾的心。加倍的辛苦，加倍的担心，然后不知道怎么的，从同一个疲惫又了不起的女人身上，长出了加倍的爱。",
    },
  ],

  letter: {
    kicker: "05 — 一封信",
    headingLead: "我把它写下来了，",
    headingAccent: "这样你可以一直留着",
    hint: "点一下这个信封",
    salutation: "我最亲爱的莉莹：",
    lines: [
      "十五年前的一个平安夜，你让我走进了你的生活。那时候我们都还是小孩——我十四，你十三——我想我们两个都完全不知道自己答应了什么。",
      "你还记得那些只有周末的年头吗？我们家隔得那么远，一整个星期只换得到一个星期六，而我整个礼拜就是为了那一天在过。每一次见面都像过节，每一次道别都跟着我回家。这些年爱你一直都是这种感觉：永远值得等，也永远觉得不够。",
      "你不是任何故事书里会画出来的那种太太——而我从来没有想要那种太太。我要的是那个教了一整天书、晚上还要再工作，只为了让女儿什么都不缺的人。是那个在自己脑袋里打了好多年仗，隔天早上还是照样爬起来出门的人。",
      "我见过你撑得很辛苦的那些日子。我也见过你还是走了下去。这个世界上没有比这更勇敢的事了，而大部分人一辈子都不会知道你做过。",
      "我知道我们不富有。我知道有些月份钱是紧的，我也希望我能放进你手里的能比现在多。但我有的全部都是你的，我给得起的全部，我都会给你——只要我还在。",
      "谢谢你给了我走廊那头睡着的那两个小女孩。谢谢你留下来，在那些其实走开会轻松很多的日子里。",
      "我爱你。不是因为你为我们做了什么。是因为你就是你。",
    ],
    signOff: "永远是你的，",
    signature: "你的先生",
    close: "把信折回去",
  },

  finale: {
    small: "所以——",
    big: "谢谢你，莉莹。",
    sub: "谢谢每一个很长的白天、每一个第二份工的夜晚，还有每一场你一个人打赢、却从来没告诉过任何人的仗。",
    footer: "我们不富有。但我永远是你的。💗",
    tapHint: "点哪里都可以——那些爱心是给你的",
  },

  ui: {
    wordJoin: "",
    switchLabel: "EN",
    switchAria: "切换到英文 — switch to English",
    musicPlay: "播放音乐",
    musicPause: "暂停音乐",
    openLetter: "打开这封信",
  },
};

export const content: Record<Locale, Copy> = { en, zh };
