"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { PawMark } from "./Preloader";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Menu", href: "#menu" },
  { label: "Happenings", href: "#happenings" },
  { label: "Book a Session", href: "#book" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    closeBtnRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-taupe/30 bg-cream/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-8 ${
            scrolled ? "h-16" : "h-20 md:h-24"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5 focus-visible:outline-offset-4"
          >
            <PawMark className="h-6 w-6 text-ink transition-transform duration-300 group-hover:-rotate-12" />
            <span className="font-serif text-xl font-semibold tracking-tight text-ink md:text-2xl">
              NEKO&nbsp;CAFE
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-sans text-sm font-medium text-ink-soft transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-ochre after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <motion.a
                href="#book"
                whileTap={{ scale: 0.95 }}
                className="rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-ochre"
              >
                Reserve
              </motion.a>
            </div>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15"
            >
              <span className="relative block h-3 w-5">
                <span className="absolute left-0 top-0 h-px w-5 bg-ink" />
                <span className="absolute left-0 top-1/2 h-px w-5 bg-ink" />
                <span className="absolute bottom-0 left-0 h-px w-5 bg-ink" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            ref={dialogRef}
            className="surface-inverse fixed inset-0 z-[60] flex flex-col bg-ink text-cream lg:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 py-6">
              <span className="font-serif text-2xl font-semibold tracking-tight">NEKO CAFE</span>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25"
              >
                <span className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-cream" />
                  <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-cream" />
                </span>
              </button>
            </div>

            <motion.nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-2 px-6"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.07,
                    delayChildren: reduce ? 0 : 0.2,
                  },
                },
              }}
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                  className="border-b border-cream/10 py-4 font-serif text-4xl font-medium tracking-tight text-cream transition-colors hover:text-ochre"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>

            <div className="px-6 pb-10">
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full bg-ochre py-4 text-center font-mono text-sm uppercase tracking-[0.2em] text-cream"
              >
                Reserve a Table
              </a>
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-cream/50">
                a cafe for cat people
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
