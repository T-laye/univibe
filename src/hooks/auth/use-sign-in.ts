'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { queryKeys } from '@/services/query-keys'
import { useAuthStore } from '@/stores/auth-store'

export function useSignIn() {
  const queryClient = useQueryClient()
  const { setSession } = useAuthStore()

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      setSession(data.session, data.user)
      queryClient.setQueryData(queryKeys.auth.session, data)
    },
  })
}
