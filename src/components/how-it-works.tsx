"use client";

import { useRef, useState, type ComponentType } from "react";
import { sectionX } from "@/lib/layout";
import { Arrow, Calendar, Play, Sparkle, Truck } from "@/components/icons";
import { VideoModal } from "@/components/video-modal";
import { useInView } from "@/lib/use-in-view";
import { useMediaQuery } from "@/lib/use-media-query";
import { useYouTubeLoop } from "@/lib/use-youtube-loop";

// Each step links to its own real, embeddable animated explainer matched
// to that part of the process, rather than reusing one clip for all three.
const PREVIEW_LOOP_SECONDS = 3;

type Step = {
  n: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  link: string;
  videoId: string;
};

const steps: Step[] = [
  {
    n: "1",
    icon: Calendar,
    title: "Bag & Schedule",
    body: "Place garments in any bag or our reusable hampers. Select your preferred 1-hour window and leave doorstep notes.",
    link: "Contactless Hand-off",
    videoId: "oLUrAKdG8SM", // "Online Laundry Platform Explainer Video" (animated)
  },
  {
    n: "2",
    icon: Sparkle,
    title: "Expert Wash & Care",
    body: "Items are barcoded, inspected for stains, washed with hypoallergenic detergents, and folded with laser precision.",
    link: "Eco-Enzyme Detergents",
    videoId: "Kc_4YxNjHVQ", // "How washing machines work (Simple explanation with Animation)"
  },
  {
    n: "3",
    icon: Truck,
    title: "Pristine Delivery",
    body: "Arrives neatly packaged in breathable protective bundles within 24 hours, ready to slip straight into your closet.",
    link: "Live Driver ETA List",
    videoId: "asdXMSUtkH0", // "Laundry Pickup and Delivery" whiteboard animation
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const active = activeStep !== null ? steps[activeStep] : null;

  return (
    <section
      id="how"
      className={`border-t border-line/50 bg-band py-16 md:py-20 lg:py-24 ${sectionX}`}
    >
      <div className="text-center" data-aos="fade-up">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand md:text-xs">
          Predictable Precision
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          How It Works in 3 Steps
        </h2>
        <p className="mt-3 text-sm text-muted md:text-base">
          Zero-contact, reliable timeframes, and real-time sms notifications.
        </p>
      </div>

      <ol className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {steps.map((s, i) => (
          <StepCard key={s.n} step={s} index={i} onWatch={() => setActiveStep(i)} />
        ))}
      </ol>

      <VideoModal
        isOpen={active !== null}
        onClose={() => setActiveStep(null)}
        videoId={active?.videoId ?? ""}
        title={active ? `${active.n}. ${active.title}` : ""}
        description={active?.body}
      />
    </section>
  );
}

function StepCard({ step, index, onWatch }: { step: Step; index: number; onWatch: () => void }) {
  const Icon = step.icon;
  const { ref, inView } = useInView<HTMLButtonElement>();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const playerHostRef = useRef<HTMLDivElement | null>(null);

  const showPreview = inView && !reducedMotion;
  useYouTubeLoop(playerHostRef, step.videoId, showPreview, PREVIEW_LOOP_SECONDS);

  return (
    <li
      data-aos="fade-up"
      data-aos-delay={index * 120}
      className="flex cursor-pointer flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brand/60 md:p-6 lg:p-7 md:last:col-span-2 lg:last:col-span-1"
    >
      <button
        ref={ref}
        type="button"
        onClick={onWatch}
        aria-label={`Watch how ${step.title.toLowerCase()} works`}
        className="group/video relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-line/70 bg-gradient-to-br from-brand-soft to-card-deep outline-none focus-visible:border-brand"
      >
        {showPreview && (
          // YT.Player replaces its target element with its own <iframe>, so
          // sizing/interactivity is applied here (to a persistent wrapper
          // that survives the swap) rather than on the placeholder itself.
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:scale-[1.4]"
          >
            <div ref={playerHostRef} />
          </div>
        )}
        {!showPreview && (
          <Icon
            aria-hidden
            className="absolute -bottom-4 -right-4 size-24 text-brand/10 transition-transform duration-500 group-hover/video:scale-110"
          />
        )}

        {/* scrim keeps the play button and label legible over the live footage */}
        <div
          aria-hidden
          className="absolute inset-0 bg-navy/35 transition-colors group-hover/video:bg-navy/15"
        />

        <span className="relative z-10 grid size-12 place-items-center rounded-full bg-white text-[#06213c] shadow-lg transition-transform duration-300 group-hover/video:scale-110">
          <Play className="size-5 translate-x-0.5" />
        </span>
        <span className="absolute bottom-2 right-2 z-10 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          Watch
        </span>
      </button>

      <span className="mt-5 grid size-7 place-items-center rounded-full border border-brand/50 text-[11px] font-bold text-brand">
        {step.n}
      </span>
      <h3 className="mt-4 text-base font-semibold md:text-lg">{step.title}</h3>
      <p className="mt-2.5 flex-1 text-xs leading-relaxed text-muted md:text-sm">
        {step.body}
      </p>
      <a
        href="#book"
        className="mt-5 flex items-center justify-between gap-3 border-t border-line/70 pt-4 text-xs font-medium text-brand transition-colors hover:text-brand-strong md:text-sm"
      >
        {step.link}
        <Arrow className="size-4" />
      </a>
    </li>
  );
}
