"use client";

import { useState } from "react";
import { Calendar, CheckCircle } from "@/components/icons";

type PickupDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PickupDateModal({ isOpen, onClose }: PickupDateModalProps) {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const inTwoDays = new Date(today);
  inTwoDays.setDate(today.getDate() + 2);
  const inTwoDaysStr = inTwoDays.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(tomorrowStr);
  const [selectedTime, setSelectedTime] = useState("8:00 AM - 11:00 AM");
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 1800);
  };

  const formatDateLabel = (dateStr: string) => {
    if (dateStr === todayStr) return "Today";
    if (dateStr === tomorrowStr) return "Tomorrow";
    if (dateStr === inTwoDaysStr) return "In 2 Days";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-rise"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pickup-modal-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-navy p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-ink"
          aria-label="Close modal"
        >
          ✕
        </button>

        {confirmed ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="size-14 text-brand animate-float" />
            <h3 className="mt-4 text-xl font-bold text-ink">Pickup Date Scheduled!</h3>
            <p className="mt-2 text-sm text-muted">
              We&apos;ve reserved your pickup for{" "}
              <strong className="text-brand">{formatDateLabel(selectedDate)}</strong> ({selectedTime}).
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="flex flex-col gap-5">
            <div className="flex items-center gap-3 border-b border-line/60 pb-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand/20 text-brand">
                <Calendar className="size-5" />
              </span>
              <div>
                <h3 id="pickup-modal-title" className="text-lg font-bold text-ink">
                  Select Pick Up Date
                </h3>
                <p className="text-xs text-muted">Choose your preferred pickup day &amp; slot</p>
              </div>
            </div>

            {/* Quick date chips */}
            <div>
              <label className="text-xs font-semibold text-muted">Quick Options</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {[
                  { label: "Today", value: todayStr },
                  { label: "Tomorrow", value: tomorrowStr },
                  { label: "+2 Days", value: inTwoDaysStr },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setSelectedDate(item.value)}
                    className={`rounded-xl py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border ${
                      selectedDate === item.value
                        ? "border-brand bg-brand text-[#06213c]"
                        : "border-line bg-card text-muted hover:border-brand/60 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar input field */}
            <div>
              <label htmlFor="modal-date-picker" className="text-xs font-semibold text-muted">
                Pick Up Date
              </label>
              <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-line bg-card px-3.5 py-2.5">
                <Calendar className="size-4 shrink-0 text-brand" />
                <input
                  id="modal-date-picker"
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent text-sm text-ink outline-none"
                />
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="text-xs font-semibold text-muted">Preferred Time Window</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  "8:00 AM - 11:00 AM",
                  "11:00 AM - 2:00 PM",
                  "2:00 PM - 5:00 PM",
                  "5:00 PM - 8:00 PM",
                ].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`rounded-xl px-3 py-2 text-[11px] font-semibold transition-colors border ${
                      selectedTime === time
                        ? "border-brand bg-brand/15 text-brand"
                        : "border-line bg-card text-muted hover:border-line"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-line py-3 text-xs font-semibold text-muted transition-colors hover:border-brand/40"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand py-3 text-xs font-bold text-[#06213c] whitespace-nowrap transition-colors hover:bg-brand-strong"
              >
                <span>Confirm Pick Up Date</span>
                <Calendar className="size-4 shrink-0" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
