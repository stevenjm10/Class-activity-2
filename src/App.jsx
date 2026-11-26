import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Menu from './pages/Menu.jsx'
import Suma from './pages/Suma.jsx'
import Calculadora from './pages/Calculadora.jsx'

// Flujo: Login -> Menú -> (Suma | Calculadora)
export default function App() {
  const [usuario, setUsuario] = useState(null)

  // Si no hay sesión iniciada, cualquier ruta protegida vuelve al login
  const protegida = (elemento) => (usuario ? elemento : <Navigate to="/" replace />)

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={setUsuario} />} />
      <Route path="/menu" element={protegida(<Menu usuario={usuario} onLogout={() => setUsuario(null)} />)} />
      <Route path="/suma" element={protegida(<Suma />)} />
      <Route path="/calculadora" element={protegida(<Calculadora />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
