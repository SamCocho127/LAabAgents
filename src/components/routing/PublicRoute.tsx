import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function PublicRoute() {
  const { isAuthenticated, isAdmin } = useAuth()

  if (isAuthenticated && isAdmin) {
    return <Navigate to="/books" replace />
  }

  return <Outlet />
}
