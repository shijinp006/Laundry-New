"use client";

import { useEffect, useState } from "react";

type Toast = { id: number; message: string };

const EVENT = "app:toast";
const DURATION = 2600;

/** Fire a toast from anywhere on the client: showToast("Added successfully"). */
export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: message }));
}

/** Mounted once in the root layout; renders the stack of active toasts. */
export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    let nextId = 0;
    const timers = new Set<ReturnType<typeof setTimeout>>();

    const onToast = (e: Event) => {
      const id = nextId++;
      const message = (e as CustomEvent<string>).detail;
      setToasts((t) => [...t.slice(-2), { id, message }]);
      const timer = setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
        timers.delete(timer);
      }, DURATION);
      timers.add(timer);
    };

    window.addEventListener(EVENT, onToast);
    return () => {
      window.removeEventListener(EVENT, onToast);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-6 z-[200] flex flex-col items-center gap-2 sm:bottom-8"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-rise pointer-events-auto flex max-w-full items-center gap-2.5 rounded-full bg-slate-900 py-2.5 pl-2.5 pr-5 text-sm font-semibold text-white shadow-xl shadow-slate-900/25"
        >
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="truncate">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
