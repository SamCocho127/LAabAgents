import { useLocation, useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const routeError = (location.state as { error?: string } | null)?.error

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        {routeError && (
          <p className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            {routeError}
          </p>
        )}
        <LoginForm onSuccess={() => navigate('/books', { replace: true })} />
      </div>
    </div>
  )
}
