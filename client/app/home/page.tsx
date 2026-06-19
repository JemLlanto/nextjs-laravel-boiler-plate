"use client";
import HomeLayout from "@/components/homeLayout/HomeLayout";
import { checkUser } from "@/utils/auth.helper";
import { DAY_LABELS, MONTHS, SelectedDate, today } from "@/utils/date.helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const [selected, setSelected] = useState<SelectedDate | null>(null);

  useEffect(() => {
    const validateUser = async () => {
      if (await checkUser()) {
        router.push(`/home`);
        setIsLoading(false);
      } else {
        router.push(`/`);
        setIsLoading(false);
      }
    };

    validateUser();
  }, []);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const years = Array.from(
    { length: 7 },
    (_, i) => today.getFullYear() - 5 + i,
  );

  function prevMonth(): void {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  }

  function nextMonth(): void {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  }

  function goToday(): void {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
    setSelected({
      d: today.getDate(),
      m: today.getMonth(),
      y: today.getFullYear(),
    });
  }

  function isToday(d: number): boolean {
    return (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  }

  function isSelected(d: number): boolean {
    return (
      selected !== null &&
      selected.d === d &&
      selected.m === month &&
      selected.y === year
    );
  }

  function selectDay(d: number): void {
    setSelected({ d, m: month, y: year });
  }

  function dayClasses(d: number): string {
    const dow = new Date(year, month, d).getDay();
    const sel = isSelected(d);
    const tod = isToday(d);
    const sun = dow === 0;

    const base =
      "h-20 flex items-center justify-center text-sm rounded-lg border cursor-pointer select-none transition-colors duration-100 focus:outline-none focus:ring-2 focus:ring-blue-400";

    if (sel)
      return `${base} bg-blue-600 border-blue-600 text-white font-semibold`;
    if (tod)
      return `${base} bg-blue-50 border-blue-500 border-2 text-blue-700 font-semibold`;
    if (sun)
      return `${base} bg-gray-50 border-gray-200 text-red-600 hover:bg-red-50`;
    return `${base} bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100`;
  }

  const emptyCells = Array.from({ length: firstDay });
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <>
      <HomeLayout>
        <div className="pt-2">
          <div className="w-full mx-auto p-5 bg-white border border-gray-200 rounded-xl shadow-sm font-sans">
            {/* Header controls */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <button
                onClick={prevMonth}
                aria-label="Previous month"
                className="w-9 h-9 flex items-center justify-center text-2xl text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ‹
              </button>

              <div className="flex gap-2 flex-1 justify-center">
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  aria-label="Month"
                  className="text-sm font-medium px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  aria-label="Year"
                  className="text-sm font-medium px-2 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={nextMonth}
                aria-label="Next month"
                className="w-9 h-9 flex items-center justify-center text-2xl text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ›
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={label}
                  className={`text-center text-xs font-semibold uppercase tracking-wide py-1.5 ${
                    i === 0 ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {emptyCells.map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((d) => (
                <div
                  key={d}
                  onClick={() => selectDay(d)}
                  onKeyDown={(e) => e.key === "Enter" && selectDay(d)}
                  className={dayClasses(d)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${MONTHS[month]} ${d}, ${year}${isToday(d) ? " (today)" : ""}`}
                  aria-pressed={isSelected(d)}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={goToday}
                className="text-xs px-4 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => setSelected(null)}
                className="text-xs px-4 py-1.5 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
            </div>

            {selected !== null && (
              <p className="text-center text-xs text-gray-400 mt-3">
                Selected: {MONTHS[selected.m]} {selected.d}, {selected.y}
              </p>
            )}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default HomePage;
