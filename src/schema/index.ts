import { z } from 'zod'

export const CreateCommunitySchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(21, { message: 'Name is too long (max 50 characters)' }),

  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, {
      message: 'Description is too long (max 500 characters)'
    })
})
