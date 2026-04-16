import { create } from 'zustand'

interface HostStore {
  activeTab: 'overview' | 'create' | 'my-events' | 'analytics'
  setActiveTab: (tab: HostStore['activeTab']) => void
}

export const useHostStore = create<HostStore>((set) => ({
  activeTab: 'overview',
  setActiveTab: (activeTab) => set({ activeTab }),
}))
