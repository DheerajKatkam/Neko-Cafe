import Image from "next/image";

export default function HappeningCard({ event }) {
  return (
    <article className="group flex h-full w-[300px] flex-col overflow-hidden rounded-[2rem] border border-taupe/25 bg-cream shadow-[0_20px_50px_-30px_rgba(31,36,32,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(31,36,32,0.5)] sm:w-[380px] md:w-[420px]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 420px"
        />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink backdrop-blur-sm">
          {event.schedule}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-serif text-2xl font-medium tracking-tight text-ink transition-colors group-hover:text-ochre">
          {event.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft md:text-[15px]">
          {event.description}
        </p>
        <a
          href={event.cta.href}
          className="mt-6 inline-flex w-fit items-center gap-2 border-b-2 border-ochre pb-1 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-ochre"
        >
          {event.cta.label}
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
