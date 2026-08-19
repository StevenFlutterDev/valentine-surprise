"use client";

import { useEffect, useRef, useState } from "react";

type Spark = {
  id: number;
  x: number;
  y: number;
  glyph: string;
  rise: number;
  scale: number;
  rotate: number;
  dur: number;
  drift: number;
  trail?: boolean;
};

const GLYPHS = ["💗", "💕", "❤️", "🌸", "✨", "💖"];

let seq = 0;

/**
 * Full-screen decorative layer:
 *  • tap / click anywhere  → a little burst of hearts floats up
 *  • move the mouse        → a soft trail of hearts follows the cursor
 * Purely visual, never blocks pointer events, and disables itself for
 * visitors who prefer reduced motion.
 */
export default function HeartLayer({ active }: { active: boolean }) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const lastTrail = useRef(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const remove = (ids: number[]) =>
      setSparks((prev) => prev.filter((s) => !ids.includes(s.id)));

    const spawn = (items: Spark[], life: number) => {
      setSparks((prev) => [...prev.slice(-70), ...items]);
      const t = window.setTimeout(
        () => remove(items.map((i) => i.id)),
        life,
      );
      timers.current.push(t);
    };

    const onPointerDown = (e: PointerEvent) => {
      // Don't fire on real UI the visitor is trying to use.
      const el = e.target as HTMLElement | null;
      if (el?.closest("button, a, input, textarea, [data-no-hearts]")) return;

      const count = 6 + Math.floor(Math.random() * 4);
      const burst: Spark[] = Array.from({ length: count }, () => ({
        id: seq++,
        x: e.clientX,
        y: e.clientY,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        rise: 90 + Math.random() * 150,
        scale: 0.7 + Math.random() * 0.9,
        rotate: Math.random() * 70 - 35,
        dur: 1100 + Math.random() * 900,
        drift: (Math.random() - 0.5) * 140,
      }));
      spawn(burst, 2100);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastTrail.current < 85) return;
      lastTrail.current = now;

      spawn(
        [
          {
            id: seq++,
            x: e.clientX,
            y: e.clientY,
            glyph: Math.random() > 0.55 ? "💗" : "✨",
            rise: 0,
            scale: 0.45 + Math.random() * 0.35,
            rotate: Math.random() * 40 - 20,
            dur: 900,
            drift: 0,
            trail: true,
          },
        ],
        1000,
      );
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [active]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {sparks.map((s) => (
        <span
          key={s.id}
          className={s.trail ? "trail-heart absolute" : "pop-heart absolute"}
          style={
            {
              left: s.x + (s.trail ? 0 : s.drift * 0.15),
              top: s.y,
              fontSize: s.trail ? "0.9rem" : "1.35rem",
              filter: "drop-shadow(0 0 8px rgba(239,127,162,0.55))",
              "--rise": `${s.rise}px`,
              "--s": s.scale,
              "--r": `${s.rotate}deg`,
              "--dur": `${s.dur}ms`,
              transform: "translate(-50%,-50%)",
            } as React.CSSProperties
          }
        >
          {s.glyph}
        </span>
      ))}
    </div>
  );
}
