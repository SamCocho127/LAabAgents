import { useEffect, useState } from 'react'
import { getBooks } from '../api/books'
import { ApiError } from '../api/client'
import type { Book } from '../types/library'

export function useBooks(libraryId: number | null) {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (libraryId === null) {
      setBooks([])
      setLoading(false)
      setError(null)
      return
    }

    const id = libraryId
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await getBooks(id)
        if (!cancelled) {
          setBooks(data)
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof ApiError ? err.message : 'No se pudieron cargar los libros.'
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
  }, [libraryId])

  return { books, loading, error }
}
