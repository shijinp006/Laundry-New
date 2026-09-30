import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServicesCatalog } from "@/components/services-catalog";
import { allServices } from "@/lib/services-data";
import { sectionX } from "@/lib/layout";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Our Services — Wash Zone Laundry",
  description:
    "Wash & fold, eco dry cleaning, bedding spa and 12-hour express service with free pickup and delivery.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader solid />
      <main className="flex-1 bg-white">
        <section className={`pb-16 pt-28 md:pb-20 md:pt-32 lg:pb-24 lg:pt-36 ${sectionX}`}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand md:text-xs">
              Menu of Services
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
              Tailored Wardrobe Care
            </h1>
            <p className="mt-4 text-sm text-muted md:text-base">
              Engineered formulas and precision folding for every textile category —
              picked up at your door and returned within 24 hours.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <ServicesCatalog services={allServices} />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Arrow className="size-4 rotate-180" />
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
