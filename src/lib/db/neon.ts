import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable")
}

// `neon()` returns a tagged-template SQL executor.
// It is cheap to create — one per request is fine on serverless.
// We export a factory so callers don't share state across cold starts.
export function getDb() {
  return neon(process.env.DATABASE_URL!)
}