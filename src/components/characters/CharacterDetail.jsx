import { useEffect, useRef } from 'react'
import Button from '../Button.jsx'
import { statusLabel } from './statusLabel.js'

// Modal dialog with the details of one character (uses the native <dialog> element)
export default function CharacterDetail({ character, onClose }) {
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
            <dt>Status</dt><dd>{statusLabel(character.status)}</dd>
            <dt>Species</dt><dd>{character.species}</dd>
            <dt>Origin</dt><dd>{character.origin.name}</dd>
            <dt>Last known location</dt><dd>{character.location.name}</dd>
            <dt>Episodes</dt><dd>{character.episode.length}</dd>
          </dl>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </dialog>
  )
}
