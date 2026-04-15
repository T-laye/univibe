'use client'

import { useQuery } from '@tanstack/react-query'
import { adminService } from '@/services/admin.service'
import { queryKeys } from '@/services/query-keys'

export function useAdminModeration() {
  return useQuery({
    queryKey: queryKeys.admin.moderation,
    queryFn: adminService.getModerationQueue,
  })
}
