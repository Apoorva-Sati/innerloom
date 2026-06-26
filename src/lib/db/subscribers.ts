import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function insertSubscriber({
  email,
  name,
  source,
}: {
  email: string
  name?: string
  source?: string
}) {
  await sql`
    INSERT INTO newsletter_subscribers (email, name, source)
    VALUES (${email}, ${name ?? null}, ${source ?? null})
  `
}