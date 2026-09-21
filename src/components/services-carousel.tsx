"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ServiceCard, type Service } from "@/components/service-card";

const AUTOPLAY_MS = 4500;
const RESUME_AFTER_MS = 6000;

export function ServicesCarousel({ services }: { services: Service[] }) {
  const count = services.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const resumeTimer = useRef<number | undefined>(undefined);

  // Autoplay only costs a frame (re-render + transform transition) while the
  // carousel is actually on screen, so it never competes with page scroll
  // elsewhere.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const pauseThenResume = useCallback(() => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  }, []);

  const manualGoTo = useCallback(
    (next: number) => {
      goTo(next);
      pauseThenResume();
    },
    [goTo, pauseThenResume],
  );

  // autoplay
  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, inView, count]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    manualGoTo(delta < 0 ? index + 1 : index - 1);
  };

  return (
    <div className="relative" ref={rootRef}>
      <div
        className="overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {services.map((service, i) => (
            <div key={service.title} className="w-full shrink-0">
              <ServiceCard service={service} revealed priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/next arrows are intentionally omitted on this mobile-only
          carousel — dots plus swipe are the manual controls here. */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {services.map((service, i) => (
          <button
            key={service.title}
            type="button"
            onClick={() => manualGoTo(i)}
            aria-label={`Go to ${service.title}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-brand" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
