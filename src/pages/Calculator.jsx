import { useState } from 'react'

// Does the math for the selected operator
function calculate(a, b, operator) {
  if (operator === '+') return a + b
  if (operator === '-') return a - b
  if (operator === 'x') return a * b
  if (operator === '/') return b === 0 ? 'Error' : a / b
  return b
}

// Rounds the result so 0.1 + 0.2 shows 0.3
function round(value) {
  if (value === 'Error') return value
  return String(parseFloat(value.toFixed(10)))
}

export default function Calculator({ onBack }) {
  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [newNumber, setNewNumber] = useState(false)

  const pressNumber = (num) => {
    if (display === 'Error' || newNumber) {
      setDisplay(num === '00' ? '0' : num)
      setNewNumber(false)
    } else if (display === '0') {
      setDisplay(num === '00' ? '0' : num)
    } else if (display.length < 15) {
      setDisplay(display + num)
    }
  }

  const pressDot = () => {
    if (display === 'Error' || newNumber) {
      setDisplay('0.')
      setNewNumber(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const pressOperator = (op) => {
    if (display === 'Error') return
    // If there is already an operation pending, solve it first
    if (operator && !newNumber) {
      const result = round(calculate(firstNumber, Number(display), operator))
      setDisplay(result)
      setFirstNumber(result === 'Error' ? null : Number(result))
      setOperator(result === 'Error' ? null : op)
    } else {
      setFirstNumber(Number(display))
      setOperator(op)
    }
    setNewNumber(true)
  }

  const pressEquals = () => {
    if (!operator || display === 'Error') return
    setDisplay(round(calculate(firstNumber, Number(display), operator)))
    setFirstNumber(null)
    setOperator(null)
    setNewNumber(true)
  }

  const reset = () => {
    setDisplay('0')
    setFirstNumber(null)
    setOperator(null)
    setNewNumber(false)
  }

  const deleteLast = () => {
    if (display === 'Error' || newNumber) return
    setDisplay(display.length > 1 ? display.slice(0, -1) : '0')
  }

  return (
    <div className="page">
      <div className="calculator">
        {onBack && (
          <button className="back-button" onClick={onBack}>Back</button>
        )}

        <div className="display">
          <small>{operator ? `${firstNumber} ${operator}` : ''}</small>
          <span>{display}</span>
        </div>

        <div className="buttons">
          <button className="action" onClick={reset}>Reset</button>
          <button className="operator" onClick={() => pressOperator('-')}>-</button>
          <button className="operator" onClick={() => pressOperator('x')}>x</button>
          <button className="action" onClick={deleteLast}>DEL</button>

          <button onClick={() => pressNumber('7')}>7</button>
          <button onClick={() => pressNumber('8')}>8</button>
          <button onClick={() => pressNumber('9')}>9</button>
          <button className="operator" onClick={() => pressOperator('/')}>/</button>

          <button onClick={() => pressNumber('4')}>4</button>
          <button onClick={() => pressNumber('5')}>5</button>
          <button onClick={() => pressNumber('6')}>6</button>
          <button className="operator" onClick={() => pressOperator('+')}>+</button>

          <button onClick={() => pressNumber('1')}>1</button>
          <button onClick={() => pressNumber('2')}>2</button>
          <button onClick={() => pressNumber('3')}>3</button>
          <button className="equals" onClick={pressEquals}>=</button>

          <button onClick={() => pressNumber('00')}>00</button>
          <button onClick={() => pressNumber('0')}>0</button>
          <button onClick={pressDot}>.</button>
        </div>
      </div>
    </div>
  )
}
