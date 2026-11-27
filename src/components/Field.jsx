import ErrorMessage from './ErrorMessage.jsx'

// Label + form control + error message.
// The control (input, select, textarea) is passed as children and must use the same id.
export default function Field({ id, label, error, className = '', children }) {
  return (
    <div className={`field ${className}`.trim()}>
      <label htmlFor={id}>{label}</label>
      {children}
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  )
}
