import { z } from 'zod'

export const newsletterSchema = z.object({
  email:   z.string().email('Please enter a valid email address.'),
  name:    z.string().max(100).optional(),
  source:  z.string().optional(),
  website: z.string().max(0, 'Bot detected').optional(),
})