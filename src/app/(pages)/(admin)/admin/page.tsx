import { neon } from '@neondatabase/serverless'
import { AdminNav } from '@/components/admin/AdminNav'
import { requireAdmin } from '@/lib/auth/requireAdmin'

const sql = neon(process.env.DATABASE_URL!)

async function getStats() {
  const [submissions, subscribers] = await Promise.all([
    sql`SELECT COUNT(*) as count FROM contact_inquiries`,
    sql`SELECT COUNT(*) as count FROM newsletter_subscribers`,
  ])
  return {
    submissions: Number(submissions[0].count),
    subscribers: Number(subscribers[0].count),
  }
}

async function getRecentSubmissions() {
  return sql`
    SELECT id, name, email, phone, created_at
    FROM contact_inquiries
    ORDER BY created_at DESC
    LIMIT 10
  `
}

async function getRecentSubscribers() {
  return sql`
    SELECT id, email, name, source, created_at
    FROM newsletter_subscribers
    ORDER BY created_at DESC
    LIMIT 10
  `
}

export default async function AdminPage() {
  await requireAdmin()

  const [stats, submissions, subscribers] = await Promise.all([
    getStats(),
    getRecentSubmissions(),
    getRecentSubscribers(),
  ])

  return (
    <div className="min-h-screen bg-ivory">
      <AdminNav />

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6">
            <div className="text-3xl font-serif text-[#2C2C2A] mb-1">
              {stats.submissions}
            </div>
            <div className="text-sm text-[#9B9590]">Total enquiries</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6">
            <div className="text-3xl font-serif text-[#2C2C2A] mb-1">
              {stats.subscribers}
            </div>
            <div className="text-sm text-[#9B9590]">Newsletter subscribers</div>
          </div>
        </div>

        <section>
          <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase mb-4">
            Recent enquiries
          </h2>
          <div className="space-y-3">
            {submissions.length === 0 ? (
              <p className="text-sm text-[#9B9590]">No enquiries yet.</p>
            ) : (
              submissions.map((s: any) => (
                <details
                  key={s.id}
                  className="bg-white rounded-2xl border border-[#E8E0D5] px-6 py-4 cursor-pointer group"
                >
                  <summary className="flex items-center justify-between list-none">
                    <div>
                      <span className="font-medium text-sm text-[#2C2C2A]">
                        {s.name}
                      </span>
                      <span className="text-sm text-[#9B9590] ml-3">
                        {s.email}
                      </span>
                    </div>
                    <span className="text-xs text-[#9B9590]">
                      {new Date(s.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-[#E8E0D5] space-y-2">
                    {s.phone && (
                      <p className="text-xs text-[#9B9590]">
                        Phone: {s.phone}
                      </p>
                    )}
                    <p className="text-sm text-[#4A4540] leading-relaxed">
                      {s.message}
                    </p>
                    <a
                      href={`mailto:${s.email}`}
                      className="inline-block mt-2 text-xs text-[#4A7C6F] hover:underline"
                    >
                      Reply via email →
                    </a>
                  </div>
                </details>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-medium tracking-widest text-[#4A7C6F] uppercase mb-4">
            Newsletter subscribers
          </h2>
          <div className="bg-white rounded-2xl border border-[#E8E0D5] overflow-hidden">
            {subscribers.length === 0 ? (
              <p className="text-sm text-[#9B9590] p-6">No subscribers yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8E0D5] bg-ivory">
                    <th className="text-left px-6 py-3 text-xs font-medium text-[#9B9590]">
                      Email
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-[#9B9590]">
                      Name
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-[#9B9590]">
                      Source
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-[#9B9590]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s: any) => (
                    <tr
                      key={s.id}
                      className="border-b border-[#E8E0D5] last:border-0"
                    >
                      <td className="px-6 py-3 text-[#2C2C2A]">{s.email}</td>
                      <td className="px-6 py-3 text-[#6B6560]">
                        {s.name ?? '—'}
                      </td>
                      <td className="px-6 py-3 text-[#9B9590]">
                        {s.source ?? '—'}
                      </td>
                      <td className="px-6 py-3 text-[#9B9590]">
                        {new Date(s.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}