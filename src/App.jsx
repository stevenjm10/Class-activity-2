import { Routes, Route, Navigate } from 'react-router-dom'
import Calculator from './pages/Calculator.jsx'

// Calculator-only version. Login, menu and sum are developed on the dev branch.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator showBack={false} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
