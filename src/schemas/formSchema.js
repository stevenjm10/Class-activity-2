import { z } from 'zod'

export const ACCOUNT_TYPES = ['Student', 'Teacher', 'Guest']
export const SUBJECTS = ['Web Programming', 'Databases', 'Software Engineering', 'Networks']

// Validation rules for the Form view (used by React Hook Form through zodResolver)
export const formSchema = z.object({
  accountType: z.enum(ACCOUNT_TYPES, { error: 'Choose an account type' }),
  acceptTerms: z.literal(true, { error: 'You must accept the terms' }),
  password: z
    .string()
    .min(8, { error: 'At least 8 characters' })
    .regex(/[A-Za-z]/, { error: 'Must contain a letter' })
    .regex(/\d/, { error: 'Must contain a number' }),
  fullName: z
    .string()
    .trim()
    .min(3, { error: 'At least 3 characters' })
    .max(50, { error: 'At most 50 characters' }),
  subject: z.enum(SUBJECTS, { error: 'Choose a subject' }),
  comments: z
    .string()
    .trim()
    .min(10, { error: 'At least 10 characters' })
    .max(300, { error: 'At most 300 characters' }),
})

export const defaultValues = {
  accountType: null,
  acceptTerms: false,
  password: '',
  fullName: '',
  subject: '',
  comments: '',
}
