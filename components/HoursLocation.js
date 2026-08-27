"use client";

import ScrollReveal from "./ScrollReveal";
import SleepingCat from "./SleepingCat";

const hours = [
  { days: "Monday – Thursday", time: "8am – 8pm" },
  { days: "Friday", time: "8am – 9pm" },
  { days: "Saturday", time: "9am – 9pm" },
  { days: "Sunday", time: "9am – 6pm" },
];

export default function HoursLocation() {
  return (
    <section id="hours" className="bg-cream-soft py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
              Hours &amp; Location
            </ScrollReveal>
            <ScrollReveal
              as="h2"
              delay={0.05}
              className="type-fluid-h3 font-serif font-semibold text-ink"
            >
              Find your way over.
            </ScrollReveal>
            <ScrollReveal as="p" delay={0.1} className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              We&apos;re in the old brick storefront at the corner of the plaza —
              look for the paw print in the window and the cat-shaped sign.
            </ScrollReveal>

            <ScrollReveal delay={0.12} className="mt-10">
              <ul className="divide-y divide-taupe/30 border-y border-taupe/30">
                {hours.map((row) => (
                  <li key={row.days} className="flex items-baseline justify-between gap-4 py-4">
                    <span className="font-medium text-ink">{row.days}</span>
                    <span className="font-mono text-sm text-taupe">{row.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-taupe">
                Adoption days: Saturdays 11am – 4pm
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.14} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-moss">Address</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  1800 N Damen Ave
                  <br />
                  Chicago, IL 60647
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-moss">Phone</p>
                <a
                  href="tel:+17735550143"
                  className="mt-2 block text-sm leading-relaxed text-ink-soft transition-colors hover:text-ochre"
                >
                  (773) 555-0143
                </a>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-moss">Reservations</p>
                <a
                  href="#book"
                  className="mt-1 block text-sm leading-relaxed text-ink-soft transition-colors hover:text-ochre"
                >
                  Book a session online →
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1} className="relative lg:col-span-7">
            <SleepingCat className="absolute -right-3 -top-7 z-10 md:-right-5" />
            <div className="h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-taupe/25 shadow-[0_30px_60px_-35px_rgba(31,36,32,0.4)]">
              <iframe
                title="Map to NEKO CAFE, 1800 N Damen Ave, Chicago"
                src="https://www.google.com/maps?q=1800%20N%20Damen%20Ave%2C%20Chicago%2C%20IL%2060647&z=15&output=embed"
                className="h-full w-full"
                style={{ border: 0, minHeight: 420 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
