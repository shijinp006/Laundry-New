import Link from "next/link";
import { sectionX } from "@/lib/layout";
import { ServiceCard } from "@/components/service-card";
import { ServicesCarousel } from "@/components/services-carousel";
import { services } from "@/lib/services-data";
import { Arrow } from "@/components/icons";

export function Services() {
  return (
    <section
      id="services"
      className={`bg-band pt-10 md:pt-12 lg:pt-14 pb-16 md:pb-20 lg:pb-24 ${sectionX}`}
    >
      <div className="text-center" data-aos="fade-up">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand md:text-xs">
          Menu of Services
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Tailored Wardrobe Care
        </h2>
        <p className="mt-3 text-sm text-muted md:text-base">
          Engineered formulas and precision folding for every textile category.
        </p>
      </div>

      {/* mobile: one card at a time, auto-advancing + swipe/arrow/dot controls */}
      <div className="mt-10 sm:hidden" data-aos="fade-up" data-aos-delay="100">
        <ServicesCarousel services={services} />
      </div>

      {/* tablet / desktop: full grid, hover to reveal detail */}
      <ul className="mt-10 hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-4 lg:gap-6">
        {services.map((service, i) => (
          <li
            key={service.title}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center md:mt-12" data-aos="fade-up">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong md:text-base"
        >
          View Services
          <Arrow className="size-4" />
        </Link>
      </div>
    </section>
  );
}
