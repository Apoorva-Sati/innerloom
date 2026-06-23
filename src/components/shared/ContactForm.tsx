"use client"

import { useState, useRef } from "react"
import { ContactSchema, type ContactFormErrors } from "@/lib/validations/contact"

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = "idle" | "loading" | "success" | "error"

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
  border: "1.5px solid #D6C9B8",
  borderRadius: "10px",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
  minHeight: "44px", // WCAG touch target
}

const inputError: React.CSSProperties = {
  borderColor: "#C0392B",
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [serverError, setServerError] = useState<string>("")
  const formRef = useRef<HTMLFormElement>(null)

  // ── Submit handler ──────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrors({})
    setServerError("")
    setStatus("loading")

    const form = e.currentTarget
    const raw = new FormData(form)

    // Build the payload — checkbox needs special handling
    const payload = {
      name: raw.get("name") as string,
      email: raw.get("email") as string,
      phone: raw.get("phone") as string,
      session_type: raw.get("session_type") as string,
      message: raw.get("message") as string,
      consent: raw.get("consent") === "on" ? true : (false as unknown as true),
      _honey: raw.get("_honey") as string,
    }

    // ── Client-side validation first (instant feedback, no round-trip) ──────
    const result = ContactSchema.safeParse(payload)
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as ContactFormErrors)
      setStatus("idle")
      // Scroll to first error
      const firstError = form.querySelector("[aria-invalid='true']")
      if (firstError instanceof HTMLElement) firstError.focus()
      return
    }

    // ── Send to API route ──────────────────────────────────────────────────
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        formRef.current?.reset()
      } else if (res.status === 400 && data.errors) {
        // Server returned validation errors (e.g. extra server-side checks)
        setErrors(data.errors)
        setStatus("idle")
      } else {
        setServerError(
          data.error || "Something went wrong. Please try again or WhatsApp us."
        )
        setStatus("error")
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.")
      setStatus("error")
    }
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
          Thank you for reaching out.
        </h2>
        <p style={{ color: "#7A6859", fontSize: "16px", lineHeight: 1.7 }}>
          I&apos;ve received your message and will be in touch within 24 hours.
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
          if it&apos;s urgent.
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
          Send another message
        </button>
      </div>
    )
  }

  const isLoading = status === "loading"

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

      {/* ── Server-level error banner ── */}
      {serverError && (
        <div
          role="alert"
          style={{
            background: "#FEF2F2",
            border: "1.5px solid #FECACA",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "14px",
            color: "#B91C1C",
          }}
        >
          {serverError}
        </div>
      )}

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

      {/* ── Row 4: Session type ── */}
      <div>
        <Label htmlFor="session_type" required>
          How would you like to meet?
        </Label>
        <div style={{ position: "relative" }}>
          <select
            id="session_type"
            name="session_type"
            defaultValue=""
            disabled={isLoading}
            aria-invalid={!!errors.session_type}
            aria-describedby={errors.session_type ? "session-error" : undefined}
            style={{
              ...inputBase,
              ...(errors.session_type ? inputError : {}),
              appearance: "none",
              WebkitAppearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237A6859' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 14px center",
              paddingRight: "40px",
              opacity: isLoading ? 0.6 : 1,
              cursor: "pointer",
            }}
            onFocus={(e) => {
              if (!errors.session_type) e.target.style.borderColor = "#3D6B6E"
            }}
            onBlur={(e) => {
              if (!errors.session_type) e.target.style.borderColor = "#D6C9B8"
            }}
          >
            <option value="" disabled>
              Select an option…
            </option>
            <option value="online">💻 Online (video call)</option>
            <option value="in-person">🏠 In-person (clinic visit)</option>
            <option value="either">🌿 Either works for me</option>
          </select>
        </div>
        <span id="session-error">
          <FieldError messages={errors.session_type} />
        </span>
      </div>

      {/* ── Row 5: Message ── */}
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
  {isLoading ? (
    <>
      <Spinner />
      Sending...
    </>
  ) : (
    "Send message"
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