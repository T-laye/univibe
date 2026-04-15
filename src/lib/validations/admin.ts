import { z } from 'zod'

export const moderationActionSchema = z.object({
  eventId: z.string().uuid('Invalid event id').or(z.string().min(1)),
  action: z.enum(['approve', 'reject']),
})

export const kycDecisionSchema = z.object({
  userId: z.string().uuid('Invalid user id').or(z.string().min(1)),
  action: z.enum(['approve', 'reject']),
})
