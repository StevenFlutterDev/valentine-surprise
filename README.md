# For Angel 💗

A Valentine's website for **Angel Tan Lee Ying** — a thank-you for fifteen
years together, for her strength, her hard work, and everything she quietly
carried along the way.

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4, animated with
[Motion](https://motion.dev).

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

To build for production:

```bash
npm run build
npm start
```

---

## Changing the words

**Everything Angel reads lives in one file: [`src/lib/content.ts`](src/lib/content.ts).**

Open it, edit the text, save — the site updates instantly. You never need to
touch a component to reword the letter, rename a section, or adjust the stats.

| What you want to change | Where |
| --- | --- |
| Her name, the opening line, the button label | `her` |
| The big hero title and subtitle | `hero` |
| The counting numbers (dated ones update themselves) | `stats` |
| The three main message sections | `sections` |
| The milestone timeline cards | `milestones` + `timeline` |
| The love letter inside the envelope | `letter` |
| The closing message | `finale` |

---

## Adding your own music

Drop an MP3 at:

```
public/music/song.mp3
```

The floating music button will pick it up automatically and loop it softly.

If there's no file there, the site falls back to a gentle music-box melody
generated live in the browser (see `src/lib/music.ts`), so the button always
does something lovely.

Music starts when she taps **"Open my heart"** — browsers only allow audio
after a real tap, so this is by design.

---

## What happens on the page

1. **The opening** — a gold heart draws itself, then her full name rises in
   letter by letter with a travelling shimmer. She taps "Open my heart" to
   enter (which also starts the music).
2. **Hero** — her name in full, with drifting rose petals, hearts and gold
   sparks on a canvas behind it, plus a parallax scroll.
3. **Counters** — years together, days married, two little girls — the dated
   ones compute from the real dates, so they're always current.
4. **Three message sections** — scroll-revealed, alternating left and right.
5. **The timeline** — 24 Dec 2010, 4 Nov 2021, 30 May 2022, 29 Jul 2025 —
   with a gold-to-rose line that draws itself as she scrolls.
6. **The envelope** — tap it and a handwritten letter unfolds, line by line.
7. **The finale** — 54 little hearts fly in from all directions and assemble
   into one big heart with her name in the middle.

Throughout: tapping anywhere pops a burst of hearts, and on desktop a soft
heart trail follows the cursor.

---

## Notes

- Fully responsive; designed mobile-first (tested at 360px and up).
- Fonts (Cormorant Garamond, Inter, Great Vibes) are **self-hosted** in
  `src/fonts`, so there's no Google Fonts request and it builds offline.
- Respects `prefers-reduced-motion` — animations shorten or stop entirely for
  visitors who've asked their device for less motion.
- The canvas animation pauses when the tab is hidden, to save battery.
