import { formatNumber } from './formatNumber.js'

// Pure calculator logic used by useReducer in the Calculator page.
// Every action receives the current state and returns a new one (no mutations).

export const ERROR = 'Error'
const MAX_DIGITS = 15

export const initialState = {
  display: '0', // number shown on the screen
  firstNumber: null, // number saved before choosing an operator
  operator: null, // '+', '-', 'x' or '/'
  newNumber: false, // true = the next digit starts a new number
}

function calculate(a, b, operator) {
  if (operator === '+') return a + b
  if (operator === '-') return a - b
  if (operator === 'x') return a * b
  if (operator === '/') return b === 0 ? ERROR : a / b
  return b
}

function solve(state) {
  const result = calculate(state.firstNumber, Number(state.display), state.operator)
  return result === ERROR ? ERROR : formatNumber(result)
}

export function calculatorReducer(state, action) {
  const { display, operator, newNumber } = state
  const isError = display === ERROR

  switch (action.type) {
    case 'digit': {
      const digit = action.value === '00' && (isError || newNumber || display === '0') ? '0' : action.value
      if (isError || newNumber || display === '0') return { ...state, display: digit, newNumber: false }
      if (display.length >= MAX_DIGITS) return state
      return { ...state, display: display + digit }
    }

    case 'dot':
      if (isError || newNumber) return { ...state, display: '0.', newNumber: false }
      if (display.includes('.')) return state
      return { ...state, display: display + '.' }

    case 'operator': {
      if (isError) return state
      // If an operation is already pending, solve it first (1 + 2 x ... shows 3)
      if (operator && !newNumber) {
        const result = solve(state)
        if (result === ERROR) return { ...initialState, display: ERROR, newNumber: true }
        return { display: result, firstNumber: Number(result), operator: action.value, newNumber: true }
      }
      return { ...state, firstNumber: Number(display), operator: action.value, newNumber: true }
    }

    case 'equals':
      if (!operator || isError) return state
      return { ...initialState, display: solve(state), newNumber: true }

    case 'delete':
      if (isError || newNumber) return state
      return { ...state, display: display.length > 1 ? display.slice(0, -1) : '0' }

    case 'reset':
      return initialState

    default:
      return state
  }
}
