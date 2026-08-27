import ScrollReveal from "./ScrollReveal";

export default function LiveCam() {
  return (
    <section id="live" className="surface-inverse cv-auto relative overflow-hidden bg-ink py-20 text-cream md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-taupe-light">
              Live Cam
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              delay={0.05}
              className="type-fluid-h3 font-serif font-semibold text-cream"
            >
              The Nap Cam.
            </ScrollReveal>
            <ScrollReveal as="p" delay={0.1} className="mt-5 max-w-xl text-base leading-relaxed text-cream/70">
              A slow, unfiltered feed from the lounge. Cushions rotate. The cats
              rarely do.
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-ochre px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
              <span className="h-2 w-2 rounded-full bg-cream" aria-hidden="true" />
              Live · daytime
            </span>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.12} className="mx-auto mt-10 max-w-[720px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-cream/15 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]">
            <video
              className="aspect-video w-full object-cover"
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
              poster="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&q=85&fm=jpg&fit=crop&w=1600&h=900"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute bottom-5 left-6 flex items-center gap-3">
              <span className="rounded-full bg-ink/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
                The lounge, right now
              </span>
            </div>
            <div className="absolute right-6 top-5 flex items-center gap-2 rounded-full bg-ink/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-ochre" aria-hidden="true" />
              LIVE
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
