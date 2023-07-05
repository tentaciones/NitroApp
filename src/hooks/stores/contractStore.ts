import { create } from "zustand";
export const useContractState = create((set) => ({
  routerContract: "",
  setRouterContract: (value: any) => set({ routerContract: value }),
  pairContract: "",
  setPairContract: (value: any) => set({ pairContract: value }),
}));

export const usePairDataContractState = create((set) => ({
  activeId: "",
  setActiveId: (value: string) => set({ activeId: value }),
}));
