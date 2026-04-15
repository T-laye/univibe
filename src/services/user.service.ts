import type { UpdateProfilePayload } from '@/types/auth'
import type { UserDashboardData, UserRegistration } from '@/types/user'
import { apiClient } from './api-client'

export const userService = {
  async getDashboard() {
    return apiClient<UserDashboardData>('/api/user/dashboard', {
      method: 'GET',
      auth: true,
    })
  },

  async getProfile() {
    const dashboard = await this.getDashboard()
    return dashboard.profile
  },

  async getRegistrations() {
    return apiClient<UserRegistration[]>('/api/user/registrations', {
      method: 'GET',
      auth: true,
    })
  },

  async updateProfile(payload: UpdateProfilePayload) {
    return apiClient('/api/user/profile', {
      method: 'PATCH',
      body: payload,
      auth: true,
    })
  },
}
