import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import waveBg from "@/assets/img/hero-wave-bg.jpg";

// Two copies of the same hump, side by side (viewBox is 2x the tile width) —
// translating the whole thing by -50% loops it seamlessly.
const WAVE_PATH =
  "M0 30 C 80 55, 160 5, 240 30 C 320 55, 400 5, 480 30 C 560 55, 640 5, 720 30 " +
  "C 800 55, 880 5, 960 30 C 1040 55, 1120 5, 1200 30 C 1280 55, 1360 5, 1440 30 " +
  "C 1520 55, 1600 5, 1680 30 C 1760 55, 1840 5, 1920 30 L1920 60 L0 60 Z";

/**
 * Glass panel with a photo behind it. A liquid layer sits on top of the
 * frosted glass (not behind it, so the blur doesn't smear it into mush):
 * on mount it fills the panel and sloshes, then drains down (gravity
 * ease-in) to a shallow, still-waving puddle at the bottom, staying under
 * the heading text the whole time.
 */
export function LiquidGlassHeading({ children }: { children: ReactNode }) {
  const liquidStyle = { "--liquid-rest": "22%" } as CSSProperties;

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-white/15 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.75)]">
      {/* blue-toned background photo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={waveBg}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand/50 via-navy/60 to-navy/85 mix-blend-multiply"
        />
      </div>

      {/* frosted glass surface — blurs the photo underneath it */}
      <div className="absolute inset-0 bg-navy/20 backdrop-blur-lg" />

      {/* liquid: rendered on top of the blur (stays crisp), full + sloshing
          on load, then drains to a resting puddle */}
      <div
        aria-hidden
        style={liquidStyle}
        className="liquid-level absolute inset-x-0 bottom-0 z-10 overflow-hidden"
      >
        <div className="absolute inset-0 top-4 bg-gradient-to-b from-brand/70 to-brand-strong/35 md:top-5" />
        <svg
          className="liquid-wave absolute -top-4 left-0 h-8 w-[200%] text-brand/75 md:-top-5 md:h-10"
          viewBox="0 0 1920 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d={WAVE_PATH} />
        </svg>
        <svg
          className="liquid-wave-slow absolute -top-2 left-0 h-6 w-[200%] text-white/25 md:-top-2.5 md:h-7"
          viewBox="0 0 1920 60"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d={WAVE_PATH} />
        </svg>
      </div>

      {/* heading, always on top */}
      <div className="relative z-20 px-5 py-7 md:px-9 md:py-10">{children}</div>
    </div>
  );
}
