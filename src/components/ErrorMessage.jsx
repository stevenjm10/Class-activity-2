// Shows a validation or loading error; renders nothing when there is no message
export default function ErrorMessage({ children }) {
  if (!children) return null
  return <p className="error" role="alert">{children}</p>
}
