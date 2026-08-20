"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCopy } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function LoveLetter() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const { letter, ui, her } = useCopy();

  return (
    <section id="letter" className="relative px-6 py-20 sm:py-28">
      <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
        <p className="mb-4 text-[0.6rem] uppercase tracking-[0.36em] text-gold-400/75 sm:text-[0.68rem]">
          {letter.kicker}
        </p>
        <h2 className="text-balance font-display text-3xl leading-tight font-light text-cream sm:text-5xl">
          {letter.headingLead}
          {ui.wordJoin}
          <span className="text-shimmer">{letter.headingAccent}</span>
        </h2>
      </Reveal>

      <div className="letter-scene mx-auto max-w-2xl">
        {/* ── the envelope ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {!open && (
            <motion.div
              key="envelope"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              exit={{ opacity: 0, y: -24, scale: 0.94 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={ui.openLetter}
                className="group relative w-full max-w-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-wine-900 rounded-lg"
                whileHover={reduced ? undefined : { y: -8, rotate: -0.6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <span
                  aria-hidden
                  className="absolute -inset-6 -z-10 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "rgba(194,58,103,0.45)" }}
                />
                <svg viewBox="0 0 400 260" className="w-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbe7ea" />
                      <stop offset="100%" stopColor="#f0c3cf" />
                    </linearGradient>
                    <linearGradient id="envFlap" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f7d3db" />
                      <stop offset="100%" stopColor="#e6a8b9" />
                    </linearGradient>
                    <linearGradient id="wax" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#e35d7f" />
                      <stop offset="100%" stopColor="#a92a4f" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="8"
                    y="30"
                    width="384"
                    height="222"
                    rx="12"
                    fill="url(#envBody)"
                  />
                  <path
                    d="M8 42 200 168 392 42v198a12 12 0 0 1-12 12H20a12 12 0 0 1-12-12Z"
                    fill="#f6d5dd"
                  />
                  <path
                    d="M8 42a12 12 0 0 1 12-12h360a12 12 0 0 1 12 12L200 168Z"
                    fill="url(#envFlap)"
                    className="origin-top transition-transform duration-500 group-hover:[transform:rotateX(18deg)]"
                    style={{ transformBox: "fill-box", transformOrigin: "top" }}
                  />
                  <circle cx="200" cy="150" r="30" fill="url(#wax)" />
                  <text
                    x="200"
                    y="161"
                    textAnchor="middle"
                    fontSize="26"
                    fill="#ffe9ef"
                    fontFamily="serif"
                  >
                    {her.firstName.charAt(0)}
                  </text>
                </svg>
              </motion.button>

              <p className="mt-6 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.32em] text-blush-300/65">
                <span className="animate-heartbeat">♥</span>
                {letter.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── the letter ───────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 70, rotateX: reduced ? 0 : -22, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: reduced ? 0.2 : 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-gold-400/25 p-7 shadow-2xl sm:p-12"
              style={{
                background:
                  "linear-gradient(160deg,#fffaf4 0%,#fdeef1 55%,#f8dfe6 100%)",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,transparent 0 30px,#8a3b57 30px 31px)",
                }}
              />

              <div className="relative">
                <p className="font-script text-3xl text-[#8a2c4d] sm:text-4xl">
                  {letter.salutation}
                </p>

                <div className="mt-6 flex flex-col gap-5">
                  {letter.lines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduced ? 0.2 : 0.75,
                        delay: reduced ? 0 : 0.5 + i * 0.28,
                      }}
                      className="text-[0.98rem] leading-[1.9] text-[#5d2338]/90 sm:text-[1.05rem]"
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduced ? 0.2 : 0.9,
                    delay: reduced ? 0 : 0.5 + letter.lines.length * 0.28,
                  }}
                  className="mt-9"
                >
                  <p className="text-sm text-[#5d2338]/70">{letter.signOff}</p>
                  <p className="font-script text-4xl text-[#8a2c4d] sm:text-5xl">
                    {letter.signature}
                  </p>
                </motion.div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-10 cursor-pointer rounded-full border border-[#8a2c4d]/30 px-5 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-[#8a2c4d]/80 transition-colors hover:border-[#8a2c4d]/60 hover:bg-[#8a2c4d]/8"
                >
                  {letter.close}
                </button>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
