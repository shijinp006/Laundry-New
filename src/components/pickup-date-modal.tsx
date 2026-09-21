"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, CheckCircle, ChevronRight } from "@/components/icons";

type PickupDateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function toDateStr(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildCalendarGrid(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    return date;
  });
}

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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => new Date(tomorrowStr + "T00:00:00"));
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCalendarOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [calendarOpen]);

  if (!isOpen) return null;

  const todayMidnight = new Date(todayStr + "T00:00:00");
  const currentMonthStart = new Date(todayMidnight.getFullYear(), todayMidnight.getMonth(), 1);
  const isPrevMonthDisabled =
    viewDate.getFullYear() === currentMonthStart.getFullYear() &&
    viewDate.getMonth() === currentMonthStart.getMonth();

  const openCalendar = () => {
    setViewDate(new Date(selectedDate + "T00:00:00"));
    setCalendarOpen((v) => !v);
  };

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md animate-rise"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pickup-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close modal"
        >
          ✕
        </button>

        {confirmed ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="size-14 text-brand animate-float" />
            <h3 className="mt-4 text-xl font-bold text-slate-900">Pickup Date Scheduled!</h3>
            <p className="mt-2 text-sm text-slate-600">
              We&apos;ve reserved your pickup for{" "}
              <strong className="text-brand">{formatDateLabel(selectedDate)}</strong> ({selectedTime}).
            </p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="flex flex-col gap-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-brand">
                <Calendar className="size-5" />
              </span>
              <div>
                <h3 id="pickup-modal-title" className="text-lg font-bold text-slate-900">
                  Select Pick Up Date
                </h3>
                <p className="text-xs text-slate-500">Choose your preferred pickup day &amp; slot</p>
              </div>
            </div>

            {/* Quick date chips */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Quick Options</label>
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
                    className={`rounded-xl py-2.5 text-xs font-semibold whitespace-nowrap transition-all border ${
                      selectedDate === item.value
                        ? "border-brand bg-brand text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar input field */}
            <div ref={calendarRef} className="relative">
              <label htmlFor="modal-date-picker" className="text-xs font-semibold text-slate-600">
                Pick Up Date
              </label>
              <button
                id="modal-date-picker"
                type="button"
                onClick={openCalendar}
                aria-haspopup="dialog"
                aria-expanded={calendarOpen}
                className="mt-1.5 flex w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-left transition-colors hover:border-slate-300"
              >
                <Calendar className="size-4 shrink-0 text-brand" />
                <span className="text-sm text-slate-900">
                  {(() => {
                    const [y, m, d] = selectedDate.split("-");
                    return `${d}-${m}-${y}`;
                  })()}
                </span>
              </button>

              {calendarOpen && (
                <div
                  role="dialog"
                  aria-label="Choose pick up date"
                  className="absolute top-full left-0 right-0 z-30 mt-1.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl animate-rise"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={isPrevMonthDisabled}
                        onClick={() =>
                          setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))
                        }
                        aria-label="Previous month"
                        className="grid size-7 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-30"
                      >
                        <ChevronRight className="size-4 rotate-180" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))
                        }
                        aria-label="Next month"
                        className="grid size-7 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                      >
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[11px] font-semibold text-slate-400">
                    {WEEKDAY_LABELS.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-xs">
                    {buildCalendarGrid(viewDate).map((date) => {
                      const dateStr = toDateStr(date);
                      const inCurrentMonth = date.getMonth() === viewDate.getMonth();
                      const isSelected = dateStr === selectedDate;
                      const isToday = dateStr === todayStr;
                      const isDisabled = dateStr < todayStr;

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            setSelectedDate(dateStr);
                            setCalendarOpen(false);
                          }}
                          className={`mx-auto grid size-8 place-items-center rounded-lg font-semibold transition-colors ${
                            isSelected
                              ? "bg-brand text-white"
                              : isDisabled
                              ? "text-slate-300"
                              : !inCurrentMonth
                              ? "text-slate-300 hover:bg-slate-100"
                              : isToday
                              ? "border border-brand text-brand"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-600">Preferred Time Window</label>
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
                    className={`whitespace-nowrap rounded-xl px-2 py-2 text-[10px] font-semibold transition-all border ${
                      selectedTime === time
                        ? "border-brand bg-brand/10 text-brand shadow-xs"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
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
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 py-3 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-xs font-bold text-white whitespace-nowrap shadow-md transition-all hover:bg-brand-strong active:scale-95"
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
