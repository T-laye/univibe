'use client'

import { useQuery } from '@tanstack/react-query'
import { publicService } from '@/services/public.service'
import { queryKeys } from '@/services/query-keys'

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.public.events,
    queryFn: publicService.getEvents,
  })
}
