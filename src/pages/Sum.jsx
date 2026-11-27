import { useRef, useState } from 'react'

const MAX_HISTORY = 3

// Rounds away floating point noise, so 0.1 + 0.2 shows 0.3
const format = (n) => String(parseFloat(n.toPrecision(12)))

// Two-number sum app
export default function Sum({ onBack }) {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState(null) // { a, b, total }
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const firstInput = useRef(null)

  const add = (e) => {
    e.preventDefault()
    if (num1 === '' || num2 === '') {
      setError('Enter both numbers')
      return
    }
    const a = Number(num1)
    const b = Number(num2)
    const entry = { a: format(a), b: format(b), total: format(a + b) }
    setError('')
    setResult(entry)
    setHistory((h) => [entry, ...h].slice(0, MAX_HISTORY))
  }

  const clear = () => {
    setNum1('')
    setNum2('')
    setResult(null)
    setError('')
    firstInput.current?.focus()
  }

  // Typing hides the error message
  const handleChange = (setter) => (e) => {
    setter(e.target.value)
    if (error) setError('')
  }

  const isMissing = (value) => Boolean(error) && value === ''

  return (
    <div className="page">
      <form className="box" onSubmit={add} noValidate>
        <h1>Sum</h1>

        <div className="sum-inputs">
          <label className="field">
            Number 1
            <input
              ref={firstInput}
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="0"
              value={num1}
              onChange={handleChange(setNum1)}
              aria-invalid={isMissing(num1)}
              autoFocus
            />
          </label>
          <span className="plus-sign" aria-hidden="true">+</span>
          <label className="field">
            Number 2
            <input
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="0"
              value={num2}
              onChange={handleChange(setNum2)}
              aria-invalid={isMissing(num2)}
            />
          </label>
        </div>

        {error && <p className="error" role="alert">{error}</p>}

        <div className="sum-result" aria-live="polite">
          <small>{result ? `${result.a} + ${result.b} =` : 'Result'}</small>
          <output>{result ? result.total : '0'}</output>
        </div>

        <div className="row">
          <button type="button" className="light-button" onClick={clear}>Clear</button>
          <button type="submit">Add</button>
        </div>

        {history.length > 0 && (
          <div className="sum-history">
            <h2>Recent sums</h2>
            <ul>
              {history.map((h, i) => (
                <li key={i}>
                  <span>{h.a} + {h.b}</span>
                  <strong>{h.total}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button type="button" className="light-button" onClick={onBack}>← Back to menu</button>
      </form>
    </div>
  )
}
