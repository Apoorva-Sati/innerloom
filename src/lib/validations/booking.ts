import { z } from "zod"

export const BookingSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(/^[+]?[0-9]{10,13}$/, "Enter a valid phone number (10–13 digits)")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(10, "Please share a bit more (at least 10 characters)")
    .max(2000, "Message is too long (max 2000 characters)"),

  consent: z.literal(true, {
    error: "Please confirm you have read the privacy notice",
  }),

  sessionType: z.enum(["free", "paid"]),

  slotStart: z.string().min(1, "Please select a time for your session"),

  timezone: z.string().min(1, "Timezone is required"),

  // Honeypot — must always be empty; bots fill it in
  _honey: z.string().max(0).optional(),
})

export type BookingFormData = z.infer<typeof BookingSchema>

export type BookingFormErrors = Partial<
  Record<keyof BookingFormData, string[]>
>

// ── Paid-session booking (admin / payment flow) ───────────────────────────────
// contactId is required — paid bookings always belong to an existing contact
// who already completed a free discovery call.
export const PaidBookingSchema = z.object({
  contactId:   z.string().uuid("Invalid contact ID"),
  date:        z.string().min(1, "Date is required"),
  timeSlot:    z.string().min(1, "Please select a time"),
  timezone:    z.string().min(1, "Timezone is required"),
  sessionType: z.literal("paid"),
})

export type PaidBookingFormData = z.infer<typeof PaidBookingSchema>
