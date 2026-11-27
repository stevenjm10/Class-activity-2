// App button with two looks: 'primary' (blue) and 'light' (gray).
// type defaults to "button" so it never submits a form by accident.
export default function Button({ variant = 'primary', type = 'button', className = '', ...props }) {
  return <button type={type} className={`btn btn-${variant} ${className}`.trim()} {...props} />
}
