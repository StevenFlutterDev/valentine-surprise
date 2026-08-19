"use client";

import { sections } from "@/lib/content";
import Reveal from "./Reveal";

export default function Sections() {
  return (
    <div className="relative">
      {sections.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className="relative px-6 py-20 sm:py-28"
          >
            {/* faint numeral watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[10rem] leading-none text-white/[0.025] select-none sm:text-[18rem]"
            >
              {i + 1}
            </span>

            <div
              className={`relative mx-auto flex max-w-3xl flex-col ${
                flip ? "sm:items-end sm:text-right" : "sm:items-start"
              }`}
            >
              <Reveal direction={flip ? "left" : "right"} amount={0.3}>
                <p className="mb-4 text-[0.6rem] uppercase tracking-[0.36em] text-gold-400/75 sm:text-[0.68rem]">
                  {s.kicker}
                </p>
              </Reveal>

              <Reveal delay={0.08} direction="up" amount={0.3}>
                <h2 className="max-w-2xl text-balance font-display text-3xl leading-tight font-light text-cream sm:text-5xl">
                  {s.heading}
                </h2>
              </Reveal>

              <Reveal delay={0.16} direction="up" amount={0.2}>
                <div
                  className={`mt-6 flex max-w-xl flex-col gap-5 ${
                    flip ? "sm:ml-auto" : ""
                  }`}
                >
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="text-[1.02rem] leading-[1.85] text-blush-200/75 sm:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.28} direction="none" amount={0.2}>
                <div
                  className={`hairline mt-10 h-px w-40 sm:w-56 ${
                    flip ? "sm:ml-auto" : ""
                  }`}
                />
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}
