import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPES, SUBJECTS, defaultValues, formSchema } from '../schemas/formSchema.js'

// Form view: radio, checkbox, password, text input, select and textarea,
// validated with React Hook Form + Zod.
export default function Form() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: 'onTouched',
  })

  const commentsLength = useWatch({ control, name: 'comments' })?.length ?? 0

  const onSubmit = async (data) => {
    // Simulates sending the data to a server
    await new Promise((resolve) => setTimeout(resolve, 500))
    const { password, ...visibleData } = data
    setSubmitted({ ...visibleData, password: '•'.repeat(password.length) })
    reset()
  }

  return (
    <div className="page">
      <div className="box form-box">
        <h1>Registration form</h1>

        {submitted ? (
          <div className="form-success">
            <p className="form-success-title">✔ Form submitted</p>
            <dl className="form-summary">
              <dt>Account type</dt><dd>{submitted.accountType}</dd>
              <dt>Full name</dt><dd>{submitted.fullName}</dd>
              <dt>Password</dt><dd>{submitted.password}</dd>
              <dt>Subject</dt><dd>{submitted.subject}</dd>
              <dt>Comments</dt><dd>{submitted.comments}</dd>
            </dl>
            <button onClick={() => setSubmitted(null)}>Fill in again</button>
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Layout follows the sketch: options | password, name, select | textarea, submit */}
            <div className="form-field area-options">
              <fieldset className="form-options">
                <legend>Account type</legend>
                {ACCOUNT_TYPES.map((type) => (
                  <label key={type} className="form-check">
                    <input type="radio" value={type} {...register('accountType')} />
                    {type}
                  </label>
                ))}
              </fieldset>
              {errors.accountType && <p className="form-error">{errors.accountType.message}</p>}

              <label className="form-check">
                <input type="checkbox" {...register('acceptTerms')} />
                I accept the terms and conditions
              </label>
              {errors.acceptTerms && <p className="form-error">{errors.acceptTerms.message}</p>}
            </div>

            <div className="form-field area-password">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" autoComplete="new-password" {...register('password')} />
              {errors.password && <p className="form-error">{errors.password.message}</p>}
            </div>

            <div className="form-field area-name">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" type="text" placeholder="John Doe" autoComplete="name" {...register('fullName')} />
              {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
            </div>

            <div className="form-field area-subject">
              <label htmlFor="subject">Subject</label>
              <select id="subject" {...register('subject')}>
                <option value="" disabled>Select a subject</option>
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subject && <p className="form-error">{errors.subject.message}</p>}
            </div>

            <div className="form-field area-comments">
              <label htmlFor="comments">Comments</label>
              <textarea id="comments" rows={4} placeholder="Write something…" {...register('comments')} />
              <div className="form-hint">
                {errors.comments ? <p className="form-error">{errors.comments.message}</p> : <span />}
                <span className={commentsLength > 300 ? 'form-error' : ''}>{commentsLength}/300</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="light-button" onClick={() => reset()}>Clear</button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </form>
        )}

        <button className="light-button" onClick={() => navigate('/menu')}>← Back to menu</button>
      </div>
    </div>
  )
}
