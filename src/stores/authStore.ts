import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IAuthState {
  isLogin: boolean
  token: string
  signIn: (token: string) => void
  signOut: () => void
}
type TAuthPersist = [
  ['zustand/persist', IAuthState],
]
export const useAuthStore = create<IAuthState, TAuthPersist>(persist(
  (set) => ({
    isLogin: false,
    token: '',
    signIn: (token: string) => set(() => ({
      isLogin: true,
      token: token
    })),
    signOut: () => set(() => ({ isLogin: false, token: '' })),
  }),
  {
    name: 'login-storage',
    storage: createJSONStorage(() => sessionStorage),
  },
))
