import { apiClient } from './client'
import type { Library } from '../types/library'

export function getLibraries(): Promise<Library[]> {
  return apiClient<Library[]>('/api/libraries')
}
