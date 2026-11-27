import { z } from 'zod'

// Validation rules for the Login screen
export const loginSchema = z.object({
  username: z.string().trim().min(1, { error: 'Enter your username' }),
  password: z.string().min(1, { error: 'Enter your password' }),
})

export const loginDefaults = { username: '', password: '' }
