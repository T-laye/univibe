import type { AdminOverviewData, AdminUserRecord, ModerationItem } from '@/types/admin'
import { apiClient } from './api-client'

export const adminService = {
  async getOverview() {
    return apiClient<AdminOverviewData>('/api/admin/overview', {
      method: 'GET',
      auth: true,
    })
  },

  async getUsers() {
    return apiClient<AdminUserRecord[]>('/api/admin/users', {
      method: 'GET',
      auth: true,
    })
  },

  async getModerationQueue() {
    return apiClient<ModerationItem[]>('/api/admin/moderation', {
      method: 'GET',
      auth: true,
    })
  },
}
