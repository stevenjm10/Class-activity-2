import { z } from 'zod'

// Number inputs give their value as text ('' when empty), so the text is checked and then turned into a number
const number = z
  .string()
  .trim()
  .min(1, { error: 'Enter a number' })
  .refine((value) => Number.isFinite(Number(value)), { error: 'Not a valid number' })
  .transform(Number)

// Validation rules for the Sum screen
export const sumSchema = z.object({ num1: number, num2: number })

export const sumDefaults = { num1: '', num2: '' }
