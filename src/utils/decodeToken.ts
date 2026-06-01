import { jwtDecode } from 'jwt-decode'
import type { AuthUser } from '../types/auth'

interface JwtPayload {
  exp?: number
  email?: string
  role?: string
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string
}

export function decodeToken(token: string): AuthUser {
  const decoded = jwtDecode<JwtPayload>(token)

  return {
    email:
      decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ??
      decoded.email ??
      '',
    role:
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
      decoded.role ??
      '',
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token)
    if (!decoded.exp) return true
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}
