import type { Book } from '../../types/library'

interface BookListProps {
  books: Book[]
  loading: boolean
  error: string | null
  librarySelected: boolean
}

export function BookList({ books, loading, error, librarySelected }: BookListProps) {
  if (!librarySelected) {
    return (
      <p className="mt-6 text-sm text-slate-500">Selecciona una biblioteca para ver sus libros.</p>
    )
  }

  if (loading) {
    return <p className="mt-6 text-sm text-slate-400">Cargando libros…</p>
  }

  if (error) {
    return (
      <p className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        {error}
      </p>
    )
  }

  if (books.length === 0) {
    return <p className="mt-6 text-sm text-slate-500">Esta biblioteca no tiene libros.</p>
  }

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-800/80 text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Categoría</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {books.map((book) => (
            <tr key={book.id} className="bg-slate-900/50 hover:bg-slate-800/50">
              <td className="px-4 py-3 text-slate-400">{book.id}</td>
              <td className="px-4 py-3 text-white">{book.name}</td>
              <td className="px-4 py-3 text-indigo-300">{book.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
