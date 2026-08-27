"use client";

import ScrollReveal from "./ScrollReveal";
import ImageWithSkeleton from "./ImageWithSkeleton";
import ClipReveal from "./ClipReveal";

const photos = [
  { id: "p1", src: "photo-1518791841217-8f162f1e1131", alt: "A black cat named Miso" },
  { id: "p2", src: "photo-1543852786-1cf6624b9987", alt: "A kitten at play" },
  { id: "p3", src: "photo-1533738363-b7f9aef128ce", alt: "A fluffy cat on a cushion" },
  { id: "p4", src: "photo-1573865526739-10659fec78a5", alt: "An orange cat in the sun" },
  { id: "p5", src: "photo-1529778873920-4da4926a72c2", alt: "A curious tabby" },
  { id: "p6", src: "photo-1501339847302-ac426a4a7cbb", alt: "The lounge at NEKO CAFE" },
];

export default function FollowAlong() {
  return (
    <section id="follow" className="bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
              Follow Along
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              delay={0.05}
              className="type-fluid-h3 font-serif font-semibold text-ink"
            >
              Daily proof the cats are working.
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.1}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              <InstagramIcon className="h-4 w-4" />
              @nekocafe.chicago
            </a>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {photos.map((photo, i) => (
            <ScrollReveal key={photo.id} delay={(i % 3) * 0.08}>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`See ${photo.alt} on Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-2xl"
              >
                <ClipReveal className="absolute inset-0" delay={(i % 3) * 0.05}>
                  <ImageWithSkeleton
                    skeletonClassName="h-full w-full"
                    src={`https://images.unsplash.com/${photo.src}?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=700&h=700`}
                    alt={photo.alt}
                    width={700}
                    height={700}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  />
                </ClipReveal>
                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
                  <InstagramIcon className="h-6 w-6 text-cream" />
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal as="p" delay={0.1} className="mt-10 text-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-lg italic text-ink transition-colors hover:text-ochre"
          >
            Tag @nekocafe.chicago for a chance to be featured
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
