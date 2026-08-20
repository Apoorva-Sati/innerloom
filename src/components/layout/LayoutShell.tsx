'use client'

import { usePathname } from 'next/navigation'

interface LayoutShellProps {
  header: React.ReactNode
  footer: React.ReactNode
  fab: React.ReactNode
  children: React.ReactNode
}

/**
 * Thin client boundary — only purpose is reading the pathname.
 * Header, footer, and fab are passed as pre-rendered Server Component nodes
 * (not re-imported here), so they stay out of the client JS bundle.
 */
export function LayoutShell({ header, footer, fab, children }: LayoutShellProps) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/studio')

  return (
    <>
      {!isAdmin && header}
      {children}
      {!isAdmin && footer}
      {!isAdmin && fab}
    </>
  )
}
