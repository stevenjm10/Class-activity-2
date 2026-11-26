import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatear as formatNumber } from '../logic/calculadora.js'

const MAX_HISTORY = 3

// Adds two numbers and keeps the last few results
export default function Suma() {
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const [result, setResult] = useState(null) // { a, b, total }
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const firstInput = useRef(null)
  const navigate = useNavigate()

  const add = (e) => {
    e.preventDefault()
    if (first === '' || second === '') {
      setError('Enter both numbers')
      return
    }
    const a = Number(first)
    const b = Number(second)
    const entry = { a: formatNumber(a), b: formatNumber(b), total: formatNumber(a + b) }
    setError('')
    setResult(entry)
    setHistory((h) => [entry, ...h].slice(0, MAX_HISTORY))
  }

  const clear = () => {
    setFirst('')
    setSecond('')
    setResult(null)
    setError('')
    firstInput.current?.focus()
  }

  // Typing clears the error message
  const handleChange = (setter) => (e) => {
    setter(e.target.value)
    if (error) setError('')
  }

  const isMissing = (value) => Boolean(error) && value === ''

  return (
    <main className="pantalla">
      <form className="tarjeta sum" onSubmit={add} noValidate>
        <header className="calc-barra">
          <button type="button" className="calc-volver" onClick={() => navigate('/menu')} aria-label="Back to menu">←</button>
          <span>Sum</span>
        </header>

        <div className="sum-fields">
          <label className="field">
            <span>Number 1</span>
            <input
              ref={firstInput}
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="0"
              value={first}
              onChange={handleChange(setFirst)}
              aria-invalid={isMissing(first)}
              autoFocus
            />
          </label>
          <span className="sum-sign" aria-hidden="true">+</span>
          <label className="field">
            <span>Number 2</span>
            <input
              type="number"
              inputMode="decimal"
              step="any"
              placeholder="0"
              value={second}
              onChange={handleChange(setSecond)}
              aria-invalid={isMissing(second)}
            />
          </label>
        </div>

        <p className="error" role="alert">{error}</p>

        <div className="sum-result" aria-live="polite">
          <span className="sum-label">Result</span>
          <div className="calc-historial">{result ? `${result.a} + ${result.b} =` : ' '}</div>
          <output className={`sum-total ${result?.total.length > 12 ? 'small' : ''}`}>
            {result ? result.total : '0'}
          </output>
        </div>

        <div className="fila">
          <button type="button" className="btn-secundario" onClick={clear}>Clear</button>
          <button type="submit" className="btn-primario">Add</button>
        </div>

        {history.length > 0 && (
          <section className="sum-history">
            <h2>Recent sums</h2>
            <ul>
              {history.map((h, i) => (
                <li key={i}>
                  <span>{h.a} + {h.b}</span>
                  <strong>{h.total}</strong>
                </li>
              ))}
            </ul>
          </section>
        )}
      </form>
    </main>
  )
}
