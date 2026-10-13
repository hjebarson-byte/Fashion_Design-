import { useEffect, useState } from 'react'

/**
 * useState that persists to localStorage.
 * - Safely handles missing, corrupted or invalid stored data (falls back to `initial`).
 * - `validate(value)` can reject data that has the wrong shape.
 */
export default function useLocalStorage(key, initial, validate) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initial
      const parsed = JSON.parse(raw)
      if (validate && !validate(parsed)) throw new Error('Invalid stored shape')
      return parsed
    } catch {
      // Corrupted data: discard it and start fresh.
      try {
        window.localStorage.removeItem(key)
      } catch {
        /* storage unavailable */
      }
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or unavailable — app still works in memory */
    }
  }, [key, value])

  return [value, setValue]
}
