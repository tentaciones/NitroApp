import { create } from "zustand";
export const useSuccessState = create((set) => ({
  isSuccessfull: false,
  setIsSuccessfull: (value: boolean) => set({ isSuccessfull: value }),
}));
