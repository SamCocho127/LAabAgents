import { apiClient } from './client'
import type { Book } from '../types/library'

export function getBooks(libraryId: number): Promise<Book[]> {
  return apiClient<Book[]>(`/api/libraries/${libraryId}/books`)
}
