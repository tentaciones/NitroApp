import { create } from "zustand";
export const useRangeState = create((set) => ({
  lowerRangeInput: 0,
  setLowerRangeInput: (value: number) => set({ lowerRangeInput: value }),
  higherRangeInput: 0,
  setHigherRangeInput: (value: number) => set({ higherRangeInput: value }),
}));
