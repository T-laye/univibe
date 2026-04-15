'use client'

import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'

export function useSignUp() {
  return useMutation({
    mutationFn: authService.signUp,
  })
}
