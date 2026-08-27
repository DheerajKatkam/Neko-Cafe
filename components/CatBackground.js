"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import catSilhouette from "@/assets/cat-walk-silhouette.png";

/*
 * Walking cat silhouette (single static pose -> transform-simulated gait).
 * An outer Framer Motion element traverses the section horizontally while a
 * nested element runs a fast bob + squash/stretch loop to sell "walking".
 * The cat flips (scaleX) at each edge and pauses a moment every 3rd pass.
 * Motion only starts when the section is on-screen; under reduced motion the
 * silhouette is static decoration.
 */

const reducedSubscribe = (callback) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const reducedSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reducedServerSnapshot = () => false;

const BOB = {
  y: [0, -4, 0],
  scaleY: [1, 1.02, 1],
  scaleX: [1, 0.985, 1],
  transition: { duration: 0.45, repeat: Infinity, ease: "easeInOut" },
};

const SPARKLES = [
  { className: "right-[-14px] top-[6%]", size: 14 },
  { className: "left-[-12px] top-[2%]", size: 10 },
];

export default function CatBackground() {
  const reduced = useSyncExternalStore(
    reducedSubscribe,
    reducedSnapshot,
    reducedServerSnapshot
  );
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [running, setRunning] = useState(false);
  const [facing, setFacing] = useState(1);
  const traverse = useAnimationControls();
  const bob = useAnimationControls();
  const state = useRef({ dist: 0, dir: 1, passes: 0 });
  const pauseTimer = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setRunning(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current;
      const catEl = wrap?.firstElementChild;
      if (!wrap || !catEl) return;
      state.current.dist = Math.max(80, wrap.clientWidth - catEl.offsetWidth - 48);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const startLeg = useCallback(() => {
    const s = state.current;
    traverse.start({
      x: s.dir === 1 ? s.dist : 0,
      transition: { duration: 16, ease: "linear" },
    });
  }, [traverse]);

  const onLegComplete = useCallback(() => {
    if (!activeRef.current) return;
    const s = state.current;
    s.passes += 1;
    s.dir *= -1;
    setFacing(s.dir);
    if (s.passes % 3 === 0) {
      bob.stop();
      pauseTimer.current = window.setTimeout(() => {
        pauseTimer.current = null;
        bob.start(BOB);
        startLeg();
      }, 2200);
    } else {
      startLeg();
    }
  }, [bob, startLeg]);

  const active = running && inView && !reduced;

  useEffect(() => {
    activeRef.current = active;
    if (!active) {
      traverse.stop();
      bob.stop();
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
        pauseTimer.current = null;
      }
      return;
    }
    bob.start(BOB);
    startLeg();
    return () => {
      traverse.stop();
      bob.stop();
      if (pauseTimer.current) {
        clearTimeout(pauseTimer.current);
        pauseTimer.current = null;
      }
    };
  }, [active, bob, startLeg, traverse]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`cat-track pointer-events-none absolute inset-x-0 bottom-2 z-[1] opacity-70 ${
        active ? "cat-playing" : "cat-paused"
      }`}
    >
      <motion.div
        className="absolute bottom-0 left-0"
        animate={traverse}
        onAnimationComplete={onLegComplete}
      >
        <div className="cat-art relative" style={{ transform: `scaleX(${facing})` }}>
          <div className="h-20 md:h-28">
            <motion.div className="h-full" animate={bob}>
              <Image
                src={catSilhouette}
                alt=""
                width={204}
                height={225}
                loading="lazy"
                sizes="112px"
                className="h-full w-auto object-contain"
              />
            </motion.div>
          </div>
          {SPARKLES.map((s, i) => (
            <Sparkle key={i} size={s.size} className={s.className} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Sparkle({ size, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      fill="currentColor"
      className={`cat-sparkle absolute ${className}`}
    >
      <path d="M12 2c1.1 5.4 3.6 7.9 10 10-6.4 2.1-8.9 4.6-10 10-1.1-5.4-3.6-7.9-10-10 6.4-2.1 8.9-4.6 10-10Z" />
    </svg>
  );
}
