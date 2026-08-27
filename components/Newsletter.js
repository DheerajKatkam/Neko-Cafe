"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { db } from "../lib/firebase";
import ScrollReveal from "./ScrollReveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setError("That email doesn't look quite right — mind checking it?");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      if (db) {
        await addDoc(collection(db, "newsletter"), { email: trimmed, createdAt: serverTimestamp() });
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("success");
    } catch (err) {
      console.error("Newsletter signup failed:", err);
      setStatus("error");
      setError("We couldn't add you just now. Please try again in a moment.");
    }
  };

  return (
    <section id="newsletter" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-moss">
          The Mewsletter
        </ScrollReveal>
        <ScrollReveal
          as="h2"
          delay={0.05}
          className="type-fluid-h2 font-serif font-semibold text-ink"
        >
          Join the colony.
        </ScrollReveal>
        <ScrollReveal as="p" delay={0.1} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
          One gentle email a month — new adoptables, happenings, and the occasional
          photograph of a cat doing absolutely nothing.
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="surface-inverse rounded-full bg-moss px-8 py-5 text-cream"
              >
                <p className="font-serif text-xl font-medium">Welcome to the colony.</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70">
                  check your inbox for a hello from the cats
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                noValidate
              >
                <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="flex-1 rounded-full border border-taupe/40 bg-cream-soft px-6 py-4 text-sm text-ink placeholder:text-taupe focus:border-ochre focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileTap={status === "loading" ? undefined : { scale: 0.96 }}
                    className="rounded-full bg-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-ochre disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Adding…" : "Join"}
                  </motion.button>
                </div>

                <AnimatePresence>
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      role="alert"
                      className="mt-4 text-sm font-medium text-ochre-dark"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {!db && (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-taupe">
                    Demo mode — connect Firebase to store subscribers
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
