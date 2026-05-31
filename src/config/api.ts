const apiUrl = import.meta.env.VITE_API_URL ?? ''

export function resolveApiUrl(path: string): string {
  if (!apiUrl) {
    return path
  }
  const base = apiUrl.replace(/\/$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export const API_BASE_URL = apiUrl
