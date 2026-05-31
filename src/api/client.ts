import { resolveApiUrl } from '../config/api'
import { useAuthStore } from '../store/authStore'

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type ApiClientOptions = RequestInit & {
  auth?: boolean
}

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const { auth = true, headers, ...rest } = options

  const requestHeaders = new Headers(headers)
  if (!requestHeaders.has('Content-Type') && rest.body) {
    requestHeaders.set('Content-Type', 'application/json')
  }

  if (auth) {
    const token = useAuthStore.getState().token
    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`)
    }
  }

  let response: Response
  try {
    response = await fetch(resolveApiUrl(path), {
      ...rest,
      headers: requestHeaders,
    })
  } catch {
    throw new ApiError(
      `No se pudo conectar con el servidor en ${resolveApiUrl(path)}. Ejecuta el backend: dotnet run (puerto 5219).`,
    )
  }

  if (response.status === 401) {
    throw new ApiError('Sesión expirada o no autorizada. Inicia sesión de nuevo.', 401)
  }

  if (!response.ok) {
    throw new ApiError(`Error del servidor (${response.status})`, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
