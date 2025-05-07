import { create } from 'zustand'

interface PostStore {
  isOpenCreatePost: boolean
  setOpenCreatePost: (isOpen: boolean) => void
}

const usePostStore = create<PostStore>((set) => ({
  isOpenCreatePost: false,
  setOpenCreatePost: (isOpen: boolean) => set({ isOpenCreatePost: isOpen })
}))

export default usePostStore
