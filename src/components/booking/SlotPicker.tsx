"use client"

import { useEffect, useState } from "react"

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

interface Slot {
  time: string
}

interface SlotPickerProps {
  sessionType: "free" | "paid"
  selectedSlot: string | null
  onSelect: (iso: string | null) => void
  disabled?: boolean
}

export function SlotPicker({
  sessionType,
  selectedSlot,
  onSelect,
  disabled = false,
}: SlotPickerProps) {
  const [rawSlots, setRawSlots] = useState<Record<string, Slot[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [timezone, setTimezone] = useState("")
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Detect timezone once on mount
  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  // Re-fetch slots whenever the session type changes
  useEffect(() => {
    setLoading(true)
    setError("")
    setRawSlots({})
    setSelectedDate(null)

    fetch(`/api/booking/slots?sessionType=${sessionType}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setRawSlots(data.slots)
          // Jump the calendar view to the first month that has open slots
          const allTimes = (Object.values(data.slots) as Slot[][])
            .flat()
            .map((s) => s.time)
            .sort()
          if (allTimes.length > 0) {
            const first = new Date(allTimes[0])
            setViewMonth(new Date(first.getFullYear(), first.getMonth(), 1))
          }
        } else {
          setError(data.error || "Couldn't load available times.")
        }
      })
      .catch(() => setError("Network error. Please check your connection."))
      .finally(() => setLoading(false))
  }, [sessionType])

  // When the parent resets selectedSlot to null, clear the local date selection too
  useEffect(() => {
    if (!selectedSlot) setSelectedDate(null)
  }, [selectedSlot])

  // Flatten Cal.com's UTC-keyed slots and regroup by the visitor's LOCAL date
  const localGrouped: { date: string; times: string[] }[] = (() => {
    const grouped: Record<string, string[]> = {}
    for (const slots of Object.values(rawSlots)) {
      for (const slot of slots) {
        const d = new Date(slot.time)
        const key = [
          d.getFullYear(),
          String(d.getMonth() + 1).padStart(2, "0"),
          String(d.getDate()).padStart(2, "0"),
        ].join("-")
        ;(grouped[key] ??= []).push(slot.time)
      }
    }
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, times]) => ({ date, times: [...times].sort() }))
  })()

  const availableDatesSet = new Set(localGrouped.map((g) => g.date))
  const selectedDateTimes =
    localGrouped.find((g) => g.date === selectedDate)?.times ?? []

  // ── Calendar grid helpers ──────────────────────────────────────────────────
  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDOW = new Date(year, month, 1).getDay() // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Leading empty cells + day numbers; padded to a full last row
  const cells: (number | null)[] = [
    ...Array(firstDOW).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const monthLabel = viewMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  const todayMidnight = (() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })()

  const currentMonthStart = new Date(
    todayMidnight.getFullYear(),
    todayMidnight.getMonth(),
    1,
  )
  const canPrevMonth = viewMonth.getTime() > currentMonthStart.getTime()

  function cellKey(day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }
  function isPast(day: number) {
    const d = new Date(year, month, day)
    d.setHours(0, 0, 0, 0)
    return d < todayMidnight
  }

  const waLink = `https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`

  // ── Loading / error / empty states ────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8 text-brown-mid">
        <LoadingSpinner />
        <span className="text-sm">Loading available times…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <p>{error}</p>
        <p className="mt-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline"
          >
            WhatsApp us
          </a>{" "}
          to book a time directly.
        </p>
      </div>
    )
  }

  if (localGrouped.length === 0) {
    return (
      <div className="rounded-lg border border-peach bg-sand p-4 text-center text-sm text-brown-mid">
        <p>No openings in the next week.</p>
        <p className="mt-1">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal underline"
          >
            WhatsApp us
          </a>{" "}
          to find a time that works.
        </p>
      </div>
    )
  }

  // ── Calendar + time-slot layout ───────────────────────────────────────────
  return (
    <div>
      <div className="flex min-h-0">
        {/* ── Left: month calendar ── */}
        <div className="flex-1 p-4" style={{ borderRight: "1px solid #D6C9B8" }}>
          {/* Month navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewMonth(new Date(year, month - 1, 1))}
              disabled={!canPrevMonth}
              aria-label="Previous month"
              className="flex h-7 w-7 items-center justify-center rounded text-lg leading-none text-brown-mid transition-colors hover:bg-peach hover:text-brown disabled:cursor-not-allowed disabled:opacity-30"
            >
              ‹
            </button>
            <span className="text-sm font-medium text-brown">{monthLabel}</span>
            <button
              type="button"
              onClick={() => setViewMonth(new Date(year, month + 1, 1))}
              aria-label="Next month"
              className="flex h-7 w-7 items-center justify-center rounded text-lg leading-none text-brown-mid transition-colors hover:bg-peach hover:text-brown"
            >
              ›
            </button>
          </div>

          {/* Day-of-week headers */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {DAY_LABELS.map((d) => (
              <div key={d} className="py-0.5 text-xs font-medium text-brown-mid">
                {d}
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 gap-y-0.5 text-center">
            {cells.map((day, i) => {
              if (!day) return <div key={`e-${i}`} />
              const key = cellKey(day)
              const past = isPast(day)
              const available = availableDatesSet.has(key) && !past
              const isSelected = selectedDate === key

              return (
                <button
                  key={key}
                  type="button"
                  disabled={!available || disabled}
                  onClick={() => {
                    if (selectedDate !== key) {
                      setSelectedDate(key)
                      onSelect(null) // clear time when switching date
                    }
                  }}
                  className={[
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
                    isSelected
                      ? "bg-terra font-semibold text-white"
                      : available
                        ? "cursor-pointer text-brown hover:bg-peach"
                        : "cursor-default text-brown-mid opacity-30",
                  ].join(" ")}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Right: time slots ── */}
        <div
          className="flex shrink-0 flex-col overflow-y-auto p-4"
          style={{ width: "148px", maxHeight: "288px" }}
        >
          {!selectedDate ? (
            <p className="mt-1 text-center text-xs leading-5 text-brown-mid">
              ← Pick a date
            </p>
          ) : selectedDateTimes.length === 0 ? (
            <p className="mt-1 text-center text-xs text-brown-mid">
              No times available
            </p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {selectedDateTimes.map((start) => {
                const isSelected = selectedSlot === start
                const label = new Date(start).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                return (
                  <button
                    key={start}
                    type="button"
                    disabled={disabled}
                    onClick={() => onSelect(isSelected ? null : start)}
                    style={{
                      borderWidth: "1.5px",
                      borderStyle: "solid",
                      borderColor: isSelected ? "#C17B5C" : "#E8D5C4",
                      backgroundColor: isSelected ? "#C17B5C" : "transparent",
                      color: isSelected ? "#FFFFFF" : "#4A3728",
                    }}
                    className="w-full rounded-lg py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    onMouseEnter={(e) => {
                      if (!isSelected && !disabled) {
                        e.currentTarget.style.borderColor = "#C17B5C"
                        e.currentTarget.style.color = "#C17B5C"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = "#E8D5C4"
                        e.currentTarget.style.color = "#4A3728"
                      }
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {timezone && (
        <p className="mt-2 px-4 pb-3 text-xs text-brown-mid">
          Times shown in your timezone — {timezone}
        </p>
      )}
    </div>
  )
}

function LoadingSpinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}
