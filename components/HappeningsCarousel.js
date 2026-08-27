"use client";

import { motion, useAnimation, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import HappeningCard from "./HappeningCard";
import { happeningsData } from "../data/happeningsData";

export default function HappeningsCarousel() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [limits, setLimits] = useState({ max: 0, step: 420 });

  const clamp = (value) =>
    Math.max(-limits.max, Math.min(0, value));

  const measure = () => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    setLimits({
      max: Math.max(0, track.scrollWidth - viewport.clientWidth),
      step: (track.querySelector("article")?.offsetWidth ?? 420) + 24,
    });
  };

  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    const raf = requestAnimationFrame(measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const goTo = (dir) => {
    const target = clamp(x.get() - dir * limits.step);
    controls.start({
      x: target,
      transition: reduce ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 30 },
    });
  };

  return (
    <section id="happenings" className="surface-inverse relative overflow-hidden bg-ink py-20 text-cream md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-taupe-light">
              Happenings
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              delay={0.05}
              className="type-fluid-h2 font-serif font-semibold text-cream"
            >
              There&apos;s always something purring.
            </ScrollReveal>
            <ScrollReveal as="p" delay={0.1} className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
              Weekly rituals, monthly mayhem. Come for the coffee, stay for the
              cats — some of them are looking for a forever home.
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} className="hidden gap-3 sm:flex">
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => goTo(-1)}
              aria-label="Previous happening"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-ochre hover:text-ochre"
            >
              ←
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => goTo(1)}
              aria-label="Next happening"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-ochre hover:text-ochre"
            >
              →
            </motion.button>
          </ScrollReveal>
        </div>
      </div>

      <ScrollReveal delay={0.1} viewportMargin="-40px">
        <div
          ref={viewportRef}
          className="mt-12 overflow-hidden px-5 pb-4 md:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          <motion.div
            ref={trackRef}
            className="flex w-max gap-6"
            style={{ x }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -limits.max, right: 0 }}
            dragElastic={0.08}
            onDragEnd={(_, info) => {
              const snapped = clamp(
                Math.round((x.get() + info.offset.x) / limits.step) *
                  limits.step
              );
              controls.start({
                x: snapped,
                transition: reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 },
              });
            }}
          >
            {happeningsData.map((event) => (
              <div key={event.id} className="shrink-0 snap-start">
                <HappeningCard event={event} />
              </div>
            ))}

            <div className="flex w-[260px] shrink-0 snap-start flex-col items-start justify-center px-2 sm:w-[300px]">
              <p className="font-serif text-3xl font-medium italic leading-tight text-taupe-light">
                Have an idea for a happening?
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 border-b-2 border-ochre pb-1 font-mono text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:text-ochre"
              >
                Tell us about it <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
