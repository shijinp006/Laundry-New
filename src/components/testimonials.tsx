import { sectionX } from "@/lib/layout";
import { CheckCircle, Star } from "@/components/icons";

const reviews = [
  {
    quote:
      "Between 60-hour workweeks and a toddler, laundry was sinking my weekends. Wash Zone Laundry picks up Sunday evening and returns everything crisp by Monday night. Life saver!",
    name: "Sophia Thorne",
    role: "Tribeca · Weekly Subscriber",
  },
  {
    quote:
      "The solvent-free dry cleaning is magnificent. My bespoke tailored twills don't come back reeking of chemical fumes. Smells like subtle alpine cedar. Worth every cent.",
    name: "Marcus Sterling",
    role: "Brooklyn Heights · Dry Clean Pass",
  },
  {
    quote:
      "Our heavyweight down comforter was revitalized after just one month. Smelled immaculate and fluffed to perfection. The doorstep drivers are always punctual and polite.",
    name: "Elena Rodriguez",
    role: "Chelsea · Bedding Care",
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className={`border-t border-line/50 bg-band pt-10 md:pt-12 lg:pt-14 pb-16 md:pb-20 lg:pb-24 ${sectionX}`}
    >
      <p
        data-aos="fade-up"
        className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-brand md:text-xs"
      >
        Verified Stories
      </p>

      <div
        data-aos="fade-up"
        data-aos-delay="80"
        className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
      >
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
          Loved by Busy City Dwellers
        </h2>
        <p className="flex items-center gap-2.5">
          <span className="text-xl font-bold md:text-2xl">4.9</span>
          <span className="flex gap-0.5 text-brand" aria-label="4.9 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 md:size-[18px]" />
            ))}
          </span>
        </p>
      </div>

      <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {reviews.map((r, i) => (
          <li
            key={r.name}
            data-aos="zoom-in-up"
            data-aos-delay={i * 100}
            className="flex cursor-pointer flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-brand/60 md:p-6 md:last:col-span-2 lg:last:col-span-1"
          >
            <div className="flex gap-0.5 text-brand" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5" />
              ))}
            </div>

            <blockquote className="mt-4 flex-1 text-xs leading-relaxed text-muted md:text-sm">
              &ldquo;{r.quote}&rdquo;
            </blockquote>

            <div className="mt-5 flex items-end justify-between gap-3 border-t border-line/70 pt-4">
              <div>
                <p className="text-xs font-semibold md:text-sm">{r.name}</p>
                <p className="mt-0.5 text-[10px] text-muted md:text-[11px]">
                  {r.role}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand/15 px-2.5 py-1 text-[10px] font-semibold text-brand">
                <CheckCircle className="size-3" />
                Verified Client
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
