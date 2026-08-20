"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useCopy } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Years() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { milestones, timeline, ui } = useCopy();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section className="relative px-6 py-20 sm:py-28">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-20">
        <p className="mb-4 text-[0.6rem] uppercase tracking-[0.36em] text-gold-400/75 sm:text-[0.68rem]">
          {timeline.kicker}
        </p>
        <h2 className="text-balance font-display text-3xl leading-tight font-light text-cream sm:text-5xl">
          {timeline.headingLead}
          <br className="hidden sm:block" />
          {ui.wordJoin}
          <span className="text-shimmer">{timeline.headingAccent}</span>
        </h2>
      </Reveal>

      <div ref={ref} className="relative mx-auto max-w-3xl">
        {/* the line that draws itself as you scroll */}
        <div
          aria-hidden
          className="absolute left-[13px] top-2 bottom-2 w-px bg-white/8 sm:left-1/2 sm:-translate-x-1/2"
        />
        <motion.div
          aria-hidden
          className="absolute left-[13px] top-2 bottom-2 w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
          style={{
            scaleY: reduced ? 1 : scaleY,
            background:
              "linear-gradient(180deg,#e8c07d,#ef7fa2 50%,#c23a67 100%)",
            boxShadow: "0 0 14px rgba(232,192,125,0.5)",
          }}
        />

        <div className="flex flex-col gap-14 sm:gap-20">
          {milestones.map((y, i) => {
            const right = i % 2 === 1;
            return (
              <div
                key={y.when}
                className={`relative pl-12 sm:flex sm:w-full sm:pl-0 ${
                  right ? "sm:justify-end" : "sm:justify-start"
                }`}
              >
                {/* node */}
                <Reveal
                  direction="none"
                  amount={0.6}
                  blur={false}
                  className="absolute left-0 top-1.5 sm:left-1/2 sm:-translate-x-1/2"
                >
                  <span className="relative flex h-[27px] w-[27px] items-center justify-center">
                    <span
                      className="animate-breathe absolute inset-0 rounded-full blur-md"
                      style={{ background: "rgba(239,127,162,0.7)" }}
                    />
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-rose-500 ring-4 ring-wine-900" />
                  </span>
                </Reveal>

                <Reveal
                  direction={right ? "left" : "right"}
                  amount={0.35}
                  className={`sm:w-[46%] ${right ? "sm:pl-4" : "sm:pr-4 sm:text-right"}`}
                >
                  <article className="rounded-2xl border border-white/8 bg-white/[0.035] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/35 hover:bg-white/[0.06] sm:p-7">
                    <p className="mb-2 text-[0.58rem] uppercase tracking-[0.34em] text-gold-400/80">
                      {y.when}
                    </p>
                    <h3 className="font-display text-2xl font-light text-cream sm:text-3xl">
                      {y.title}
                    </h3>
                    <p className="mt-3 text-[0.97rem] leading-[1.8] text-blush-200/72">
                      {y.text}
                    </p>
                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
