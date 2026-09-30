"use client";

import { useState } from "react";
import { Arrow } from "@/components/icons";
import { showToast } from "@/components/toaster";

const step =
  "grid size-10 place-items-center text-lg font-semibold text-ink transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-40";

export function ProductActions({ title, cta }: { title: string; cta: string }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="inline-flex w-fit items-center rounded-xl border border-line">
        <button
          type="button"
          aria-label="Decrease quantity"
          disabled={qty === 1}
          onClick={() => setQty((q) => q - 1)}
          className={step}
        >
          −
        </button>
        <span className="w-8 text-center text-sm font-semibold tabular-nums text-ink">{qty}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          disabled={qty === 20}
          onClick={() => setQty((q) => q + 1)}
          className={step}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() =>
          showToast(
            `${title} ${cta === "Add" ? "added" : "reserved"} successfully${qty > 1 ? ` (×${qty})` : ""}`,
          )
        }
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong sm:text-base"
      >
        {cta === "Add" ? "Add to Order" : cta}
        <Arrow className="size-4" />
      </button>
    </div>
  );
}
