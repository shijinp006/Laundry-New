import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductActions } from "@/components/product-actions";
import { Arrow } from "@/components/icons";
import { allServices, getService, slugify } from "@/lib/services-data";
import { sectionX } from "@/lib/layout";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: slugify(s.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  return service
    ? { title: `${service.title} — Wash Zone`, description: service.body }
    : { title: "Service not found — Wash Zone" };
}

const perks = ["Free pickup & delivery", "Hypoallergenic detergents", "Ready within 24 hours"];

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const related = allServices.filter((s) => s.title !== service.title).slice(0, 4);

  return (
    <>
      <SiteHeader solid />
      <main className="flex-1 bg-white">
        <section className={`pb-12 pt-24 md:pb-16 md:pt-28 lg:pt-32 ${sectionX}`}>
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted md:text-sm">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-brand"
            >
              <Arrow className="size-3.5 rotate-180" />
              All Services
            </Link>
          </nav>

          <div className="grid gap-8 md:grid-cols-2 md:items-center lg:gap-14">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-sm md:aspect-square lg:aspect-[4/3]">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-brand">{service.price}</span>
                <span className="text-sm text-muted">{service.unit}</span>
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">{service.body}</p>

              <ul className="mt-6 space-y-2.5">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <ProductActions title={service.title} cta={service.cta} />
              </div>
            </div>
          </div>
        </section>

        <section className={`border-t border-line pb-16 pt-10 md:pb-20 lg:pb-24 ${sectionX}`}>
          <h2 className="text-xl font-bold text-ink md:text-2xl">You may also like</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {related.map((s) => (
              <li key={s.title}>
                <Link
                  href={`/services/${slugify(s.title)}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <h3 className="text-sm font-semibold text-ink sm:text-base">{s.title}</h3>
                    <p className="mt-auto pt-1 text-sm font-bold text-brand">
                      {s.price}{" "}
                      <span className="text-[11px] font-normal text-muted">{s.unit}</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
