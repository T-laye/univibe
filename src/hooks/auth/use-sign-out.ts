'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { queryKeys } from '@/services/query-keys'
import { useAuthStore } from '@/stores/auth-store'

export function useSignOut() {
  const queryClient = useQueryClient()
  const { clearSession } = useAuthStore()

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: async () => {
      clearSession()
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.session })
    },
  })
}
