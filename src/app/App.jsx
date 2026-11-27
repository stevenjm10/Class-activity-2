import { useState } from 'react'
import Login from './Login.jsx'
import Menu from './Menu.jsx'
import { SCREENS } from './screens.js'

// Simulated navigation (no router): the signed-in user and the open screen are kept in state.
// Flow: Login -> Menu -> one of the apps in SCREENS -> back to Menu
export default function App() {
  const [user, setUser] = useState(null)
  const [screenId, setScreenId] = useState(null) // null = menu

  const signIn = (username) => setUser(username)

  const signOut = () => {
    setUser(null)
    setScreenId(null)
  }

  const backToMenu = () => setScreenId(null)

  if (!user) return <Login onLogin={signIn} />

  const screen = SCREENS.find((s) => s.id === screenId)
  if (!screen) return <Menu user={user} onOpen={setScreenId} onLogout={signOut} />

  const Screen = screen.component
  return <Screen onBack={backToMenu} />
}
