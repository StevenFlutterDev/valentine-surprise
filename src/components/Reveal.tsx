"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 46 },
  down: { x: 0, y: -46 },
  left: { x: 54, y: 0 },
  right: { x: -54, y: 0 },
  none: { x: 0, y: 0 },
};

/** Fades + slides its children in the first time they scroll into view. */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.9,
  amount = 0.25,
  className = "",
  blur = true,
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  amount?: number;
  className?: string;
  blur?: boolean;
}) {
  const reduced = useReducedMotion();
  const o = offset[direction];

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: {
          opacity: 0,
          x: o.x,
          y: o.y,
          filter: blur ? "blur(10px)" : "blur(0px)",
        },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
