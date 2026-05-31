import { useEffect, useState } from 'react'
import { useLibraries } from '../hooks/useLibraries'
import { useBooks } from '../hooks/useBooks'
import { LibrarySelector } from '../components/books/LibrarySelector'
import { BookList } from '../components/books/BookList'

export function BooksPage() {
  const { libraries, loading: librariesLoading, error: librariesError } = useLibraries()
  const [selectedLibraryId, setSelectedLibraryId] = useState<number | null>(null)
  const { books, loading: booksLoading, error: booksError } = useBooks(selectedLibraryId)

  useEffect(() => {
    if (libraries.length > 0 && selectedLibraryId === null) {
      setSelectedLibraryId(libraries[0].id)
    }
  }, [libraries, selectedLibraryId])

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Libros por biblioteca</h1>
      <p className="mt-2 text-sm text-slate-400">
        Selecciona una biblioteca para ver su catálogo (requiere autenticación JWT).
      </p>

      <div className="mt-8">
        <LibrarySelector
          libraries={libraries}
          selectedId={selectedLibraryId}
          onChange={setSelectedLibraryId}
          loading={librariesLoading}
          error={librariesError}
        />
      </div>

      <BookList
        books={books}
        loading={booksLoading}
        error={booksError}
        librarySelected={selectedLibraryId !== null}
      />
    </div>
  )
}
