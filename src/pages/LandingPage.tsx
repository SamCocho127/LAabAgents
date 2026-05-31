import { Link } from 'react-router-dom'
import { BookOpen, LogIn } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
          <BookOpen className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Gestión de Bibliotecas</h1>
        <p className="mt-4 text-slate-400">
          Consulta el catálogo de libros de cada biblioteca. Inicia sesión para acceder al
          contenido protegido con JWT.
        </p>
        <Link
          to="/login"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-500"
        >
          <LogIn className="h-5 w-5" />
          Iniciar sesión
        </Link>
      </div>
    </div>
  )
}
