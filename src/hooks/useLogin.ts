import { useMutation } from '@tanstack/react-query'
import { login as loginRequest, AuthError } from '../services/authService'
import type { LoginCredentials } from '../types/auth'

export function useLogin() {
  return useMutation<string, AuthError, LoginCredentials>({
    mutationFn: loginRequest,
  })
}
