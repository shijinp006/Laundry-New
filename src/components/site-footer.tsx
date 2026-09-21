import { sectionX } from "@/lib/layout";
import { LogoMark } from "@/components/icons";

const columns = [
  {
    title: "Services",
    links: ["Wash & Fold", "Dry Clean", "Bedding Care", "Express 24h"],
  },
  {
    title: "Company",
    links: ["About Us", "Pricing Guide", "Coverage Areas", "Sustainability"],
  },
  {
    title: "Support",
    links: ["FAQs", "Privacy Policy", "Terms of Service", "Contact Support"],
  },
];

const socials = [
  { label: "Twitter", path: "M20 6.4a6.6 6.6 0 0 1-1.9.5 3.3 3.3 0 0 0 1.4-1.8c-.6.4-1.3.7-2.1.9a3.3 3.3 0 0 0-5.6 3A9.4 9.4 0 0 1 5 5.5a3.3 3.3 0 0 0 1 4.4c-.5 0-1-.2-1.5-.4a3.3 3.3 0 0 0 2.6 3.3c-.5.1-1 .2-1.5 0a3.3 3.3 0 0 0 3 2.3A6.6 6.6 0 0 1 4 16.5a9.3 9.3 0 0 0 14.3-8.3c.7-.5 1.2-1.1 1.7-1.8Z" },
  { label: "Instagram", path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm4 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5-1.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
  { label: "Facebook", path: "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.7V4.4A22 22 0 0 0 14.3 4c-2.4 0-4 1.5-4 4.2v2.3H7.7v3h2.6V21h3.2Z" },
  { label: "LinkedIn", path: "M5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.3 9h3.4v11.5H3.3V9Zm6 0h3.3v1.6h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.3 4.3 5.4v6.3h-3.4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9Z" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className={`bg-deep pb-6 pt-10 md:pt-12 lg:pt-14 ${sectionX}`}>
      <div
        data-aos="fade-up"
        className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:gap-10 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))]"
      >
        <div className="col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <LogoMark className="size-9 text-brand" />
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-white md:text-base">
                Wash Zone Laundry
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-brand">
                Clean · Green · Premium
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-prose text-xs leading-relaxed text-slate-300 md:text-sm">
            Elevating modern wardrobe wellness. Eco-friendly cleaning,
            professional fold quality, and zero-friction scheduling from your
            smartphone.
          </p>
          <ul className="mt-5 flex gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href="#"
                  aria-label={s.label}
                  className="grid size-8 place-items-center rounded-lg border border-slate-700 text-slate-300 transition-colors hover:border-brand hover:text-brand"
                >
                  <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white md:text-sm">
              {col.title}
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xs text-slate-300 transition-colors hover:text-brand md:text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white md:text-sm">
            Service Hours
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-xs text-slate-300 md:text-sm">
            <li>Mon – Sat: 7am – 10pm</li>
            <li>Sunday: 8am – 8pm</li>
            <li className="pt-1">
              <a href="tel:+18005553737" className="font-semibold text-brand">
                Toll Free: 1-800-555-FRESH
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] text-slate-400 md:text-xs">
          © {new Date().getFullYear()} Wash Zone Laundry Inc. All rights
          reserved. Pristine garment wellness.
        </p>
        <p className="flex gap-5 text-[11px] text-slate-400 md:text-xs">
          <a href="#" className="transition-colors hover:text-brand">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-brand">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}
