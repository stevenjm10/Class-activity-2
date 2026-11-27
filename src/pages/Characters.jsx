import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const STATUS = { Alive: 'Alive', Dead: 'Dead', unknown: 'Unknown' }

function Detail({ character, onClose }) {
  const dialog = useRef(null)

  useEffect(() => {
    const element = dialog.current
    element.showModal()
    return () => element.close()
  }, [])

  return (
    <dialog className="rm-detail" ref={dialog} onCancel={onClose} aria-labelledby="rm-name">
      <div className="rm-detail-body">
        <img src={character.image} alt="" width="300" height="300" />
        <div>
          <h2 id="rm-name">{character.name}</h2>
          <dl>
            <dt>Status</dt><dd>{STATUS[character.status] ?? character.status}</dd>
            <dt>Species</dt><dd>{character.species}</dd>
            <dt>Origin</dt><dd>{character.origin.name}</dd>
            <dt>Last known location</dt><dd>{character.location.name}</dd>
            <dt>Episodes</dt><dd>{character.episode.length}</dd>
          </dl>
          <button className="rm-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  )
}

function Results({ name, page, onPageChange }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      const url = new URL('https://rickandmortyapi.com/api/character')
      url.searchParams.set('page', page)
      if (name) url.searchParams.set('name', name)

      try {
        const response = await fetch(url, { signal: controller.signal })
        if (response.status === 404 && name) {
          if (!controller.signal.aborted) setData({ results: [] })
          return
        }
        if (!response.ok) throw new Error('Could not load characters')
        const result = await response.json()
        if (!controller.signal.aborted) setData(result)
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    }
    load()
    return () => controller.abort()
  }, [name, page, attempt])

  if (error) return (
    <div className="rm-notice">
      <p role="alert">The characters could not be loaded.</p>
      <button className="rm-button light" onClick={() => { setError(false); setAttempt(attempt + 1) }}>Try again</button>
    </div>
  )
  if (!data) return <p role="status" className="rm-notice">Loading characters…</p>
  if (!data.results.length) return <p role="status" className="rm-notice">No results for “{name}”.</p>

  return (
    <>
      <div className="rm-controls">
        <span role="status">{data.info.count} {data.info.count === 1 ? 'character' : 'characters'}</span>
        <nav aria-label="Character pages">
          <button className="rm-button light" disabled={!data.info.prev} onClick={() => onPageChange(page - 1)}>Previous</button>
          <span>{page} of {data.info.pages}</span>
          <button className="rm-button light" disabled={!data.info.next} onClick={() => onPageChange(page + 1)}>Next</button>
        </nav>
      </div>
      <ul className="rm-list">
        {data.results.map((character) => (
          <li key={character.id}>
            <button className="rm-character" onClick={() => setSelected(character)} aria-haspopup="dialog">
              <img src={character.image} alt="" loading="lazy" width="300" height="300" />
              <span className="rm-card">
                <strong>{character.name}</strong>
                <span>{STATUS[character.status] ?? character.status} · {character.species}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {selected && <Detail character={selected} onClose={() => setSelected(null)} />}
    </>
  )
}

// Rick and Morty character search (https://rickandmortyapi.com)
export default function Characters() {
  const [text, setText] = useState('')
  const [query, setQuery] = useState({ name: '', page: 1 })

  // Waits until the user stops typing before searching
  useEffect(() => {
    const name = text.trim()
    if (name === query.name) return
    const timer = setTimeout(() => setQuery({ name, page: 1 }), 350)
    return () => clearTimeout(timer)
  }, [text, query.name])

  return (
    <main className="rm-page">
      <Link className="rm-back" to="/menu">← Back to menu</Link>
      <h1>Rick and Morty characters</h1>
      <label className="rm-search">
        Search by name
        <input type="search" placeholder="e.g. Rick Sanchez" value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <Results
        key={JSON.stringify([query.name, query.page])}
        name={query.name}
        page={query.page}
        onPageChange={(page) => setQuery({ ...query, page })}
      />
    </main>
  )
}
