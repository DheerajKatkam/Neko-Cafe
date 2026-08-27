"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { db } from "../lib/firebase";
import ScrollReveal from "./ScrollReveal";
import PawBurst from "./PawBurst";

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const sessionLengths = ["1 hour", "1.5 hours", "2 hours"];

const todayISO = () => new Date().toISOString().split("T")[0];

const initialState = {
  name: "",
  email: "",
  date: "",
  timeSlot: "",
  partySize: "2",
  sessionLength: "1 hour",
};

export default function BookingForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const payload = {
      ...form,
      createdAt: serverTimestamp(),
    };

    try {
      if (db) {
        await addDoc(collection(db, "reservations"), payload);
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setStatus("success");
    } catch (err) {
      console.error("Reservation failed:", err);
      setStatus("error");
      setMessage("Something went wrong sending your request. Please try again.");
    }
  };

  const reset = () => {
    setForm(initialState);
    setStatus("idle");
  };

  return (
    <section id="book" className="surface-inverse relative overflow-hidden bg-moss py-20 text-cream md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-ochre/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-ink/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ScrollReveal as="p" className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-taupe-light">
            Book a Session
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            delay={0.05}
            className="type-fluid-h3 font-serif font-semibold"
          >
            The lounge runs on sessions.
          </ScrollReveal>
          <ScrollReveal as="div" delay={0.1} className="mt-6 max-w-md space-y-5 text-base leading-relaxed text-cream/75">
            <p>
              Unlike a diner, our lounge is limited to a handful of humans at a
              time — so every visit is calm, unhurried, and genuinely about the
              cats.
            </p>
            <p>
              Reserve a timed session and we&apos;ll have a cushion ready. Walk-ins
              are welcome when there&apos;s room, but a booking guarantees your
              spot.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.12} className="lg:col-span-7">
          <div className="relative rounded-[2rem] bg-cream p-6 text-ink shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] md:p-9">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <div className="relative">
                    <PawBurst />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                      className="relative flex h-20 w-20 items-center justify-center rounded-full bg-moss"
                    >
                      <PawCheck />
                    </motion.div>
                  </div>
                  <h3 className="mt-6 font-serif text-3xl font-semibold tracking-tight">
                    You&apos;re on the list!
                  </h3>
                  <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
                    {form.name ? `${form.name}, y` : "Y"}our session is reserved for{" "}
                    <span className="font-medium text-ink">{form.date}</span> at{" "}
                    <span className="font-medium text-ink">{form.timeSlot}</span> for{" "}
                    <span className="font-medium text-ink">{form.partySize}</span>{" "}
                    {form.partySize === "1" ? "human" : "humans"}. A confirmation is on
                    its way to {form.email}.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/25 px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                  >
                    Make another booking
                  </button>
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
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field label="Your name">
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Jane Doe"
                        autoComplete="name"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        placeholder="jane@example.com"
                        autoComplete="email"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Date">
                      <input
                        type="date"
                        required
                        min={todayISO()}
                        value={form.date}
                        onChange={update("date")}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Time slot">
                      <select required value={form.timeSlot} onChange={update("timeSlot")} className={inputClass}>
                        <option value="" disabled>
                          Select a time
                        </option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Party size">
                      <select value={form.partySize} onChange={update("partySize")} className={inputClass}>
                        {["1", "2", "3", "4", "5", "6", "7", "8", "8+"].map((n) => (
                          <option key={n} value={n}>
                            {n === "8+" ? "8+ humans" : `${n} ${n === "1" ? "human" : "humans"}`}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Session length">
                      <select value={form.sessionLength} onChange={update("sessionLength")} className={inputClass}>
                        {sessionLengths.map((len) => (
                          <option key={len} value={len}>
                            {len}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-taupe">
                      {db ? "Stored in our reservations ledger" : "Demo mode — connect Firebase to save bookings"}
                    </p>
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileTap={status === "loading" ? undefined : { scale: 0.96 }}
                      className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-cream transition-colors duration-300 hover:bg-ochre disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "loading" ? "Reserving…" : "Reserve Session"}
                      <span aria-hidden="true">→</span>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="alert"
                        className="mt-4 rounded-xl bg-ochre/15 px-4 py-3 text-sm font-medium text-ochre-dark"
                      >
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-taupe/40 bg-cream-soft px-4 py-3 text-sm text-ink placeholder:text-taupe focus:border-ochre focus:outline-none transition-colors";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}

function PawCheck() {
  return (
    <svg viewBox="0 0 64 64" className="h-9 w-9 text-cream" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 34c6 2 12 8 16 18 4-10 10-16 16-18" />
    </svg>
  );
}
