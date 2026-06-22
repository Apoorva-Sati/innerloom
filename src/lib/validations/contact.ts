import { z } from "zod"

export const ContactSchema = z.object({
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

  session_type: z.enum(["online", "in-person", "either"], {
    error: "Please select a session type",
  }),

  message: z
    .string()
    .min(10, "Please share a bit more (at least 10 characters)")
    .max(2000, "Message is too long (max 2000 characters)"),

  consent: z.literal(true, {
    error: "Please confirm you have read the privacy notice",
  }),

  // Honeypot — must always be empty; bots fill it in
  _honey: z.string().max(0).optional(),
})

export type ContactFormData = z.infer<typeof ContactSchema>

// Shape of field-level errors returned to the client
export type ContactFormErrors = Partial<
  Record<keyof ContactFormData, string[]>
>