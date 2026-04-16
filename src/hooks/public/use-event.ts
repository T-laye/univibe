'use client'

import { useQuery } from '@tanstack/react-query'
import { publicService } from '@/services/public.service'
import { queryKeys } from '@/services/query-keys'

export function useEvent(id: string) {
  return useQuery({
    queryKey: queryKeys.public.eventDetails(id),
    queryFn: () => publicService.getEvent(id),
    enabled: !!id,
  })
}
