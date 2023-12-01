import { create } from 'zustand'

export const useAuthStore = create<{
  isLogin: boolean
  login: () => void
  logout: () => void
}>((set) => ({
  isLogin: false,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}))
