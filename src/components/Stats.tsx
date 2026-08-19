"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { stats, type Stat } from "@/lib/content";
import Reveal from "./Reveal";

/** Resolve a stat to its number — dated stats compute from today. */
function resolve(stat: Stat): number {
  if (stat.value !== undefined) return stat.value;
  if (!stat.since) return 0;
  const ms = Date.now() - new Date(`${stat.since}T00:00:00`).getTime();
  const days = Math.floor(ms / 86_400_000);
  return stat.unit === "years" ? Math.floor(days / 365.2425) : days;
}

function Counter({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Resolved here, on the client, so dated stats use the visitor's today —
    // and the server-rendered "0" never mismatches.
    const to = resolve(stat);

    // Reduced motion → duration 0, so the very first frame lands on `to`.
    const duration = reduced ? 0 : 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat, reduced]);

  return (
    <span ref={ref} className="lining-nums tabular-nums">
      {value.toLocaleString()}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.12} amount={0.4}>
            <div className="flex flex-col items-center gap-2">
              <div className="text-shimmer font-display text-5xl font-light sm:text-6xl">
                <Counter stat={s} />
              </div>
              <div className="text-[0.62rem] uppercase tracking-[0.32em] text-blush-300/65">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
