'use client'

import { usePathname } from 'next/navigation'
import { CrisisBanner } from './CrisisBanner'
import Navbar from './Navbar'
import Footer from '../../../src/components/layout/Footer'
import { WhatsAppFAB } from '../shared/WhatsAppFAB'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && (
        <>
          <a href="#main" className="sr-only focus:not-sr-only">
            Skip to content
          </a>
          <CrisisBanner />
          <Navbar />
        </>
      )}
      <main id="main">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFAB />} 
    </>
  )
}