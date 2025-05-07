import { create } from 'zustand'

type ThemeState = {
  theme: string
  setTheme: (theme: string) => void
}

const useTheme = create<ThemeState>()((set) => ({
  theme: 'dark',
  setTheme: (theme: string) => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
    set({ theme })
  }
}))

export default useTheme
