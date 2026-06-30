"use client"

import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { BookingSchema, type BookingFormErrors } from "@/lib/validations/booking"
import { SlotPicker } from "@/components/booking/SlotPicker"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: new (options: Record<string, any>) => { open(): void }
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "paying" | "success"

// ─── Small reusable pieces ───────────────────────────────────────────────────

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null
  return (
    <p
      role="alert"
      style={{
        color: "#C0392B",
        fontSize: "12px",
        marginTop: "4px",
        lineHeight: 1.4,
      }}
    >
      {messages[0]}
    </p>
  )
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        display: "block",
        fontSize: "14px",
        fontWeight: 500,
        color: "#4A3728",
        marginBottom: "6px",
      }}
    >
      {children}
      {required && (
        <span style={{ color: "#C17B5C", marginLeft: "3px" }} aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

// Shared input styles — applied via inline style so they work with Tailwind v4
// without needing any extra config
const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontSize: "15px",
  color: "#4A3728",
  backgroundColor: "#FFFFFF",
  borderWidth: "1.5px",
  borderStyle: "solid",
  borderColor: "#D6C9B8",
  borderRadius: "10px",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
  minHeight: "44px",
}

const inputError: React.CSSProperties = {
  borderColor: "#C0392B",
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ContactForm({
  sessionType = "free",
}: {
  sessionType?: "free" | "paid"
}) {
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<BookingFormErrors>({})
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Load Razorpay checkout.js only on the paid booking form
  useEffect(() => {
    if (sessionType !== "paid") return
    const script   = document.createElement("script")
    script.src     = "https://checkout.razorpay.com/v1/checkout.js"
    script.async   = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [sessionType])

  // ── Submit handler ──────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setStatus("loading")

    const form = e.currentTarget
    const raw  = new FormData(form)

    const payload = {
      name:        raw.get("name") as string,
      email:       raw.get("email") as string,
      phone:       raw.get("phone") as string,
      message:     raw.get("message") as string,
      sessionType,
      slotStart:   selectedSlot ?? "",
      timezone:    Intl.DateTimeFormat().resolvedOptions().timeZone,
      consent:     raw.get("consent") === "on" ? true : (false as unknown as true),
      _honey:      raw.get("_honey") as string,
    }

    // ── Client-side validation first (instant feedback, no round-trip) ──────
    const result = BookingSchema.safeParse(payload)
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as BookingFormErrors)
      setStatus("idle")
      const firstError = form.querySelector("[aria-invalid='true']")
      if (firstError instanceof HTMLElement) firstError.focus()
      return
    }

    // ── Free session flow ────────────────────────────────────────────────────
    if (sessionType === "free") {
      try {
        const res  = await fetch("/api/booking/create", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
        })
        const data = await res.json()

        if (res.ok) {
          setStatus("success")
          formRef.current?.reset()
          setSelectedSlot(null)
        } else if (res.status === 400 && data.errors) {
          setErrors(data.errors)
          setStatus("idle")
        } else {
          toast.error(data.error || "Something went wrong. Please try again or WhatsApp us.")
          setStatus("idle")
        }
      } catch {
        toast.error("Network error. Please check your connection and try again.")
        setStatus("idle")
      }
      return
    }

    // ── Paid session flow ────────────────────────────────────────────────────
    // Step 1: create pending booking + Razorpay order
    let orderData: { bookingId: string; razorpayOrderId: string; amount: number; keyId: string }

    try {
      const res  = await fetch("/api/booking/paid/start", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 400 && data.errors) {
          setErrors(data.errors)
          setStatus("idle")
        } else {
          toast.error(data.error || "Something went wrong. Please try again or WhatsApp us.")
          setStatus("idle")
        }
        return
      }

      orderData = data
    } catch {
      toast.error("Network error. Please check your connection and try again.")
      setStatus("idle")
      return
    }

    // Step 2: open Razorpay payment modal
    setStatus("paying")

    const rzp = new window.Razorpay({
      key:         orderData.keyId,
      amount:      orderData.amount,
      currency:    "INR",
      name:        "InnerLoom",
      description: "Counselling Session — 45 min",
      order_id:    orderData.razorpayOrderId,
      prefill: {
        name:  payload.name,
        email: payload.email,
        ...(payload.phone ? { contact: payload.phone } : {}),
      },
      theme: { color: "#C17B5C" },
      handler: async (response: {
        razorpay_order_id:   string
        razorpay_payment_id: string
        razorpay_signature:  string
      }) => {
        // Step 3: verify payment + create Cal.com event
        setStatus("loading")
        try {
          const verifyRes  = await fetch("/api/payment/verify", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              bookingId:           orderData.bookingId,
            }),
          })
          const verifyData = await verifyRes.json()

          if (verifyRes.ok) {
            setStatus("success")
            formRef.current?.reset()
            setSelectedSlot(null)
          } else {
            toast.error(verifyData.error || "Payment received but something went wrong. Please contact us.")
            setStatus("idle")
          }
        } catch {
          toast.error("Payment received but verification failed. Please contact us immediately.")
          setStatus("idle")
        }
      },
      modal: {
        ondismiss: () => {
          // User closed the modal without paying — go back to idle
          setStatus("idle")
        },
      },
    })

    rzp.open()
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          textAlign: "center",
          padding: "48px 24px",
          background: "#F7F2EB",
          borderRadius: "16px",
          border: "1.5px solid #E8D5C4",
        }}
      >
        <div style={{ fontSize: "52px", marginBottom: "16px" }}>🌿</div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "28px",
            fontWeight: 400,
            color: "#3D6B6E",
            marginBottom: "12px",
          }}
        >
          {sessionType === "paid" ? "Your session is booked." : "Your discovery call is booked."}
        </h2>
        <p style={{ color: "#7A6859", fontSize: "16px", lineHeight: 1.7 }}>
          A confirmation email is on its way to your inbox.
          <br />
          In the meantime, feel free to{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#3D6B6E", fontWeight: 500 }}
          >
            WhatsApp me
          </a>{" "}
          if you have any questions.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "24px",
            padding: "10px 24px",
            background: "transparent",
            border: "1.5px solid #3D6B6E",
            color: "#3D6B6E",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {sessionType === "paid" ? "Book another session" : "Book another call"}
        </button>
      </div>
    )
  }

  const isLoading = status === "loading" || status === "paying"

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      {/* ── Honeypot — invisible to humans, bots fill it in ── */}
      <input
        name="_honey"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── Row 1: Name ── */}
      <div>
        <Label htmlFor="name" required>
          Your name
        </Label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Priya Sharma"
          disabled={isLoading}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          style={{
            ...inputBase,
            ...(errors.name ? inputError : {}),
            opacity: isLoading ? 0.6 : 1,
          }}
          onFocus={(e) => {
            if (!errors.name) e.target.style.borderColor = "#3D6B6E"
          }}
          onBlur={(e) => {
            if (!errors.name) e.target.style.borderColor = "#D6C9B8"
          }}
        />
        <span id="name-error">
          <FieldError messages={errors.name} />
        </span>
      </div>

      {/* ── Row 2: Email ── */}
      <div>
        <Label htmlFor="email" required>
          Email address
        </Label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="priya@example.com"
          disabled={isLoading}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          style={{
            ...inputBase,
            ...(errors.email ? inputError : {}),
            opacity: isLoading ? 0.6 : 1,
          }}
          onFocus={(e) => {
            if (!errors.email) e.target.style.borderColor = "#3D6B6E"
          }}
          onBlur={(e) => {
            if (!errors.email) e.target.style.borderColor = "#D6C9B8"
          }}
        />
        <span id="email-error">
          <FieldError messages={errors.email} />
        </span>
      </div>

      {/* ── Row 3: Phone (optional) ── */}
      <div>
        <Label htmlFor="phone">
          Phone number{" "}
          <span style={{ fontWeight: 400, color: "#7A6859" }}>(optional)</span>
        </Label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91 98765 43210"
          disabled={isLoading}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          style={{
            ...inputBase,
            ...(errors.phone ? inputError : {}),
            opacity: isLoading ? 0.6 : 1,
          }}
          onFocus={(e) => {
            if (!errors.phone) e.target.style.borderColor = "#3D6B6E"
          }}
          onBlur={(e) => {
            if (!errors.phone) e.target.style.borderColor = "#D6C9B8"
          }}
        />
        <span id="phone-error">
          <FieldError messages={errors.phone} />
        </span>
      </div>
      {/* ── Row 4: Message ── */}
      <div>
        <Label htmlFor="message" required>
          What brings you here?
        </Label>
        <p
          id="message-hint"
          style={{ fontSize: "12px", color: "#7A6859", marginBottom: "6px" }}
        >
          Share as much or as little as you&apos;re comfortable with.
        </p>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="I've been feeling overwhelmed lately and would like to explore therapy…"
          disabled={isLoading}
          aria-invalid={!!errors.message}
          aria-describedby="message-hint message-error"
          style={{
            ...inputBase,
            minHeight: "120px",
            resize: "vertical",
            ...(errors.message ? inputError : {}),
            opacity: isLoading ? 0.6 : 1,
          }}
          onFocus={(e) => {
            if (!errors.message) e.target.style.borderColor = "#3D6B6E"
          }}
          onBlur={(e) => {
            if (!errors.message) e.target.style.borderColor = "#D6C9B8"
          }}
        />
        <span id="message-error">
          <FieldError messages={errors.message} />
        </span>
      </div>

      {/* ── Row 5: Pick a time ── */}
      <div>
        <Label htmlFor="slotStart" required>
          {sessionType === "paid" ? "Pick a time for your session" : "Pick a time for your free discovery call"}
        </Label>
        <div
          style={{
            border: "1.5px solid #D6C9B8",
            borderRadius: "12px",
            background: "#F7F2EB",
            overflow: "hidden",
            marginTop: "6px",
          }}
        >
          <SlotPicker
            sessionType={sessionType}
            selectedSlot={selectedSlot}
            onSelect={setSelectedSlot}
            disabled={isLoading}
          />
        </div>
        <span id="slotStart-error">
          <FieldError messages={errors.slotStart} />
        </span>
      </div>

      {/* ── Row 6: Consent checkbox ── */}
      <div>
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          <input
            name="consent"
            type="checkbox"
            disabled={isLoading}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            style={{
              width: "18px",
              height: "18px",
              marginTop: "2px",
              flexShrink: 0,
              accentColor: "#3D6B6E",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          />
          <span style={{ fontSize: "13px", color: "#7A6859", lineHeight: 1.5 }}>
            I understand that submitting this form does not create a
            therapist–client relationship. My details will be kept confidential
            and used only to respond to this enquiry. Read the{" "}
            <a
              href="/privacy-policy"
              style={{ color: "#3D6B6E", textDecoration: "underline" }}
              target="_blank"
            >
              privacy policy
            </a>
            .
          </span>
        </label>
        <span id="consent-error" style={{ paddingLeft: "28px", display: "block" }}>
          <FieldError messages={errors.consent} />
        </span>
      </div>

      {/* ── Submit button ── */}
      <button
  type="submit"
  disabled={isLoading}
  aria-busy={isLoading}
  className={`
    w-full min-h-13
    flex items-center justify-center gap-2.5
    rounded-xl
    px-6 py-3.5
    text-base font-medium text-white
    transition-colors
    ${
      isLoading
        ? "bg-terra-dark cursor-not-allowed"
        : "bg-terra hover:bg-terra-dark cursor-pointer"
    }
  `}
>
  {status === "paying" ? (
    <>
      <Spinner />
      Complete payment in the window above…
    </>
  ) : isLoading ? (
    <>
      <Spinner />
      {sessionType === "paid" ? "Booking your session..." : "Booking your call..."}
    </>
  ) : sessionType === "paid" ? (
    "Confirm & pay ₹400"
  ) : (
    "Confirm booking"
  )}
</button>

      {/* ── Crisis note ── */}
      <p
        style={{
          fontSize: "12px",
          color: "#7A6859",
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        In crisis?{" "}
        <strong style={{ color: "#C0392B" }}>iCall: 9152987821</strong>
        {" · "}
        <strong style={{ color: "#C0392B" }}>Vandrevala: 1860-2662-345</strong>
      </p>
    </form>
  )
}

// ─── Inline spinner ───────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      style={{
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}