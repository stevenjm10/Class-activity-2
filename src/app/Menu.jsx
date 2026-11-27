import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import { SCREENS } from './screens.js'

// Menu with one button per app in SCREENS
export default function Menu({ user, onOpen, onLogout }) {
  return (
    <Card title={`Hello, ${user}`}>
      <p>Choose an app:</p>
      {SCREENS.map((screen) => (
        <Button key={screen.id} onClick={() => onOpen(screen.id)}>{screen.label}</Button>
      ))}
      <Button variant="light" onClick={onLogout}>Sign out</Button>
    </Card>
  )
}
