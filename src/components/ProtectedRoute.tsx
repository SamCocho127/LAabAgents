import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ error: 'Acceso denegado: se requiere rol admin.' }}
      />
    )
  }

  return <Outlet />
}
