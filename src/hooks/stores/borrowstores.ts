import { create } from "zustand";
export const useBorrowState = create((set) => ({
  isPreview: false,
  setIsPreview: (value: boolean) => set({ isPreview: value }),
}));
