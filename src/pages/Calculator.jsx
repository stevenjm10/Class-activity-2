import { useReducer } from 'react'
import BackButton from '../components/BackButton.jsx'
import { calculatorReducer, initialState } from '../utils/calculator.js'

const digits = (...values) => values.map((value) => ({ label: value, kind: 'digit', action: { type: 'digit', value } }))
const operator = (value) => ({ label: value, kind: 'operator', action: { type: 'operator', value } })

// Keys in screen order (4 columns). `kind` sets the color, `action` is sent to the reducer.
const KEYS = [
  { label: 'Reset', kind: 'action', action: { type: 'reset' } },
  operator('-'),
  operator('x'),
  { label: 'DEL', kind: 'action', action: { type: 'delete' } },
  ...digits('7', '8', '9'),
  operator('/'),
  ...digits('4', '5', '6'),
  operator('+'),
  ...digits('1', '2', '3'),
  { label: '=', kind: 'equals', action: { type: 'equals' } },
  ...digits('00', '0'),
  { label: '.', kind: 'digit', action: { type: 'dot' } },
]

// Page 2 - Calculator: the state lives in a reducer (src/utils/calculator.js); this component only draws it
export default function Calculator({ onBack }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)

  return (
    <main className="page">
      <section className="calculator">
        <BackButton className="calculator-back" onClick={onBack} />

        <div className="display" aria-live="polite">
          <small>{state.operator ? `${state.firstNumber} ${state.operator}` : ''}</small>
          <span>{state.display}</span>
        </div>

        <div className="keys">
          {KEYS.map((key) => (
            <button key={key.label} type="button" className={`key key-${key.kind}`} onClick={() => dispatch(key.action)}>
              {key.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
