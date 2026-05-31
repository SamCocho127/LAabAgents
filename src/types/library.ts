export interface Library {
  id: number
  name: string
  location: string
}

export interface Book {
  id: number
  name: string
  category: string
  libraryId: number
}
