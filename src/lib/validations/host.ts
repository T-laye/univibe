import { z } from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(3, 'Event title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(2, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(3, 'Location is required'),
  capacity: z.coerce.number().int().positive('Capacity must be greater than zero'),
  imageUrl: z.string().url().nullable().optional(),
  status: z.enum(['draft', 'published', 'cancelled']).optional(),
})

export const uploadKycSchema = z.object({
  documentType: z.string().min(2, 'Document type is required'),
})
