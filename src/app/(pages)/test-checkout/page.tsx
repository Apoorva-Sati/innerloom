"use client"
// THROWAWAY TEST PAGE — remove before going to production.
// Tests the full paid-booking + Razorpay payment flow end-to-end.
// Fill in a real confirmed-free-booking contact UUID below, then visit /test-checkout.

import { useEffect, useState } from "react"

// ── Paste a real contact_inquiries UUID that has a confirmed free booking ──
const TEST_CONTACT_ID = "REPLACE_WITH_REAL_CONTACT_UUID"
const TEST_SLOT       = "2026-07-02T04:15:00.000Z"
const TEST_DATE       = "2026-07-02"
const TEST_TIMEZONE   = "Asia/Kolkata"

// Window.Razorpay is declared in ContactForm — no need to redeclare here

export default function TestCheckoutPage() {
  const [log,    setLog]    = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const append = (msg: string) => setLog((prev) => [...prev, msg])

  useEffect(() => {
    const script    = document.createElement("script")
    script.src      = "https://checkout.razorpay.com/v1/checkout.js"
    script.async    = true
    script.onload   = () => append("✓ checkout.js loaded")
    script.onerror  = () => append("✗ checkout.js failed to load")
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  async function handlePay() {
    setLoading(true)
    append("→ creating booking + Razorpay order…")

    try {
      const createRes = await fetch("/api/booking/paid/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId:   TEST_CONTACT_ID,
          date:        TEST_DATE,
          timeSlot:    TEST_SLOT,
          timezone:    TEST_TIMEZONE,
          sessionType: "paid",
        }),
      })
      const createData = await createRes.json()

      if (!createRes.ok) {
        append(`✗ /api/booking/paid/create → ${createRes.status}: ${createData.error}`)
        setLoading(false)
        return
      }

      append(`✓ booking created: ${createData.bookingId}`)
      append(`✓ Razorpay order:  ${createData.razorpayOrderId}`)

      const options = {
        key:         createData.keyId,
        amount:      createData.amount,
        currency:    "INR",
        name:        "InnerLoom",
        description: "Counselling Session — 45 min",
        order_id:    createData.razorpayOrderId,
        handler: async (response: {
          razorpay_order_id:   string
          razorpay_payment_id: string
          razorpay_signature:  string
        }) => {
          append("→ payment succeeded, verifying…")
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              bookingId:           createData.bookingId,
            }),
          })
          const verifyData = await verifyRes.json()

          if (verifyRes.ok) {
            append("✓ booking confirmed — Cal.com event created!")
          } else {
            append(`✗ verify failed (${verifyRes.status}): ${verifyData.error}`)
          }
          setLoading(false)
        },
        prefill: { name: "Test User", email: "test@test.com" },
        theme:   { color: "#C17B5C" },
        modal:   {
          ondismiss: () => {
            append("— modal dismissed")
            setLoading(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      append(`✗ unexpected error: ${String(err)}`)
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "monospace", padding: "40px", maxWidth: "640px" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>
        Paid Booking — Test Checkout
      </h1>
      <p style={{ color: "#888", fontSize: "13px", marginBottom: "24px" }}>
        THROWAWAY PAGE — remove before production
      </p>

      {TEST_CONTACT_ID === "REPLACE_WITH_REAL_CONTACT_UUID" && (
        <p style={{ color: "red", marginBottom: "16px" }}>
          ⚠ Set TEST_CONTACT_ID at the top of this file to a real UUID first.
        </p>
      )}

      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          padding: "10px 24px",
          background: loading ? "#aaa" : "#C17B5C",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "15px",
          marginBottom: "24px",
        }}
      >
        {loading ? "working…" : "Pay ₹400 (Test Mode)"}
      </button>

      <div
        style={{
          background: "#111",
          color: "#0f0",
          padding: "16px",
          borderRadius: "8px",
          fontSize: "13px",
          lineHeight: "1.8",
          minHeight: "120px",
        }}
      >
        {log.length === 0
          ? <span style={{ color: "#555" }}>log output appears here…</span>
          : log.map((line, i) => <div key={i}>{line}</div>)
        }
      </div>
    </div>
  )
}
