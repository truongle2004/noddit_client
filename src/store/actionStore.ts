import { ACTION } from '@/constant'
import { create } from 'zustand'

type ActionStore = {
  action: string
  setAction: (action: ACTION) => void
}

const useActionStore = create<ActionStore>()((set) => ({
  action: ACTION.SHOW_DEFAULT_PAGE,
  setAction: (action: ACTION) => set({ action })
}))

export default useActionStore
