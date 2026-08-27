import { PawMark } from "./Preloader";

const items = ["Join the colony", "Slow coffee", "Warm laps", "Adopt a friend"];

export default function MarqueeBand() {
  const row = (key) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((text, i) => (
        <span
          key={`${key}-${i}`}
          className="flex items-center gap-8 pr-8 whitespace-nowrap font-mono text-2xl uppercase tracking-[0.18em] text-cream md:text-4xl"
        >
          {text}
          <PawMark className="h-7 w-7 text-ochre md:h-9 md:w-9" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="surface-inverse marquee-paused overflow-hidden border-y border-ink bg-ink py-6 md:py-8" aria-hidden="true">
      <div className="marquee-track animate-marquee">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
