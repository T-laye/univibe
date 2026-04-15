'use client'

import { useQuery } from '@tanstack/react-query'
import { userService } from '@/services/user.service'
import { queryKeys } from '@/services/query-keys'

export function useUserDashboard() {
  return useQuery({
    queryKey: queryKeys.user.dashboard,
    queryFn: userService.getDashboard,
  })
}
