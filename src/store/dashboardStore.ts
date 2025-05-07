import { create } from 'zustand'

type DashboardStore = {
  openModalCreateCommunity: boolean
  setOpenModalCreateCommunity: (openModalCreateCommunity: boolean) => void
}

const useDashboardStore = create<DashboardStore>()((set) => ({
  openModalCreateCommunity: false,
  setOpenModalCreateCommunity: (openModalCreateCommunity: boolean) =>
    set({ openModalCreateCommunity })
}))

export default useDashboardStore
