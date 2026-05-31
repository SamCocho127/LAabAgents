import { useEffect, useState } from 'react'
import { getLibraries } from '../api/libraries'
import { ApiError } from '../api/client'
import type { Library } from '../types/library'

export function useLibraries() {
  const [libraries, setLibraries] = useState<Library[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getLibraries()
        if (!cancelled) {
          setLibraries(data)
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof ApiError ? err.message : 'No se pudieron cargar las bibliotecas.'
          setError(message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return { libraries, loading, error }
}
