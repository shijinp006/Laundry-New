"use client";

import { useState, useEffect } from "react";
import { sectionX } from "@/lib/layout";
import { Calendar, ChevronRight, HomeIcon, Leaf, LogoMark, PhoneIcon, Shirt } from "@/components/icons";
import { PickupDateModal } from "@/components/pickup-date-modal";

const navLinks = [
  { href: "#top", label: "Home", icon: HomeIcon },
  { href: "#about", label: "About", icon: Leaf },
  { href: "#services", label: "Services", icon: Shirt },
  { href: "#contact", label: "Contact", icon: PhoneIcon },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  // Lock body scroll when full-screen mobile nav modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

      // Check section currently in primary viewing area
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setOpen(false);

    if (href === "#top") {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(targetElement, { offset: -72, duration: 1.1 });
      } else {
        const headerHeight = 72;
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-0"
          : "bg-transparent py-2"
          }`}
      >
        <div
          className={`flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-[72px] ${sectionX}`}
        >
          {/* Animated Logo */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="group flex items-center gap-2 sm:gap-2.5 shrink-0"
          >
            <LogoMark className="size-8 sm:size-9 lg:size-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 text-brand" />
            <span className="flex flex-col leading-none">
              <span className={`text-xs font-bold tracking-tight sm:text-sm lg:text-base whitespace-nowrap transition-colors duration-300 ${scrolled ? "text-slate-900 group-hover:text-brand" : "text-white group-hover:text-brand"
                }`}>
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
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`group relative px-3 py-1 text-xs font-semibold transition-colors duration-300 lg:text-sm ${isActive
                    ? "text-brand"
                    : scrolled
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-slate-200 hover:text-white"
                    }`}
                >
                  <span>{link.label}</span>
                  {/* Underline indicator */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brand transition-all duration-300 ${isActive
                      ? "scale-x-100 opacity-100"
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
              className="group relative overflow-hidden grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-white font-semibold transition-all duration-300 hover:bg-brand-strong hover:shadow-md hover:scale-[1.03] active:scale-95 sm:inline-flex sm:size-auto sm:gap-2 sm:px-4 sm:py-2 md:px-5 md:py-2.5"
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
              className={`grid size-9 place-items-center rounded-lg border shrink-0 transition-colors lg:hidden ${scrolled
                ? "border-slate-200 text-slate-700 hover:border-brand hover:text-brand"
                : "border-white/25 text-white hover:border-white hover:bg-white/10"
                }`}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"
                    }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-current transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Modal Overlay */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[100] flex flex-col justify-between bg-slate-50/98 backdrop-blur-2xl px-6 pb-8 pt-4 transition-all duration-300 ease-in-out lg:hidden ${open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        {/* Modal Top Header Bar */}
        <div className="flex h-14 items-center justify-between border-b border-slate-200/80 pb-3">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="flex items-center gap-2"
          >
            <LogoMark className="size-8 text-brand" />
            <span className="text-sm font-bold tracking-tight text-slate-900">
              Wash Zone Laundry
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-200/60 hover:text-slate-800"
          >
            <span className="text-lg font-bold leading-none">✕</span>
          </button>
        </div>

        {/* Modal Navigation Links List */}
        <ul className="mt-4 mb-auto flex flex-col gap-1 overflow-y-auto py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-semibold transition-colors duration-200 ${isActive
                    ? "bg-brand/10 text-brand font-bold"
                    : "text-slate-900 hover:bg-slate-100/80"
                    }`}
                >
                  <span className="flex items-center gap-3.5">
                    <Icon className={`size-5 shrink-0 ${isActive ? "text-brand" : "text-slate-800"}`} />
                    <span>{link.label}</span>
                  </span>
                  <ChevronRight className={`size-4 shrink-0 ${isActive ? "text-brand" : "text-slate-800"}`} />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Modal Bottom CTA */}
        <div className="border-t border-slate-200/80 pt-4 flex flex-col gap-3 mt-auto">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setModalOpen(true);
            }}
            className="w-full rounded-2xl bg-brand py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-brand/25 transition-all hover:bg-brand-strong active:scale-95"
          >
            Schedule Pickup Now
          </button>
        </div>
      </div>

      <PickupDateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
