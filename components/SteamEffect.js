const WISPS = [
  { left: "38%", top: "30%", width: 3, height: 26, dur: "3.2s", delay: "0s" },
  { left: "45%", top: "27%", width: 2, height: 30, dur: "3.9s", delay: "0.7s" },
  { left: "52%", top: "30%", width: 3, height: 24, dur: "3.4s", delay: "1.2s" },
  { left: "58%", top: "32%", width: 2, height: 22, dur: "3.7s", delay: "0.4s" },
];

export default function SteamEffect({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {WISPS.map((w, i) => (
        <span
          key={i}
          className="steam-wisp rounded-full bg-white/60 blur-[2px]"
          style={{
            left: w.left,
            top: w.top,
            width: w.width,
            height: w.height,
            "--steam-dur": w.dur,
            "--steam-delay": w.delay,
          }}
        />
      ))}
    </div>
  );
}
