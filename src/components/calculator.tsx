"use client";

import { useMemo, useState } from "react";
import { sectionX } from "@/lib/layout";
import { Arrow, CheckCircle } from "@/components/icons";

const HAMPER_PRICE = 14.9; // ~15 lbs at $1.99/lb, rounded to a flat hamper rate
const DRY_CLEAN_PRICE = 4.5;

const detergents = ["Fresh & Clean", "Fresh Marine", "Lavender Mist"];

export function Calculator() {
  const [hampers, setHampers] = useState(2);
  const [items, setItems] = useState(4);
  const [detergent, setDetergent] = useState(detergents[0]);

  const total = useMemo(
    () => hampers * HAMPER_PRICE + items * DRY_CLEAN_PRICE,
    [hampers, items],
  );

  return (
    <section
      id="calculator"
      className={`border-t border-line/50 bg-band pt-10 md:pt-12 lg:pt-14 pb-16 md:pb-20 lg:pb-24 ${sectionX}`}
    >
      <div className="text-center" data-aos="fade-up">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand md:text-xs">
          Transparent Costing
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Interactive Laundry Calculator
        </h2>
        <p className="mt-3 text-sm text-muted md:text-base">
          Slide to estimate your load size and preview your immediate quote.
        </p>
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-line/80 bg-card p-4 shadow-2xl shadow-black/40 md:mt-12 md:gap-5 md:p-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6 lg:p-6">
        {/* controls */}
        <div
          data-aos="fade-right"
          className="rounded-2xl border border-line/50 bg-card-deep p-5 md:p-6 lg:p-7"
        >
          <Slider
            label="Wash & Fold Hampers (~15 lbs each)"
            value={hampers}
            min={1}
            max={6}
            onChange={setHampers}
            readout={`${hampers} ${hampers === 1 ? "Bag" : "Bags"}`}
            ticks={["1 Hamper (Solo)", "6 Hampers (Family)"]}
          />

          <div className="mt-8">
            <Slider
              label="Dry Clean Items (Suits, Dresses, Coats)"
              value={items}
              min={0}
              max={18}
              onChange={setItems}
              readout={`${items} ${items === 1 ? "Item" : "Items"}`}
              ticks={["0 Items", "9 Items", "18 Items"]}
            />
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium text-muted md:text-sm">
              Detergent Preference{" "}
              <span className="text-muted/70">(Included at no cost)</span>
            </p>
            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              {detergents.map((d) => {
                const isSelected = detergent === d;
                return (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setDetergent(d)}
                    className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 active:scale-95 sm:w-auto sm:justify-start md:text-sm ${
                      isSelected
                        ? "bg-brand text-[#06213c] shadow-[0_0_16px_rgba(78,168,245,0.4)] scale-[1.03]"
                        : "border border-line bg-white/[0.02] text-muted hover:border-brand/60 hover:text-brand hover:scale-[1.02]"
                    }`}
                  >
                    {isSelected && <CheckCircle className="size-3.5 shrink-0 text-[#06213c]" />}
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* estimate card */}
        <div
          data-aos="fade-left"
          data-aos-delay="120"
          className="relative isolate overflow-hidden flex flex-col justify-center rounded-2xl border border-brand/50 bg-gradient-to-br from-brand-soft/90 via-navy/90 to-card-deep p-6 text-center shadow-xl shadow-brand/10 transition-all duration-300 md:p-7 lg:p-8"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(78,168,245,0.2),transparent_80%)]"
          />

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand md:text-xs">
            Estimated Total
          </p>

          <div className="my-3 flex items-center justify-center">
            <p
              key={total}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl transition-all duration-300 animate-rise"
            >
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>

          <p className="text-xs font-semibold text-brand-strong md:text-sm">
            Free Cleaning Pickup &amp; Delivery
          </p>

          <p className="mt-3 text-[11px] leading-relaxed text-muted md:text-xs">
            Accurate weight confirmed at our studio upon check-in. Never charged
            until delivery is dispatched.
          </p>

          <a
            href="#book"
            className="group relative overflow-hidden mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-[#06213c] transition-all duration-300 hover:bg-brand-strong hover:shadow-[0_0_24px_rgba(78,168,245,0.5)] hover:scale-[1.03] active:scale-95"
          >
            <span className="relative z-10">Lock In My Pickup</span>
            <Arrow className="relative z-10 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
        </div>
      </div>
    </section>
  );
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  readout: string;
  ticks: string[];
};

function Slider({ label, value, min, max, onChange, readout, ticks }: SliderProps) {
  const id = label.replace(/\W+/g, "-").toLowerCase();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="group/slider">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-xs font-medium md:text-sm text-ink/90">
          {label}
        </label>
        <span
          key={readout}
          className="shrink-0 rounded-lg bg-brand/15 px-2.5 py-1 text-xs font-bold text-brand shadow-[0_0_12px_rgba(78,168,245,0.2)] md:text-sm transition-all duration-300 animate-rise"
        >
          {readout}
        </span>
      </div>
      <div className="relative mt-3.5 flex items-center">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range"
          style={{
            background: `linear-gradient(to right, #7cc2ff 0%, #4ea8f5 ${pct}%, var(--brand-soft) ${pct}%)`,
          }}
        />
      </div>
      <div className="mt-2.5 flex justify-between text-[10px] text-muted md:text-[11px]">
        {ticks.map((t) => (
          <span key={t} className="transition-colors group-hover/slider:text-muted/90">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
