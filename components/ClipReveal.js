"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function ClipReveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className ? `${className} clip-reveal` : "clip-reveal"}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={inView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay }
      }
    >
      {children}
    </motion.div>
  );
}
