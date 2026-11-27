import Button from '../Button.jsx'

// Previous / Next buttons with the current page
export default function Pagination({ page, totalPages, onChange }) {
  return (
    <nav className="rm-pagination" aria-label="Character pages">
      <Button variant="light" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</Button>
      <span>{page} of {totalPages}</span>
      <Button variant="light" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Next</Button>
    </nav>
  )
}
