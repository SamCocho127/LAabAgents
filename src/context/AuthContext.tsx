import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { TOKEN_STORAGE_KEY, setAuthHeader } from '../api/axiosClient'
import { useLogin } from '../hooks/useLogin'
import type { AuthUser, LoginCredentials } from '../types/auth'
import { decodeToken, isTokenExpired } from '../utils/decodeToken'

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  loginLoading: boolean
  loginError: string | null
  clearLoginError: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredSession(): { token: string; user: AuthUser } | null {
  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (!storedToken || isTokenExpired(storedToken)) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    return null
  }

  return { token: storedToken, user: decodeToken(storedToken) }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)

  const loginMutation = useLogin()

  useEffect(() => {
    const session = readStoredSession()
    if (!session) {
      setAuthHeader(null)
      return
    }

    setToken(session.token)
    setUser(session.user)
    setAuthHeader(session.token)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setAuthHeader(null)
    setToken(null)
    setUser(null)
    setLoginError(null)
    loginMutation.reset()
  }, [loginMutation])

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoginError(null)
      try {
        const newToken = await loginMutation.mutateAsync(credentials)
        const decodedUser = decodeToken(newToken)

        localStorage.setItem(TOKEN_STORAGE_KEY, newToken)
        setAuthHeader(newToken)
        setToken(newToken)
        setUser(decodedUser)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error desconocido'
        setLoginError(message)
        throw err
      }
    },
    [loginMutation],
  )

  const clearLoginError = useCallback(() => {
    setLoginError(null)
    loginMutation.reset()
  }, [loginMutation])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === 'admin',
      login,
      logout,
      loginLoading: loginMutation.isPending,
      loginError: loginError ?? (loginMutation.error?.message ?? null),
      clearLoginError,
    }),
    [user, token, login, logout, loginMutation.isPending, loginMutation.error, loginError, clearLoginError],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
