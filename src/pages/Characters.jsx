import { useState } from 'react'
import BackButton from '../components/BackButton.jsx'
import CharacterResults from '../components/characters/CharacterResults.jsx'
import { useDebounce } from '../hooks/useDebounce.js'

// Page 4 - Rick and Morty character search (https://rickandmortyapi.com)
export default function Characters({ onBack }) {
  const [text, setText] = useState('')
  const name = useDebounce(text.trim(), 350) // searches only after the user stops typing

  return (
    <main className="rm-page">
      <BackButton onClick={onBack} />
      <h1>Rick and Morty characters</h1>

      <label className="rm-search">
        Search by name
        <input type="search" placeholder="e.g. Rick Sanchez" value={text} onChange={(e) => setText(e.target.value)} />
      </label>

      {/* key={name}: a new search shows fresh results starting on page 1 */}
      <CharacterResults key={name} name={name} />
    </main>
  )
}
