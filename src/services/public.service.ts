import type { HostEvent } from '@/types/host'
import { apiClient } from './api-client'

export const publicService = {
  async getEvents() {
    return apiClient<HostEvent[]>('/api/events', {
      method: 'GET',
    })
  },

  async getEvent(id: string) {
    return apiClient<HostEvent>(`/api/events/${id}`, {
      method: 'GET',
    })
  },
}
