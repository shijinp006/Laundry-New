"use client";

import { useState } from "react";
import Image from "next/image";
import { Arrow, Bed, Bolt, Leaf, Shirt } from "@/components/icons";
import type { Service } from "@/components/service-card";
import { showToast } from "@/components/toaster";

const icons = { shirt: Shirt, leaf: Leaf, bed: Bed, bolt: Bolt };
const PER_PAGE = 8;

const pageBtn =
  "grid size-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink";

export function ServicesCatalog({ services }: { services: Service[] }) {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(services.length / PER_PAGE);
  const visible = services.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const go = (p: number) => {
    setPage(p);
    // site uses Lenis smooth scrolling; fall back to native when it isn't running
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="catalog" className="scroll-mt-24">
      {/* two cards per row on mobile, 3 on tablet, 4 on desktop */}
      <ul
        key={page}
        className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
      >
        {visible.map((s, i) => {
          const Icon = icons[s.icon];
          return (
            <li
              key={s.title}
              style={{ animationDelay: `${i * 70}ms` }}
              className="animate-rise group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <span
                  className={`absolute left-2 top-2 z-10 max-w-[85%] truncate rounded-full px-2 py-0.5 text-[9px] font-semibold sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[10px] ${
                    s.featured ? "bg-brand text-white" : "bg-[#06192e]/90 text-brand"
                  }`}
                >
                  {s.badge}
                </span>
                <Image
                  src={s.image}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 sm:size-9">
                  <Icon className="size-3.5 sm:size-4" />
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-ink sm:mt-3 sm:text-base">
                  {s.title}
                </h3>
                <p className="mt-1 line-clamp-3 flex-1 text-[11px] leading-relaxed text-muted sm:text-xs">
                  {s.body}
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-t border-line/70 pt-2.5 sm:mt-4 sm:pt-3">
                  <p className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-ink sm:text-lg">{s.price}</span>
                    <span className="text-[10px] text-muted sm:text-[11px]">{s.unit}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        s.cta === "Add" ? `${s.title} added successfully` : `${s.title} reserved successfully`,
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-brand-strong sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    {s.cta}
                    <Arrow className="size-3 transition-transform group-hover:translate-x-0.5 sm:size-3.5" />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {pages > 1 && (
        <nav
          aria-label="Services pagination"
          className="mt-10 flex items-center justify-center gap-1.5 sm:gap-2"
        >
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className={pageBtn}
          >
            <Arrow className="size-4 rotate-180" />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
              className={`size-9 rounded-full text-sm font-semibold transition-colors ${
                p === page
                  ? "bg-brand text-white shadow-md shadow-brand/25"
                  : "border border-line text-ink hover:border-brand hover:text-brand"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page === pages}
            aria-label="Next page"
            className={pageBtn}
          >
            <Arrow className="size-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
