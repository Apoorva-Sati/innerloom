'use client'

import { useState } from 'react'

export function NewsletterSignup({ source }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit() {
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source, website: '' }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#EEF4F0] border border-[#C8DDD0] rounded-2xl p-8 text-center">
        <div className="text-2xl mb-2">✓</div>
        <h3 className="font-serif text-lg text-[#2C2C2A] mb-2">You're subscribed</h3>
        <p className="text-sm text-[#6B6560]">
          Check your inbox for a welcome email. Thank you for being here.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#EDE5D8] rounded-2xl p-8">
      <h3 className="font-serif text-xl text-[#2C2C2A] mb-2">
        Stay in the loop
      </h3>
      <p className="text-sm text-[#6B6560] mb-6">
        New articles on mental health, therapy, and everyday wellbeing — 
        straight to your inbox. No spam, ever.
      </p>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        readOnly
      />

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#E8D5C4] bg-white text-[#2C2C2A] text-sm placeholder:text-[#C4BDB6] focus:outline-none focus:border-[#4A7C6F]"
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#E8D5C4] bg-white text-[#2C2C2A] text-sm placeholder:text-[#C4BDB6] focus:outline-none focus:border-[#4A7C6F]"
        />
        <button
          onClick={handleSubmit}
          disabled={status === 'loading' || !email}
          className="w-full py-3 rounded-xl bg-[#C17B5C] text-white text-sm font-medium hover:bg-[#A5644A] transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      {status === 'error' && (
        <p className="text-xs text-[#C17B5C] mt-3">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="text-xs text-[#9B9590] mt-4">
        By subscribing you agree to our{' '}
        <a href="/privacy" className="underline">Privacy Policy</a>.
        Unsubscribe anytime by replying to any email.
      </p>
    </div>
  )
}