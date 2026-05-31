import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const error = useAuthStore((state) => state.error)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)
  const clearError = useAuthStore((state) => state.clearError)

  return {
    token,
    user,
    isLoading,
    error,
    isAuthenticated: Boolean(token),
    login,
    logout,
    clearError,
  }
}
