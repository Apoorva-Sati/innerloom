/**
 * Lightweight in-memory rate limiter.
 *
 * Strategy: sliding window — tracks timestamps of recent requests per key.
 * Works perfectly on Vercel serverless (each function instance gets its own
 * window, which is fine for a low-traffic counselling site — we just want
 * to stop someone hammering the form in a single session, not global throttle).
 *
 * Limits: 3 submissions per IP per 10 minutes.
 */

interface WindowEntry {
  timestamps: number[]
}

const store = new Map<string, WindowEntry>()

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 3            // max submissions per window

// Prune entries older than the window to keep memory clean
function prune(timestamps: number[], now: number): number[] {
  return timestamps.filter((t) => now - t < WINDOW_MS)
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number   // how many requests left in this window
  retryAfterSec: number // seconds until window resets (0 if allowed)
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now()

  const entry = store.get(key) ?? { timestamps: [] }
  const recent = prune(entry.timestamps, now)

  if (recent.length >= MAX_REQUESTS) {
    // Oldest timestamp tells us when the window resets
    const oldestTs = recent[0]
    const retryAfterMs = WINDOW_MS - (now - oldestTs)

    store.set(key, { timestamps: recent })

    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.ceil(retryAfterMs / 1000),
    }
  }

  // Allow — record this request
  recent.push(now)
  store.set(key, { timestamps: recent })

  return {
    allowed: true,
    remaining: MAX_REQUESTS - recent.length,
    retryAfterSec: 0,
  }
}