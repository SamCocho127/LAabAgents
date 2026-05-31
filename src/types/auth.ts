export interface LoginCredentials {
  email: string
  password: string
}

export interface TokenResponse {
  token: string
}

export interface AuthUser {
  email: string
  role: string
}
