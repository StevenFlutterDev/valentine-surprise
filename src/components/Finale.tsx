"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { finale, her } from "@/lib/content";
import { makeRandom } from "@/lib/rand";
import Reveal from "./Reveal";

const COUNT = 54;

/** Parametric heart curve, scaled into a ~260px box. */
function heartPoints(count: number, scale: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = (i / count) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3;
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    return { x: x * scale, y: -y * scale };
  });
}

export default function Finale() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  const points = useMemo(() => heartPoints(COUNT, 7.6), []);
  const starts = useMemo(() => {
    const rnd = makeRandom(20260214);
    return Array.from({ length: COUNT }, () => ({
      x: (rnd() - 0.5) * 620,
      y: (rnd() - 0.5) * 520,
      r: rnd() * 360 - 180,
    }));
  }, []);

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* ── hearts assembling into a heart ───────────────────── */}
      <div
        ref={ref}
        className="relative mx-auto mb-12 flex h-[260px] w-full max-w-md items-center justify-center sm:mb-16 sm:h-[320px]"
      >
        <div
          aria-hidden
          className="animate-breathe absolute h-52 w-52 rounded-full blur-3xl sm:h-64 sm:w-64"
          style={{ background: "radial-gradient(circle,#c23a6755,transparent 70%)" }}
        />

        {points.map((p, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute text-base sm:text-xl"
            style={{ filter: "drop-shadow(0 0 6px rgba(239,127,162,0.6))" }}
            initial={{
              opacity: 0,
              x: reduced ? p.x : starts[i].x,
              y: reduced ? p.y : starts[i].y,
              rotate: reduced ? 0 : starts[i].r,
              scale: 0.3,
            }}
            animate={
              inView
                ? { opacity: 1, x: p.x, y: p.y, rotate: 0, scale: 1 }
                : undefined
            }
            transition={{
              duration: reduced ? 0.3 : 1.5,
              delay: reduced ? 0 : i * 0.022,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {i % 4 === 0 ? "💗" : i % 4 === 2 ? "❤️" : "💕"}
          </motion.span>
        ))}

        <motion.span
          className="font-script relative z-10 text-5xl text-gold-300 sm:text-6xl"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{
            duration: reduced ? 0.3 : 1.1,
            delay: reduced ? 0 : 1.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {her.firstName}
        </motion.span>
      </div>

      {/* ── closing words ───────────────────────────────────── */}
      <div className="relative mx-auto max-w-2xl text-center">
        <Reveal amount={0.4}>
          <p className="mb-4 text-[0.6rem] uppercase tracking-[0.4em] text-gold-400/70">
            {finale.small}
          </p>
        </Reveal>

        <Reveal delay={0.1} amount={0.4}>
          <h2 className="text-shimmer font-display text-4xl leading-tight font-light sm:text-6xl">
            {finale.big}
          </h2>
        </Reveal>

        <Reveal delay={0.2} amount={0.4}>
          <p className="mx-auto mt-6 max-w-md text-balance font-display text-lg text-blush-200/80 italic sm:text-2xl">
            {finale.sub}
          </p>
        </Reveal>

        <Reveal delay={0.3} amount={0.4}>
          <div className="hairline mx-auto mt-12 h-px w-40 sm:w-64" />
        </Reveal>

        <Reveal delay={0.4} amount={0.4}>
          <p className="mt-10 font-display text-xl text-cream/85 sm:text-2xl">
            {finale.footer}
          </p>
          <p className="mt-4 text-[0.6rem] uppercase tracking-[0.3em] text-blush-300/45">
            {finale.tapHint}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
