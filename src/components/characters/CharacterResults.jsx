import { useState } from 'react'
import { useCharacters } from '../../hooks/useCharacters.js'
import Button from '../Button.jsx'
import ErrorMessage from '../ErrorMessage.jsx'
import CharacterCard from './CharacterCard.jsx'
import CharacterDetail from './CharacterDetail.jsx'
import Pagination from './Pagination.jsx'

// Results for one search. The parent gives it key={name}, so a new search starts again on page 1.
export default function CharacterResults({ name }) {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(null)
  const { data, error, loading, retry } = useCharacters(name, page)

  if (error) {
    return (
      <div className="rm-notice">
        <ErrorMessage>The characters could not be loaded.</ErrorMessage>
        <Button variant="light" onClick={retry}>Try again</Button>
      </div>
    )
  }
  if (loading) return <p role="status" className="rm-notice">Loading characters…</p>
  if (data.results.length === 0) return <p role="status" className="rm-notice">No results for “{name}”.</p>

  const { count, pages } = data.info

  return (
    <>
      <div className="rm-controls">
        <span role="status">{count} {count === 1 ? 'character' : 'characters'}</span>
        <Pagination page={page} totalPages={pages} onChange={setPage} />
      </div>

      <ul className="rm-list">
        {data.results.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} onSelect={setSelected} />
          </li>
        ))}
      </ul>

      {selected && <CharacterDetail character={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
