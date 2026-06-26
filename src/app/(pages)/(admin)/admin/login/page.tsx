'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        setError('Incorrect password.')
      }
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#2C2C2A] mb-2">Innerloom</h1>
          <p className="text-sm text-[#9B9590]">Admin access</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E0D5] p-8 space-y-4">
          <div>
            <label className="text-xs font-medium text-[#6B6560] block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl border border-peach text-sm text-[#2C2C2A] placeholder:text-[#C4BDB6] focus:outline-none focus:border-[#4A7C6F]"
            />
          </div>

          {error && (
            <p className="text-xs text-terra">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-terra text-white text-sm font-medium hover:bg-terra-dark transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}