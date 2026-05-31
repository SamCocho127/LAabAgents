import { resolveApiUrl } from '../config/api'
import type { LoginCredentials, TokenResponse } from '../types/auth'

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function login(credentials: LoginCredentials): Promise<TokenResponse> {
  let response: Response
  try {
    response = await fetch(resolveApiUrl('/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
  } catch {
    throw new AuthError(
      `No se pudo conectar con el servidor en ${resolveApiUrl('/login')}. Ejecuta el backend: dotnet run (puerto 5219).`,
    )
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new AuthError('Correo o contraseña incorrectos.')
    }
    throw new AuthError('No se pudo iniciar sesión. Inténtalo de nuevo.')
  }

  return response.json() as Promise<TokenResponse>
}