import { NextRequest, NextResponse } from "next/server"
import {
  getSlots,
  DISCOVERY_CALL_EVENT_TYPE_ID,
  COUNSELLING_SESSION_EVENT_TYPE_ID,
  CalApiError,
} from "@/lib/cal/client"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const sessionType = req.nextUrl.searchParams.get("sessionType")
    const eventTypeId =
      sessionType === "paid"
        ? COUNSELLING_SESSION_EVENT_TYPE_ID
        : DISCOVERY_CALL_EVENT_TYPE_ID

    const now = new Date()
    const end = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const slots = await getSlots(eventTypeId, now.toISOString(), end.toISOString())

    return NextResponse.json({ ok: true, slots })
  } catch (err) {
    if (err instanceof CalApiError) {
      return NextResponse.json(
        { error: "Couldn't load available times. Please try again shortly." },
        { status: 502 },
      )
    }
    console.error("[Booking Slots API] Unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
