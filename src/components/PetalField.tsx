"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  angle: number;
  spin: number;
  hue: number;
  alpha: number;
  kind: "petal" | "heart" | "spark";
};

const HUES = [340, 345, 350, 355, 12, 40];

/**
 * A soft, always-on canvas of drifting rose petals, hearts and gold sparks.
 * Automatically scales its density to the viewport and pauses when the tab
 * is hidden or the visitor prefers reduced motion.
 */
export default function PetalField({
  density = 1,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let petals: Petal[] = [];
    let raf = 0;
    let running = true;

    const makePetal = (initial = false): Petal => {
      const roll = Math.random();
      const kind: Petal["kind"] =
        roll > 0.82 ? "heart" : roll > 0.68 ? "spark" : "petal";
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -30 - Math.random() * 140,
        size:
          kind === "spark"
            ? 1.2 + Math.random() * 2
            : 7 + Math.random() * (kind === "heart" ? 10 : 14),
        speed: (kind === "spark" ? 0.15 : 0.28) + Math.random() * 0.75,
        drift: (Math.random() - 0.5) * 0.7,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
        alpha: 0.25 + Math.random() * 0.5,
        kind,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = Math.round((width * height) / 26000);
      const count = Math.max(14, Math.min(90, Math.round(base * density)));
      petals = Array.from({ length: count }, () => makePetal(true));
    };

    const drawHeart = (s: number) => {
      ctx.beginPath();
      ctx.moveTo(0, s * 0.32);
      ctx.bezierCurveTo(0, s * 0.08, -s * 0.5, -s * 0.16, -s * 0.5, s * 0.1);
      ctx.bezierCurveTo(-s * 0.5, s * 0.42, -s * 0.1, s * 0.6, 0, s * 0.86);
      ctx.bezierCurveTo(s * 0.1, s * 0.6, s * 0.5, s * 0.42, s * 0.5, s * 0.1);
      ctx.bezierCurveTo(s * 0.5, -s * 0.16, 0, s * 0.08, 0, s * 0.32);
      ctx.closePath();
      ctx.fill();
    };

    const drawPetal = (s: number) => {
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.5, s * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.y += p.speed;
        p.x += p.drift + Math.sin((p.y + p.angle * 40) / 90) * 0.5;
        p.angle += p.spin;

        if (p.y > height + 50 || p.x < -60 || p.x > width + 60) {
          Object.assign(p, makePetal());
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;

        if (p.kind === "spark") {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(243, 217, 164, 0.9)";
          ctx.fillStyle = "rgba(248, 231, 197, 0.95)";
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "heart") {
          ctx.shadowBlur = 12;
          ctx.shadowColor = `hsla(${p.hue}, 80%, 65%, 0.55)`;
          ctx.fillStyle = `hsla(${p.hue}, 78%, 72%, 0.95)`;
          drawHeart(p.size);
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsla(${p.hue}, 70%, 60%, 0.35)`;
          ctx.fillStyle = `hsla(${p.hue}, 72%, ${68 + Math.random() * 4}%, 0.9)`;
          drawPetal(p.size);
        }
        ctx.restore();
      }

      if (running) raf = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      // Draw one static, gentle frame instead of animating.
      running = false;
      for (const p of petals) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fillStyle = `hsla(${p.hue}, 72%, 70%, 0.8)`;
        drawPetal(p.size);
        ctx.restore();
      }
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
