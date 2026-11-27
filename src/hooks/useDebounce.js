import { useEffect, useState } from 'react'

// Returns the value only after it stops changing for `delay` ms (used to search while typing)
export function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
