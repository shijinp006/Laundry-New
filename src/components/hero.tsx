"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sectionX } from "@/lib/layout";

const HERO_VIDEO_SRC = "/video/new%20video%20.MOV";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const lineThreeRef = useRef<HTMLSpanElement>(null);
  const lineFourRef = useRef<HTMLSpanElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Lazy-load the hero video: only fetch it once the hero is about to enter
  // the viewport, instead of blocking the initial page load.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(HERO_VIDEO_SRC);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoSrc) return;
    for (const ref of [mobileVideoRef, desktopVideoRef]) {
      const video = ref.current;
      if (!video) continue;
      video.load();
      video.play().catch(() => { });
    }
  }, [videoSrc]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic curtain-reveal entrance for each headline line on load
      const lineRefs = [lineOneRef, lineTwoRef, lineThreeRef, lineFourRef];
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      lineRefs.forEach((ref, index) => {
        tl.fromTo(
          ref.current,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.0 },
          index === 0 ? undefined : "-=0.8",
        );
      });

      // Scroll-linked parallax drift + zoom on the background video
      gsap.to(videoWrapRef.current, {
        yPercent: 18,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className={`relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-slate-50 py-10 pb-20 lg:justify-center lg:pb-10 ${sectionX}`}
    >
      {/* Full-bleed background video container for section */}
      <div ref={videoWrapRef} aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
        {/* Mobile Video (< lg) */}
        <video
          ref={mobileVideoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/video/hero-bg-poster.webp"
          className="size-full object-cover lg:hidden"
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>

        {/* Desktop Background Video (>= lg) */}
        <video
          ref={desktopVideoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/video/hero-bg-poster.webp"
          className="hidden size-full object-cover lg:block"
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
      </div>

      {/* Backdrop Scrim / Overlay gradient to ensure text readability */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/35 lg:from-slate-950/80 lg:via-slate-950/55 lg:to-slate-950/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_15%_0%,rgba(2,132,199,0.18),transparent_70%)]"
      />

      {/* Content container */}
      <div className="relative z-10 max-w-2xl lg:max-w-3xl">
        <h1 className="font-display text-[2.1rem] font-bold uppercase leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.4rem] xl:text-6xl">
          <span className="block overflow-hidden">
            <span ref={lineOneRef} className="glass-text block">
              Effortless Laundry
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={lineTwoRef} className="glass-text block">
              &amp; Dry Cleaning
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={lineThreeRef} className="glass-text-brand block">
              Delivered to
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={lineFourRef} className="glass-text-brand block">
              Your Door
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
