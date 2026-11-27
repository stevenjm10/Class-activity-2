import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Card from '../components/Card.jsx'
import Field from '../components/Field.jsx'
import Button from '../components/Button.jsx'
import BackButton from '../components/BackButton.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { ACCOUNT_TYPES, COMMENTS_MAX, SUBJECTS, defaultValues, formSchema } from '../schemas/formSchema.js'

// Labels for the summary shown after submitting
const SUMMARY = [
  ['accountType', 'Account type'],
  ['fullName', 'Full name'],
  ['password', 'Password'],
  ['subject', 'Subject'],
  ['comments', 'Comments'],
]

// Page 3 - Registration form: radio, checkbox, password, text, select and textarea,
// managed by React Hook Form and validated with the Zod schema in src/schemas/formSchema.js
export default function Form({ onBack }) {
  const [submitted, setSubmitted] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema), defaultValues, mode: 'onTouched' })

  const commentsLength = useWatch({ control, name: 'comments' })?.length ?? 0

  const onSubmit = async (data) => {
    // Simulates sending the data to a server
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSubmitted({ ...data, password: '•'.repeat(data.password.length) }) // never show the real password
    reset()
  }

  // Common props for the text controls: register + red border when invalid
  const textControl = (name) => ({ id: name, 'aria-invalid': Boolean(errors[name]), ...register(name) })

  return (
    <Card title="Registration form" wide>
      {submitted ? (
        <div className="stack">
          <p className="form-success">✔ Form submitted</p>
          <dl className="form-summary">
            {SUMMARY.map(([key, label]) => (
              <div key={key} className="form-summary-row">
                <dt>{label}</dt>
                <dd>{submitted[key]}</dd>
              </div>
            ))}
          </dl>
          <Button onClick={() => setSubmitted(null)}>Fill in again</Button>
        </div>
      ) : (
        <form className="form-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Layout follows the class sketch: options | password, name, select | textarea, buttons */}
          <div className="stack area-options">
            <fieldset className="form-options">
              <legend>Account type</legend>
              {ACCOUNT_TYPES.map((type) => (
                <label key={type} className="form-check">
                  <input type="radio" value={type} {...register('accountType')} />
                  {type}
                </label>
              ))}
            </fieldset>
            <ErrorMessage>{errors.accountType?.message}</ErrorMessage>

            <label className="form-check">
              <input type="checkbox" {...register('acceptTerms')} />
              I accept the terms and conditions
            </label>
            <ErrorMessage>{errors.acceptTerms?.message}</ErrorMessage>
          </div>

          <Field id="password" label="Password" error={errors.password?.message} className="area-password">
            <input type="password" placeholder="••••••••" autoComplete="new-password" {...textControl('password')} />
          </Field>

          <Field id="fullName" label="Full name" error={errors.fullName?.message} className="area-name">
            <input placeholder="John Doe" autoComplete="name" {...textControl('fullName')} />
          </Field>

          <Field id="subject" label="Subject" error={errors.subject?.message} className="area-subject">
            <select {...textControl('subject')}>
              <option value="" disabled>Select a subject</option>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </Field>

          <Field id="comments" label="Comments" error={errors.comments?.message} className="area-comments">
            <textarea rows={4} placeholder="Write something…" {...textControl('comments')} />
            <small className={commentsLength > COMMENTS_MAX ? 'counter error' : 'counter'}>
              {commentsLength}/{COMMENTS_MAX}
            </small>
          </Field>

          <div className="form-actions">
            <Button variant="light" onClick={() => reset()}>Clear</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Submit'}</Button>
          </div>
        </form>
      )}

      <BackButton onClick={onBack} />
    </Card>
  )
}
