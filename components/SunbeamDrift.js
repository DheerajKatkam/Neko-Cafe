"use client";

const DUST = [
  { left: "14%", top: "30%", size: 3, dur: "12s", delay: "0s", dx: "90px", dy: "-160px", opacity: 0.5 },
  { left: "22%", top: "48%", size: 2, dur: "14s", delay: "2.2s", dx: "-60px", dy: "-140px", opacity: 0.35 },
  { left: "30%", top: "22%", size: 4, dur: "16s", delay: "5.5s", dx: "110px", dy: "-120px", opacity: 0.4 },
  { left: "70%", top: "34%", size: 2, dur: "13s", delay: "1.4s", dx: "-80px", dy: "-150px", opacity: 0.3 },
  { left: "78%", top: "56%", size: 3, dur: "15s", delay: "3.8s", dx: "70px", dy: "-130px", opacity: 0.45 },
  { left: "60%", top: "18%", size: 2, dur: "11s", delay: "6.6s", dx: "-50px", dy: "-160px", opacity: 0.3 },
];

export default function SunbeamDrift() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="sunbeam absolute -top-20 left-[6%] h-[140%] w-12 rotate-[14deg] opacity-60 blur-md" />
      <div className="sunbeam absolute -top-20 left-[24%] h-[140%] w-7 rotate-[19deg] opacity-40 blur-sm" />
      <div className="sunbeam absolute -top-20 right-[10%] h-[140%] w-9 -rotate-[12deg] opacity-45 blur-md" />
      {DUST.map((d, i) => (
        <span
          key={i}
          className="dust-mote"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            "--dust-dur": d.dur,
            "--dust-delay": d.delay,
            "--dust-dx": d.dx,
            "--dust-dy": d.dy,
            "--dust-opacity": d.opacity,
          }}
        />
      ))}
    </div>
  );
}
