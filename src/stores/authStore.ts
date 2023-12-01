import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IAuthState {
  isLogin: boolean
  signIn: () => void
  signOut: () => void
}
type TAuthPersist = [
  ['zustand/persist', IAuthState],
]
export const useAuthStore = create<IAuthState, TAuthPersist>(persist(
  (set) => ({
    isLogin: false,
    signIn: () => set(() => ({ isLogin: true })),
    signOut: () => set(() => ({ isLogin: false })),
  }),
  {
    name: 'login-storage',
    storage: createJSONStorage(() => sessionStorage),
  },
))
