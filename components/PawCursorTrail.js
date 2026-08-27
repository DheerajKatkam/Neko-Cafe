"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import pawCursorBlack from "@/assets/paw-cursor-black.png";
import pawCursorPink from "@/assets/paw-cursor-pink.png";
import pawPrintBlack from "@/assets/paw-print-black.png";
import pawPrintPink from "@/assets/paw-print-pink.png";

const CURSOR_BLACK_URL = typeof pawCursorBlack === "string" ? pawCursorBlack : pawCursorBlack.src;
const CURSOR_PINK_URL = typeof pawCursorPink === "string" ? pawCursorPink : pawCursorPink.src;
const PRINT_BLACK_URL = typeof pawPrintBlack === "string" ? pawPrintBlack : pawPrintBlack.src;
const PRINT_PINK_URL = typeof pawPrintPink === "string" ? pawPrintPink : pawPrintPink.src;

const HOTSPOT_X = 11;
const HOTSPOT_Y = 9;
const SPAWN_MS = 110;
const LIFETIME_MS = 950;

export default function PawCursorTrail() {
  const [caps, setCaps] = useState({ fine: false, reduced: false });
  const [marks, setMarks] = useState([]);
  const idRef = useRef(0);
  const flipRef = useRef(false);
  const lastRef = useRef(0);
  const timersRef = useRef(new Set());

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setCaps({ fine: fine.matches, reduced: reduce.matches });
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    const raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!caps.fine || caps.reduced) return;
    const style = document.createElement("style");
    style.textContent = `
      * { cursor: url("${CURSOR_BLACK_URL}") ${HOTSPOT_X} ${HOTSPOT_Y}, auto !important; }
      html[data-theme="dark"] * { cursor: url("${CURSOR_PINK_URL}") ${HOTSPOT_X} ${HOTSPOT_Y}, auto !important; }
      .paw-trail-mark {
        background-image: url("${PRINT_BLACK_URL}");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
      html[data-theme="dark"] .paw-trail-mark {
        background-image: url("${PRINT_PINK_URL}");
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, [caps.fine, caps.reduced]);

  useEffect(() => {
    if (!caps.fine || caps.reduced) return;
    const onMove = (e) => {
      const now = performance.now();
      if (now - lastRef.current < SPAWN_MS) return;
      lastRef.current = now;
      flipRef.current = !flipRef.current;
      const id = ++idRef.current;
      setMarks((m) => [...m, { id, x: e.clientX, y: e.clientY, flip: flipRef.current }]);
      const t = window.setTimeout(() => {
        setMarks((m) => m.filter((mk) => mk.id !== id));
        timersRef.current.delete(t);
      }, LIFETIME_MS);
      timersRef.current.add(t);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const timers = timersRef.current;
    return () => {
      window.removeEventListener("pointermove", onMove);
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, [caps.fine, caps.reduced]);

  if (!caps.fine) return null;

  return (
    <>
      {marks.map((mark) => (
        <motion.span
          key={mark.id}
          className="pointer-events-none fixed z-[65] block h-[30px] w-[30px] -ml-[15px] -mt-[15px]"
          style={{ left: mark.x, top: mark.y }}
          initial={{ opacity: 0.85, scale: 1 }}
          animate={{ opacity: 0, scale: 0.45 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          aria-hidden="true"
        >
          <span
            className="paw-trail-mark block h-full w-full"
            style={{ transform: `rotate(${mark.flip ? 9 : -9}deg)` }}
          />
        </motion.span>
      ))}
    </>
  );
}
