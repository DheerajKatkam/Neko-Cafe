"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribeReducedMotion(callback) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export default function SmoothScroll({ children }) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const handle = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const raw = link.getAttribute("href");
      if (!raw || raw.length <= 1) return;
      const el = document.getElementById(raw.slice(1));
      if (!el) return;
      e.preventDefault();
      lenisRef.current?.lenis?.scrollTo(el, { offset: -8, duration: 1.2 });
    };

    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
