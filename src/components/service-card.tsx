import Image, { type StaticImageData } from "next/image";
import { Arrow, Bed, Bolt, Leaf, Shirt } from "@/components/icons";

// A component reference can't cross the server -> client prop boundary
// (ServicesCarousel is "use client"), so services carry a serializable key
// instead and each card resolves it to the actual icon locally.
const iconMap = { shirt: Shirt, leaf: Leaf, bed: Bed, bolt: Bolt };
export type IconKey = keyof typeof iconMap;

export type Service = {
  icon: IconKey;
  image: StaticImageData;
  title: string;
  badge: string;
  body: string;
  price: string;
  unit: string;
  cta: string;
  featured: boolean;
};

type ServiceCardProps = {
  service: Service;
  /** Mobile carousel: renders a plain stacked photo + card body instead of the hover-reveal overlay. */
  revealed?: boolean;
  /** Card priority for LCP — set on the first visible card only. */
  priority?: boolean;
};

export function ServiceCard({ service, revealed = false, priority = false }: ServiceCardProps) {
  return revealed ? (
    <StackedCard service={service} priority={priority} />
  ) : (
    <HoverRevealCard service={service} priority={priority} />
  );
}

/** Mobile carousel: photo on top, plain solid card body below with subtle hover micro-interactions. */
function StackedCard({ service, priority }: { service: Service; priority: boolean }) {
  const Icon = iconMap[service.icon];

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card border border-line/80 shadow-md transition-all duration-500 hover:shadow-xl hover:border-brand/40 hover:-translate-y-1">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        {/* Shimmer light beam sweep on hover */}
        <div aria-hidden className="absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

        <Image
          src={service.image}
          alt=""
          fill
          priority={priority}
          placeholder="blur"
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
          <Icon className="size-4" />
        </span>

        <h3 className="mt-3 text-base font-semibold text-ink group-hover:text-brand transition-colors">{service.title}</h3>

        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">{service.body}</p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line/70 pt-3">
          <p className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-ink">{service.price}</span>
            <span className="text-[11px] text-muted">{service.unit}</span>
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-brand-strong hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          >
            <span>{service.cta}</span>
            <Arrow className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Tablet / desktop grid: interactive 3D photo card with smooth image zoom, light beam sweep, and glass detail panel reveal. */
function HoverRevealCard({ service, priority }: { service: Service; priority: boolean }) {
  const Icon = iconMap[service.icon];

  return (
    <div
      tabIndex={0}
      className="group relative isolate aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-lg outline-none transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-brand/60 hover:shadow-[0_20px_45px_-12px_rgba(2,132,199,0.45)] focus-visible:ring-2 focus-visible:ring-brand"
    >
      {/* Shimmer light beam sweep on hover */}
      <div
        aria-hidden
        className="absolute inset-0 z-30 pointer-events-none -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full"
      />

      {/* photo with smooth slow zoom & color enhancement */}
      <Image
        src={service.image}
        alt=""
        fill
        priority={priority}
        placeholder="blur"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-115 group-hover:brightness-110 group-hover:contrast-[1.05] group-focus-visible:scale-115"
      />

      {/* base scrim + compact label, visible before reveal */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-0"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 p-4 transition-opacity duration-300 group-hover:opacity-0">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand/20 text-brand backdrop-blur-md border border-brand/30 transition-transform duration-300 group-hover:scale-110">
          <Icon className="size-4" />
        </span>
        <h3 className="text-sm font-semibold text-white md:text-base drop-shadow-md">{service.title}</h3>
      </div>

      {/* glass detail panel — slides up gracefully from the bottom on hover/focus */}
      <div
        className="absolute inset-0 z-20 flex translate-y-full flex-col justify-end bg-gradient-to-t from-slate-950/95 via-brand/80 to-brand/35 p-4 backdrop-blur-[3px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 md:p-5"
      >
        <div className="flex translate-y-3 flex-col opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:delay-100">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/20 text-white backdrop-blur-md shadow-inner md:size-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <Icon className="size-4 md:size-5" />
          </span>

          <h3 className="mt-3 text-base font-bold text-white md:text-lg tracking-tight">
            {service.title}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-white/90 md:text-sm">
            {service.body}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/25 pt-3">
            <p className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-white md:text-2xl drop-shadow-sm">
                {service.price}
              </span>
              <span className="text-[11px] font-medium text-white/80">{service.unit}</span>
            </p>
            <button
              type="button"
              className="group/btn inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-[#06213c] shadow-lg transition-all duration-300 hover:bg-slate-100 hover:scale-105 active:scale-95 md:text-sm"
            >
              <span>{service.cta}</span>
              <Arrow className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
