"use client";

import Image from "next/image";
import ClipReveal from "./ClipReveal";
import ImageWithSkeleton from "./ImageWithSkeleton";
import ScrollReveal from "./ScrollReveal";
import { catsData } from "../data/catsData";
import collageBg from "@/assets/memories-collage-bg.jpg";

const FRAMES = [
  { cat: 0, pos: { left: 12.7, top: 14.9, w: 34.7, h: 28.1 }, rotate: -4 },
  { cat: 1, pos: { left: 52.1, top: 16.4, w: 34.6, h: 32.0 }, rotate: 3 },
  { cat: 2, pos: { left: 15.3, top: 46.3, w: 33.7, h: 32.3 }, rotate: 2.5 },
  { cat: 3, pos: { left: 52.1, top: 52.0, w: 33.9, h: 32.5 }, rotate: -3 },
];

export default function MemoriesCollage() {
  return (
    <section id="memories" className="cv-auto scroll-mt-24 bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
            Memories
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            delay={0.05}
            className="type-fluid-h3 font-serif font-semibold text-ink"
          >
            Moments that stuck to the wall.
          </ScrollReveal>
          <ScrollReveal as="p" delay={0.1} className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            A few favourite frames from the lounge — taped up, slightly crooked,
            and exactly as they should be.
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.15} className="mt-12 md:mt-16">
          <div className="relative mx-auto w-full max-w-[400px] sm:max-w-[560px]">
            <ClipReveal>
              <div className="relative aspect-[736/1104] w-full">
                <Image
                  src={collageBg}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 100vw, 560px"
                  className="memories-bg object-cover"
                />

                {FRAMES.map(({ cat, pos, rotate }) => (
                  <div
                    key={catsData[cat].id}
                    className="group absolute"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      width: `${pos.w}%`,
                      height: `${pos.h}%`,
                      rotate: `${rotate}deg`,
                    }}
                  >
                    <div className="relative h-full w-full bg-cream-soft shadow-[0_14px_30px_-12px_rgba(31,36,32,0.35)]">
                      <div className="absolute left-[8%] top-[9%] h-[64%] w-[84%]">
                        <ImageWithSkeleton
                          skeletonClassName="h-full w-full"
                          src={catsData[cat].image}
                          alt={`Polaroid memory of ${catsData[cat].name} at NEKO CAFE`}
                          width={1200}
                          height={1200}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          sizes="(max-width: 640px) 30vw, 200px"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ClipReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}