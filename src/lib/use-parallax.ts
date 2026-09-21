"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven parallax: writes a `--parallax-y` CSS custom property onto
 * the returned element, ranging roughly -strength..strength px as the
 * element travels from below the viewport to above it. Pair it with
 * `translateY(var(--parallax-y, 0px))` in CSS.
 *
 * Listens to the native `scroll` event — Lenis scrolls the real window, so
 * this stays in sync with it for free without needing Lenis's own API.
 */
export function useParallax<T extends HTMLElement>(strength = 28) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const centerDelta = rect.top + rect.height / 2 - viewportH / 2;
      const progress = Math.max(-1, Math.min(1, centerDelta / viewportH));
      el.style.setProperty("--parallax-y", `${(progress * strength).toFixed(2)}px`);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return ref;
}
