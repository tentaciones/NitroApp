import { create } from "zustand";
export const useDebtCardState = create((set) => ({
  isFlipped: false,
  setIsFlipped: (value: boolean) => set({ isFlipped: value }),
}));
export const useDebtTxnHashState = create((set) => ({
  debtTxnHash: "",
  setdebtTxnHash: (value: string) => set({ debtTxnHash: value }),
}));
