import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Aplicación de suma de dos números (parte del compañero)
export default function Suma() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [resultado, setResultado] = useState('')
  const navigate = useNavigate()

  const sumar = () => {
    if (num1 === '' || num2 === '') {
      setResultado('Ingresa ambos números')
      return
    }
    setResultado(String(Number(num1) + Number(num2)))
  }

  return (
    <main className="pantalla">
      <section className="tarjeta">
        <h1>Suma</h1>
        <div className="fila">
          <input type="number" placeholder="Número 1" value={num1} onChange={(e) => setNum1(e.target.value)} />
          <input type="number" placeholder="Número 2" value={num2} onChange={(e) => setNum2(e.target.value)} />
        </div>
        <div className="fila">
          <input type="text" placeholder="Resultado" value={resultado} readOnly />
          <button className="btn-primario" onClick={sumar}>Sumar</button>
        </div>
        <button className="btn-secundario" onClick={() => navigate('/menu')}>← Volver al menú</button>
      </section>
    </main>
  )
}
