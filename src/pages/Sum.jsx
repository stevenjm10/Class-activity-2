import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Card from '../components/Card.jsx'
import Field from '../components/Field.jsx'
import Button from '../components/Button.jsx'
import BackButton from '../components/BackButton.jsx'
import { sumDefaults, sumSchema } from '../schemas/sumSchema.js'
import { formatNumber } from '../utils/formatNumber.js'

const MAX_HISTORY = 3

// Page 1 - Sum: adds two numbers and keeps the last few results
export default function Sum({ onBack }) {
  const [result, setResult] = useState(null) // { a, b, total }
  const [history, setHistory] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({ resolver: zodResolver(sumSchema), defaultValues: sumDefaults })

  // Zod already turned num1 and num2 into numbers
  const add = ({ num1, num2 }) => {
    const entry = { a: formatNumber(num1), b: formatNumber(num2), total: formatNumber(num1 + num2) }
    setResult(entry)
    setHistory((previous) => [entry, ...previous].slice(0, MAX_HISTORY))
  }

  const clear = () => {
    reset()
    setResult(null)
    // Wait for the reset to be drawn, then put the cursor back in the first input
    setTimeout(() => setFocus('num1'))
  }

  // Both inputs are the same, only the name and label change
  const numberInput = (name, label) => (
    <Field id={name} label={label} error={errors[name]?.message}>
      <input
        id={name}
        type="number"
        inputMode="decimal"
        step="any"
        placeholder="0"
        aria-invalid={Boolean(errors[name])}
        {...register(name)}
      />
    </Field>
  )

  return (
    <Card title="Sum">
      <form className="stack" onSubmit={handleSubmit(add)} noValidate>
        <div className="sum-inputs">
          {numberInput('num1', 'Number 1')}
          <span className="plus-sign" aria-hidden="true">+</span>
          {numberInput('num2', 'Number 2')}
        </div>

        <div className="sum-result" aria-live="polite">
          <small>{result ? `${result.a} + ${result.b} =` : 'Result'}</small>
          <output>{result ? result.total : '0'}</output>
        </div>

        <div className="row">
          <Button variant="light" onClick={clear}>Clear</Button>
          <Button type="submit">Add</Button>
        </div>
      </form>

      {history.length > 0 && (
        <div className="sum-history">
          <h2>Recent sums</h2>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <span>{entry.a} + {entry.b}</span>
                <strong>{entry.total}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}

      <BackButton onClick={onBack} />
    </Card>
  )
}
