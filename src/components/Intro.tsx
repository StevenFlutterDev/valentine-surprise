"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { her } from "@/lib/content";
import { makeRandom } from "@/lib/rand";
import PetalField from "./PetalField";

const HEART_PATH =
  "M50 88C22 68 6 51 6 32.5 6 18.5 17 8 30 8c8 0 15 4 20 11 5-7 12-11 20-11 13 0 24 10.5 24 24.5C94 51 78 68 50 88Z";

export default function Intro({ onEnter }: { onEnter: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  // Speed the whole sequence up dramatically for reduced-motion visitors.
  const t = reduced ? 0.15 : 1;

  /** The name split into words (so it wraps) and letters (so it animates). */
  const words = useMemo(() => {
    const parts = her.fullName.split(" ");
    return parts.map((text, i) => ({
      text,
      chars: text.split(""),
      start: parts.slice(0, i).reduce((n, w) => n + w.length, 0),
    }));
  }, []);

  // Deterministic scatter for the farewell burst (keeps render pure).
  const burst = useMemo(() => {
    const rnd = makeRandom(1402);
    return Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const dist = 180 + rnd() * 220;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        rotate: rnd() * 240 - 120,
        glyph: i % 3 === 0 ? "🌸" : i % 3 === 1 ? "💗" : "✨",
      };
    });
  }, []);

  // Lock page scrolling while the intro curtain is up, and release it the
  // moment the visitor enters. (Keyed on `leaving`, not unmount — the intro
  // component stays mounted after it fades, so an unmount cleanup alone
  // would leave the page unscrollable.)
  useEffect(() => {
    if (leaving) return;
    document.body.classList.add("intro-locked");
    return () => document.body.classList.remove("intro-locked");
  }, [leaving]);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
    onEnter();
    window.setTimeout(() => setVisible(false), reduced ? 120 : 1200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="page-glow fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
          initial={{ opacity: 1 }}
          animate={
            leaving
              ? { opacity: 0, scale: reduced ? 1 : 1.14, filter: "blur(6px)" }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: reduced ? 0.12 : 1.1, ease: [0.7, 0, 0.3, 1] }}
        >
          <PetalField density={0.8} />

          {/* soft vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 45%, transparent 0%, rgba(9,2,6,0.72) 100%)",
            }}
          />

          <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
            {/* ── the heart draws itself ───────────────────────── */}
            <motion.div
              className="relative mb-8 sm:mb-10"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1 * t, ease: "easeOut" }}
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{ background: "rgba(217,79,122,0.55)" }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0, 0.9, 0.55], scale: [0.6, 1.5, 1.2] }}
                transition={{ duration: 2.4 * t, delay: 0.6 * t }}
              />
              <svg
                viewBox="0 0 100 96"
                className="h-20 w-20 sm:h-24 sm:w-24"
                aria-hidden
              >
                <defs>
                  <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f3d9a4" />
                    <stop offset="50%" stopColor="#e8c07d" />
                    <stop offset="100%" stopColor="#ef7fa2" />
                  </linearGradient>
                  <linearGradient id="roseFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef7fa2" />
                    <stop offset="100%" stopColor="#c23a67" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={HEART_PATH}
                  fill="url(#roseFill)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2 * t, delay: 1.35 * t }}
                />
                <motion.path
                  d={HEART_PATH}
                  fill="none"
                  stroke="url(#goldStroke)"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.7 * t,
                    delay: 0.25 * t,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>

            {/* ── eyebrow ──────────────────────────────────────── */}
            <motion.p
              className="mb-3 text-[0.68rem] uppercase tracking-[0.42em] text-blush-300/80 sm:text-xs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 * t, delay: 1.7 * t }}
            >
              {her.introEyebrow}
            </motion.p>

            {/* ── the name, letter by letter ───────────────────── */}
            <h1 className="font-display text-[clamp(1.75rem,8.2vw,2.6rem)] leading-[1.12] font-light sm:text-6xl md:text-7xl">
              <span className="sr-only">{her.fullName}</span>
              {/* Words stay whole so the name wraps sensibly on small
                  screens; each letter animates and shimmers on its own. */}
              <span aria-hidden>
                {words.map((word, w) => (
                  <Fragment key={`${word.text}-${w}`}>
                    <span className="inline-block whitespace-nowrap">
                    {word.chars.map((ch, c) => {
                      const i = word.start + c;
                      return (
                        <motion.span
                          key={`${ch}-${c}`}
                          /* The shimmer lives on each letter — a transform on a
                             child breaks a parent's background-clip:text — and
                             the negative delay sends the sheen travelling
                             across the name instead of pulsing all at once. */
                          className="text-shimmer inline-block"
                          style={{ animationDelay: `${-i * 0.13}s` }}
                          initial={{
                            opacity: 0,
                            y: 34,
                            rotateX: -80,
                            filter: "blur(8px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.85 * t,
                            delay: (2.0 + i * 0.055) * t,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {ch}
                        </motion.span>
                      );
                    })}
                    </span>
                    {w < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            </h1>

            {/* ── hairline ─────────────────────────────────────── */}
            <motion.div
              className="hairline mt-6 h-px w-full max-w-xs"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2 * t, delay: 3.1 * t }}
            />

            {/* ── subtitle ─────────────────────────────────────── */}
            <motion.p
              className="mt-6 max-w-md text-balance font-display text-lg text-blush-200/85 italic sm:text-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 * t, delay: 3.3 * t }}
            >
              {her.introSubtitle}
            </motion.p>

            {/* ── enter button ─────────────────────────────────── */}
            <motion.button
              type="button"
              onClick={handleEnter}
              className="group relative mt-10 cursor-pointer rounded-full border border-gold-400/45 bg-white/5 px-8 py-3.5 text-sm tracking-[0.2em] uppercase text-cream backdrop-blur-sm transition-colors duration-500 hover:border-gold-300 hover:bg-rose-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:px-10 sm:text-[0.8rem]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 * t, delay: 4.2 * t }}
              whileHover={reduced ? undefined : { scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgba(217,79,122,0.5)" }}
              />
              {her.enterLabel}
              <span className="ml-2 inline-block animate-heartbeat">♥</span>
            </motion.button>
          </div>

          {/* ── farewell burst when entering ───────────────────── */}
          {leaving && !reduced && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {burst.map((b, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
                  animate={{
                    opacity: 0,
                    x: b.x,
                    y: b.y,
                    scale: 1.3,
                    rotate: b.rotate,
                  }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                >
                  {b.glyph}
                </motion.span>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
