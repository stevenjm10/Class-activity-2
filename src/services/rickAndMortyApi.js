const API_URL = 'https://rickandmortyapi.com/api/character'

// Gets one page of characters, optionally filtered by name.
// The API answers 404 when no character matches, so that case returns an empty list.
export async function fetchCharacters({ name, page, signal }) {
  const url = new URL(API_URL)
  url.searchParams.set('page', page)
  if (name) url.searchParams.set('name', name)

  const response = await fetch(url, { signal })
  if (response.status === 404) return { info: { count: 0, pages: 0 }, results: [] }
  if (!response.ok) throw new Error('Could not load characters')
  return response.json()
}
