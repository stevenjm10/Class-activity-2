import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as calc from '../logic/calculadora.js'

// Distribución de teclas igual a una calculadora de móvil / Windows estándar
const TECLAS = [
  { t: '%', tipo: 'fn', accion: (s) => calc.unaria(s, 'porcentaje') },
  { t: 'CE', tipo: 'fn', accion: calc.borrarEntrada },
  { t: 'C', tipo: 'fn', accion: calc.borrarTodo },
  { t: '⌫', tipo: 'fn', accion: calc.retroceso, label: 'Borrar' },
  { t: '¹⁄ₓ', tipo: 'fn', accion: (s) => calc.unaria(s, 'inverso'), label: 'Inverso' },
  { t: 'x²', tipo: 'fn', accion: (s) => calc.unaria(s, 'cuadrado'), label: 'Cuadrado' },
  { t: '√x', tipo: 'fn', accion: (s) => calc.unaria(s, 'raiz'), label: 'Raíz cuadrada' },
  { t: '÷', tipo: 'op', accion: (s) => calc.operador(s, '÷') },
  ...['7', '8', '9'].map((d) => ({ t: d, tipo: 'num', accion: (s) => calc.digito(s, d) })),
  { t: '×', tipo: 'op', accion: (s) => calc.operador(s, '×') },
  ...['4', '5', '6'].map((d) => ({ t: d, tipo: 'num', accion: (s) => calc.digito(s, d) })),
  { t: '−', tipo: 'op', accion: (s) => calc.operador(s, '−') },
  ...['1', '2', '3'].map((d) => ({ t: d, tipo: 'num', accion: (s) => calc.digito(s, d) })),
  { t: '+', tipo: 'op', accion: (s) => calc.operador(s, '+') },
  { t: '+/−', tipo: 'num', accion: (s) => calc.unaria(s, 'signo'), label: 'Cambiar signo' },
  { t: '0', tipo: 'num', accion: (s) => calc.digito(s, '0') },
  { t: '.', tipo: 'num', accion: calc.punto, label: 'Punto decimal' },
  { t: '=', tipo: 'igual', accion: calc.igual },
]

// Teclado físico -> acción
const ATAJOS = {
  Enter: calc.igual, '=': calc.igual, '.': calc.punto, ',': calc.punto,
  Backspace: calc.retroceso, Escape: calc.borrarTodo, Delete: calc.borrarEntrada,
  '+': (s) => calc.operador(s, '+'), '-': (s) => calc.operador(s, '−'),
  '*': (s) => calc.operador(s, '×'), '/': (s) => calc.operador(s, '÷'),
  '%': (s) => calc.unaria(s, 'porcentaje'),
}

export default function Calculadora() {
  const [estado, setEstado] = useState(calc.estadoInicial)
  const navigate = useNavigate()

  useEffect(() => {
    const alPresionar = (e) => {
      const accion = /^\d$/.test(e.key) ? (s) => calc.digito(s, e.key) : ATAJOS[e.key]
      if (accion) {
        e.preventDefault()
        setEstado(accion)
      }
    }
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [])

  // Letra más pequeña cuando el número es largo
  const largo = estado.pantalla.length
  const tamano = largo > 14 ? 'chico' : largo > 9 ? 'mediano' : ''

  return (
    <main className="pantalla">
      <section className="calculadora">
        <header className="calc-barra">
          <button className="calc-volver" onClick={() => navigate('/menu')} aria-label="Volver al menú">←</button>
          <span>Estándar</span>
        </header>

        <div className="calc-display" aria-live="polite">
          <div className="calc-historial">{estado.historial || ' '}</div>
          <div className={`calc-numero ${tamano}`}>{estado.pantalla}</div>
        </div>

        <div className="calc-teclas">
          {TECLAS.map((k) => (
            <button
              key={k.t}
              className={`tecla tecla-${k.tipo}`}
              aria-label={k.label || k.t}
              onClick={() => setEstado(k.accion)}
            >
              {k.t}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
