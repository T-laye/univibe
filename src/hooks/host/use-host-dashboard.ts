'use client'

import { useQuery } from '@tanstack/react-query'
import { hostService } from '@/services/host.service'
import { queryKeys } from '@/services/query-keys'

export function useHostDashboard() {
  return useQuery({
    queryKey: queryKeys.host.dashboard,
    queryFn: hostService.getDashboard,
  })
}
