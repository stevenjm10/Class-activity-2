// Lógica de la calculadora como funciones puras: reciben el estado y devuelven uno nuevo.

export const ERROR = 'Error'
const MAX_DIGITOS = 16

export const estadoInicial = {
  pantalla: '0',      // número que se ve en grande
  acumulado: null,    // primer operando guardado
  operador: null,     // '+', '−', '×', '÷'
  esperando: false,   // true = el siguiente dígito empieza un número nuevo
  historial: '',      // línea pequeña arriba, ej. "12 + "
}

// Quita errores de coma flotante (0.1 + 0.2 = 0.3) y formatea
export function formatear(n) {
  if (!Number.isFinite(n)) return ERROR
  return String(parseFloat(n.toPrecision(12)))
}

function operar(a, b, op) {
  switch (op) {
    case '+': return a + b
    case '−': return a - b
    case '×': return a * b
    case '÷': return b === 0 ? NaN : a / b
    default: return b
  }
}

const enError = (s) => s.pantalla === ERROR

export function digito(s, d) {
  if (enError(s)) s = estadoInicial
  if (s.esperando) return { ...s, pantalla: d, esperando: false }
  if (s.pantalla.replace(/[-.]/g, '').length >= MAX_DIGITOS) return s
  return { ...s, pantalla: s.pantalla === '0' ? d : s.pantalla + d }
}

export function punto(s) {
  if (enError(s)) s = estadoInicial
  if (s.esperando) return { ...s, pantalla: '0.', esperando: false }
  if (s.pantalla.includes('.')) return s
  return { ...s, pantalla: s.pantalla + '.' }
}

export function operador(s, op) {
  if (enError(s)) return s
  const actual = Number(s.pantalla)
  // Cambiar de operador sin haber escrito el segundo número
  if (s.operador && s.esperando) {
    return { ...s, operador: op, historial: `${formatear(s.acumulado)} ${op} ` }
  }
  let acumulado = actual
  if (s.operador) {
    const r = operar(s.acumulado, actual, s.operador)
    if (!Number.isFinite(r)) return { ...estadoInicial, pantalla: ERROR, historial: 'No se puede dividir entre 0' }
    acumulado = r
  }
  return {
    pantalla: formatear(acumulado),
    acumulado,
    operador: op,
    esperando: true,
    historial: `${formatear(acumulado)} ${op} `,
  }
}

export function igual(s) {
  if (enError(s) || !s.operador) return s
  const b = Number(s.pantalla)
  const r = operar(s.acumulado, b, s.operador)
  const historial = `${formatear(s.acumulado)} ${s.operador} ${formatear(b)} =`
  if (!Number.isFinite(r)) return { ...estadoInicial, pantalla: ERROR, historial: 'No se puede dividir entre 0' }
  return { pantalla: formatear(r), acumulado: null, operador: null, esperando: true, historial }
}

// Operaciones de un solo número: 1/x, x², √x, ±, %
export function unaria(s, tipo) {
  if (enError(s)) return s
  const x = Number(s.pantalla)
  let r
  switch (tipo) {
    case 'inverso': r = x === 0 ? NaN : 1 / x; break
    case 'cuadrado': r = x * x; break
    case 'raiz': r = x < 0 ? NaN : Math.sqrt(x); break
    case 'signo':
      if (s.pantalla === '0') return s
      return { ...s, pantalla: s.pantalla.startsWith('-') ? s.pantalla.slice(1) : '-' + s.pantalla }
    case 'porcentaje':
      // Con + o − el % es sobre el primer número (100 + 10% = 110); si no, x/100
      r = s.operador === '+' || s.operador === '−' ? (s.acumulado * x) / 100 : x / 100
      break
    default: return s
  }
  if (!Number.isFinite(r)) return { ...estadoInicial, pantalla: ERROR, historial: 'Entrada no válida' }
  const simbolos = { inverso: '1/', cuadrado: 'sqr', raiz: '√' }
  const previo = s.operador ? `${formatear(s.acumulado)} ${s.operador} ` : ''
  const historial = simbolos[tipo] ? `${previo}${simbolos[tipo]}(${formatear(x)})` : s.historial
  return { ...s, pantalla: formatear(r), esperando: true, historial }
}

export function borrarEntrada(s) {           // CE
  if (enError(s)) return estadoInicial
  return { ...s, pantalla: '0', esperando: false }
}

export function borrarTodo() {               // C
  return estadoInicial
}

export function retroceso(s) {               // ⌫
  if (enError(s)) return estadoInicial
  if (s.esperando) return s
  const p = s.pantalla.slice(0, -1)
  return { ...s, pantalla: p === '' || p === '-' ? '0' : p }
}
