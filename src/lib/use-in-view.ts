"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/**
 * True once the element has scrolled into (or near) the viewport. Fires
 * once and stops observing — used to lazy-mount things like autoplaying
 * video previews instead of loading them all on page load.
 */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  // Environments without IntersectionObserver just show the content.
  const seenRef = useRef(typeof IntersectionObserver === "undefined");

  const subscribe = useCallback(
    (onChange: () => void) => {
      const el = ref.current;
      if (!el || seenRef.current) return () => {};

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            seenRef.current = true;
            onChange();
            observer.disconnect();
          }
        },
        { rootMargin },
      );
      observer.observe(el);
      return () => observer.disconnect();
    },
    [rootMargin],
  );

  const getSnapshot = useCallback(() => seenRef.current, []);
  const getServerSnapshot = useCallback(() => false, []);

  const inView = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { ref, inView };
}
