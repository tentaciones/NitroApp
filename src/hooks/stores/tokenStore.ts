import { create } from "zustand";
import { tokenData } from "@/constants/pooldata";
export const useSelectedTokenstate = create((set) => ({
  selectedTokenX: tokenData[0],
  setSelectedTokenX: (value: any) => set({ selectedTokenX: value }),
  selectedTokenY: tokenData[1],
  setSelectedTokenY: (value: any) => set({ selectedTokenY: value }),
}));

export const useTokenstate = create((set) => ({
  showTokenX: false,
  setShowTokenX: (value: boolean) => set({ showTokenX: value }),
  showTokenY: false,
  setShowTokenY: (value: boolean) => set({ showTokenY: value }),
}));
