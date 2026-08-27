"use client";

import { motion, useReducedMotion } from "framer-motion";

const icons = [
  { id: "paw", className: "top-[16%] left-[6%] lg:left-[9%]", size: 44, dur: 5.2, delay: 0, rotate: -14, color: "text-ochre/70" },
  { id: "fish", className: "top-[30%] right-[5%] lg:right-[7%]", size: 40, dur: 6.4, delay: 0.7, rotate: 12, color: "text-moss/70" },
  { id: "yarn", className: "bottom-[26%] left-[10%]", size: 46, dur: 5.8, delay: 1.1, rotate: -8, color: "text-ochre/80" },
  { id: "coffee", className: "top-[9%] right-[22%] lg:right-[26%]", size: 42, dur: 6.9, delay: 1.6, rotate: 10, color: "text-taupe" },
  { id: "ear", className: "bottom-[16%] right-[12%]", size: 48, dur: 5.4, delay: 0.3, rotate: 0, color: "text-moss/80" },
];

export default function FloatingIcons() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        {icons.map((icon) => (
          <span key={icon.id} className={`absolute ${icon.className}`}>
            <IconGlyph {...icon} />
          </span>
        ))}
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {icons.map((icon, i) => (
        <motion.span
          key={icon.id}
          className={`absolute ${icon.className}`}
          animate={{
            y: [0, -14, 0],
            rotate: [icon.rotate, icon.rotate + 6, icon.rotate],
          }}
          transition={{
            duration: icon.dur,
            delay: icon.delay + i * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <IconGlyph {...icon} />
        </motion.span>
      ))}
    </div>
  );
}

function IconGlyph({ id, size, color }) {
  const style = { width: size, height: size };
  switch (id) {
    case "fish":
      return (
        <svg viewBox="0 0 48 48" style={style} fill="currentColor" className={color}>
          <path d="M42 24 30 18v4h-2c-7 0-13-5-18-5 0 5 3 7 3 7s-3 2-3 7c5 0 11-5 18-5h2v4l12-6Z" opacity=".85" />
          <circle cx="33" cy="23" r="1.6" fill="#fff" />
        </svg>
      );
    case "yarn":
      return (
        <svg viewBox="0 0 48 48" style={style} fill="currentColor" className={color}>
          <path d="M24 8a16 16 0 1 0 0 32 16 16 0 0 0 0-32Zm0 5a11 11 0 1 1 0 22 11 11 0 0 1 0-22Zm0 6a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 48 48" style={style} fill="none" className={color}>
          <path d="M10 20h22v12a8 8 0 0 1-8 8h-6a8 8 0 0 1-8-8V20Z" fill="currentColor" />
          <path d="M32 22h3a5 5 0 0 1 0 10h-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M14 17v-3M21 17v-3M28 17v-3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "ear":
      return (
        <svg viewBox="0 0 48 48" style={style} fill="currentColor" className={color}>
          <path d="M10 8 26 44 22 30l20-16 6-2-22 6-16-10Z" />
        </svg>
      );
    case "paw":
    default:
      return (
        <svg viewBox="0 0 100 100" style={style} fill="currentColor" className={color}>
          <circle cx="30" cy="38" r="9.5" />
          <circle cx="47" cy="29" r="10.5" />
          <circle cx="64" cy="30" r="10.5" />
          <circle cx="79" cy="40" r="9" />
          <path d="M52 50c-15-3-29 8-30 22-1 12 11 19 30 19s31-7 30-19c-1-14-15-25-30-22Z" />
        </svg>
      );
  }
}
