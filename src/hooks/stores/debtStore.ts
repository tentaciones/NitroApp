import { create } from "zustand";
export const useDebtCardState = create((set) => ({
  isFlipped: false,
  setIsFlipped: (value: boolean) => set({ isFlipped: value }),
}));
