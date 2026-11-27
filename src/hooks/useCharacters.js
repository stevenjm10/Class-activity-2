import { useEffect, useState } from 'react'
import { fetchCharacters } from '../services/rickAndMortyApi.js'

// Loads a page of characters and tells the component if it is loading or failed.
// Each answer is saved with the search it belongs to, so an old answer is never shown for a new search.
export function useCharacters(name, page) {
  const search = `${name}|${page}`
  const [response, setResponse] = useState({ search: null, data: null, error: false })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCharacters({ name, page, signal: controller.signal })
      .then((data) => setResponse({ search, data, error: false }))
      .catch(() => {
        if (!controller.signal.aborted) setResponse({ search, data: null, error: true })
      })

    // Cancels the request if the search changes before it finishes
    return () => controller.abort()
  }, [search, name, page, attempt])

  const isCurrent = response.search === search

  const retry = () => {
    setResponse({ search: null, data: null, error: false })
    setAttempt((n) => n + 1)
  }

  return {
    data: isCurrent ? response.data : null,
    error: isCurrent && response.error,
    loading: !isCurrent,
    retry,
  }
}
