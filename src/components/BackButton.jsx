import Button from './Button.jsx'

// Same "back to menu" button on every screen
export default function BackButton({ onClick, className }) {
  return (
    <Button variant="light" className={className} onClick={onClick}>
      ← Back to menu
    </Button>
  )
}
