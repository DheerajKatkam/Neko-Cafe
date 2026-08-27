"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

const STAMP_LENGTH = 720;
const STAMPS = 3;

export default function Preloader() {
  const lenis = useLenis();
  const [phase, setPhase] = useState("boot"); // "boot" | "playing" | "done"
  const [step, setStep] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const played = sessionStorage.getItem("neko-preloader-played") === "1";

    const announce = () =>
      window.dispatchEvent(new CustomEvent("neko:preloader-done"));

    if (reduced || played) {
      const raf = requestAnimationFrame(announce);
      return () => cancelAnimationFrame(raf);
    }

    const raf = requestAnimationFrame(() => setPhase("playing"));

    const timers = [
      setTimeout(() => setStep(0), 120),
      setTimeout(() => setStep(1), 120 + STAMP_LENGTH),
      setTimeout(() => setStep(2), 120 + STAMP_LENGTH * 2),
      setTimeout(() => setStep(3), 120 + STAMP_LENGTH * 2 + 220),
      setTimeout(() => {
        sessionStorage.setItem("neko-preloader-played", "1");
        setPhase("done");
        announce();
      }, 120 + STAMP_LENGTH * 2 + 220 + 900),
    ];

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (phase === "playing") {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else if (phase === "done") {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [phase, lenis]);

  if (phase === "boot") return null;

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-cream"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              key={step}
              initial={{ scale: 0.3, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={
                step < STAMPS
                  ? { type: "spring", stiffness: 320, damping: 14, delay: 0.05 }
                  : { duration: 0.4, ease: "easeOut" }
              }
            >
              {step < STAMPS ? (
                <PawMark className="h-28 w-28 text-moss" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-center"
                >
                  <p className="font-serif text-5xl font-semibold tracking-tight text-ink md:text-6xl">
                    NEKO CAFE
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-taupe">
                    a cafe for cat people
                  </p>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="h-px w-40 overflow-hidden bg-taupe/40"
              initial={false}
              animate={{
                opacity: step >= STAMPS ? 1 : 0,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="h-full w-full origin-left bg-ochre"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PawMark({ className = "h-6 w-6", ...props }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" className={className} {...props}>
      <circle cx="30" cy="38" r="9.5" />
      <circle cx="47" cy="29" r="10.5" />
      <circle cx="64" cy="30" r="10.5" />
      <circle cx="79" cy="40" r="9" />
      <path d="M52 50c-15-3-29 8-30 22-1 12 11 19 30 19s31-7 30-19c-1-14-15-25-30-22Z" />
    </svg>
  );
}
