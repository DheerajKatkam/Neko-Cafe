"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { PawMark } from "./Preloader";

const PADS = [20, 42, 64, 86];

export default function PawProgressTrail() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  const top = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-hidden="true">
      <div className="relative h-64 w-6">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-taupe/25" />
        {PADS.map((p) => (
          <PawMark
            key={p}
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-taupe/40"
            style={{ top: `${p}%` }}
          />
        ))}
        <motion.span className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ top }}>
          <PawMark className="h-5 w-5 text-ochre drop-shadow-sm" />
        </motion.span>
      </div>
    </div>
  );
}
