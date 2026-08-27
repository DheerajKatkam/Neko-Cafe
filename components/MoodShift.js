"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MOODS = ["#ffffff", "#c17a3e", "#4b5d46", "#ffffff"];

export default function MoodShift({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const mood = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], MOODS);

  return (
    <motion.div
      ref={ref}
      style={{ "--mood": mood }}
      className="mood-wrap relative"
    >
      {children}
    </motion.div>
  );
}
