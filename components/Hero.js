"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FloatingIcons from "./FloatingIcons";
import ScrollReveal from "./ScrollReveal";
import SunbeamDrift from "./SunbeamDrift";
import CatBackground from "./CatBackground";

const WORDS = [
  { text: "A" },
  { text: "cafe" },
  { text: "for" },
  { text: "cat", special: true },
  { text: "people." },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const reduce = useReducedMotion();
  const [start, setStart] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const alreadyPlayed =
      sessionStorage.getItem("neko-preloader-played") === "1";
    if (reduce || alreadyPlayed) {
      const raf = requestAnimationFrame(() => setStart(true));
      return () => cancelAnimationFrame(raf);
    }
    const onDone = () => setStart(true);
    window.addEventListener("neko:preloader-done", onDone);
    return () => window.removeEventListener("neko:preloader-done", onDone);
  }, [reduce]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <SunbeamDrift />
      <FloatingIcons />
      <CatBackground />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <motion.div style={{ y: textY }} className="parallax relative z-10 lg:col-span-6 xl:col-span-7">
          <ScrollReveal as="p" y={0} className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
            <span className="h-px w-8 bg-ochre" />
            Cat lounge · Chicago
          </ScrollReveal>

          <h1 className="type-fluid-display font-serif font-semibold text-ink">
            {WORDS.map((w, i) => (
              <span key={w.text} className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className="h1-word inline-block"
                  initial={{ y: "115%" }}
                  animate={start ? { y: "0%" } : { y: "115%" }}
                  transition={{
                    delay: 0.35 + i * 0.08,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {w.special ? (
                    <span className="relative inline-block italic text-ochre">
                      {w.text}
                      <svg
                        viewBox="0 0 120 12"
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 w-full text-ochre/60"
                      >
                        <path
                          d="M3 9C30 3 60 3 117 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    w.text
                  )}
                  {i < WORDS.length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
            Slow coffee, warm light, and a roomful of resident cats who take their
            cuddling very seriously. Pull up a cushion — the colony has been
            waiting for you.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <motion.a
              href="#menu"
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-ochre"
            >
              View Menu
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>
            <motion.a
              href="#book"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 rounded-full border border-ink/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ochre hover:text-ochre"
            >
              Reserve a Table
            </motion.a>
          </div>
        </motion.div>

        <motion.div style={{ y: imageY }} className="parallax relative z-0 lg:col-span-6 xl:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="absolute -inset-4 rounded-[3rem] bg-moss/10 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-t-full rounded-b-[2.5rem] border-[6px] border-cream shadow-[0_30px_60px_-20px_rgba(31,36,32,0.35)]">
              <Image
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=1400&h=1750"
                alt="The warm lounge at NEKO CAFE, full of cushions and cats"
                width={1400}
                height={1750}
                priority
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 80vw, 42vw"
              />
            </div>

            <motion.div
              className="polaroid polaroid-l absolute -left-6 top-16 hidden w-28 rotate-[-8deg] overflow-hidden rounded-2xl border-4 border-cream bg-cream shadow-xl md:block"
              initial={{ opacity: 0, y: 20, rotate: -14 }}
              animate={{ opacity: 1, y: 0, rotate: -8 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=400&h=400"
                alt="A fluffy resident cat"
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
                sizes="112px"
              />
            </motion.div>

            <motion.div
              className="polaroid polaroid-r absolute -right-4 bottom-14 hidden w-24 rotate-[7deg] overflow-hidden rounded-2xl border-4 border-cream bg-cream shadow-xl md:block"
              initial={{ opacity: 0, y: 20, rotate: 12 }}
              animate={{ opacity: 1, y: 0, rotate: 7 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=400&h=400"
                alt="An orange resident cat napping"
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
                sizes="96px"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-taupe">scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-moss" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4v16m0 0 6-6m-6 6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </motion.div>
    </section>
  );
}
