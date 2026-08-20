"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCopy } from "@/lib/i18n";
import PetalField from "./PetalField";

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { hero } = useCopy();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const show = started ? "show" : "hidden";
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24"
    >
      <PetalField density={1} />

      {/* two slow, breathing glows */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96"
        style={{ background: "radial-gradient(circle,#c23a6740,transparent 70%)" }}
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full blur-3xl sm:h-[26rem] sm:w-[26rem]"
        style={{
          background: "radial-gradient(circle,#e8c07d33,transparent 70%)",
          animationDelay: "-5s",
        }}
      />

      <motion.div
        style={reduced ? undefined : { y, opacity, scale }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.p
          className="mb-5 text-[0.62rem] uppercase tracking-[0.45em] text-gold-400/85 sm:text-[0.7rem]"
          variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate={show}
          transition={{ duration: 1, delay: 0.35, ease }}
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          className="text-shimmer text-balance font-display text-[2.9rem] leading-[1.02] font-light sm:text-7xl md:text-[5.6rem]"
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(14px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          initial="hidden"
          animate={show}
          transition={{ duration: 1.4, delay: 0.55, ease }}
        >
          {hero.title}
        </motion.h1>

        <motion.div
          className="hairline my-8 h-px w-56 sm:w-80"
          variants={{ hidden: { scaleX: 0, opacity: 0 }, show: { scaleX: 1, opacity: 1 } }}
          initial="hidden"
          animate={show}
          transition={{ duration: 1.3, delay: 1.05, ease }}
        />

        <motion.p
          className="max-w-xl text-balance font-display text-lg leading-relaxed text-blush-200/85 sm:text-2xl"
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate={show}
          transition={{ duration: 1.2, delay: 1.2, ease }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-14 flex flex-col items-center gap-2 text-blush-300/60"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          initial="hidden"
          animate={show}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="text-[0.6rem] uppercase tracking-[0.34em]">
            {hero.scrollCue}
          </span>
          <svg
            className="animate-nudge h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden
          >
            <path d="M12 4v15m0 0-6-6m6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
