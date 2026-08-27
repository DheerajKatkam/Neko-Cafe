"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef } from "react";

export default function TiltCard({ children, className = "", max = 7 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const onMove = reduce
    ? undefined
    : (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY.set(px * max * 2);
        rotateX.set(-py * max * 2);
      };

  const onLeave = reduce
    ? undefined
    : () => {
        rotateX.set(0);
        rotateY.set(0);
      };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}
