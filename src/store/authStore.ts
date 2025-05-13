import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Expire {
  sub: string
  exp: number
  iat: number
}

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null // Not persisted
  token: string | null // Persisted
  setToken: (token: string) => void
  setUser: (user: User) => void
  clearAuth: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearAuth: () => {
        set({ user: null, token: null })
        localStorage.removeItem('auth-storage')
      },
      isAuthenticated: () => !!get().token
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ token: state.token })
    }
  )
)
