"use client";

import { useState } from "react";
import { sectionX } from "@/lib/layout";
import { Arrow, Calendar, Pin } from "@/components/icons";
import { PickupDateModal } from "@/components/pickup-date-modal";

const bubbles = [
  { left: "6%", size: 10, delay: "0s" },
  { left: "17%", size: 6, delay: "1.2s" },
  { left: "29%", size: 13, delay: "2.4s" },
  { left: "41%", size: 7, delay: "0.6s" },
  { left: "54%", size: 11, delay: "3.1s" },
  { left: "67%", size: 6, delay: "1.8s" },
  { left: "79%", size: 12, delay: "0.3s" },
  { left: "91%", size: 8, delay: "2.7s" },
];

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = useState(defaultDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <>
      <section
        id="top"
        className={`relative isolate overflow-hidden bg-navy pb-20 pt-10 md:pb-24 md:pt-14 lg:pb-32 lg:pt-20 ${sectionX}`}
      >
        {/* Full-bleed background video container for section */}
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          {/* Mobile Video (< lg) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/video/hero-bg-poster.jpg"
            className="size-full object-cover lg:hidden"
          >
            <source src="/video/hero-bg.mp4" type="video/mp4" />
          </video>

          {/* Desktop Background Video (>= lg) */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hidden size-full object-cover lg:block"
          >
            <source src="/video/desktop%20bg%20.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Backdrop Scrim / Overlay gradient to ensure text readability */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50 lg:from-navy/90 lg:via-navy/75 lg:to-navy/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_15%_0%,rgba(78,168,245,0.16),transparent_70%)]"
        />

        {/* Content container */}
        <div className="relative z-10 max-w-2xl lg:max-w-3xl" data-aos="fade-right">
          <h1 className="text-[2.1rem] font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.4rem] xl:text-6xl">
            Effortless Laundry &amp; Dry Cleaning{" "}
            <span className="text-brand-strong">Delivered to Your Door</span>
          </h1>

          <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted md:text-base lg:text-lg">
            Premium eco-friendly wash, press &amp; fold. Free door-to-door pickup
            &amp; delivery in 24 hours. Reclaim your weekend with crisp
            Egyptian-cotton standards.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 flex flex-col gap-2 rounded-2xl border border-line bg-white/[0.04] p-2 backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full md:mt-8 max-w-2xl"
          >
            <label htmlFor="zip" className="sr-only">
              ZIP or street address
            </label>
            <span className="flex flex-1 items-center gap-2 px-2.5">
              <Pin className="size-4 shrink-0 text-brand" />
              <input
                id="zip"
                name="zip"
                type="text"
                autoComplete="postal-code"
                placeholder="Enter ZIP or address"
                className="w-full bg-transparent py-2 text-xs text-ink placeholder:text-muted/70 focus:outline-none md:text-sm"
              />
            </span>

            <span className="hidden h-5 w-px bg-line/60 sm:block" />

            <span className="flex items-center gap-2 px-2.5 py-1 sm:py-0">
              <Calendar className="size-4 shrink-0 text-brand" />
              <input
                id="pickup-date"
                name="pickupDate"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="bg-transparent text-xs text-ink outline-none md:text-sm cursor-pointer"
                title="Pick Up Date"
              />
            </span>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-[#06213c] whitespace-nowrap transition-colors hover:bg-brand-strong md:px-6 md:text-sm shrink-0"
            >
              <span>Check Availability</span>
              <Arrow className="size-4 shrink-0" />
            </button>
          </form>
        </div>

        {/* drifting bubbles */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24">
          {bubbles.map((b, i) => (
            <span
              key={i}
              className="animate-bubble absolute bottom-6 rounded-full bg-brand/20 ring-1 ring-brand/30"
              style={{
                left: b.left,
                width: b.size,
                height: b.size,
                animationDelay: b.delay,
              }}
            />
          ))}
        </div>
      </section>

      <PickupDateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
