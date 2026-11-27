import { useState } from 'react'
import Login from './pages/Login.jsx'
import Menu from './pages/Menu.jsx'
import Sum from './pages/Sum.jsx'
import Calculator from './pages/Calculator.jsx'
import Form from './pages/Form.jsx'
import Characters from './pages/Characters.jsx'

// Simulated navigation (no router): the current screen is kept in state.
// Flow: Login -> Menu -> (Sum | Calculator | Form | Characters)
const SCREENS = { sum: Sum, calculator: Calculator, form: Form, characters: Characters }

export default function App() {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState('menu')

  const signIn = (name) => {
    setUser(name)
    setScreen('menu')
  }

  const signOut = () => {
    setUser(null)
    setScreen('menu')
  }

  const backToMenu = () => setScreen('menu')

  // Without a signed-in user, only the login screen is shown
  if (!user) return <Login onLogin={signIn} />

  const Screen = SCREENS[screen]
  if (Screen) return <Screen onBack={backToMenu} />

  return <Menu user={user} onOpen={setScreen} onLogout={signOut} />
}
