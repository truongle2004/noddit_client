import { create } from 'zustand'

type DrawerState = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

const useDrawerStore = create<DrawerState>()((set) => ({
  collapsed: false,
  setCollapsed: (collapsed: boolean) => set({ collapsed })
}))

export default useDrawerStore
