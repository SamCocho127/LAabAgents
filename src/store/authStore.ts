import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as loginApi } from '../api/auth'
import type { AuthUser, LoginCredentials } from '../types/auth'

function parseUserFromToken(token: string): AuthUser | null {
  try {
    const payload = token.split('.')[1]
    if (!payload) return null

    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as Record<
      string,
      string
    >

    const email =
      decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ??
      decoded.email ??
      ''
    const role =
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
      decoded.role ??
      ''

    return { email, role }
  } catch {
    return null
  }
}

interface AuthState {
  token: string | null
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const { token } = await loginApi(credentials)
          const user = parseUserFromToken(token)
          set({ token, user, isLoading: false })
          return true
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Error desconocido'
          set({ error: message, isLoading: false })
          return false
        }
      },

      logout: () => set({ token: null, user: null, error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
)
