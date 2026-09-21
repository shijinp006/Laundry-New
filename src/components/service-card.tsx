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

/** Mobile carousel: photo on top, plain solid card body below — no overlay, no arrows needed here. */
function StackedCard({ service, priority }: { service: Service; priority: boolean }) {
  const Icon = iconMap[service.icon];

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-card"
    >
      <div className="relative aspect-[16/10] shrink-0">
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
            service.featured ? "bg-brand text-[#06213c]" : "bg-[#06192e]/90 text-brand"
          }`}
        >
          {service.badge}
        </span>
        <Image
          src={service.image}
          alt=""
          fill
          priority={priority}
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand">
          <Icon className="size-4" />
        </span>

        <h3 className="mt-3 text-base font-semibold text-ink">{service.title}</h3>

        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted">{service.body}</p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line/70 pt-3">
          <p className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-ink">{service.price}</span>
            <span className="text-[11px] text-muted">{service.unit}</span>
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-[#06213c] transition-colors hover:bg-brand-strong"
          >
            {service.cta}
            <Arrow className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Tablet / desktop grid: photo card with a blue detail panel that slides up on hover/focus. */
function HoverRevealCard({ service, priority }: { service: Service; priority: boolean }) {
  const Icon = iconMap[service.icon];

  return (
    <div
      tabIndex={0}
      className="group relative isolate aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl outline-none"
    >
      {/* badge — always on top, identifies the card before any reveal */}
      <span
        className={`absolute left-3 top-3 z-30 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
          service.featured ? "bg-brand text-[#06213c]" : "bg-[#06192e]/90 text-brand"
        }`}
      >
        {service.badge}
      </span>

      {/* photo, slow zoom on reveal */}
      <Image
        src={service.image}
        alt=""
        fill
        priority={priority}
        placeholder="blur"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-focus-visible:scale-110"
      />

      {/* base scrim + compact label, visible before reveal */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-2.5 p-4">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand/20 text-brand backdrop-blur-sm">
          <Icon className="size-4" />
        </span>
        <h3 className="text-sm font-semibold text-ink md:text-base">{service.title}</h3>
      </div>

      {/* detail panel — slides up from the bottom on hover/focus */}
      <div
        className="absolute inset-0 z-20 flex translate-y-full flex-col justify-end bg-gradient-to-t from-[#06192e]/95 via-brand/75 to-brand/35 p-4 backdrop-blur-[2px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 md:p-5"
      >
        <div className="flex translate-y-2 flex-col opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:delay-150">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/15 text-white md:size-10">
            <Icon className="size-4 md:size-5" />
          </span>

          <h3 className="mt-3 text-base font-semibold text-white md:text-lg">
            {service.title}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-white/85 md:text-sm">
            {service.body}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/25 pt-3">
            <p className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-white md:text-xl">
                {service.price}
              </span>
              <span className="text-[11px] text-white/75">{service.unit}</span>
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#06213c] transition-colors hover:bg-white/90 md:text-sm"
            >
              {service.cta}
              <Arrow className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
