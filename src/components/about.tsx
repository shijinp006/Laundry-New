"use client";

import Image from "next/image";
import { sectionX } from "@/lib/layout";
import { Leaf } from "@/components/icons";
import { useParallax } from "@/lib/use-parallax";
import aboutPhoto from "@/assets/img/about-team.jpg";

const stats = [
  { value: "2019", label: "Year Founded" },
  { value: "12,000+", label: "Customers Served" },
  { value: "24h", label: "Avg. Turnaround" },
  { value: "4.9★", label: "Customer Rating" },
];

export function About() {
  const parallaxRef = useParallax<HTMLDivElement>(24);

  return (
    <section
      id="about"
      className={`border-t border-line/50 bg-band pt-10 md:pt-12 lg:pt-14 pb-16 md:pb-20 lg:pb-24 ${sectionX}`}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* copy */}
        <div data-aos="fade-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand md:text-[11px]">
            <Leaf className="size-3.5" />
            Our Story
          </span>

          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
            Started on a Laundromat Floor in 2019
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            Wash Zone Laundry began when our founder got tired of losing every
            Saturday to a coin laundromat three blocks from home. What
            started with a single scooter and ten regular customers has grown
            into a neighborhood-by-neighborhood network of eco-certified wash
            stations — but the promise hasn&apos;t changed: treat every load
            like it&apos;s our own.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            Today our crews run cold-water, hypoallergenic cycles across the
            city, seven days a week, still hand-checked before they ever
            reach your door.
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-card p-4 text-center md:p-5"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-xl font-bold tracking-tight text-brand md:text-2xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-[11px] text-muted md:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* media */}
        <div
          data-aos="fade-left"
          data-aos-delay="120"
          className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-card sm:aspect-[4/3]"
        >
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#06192e]/90 px-3 py-1.5 text-[10px] font-semibold text-brand backdrop-blur-sm md:left-4 md:top-4 md:text-[11px]">
            Meet the Team
          </span>

          {/* photo drifts slightly on scroll, and slowly zooms in place */}
          <div ref={parallaxRef} className="parallax-layer absolute inset-[-8%]">
            <Image
              src={aboutPhoto}
              alt="Three members of the Wash Zone Laundry team working together and laughing"
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
      </div>
    </section>
  );
}
