"use client";

import Image from "next/image";
import { sectionX } from "@/lib/layout";
import { CheckCircle, Sparkle } from "@/components/icons";
import { useParallax } from "@/lib/use-parallax";
import guaranteePhoto from "@/assets/img/guarantee-laundry-room.jpg";

const points = [
  {
    title: "Zero Color Bleeding Protocol",
    body: "Separated whites, lights, and darks into calibrated temperature cycles.",
  },
  {
    title: "Steam Pressed Finish",
    body: "Collars stay upright and lapels appear flatter than the day you bought it.",
  },
  {
    title: "Lost Sock Protection",
    body: "RFID garment tracking ensures 100% of your pieces make it back safe.",
  },
];

export function Guarantee() {
  const parallaxRef = useParallax<HTMLDivElement>(24);

  return (
    <section
      className={`border-t border-line/50 bg-band py-16 md:py-20 lg:py-24 ${sectionX}`}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* media */}
        <div
          data-aos="fade-right"
          className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-card sm:aspect-[4/3]"
        >
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#06192e]/90 px-3 py-1.5 text-[10px] font-semibold text-brand backdrop-blur-sm md:left-4 md:top-4 md:text-[11px]">
            <Sparkle className="size-3.5" />
            Egyptian Cotton Standard
          </span>

          {/* photo drifts slightly on scroll, and slowly zooms in place */}
          <div ref={parallaxRef} className="parallax-layer absolute inset-[-8%]">
            <Image
              src={guaranteePhoto}
              alt="A tidy laundry room with a washing machine, woven baskets, and a shelf of folded towels"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="animate-kenburns object-cover"
            />
          </div>

          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-navy/10"
          />
        </div>

        {/* copy */}
        <div data-aos="fade-left" data-aos-delay="120">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand md:text-[11px]">
            The FreshFold Guarantee
          </span>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
            Treated with Pure Mountain Water &amp; Plant-Powered Care
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            Conventional laundromats mix loads and use harsh synthetic optical
            brighteners. At Wash Zone Laundry, your garments are laundered in
            isolated, dedicated drums using cold-filtered water and certified
            hypoallergenic plant enzymes.
          </p>

          <ul className="mt-7 flex flex-col gap-4 md:gap-5">
            {points.map((p) => (
              <li key={p.title} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-brand" />
                <p className="text-xs leading-relaxed text-muted md:text-sm">
                  <strong className="font-semibold text-ink">{p.title}:</strong>{" "}
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
