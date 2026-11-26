import { Routes, Route, Navigate } from 'react-router-dom'
import Calculadora from './pages/Calculadora.jsx'

// Versión solo con la calculadora. El login, el menú y la suma se integran desde la rama dev.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculadora mostrarVolver={false} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
