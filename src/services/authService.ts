import axios from 'axios'
import { api } from '../api/axiosClient'
import { API_BASE_URL } from '../config/api'
import type { LoginCredentials, TokenResponse } from '../types/auth'

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function login(credentials: LoginCredentials): Promise<string> {
  try {
    const { data } = await api.post<TokenResponse>('/login', credentials)
    return data.token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new AuthError('Correo o contraseña incorrectos.')
      }
      if (error.code === 'ERR_NETWORK') {
        const base = API_BASE_URL || 'el servidor configurado'
        throw new AuthError(`No se pudo conectar con ${base}.`)
      }
      throw new AuthError('No se pudo iniciar sesión. Inténtalo de nuevo.')
    }
    throw error
  }
}
