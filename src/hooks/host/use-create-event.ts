'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { hostService } from '@/services/host.service'
import { queryKeys } from '@/services/query-keys'

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: hostService.createEvent,
    onSuccess: async () => {
      await Promise.all([
				queryClient.invalidateQueries({ queryKey: queryKeys.host.dashboard }),
				queryClient.invalidateQueries({ queryKey: queryKeys.host.events }),
				queryClient.refetchQueries({ queryKey: queryKeys.host.dashboard }),
			]);
    },
  })
}
