"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/about",   label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-sand">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="font-display text-xl text-teal font-medium">
          Innerloom
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-brown-mid hover:text-teal transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-sm">
            Book a session
          </Link>
        </nav>

        <button
          className="md:hidden text-brown"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ivory border-t border-sand px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-brown-mid hover:text-teal"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/91XXXXXXXXXX"
            className="text-sm text-sage-dark font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>
          <Link href="/contact" className="btn-primary text-sm text-center">
            Book a session
          </Link>
        </div>
      )}
    </header>
  )
}