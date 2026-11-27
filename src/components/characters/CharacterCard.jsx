import { statusLabel } from './statusLabel.js'

// One character in the list; clicking it opens the detail
export default function CharacterCard({ character, onSelect }) {
  return (
    <button type="button" className="rm-character" onClick={() => onSelect(character)} aria-haspopup="dialog">
      <img src={character.image} alt="" loading="lazy" width="300" height="300" />
      <span className="rm-card">
        <strong>{character.name}</strong>
        <span>{statusLabel(character.status)} · {character.species}</span>
      </span>
    </button>
  )
}
