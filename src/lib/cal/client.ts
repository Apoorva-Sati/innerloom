// Server-only Cal.com v2 client — never import this from a "use client" file.

const CAL_BASE = "https://api.cal.com/v2"
const CAL_VERSION_SLOTS    = "2024-06-14"  // /slots/available
const CAL_VERSION_BOOKINGS = "2026-02-25"  // /bookings

export const DISCOVERY_CALL_EVENT_TYPE_ID = 6162363  // free, 15 min
export const COUNSELLING_SESSION_EVENT_TYPE_ID = 6162369 // paid, 45 min

export class CalApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = "CalApiError"
  }
}

async function calFetch(path: string, version: string, init?: RequestInit) {
  const res = await fetch(`${CAL_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "cal-api-version": version,
      Authorization: `Bearer ${process.env.CAL_API_KEY}`,
      ...(init?.headers ?? {}),
    },
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new CalApiError(
      `Cal.com API error: ${res.status} ${res.statusText} — ${body}`,
      res.status,
    )
  }

  return res.json()
}

export async function getSlots(
  eventTypeId: number,
  startISO: string,
  endISO: string,
): Promise<Record<string, { time: string }[]>> {
  const params = new URLSearchParams({
    eventTypeId: String(eventTypeId),
    startTime: startISO,
    endTime: endISO,
  })
  const data = await calFetch(`/slots/available?${params}`, CAL_VERSION_SLOTS)
  return (data.data?.slots ?? {}) as Record<string, { time: string }[]>
}

export interface CalBookingResult {
  id: number
  uid: string
  status: string
  start: string
  end: string
}

export async function createBooking(params: {
  eventTypeId: number
  start: string
  name: string
  email: string
  timeZone: string
  notes?: string
}): Promise<CalBookingResult> {
  const body: Record<string, unknown> = {
    start: params.start,
    eventTypeId: params.eventTypeId,
    attendee: {
      name: params.name,
      email: params.email,
      timeZone: params.timeZone,
      language: "en",
    },
  }

  if (params.notes) {
    body.bookingFieldsResponses = { notes: params.notes }
  }

  const data = await calFetch("/bookings", CAL_VERSION_BOOKINGS, {
    method: "POST",
    body: JSON.stringify(body),
  })

  return data.data as CalBookingResult
}

// ── Counselling-session wrappers ──────────────────────────────────────────────

export async function getCounsellingSlots(
  startISO: string,
  endISO: string,
): Promise<Record<string, { time: string }[]>> {
  return getSlots(COUNSELLING_SESSION_EVENT_TYPE_ID, startISO, endISO)
}

export async function createCounsellingBooking(params: {
  start: string
  name: string
  email: string
  timeZone: string
  notes?: string
}): Promise<CalBookingResult> {
  return createBooking({
    eventTypeId: COUNSELLING_SESSION_EVENT_TYPE_ID,
    ...params,
  })
}
