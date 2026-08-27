"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SteamEffect from "./SteamEffect";
import { menuData, menuTeaserImages } from "../data/menuData";

const fineHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function MenuTeaser() {
  return (
    <section id="menu" className="relative bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
            The Menu
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            delay={0.05}
            className="type-fluid-h2 font-serif font-semibold text-ink"
          >
            Eat well, slowly.
          </ScrollReveal>
          <ScrollReveal as="p" delay={0.1} className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            A short, considered menu — good coffee, honest food, and a handful of
            treats for the furry half of the room.
          </ScrollReveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {menuTeaserImages.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.12} className="group">
              <div
                className={`relative overflow-hidden rounded-[2rem] ${
                  item.aspect === "tall" ? "aspect-[4/5]" : "aspect-[4/3] md:aspect-[4/5] lg:aspect-[5/6]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                {item.id === "pour" && <SteamEffect />}
                <div className="absolute bottom-5 left-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream">
                    {item.label}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15} className="mt-12 flex justify-center">
          <motion.a
            href="#menu-list"
            whileTap={{ scale: 0.96 }}
            className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
          >
            View Menu
            <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span>
          </motion.a>
        </ScrollReveal>

        <div id="menu-list" className="mx-auto mt-16 max-w-5xl scroll-mt-28">
          <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-3">
            <MenuGroup title="The Pours" items={menuData.pours} />
            <MenuGroup title="The Bites" items={menuData.bites} />
            <MenuGroup title="Cat Treats" items={menuData.catTreats} />
          </div>
          <ScrollReveal as="p" delay={0.1} className="mt-14 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-taupe">
            Every item can be served to the humans — and every treat to the cats.
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function MenuGroup({ title, items }) {
  const reduce = useReducedMotion();
  const tipRef = useRef(null);
  const [active, setActive] = useState(null);

  const move = (e) => {
    const el = tipRef.current;
    if (!el) return;
    el.style.left = `${e.clientX + 18}px`;
    el.style.top = `${e.clientY + 18}px`;
  };

  return (
    <ScrollReveal as="div">
      <h3 className="border-b border-taupe/40 pb-3 font-serif text-2xl font-medium tracking-tight text-ink">
        {title}
      </h3>
      <ul className="mt-5 space-y-5">
        {items.map((item) => (
          <li
            key={item.id}
            className="group"
            onMouseEnter={(e) => {
              if (!fineHover()) return;
              setActive(item);
              move(e);
            }}
            onMouseMove={(e) => {
              if (active === item) move(e);
            }}
            onMouseLeave={() => setActive(null)}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium text-ink transition-colors group-hover:text-ochre">
                {item.name}
              </span>
              <span className="shrink-0 font-mono text-sm text-taupe">${item.price}</span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            ref={tipRef}
            className="pointer-events-none fixed z-[80] hidden w-44 overflow-hidden rounded-2xl border-4 border-cream bg-cream shadow-2xl md:block"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
          >
            <Image
              src={active.image}
              alt={active.name}
              width={400}
              height={300}
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollReveal>
  );
}
