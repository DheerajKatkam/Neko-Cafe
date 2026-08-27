"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PawMark } from "./Preloader";

const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function PawBurst() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <span
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {ANGLES.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <motion.span
            key={deg}
            className="absolute"
            initial={{ opacity: 0, scale: 0.3, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.3, 1, 0.75],
              x: Math.cos(rad) * 70,
              y: Math.sin(rad) * 70,
              rotate: deg > 180 ? -16 : 16,
            }}
            transition={{ duration: 1.15, ease: "easeOut", delay: 0.15 + (deg / 360) * 0.3 }}
          >
            <PawMark className="h-6 w-6 text-moss" />
          </motion.span>
        );
      })}
    </span>
  );
}
