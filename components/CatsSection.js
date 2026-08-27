"use client";

import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import ImageWithSkeleton from "./ImageWithSkeleton";
import ClipReveal from "./ClipReveal";
import { catsData } from "../data/catsData";

const statusStyles = {
  available: "bg-moss text-cream",
  fostered: "bg-ochre text-cream",
  adopted: "bg-taupe text-cream",
};

export default function CatsSection() {
  return (
    <section id="cats" className="cv-auto scroll-mt-24 bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
            Meet the Residents
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            delay={0.05}
            className="type-fluid-h3 font-serif font-semibold text-ink"
          >
            The colony, currently napping.
          </ScrollReveal>
          <ScrollReveal as="p" delay={0.1} className="mt-5 text-base leading-relaxed text-ink-soft md:text-lg">
            Six personalities, six routines, one shared belief: the sunniest
            windows belong to them. Adoption days run Saturdays 11am – 4pm.
          </ScrollReveal>
        </div>

        <div className="mt-14 @container mx-auto grid max-w-[1040px] grid-cols-1 gap-6 @3xl:grid-cols-2 @5xl:grid-cols-3">
          {catsData.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={(i % 3) * 0.08} className="h-full">
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-taupe/25 bg-cream-soft shadow-[0_20px_50px_-30px_rgba(31,36,32,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(31,36,32,0.5)]">
                  <div className="relative flex aspect-square items-center justify-center p-3 md:p-4">
                    <ClipReveal className="relative h-[70%] w-[70%] overflow-hidden rounded-2xl">
                      <ImageWithSkeleton
                        skeletonClassName="h-full w-full"
                        src={cat.image}
                        alt={`${cat.name}, a ${cat.age} old resident cat at NEKO CAFE`}
                        width={1200}
                        height={1200}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 350px"
                      />
                    </ClipReveal>
                    <span
                      className={`absolute left-8 top-8 z-10 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${statusStyles[cat.adoptionStatus]}`}
                    >
                      {cat.adoptionStatus}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-serif text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-ochre">
                        {cat.name}
                      </h3>
                      <span className="shrink-0 font-mono text-xs text-taupe">{cat.age}</span>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                      {cat.personality.join(" · ")}
                    </p>
                    <a
                      href="#book"
                      className="mt-5 inline-flex w-fit items-center gap-2 border-b-2 border-ochre pb-1 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-ochre"
                    >
                      Meet {cat.name}
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
