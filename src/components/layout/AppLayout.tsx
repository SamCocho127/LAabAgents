import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BookOpen, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export function AppLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link to="/books" className="flex items-center gap-2 font-semibold text-white">
            <BookOpen className="h-5 w-5 text-indigo-400" />
            Biblioteca
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden text-sm text-slate-400 sm:inline">
                {user.email} · <span className="text-indigo-300">{user.role}</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
