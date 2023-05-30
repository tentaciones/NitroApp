import { create } from "zustand";
export const useRepayState = create((set) => ({
  isRepay: false,
  setIsRepay: (value: boolean) => set({ isRepay: value }),
}));
export const useRepayButtonText = create((set) => ({
  repayButtonText: false,
  setRepayButtonText: (value: string) => set({ repayButtonText: value }),
}));
