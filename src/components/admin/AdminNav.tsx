'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Blog', href: '/admin/blog' },
  { label: 'Studio', href: '/studio' },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between bg-white border-b border-[#E8E0D5] px-6 py-4">
      <div className="flex items-center gap-1">
        <h1 className="font-serif text-lg text-[#2C2C2A] mr-6">Innerloom</h1>
        {tabs.map((tab) => {
          const active =
            tab.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                active
                  ? 'bg-[#4A7C6F] text-white'
                  : 'text-[#6B6560] hover:text-[#2C2C2A] hover:bg-[#F5F0EB]'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          aria-label="View site"
          title="View site"
          className="flex items-center text-[#4A7C6F] hover:text-[#3d6860] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </Link>

        <a
          href="/api/admin/logout"
          aria-label="Sign out"
          title="Sign out"
          className="flex items-center text-terra hover:text-terra/80 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112v80H208c-26.5 0-48 21.5-48 48v32c0 26.5 21.5 48 48 48h112v80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32S177.7 32 160 32H96C43 32 0 75 0 128v256c0 53 43 96 96 96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H96c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32h64z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
