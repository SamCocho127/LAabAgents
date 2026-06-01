import axios from 'axios'
import { api } from './axiosClient'

export class ApiError extends Error {
  status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiClient<T>(path: string): Promise<T> {
  try {
    const { data } = await api.get<T>(path)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new ApiError('Sesión expirada o no autorizada. Inicia sesión de nuevo.', 401)
      }
      if (error.code === 'ERR_NETWORK') {
        throw new ApiError('No se pudo conectar con el servidor.')
      }
      throw new ApiError(
        `Error del servidor (${error.response?.status ?? 'desconocido'})`,
        error.response?.status,
      )
    }
    throw error
  }
}
