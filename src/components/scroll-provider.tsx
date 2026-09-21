"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import AOS from "aos";
import "lenis/dist/lenis.css";
import "aos/dist/aos.css";

/** Height of the sticky header, so anchor jumps do not land underneath it. */
const HEADER_OFFSET = -80;

export function ScrollProvider() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      offset: 90,
      once: false,
      mirror: true,
      disable: () => reduced.matches,
    });

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
      anchors: { offset: HEADER_OFFSET },
    });

    // Lenis scrolls the real window, so AOS keeps getting native scroll
    // events. It only needs a nudge once layout has settled.
    const refresh = () => AOS.refresh();
    window.addEventListener("load", refresh);
    const settle = window.setTimeout(refresh, 400);

    return () => {
      window.clearTimeout(settle);
      window.removeEventListener("load", refresh);
      lenis.destroy();
    };
  }, []);

  return null;
}
