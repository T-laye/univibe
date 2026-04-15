import type { CreateHostEventPayload, HostDashboardData, HostEvent } from '@/types/host'
import { apiClient } from './api-client'

export const hostService = {
  async getDashboard() {
    return apiClient<HostDashboardData>('/api/host/dashboard', {
      method: 'GET',
      auth: true,
    })
  },

  async getEvents() {
    return apiClient<HostEvent[]>('/api/host/events', {
      method: 'GET',
      auth: true,
    })
  },

  async createEvent(payload: CreateHostEventPayload) {
    return apiClient<HostEvent>('/api/host/events', {
      method: 'POST',
      body: payload,
      auth: true,
    })
  },
}
