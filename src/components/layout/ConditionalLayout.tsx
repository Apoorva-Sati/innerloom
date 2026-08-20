// ConditionalLayout is a Server Component.
// The pathname check is delegated to a thin client boundary below.
import { CrisisBanner } from './CrisisBanner'
import Navbar from './Navbar'
import Footer from './Footer'
import { WhatsAppFAB } from '../shared/WhatsAppFAB'
import { LayoutShell } from './LayoutShell'

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutShell
      header={
        <>
          <a href="#main" className="sr-only focus:not-sr-only">
            Skip to content
          </a>
          <CrisisBanner />
          <Navbar />
        </>
      }
      footer={<Footer />}
      fab={<WhatsAppFAB />}
    >
      <main id="main">{children}</main>
    </LayoutShell>
  )
}