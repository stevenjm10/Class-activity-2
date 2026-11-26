import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Menu from './pages/Menu.jsx'
import Sum from './pages/Sum.jsx'
import Calculator from './pages/Calculator.jsx'
import Form from './pages/Form.jsx'

// Flow: Login -> Menu -> (Sum | Calculator | Form)
export default function App() {
  const [user, setUser] = useState(null)

  // Without a signed-in user, protected routes go back to the login screen
  const protect = (element) => (user ? element : <Navigate to="/" replace />)

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={setUser} />} />
      <Route path="/menu" element={protect(<Menu user={user} onLogout={() => setUser(null)} />)} />
      <Route path="/sum" element={protect(<Sum />)} />
      <Route path="/calculator" element={protect(<Calculator />)} />
      <Route path="/form" element={protect(<Form />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
