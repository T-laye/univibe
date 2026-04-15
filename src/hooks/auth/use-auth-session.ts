'use client'

import { useQuery } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { queryKeys } from '@/services/query-keys'
import { useAuthStore } from '@/stores/auth-store'

export function useAuthSession() {
  const store = useAuthStore()

  const query = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: authService.getSession,
    staleTime: 60_000,
  })

  return {
    ...query,
    session: query.data?.session ?? store.session,
    user: query.data?.user ?? store.user,
    isHydrating: store.isHydrating,
  }
}
