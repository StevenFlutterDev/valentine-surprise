/**
 * ─────────────────────────────────────────────────────────────
 *  All the words live here.
 *  Edit anything in this file and the whole site updates.
 * ─────────────────────────────────────────────────────────────
 */

export const her = {
  fullName: "Angel Tan Lee Ying",
  firstName: "Angel",
  /** Shown during the opening animation */
  introEyebrow: "For my wife,",
  introSubtitle: "fifteen years, and I would choose you again tomorrow.",
  enterLabel: "Open my heart",
};

export const hero = {
  eyebrow: "Happy Chinese Valentine's Day",
  datetime: "19th Aug 2026",
  title: "Angel Tan Lee Ying",
  subtitle:
    "I was fourteen. You were thirteen. Fifteen years, two little girls, and one quiet, stubborn, extraordinary woman later — I'm still that boy counting days to the weekend.",
  scrollCue: "scroll, my love",
};

/**
 * The counters.
 * Give a stat either a fixed `value`, or a `since` date and a `unit` —
 * dated ones work themselves out, so the numbers are never out of date.
 */
export type Stat = {
  label: string;
  value?: number;
  since?: string; // YYYY-MM-DD
  unit?: "years" | "days";
};

export const stats: Stat[] = [
  { since: "2010-12-24", unit: "years", label: "years by your side" },
  { since: "2021-11-04", unit: "days", label: "days as my wife" },
  { value: 2, label: "little girls with your eyes" },
];

export const sections = [
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
];

/** The milestones on the timeline. */
export const milestones = [
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
    title: "Our first girl, Moon",
    text: "I watched you become a mother in the space of a single afternoon — and I watched something inside you come back to life at exactly the same time.",
  },
  {
    when: "29 July 2025",
    title: "And then there were two, Moon & Star",
    text: "A second little girl, a second heart to carry. Twice the work, twice the worry, and somehow twice the love — all from the same tired, extraordinary woman.",
  },
];

export const timeline = {
  kicker: "04 — Us, so far",
  headingLead: "Every date that",
  headingAccent: "changed my life",
};

export const letter = {
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
  signature: "Your husband, Steven",
};

export const finale = {
  small: "and so —",
  big: "Thank you, Angel.",
  sub: "For every long day, every second shift, and every quiet battle you won without telling a soul.",
  footer: "Not rich. But yours, always. 💗",
  tapHint: "tap anywhere — the hearts are for you",
};
