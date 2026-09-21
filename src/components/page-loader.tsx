"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/icons";

// Minimum time the loader stays visible so it never just flashes on fast
// loads, and a hard cap so a slow `load` event can't strand it forever.
const MIN_VISIBLE_MS = 500;
const MAX_VISIBLE_MS = 3000;

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const mountedAt = Date.now();
    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      const elapsed = Date.now() - mountedAt;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setFadingOut(true);
        window.setTimeout(() => setVisible(false), 400);
      }, remaining);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss);
    }
    const safety = window.setTimeout(dismiss, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-slate-950 transition-opacity duration-[400ms] ease-out ${fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute size-16 animate-spin rounded-full border-2 border-white/15 border-t-brand" />
        <LogoMark className="size-9" />
      </div>
      <span className="font-display text-sm uppercase tracking-[0.2em] text-white/80">
        Wash Zone Laundry
      </span>
    </div>
  );
}
