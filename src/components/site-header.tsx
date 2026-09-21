"use client";

import { useState, useEffect } from "react";
import { sectionX } from "@/lib/layout";
import { Calendar, LogoMark } from "@/components/icons";
import { PickupDateModal } from "@/components/pickup-date-modal";

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#how", label: "How It Works" },
  { href: "#calculator", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 80;

      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      // Check section currently in the primary view zone (35% of viewport height)
      const viewTarget = window.scrollY + window.innerHeight * 0.35;
      let currentSection = sections[0];

      for (let i = 0; i < sections.length; i++) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (viewTarget >= top) {
            currentSection = sections[i];
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-navy/90 backdrop-blur-md border-b border-line/60 shadow-lg shadow-black/30 py-0"
            : "bg-transparent backdrop-blur-sm border-b border-transparent py-1"
        }`}
      >
        <div
          className={`flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-[72px] ${sectionX}`}
        >
          {/* Animated Logo */}
          <a href="#top" className="group flex items-center gap-2 sm:gap-2.5 shrink-0">
            <LogoMark className="size-8 sm:size-9 lg:size-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 text-brand" />
            <span className="flex flex-col leading-none">
              <span className="text-xs font-bold tracking-tight sm:text-sm lg:text-base whitespace-nowrap transition-colors duration-300 group-hover:text-brand">
                Wash Zone Laundry
              </span>
              <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-brand sm:mt-1 sm:text-[9px] sm:tracking-[0.18em] lg:text-[10px] whitespace-nowrap">
                Clean · Green · Premium
              </span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-1.5 text-xs font-medium transition-all duration-300 rounded-full lg:text-sm ${
                    isActive
                      ? "text-brand font-semibold bg-brand/15 shadow-[0_0_18px_rgba(78,168,245,0.2)] scale-[1.03]"
                      : "text-muted hover:text-ink hover:bg-white/[0.06] hover:scale-[1.02]"
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Glowing underline indicator */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-brand via-brand-strong to-brand transition-all duration-300 ${
                      isActive
                        ? "scale-x-100 opacity-100 shadow-[0_0_8px_#4ea8f5]"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-label="Schedule pickup"
              className="group relative overflow-hidden grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-[#06213c] font-semibold transition-all duration-300 hover:bg-brand-strong hover:shadow-[0_0_20px_rgba(78,168,245,0.4)] hover:scale-[1.03] active:scale-95 sm:inline-flex sm:size-auto sm:gap-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5"
            >
              <span className="relative z-10 hidden text-xs whitespace-nowrap sm:inline md:text-sm">
                Schedule Pickup
              </span>
              <Calendar className="relative z-10 size-4 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              {/* Button shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-lg border border-line shrink-0 transition-colors hover:border-brand lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Animated Mobile Nav Drawer */}
        <div
          id="mobile-nav"
          className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            open
              ? "max-h-96 opacity-100 border-t border-line bg-navy/95 backdrop-blur-lg pb-4 pt-1"
              : "max-h-0 opacity-0"
          } ${sectionX}`}
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line/70 py-3.5 text-base font-medium transition-colors duration-200 last:border-0 ${
                      isActive ? "text-brand font-semibold" : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="pt-3 md:hidden">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setModalOpen(true);
                }}
                className="w-full rounded-lg border border-line py-2.5 text-center text-sm font-medium text-brand transition-colors hover:border-brand"
              >
                Select Pick Up Date
              </button>
            </li>
          </ul>
        </div>
      </header>

      <PickupDateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
