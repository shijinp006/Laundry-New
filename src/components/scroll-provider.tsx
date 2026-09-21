"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProvider() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // 1. Initialize Lenis smooth scroll with customized exponential momentum physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });
    (window as any).__lenis = lenis;

    // Connect Lenis scroll updates directly to GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // 2. Cinematic Animations with GSAP ScrollTrigger
    const ctx = gsap.context(() => {
      // A. Text & Heading Line Reveals ([data-aos="fade-up"], [data-gsap="fade-up"])
      const fadeUpElements = document.querySelectorAll('[data-aos="fade-up"], [data-gsap="fade-up"]');
      fadeUpElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            y: 45,
            opacity: 0,
            scale: 0.98,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // B. Slide Right Elements ([data-aos="fade-right"], [data-gsap="fade-right"])
      const fadeRightElements = document.querySelectorAll('[data-aos="fade-right"], [data-gsap="fade-right"]');
      fadeRightElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            x: -45,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // C. Slide Left Elements ([data-aos="fade-left"], [data-gsap="fade-left"])
      const fadeLeftElements = document.querySelectorAll('[data-aos="fade-left"], [data-gsap="fade-left"]');
      fadeLeftElements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            x: 45,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // D. Cinematic Curtain Reveal for Images (.cinematic-image)
      const cinematicImages = document.querySelectorAll(".cinematic-image, .parallax-layer");
      cinematicImages.forEach((img) => {
        gsap.fromTo(
          img,
          {
            clipPath: "inset(10% 6% 10% 6% round 24px)",
            scale: 1.12,
            opacity: 0.85,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 24px)",
            scale: 1,
            opacity: 1,
            duration: 1.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // E. 3D Perspective Card Elevate (.cinematic-card)
      const cinematicCards = document.querySelectorAll(".cinematic-card, li[data-aos='fade-up']");
      cinematicCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 45,
            opacity: 0,
            rotateX: 6,
            scale: 0.96,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 1.0,
            delay: (index % 4) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
      delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
