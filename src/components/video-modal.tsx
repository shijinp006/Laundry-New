"use client";

import { useEffect } from "react";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
  description?: string;
};

export function VideoModal({ isOpen, onClose, videoId, title, description }: VideoModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-rise"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4 md:p-5">
          <div>
            <h3 id="video-modal-title" className="text-base font-semibold text-slate-900 md:text-lg">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-xs text-slate-500 md:text-sm">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close video"
          >
            ✕
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
