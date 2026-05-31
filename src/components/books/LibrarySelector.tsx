import type { Library } from '../../types/library'

interface LibrarySelectorProps {
  libraries: Library[]
  selectedId: number | null
  onChange: (libraryId: number) => void
  loading: boolean
  error: string | null
}

export function LibrarySelector({
  libraries,
  selectedId,
  onChange,
  loading,
  error,
}: LibrarySelectorProps) {
  if (loading) {
    return <p className="text-sm text-slate-400">Cargando bibliotecas…</p>
  }

  if (error) {
    return (
      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
        {error}
      </p>
    )
  }

  if (libraries.length === 0) {
    return <p className="text-sm text-slate-400">No hay bibliotecas disponibles.</p>
  }

  return (
    <div>
      <label htmlFor="library" className="mb-1.5 block text-sm font-medium text-slate-300">
        Biblioteca
      </label>
      <select
        id="library"
        value={selectedId ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
      >
        <option value="" disabled>
          Selecciona una biblioteca
        </option>
        {libraries.map((library) => (
          <option key={library.id} value={library.id}>
            {library.name} — {library.location}
          </option>
        ))}
      </select>
    </div>
  )
}
