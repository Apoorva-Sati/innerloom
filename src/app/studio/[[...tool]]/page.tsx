import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { AdminNav } from '@/components/admin/AdminNav'
import { requireAdmin } from '@/lib/auth/requireAdmin'

export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default async function StudioPage() {
  await requireAdmin()
  return (
    <div className="flex flex-col h-screen">
      <AdminNav />
      <div className="flex-1 min-h-0 overflow-hidden">
        <NextStudio config={config} />
      </div>
    </div>
  )
}
