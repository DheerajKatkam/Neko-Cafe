"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function CuratorSpotlight() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-12">
        <ScrollReveal className="relative order-2 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rotate-2 rounded-[2.5rem] border-2 border-dashed border-taupe/50" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=900&h=1100"
                alt="Rin Aoki, head cat caretaker at NEKO CAFE"
                width={900}
                height={1100}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 90vw, 38vw"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 rotate-3 rounded-2xl bg-ochre px-5 py-3 shadow-lg md:-right-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream">
                Head Cat Curator
              </p>
              <p className="font-serif text-lg font-medium text-cream">Rin Aoki</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
            Meet the Cat Curator
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            delay={0.05}
            className="type-fluid-h3 font-serif font-semibold text-ink"
          >
            Rin Aoki runs a tight ship, and the cats run her.
          </ScrollReveal>
          <ScrollReveal
            as="div"
            delay={0.1}
            className="mt-6 max-w-xl space-y-5 text-base leading-relaxed text-ink-soft"
          >
            <p>
              Rin grew up in her family&apos;s tea house, learned hospitality by
              carrying plates and pouring for a hundred regulars, then spent six
              years running intake at a city shelter — where she learned the
              real skill: matching the right human with the right cat.
            </p>
            <p>
              At NEKO she is equal parts caretaker, matchmaker, and supervisor of
              nap schedules. She can tell you every cat&apos;s favourite window,
              treat, and unspoken opinion of your latte.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="mt-9 flex flex-wrap gap-4">
            <motion.a
              href="#book"
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-ochre"
            >
              Book a session
            </motion.a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border-b-2 border-ochre pb-1 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-ochre"
            >
              Our story <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
