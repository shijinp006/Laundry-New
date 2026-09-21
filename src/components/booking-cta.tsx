import { sectionX } from "@/lib/layout";

export function BookingCta() {
  return (
    <section
      id="book"
      className={`relative isolate overflow-hidden border-t border-line/60 bg-band pt-10 md:pt-12 lg:pt-14 pb-16 text-center md:pb-20 lg:pb-24 ${sectionX}`}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(2,132,199,0.08),transparent_70%)]"
      />

      <h2
        data-aos="fade-up"
        className="text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl lg:text-4xl"
      >
        Ready for Fresh Laundry Without Lifting a Finger?
      </h2>
      <p
        data-aos="fade-up"
        data-aos-delay="80"
        className="mt-4 text-sm text-muted md:text-base"
      >
        Join 12,000+ satisfied households. First pickup gets $15 off
        automatically at checkout.
      </p>

      <div
        data-aos="zoom-in"
        data-aos-delay="160"
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
      >
        <a
          href="#top"
          className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-strong md:px-7 md:text-base"
        >
          Claim $15 Off First Pickup
        </a>
        <a
          href="#services"
          className="rounded-lg border border-line bg-white px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand hover:text-brand md:px-7 md:text-base"
        >
          View Service Areas
        </a>
      </div>
    </section>
  );
}
